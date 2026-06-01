import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

type GlassCardProps = HTMLMotionProps<'div'> & {
  hot?: boolean
}

export function GlassCard({ hot, className, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -9, scale: 1.012 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'premium-card p-6 transition duration-500',
        hot && 'shadow-[0_0_32px_rgba(246,97,253,0.18)]',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
