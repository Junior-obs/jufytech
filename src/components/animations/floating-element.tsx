"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  amplitude?: number
  duration?: number
  delay?: number
  axis?: "y" | "x" | "both"
  rotate?: number
}

export function FloatingElement({
  children,
  className,
  amplitude = 12,
  duration = 5,
  delay = 0,
  axis = "y",
  rotate = 0,
}: FloatingElementProps) {
  const distance = amplitude

  const getAnimation = () => {
    const anim: Record<string, number[]> = {}
    if (axis === "y" || axis === "both") anim.y = [-distance, distance, -distance]
    if (axis === "x" || axis === "both") anim.x = [-distance, distance, -distance]
    if (rotate) anim.rotate = [-rotate, rotate, -rotate]
    return anim
  }

  return (
    <motion.div
      className={cn("pointer-events-none", className)}
      animate={getAnimation()}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingOrb({
  className,
  size,
  color,
  delay = 0,
  blur = true,
}: {
  className?: string
  size: number
  color: string
  delay?: number
  blur?: boolean
}) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full pointer-events-none",
        blur && "blur-3xl",
        className,
      )}
      style={{ width: size, height: size, background: color }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -30, 20, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}
