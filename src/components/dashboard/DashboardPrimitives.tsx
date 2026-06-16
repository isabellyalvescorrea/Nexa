import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

export function DashboardPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
}) {
  return (
    <header className="mb-6">
      {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.08em] text-[#F661FD]">• {eyebrow}</p>}
      <h1 className="font-display text-[clamp(2rem,3.1vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.02em]">
        {title}
      </h1>
      {description && <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">{description}</p>}
    </header>
  )
}

export function DashPanel({
  children,
  className,
  accent = false,
}: {
  children: ReactNode
  className?: string
  accent?: boolean
}) {
  return (
    <motion.section
      whileHover={{ borderColor: accent ? 'rgba(174,60,255,.72)' : 'rgba(85,98,255,.28)' }}
      transition={{ duration: 0.25 }}
      className={cn(
        'dash-panel rounded-xl border border-[#5562FF]/15 bg-[#07051a]/72 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.025),0_18px_54px_rgba(1,2,24,.2)]',
        accent &&
          'border-[#AE3CFF]/55 bg-[radial-gradient(circle_at_0%_100%,rgba(174,60,255,.12),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(1,162,237,.1),transparent_34%),rgba(7,5,26,.78)] shadow-[0_0_30px_rgba(95,59,255,.13),inset_0_0_30px_rgba(1,162,237,.035)]',
        className,
      )}
    >
      {children}
    </motion.section>
  )
}

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-lg font-semibold text-white sm:text-xl">{children}</h2>
      {action}
    </div>
  )
}

export function ProgressBar({
  value,
  color = 'gradient',
  className,
}: {
  value: number
  color?: 'gradient' | 'blue' | 'pink' | 'cyan'
  className?: string
}) {
  const colorClass = {
    gradient: 'bg-nexa-gradient',
    blue: 'bg-gradient-to-r from-[#5562FF] to-[#01A2ED]',
    pink: 'bg-gradient-to-r from-[#AE3CFF] to-[#F661FD]',
    cyan: 'bg-gradient-to-r from-[#01A2ED] to-[#5F3BFF]',
  }[color]

  return (
    <div className={cn('dashboard-progress-track h-2 overflow-hidden rounded-full bg-[#111530]', className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className={cn('h-full rounded-full shadow-[0_0_12px_currentColor]', colorClass)}
      />
    </div>
  )
}

export function MetricRing({
  value,
  label,
  size = 148,
}: {
  value: number
  label: string
  size?: number
}) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - value / 100)

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90" aria-label={`${label}: ${value}%`}>
        <defs>
          <linearGradient id={`metric-${value}`} x1="0" x2="1">
            <stop stopColor="#F661FD" />
            <stop offset=".48" stopColor="#AE3CFF" />
            <stop offset="1" stopColor="#01A2ED" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(85,98,255,.13)" strokeWidth="8" />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={`url(#metric-${value})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-4xl font-bold text-white">{value}%</span>
        <span className="mt-1 text-xs text-white/65">{label}</span>
      </div>
    </div>
  )
}

export function DashboardButton({
  children,
  to,
  onClick,
  variant = 'outline',
  className,
  icon = true,
}: {
  children: ReactNode
  to?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'danger' | 'cyan'
  className?: string
  icon?: boolean
}) {
  const classes = cn(
    'dashboard-button inline-flex min-h-11 items-center justify-center gap-3 rounded-md border px-5 py-2.5 text-sm font-medium transition duration-300',
    `dashboard-button--${variant}`,
    variant === 'primary' &&
      'border-[#01A2ED]/70 bg-nexa-gradient text-white shadow-[0_0_20px_rgba(95,59,255,.24)] hover:brightness-110',
    variant === 'outline' &&
      'border-[#AE3CFF]/48 bg-white/[0.015] text-[#D56BFF] hover:border-[#01A2ED]/70 hover:text-[#56C8FF] hover:shadow-[0_0_18px_rgba(95,59,255,.2)]',
    variant === 'danger' && 'border-[#ff315f]/48 text-[#ff5b7e] hover:bg-[#ff315f]/10',
    variant === 'cyan' && 'border-[#01A2ED]/55 text-[#44c8ff] hover:bg-[#01A2ED]/8',
    className,
  )
  const content = (
    <>
      {children}
      {icon && <ArrowRight className="h-4 w-4" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  )
}

export function IconTile({
  icon: Icon,
  color = 'pink',
  className,
}: {
  icon: ComponentType<{ className?: string }>
  color?: 'pink' | 'blue' | 'cyan'
  className?: string
}) {
  const colors = {
    pink: 'border-[#AE3CFF]/45 bg-[#AE3CFF]/10 text-[#F661FD]',
    blue: 'border-[#5562FF]/45 bg-[#5562FF]/10 text-[#7F8BFF]',
    cyan: 'border-[#01A2ED]/45 bg-[#01A2ED]/10 text-[#38D5FF]',
  }
  return (
    <span className={cn('inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border', colors[color], className)}>
      <Icon className="h-6 w-6" />
    </span>
  )
}

export function StatChip({ children, color = 'pink' }: { children: ReactNode; color?: 'pink' | 'blue' | 'cyan' | 'green' }) {
  const classes = {
    pink: 'border-[#AE3CFF]/30 bg-[#AE3CFF]/10 text-[#E18BFF]',
    blue: 'border-[#5562FF]/30 bg-[#5562FF]/10 text-[#8EA0FF]',
    cyan: 'border-[#01A2ED]/30 bg-[#01A2ED]/10 text-[#56D6FF]',
    green: 'border-emerald-400/25 bg-emerald-400/8 text-emerald-300',
  }
  return <span className={cn('inline-flex rounded-md border px-3 py-1.5 text-xs font-medium', classes[color])}>{children}</span>
}

export const dashboardTitleGradient = 'bg-gradient-to-r from-[#01A2ED] via-[#5562FF] to-[#F661FD] bg-clip-text text-transparent'
