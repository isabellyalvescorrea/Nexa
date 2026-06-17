import { Lock, Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import authPortal from '@/assets/generated/auth-portal-login.webp'
import { FormField } from '@/components/FormField'
import { GradientText } from '@/components/GradientText'
import { NeonButton } from '@/components/NeonButton'
import { useAuth } from '@/hooks/useAuth'
import { AuthLayout } from '@/layouts/AuthLayout'

type AuthLocationState = {
  from?: string
  message?: string
}

type Feedback = {
  kind: 'error' | 'info'
  text: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()
  const locationState = location.state as AuthLocationState | null
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(
    locationState?.message ? { kind: 'info', text: locationState.message } : null,
  )

  const redirectTo = locationState?.from?.startsWith('/') ? locationState.from : '/painel'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedback(null)

    if (!email.trim() || !password) {
      setFeedback({ kind: 'error', text: 'Preencha todos os campos.' })
      return
    }

    setSubmitting(true)
    const result = await signIn(email.trim(), password)
    setSubmitting(false)

    if (!result.ok) {
      setFeedback({ kind: 'error', text: result.error ?? 'Não foi possível entrar. Tente novamente.' })
      return
    }

    navigate(redirectTo, { replace: true })
  }

  return (
    <AuthLayout
      variant="login"
      eyebrow="Login"
      switchLabel="Ainda não tem uma conta?"
      switchTo="/cadastro"
      switchAction="Criar conta"
      titlePrefix="Seu futuro começa com uma"
      titleGradient="decisão"
      description="Faça login e continue sua jornada rumo à carreira que combina com você."
      visual={authPortal}
    >
      <form onSubmit={handleSubmit} className="auth-form auth-form--login mx-auto max-w-[560px]" noValidate>
        <div className="auth-form-header mb-12 text-center">
          <h2 className="font-display text-[2.4rem] font-bold leading-tight text-white max-sm:text-[1.9rem]">
            <GradientText>Bem-vindo</GradientText> de volta!
          </h2>
          <p className="mt-3 text-white/75">Faça login para acessar sua jornada personalizada.</p>
        </div>

        {feedback && (
          <p
            role={feedback.kind === 'error' ? 'alert' : 'status'}
            aria-live="polite"
            className={`mb-5 rounded-lg border px-4 py-3 text-center text-sm ${
              feedback.kind === 'error'
                ? 'border-[#ff7bc7]/30 bg-[#ff3aa0]/8 text-[#ff9fd4]'
                : 'border-nexa-cyan/25 bg-nexa-cyan/8 text-nexa-cyan'
            }`}
          >
            {feedback.text}
          </p>
        )}

        <div className="auth-fields auth-fields--login space-y-8">
          <FormField
            label="E-mail"
            placeholder="seu@email.com"
            icon={Mail}
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            disabled={submitting}
          />
          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-white">Senha</span>
              <button type="button" className="text-sm font-medium text-nexa-violet transition hover:text-nexa-cyan">
                Esqueceu sua senha?
              </button>
            </div>
            <FormField
              label=""
              placeholder="********"
              icon={Lock}
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              disabled={submitting}
            />
          </div>
        </div>

        <div className="auth-primary-action mt-11">
          <NeonButton type="submit" block className="auth-submit-button min-h-[64px] text-base" disabled={submitting}>
            {submitting ? 'Entrando...' : 'Entrar'}
          </NeonButton>
        </div>

        <p className="auth-security mt-7 text-center text-sm text-white/55">Seus dados estão seguros conosco.</p>
      </form>
    </AuthLayout>
  )
}
