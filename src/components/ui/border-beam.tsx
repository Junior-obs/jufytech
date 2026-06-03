"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  duration?: number
  size?: number
  colorFrom?: string
  colorTo?: string
}

export function BorderBeam({
  className,
  duration = 4,
  colorFrom = "rgba(37, 99, 235, 0.25)",
  colorTo = "rgba(0, 212, 255, 0.25)",
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 overflow-hidden",
        className
      )}
    >
      <motion.div
        className="absolute -inset-4 rounded-2xl"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 120deg, ${colorTo} 240deg, transparent 360deg)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1.5px",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}
