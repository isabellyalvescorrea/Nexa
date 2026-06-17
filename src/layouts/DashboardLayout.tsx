import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  Camera,
  ChevronDown,
  LogOut,
  Menu,
  Pencil,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { createPortal } from 'react-dom'
import logoNexa from '@/assets/logo.png'
import logoNexaLight from '@/assets/nexa-logo-light-normalized.png'
import { PanelPreferencesProvider } from '@/components/dashboard/PanelPreferencesProvider'
import { dashboardNav } from '@/data/navigation'
import { useAuth } from '@/hooks/useAuth'
import type { DashboardActionsContext, DashboardDemoAction } from '@/hooks/useDashboardActions'
import { usePanelPreferences } from '@/hooks/usePanelPreferences'
import { supabase } from '@/lib/supabase'
import { cn } from '@/utils/cn'

const profileAvatarStorageKey = 'nexa-profile-avatar'
const profileNameStorageKey = 'nexa-profile-name'
const fallbackProfileName = 'Usuário Nexa'

type PanelFeedback = {
  kind: 'success' | 'error' | 'info'
  text: string
}

function readLocalStorage(key: string) {
  if (typeof window === 'undefined') return ''

  try {
    return window.localStorage.getItem(key) ?? ''
  } catch {
    return ''
  }
}

function writeLocalStorage(key: string, value: string) {
  if (typeof window === 'undefined') return

  try {
    if (value) {
      window.localStorage.setItem(key, value)
    } else {
      window.localStorage.removeItem(key)
    }
  } catch {
    // Local storage can fail in private browsing or quota exhaustion. The UI still updates for this session.
  }
}

function sanitizeProfileName(name: unknown) {
  const normalized = typeof name === 'string' ? name.trim() : ''
  return normalized && normalized !== fallbackProfileName ? normalized : ''
}

function getEmailDisplayName(email: string) {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) return ''
  return trimmedEmail.split('@')[0] || trimmedEmail
}

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (!parts.length) return 'M'
  if (parts.length === 1) return parts[0].slice(0, 1).toLocaleUpperCase('pt-BR')

  return `${parts[0].slice(0, 1)}${parts[1].slice(0, 1)}`.toLocaleUpperCase('pt-BR')
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    const handleChange = () => setMatches(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

function Sidebar({
  onNavigate,
  onRequestLogout,
}: {
  onNavigate?: () => void
  onRequestLogout: () => void
}) {
  const { panelTheme } = usePanelPreferences()
  const sidebarLogo = panelTheme === 'light' ? logoNexaLight : logoNexa

  const handleLogoutClick = () => {
    onNavigate?.()
    onRequestLogout()
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
          onClick={handleLogoutClick}
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
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [demoAction, setDemoAction] = useState<DashboardDemoAction | null>(null)
  const [logoutSubmitting, setLogoutSubmitting] = useState(false)
  const [logoutError, setLogoutError] = useState('')
  const [savedProfileName, setSavedProfileName] = useState(() => readLocalStorage(profileNameStorageKey))
  const [profileNameOverride, setProfileNameOverride] = useState('')
  const [profileAvatar, setProfileAvatar] = useState(() => readLocalStorage(profileAvatarStorageKey))
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { panelTheme, panelVisualTheme, panelLayout, highContrast, fontSize } = usePanelPreferences()
  const headerLogo = panelTheme === 'light' ? logoNexaLight : logoNexa
  const isOverview = location.pathname === '/painel' || location.pathname === '/painel/'
  const metadataFullName = sanitizeProfileName(user?.user_metadata?.full_name)
  const metadataName = sanitizeProfileName(user?.user_metadata?.name)
  const localProfileName = sanitizeProfileName(savedProfileName)
  const emailName = String(user?.email || '').trim()
  const profileName =
    sanitizeProfileName(profileNameOverride) ||
    metadataFullName ||
    metadataName ||
    localProfileName ||
    getEmailDisplayName(emailName) ||
    fallbackProfileName
  const avatarInitials = getInitials(profileName)

  const requestLogout = useCallback(() => {
    setLogoutError('')
    setLogoutOpen(true)
  }, [])

  const openDemoAction = useCallback((action: DashboardDemoAction | string) => {
    setDemoAction(typeof action === 'string' ? { title: action } : action)
  }, [])

  const confirmLogout = useCallback(async () => {
    setLogoutSubmitting(true)
    setLogoutError('')

    const result = await signOut()
    setLogoutSubmitting(false)

    if (!result.ok) {
      setLogoutError(result.error ?? 'Não foi possível sair. Tente novamente.')
      return
    }

    setLogoutOpen(false)
    setProfileMenuOpen(false)
    setOpen(false)
    navigate('/', { replace: true })
  }, [navigate, signOut])

  const outletContext = useMemo<DashboardActionsContext>(
    () => ({ requestLogout, openDemoAction }),
    [openDemoAction, requestLogout],
  )

  const handleAvatarChange = useCallback((nextAvatar: string) => {
    setProfileAvatar(nextAvatar)
    writeLocalStorage(profileAvatarStorageKey, nextAvatar)
  }, [])

  const handleNameChange = useCallback(async (nextName: string) => {
    setProfileNameOverride(nextName)
    setSavedProfileName(nextName)
    writeLocalStorage(profileNameStorageKey, nextName)

    if (!supabase) return

    const { error } = await supabase.auth.updateUser({ data: { full_name: nextName, name: nextName } })
    if (error) throw error
  }, [])

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
          <Sidebar onRequestLogout={requestLogout} />
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
                <Sidebar onNavigate={() => setOpen(false)} onRequestLogout={requestLogout} />
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
              <ProfileDropdown
                avatar={profileAvatar}
                initials={avatarInitials}
                name={profileName}
                email={emailName}
                open={profileMenuOpen}
                onOpenChange={setProfileMenuOpen}
                onAvatarChange={handleAvatarChange}
                onNameChange={handleNameChange}
                onRequestLogout={requestLogout}
              />
            </header>
          )}
          <Outlet context={outletContext} />
        </section>
      </div>

      <LogoutConfirmModal
        open={logoutOpen}
        submitting={logoutSubmitting}
        error={logoutError}
        onClose={() => {
          if (!logoutSubmitting) setLogoutOpen(false)
        }}
        onConfirm={confirmLogout}
      />
      <DemoActionModal
        action={demoAction}
        onClose={() => setDemoAction(null)}
      />
    </main>
  )
}

