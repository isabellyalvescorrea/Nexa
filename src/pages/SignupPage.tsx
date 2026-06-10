import { Globe2, Lock, Mail, UserRound } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import authPortal from '@/assets/generated/auth-portal-signup.webp'
import { FormField } from '@/components/FormField'
import { GradientText } from '@/components/GradientText'
import { NeonButton } from '@/components/NeonButton'
import { useAuth } from '@/hooks/useAuth'
import { AuthLayout } from '@/layouts/AuthLayout'

type Feedback = {
  kind: 'error' | 'success'
  text: string
}

export function SignupPage() {
  const navigate = useNavigate()
  const { signUp, signInWithGoogle } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [country, setCountry] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedback(null)

    if (!fullName.trim() || !email.trim() || !password) {
      setFeedback({ kind: 'error', text: 'Preencha todos os campos obrigatórios.' })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFeedback({ kind: 'error', text: 'Informe um e-mail válido.' })
      return
    }

    if (password.length < 6) {
      setFeedback({ kind: 'error', text: 'A senha precisa ter pelo menos 6 caracteres.' })
      return
    }

    if (!acceptedTerms) {
      setFeedback({ kind: 'error', text: 'Aceite os Termos de Uso e a Política de Privacidade.' })
      return
    }

    setSubmitting(true)
    const result = await signUp({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      country,
    })
    setSubmitting(false)

    if (!result.ok) {
      setFeedback({ kind: 'error', text: result.error ?? 'Não foi possível criar sua conta. Tente novamente.' })
      return
    }

    if (result.emailConfirmationRequired) {
      setFeedback({
        kind: 'success',
        text: 'Conta criada. Verifique seu e-mail para confirmar o cadastro e acessar sua jornada.',
      })
      return
    }

    navigate('/painel', { replace: true })
  }

  const handleGoogleSignIn = async () => {
    setFeedback(null)
    setSubmitting(true)
    const result = await signInWithGoogle()

    if (!result.ok) {
      setSubmitting(false)
      setFeedback({ kind: 'error', text: result.error ?? 'Não foi possível iniciar o login com Google.' })
    }
  }

  return (
    <AuthLayout
      variant="signup"
      eyebrow="Cadastro"
      switchLabel="Já tem uma conta?"
      switchTo="/login"
      switchAction="Fazer login"
      titlePrefix="Crie sua conta e comece sua"
      titleGradient="jornada"
      description="Junte-se à Nexa e tenha acesso a ferramentas que vão te ajudar a aprender, decidir e evoluir todos os dias."
      visual={authPortal}
    >
      <form onSubmit={handleSubmit} className="auth-form auth-form--signup" noValidate>
        <div className="auth-form-header flex min-h-[68px] items-center justify-center text-center">
          <h2 className="font-display text-[2.2rem] font-bold leading-tight text-white max-sm:text-[1.9rem]">
            Crie sua <GradientText>conta</GradientText>
          </h2>
        </div>

        {feedback && (
          <p
            role={feedback.kind === 'error' ? 'alert' : 'status'}
            aria-live="polite"
            className={`mb-4 rounded-lg border px-4 py-3 text-center text-sm ${
              feedback.kind === 'error'
                ? 'border-[#ff7bc7]/30 bg-[#ff3aa0]/8 text-[#ff9fd4]'
                : 'border-nexa-cyan/25 bg-nexa-cyan/8 text-nexa-cyan'
            }`}
          >
            {feedback.text}
          </p>
        )}

        <div className="auth-fields auth-fields--signup grid grid-cols-2 gap-7 max-md:grid-cols-1">
          <FormField label="Nome completo" placeholder="Seu nome completo" icon={UserRound} name="fullName" value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" required disabled={submitting} />
          <FormField label="E-mail" placeholder="seu@email.com" icon={Mail} type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required disabled={submitting} />
          <FormField label="Senha" placeholder="********" icon={Lock} type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required disabled={submitting} />
          <FormField label="País" placeholder="Selecione seu país" icon={Globe2} name="country" value={country} onChange={(event) => setCountry(event.target.value)} autoComplete="country-name" options={['Brasil', 'Portugal', 'Estados Unidos', 'Outro']} disabled={submitting} />
        </div>

        <label className="auth-terms mt-7 flex items-center gap-3 text-sm text-white/62">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            disabled={submitting}
            className="h-5 w-5 rounded border-white/15 bg-nexa-deep accent-[#ae3cff] focus:ring-nexa-violet"
          />
          <span>
            Eu aceito os <span className="text-nexa-violet">Termos de Uso</span> e a{' '}
            <span className="text-nexa-violet">Política de Privacidade</span>
          </span>
        </label>

        <div className="auth-primary-action mt-8">
          <NeonButton type="submit" block className="auth-submit-button min-h-[62px] text-base" disabled={submitting}>
            {submitting ? 'Criando conta...' : 'Criar conta'}
          </NeonButton>
        </div>

        <div className="auth-divider my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-5 text-sm text-white/60">
          <span className="h-px bg-white/10" />
          ou
          <span className="h-px bg-white/10" />
        </div>

        <NeonButton variant="light" block className="auth-google-button min-h-[58px] gap-3 text-base" onClick={handleGoogleSignIn} disabled={submitting}>
          <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-xl font-bold text-[#4285f4]">G</span>
          Continuar com Google
        </NeonButton>

        <p className="auth-security mt-7 text-center text-sm text-white/55">Seus dados estão seguros conosco.</p>
      </form>
    </AuthLayout>
  )
}
