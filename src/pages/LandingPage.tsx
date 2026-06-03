import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
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
  block,
}: {
  to: string
  children: ReactNode
  className?: string
  subtle?: boolean
  block?: boolean
}) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }} className={cn(block && 'w-full')}>
      <Link
        to={to}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden rounded-lg border text-sm font-semibold text-white transition duration-300',
          'before:absolute before:inset-0 before:bg-white/[0.07] before:opacity-0 before:transition before:duration-300 hover:before:opacity-100',
          block && 'w-full',
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
  const [open, setOpen] = useState(false)

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'group relative flex h-12 items-center px-3 text-base font-medium text-white/90 [transition:all_0.3s_ease] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:origin-center after:scale-x-0 after:bg-nexa-gradient after:opacity-0 after:shadow-[0_0_18px_rgba(181,73,240,0.88)] after:[transition:all_0.3s_ease] hover:text-[#B549F0] hover:drop-shadow-[0_0_10px_rgba(181,73,240,0.62)] hover:after:scale-x-100 hover:after:opacity-100',
      isActive &&
        'text-[#B549F0] drop-shadow-[0_0_10px_rgba(181,73,240,0.58)] after:scale-x-100 after:opacity-100',
    )

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="nexa-shell flex h-[104px] items-center justify-between gap-6 max-lg:h-20">
        <div className="shrink-0">
          <img
            src={logoNexa}
            alt="NEXA"
            loading="eager"
            decoding="sync"
            className="h-[72px] w-auto select-none object-contain drop-shadow-[0_0_18px_rgba(174,60,255,0.42)] max-sm:h-[50px]"
            draggable={false}
          />
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-14 lg:flex">
          {marketingLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className={navClass}
            >
              {link.label}
              <span className="ml-4 h-1 w-1 rounded-full bg-nexa-pink shadow-[0_0_12px_rgba(246,97,253,0.9)]" />
            </NavLink>
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

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#050615]/45 text-white shadow-[0_0_22px_rgba(95,59,255,0.2)] lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.24 }}
            className="relative z-[60] mx-5 rounded-2xl border border-nexa-violet/25 bg-[#050214] px-5 pb-6 pt-2 shadow-[0_24px_80px_rgba(5,2,20,0.55),0_0_34px_rgba(174,60,255,0.16)] lg:hidden"
          >
            <div className="mx-auto flex max-w-md flex-col gap-2">
              {marketingLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white/78 [transition:all_0.3s_ease] hover:bg-white/[0.05] hover:text-[#B549F0] hover:drop-shadow-[0_0_10px_rgba(181,73,240,0.56)]',
                      isActive &&
                        'bg-white/[0.06] text-[#B549F0] drop-shadow-[0_0_10px_rgba(181,73,240,0.5)] shadow-[inset_0_0_0_1px_rgba(181,73,240,0.3)]',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-3 max-[380px]:grid-cols-1">
                <LandingButton to="/login" subtle block>
                  Login
                </LandingButton>
                <LandingButton to="/painel" block className="min-h-12 px-8 py-4">
                  Painel
                </LandingButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function PortalVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 34, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ ...softTransition, delay: 0.12 }}
      className="pointer-events-none absolute inset-y-0 right-[clamp(-5rem,-2vw,-1rem)] z-10 w-[min(66vw,1220px)] min-w-[730px] max-w-[1220px] max-lg:relative max-lg:inset-auto max-lg:mx-auto max-lg:mt-8 max-lg:h-[clamp(340px,58vw,560px)] max-lg:w-full max-lg:min-w-0 max-lg:max-w-[860px] max-lg:translate-x-0 max-md:h-[clamp(300px,82vw,460px)] max-sm:h-[clamp(260px,88vw,390px)] 2xl:w-[min(68vw,1400px)] 2xl:max-w-[1400px]"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        className="landing-portal-frame absolute inset-y-[7%] right-0 w-full overflow-hidden max-lg:inset-y-0"
      >
        <img
          src={landingHero}
          alt="Portal futurista com cidade neon e pessoa observando a jornada NEXA"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="landing-portal-image h-full w-full select-none object-contain opacity-[0.98] mix-blend-screen max-sm:opacity-100"
          draggable={false}
        />
        <div className="landing-portal-overlay-x absolute inset-0" />
        <div className="landing-portal-overlay-y absolute inset-0" />
        <div className="landing-portal-overlay-radial absolute inset-0" />
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
    <main className="relative min-h-[100svh] overflow-x-hidden bg-[#050214] text-white lg:h-[100svh] lg:overflow-hidden">
      <LandingHeader />
      <ParticleField density="high" motion="cinematic" className="z-20 opacity-95 mix-blend-screen" />
      <div className="absolute inset-0 z-0 nexa-grid-bg opacity-[0.055]" />
      <div className="absolute left-[14%] top-[26%] z-0 h-64 w-64 rounded-full bg-nexa-violet/10 blur-3xl" />

      <section className="nexa-shell relative z-30 grid min-h-[100svh] grid-cols-1 items-center bg-[#050214]/0 pb-12 pt-24 max-lg:content-start lg:h-[100svh] lg:grid-cols-[0.62fr_1fr] lg:gap-2 lg:pb-8 lg:pt-[104px] xl:grid-cols-[0.65fr_1fr] 2xl:grid-cols-[0.68fr_1fr]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-30 mx-auto w-full max-w-[670px] pt-4 text-center lg:mx-0 lg:ml-[clamp(1.5rem,3vw,3.5rem)] lg:max-w-[min(43vw,760px)] lg:text-left 2xl:max-w-[820px]"
        >
          <motion.h1
            variants={fadeUp}
            transition={softTransition}
            className="font-display text-[2.65rem] font-bold uppercase leading-[1.02] text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.12)] max-sm:mx-auto max-sm:flex max-sm:w-fit max-sm:flex-col max-sm:items-start max-sm:gap-[0.08em] max-sm:leading-none max-[380px]:text-[2.35rem] sm:text-[3.3rem] md:text-[4rem] lg:text-[4.7rem] xl:text-[5.05rem] 2xl:text-[5.65rem] min-[1800px]:text-[6.45rem] min-[2200px]:text-[7.15rem]"
          >
            <span className="block max-sm:whitespace-nowrap max-sm:text-left">Descubra.</span>
            <span className="block max-sm:whitespace-nowrap max-sm:text-left">Escolha.</span>
            <span className="block max-sm:whitespace-nowrap max-sm:text-left">
              <GradientText>Construa.</GradientText>
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} transition={softTransition} className="mx-auto mt-6 hidden max-w-[575px] text-base leading-7 text-white/86 sm:block sm:text-lg sm:leading-8 md:max-w-[620px] lg:mx-0 lg:text-[1.18rem] lg:leading-9 xl:max-w-[575px] 2xl:max-w-[660px] 2xl:text-[1.3rem] 2xl:leading-10">
            Descubra a área que mais combina com você e receba um plano completo de evolução:{' '}
            <span className="text-nexa-violet">estudos, habilidades, recursos, metas</span> e{' '}
            <span className="text-nexa-cyan">dashboards</span> para acompanhar cada passo da sua jornada.
          </motion.p>
          <motion.p
            variants={fadeUp}
            transition={softTransition}
            className="mx-auto mt-6 w-fit text-center text-[clamp(0.92rem,3.85vw,1rem)] leading-[1.62] text-white/86 sm:hidden"
          >
            <span className="block whitespace-nowrap">Descubra a área que mais combina</span>
            <span className="block whitespace-nowrap">com você e receba um plano completo</span>
            <span className="block whitespace-nowrap">
              de evolução: <span className="text-nexa-violet">estudos, habilidades,</span>
            </span>
            <span className="block whitespace-nowrap">
              <span className="text-nexa-violet">recursos, metas</span> e <span className="text-nexa-cyan">dashboards</span>
            </span>
            <span className="block whitespace-nowrap">para acompanhar cada passo da sua jornada.</span>
          </motion.p>
          <motion.div variants={fadeUp} transition={softTransition} className="mx-auto mt-9 max-w-[448px] max-sm:w-[min(320px,calc(100vw-56px))] lg:mx-0 xl:max-w-[448px] 2xl:max-w-[510px]">
            <LandingButton to="/cadastro" className="h-[72px] w-full text-base uppercase tracking-[0.16em] sm:h-[76px] sm:text-lg lg:h-[84px] lg:text-xl xl:h-[84px] 2xl:h-[92px] 2xl:text-[1.35rem]">
              Começar agora
            </LandingButton>
          </motion.div>
        </motion.div>
        <PortalVisual />
      </section>
    </main>
  )
}
