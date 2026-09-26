import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}

/** Subtle scroll-reveal wrapper (Framer Motion, mobile-friendly). */
export default function Reveal({ children, delay = 0, className, y = 20 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
