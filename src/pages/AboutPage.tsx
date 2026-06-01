import { BarChart3, Compass, Lightbulb, Route, Sparkles, UsersRound, type LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import aboutAtmosphere from '@/assets/generated/about-atmosphere.webp'
import { fadeUp, softTransition, staggerContainer } from '@/animations/motion'
import { GlassCard } from '@/components/GlassCard'
import { GradientText } from '@/components/GradientText'
import { Header } from '@/components/Header'
import { ParticleField } from '@/components/ParticleField'
import { aboutCards } from '@/data/about'
import { neonCardTitleStyle } from '@/utils/neonCardTitleStyle'

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Route,
  BarChart3,
  UsersRound,
  Lightbulb,
}

const pageBackground = '#050214'

export function AboutPage() {
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
    <main className="relative min-h-screen overflow-hidden bg-[#050214] text-white">
      <Header />
      <ParticleField density="high" motion="cinematic" className="z-10 opacity-95 mix-blend-screen" />
      <img
        src={aboutAtmosphere}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-[0.04] blur-[8px] [mask-image:radial-gradient(circle_at_50%_48%,black,transparent_76%)]"
      />
      <div className="absolute inset-0 bg-[#050214]/78" />

      <section className="nexa-shell relative z-20 bg-[#050214]/0 pb-16 pt-[145px]">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mx-auto max-w-[910px] text-center">
          <motion.p variants={fadeUp} transition={softTransition} className="mb-5 text-sm font-semibold uppercase text-nexa-violet">
            • Sobre nós •
          </motion.p>
          <motion.h1 variants={fadeUp} transition={softTransition} className="font-display text-[4rem] font-bold leading-tight text-white max-lg:text-[3rem] max-sm:text-[2.25rem]">
            Mais que uma escolha, um caminho com{' '}
            <span
              style={{
                background: 'linear-gradient(to right, #B53DF5, #5E56FF, #3297FF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              propósito.
            </span>
          </motion.h1>
          <motion.div variants={fadeUp} transition={softTransition} className="gradient-line mx-auto my-7 w-72 max-sm:w-48" />
          <motion.p variants={fadeUp} transition={softTransition} className="mx-auto max-w-[780px] text-lg leading-8 text-white/84 max-sm:text-base max-sm:leading-7">
            A Nexa nasceu para transformar dúvidas em direção. Acreditamos que escolher uma profissão é o início de algo muito maior. Por isso, criamos
            uma plataforma que ajuda você a descobrir o que combina com você e guia cada etapa da jornada.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={softTransition}
            className="mx-auto mt-8 inline-flex max-w-full items-center gap-4 rounded-full border border-nexa-violet/40 bg-white/[0.035] px-8 py-4 shadow-neon backdrop-blur-xl max-sm:px-5"
          >
            <Sparkles className="h-5 w-5 shrink-0 text-nexa-pink" />
            <span className="text-lg font-semibold text-white/95 max-sm:text-sm">
              <GradientText>Você descobre. A gente guia.</GradientText> Você conquista.
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-12 grid grid-cols-5 gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
        >
          {aboutCards.map((card) => {
            const Icon = iconMap[card.icon]
            return (
              <GlassCard key={card.title} variants={fadeUp} transition={softTransition} className="group min-h-[352px] px-7 py-8 text-center">
                <div className="premium-icon-ring mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full transition duration-500">
                  <Icon className="h-10 w-10 text-[#F661FD] drop-shadow-[0_0_10px_rgba(246,97,253,0.42)] transition duration-500 group-hover:text-[#2DA8FF] group-hover:drop-shadow-[0_0_12px_rgba(45,168,255,0.44)]" />
                </div>
                <h2
                  className="font-display text-lg font-semibold uppercase tracking-[0.035em]"
                  style={neonCardTitleStyle}
                >
                  {card.title}
                </h2>
                <div className="gradient-line mx-auto my-4 w-16 opacity-75" />
                <p className="mx-auto max-w-[210px] text-sm leading-7 text-white/78">{card.body}</p>
              </GlassCard>
            )
          })}
        </motion.div>
      </section>
    </main>
  )
}
