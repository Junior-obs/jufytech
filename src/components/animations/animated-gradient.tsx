"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientProps {
  className?: string
  colors?: string[]
  duration?: number
  opacity?: number
}

export function AnimatedGradient({
  className,
  colors = ["rgba(37,99,235,0.08)", "rgba(0,212,255,0.06)", "rgba(59,130,246,0.04)"],
  duration = 15,
  opacity = 1,
}: AnimatedGradientProps) {
  return (
    <motion.div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ opacity }}
      animate={{
        background: [
          `radial-gradient(600px at 0% 0%, ${colors[0]}, transparent)`,
          `radial-gradient(600px at 100% 100%, ${colors[1]}, transparent)`,
          `radial-gradient(600px at 50% 50%, ${colors[2]}, transparent)`,
          `radial-gradient(600px at 0% 100%, ${colors[0]}, transparent)`,
          `radial-gradient(600px at 100% 0%, ${colors[1]}, transparent)`,
          `radial-gradient(600px at 0% 0%, ${colors[0]}, transparent)`,
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

export function AnimatedBeam({
  className,
  delay = 0,
  duration = 4,
  color = "from-transparent via-primary/30 to-transparent",
}: {
  className?: string
  delay?: number
  duration?: number
  color?: string
}) {
  return (
    <motion.div
      className={cn("absolute h-px w-full", className)}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{
        scaleX: [0, 1, 0],
        opacity: [0, 0.5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: "left" }}
    >
      <div className={cn("h-full w-full bg-gradient-to-r", color)} />
    </motion.div>
  )
}