function ProfileAvatar({ avatar, initials, size = 'md' }: { avatar: string; initials: string; size?: 'md' | 'lg' }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-nexa-gradient-hot font-bold text-white shadow-neon',
        size === 'lg' ? 'h-14 w-14 text-base' : 'h-11 w-11 text-sm',
      )}
    >
      {avatar ? (
        <img src={avatar} alt="" className="h-full w-full object-cover" draggable={false} />
      ) : (
        initials
      )}
    </span>
  )
}

function ProfileDropdown({
  avatar,
  initials,
  name,
  email,
  open,
  onOpenChange,
  onAvatarChange,
  onNameChange,
  onRequestLogout,
}: {
  avatar: string
  initials: string
  name: string
  email: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onAvatarChange: (avatar: string) => void
  onNameChange: (name: string) => Promise<void>
  onRequestLogout: () => void
}) {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const sheetRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [editingName, setEditingName] = useState(false)
  const [draftName, setDraftName] = useState(name)
  const [savingName, setSavingName] = useState(false)
  const [feedback, setFeedback] = useState<PanelFeedback | null>(null)
  const isMobileProfileMenu = useMediaQuery('(max-width: 1023px)')
  const { panelTheme, panelVisualTheme, panelLayout, highContrast, fontSize } = usePanelPreferences()

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (!menuRef.current?.contains(target) && !sheetRef.current?.contains(target)) {
        onOpenChange(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onOpenChange, open])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    const validMime = ['image/png', 'image/jpeg', 'image/webp'].includes(file.type)
    const validExtension = /\.(png|jpe?g|webp)$/i.test(file.name)

    if (!validMime && !validExtension) {
      setFeedback({ kind: 'error', text: 'Use uma imagem PNG, JPG, JPEG ou WebP.' })
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setFeedback({ kind: 'error', text: 'Use uma imagem de até 2 MB.' })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      if (!result) {
        setFeedback({ kind: 'error', text: 'Não foi possível carregar a imagem.' })
        return
      }

      onAvatarChange(result)
      setFeedback({ kind: 'success', text: 'Foto de perfil atualizada neste dispositivo.' })
    }
    reader.onerror = () => {
      setFeedback({ kind: 'error', text: 'Não foi possível carregar a imagem.' })
    }
    reader.readAsDataURL(file)
  }

  const handleNameSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = draftName.trim()

    if (trimmedName.length < 2) {
      setFeedback({ kind: 'error', text: 'Informe um nome com pelo menos 2 caracteres.' })
      return
    }

    if (trimmedName.length > 50) {
      setFeedback({ kind: 'error', text: 'Use no máximo 50 caracteres para o nome.' })
      return
    }

    setSavingName(true)
    try {
      await onNameChange(trimmedName)
      setEditingName(false)
      setFeedback({ kind: 'success', text: 'Nome de usuário atualizado.' })
    } catch {
      setFeedback({ kind: 'info', text: 'Nome salvo neste dispositivo.' })
    } finally {
      setSavingName(false)
    }
  }

  const menuContent = (
    <>
      <div className="flex items-center gap-4 border-b border-white/10 pb-4">
        <ProfileAvatar avatar={avatar} initials={initials} size="lg" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{name}</p>
          <p className="mt-1 truncate text-xs text-white/55">{email || 'Perfil Nexa'}</p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mt-3 grid gap-2">
        <ProfileMenuButton onClick={() => fileInputRef.current?.click()}>
          <Camera className="h-4 w-4" />
          {avatar ? 'Trocar foto de perfil' : 'Colocar foto de perfil'}
        </ProfileMenuButton>

        {avatar && (
          <ProfileMenuButton
            onClick={() => {
              onAvatarChange('')
              setFeedback({ kind: 'success', text: 'Foto de perfil removida.' })
            }}
          >
            <Trash2 className="h-4 w-4" />
            Remover foto
          </ProfileMenuButton>
        )}

        <ProfileMenuButton
          onClick={() => {
            setDraftName(name)
            setFeedback(null)
            setEditingName((current) => !current)
          }}
        >
          <Pencil className="h-4 w-4" />
          Trocar nome de usuÃ¡rio
        </ProfileMenuButton>

        <ProfileMenuButton
          tone="danger"
          onClick={() => {
            onOpenChange(false)
            onRequestLogout()
          }}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </ProfileMenuButton>
      </div>

      <AnimatePresence initial={false}>
        {editingName && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            onSubmit={handleNameSubmit}
          >
            <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.035] p-3">
              <label className="text-xs font-semibold text-white/72" htmlFor="profile-name">
                Nome de usuÃ¡rio
              </label>
              <div className="mt-2 flex gap-2 max-sm:flex-col">
                <input
                  id="profile-name"
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  minLength={2}
                  maxLength={50}
                  className="dashboard-profile-input min-h-10 flex-1 rounded-lg border px-3 text-sm outline-none transition"
                />
                <button
                  type="submit"
                  disabled={savingName}
                  className="rounded-lg border border-[#AE3CFF]/50 bg-[#AE3CFF]/14 px-4 text-sm font-semibold text-[#f0c7ff] transition hover:border-[#01A2ED]/60 hover:text-[#9ee3ff] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingName ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {feedback && (
        <p
          role={feedback.kind === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          className={cn(
            'mt-3 rounded-lg border px-3 py-2 text-xs',
            feedback.kind === 'error' && 'border-[#ff7bc7]/30 bg-[#ff3aa0]/10 text-[#ff9fd4]',
            feedback.kind === 'success' && 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
            feedback.kind === 'info' && 'border-[#01A2ED]/25 bg-[#01A2ED]/10 text-[#9ee3ff]',
          )}
        >
          {feedback.text}
        </p>
      )}
    </>
  )

  const mobileMenu =
    open && isMobileProfileMenu && typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="dashboard-shell dashboard-profile-sheet-overlay fixed inset-0 z-[95] flex items-end justify-center px-3 py-3 sm:px-4 sm:py-4"
              data-panel-theme={panelTheme}
              data-panel-visual-theme={panelVisualTheme}
              data-panel-layout={panelLayout}
              data-panel-contrast={highContrast ? 'high' : 'normal'}
              data-panel-font-size={fontSize}
              style={{ background: 'transparent' }}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) onOpenChange(false)
              }}
            >
              <motion.div
                ref={sheetRef}
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 28, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                role="dialog"
                aria-modal="true"
                aria-label="Menu do perfil"
                className="dashboard-profile-menu dashboard-profile-sheet w-[min(calc(100vw-24px),420px)] max-h-[calc(100dvh-24px)] overflow-y-auto rounded-2xl border p-4 shadow-[0_20px_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
              >
                {menuContent}
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )
      : null

  return (
    <div ref={menuRef} className="relative flex items-center self-start">
      <button
        type="button"
        aria-haspopup={isMobileProfileMenu ? 'dialog' : 'menu'}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className="dashboard-avatar-trigger flex items-center gap-4 text-white transition hover:text-[#B549F0]"
      >
        <ProfileAvatar avatar={avatar} initials={initials} />
        <ChevronDown className={cn('h-4 w-4 text-white/70 transition', open && 'rotate-180 text-[#B549F0]')} />
      </button>

      <AnimatePresence>
        {open && !isMobileProfileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="menu"
            className="dashboard-profile-menu absolute right-0 top-[calc(100%+0.85rem)] z-50 w-[min(360px,calc(100vw-2rem))] rounded-2xl border p-4 shadow-[0_20px_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <ProfileAvatar avatar={avatar} initials={initials} size="lg" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{name}</p>
                <p className="mt-1 truncate text-xs text-white/55">{email || 'Perfil Nexa'}</p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="mt-3 grid gap-2">
              <ProfileMenuButton onClick={() => fileInputRef.current?.click()}>
                <Camera className="h-4 w-4" />
                {avatar ? 'Trocar foto de perfil' : 'Colocar foto de perfil'}
              </ProfileMenuButton>

              {avatar && (
                <ProfileMenuButton
                  onClick={() => {
                    onAvatarChange('')
                    setFeedback({ kind: 'success', text: 'Foto de perfil removida.' })
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  Remover foto
                </ProfileMenuButton>
              )}

              <ProfileMenuButton
                onClick={() => {
                  setDraftName(name)
                  setFeedback(null)
                  setEditingName((current) => !current)
                }}
              >
                <Pencil className="h-4 w-4" />
                Trocar nome de usuário
              </ProfileMenuButton>

              <ProfileMenuButton
                tone="danger"
                onClick={() => {
                  onOpenChange(false)
                  onRequestLogout()
                }}
              >
                <LogOut className="h-4 w-4" />
                Sair
              </ProfileMenuButton>
            </div>

            <AnimatePresence initial={false}>
              {editingName && (
                <motion.form
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                  onSubmit={handleNameSubmit}
                >
                  <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.035] p-3">
                    <label className="text-xs font-semibold text-white/72" htmlFor="profile-name">
                      Nome de usuário
                    </label>
                    <div className="mt-2 flex gap-2 max-sm:flex-col">
                      <input
                        id="profile-name"
                        value={draftName}
                        onChange={(event) => setDraftName(event.target.value)}
                        minLength={2}
                        maxLength={50}
                        className="dashboard-profile-input min-h-10 flex-1 rounded-lg border px-3 text-sm outline-none transition"
                      />
                      <button
                        type="submit"
                        disabled={savingName}
                        className="rounded-lg border border-[#AE3CFF]/50 bg-[#AE3CFF]/14 px-4 text-sm font-semibold text-[#f0c7ff] transition hover:border-[#01A2ED]/60 hover:text-[#9ee3ff] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {savingName ? 'Salvando...' : 'Salvar'}
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {feedback && (
              <p
                role={feedback.kind === 'error' ? 'alert' : 'status'}
                aria-live="polite"
                className={cn(
                  'mt-3 rounded-lg border px-3 py-2 text-xs',
                  feedback.kind === 'error' && 'border-[#ff7bc7]/30 bg-[#ff3aa0]/10 text-[#ff9fd4]',
                  feedback.kind === 'success' && 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
                  feedback.kind === 'info' && 'border-[#01A2ED]/25 bg-[#01A2ED]/10 text-[#9ee3ff]',
                )}
              >
                {feedback.text}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {mobileMenu}
    </div>
  )
}

function ProfileMenuButton({
  children,
  onClick,
  tone = 'default',
}: {
  children: ReactNode
  onClick: () => void
  tone?: 'default' | 'danger'
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        'dashboard-profile-menu-button flex min-h-11 w-full items-center gap-3 rounded-lg border px-3 text-left text-sm font-medium transition',
        tone === 'danger'
          ? 'dashboard-profile-menu-button--danger border-[#ff3aa0]/20 text-[#ff7bc7] hover:border-[#ff3aa0]/45 hover:bg-[#ff3aa0]/10'
          : 'border-white/8 text-white/78 hover:border-[#AE3CFF]/40 hover:bg-[#AE3CFF]/10 hover:text-white',
      )}
    >
      {children}
    </button>
  )
}

function LogoutConfirmModal({
  open,
  submitting,
  error,
  onClose,
  onConfirm,
}: {
  open: boolean
  submitting: boolean
  error: string
  onClose: () => void
  onConfirm: () => void
}) {
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return

    const timeout = window.setTimeout(() => cancelRef.current?.focus(), 30)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !submitting) onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(timeout)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open, submitting])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="dashboard-modal-overlay fixed inset-0 z-[90] flex items-center justify-center px-4 py-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !submitting) onClose()
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-modal-title"
            className="dashboard-modal-card w-full max-w-[460px] rounded-2xl border p-6 shadow-[0_24px_90px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#ff3aa0]/30 bg-[#ff3aa0]/10 text-[#ff7bc7]">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div>
                <h2 id="logout-modal-title" className="text-xl font-bold text-white">
                  Deseja sair da Nexa?
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/66">
                  Você será desconectado deste dispositivo. Suas preferências visuais e dados locais do perfil serão mantidos.
                </p>
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-5 rounded-lg border border-[#ff7bc7]/30 bg-[#ff3aa0]/10 px-4 py-3 text-sm text-[#ff9fd4]">
                {error}
              </p>
            )}

            <div className="mt-7 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              <button
                ref={cancelRef}
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="dashboard-modal-secondary min-h-12 rounded-lg border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={submitting}
                className="min-h-12 rounded-lg border border-[#ff3aa0]/45 bg-[#ff3aa0]/12 px-4 text-sm font-semibold text-[#ff8ecb] transition hover:bg-[#ff3aa0]/18 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Saindo...' : 'Sair mesmo assim'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DemoActionModal({
  action,
  onClose,
}: {
  action: DashboardDemoAction | null
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const isTrail = action?.variant === 'trail'

  useEffect(() => {
    if (!action) return

    const timeout = window.setTimeout(() => closeRef.current?.focus(), 30)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(timeout)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [action, onClose])

  return (
    <AnimatePresence>
      {action && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="dashboard-modal-overlay fixed inset-0 z-[90] flex items-center justify-center px-4 py-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-action-title"
            className="dashboard-modal-card w-full max-w-[520px] rounded-2xl border p-6 shadow-[0_24px_90px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#AE3CFF]/35 bg-[#AE3CFF]/12 text-[#F661FD] shadow-[0_0_18px_rgba(174,60,255,0.22)]">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F661FD]">Experiência demo</p>
                <h2 id="demo-action-title" className="mt-1 text-xl font-bold text-white">
                  {action.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/66">
                  {action.description ??
                    'Esta ação faz parte da experiência demonstrativa da Nexa. Em uma versão integrada ao backend, ela abrirá o conteúdo completo, salvará o progresso do usuário e atualizará os dados do painel automaticamente.'}
                </p>
              </div>
            </div>

            {isTrail && (
              <div className="mt-6 rounded-xl border border-[#AE3CFF]/22 bg-white/[0.035] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Tecnologia — Primeiros passos</p>
                    <p className="mt-1 text-xs text-white/55">Etapa atual: Primeiro contato</p>
                  </div>
                  <strong className="font-display text-2xl text-white">32%</strong>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/8">
                  <div className="h-full w-[32%] rounded-full bg-nexa-gradient shadow-neon" />
                </div>
                <p className="mt-4 text-sm leading-6 text-white/68">
                  Próxima aula sugerida: <span className="font-semibold text-white">Visão geral da área</span>. A versão completa salvará seu avanço e atualizará sua trilha automaticamente.
                </p>
              </div>
            )}

            <div className="mt-7 flex justify-end">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="dashboard-modal-secondary min-h-12 rounded-lg border px-5 text-sm font-semibold transition"
              >
                Entendi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
