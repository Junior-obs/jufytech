"use client"

import { motion } from "framer-motion"
import { createTransition, durations, easings, viewport } from "@/lib/motion"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
  id?: string
}

export function SectionWrapper({ children, className, delay = 0, id }: SectionWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewport}
      transition={createTransition({
        duration: durations.slow,
        delay,
        ease: easings.smooth,
      })}
      id={id}
      className={className}
    >
      {children}
    </motion.section>
  )
}
