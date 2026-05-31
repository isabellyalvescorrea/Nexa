import logoHeader from '@/assets/generated/logo-header.webp'
import logoWide from '@/assets/generated/logo-wide.webp'
import { cn } from '@/utils/cn'

type LogoProps = {
  variant?: 'header' | 'wide'
  className?: string
}

export function Logo({ variant = 'header', className }: LogoProps) {
  return (
    <img
      src={variant === 'wide' ? logoWide : logoHeader}
      alt="NEXA"
      className={cn('h-auto select-none object-contain mix-blend-screen drop-shadow-[0_0_16px_rgba(174,60,255,0.45)]', className)}
      draggable={false}
    />
  )
}
