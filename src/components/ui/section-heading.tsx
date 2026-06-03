"use client"

import { motion } from "framer-motion"
import { blurIn, viewport } from "@/lib/motion"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionHeading({ title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <motion.div
      variants={blurIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={`mb-16 ${centered ? "text-center" : ""}`}
    >
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
