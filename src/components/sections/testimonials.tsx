"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { SectionWrapper } from "@/components/animations/section-wrapper"
import { SectionHeading } from "@/components/ui/section-heading"
import { StaggerContainer, StaggerItem } from "@/components/animations"
import { cardHover } from "@/lib/motion"

const testimonials = [
  {
    name: "Aïcha Diallo",
    role: "CEO, LuxeBrand",
    content:
      "Un travail d'une qualité exceptionnelle. Le site dépasse toutes nos attentes — design premium, animations fluides, et une expérience utilisateur irréprochable.",
    rating: 5,
  },
  {
    name: "Mamadou Ndiaye",
    role: "CTO, TechStartup",
    content:
      "Expertise technique solide et sens du détail remarquable. Notre dashboard SaaS n'a jamais été aussi performant et agréable à utiliser.",
    rating: 5,
  },
  {
    name: "Fatou Sarr",
    role: "Fondatrice, Creative Studio",
    content:
      "Une collaboration inspirante. Le portfolio qu'il a créé pour notre studio est un véritable chef-d'œuvre moderne.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials" className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-dot-subtle opacity-40 pointer-events-none" />
      <div className="absolute inset-0 section-gradient pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          title="Témoignages"
          subtitle="Ce que mes clients disent de mon travail."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <motion.div
                whileHover={cardHover}
                className="group relative p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-white/[0.10] hover:shadow-[0_0_30px_rgba(37,99,235,0.06)] transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <Quote className="size-8 text-primary/20 mb-4" />
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {t.content}
                  </p>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionWrapper>
  )
}
