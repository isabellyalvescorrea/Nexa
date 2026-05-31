import type { Transition, Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

export const softTransition: Transition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1],
}
