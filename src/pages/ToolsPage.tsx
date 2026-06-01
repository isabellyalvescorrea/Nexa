import {
  BarChart3,
  Bookmark,
  Brain,
  ClipboardCheck,
  Compass,
  Star,
  Target,
  Trophy,
  UsersRound,
  Waypoints,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import toolsAtmosphere from '@/assets/generated/tools-atmosphere.webp'
import { fadeUp, softTransition, staggerContainer } from '@/animations/motion'
import { GlassCard } from '@/components/GlassCard'
import { GradientText } from '@/components/GradientText'
import { Header } from '@/components/Header'
import { ParticleField } from '@/components/ParticleField'
import { toolCards } from '@/data/tools'

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Target,
  Waypoints,
  BarChart3,
  Bookmark,
  ClipboardCheck,
  Trophy,
  Compass,
  UsersRound,
  Star,
}

const pageBackground = '#050214'

export function ToolsPage() {
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
        src={toolsAtmosphere}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-[0.04] blur-[8px] [mask-image:radial-gradient(circle_at_50%_48%,black,transparent_78%)]"
      />
      <div className="absolute inset-0 bg-[#050214]/78" />

      <section className="nexa-shell relative z-20 bg-[#050214]/0 pb-16 pt-[145px]">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mx-auto max-w-[950px] text-center">
          <motion.p variants={fadeUp} transition={softTransition} className="mb-5 text-sm font-semibold uppercase text-nexa-violet">
            • Ferramentas •
          </motion.p>
          <motion.h1 variants={fadeUp} transition={softTransition} className="font-display text-[4rem] font-bold leading-tight text-white max-lg:text-[3rem] max-sm:text-[2.2rem]">
            Tudo que você precisa para <GradientText>descobrir</GradientText> e <span className="text-nexa-blue">construir</span> seu futuro.
          </motion.h1>
          <motion.p variants={fadeUp} transition={softTransition} className="mx-auto mt-6 max-w-[720px] text-lg leading-8 text-white/78 max-sm:text-base max-sm:leading-7">
            Do autoconhecimento ao plano de ação: explore ferramentas completas que te ajudam a tomar decisões melhores e evoluir todos os dias.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-10 grid grid-cols-5 gap-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
        >
          {toolCards.map((tool) => {
            const Icon = iconMap[tool.icon]
            return (
              <GlassCard key={tool.number} variants={fadeUp} transition={softTransition} className="group min-h-[268px] p-5">
                <div className="mb-2 text-sm font-semibold text-nexa-pink/80">{tool.number}</div>
                <div className="premium-icon-ring mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full transition duration-500">
                  <Icon className="h-10 w-10 text-[#F661FD] drop-shadow-[0_0_10px_rgba(246,97,253,0.42)] transition duration-500 group-hover:text-[#2DA8FF] group-hover:drop-shadow-[0_0_12px_rgba(45,168,255,0.44)]" />
                </div>
                <h2
                  className="font-display text-[1.02rem] font-semibold uppercase tracking-[0.02em]"
                  style={{
                    background: 'linear-gradient(90deg, #C64BFF 0%, #2DA8FF 34%, #2DA8FF 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 8px rgba(45, 168, 255, 0.28))',
                  }}
                >
                  {tool.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/76">{tool.description}</p>
                <div className="mt-5 text-right text-2xl text-nexa-violet transition group-hover:translate-x-1 group-hover:text-nexa-cyan">→</div>
              </GlassCard>
            )
          })}
        </motion.div>
      </section>
    </main>
  )
}
