import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState, type PropsWithChildren } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoNexa from '@/assets/logo.png'
import { dashboardNav } from '@/data/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { cn } from '@/utils/cn'

const protectedDashboardItems = new Set([
  'Teste de perfil',
  'Trilhas de estudo',
  'Plano de ação',
  'Mapa de habilidades',
  'Configurações',
])

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate()
  const requireAuth = useRequireAuth()
  const { signOut } = useAuth()

  const handleNavigation = (item: string) => {
    onNavigate?.()
    if (protectedDashboardItems.has(item)) requireAuth()
  }

  const handleSignOut = async () => {
    onNavigate?.()
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <aside className="glass-panel flex h-full flex-col rounded-nexa border-white/10 px-3 py-5" style={{ backgroundColor: '#050214' }}>
      <Link to="/" className="mb-4 flex px-5" onClick={onNavigate}>
        <img
          src={logoNexa}
          alt="NEXA"
          className="h-auto w-[172px] select-none object-contain drop-shadow-[0_0_16px_rgba(174,60,255,0.32)]"
          draggable={false}
        />
      </Link>
      <nav className="flex flex-col gap-0.5">
        {dashboardNav.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => handleNavigation(item)}
            className={cn(
              'rounded-md px-6 py-2.5 text-left text-sm font-medium text-white/74 transition hover:bg-white/[0.055] hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(174,60,255,0.22)]',
              index === 0 && 'bg-[linear-gradient(100deg,rgba(174,60,255,0.78),rgba(95,59,255,0.42))] text-white shadow-neon',
            )}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="mt-2 pt-1">
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full rounded-md px-6 py-2.5 text-left text-sm font-semibold text-[#ff7bc7] transition hover:bg-[#ff3aa0]/10"
        >
          Sair
        </button>
      </div>
    </aside>
  )
}

export function DashboardLayout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const displayName = String(user?.user_metadata?.full_name || user?.email || '').trim()
  const avatarInitial = displayName ? displayName.charAt(0).toLocaleUpperCase('pt-BR') : 'M'

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    const previousRootBackground = root.style.background
    const previousBodyBackground = body.style.background

    root.style.background = '#050214'
    body.style.background = '#050214'

    return () => {
      root.style.background = previousRootBackground
      body.style.background = previousBodyBackground
    }
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050214]">
      <div className="relative z-10 grid min-h-screen grid-cols-[248px_1fr] gap-9 p-3 lg:p-5 max-lg:block">
        <div className="sticky top-3 h-[calc(100vh-24px)] max-lg:hidden">
          <Sidebar />
        </div>

        <div className="lg:hidden">
          <div className="mb-4 flex items-center justify-between rounded-nexa border border-white/10 bg-[#050214] px-4 py-3 backdrop-blur-xl">
            <img
              src={logoNexa}
              alt="NEXA"
              className="h-auto w-[154px] select-none object-contain drop-shadow-[0_0_16px_rgba(174,60,255,0.32)]"
              draggable={false}
            />
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
            <div className="flex items-center self-start">
              <button type="button" className="flex items-center gap-4 text-white">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-nexa-gradient-hot font-bold shadow-neon">
                  {avatarInitial}
                </span>
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
