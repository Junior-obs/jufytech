"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Globe, LayoutDashboard, ShoppingCart, Palette, Monitor, Sparkles, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { FloatingOrb, StaggerContainer, StaggerItem } from "@/components/animations"
import { easings, cardHover } from "@/lib/motion"

const services = [
  {
    icon: Globe,
    title: "Sites Premium",
    desc: "Sites vitrine haut de gamme avec design sur mesure, animations fluides et performance optimisée.",
    features: ["Design sur mesure", "Animations fluides", "SEO optimisé", "Responsive"],
    gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
    iconBg: "from-blue-400 to-blue-600",
    border: "border-blue-500/20 group-hover:border-blue-500/40",
    badge: "text-blue-300 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Monitor,
    title: "Landing Pages",
    desc: "Pages de conversion optimisées pour maximiser l'impact et transformer vos visiteurs en clients.",
    features: ["Taux de conversion", "Design impactant", "A/B testing", "Analytics"],
    gradient: "from-cyan-500/10 via-sky-500/5 to-transparent",
    iconBg: "from-cyan-400 to-cyan-600",
    border: "border-cyan-500/20 group-hover:border-cyan-500/40",
    badge: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    desc: "Boutiques en ligne modernes avec expérience d'achat fluide, panier optimisé et paiement sécurisé.",
    features: ["Panier optimisé", "Paiement sécurisé", "Mobile first", "Catalogue"],
    gradient: "from-violet-500/10 via-purple-500/5 to-transparent",
    iconBg: "from-violet-400 to-violet-600",
    border: "border-violet-500/20 group-hover:border-violet-500/40",
    badge: "text-violet-300 bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards",
    desc: "Interfaces d'administration complexes, intuitives et performantes avec visualisation de données.",
    features: ["Data visualisation", "UX intuitive", "Temps réel", "Export"],
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    iconBg: "from-emerald-400 to-emerald-600",
    border: "border-emerald-500/20 group-hover:border-emerald-500/40",
    badge: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Design systems complets, prototypage interactif et interfaces utilisateur d'exception.",
    features: ["Design system", "Prototypage", "Wireframes", "DesignOps"],
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    iconBg: "from-amber-400 to-amber-600",
    border: "border-amber-500/20 group-hover:border-amber-500/40",
    badge: "text-amber-300 bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Sparkles,
    title: "Branding Digital",
    desc: "Identité visuelle digitale cohérente et mémorable pour propulser votre marque.",
    features: ["Identité visuelle", "Charte graphique", "Guide de marque", "Assets"],
    gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
    iconBg: "from-rose-400 to-rose-600",
    border: "border-rose-500/20 group-hover:border-rose-500/40",
    badge: "text-rose-300 bg-rose-500/10 border-rose-500/20",
  },
]

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="services" className="relative py-28 md:py-40 px-6 overflow-hidden">
      <FloatingOrb className="-top-40 -left-40" size={500} color="rgba(37, 99, 235, 0.08)" delay={0} />
      <FloatingOrb className="-bottom-40 -right-40" size={400} color="rgba(0, 212, 255, 0.06)" delay={4} />
      <FloatingOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={600} color="rgba(59, 130, 246, 0.04)" delay={8} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easings.smooth }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary font-medium mb-6"
          >
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Ce que je propose
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <span className="text-gradient">Services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Des solutions complètes pour donner vie à vos projets digitaux avec un niveau d&apos;exigence premium.
          </motion.p>
        </motion.div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <StaggerItem key={service.title}>
                <motion.div
                  whileHover={cardHover}
                  className={cn(
                    "group relative h-full p-0.5 rounded-2xl bg-gradient-to-b from-transparent via-white/[0.04] to-transparent",
                    "hover:via-white/[0.08] transition-all duration-700"
                  )}
                >
                  <div className="relative h-full rounded-[calc(1rem-1px)] bg-card/40 backdrop-blur-xl border border-white/[0.06] overflow-hidden">
                    <div className={cn("absolute inset-0 rounded-[calc(1rem-1px)] bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700", service.gradient)} />
                    <div className={cn("absolute inset-0 rounded-[calc(1rem-1px)] opacity-0 group-hover:opacity-100 transition-opacity duration-700", "bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.06),transparent_50%)]")} />
                    <div className="relative z-10 p-8 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-6">
                        <div className={cn("relative w-14 h-14 rounded-2xl bg-gradient-to-br p-[1px]", service.iconBg, "shadow-lg")}>
                          <div className="w-full h-full rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center">
                            <Icon className="size-6 text-white" />
                          </div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="hidden group-hover:flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-all duration-300"
                        >
                          <span>En savoir plus</span>
                          <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </motion.div>
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">{service.desc}</p>
                      <div className="space-y-2.5">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3">
                            <div className={cn("flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center", "bg-gradient-to-br opacity-80", service.iconBg)}>
                              <Check className="size-3 text-white" />
                            </div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={cn("absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent", "opacity-0 group-hover:opacity-100 transition-opacity duration-500")} />
                  </div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
