"use client"

import { motion } from "framer-motion"
import { Code2, Palette, Layout, Sparkles } from "lucide-react"
import { SectionWrapper } from "@/components/animations/section-wrapper"
import { SectionHeading } from "@/components/ui/section-heading"
import { StaggerContainer, StaggerItem } from "@/components/animations"
import { cardHover, cardTap } from "@/lib/motion"

const expertise = [
  {
    icon: Code2,
    label: "Développement Frontend",
    desc: "Next.js, React, TypeScript — des apps modernes, typées et maintenables.",
  },
  {
    icon: Palette,
    label: "UI/UX Design",
    desc: "Interfaces premium, design systems, expériences utilisateur fluides.",
  },
  {
    icon: Layout,
    label: "Branding Digital",
    desc: "Identité visuelle cohérente, premium et mémorable.",
  },
  {
    icon: Sparkles,
    label: "Motion Design",
    desc: "Animations fluides, micro-interactions, storytelling visuel.",
  },
]

export function About() {
  return (
    <SectionWrapper id="about" className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-dot-subtle opacity-40 pointer-events-none" />
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          title="À propos"
          subtitle="Développeur frontend & creative developer passionné par la création d'expériences web qui marquent."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expertise.map((item) => {
            const Icon = item.icon
            return (
              <StaggerItem key={item.label}>
                <motion.div
                  whileHover={cardHover}
                  whileTap={cardTap}
                  className="group relative p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-white/[0.10] hover:shadow-[0_0_30px_rgba(37,99,235,0.06)] transition-all duration-500"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-all duration-300">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {item.label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  )
}
