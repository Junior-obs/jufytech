"use client"

import { motion, type Variants } from "framer-motion"
import { blurIn, slideIn, scaleIn, viewport, createTransition, durations } from "@/lib/motion"

interface BlurRevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  scale?: boolean
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  margin?: string
}

export function BlurReveal({
  children,
  className,
  direction,
  delay = 0,
  duration,
  distance = 30,
  once = true,
  margin = "-50px",
}: BlurRevealProps) {
  let variants: Variants

  if (direction) {
    variants = slideIn(direction, distance)
  } else if (delay) {
    variants = {
      hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: createTransition({
          duration: duration ?? durations.slow,
          delay,
        }),
      },
    }
  } else {
    variants = blurIn
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScaleReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}
