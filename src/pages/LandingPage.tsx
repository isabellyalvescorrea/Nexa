import { motion } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import landingHero from '@/assets/generated/landing-hero.webp'
import logoNexa from '@/assets/logo.png'
import { fadeUp, softTransition, staggerContainer } from '@/animations/motion'
import { GradientText } from '@/components/GradientText'
import { ParticleField } from '@/components/ParticleField'
import { marketingLinks } from '@/data/navigation'
import { cn } from '@/utils/cn'

if (typeof document !== 'undefined' && !document.querySelector(`link[href="${landingHero}"]`)) {
  const preload = document.createElement('link')
  preload.rel = 'preload'
  preload.as = 'image'
  preload.href = landingHero
  preload.type = 'image/webp'
  preload.setAttribute('fetchpriority', 'high')
  document.head.appendChild(preload)
}

const landingBackground = '#050214'

function LandingButton({
  to,
  children,
  className,
  subtle,
}: {
  to: string
  children: ReactNode
  className?: string
  subtle?: boolean
}) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
      <Link
        to={to}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden rounded-lg border text-sm font-semibold text-white transition duration-300',
          'before:absolute before:inset-0 before:bg-white/[0.07] before:opacity-0 before:transition before:duration-300 hover:before:opacity-100',
          subtle
            ? 'border-white/10 bg-[#050615]/45 px-8 py-4 shadow-[0_0_22px_rgba(95,59,255,0.14)] hover:border-nexa-violet/55 hover:shadow-[0_0_28px_rgba(85,98,255,0.26)]'
            : 'border-[rgba(174,60,255,0.65)] bg-[linear-gradient(90deg,#AE3CFF_0%,#5F3BFF_48%,#01A2ED_100%)] shadow-[0_0_16px_rgba(174,60,255,0.35),0_0_24px_rgba(1,162,237,0.25),inset_0_0_14px_rgba(255,255,255,0.08)] hover:bg-[linear-gradient(90deg,#AE3CFF_0%,#5F3BFF_48%,#01A2ED_100%)] hover:shadow-[0_0_22px_rgba(174,60,255,0.46),0_0_32px_rgba(1,162,237,0.32),inset_0_0_18px_rgba(255,255,255,0.10)]',
          className,
        )}
      >
        <span className="relative z-10">{children}</span>
      </Link>
    </motion.div>
  )
}

function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="nexa-shell flex h-[104px] items-center justify-between gap-6 max-lg:h-20">
        <Link to="/" aria-label="Ir para a página inicial" className="shrink-0">
          <img
            src={logoNexa}
            alt="NEXA"
            loading="eager"
            decoding="sync"
            className="h-[72px] w-auto select-none object-contain drop-shadow-[0_0_18px_rgba(174,60,255,0.42)] max-sm:h-[50px]"
            draggable={false}
          />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-14 lg:flex">
          {marketingLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="group relative flex h-12 items-center px-3 text-base font-medium text-white/90 transition hover:text-white"
            >
              {link.label}
              <span className="ml-4 h-1 w-1 rounded-full bg-nexa-pink shadow-[0_0_12px_rgba(246,97,253,0.9)]" />
              <span className="absolute bottom-0 left-3 right-3 h-px origin-center scale-x-0 bg-nexa-gradient opacity-0 shadow-[0_0_18px_rgba(174,60,255,0.86)] transition duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-7 lg:flex">
          <LandingButton to="/login" subtle className="min-w-[118px]">
            Login
          </LandingButton>
          <LandingButton to="/painel" className="min-w-[136px] px-8 py-4">
            Painel
          </LandingButton>
        </div>
      </div>
    </header>
  )
}

function PortalVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 34, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ ...softTransition, delay: 0.12 }}
      className="pointer-events-none absolute inset-y-0 right-[-1.5vw] z-10 w-[64vw] min-w-[730px] max-w-[1060px] max-lg:right-1/2 max-lg:w-[880px] max-lg:translate-x-1/2 max-md:w-[700px]"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-y-[7%] right-0 w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse at 55% 52%, #000 0%, #000 47%, rgba(0,0,0,.58) 62%, transparent 86%)',
          maskImage:
            'radial-gradient(ellipse at 55% 52%, #000 0%, #000 47%, rgba(0,0,0,.58) 62%, transparent 86%)',
        }}
      >
        <img
          src={landingHero}
          alt="Portal futurista com cidade neon e pessoa observando a jornada NEXA"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="h-full w-full select-none object-contain opacity-[0.98] mix-blend-screen"
          style={{
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, rgba(0,0,0,.12) 10%, rgba(0,0,0,.8) 25%, #000 38%, #000 70%, rgba(0,0,0,.38) 80%, transparent 92%, transparent 100%)',
            maskImage:
              'linear-gradient(90deg, transparent 0%, rgba(0,0,0,.12) 10%, rgba(0,0,0,.8) 25%, #000 38%, #000 70%, rgba(0,0,0,.38) 80%, transparent 92%, transparent 100%)',
          }}
          draggable={false}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050214_0%,rgba(5,2,20,0.64)_14%,rgba(5,2,20,0.16)_34%,transparent_50%,transparent_62%,rgba(5,2,20,0.24)_78%,#050214_94%,#050214_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#050214_0%,rgba(5,2,20,0.28)_9%,transparent_18%,transparent_78%,#050214_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_52%,transparent_0%,transparent_44%,rgba(5,2,20,0.28)_66%,#050214_95%,#050214_100%)]" />
      </motion.div>
    </motion.div>
  )
}

export function LandingPage() {
  useEffect(() => {
    const previousBodyBackground = document.body.style.background
    const previousHtmlBackground = document.documentElement.style.background
    document.body.style.background = landingBackground
    document.documentElement.style.background = landingBackground

    return () => {
      document.body.style.background = previousBodyBackground
      document.documentElement.style.background = previousHtmlBackground
    }
  }, [])

  return (
    <main className="relative h-[100svh] overflow-hidden bg-[#050214] text-white max-lg:h-auto max-lg:min-h-screen">
      <LandingHeader />
      <ParticleField density="high" motion="cinematic" className="z-20 opacity-95 mix-blend-screen" />
      <div className="absolute inset-0 z-0 nexa-grid-bg opacity-[0.055]" />
      <div className="absolute left-[14%] top-[26%] z-0 h-64 w-64 rounded-full bg-nexa-violet/10 blur-3xl" />
      <PortalVisual />

      <section className="nexa-shell relative z-30 grid h-[100svh] grid-cols-[0.65fr_1fr] items-center gap-2 bg-[#050214]/0 pb-8 pt-[104px] max-lg:h-auto max-lg:min-h-screen max-lg:grid-cols-1 max-lg:pb-12 max-lg:pt-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative ml-[clamp(1.5rem,3vw,3.5rem)] max-w-[670px] max-lg:ml-0 max-lg:pt-4"
        >
          <motion.h1
            variants={fadeUp}
            transition={softTransition}
            className="font-display text-[5.05rem] font-bold uppercase leading-[1.02] text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.12)] max-xl:text-[4.35rem] max-lg:text-[4rem] max-md:text-[3rem] max-sm:text-[2.45rem]"
          >
            <span className="block">Descubra.</span>
            <span className="block">Escolha.</span>
            <GradientText>Construa.</GradientText>
          </motion.h1>
          <motion.p variants={fadeUp} transition={softTransition} className="mt-6 max-w-[575px] text-[1.18rem] leading-9 text-white/86 max-xl:max-w-[540px] max-xl:text-lg max-xl:leading-8 max-sm:text-base max-sm:leading-7">
            Descubra a área que mais combina com você e receba um plano completo de evolução:{' '}
            <span className="text-nexa-violet">estudos, habilidades, recursos, metas</span> e{' '}
            <span className="text-nexa-cyan">dashboards</span> para acompanhar cada passo da sua jornada.
          </motion.p>
          <motion.div variants={fadeUp} transition={softTransition} className="mt-10 max-w-[448px] max-xl:max-w-[420px] max-sm:max-w-full">
            <LandingButton to="/cadastro" className="h-[84px] w-full text-xl uppercase tracking-[0.18em] max-xl:h-[78px] max-xl:text-lg">
              Começar agora
            </LandingButton>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
