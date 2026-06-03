"use client"

import { motion } from "framer-motion"
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiFigma,
} from "@icons-pack/react-simple-icons"
import { SectionWrapper } from "@/components/animations/section-wrapper"
import { SectionHeading } from "@/components/ui/section-heading"
import { StaggerContainer, StaggerItem } from "@/components/animations"
import { cardHover } from "@/lib/motion"

const skills = [
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
]

export function Skills() {
  return (
    <SectionWrapper id="skills" className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-dot-subtle opacity-40 pointer-events-none" />
      <div className="absolute inset-0 section-gradient-reverse pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          title="Compétences"
          subtitle="Technologies et outils que j'utilise au quotidien pour créer des expériences premium."
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <StaggerItem key={skill.name}>
                <motion.div
                  whileHover={cardHover}
                  className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-white/[0.06] bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-white/[0.12] hover:shadow-[0_0_30px_rgba(37,99,235,0.06)] transition-all duration-500 cursor-default"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <Icon className="size-6 md:size-8" color={skill.color} />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center">
                    {skill.name}
                  </span>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  )
}
