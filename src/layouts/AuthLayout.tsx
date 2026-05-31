import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { fadeUp, softTransition } from '@/animations/motion'
import { GradientText } from '@/components/GradientText'
import { Logo } from '@/components/Logo'
import { ParticleField } from '@/components/ParticleField'

type AuthLayoutProps = PropsWithChildren<{
  eyebrow: string
  switchLabel: string
  switchTo: string
  switchAction: string
  titlePrefix: string
  titleGradient: string
  description: string
  visual: string
}>

export function AuthLayout({
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
  return (
    <main className="relative min-h-screen overflow-hidden bg-nexa-dark">
      <ParticleField density="medium" className="z-0 opacity-75" />
      <div className="absolute inset-0 z-0 nexa-grid-bg opacity-25" />

      <header className="relative z-20 border-b border-white/8">
        <div className="nexa-shell flex h-[102px] items-center justify-between gap-4 max-sm:h-20 max-sm:w-[100svw] max-sm:max-w-[100svw] max-sm:px-4">
          <Link to="/" aria-label="Ir para a página inicial">
            <Logo className="w-[194px] max-sm:w-[132px]" />
          </Link>
          <div className="flex items-center gap-5 text-sm text-white/86 max-sm:gap-3">
            <span className="hidden sm:inline">{switchLabel}</span>
            <Link
              to={switchTo}
              className="shrink-0 rounded-lg border border-nexa-violet/50 bg-white/[0.025] px-5 py-3 font-semibold text-white transition hover:border-nexa-cyan/70 hover:shadow-neon max-sm:px-3 max-sm:py-2 max-sm:text-xs"
            >
              {switchAction}
            </Link>
          </div>
        </div>
      </header>

      <section className="nexa-shell relative z-10 grid min-h-[calc(100vh-102px)] grid-cols-[0.78fr_1fr] items-center gap-12 py-12 max-xl:grid-cols-1 max-xl:pt-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={softTransition}
          className="relative min-h-[720px] max-xl:min-h-[620px] max-md:min-h-0"
        >
          <div className="w-full max-w-[560px] pt-10 max-xl:mx-auto max-xl:text-center">
            <p className="mb-5 text-xs font-semibold uppercase text-nexa-violet/80">{eyebrow}</p>
            <h1 className="break-words font-display text-[3.5rem] font-bold leading-[1.14] text-white max-md:text-[2.7rem] max-sm:text-[2rem]">
              {titlePrefix} <GradientText>{titleGradient}</GradientText>.
            </h1>
            <div className="gradient-line my-7 w-48 max-xl:mx-auto" />
            <p className="max-w-[540px] text-lg leading-8 text-white/82 max-xl:mx-auto max-sm:text-base max-sm:leading-7">{description}</p>
          </div>

          <motion.img
            src={visual}
            alt=""
            loading="eager"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...softTransition, delay: 0.16 }}
            className="absolute bottom-0 left-0 w-[720px] max-w-full select-none object-contain drop-shadow-[0_0_58px_rgba(174,60,255,0.44)] max-xl:left-1/2 max-xl:-translate-x-1/2 max-md:relative max-md:bottom-auto max-md:left-auto max-md:mt-10 max-md:w-full max-md:translate-x-0"
            draggable={false}
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...softTransition, delay: 0.1 }}
          className="neon-border glass-panel mx-auto w-full max-w-[770px] rounded-nexa p-10 max-md:p-6"
        >
          {children}
        </motion.div>
      </section>
    </main>
  )
}
