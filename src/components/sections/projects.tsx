"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Lock } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { MagicCard } from "@/components/ui/magic-card"
import { BorderBeam } from "@/components/ui/border-beam"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingOrb } from "@/components/animations"
import { easings, durations } from "@/lib/motion"

const projects = [
  {
    title: "MAISON LUXE",
    role: "E-commerce Premium",
    description: "Plateforme ecommerce immersive pour une marque de luxe. Expérience d'achat fluide avec animations premium et design épuré.",
    descriptionFull: "Architecture complète d'une plateforme e-commerce haut de gamme avec panier fluide, animations premium et système de paiement optimisé pour une expérience d'achat exceptionnelle.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Stripe"],
    features: ["Panier fluide", "Paiement 1-click", "Animations premium"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    accent: "from-blue-400 to-blue-600",
    accentColor: "rgba(37, 99, 235, 0.12)",
    border: "border-blue-500/20 group-hover:border-blue-500/40",
    badge: "text-blue-300 bg-blue-500/10 border-blue-500/20",
    chip: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    beamFrom: "rgba(37, 99, 235, 0.3)",
    beamTo: "rgba(0, 180, 255, 0.2)",
  },
  {
    title: "SAAS DASHBOARD",
    role: "Application Analytics",
    description: "Dashboard analytics moderne avec visualisations interactives, vues temps réel et dark mode d'exception.",
    tags: ["React", "TypeScript", "Tailwind", "Chart.js"],
    features: ["Data visualisation", "Temps réel", "Export CSV", "Multi-thème"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accent: "from-emerald-400 to-emerald-600",
    accentColor: "rgba(16, 185, 129, 0.12)",
    border: "border-emerald-500/20 group-hover:border-emerald-500/40",
    badge: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    chip: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    beamFrom: "rgba(16, 185, 129, 0.3)",
    beamTo: "rgba(52, 211, 153, 0.2)",
  },
  {
    title: "STARTUP HUB",
    role: "Plateforme SaaS",
    description: "Landing page et plateforme de gestion complète pour startup tech. Design system robuste et composants réutilisables.",
    tags: ["Next.js", "Tailwind", "shadcn/ui", "Framer Motion"],
    features: ["Design system", "Multi-tenant", "API REST", "SSR"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accent: "from-amber-400 to-amber-600",
    accentColor: "rgba(245, 158, 11, 0.12)",
    border: "border-amber-500/20 group-hover:border-amber-500/40",
    badge: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    chip: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    beamFrom: "rgba(245, 158, 11, 0.3)",
    beamTo: "rgba(251, 191, 36, 0.2)",
  },
  {
    title: "CREATIVE STUDIO",
    role: "Site Vitrine Premium",
    description: "Site vitrine haut de gamme pour studio créatif. Galerie interactive, animations scroll et expérience immersive.",
    tags: ["Next.js", "Framer Motion", "GSAP", "Three.js"],
    features: ["Galerie 3D", "Animations scroll", "SEO optimisé", "CMS"],
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    accent: "from-rose-400 to-rose-600",
    accentColor: "rgba(244, 63, 94, 0.12)",
    border: "border-rose-500/20 group-hover:border-rose-500/40",
    badge: "text-rose-300 bg-rose-500/10 border-rose-500/20",
    chip: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    beamFrom: "rgba(244, 63, 94, 0.3)",
    beamTo: "rgba(251, 113, 133, 0.2)",
  },
]

type Project = (typeof projects)[number]

function BrowserFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="relative flex items-center gap-2 px-4 h-10 bg-white/[0.02] border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-full bg-red-500/70" />
          <div className="size-2.5 rounded-full bg-yellow-500/70" />
          <div className="size-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="ml-3 flex items-center gap-2 flex-1 max-w-[200px] h-6 rounded-md bg-white/[0.05] px-3">
          <Lock className="size-3 text-green-500/70" />
          <span className="text-[10px] text-muted-foreground/60 truncate tracking-wide">jufytech.com/projects</span>
        </div>
      </div>
      {children}
    </div>
  )
}

function ImageOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 10 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easings.smooth }}
        className="flex items-center gap-3"
      >
        <AnimatedButton variant="ghost" size="sm" href="#" className="backdrop-blur-md border border-white/20 bg-white/10 hover:bg-white/20 text-white" icon={<ArrowUpRight className="size-4" />} iconPosition="right">
          Demo live
        </AnimatedButton>
        <AnimatedButton variant="ghost" size="sm" href="#" className="backdrop-blur-md border border-white/20 bg-white/10 hover:bg-white/20 text-white" icon={
          <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        } iconPosition="left">
          Code
        </AnimatedButton>
      </motion.div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: durations.slow, delay: index * 0.15, ease: easings.smooth }}
      className="h-full"
    >
      <MagicCard spotlightColor={project.accentColor} tiltDegree={5} spotlightSize={400} className="h-full">
        <div className={cn("group relative h-full rounded-2xl bg-gradient-to-b from-white/[0.04] via-transparent to-transparent", "p-[1px]")}>
          <BorderBeam colorFrom={project.beamFrom} colorTo={project.beamTo} />
          <div className="relative h-full rounded-2xl bg-card/40 backdrop-blur-xl border border-white/[0.06] overflow-hidden">
            <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700", project.gradient)} />
            <div className="relative z-10 flex flex-col h-full">
              <BrowserFrame>
                <div className="relative aspect-[16/10] overflow-hidden bg-card/60">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition-all duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <ImageOverlay />
                  <div className={cn("absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-md border z-30", project.badge)}>
                    {project.role}
                  </div>
                </div>
              </BrowserFrame>
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2.5">
                  <h3 className="font-heading text-base md:text-lg font-semibold text-foreground tracking-wide">
                    {project.title}
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="hidden group-hover:flex items-center gap-1 text-xs text-muted-foreground shrink-0 ml-2"
                  >
                    <span>Voir le projet</span>
                    <ArrowUpRight className="size-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.features.map((feature) => (
                    <span key={feature} className={cn("px-2 py-0.5 rounded-md text-[11px] font-medium border", project.chip)}>
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-mono text-muted-foreground bg-white/[0.03] border border-white/[0.06]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </MagicCard>
    </motion.div>
  )
}

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: durations.slow, delay: 0.05, ease: easings.smooth }}
    >
      <MagicCard spotlightColor={project.accentColor} tiltDegree={4} spotlightSize={500}>
        <div className="group relative rounded-2xl bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent p-[1px]">
          <BorderBeam colorFrom={project.beamFrom} colorTo={project.beamTo} duration={5} />
          <div className="relative rounded-2xl bg-card/30 backdrop-blur-xl border border-white/[0.06] overflow-hidden">
            <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700", project.gradient)} />
            <div className="relative z-10 flex flex-col lg:flex-row">
              <div className="lg:w-[55%] relative">
                <BrowserFrame>
                  <div className="relative aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-card/60">
                    <Image src={project.image} alt={project.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 55vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent" />
                    <ImageOverlay />
                    <div className={cn("absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-md border z-30", project.badge)}>
                      {project.role}
                    </div>
                  </div>
                </BrowserFrame>
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium text-primary bg-primary/10 border border-primary/20">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                    Featured
                  </span>
                  <span className="text-[11px] text-muted-foreground font-mono">{new Date().getFullYear()}</span>
                </motion.div>
                <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-foreground tracking-tight mb-3">
                  {project.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5 max-w-lg">
                  {project.descriptionFull || project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.features.map((feature) => (
                    <span key={feature} className={cn("px-2.5 py-1 rounded-md text-xs font-medium border", project.chip)}>
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-md text-[11px] font-mono text-muted-foreground bg-white/[0.03] border border-white/[0.06]">
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <AnimatedButton variant="primary" size="lg" href="#" glow icon={<ArrowUpRight className="size-4" />} iconPosition="right">
                    Voir le projet
                  </AnimatedButton>
                  <AnimatedButton variant="secondary" size="lg" href="#" icon={
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  } iconPosition="left">
                    Code source
                  </AnimatedButton>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </MagicCard>
    </motion.div>
  )
}

function SectionHeader({ isInView }: { isInView: boolean }) {
  const titleWords = "Réalisations".split("")
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: easings.smooth }}
      className="text-center mb-16 md:mb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary font-medium mb-6"
      >
        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
        Projets récents
      </motion.div>

      <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 overflow-hidden">
        <span className="inline-flex flex-wrap justify-center gap-x-3">
          {titleWords.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.04, ease: easings.springy }}
              className="text-gradient inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
      >
        Une sélection de projets premium conçus et développés avec passion et exigence.
      </motion.p>
    </motion.div>
  )
}

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="projects" className="relative py-28 md:py-40 px-6 overflow-hidden">
      <FloatingOrb className="-top-40 -right-40" size={500} color="rgba(37, 99, 235, 0.08)" delay={0} />
      <FloatingOrb className="-bottom-40 -left-40" size={400} color="rgba(0, 212, 255, 0.06)" delay={4} />
      <FloatingOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={600} color="rgba(59, 130, 246, 0.04)" delay={8} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader isInView={isInView} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) =>
            index === 0 ? (
              <div key={project.title} className="lg:col-span-2">
                <FeaturedProjectCard project={project} />
              </div>
            ) : (
              <div key={project.title}>
                <ProjectCard project={project} index={index} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
