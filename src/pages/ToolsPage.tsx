import {
  BarChart3,
  Bookmark,
  Bot,
  Brain,
  ClipboardCheck,
  Compass,
  Radar,
  Target,
  Trophy,
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
import { neonCardTitleStyle } from '@/utils/neonCardTitleStyle'

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Target,
  Waypoints,
  BarChart3,
  Bookmark,
  ClipboardCheck,
  Trophy,
  Compass,
  Bot,
  Radar,
}

const pageBackground = '#050214'

export function ToolsSection() {
  return (
    <section id="ferramentas" className="relative min-h-screen scroll-mt-20 overflow-hidden bg-[#050214] text-white lg:scroll-mt-[104px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={toolsAtmosphere}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-[0.04] blur-[8px] [mask-image:radial-gradient(circle_at_50%_48%,black,transparent_78%)]"
        />
        <div className="absolute inset-0 bg-[#050214]/78" />
      </div>

      <div className="nexa-shell relative z-30 bg-[#050214]/0 pb-14 pt-28 sm:pt-32 lg:pb-16 lg:pt-[145px] 2xl:pt-40">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="mx-auto max-w-[950px] text-center 2xl:max-w-[1120px]">
          <motion.p variants={fadeUp} transition={softTransition} className="mb-4 text-xs font-semibold uppercase text-nexa-violet sm:mb-5 sm:text-sm">
            • Ferramentas •
          </motion.p>
          <motion.h1 variants={fadeUp} transition={softTransition} className="font-display text-[2.25rem] font-bold leading-tight text-white max-[380px]:text-[2.02rem] sm:text-[2.75rem] md:text-[3.35rem] lg:text-[4rem] 2xl:text-[4.65rem]">
            Tudo que você precisa para <GradientText>descobrir</GradientText> e <span className="text-nexa-blue">construir</span> seu futuro.
          </motion.h1>
          <motion.p variants={fadeUp} transition={softTransition} className="mx-auto mt-5 max-w-[720px] text-base leading-7 text-white/78 sm:mt-6 sm:text-lg sm:leading-8 2xl:max-w-[820px] 2xl:text-xl 2xl:leading-9">
            Do autoconhecimento ao plano de ação: explore ferramentas completas que te ajudam a tomar decisões melhores e evoluir todos os dias.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="mt-10 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:gap-6"
        >
          {toolCards.map((tool) => {
            const Icon = iconMap[tool.icon]
            return (
              <GlassCard key={tool.number} variants={fadeUp} transition={softTransition} className="group h-full min-h-0 p-5 sm:min-h-[268px]">
                <div className="mb-2 text-sm font-semibold text-nexa-pink/80">{tool.number}</div>
                <div className="premium-icon-ring mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full transition duration-500 sm:mb-7 sm:h-24 sm:w-24">
                  <Icon className="h-10 w-10 text-[#F661FD] drop-shadow-[0_0_10px_rgba(246,97,253,0.42)] transition duration-500 group-hover:text-[#2DA8FF] group-hover:drop-shadow-[0_0_12px_rgba(45,168,255,0.44)]" />
                </div>
                <h2
                  className="font-display text-[1.02rem] font-semibold uppercase tracking-[0.02em]"
                  style={neonCardTitleStyle}
                >
                  {tool.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/76">{tool.description}</p>
              </GlassCard>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export function ToolsPage() {
  useEffect(() => {
    const previousBodyBackground = document.body.style.background
    const previousHtmlBackground = document.documentElement.style.background
    document.body.classList.add('nexa-mobile-clean-scrollbar')
    document.documentElement.classList.add('nexa-mobile-clean-scrollbar')
    document.body.style.background = pageBackground
    document.documentElement.style.background = pageBackground

    return () => {
      document.body.classList.remove('nexa-mobile-clean-scrollbar')
      document.documentElement.classList.remove('nexa-mobile-clean-scrollbar')
      document.body.style.background = previousBodyBackground
      document.documentElement.style.background = previousHtmlBackground
    }
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050214] text-white">
      <Header />
      <ParticleField density="high" motion="cinematic" className="z-10 opacity-95 mix-blend-screen" />
      <ToolsSection />
    </main>
  )
}
