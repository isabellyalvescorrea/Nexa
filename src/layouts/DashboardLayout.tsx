import { AnimatePresence, motion } from 'framer-motion'
import { Bell, ChevronDown, Menu, X } from 'lucide-react'
import { useState, type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { ParticleField } from '@/components/ParticleField'
import { dashboardNav } from '@/data/navigation'
import { cn } from '@/utils/cn'

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="glass-panel flex h-full flex-col rounded-nexa border-white/10 px-3 py-8">
      <Link to="/" className="mb-9 flex px-5" onClick={onNavigate}>
        <Logo className="w-[182px]" />
      </Link>
      <nav className="flex flex-1 flex-col gap-1">
        {dashboardNav.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={onNavigate}
            className={cn(
              'rounded-md px-7 py-3.5 text-left text-sm font-medium text-white/74 transition hover:bg-white/[0.055] hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(174,60,255,0.22)]',
              index === 0 && 'bg-[linear-gradient(100deg,rgba(174,60,255,0.78),rgba(95,59,255,0.42))] text-white shadow-neon',
            )}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="mt-8 border-t border-white/8 pt-6">
        <button type="button" className="w-full rounded-md px-7 py-3 text-left text-sm font-medium text-white/86 transition hover:bg-white/[0.05]">
          Configurações
        </button>
        <button type="button" className="w-full rounded-md px-7 py-3 text-left text-sm font-semibold text-[#ff7bc7] transition hover:bg-[#ff3aa0]/10">
          Sair
        </button>
      </div>
    </aside>
  )
}

export function DashboardLayout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)

  return (
    <main className="relative min-h-screen overflow-hidden bg-nexa-dark">
      <ParticleField density="low" className="opacity-60" />
      <div className="absolute inset-0 nexa-grid-bg opacity-20" />

      <div className="relative z-10 grid min-h-screen grid-cols-[248px_1fr] gap-9 p-3 lg:p-5 max-lg:block">
        <div className="sticky top-3 h-[calc(100vh-24px)] max-lg:hidden">
          <Sidebar />
        </div>

        <div className="lg:hidden">
          <div className="mb-4 flex items-center justify-between rounded-nexa border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-xl">
            <Logo className="w-[154px]" />
            <button
              type="button"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="fixed inset-x-3 top-20 z-50 h-[calc(100vh-92px)]"
              >
                <Sidebar onNavigate={() => setOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <section className="min-w-0 px-2 pb-6 pt-7 max-lg:px-0 max-lg:pt-0">
          <header className="mb-6 flex items-start justify-between gap-5 max-md:flex-col">
            <h1 className="max-w-[760px] font-display text-[2rem] font-bold leading-tight text-white max-sm:text-[1.6rem]">
              Todas as ferramentas que você precisa estão aqui no <span className="gradient-text">seu painel</span>.
            </h1>
            <div className="flex items-center gap-5 self-start">
              <button type="button" aria-label="Notificações" className="relative text-white transition hover:text-nexa-cyan">
                <Bell className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-nexa-pink shadow-[0_0_12px_rgba(246,97,253,0.9)]" />
              </button>
              <button type="button" className="flex items-center gap-4 text-white">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-nexa-gradient-hot font-bold shadow-neon">M</span>
                <ChevronDown className="h-4 w-4 text-white/70" />
              </button>
            </div>
          </header>
          {children}
        </section>
      </div>
    </main>
  )
}
