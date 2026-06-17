import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logoNexa from '@/assets/logo.png'
import logoNexaLight from '@/assets/nexa-logo-light-normalized.png'
import { PanelPreferencesProvider } from '@/components/dashboard/PanelPreferencesProvider'
import { dashboardNav } from '@/data/navigation'
import { useAuth } from '@/hooks/useAuth'
import { usePanelPreferences } from '@/hooks/usePanelPreferences'
import { cn } from '@/utils/cn'

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const { panelTheme } = usePanelPreferences()
  const sidebarLogo = panelTheme === 'light' ? logoNexaLight : logoNexa

  const handleSignOut = async () => {
    onNavigate?.()
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <aside className="dashboard-sidebar glass-panel flex h-full flex-col rounded-nexa border-white/10 px-3 py-5">
      <Link to="/" className="mb-4 flex px-5" onClick={onNavigate}>
        <img
          src={sidebarLogo}
          alt="NEXA"
          className="h-auto w-[172px] select-none object-contain drop-shadow-[0_0_16px_rgba(174,60,255,0.32)]"
          draggable={false}
        />
      </Link>
      <nav className="flex flex-col gap-0.5">
        {dashboardNav.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/painel'}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'rounded-md px-6 py-2.5 text-left text-sm font-medium text-white/74 transition hover:bg-white/[0.055] hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(174,60,255,0.22)]',
                isActive && 'bg-[linear-gradient(100deg,rgba(174,60,255,0.78),rgba(95,59,255,0.42))] text-white shadow-neon',
              )
            }
          >
            {item.label}
          </NavLink>
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

export function DashboardLayout() {
  return (
    <PanelPreferencesProvider>
      <DashboardLayoutShell />
    </PanelPreferencesProvider>
  )
}

function DashboardLayoutShell() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()
  const { panelTheme, panelVisualTheme, panelLayout, highContrast, fontSize } = usePanelPreferences()
  const headerLogo = panelTheme === 'light' ? logoNexaLight : logoNexa
  const isOverview = location.pathname === '/painel' || location.pathname === '/painel/'
  const displayName = String(user?.user_metadata?.full_name || user?.email || '').trim()
  const avatarInitial = displayName ? displayName.charAt(0).toLocaleUpperCase('pt-BR') : 'M'

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    const previousRootBackground = root.style.background
    const previousRootFontSize = root.style.fontSize
    const previousBodyBackground = body.style.background
    const dashboardBackground = panelTheme === 'light' ? '#edf4ff' : '#050214'
    const dashboardFontSize = fontSize === 'large' ? '18px' : fontSize === 'medium' ? '17px' : ''

    root.style.background = dashboardBackground
    root.style.fontSize = dashboardFontSize
    body.style.background = dashboardBackground

    return () => {
      root.style.background = previousRootBackground
      root.style.fontSize = previousRootFontSize
      body.style.background = previousBodyBackground
    }
  }, [fontSize, panelTheme])

  return (
    <main
      className="dashboard-shell relative min-h-screen overflow-hidden"
      data-panel-theme={panelTheme}
      data-panel-visual-theme={panelVisualTheme}
      data-panel-layout={panelLayout}
      data-panel-contrast={highContrast ? 'high' : 'normal'}
      data-panel-font-size={fontSize}
    >
      <div className="relative z-10 grid min-h-screen grid-cols-[248px_1fr] gap-9 p-3 lg:p-5 max-lg:block">
        <div className="sticky top-3 h-[calc(100vh-24px)] max-lg:hidden">
          <Sidebar />
        </div>

        <div className="lg:hidden">
          <div className="dashboard-mobile-header mb-4 flex items-center justify-between rounded-nexa border border-white/10 px-4 py-3 backdrop-blur-xl">
            <img
              src={headerLogo}
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

        <section className="dashboard-content min-w-0 px-2 pb-6 pt-7 max-lg:px-0 max-lg:pt-0">
          {isOverview && (
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
          )}
          <Outlet />
        </section>
      </div>
    </main>
  )
}
