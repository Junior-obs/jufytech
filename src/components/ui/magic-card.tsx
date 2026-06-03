"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagicCardProps {
  children: ReactNode
  className?: string
  spotlight?: boolean
  tilt?: boolean
  spotlightSize?: number
  spotlightColor?: string
  tiltDegree?: number
}

export function MagicCard({
  children,
  className,
  spotlight = true,
  tilt = true,
  spotlightSize = 350,
  spotlightColor = "rgba(37, 99, 235, 0.08)",
  tiltDegree = 6,
}: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 })

  const spotlightX = useTransform(springX, [0, 1], ["0%", "100%"])
  const spotlightY = useTransform(springY, [0, 1], ["0%", "100%"])
  const spotlightBg = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${spotlightX} ${spotlightY}, ${spotlightColor}, transparent 50%)`

  const rotateX = useTransform(springY, [0, 1], [tiltDegree, -tiltDegree])
  const rotateY = useTransform(springX, [0, 1], [-tiltDegree, tiltDegree])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseLeave() {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={spotlight || tilt ? handleMouseMove : undefined}
      onMouseLeave={spotlight || tilt ? handleMouseLeave : undefined}
      className={cn("group relative", className)}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1200 } as React.CSSProperties : undefined}
    >
      {spotlight && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlightBg }}
        />
      )}
      {children}
    </motion.div>
  )
}
