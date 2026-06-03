"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Badge } from "@/components/ui/badge"
import { FloatingElement, AnimatedBeam } from "@/components/animations"
import { easings, staggerContainer, staggerItem } from "@/lib/motion"

function useMousePosition() {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = document.body.getBoundingClientRect()
    x.set(e.clientX / rect.width)
    y.set(e.clientY / rect.height)
  }, [x, y])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  return { x, y }
}

function FloatingShape({ className, size, delay, children }: {
  className?: string; size: number; delay: number; children: React.ReactNode
}) {
  return (
    <FloatingElement className={className} amplitude={15} duration={6} delay={delay}>
      <div
        className="flex items-center justify-center rounded-full border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm"
        style={{ width: size, height: size }}
      >
        {children}
      </div>
    </FloatingElement>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { x: mouseX, y: mouseY } = useMousePosition()
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    const unsubscribeX = smoothX.on("change", (v) => {
      setGlowStyle({
        "--mouse-x": `${v * 100}%`,
        "--mouse-y": `${smoothY.get() * 100}%`,
      } as React.CSSProperties)
    })
    return () => unsubscribeX()
  }, [smoothX, smoothY])

  const technologies = [
    "Next.js", "React", "TypeScript", "Framer Motion", "Node.js", "Tailwind CSS",
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
        />
        <div className="absolute inset-0 bg-[#050510]/70" />
        <div className="absolute inset-0 bg-grid-subtle opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-accent/[0.03]" />
        <div className="spotlight" style={glowStyle} />
      </motion.div>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/5 rounded-full blur-[120px]" />

        <FloatingShape className="top-[15%] left-[8%]" size={48} delay={0}>
          <div className="w-2 h-2 rounded-full bg-primary/40" />
        </FloatingShape>
        <FloatingShape className="top-[25%] right-[12%]" size={32} delay={1.5}>
          <div className="w-1.5 h-1.5 rotate-45 bg-accent/40" />
        </FloatingShape>
        <FloatingShape className="bottom-[35%] left-[5%]" size={40} delay={3}>
          <div className="w-2 h-0.5 bg-primary/30 rounded-full" />
        </FloatingShape>
        <FloatingShape className="bottom-[25%] right-[8%]" size={56} delay={2}>
          <div className="w-2.5 h-2.5 rounded-full border border-accent/30 bg-accent/5" />
        </FloatingShape>
        <FloatingShape className="top-[40%] right-[25%]" size={24} delay={4}>
          <div className="w-1 h-1 rounded-full bg-white/20" />
        </FloatingShape>

        <AnimatedBeam className="top-[20%] left-[10%] w-1/3 -rotate-12" delay={0} />
        <AnimatedBeam className="top-[35%] left-[5%] w-1/4 rotate-6" delay={1.5} />
        <AnimatedBeam className="top-[55%] right-[10%] w-1/3 -rotate-6" delay={3} />
        <AnimatedBeam className="top-[70%] right-[20%] w-1/4 rotate-12" delay={4.5} />
      </div>

      <motion.div
        style={{ opacity }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto px-6"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div variants={staggerItem} className="mb-8">
            <Badge
              variant="outline"
              className="glass px-5 py-2 text-xs font-medium tracking-wider text-primary border-primary/20 gap-2.5 rounded-full"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Disponible pour mission
            </Badge>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
              <span className="text-gradient-blue inline-block">
                Des solutions digitales
              </span>
              <br />
              <span className="text-foreground inline-block">
                qui transforment les idées.
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
          >
            Développement web premium, applications modernes et expériences
            immersives — conçues pour les entreprises africaines qui veulent
            marquer les esprits à l&apos;international.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <AnimatedButton
              variant="primary"
              size="xl"
              glow
              href="#projects"
              icon={<ArrowRight className="size-4" />}
              iconPosition="right"
            >
              Voir nos réalisations
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="xl"
              href="#contact"
              icon={<Sparkles className="size-4 text-accent" />}
              iconPosition="left"
            >
              Discutons de votre projet
            </AnimatedButton>
          </motion.div>

          <motion.div variants={staggerItem} className="mt-16 w-full max-w-3xl">
            <p className="text-xs text-muted-foreground/50 tracking-widest uppercase mb-4 font-medium">
              Technologies maîtrisées
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.8 + i * 0.08,
                    duration: 0.5,
                    ease: easings.springy,
                  }}
                  className="px-4 py-2 text-xs font-medium rounded-full border border-white/[0.04] bg-white/[0.02] text-muted-foreground/70 hover:text-foreground hover:border-primary/20 hover:bg-primary/[0.03] hover:shadow-[0_0_15px_rgba(37,99,235,0.08)] transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <div className="scroll-indicator" />
          <ChevronDown className="size-4 text-muted-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
