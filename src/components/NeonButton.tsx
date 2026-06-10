import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '@/utils/cn'

type NeonButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: string
    variant?: 'primary' | 'ghost' | 'light'
    block?: boolean
  }
>

export function NeonButton({
  children,
  to,
  variant = 'primary',
  block,
  className,
  type = 'button',
  ...buttonProps
}: NeonButtonProps) {
  const classes = cn(
    'group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-lg px-7 py-3 text-sm font-semibold transition duration-300',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-nexa-pink/80 focus-visible:ring-offset-2 focus-visible:ring-offset-nexa-black',
    'disabled:cursor-not-allowed disabled:opacity-60',
    block && 'w-full',
    variant === 'primary' &&
      'bg-nexa-gradient text-white shadow-neon before:absolute before:inset-0 before:bg-white/15 before:opacity-0 before:transition before:duration-300 hover:before:opacity-100',
    variant === 'ghost' &&
      'border border-white/10 bg-white/[0.025] text-white shadow-[0_0_28px_rgba(95,59,255,0.12)] hover:border-nexa-violet/70 hover:bg-white/[0.06] hover:shadow-neon',
    variant === 'light' &&
      'bg-white text-[#11111a] shadow-[0_0_26px_rgba(255,255,255,0.16)] hover:bg-white/90',
    className,
  )

  if (to) {
    return (
      <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className={cn(block && 'w-full')}>
        <Link to={to} className={classes}>
          <span className="relative z-10">{children}</span>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className={cn(block && 'w-full')}>
      <button type={type} className={classes} {...buttonProps}>
        <span className="relative z-10">{children}</span>
      </button>
    </motion.div>
  )
}
