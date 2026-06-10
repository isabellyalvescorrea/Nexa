import type { Session, User } from '@supabase/supabase-js'
import { createContext } from 'react'

export type SignUpInput = {
  fullName: string
  email: string
  password: string
  country: string
}

export type AuthActionResult = {
  ok: boolean
  error?: string
  emailConfirmationRequired?: boolean
}

export type AuthContextValue = {
  user: User | null
  session: Session | null
  loading: boolean
  isAuthenticated: boolean
  isGuest: boolean
  isConfigured: boolean
  signUp: (input: SignUpInput) => Promise<AuthActionResult>
  signIn: (email: string, password: string) => Promise<AuthActionResult>
  signOut: () => Promise<AuthActionResult>
  signInWithGoogle: () => Promise<AuthActionResult>
  getCurrentUser: () => Promise<User | null>
  refreshSession: () => Promise<Session | null>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
