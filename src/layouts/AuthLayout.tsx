import { motion } from 'framer-motion'
import { useEffect, type PropsWithChildren } from 'react'
import { preload } from 'react-dom'
import { cn } from '@/utils/cn'
import { fadeUp, softTransition } from '@/animations/motion'
import { GradientText } from '@/components/GradientText'
import { Header } from '@/components/Header'

type AuthLayoutProps = PropsWithChildren<{
  variant: 'login' | 'signup'
  eyebrow: string
  switchLabel: string
  switchTo: string
  switchAction: string
  titlePrefix: string
  titleGradient: string
  description: string
  visual: string
}>

const pageBackground = '#020212'

export function AuthLayout({
  variant,
  eyebrow,
  switchLabel,
  switchTo,
  switchAction,
  titlePrefix,
  titleGradient,
  description,
  visual,
  children,
}: AuthLayoutProps) {
  preload(visual, { as: 'image', fetchPriority: 'high', type: 'image/webp' })

  useEffect(() => {
    const previousBodyBackground = document.body.style.background
    const previousHtmlBackground = document.documentElement.style.background
    document.body.style.background = pageBackground
    document.documentElement.style.background = pageBackground

    return () => {
      document.body.style.background = previousBodyBackground
      document.documentElement.style.background = previousHtmlBackground
    }
  }, [])

  return (
    <main className={`auth-page auth-page--${variant} relative min-h-screen overflow-x-hidden bg-[#020212]`}>
      <Header contextualAction={{ prompt: switchLabel, label: switchAction, to: switchTo }} />

      <section className="auth-content nexa-shell relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={softTransition}
          className="auth-visual-column"
        >
          <div className="auth-copy w-full max-w-[560px]">
            <p className="mb-5 text-xs font-semibold uppercase text-nexa-violet/80">{eyebrow}</p>
            <h1 className="break-words font-display text-[3.5rem] font-bold leading-[1.14] text-white max-md:text-[2.7rem] max-sm:text-[2rem]">
              {titlePrefix} <GradientText>{titleGradient}.</GradientText>
            </h1>
            <div className="gradient-line my-7 w-48 max-xl:mx-auto" />
            <p className="max-w-[540px] text-lg leading-8 text-white/82 max-xl:mx-auto max-sm:text-base max-sm:leading-7">{description}</p>
          </div>

          <div className="auth-portal-frame" aria-hidden="true">
            <img
              src={visual}
              alt=""
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="auth-portal-image select-none object-contain"
              draggable={false}
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...softTransition, delay: 0.1 }}
          className={cn(
            'auth-panel mx-auto w-full',
            variant === 'login' ? 'auth-panel--login' : 'auth-panel--signup',
          )}
        >
          {children}
        </motion.div>
      </section>
    </main>
  )
}
