import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoNexa from '@/assets/logo.png'
import { marketingLinks } from '@/data/navigation'
import { cn } from '@/utils/cn'

function HeaderButton({
  to,
  children,
  subtle,
  block,
}: {
  to: string
  children: ReactNode
  subtle?: boolean
  block?: boolean
}) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }} className={cn(block && 'w-full')}>
      <Link
        to={to}
        className={cn(
          'relative inline-flex min-h-12 min-w-[118px] items-center justify-center overflow-hidden rounded-lg border px-8 py-4 text-sm font-semibold text-white transition duration-300',
          'before:absolute before:inset-0 before:bg-white/[0.07] before:opacity-0 before:transition before:duration-300 hover:before:opacity-100',
          block && 'w-full',
          subtle
            ? 'border-white/10 bg-[#050615]/45 shadow-[0_0_22px_rgba(95,59,255,0.14)] hover:border-nexa-violet/55 hover:shadow-[0_0_28px_rgba(85,98,255,0.26)]'
            : 'border-[rgba(174,60,255,0.65)] bg-[linear-gradient(90deg,#AE3CFF_0%,#5F3BFF_48%,#01A2ED_100%)] shadow-[0_0_16px_rgba(174,60,255,0.35),0_0_24px_rgba(1,162,237,0.25),inset_0_0_14px_rgba(255,255,255,0.08)] hover:shadow-[0_0_22px_rgba(174,60,255,0.46),0_0_32px_rgba(1,162,237,0.32),inset_0_0_18px_rgba(255,255,255,0.10)]',
        )}
      >
        <span className="relative z-10">{children}</span>
      </Link>
    </motion.div>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'group relative flex h-12 items-center px-3 text-base font-medium text-white/90 transition hover:text-white',
      isActive &&
        'text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:bg-nexa-gradient after:shadow-[0_0_18px_rgba(174,60,255,0.86)]',
    )

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="nexa-shell flex h-[104px] items-center justify-between gap-6 max-lg:h-20">
        <NavLink to="/" aria-label="Ir para a pagina inicial" className="flex shrink-0 items-center">
          <img
            src={logoNexa}
            alt="NEXA"
            loading="eager"
            decoding="sync"
            className="h-[72px] w-auto select-none object-contain drop-shadow-[0_0_18px_rgba(174,60,255,0.42)] max-sm:h-[50px]"
            draggable={false}
          />
        </NavLink>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-14 lg:flex">
          {marketingLinks.map((link) => (
            <NavLink key={link.href} to={link.href} className={navClass}>
              {link.label}
              <span className="ml-4 h-1 w-1 rounded-full bg-nexa-pink shadow-[0_0_12px_rgba(246,97,253,0.9)]" />
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-7 lg:flex">
          <HeaderButton to="/login" subtle>
            Login
          </HeaderButton>
          <HeaderButton to="/painel">Painel</HeaderButton>
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
            className="mx-5 rounded-2xl bg-[#050214]/96 px-5 pb-6 pt-2 shadow-[0_24px_80px_rgba(5,2,20,0.55)] lg:hidden"
          >
            <div className="mx-auto flex max-w-md flex-col gap-2">
              {marketingLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-4 py-3 text-sm font-medium text-white/78 transition hover:bg-white/[0.05] hover:text-white',
                      isActive && 'bg-white/[0.06] text-white shadow-[inset_0_0_0_1px_rgba(174,60,255,0.28)]',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <HeaderButton to="/login" subtle block>
                  Login
                </HeaderButton>
                <HeaderButton to="/painel" block>
                  Painel
                </HeaderButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
