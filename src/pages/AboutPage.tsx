import { BarChart3, Compass, Lightbulb, Route, Sparkles, UsersRound, type LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import aboutAtmosphere from '@/assets/generated/about-atmosphere.webp'
import { fadeUp, softTransition, staggerContainer } from '@/animations/motion'
import { GlassCard } from '@/components/GlassCard'
import { GradientText } from '@/components/GradientText'
import { Header } from '@/components/Header'
import { ParticleField } from '@/components/ParticleField'
import { aboutCards } from '@/data/about'

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Route,
  BarChart3,
  UsersRound,
  Lightbulb,
}

export function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-nexa-dark">
      <Header />
      <ParticleField density="medium" className="z-10 opacity-75" />
      <img
        src={aboutAtmosphere}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-10 blur-[10px] [mask-image:radial-gradient(circle_at_50%_48%,black,transparent_76%)]"
      />
      <div className="absolute inset-0 bg-[#04010d]/68" />

      <section className="nexa-shell relative z-20 pb-16 pt-[145px]">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mx-auto max-w-[910px] text-center">
          <motion.p variants={fadeUp} transition={softTransition} className="mb-5 text-sm font-semibold uppercase text-nexa-violet">
            • Sobre nós •
          </motion.p>
          <motion.h1 variants={fadeUp} transition={softTransition} className="font-display text-[4rem] font-bold leading-tight text-white max-lg:text-[3rem] max-sm:text-[2.25rem]">
            Mais que uma escolha, um caminho com <GradientText>propósito.</GradientText>
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
              <GlassCard key={card.title} variants={fadeUp} transition={softTransition} className="min-h-[352px] text-center">
                <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-nexa-violet/50 bg-white/[0.025] shadow-neon">
                  <Icon className="h-11 w-11 text-nexa-pink" />
                </div>
                <h2 className="font-display text-xl font-bold uppercase text-nexa-pink">{card.title}</h2>
                <div className="gradient-line mx-auto my-4 w-20" />
                <p className="text-sm leading-7 text-white/82">{card.body}</p>
              </GlassCard>
            )
          })}
        </motion.div>
      </section>
    </main>
  )
}
