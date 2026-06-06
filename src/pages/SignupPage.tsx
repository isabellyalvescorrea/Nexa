import { CalendarDays, Globe2, Lock, Mail, UserRound } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import authPortal from '@/assets/generated/auth-portal-signup.webp'
import { AuthLayout } from '@/layouts/AuthLayout'
import { FormField } from '@/components/FormField'
import { GradientText } from '@/components/GradientText'
import { NeonButton } from '@/components/NeonButton'

export function SignupPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
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
      <form onSubmit={handleSubmit} className="auth-form auth-form--signup">
        <div className="auth-form-header flex min-h-[68px] items-center justify-center text-center">
          <h2 className="font-display text-[2.2rem] font-bold leading-tight text-white max-sm:text-[1.9rem]">
            Crie sua <GradientText>conta</GradientText>
          </h2>
        </div>

        <div className="auth-fields auth-fields--signup grid grid-cols-2 gap-7 max-md:grid-cols-1">
          <FormField label="Nome completo" placeholder="Seu nome completo" icon={UserRound} />
          <FormField label="E-mail" placeholder="seu@email.com" icon={Mail} type="email" />
          <FormField label="Senha" placeholder="********" icon={Lock} type="password" />
          <FormField label="Confirmar senha" placeholder="********" icon={Lock} type="password" />
          <FormField label="Data de nascimento" placeholder="DD / MM / AAAA" icon={CalendarDays} />
          <FormField label="País" placeholder="Selecione seu país" icon={Globe2} options={['Brasil', 'Portugal', 'Estados Unidos', 'Outro']} />
        </div>

        <label className="auth-terms mt-7 flex items-center gap-3 text-sm text-white/62">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-white/15 bg-nexa-deep accent-[#ae3cff] focus:ring-nexa-violet"
          />
          <span>
            Eu aceito os <span className="text-nexa-violet">Termos de Uso</span> e a{' '}
            <span className="text-nexa-violet">Política de Privacidade</span>
          </span>
        </label>

        <div className="auth-primary-action mt-8">
          <NeonButton type="submit" block className="auth-submit-button min-h-[62px] text-base">
            Criar conta
          </NeonButton>
        </div>

        <div className="auth-divider my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-5 text-sm text-white/60">
          <span className="h-px bg-white/10" />
          ou
          <span className="h-px bg-white/10" />
        </div>

        <NeonButton variant="light" block className="auth-google-button min-h-[58px] gap-3 text-base">
          <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-xl font-bold text-[#4285f4]">G</span>
          Continuar com Google
        </NeonButton>

        <p className="auth-security mt-7 text-center text-sm text-white/55">Seus dados estão seguros conosco.</p>
        {submitted && <p className="mt-4 text-center text-sm font-medium text-nexa-cyan">Cadastro demo pronto para integração backend.</p>}
      </form>
    </AuthLayout>
  )
}
