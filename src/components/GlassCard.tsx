import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

type GlassCardProps = HTMLMotionProps<'div'> & {
  hot?: boolean
}

export function GlassCard({ hot, className, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'glass-panel neon-border rounded-nexa p-6 transition duration-300 hover:border-nexa-pink/50 hover:shadow-neon',
        hot && 'shadow-neon-pink',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
