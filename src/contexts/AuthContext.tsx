import type { Session, User } from '@supabase/supabase-js'
import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import {
  AuthContext,
  type AuthActionResult,
  type AuthContextValue,
  type SignUpInput,
} from '@/contexts/auth-context'
import { getAuthErrorMessage } from '@/lib/auth-errors'
import { isGoogleAuthEnabled, isSupabaseConfigured, supabase } from '@/lib/supabase'

const configurationError = 'Configure o Supabase no arquivo .env.local para ativar a autenticação.'

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!supabase) return

    let active = true

    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      setLoading(false)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string): Promise<AuthActionResult> => {
    if (!supabase) return { ok: false, error: configurationError }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { ok: false, error: getAuthErrorMessage(error, 'Não foi possível entrar. Tente novamente.') }

    return { ok: true }
  }, [])

  const signUp = useCallback(async (input: SignUpInput): Promise<AuthActionResult> => {
    if (!supabase) return { ok: false, error: configurationError }

    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        emailRedirectTo: `${window.location.origin}/painel`,
        data: {
          full_name: input.fullName,
          country: input.country,
        },
      },
    })

    if (error) return { ok: false, error: getAuthErrorMessage(error, 'Não foi possível criar sua conta. Tente novamente.') }

    return {
      ok: true,
      emailConfirmationRequired: Boolean(data.user && !data.session),
    }
  }, [])

  const signOut = useCallback(async (): Promise<AuthActionResult> => {
    if (!supabase) {
      setSession(null)
      setUser(null)
      return { ok: true }
    }

    const { error } = await supabase.auth.signOut()
    if (error) return { ok: false, error: getAuthErrorMessage(error, 'Não foi possível sair. Tente novamente.') }

    setSession(null)
    setUser(null)
    return { ok: true }
  }, [])

  const signInWithGoogle = useCallback(async (): Promise<AuthActionResult> => {
    if (!supabase) return { ok: false, error: configurationError }

    if (!(await isGoogleAuthEnabled())) {
      return {
        ok: false,
        error: 'O login com Google ainda não foi ativado. Use e-mail e senha por enquanto.',
      }
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/painel`,
      },
    })

    if (error) return { ok: false, error: getAuthErrorMessage(error, 'Não foi possível iniciar o login com Google.') }
    return { ok: true }
  }, [])

  const getCurrentUser = useCallback(async () => {
    if (!supabase) return null
    const { data, error } = await supabase.auth.getUser()
    return error ? null : data.user
  }, [])

  const refreshSession = useCallback(async () => {
    if (!supabase) return null
    const { data, error } = await supabase.auth.refreshSession()
    return error ? null : data.session
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      isAuthenticated: Boolean(session),
      isGuest: !session,
      isConfigured: isSupabaseConfigured,
      signUp,
      signIn,
      signOut,
      signInWithGoogle,
      getCurrentUser,
      refreshSession,
    }),
    [getCurrentUser, loading, refreshSession, session, signIn, signInWithGoogle, signOut, signUp, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
