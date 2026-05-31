import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { marketingLinks } from '@/data/navigation'
import { cn } from '@/utils/cn'
import { Logo } from './Logo'
import { NeonButton } from './NeonButton'

export function Header() {
  const [open, setOpen] = useState(false)

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative flex h-14 items-center px-5 text-sm font-medium text-white/82 transition hover:text-white',
      isActive &&
        'text-white after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-nexa-gradient after:shadow-[0_0_20px_rgba(174,60,255,0.92)]',
    )

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#04010d]/68 backdrop-blur-2xl">
      <div className="nexa-shell flex h-[102px] items-center justify-between gap-5 max-lg:h-20">
        <NavLink to="/" aria-label="Ir para a página inicial" className="flex shrink-0 items-center">
          <Logo className="w-[202px] max-sm:w-[160px]" />
        </NavLink>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-12 lg:flex">
          {marketingLinks.map((link) => (
            <NavLink key={link.href} to={link.href} className={navClass}>
              {link.label}
              <span className="ml-4 h-1 w-1 rounded-full bg-nexa-pink shadow-[0_0_12px_rgba(246,97,253,0.95)]" />
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-7 lg:flex">
          <NeonButton to="/login" variant="ghost" className="min-w-[118px]">
            Login
          </NeonButton>
          <NeonButton to="/painel" className="min-w-[136px]">
            Painel
          </NeonButton>
        </div>

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] text-white shadow-[0_0_22px_rgba(95,59,255,0.2)] lg:hidden"
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
            className="border-t border-white/8 bg-[#04010d]/94 px-5 pb-6 pt-2 backdrop-blur-2xl lg:hidden"
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
                <NeonButton to="/login" variant="ghost" block>
                  Login
                </NeonButton>
                <NeonButton to="/painel" block>
                  Painel
                </NeonButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
