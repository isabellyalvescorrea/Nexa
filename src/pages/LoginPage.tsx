import { Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import authPortal from '@/assets/generated/auth-portal-login.webp'
import { AuthLayout } from '@/layouts/AuthLayout'
import { FormField } from '@/components/FormField'
import { GradientText } from '@/components/GradientText'
import { NeonButton } from '@/components/NeonButton'

export function LoginPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <AuthLayout
      eyebrow="Login"
      switchLabel="Ainda não tem uma conta?"
      switchTo="/cadastro"
      switchAction="Criar conta"
      titlePrefix="Seu futuro começa com uma"
      titleGradient="decisão"
      description="Faça login e continue sua jornada rumo à carreira que combina com você."
      visual={authPortal}
    >
      <form onSubmit={handleSubmit} className="mx-auto max-w-[560px]">
        <div className="mb-12 text-center">
          <h2 className="font-display text-[2.4rem] font-bold leading-tight text-white max-sm:text-[1.9rem]">
            <GradientText>Bem-vindo</GradientText> de volta!
          </h2>
          <p className="mt-3 text-white/75">Faça login para acessar sua jornada personalizada.</p>
        </div>

        <div className="space-y-8">
          <FormField label="E-mail" placeholder="seu@email.com" icon={Mail} type="email" />
          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-white">Senha</span>
              <button type="button" className="text-sm font-medium text-nexa-violet transition hover:text-nexa-cyan">
                Esqueceu sua senha?
              </button>
            </div>
            <FormField label="" placeholder="********" icon={Lock} type="password" />
          </div>
        </div>

        <div className="mt-11">
          <NeonButton type="submit" block className="min-h-[64px] text-base">
            Entrar
          </NeonButton>
        </div>

        <div className="my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-5 text-sm text-white/60">
          <span className="h-px bg-white/10" />
          ou
          <span className="h-px bg-white/10" />
        </div>

        <NeonButton variant="light" block className="min-h-[58px] gap-3 text-base">
          <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-xl font-bold text-[#4285f4]">G</span>
          Continuar com Google
        </NeonButton>

        <p className="mt-7 text-center text-sm text-white/55">Seus dados estão seguros conosco.</p>
        {submitted && <p className="mt-4 text-center text-sm font-medium text-nexa-cyan">Login demo pronto para integração backend.</p>}
      </form>
    </AuthLayout>
  )
}
