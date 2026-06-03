"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useActiveSection } from "@/hooks/use-active-section"
import { AnimatedButton } from "@/components/ui/animated-button"
import { easings } from "@/lib/motion"

const navLinks = [
  { href: "#projects", label: "Projets" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "À propos" },
  { href: "#contact", label: "Contact" },
]

const sectionIds = navLinks.map((l) => l.href.slice(1))

function NavLinks({ activeSection }: { activeSection: string }) {
  return navLinks.map((link) => {
    const isActive = activeSection === link.href.slice(1)
    return (
      <a
        key={link.href}
        href={link.href}
        className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
      >
        <span className={isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>
          {link.label}
        </span>
        {isActive && (
          <motion.span
            layoutId="active-nav"
            className="absolute inset-0 rounded-lg bg-white/[0.06] -z-10"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </a>
    )
  })
}

function MobileLinks({ activeSection, onClose }: { activeSection: string; onClose: () => void }) {
  return (
    <>
      {navLinks.map((link, i) => (
        <motion.a
          key={link.href}
          href={link.href}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: i * 0.08, duration: 0.35, ease: easings.smooth }}
          onClick={onClose}
          className="relative text-3xl font-heading font-semibold tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          {link.label}
          {activeSection === link.href.slice(1) && (
            <motion.span
              layoutId="active-mobile"
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </motion.a>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.35 }}
      >
        <AnimatedButton variant="primary" size="lg" href="#contact" onClick={onClose}>
          Me contacter
        </AnimatedButton>
      </motion.div>
    </>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection(sectionIds)
  const initRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    if (!initRef.current) {
      handleScroll()
      initRef.current = true
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const navInner = (
    <>
      <a href="#" className="shrink-0 px-3">
        <span className="font-heading text-lg md:text-xl font-bold tracking-widest text-gradient">
          JufyTech
        </span>
      </a>
      <div className="hidden md:flex items-center gap-0 mx-2">
        <NavLinks activeSection={activeSection} />
      </div>
      <div className="hidden md:flex items-center px-3">
        <AnimatedButton variant="primary" size="default" href="#contact">
          Me contacter
        </AnimatedButton>
      </div>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden relative z-50 flex items-center justify-center w-10 h-10 mr-2 text-foreground"
        aria-label="Menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </>
  )

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: easings.smooth }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <motion.nav
          animate={{
            width: scrolled ? "auto" : "100%",
            maxWidth: scrolled ? "720px" : "1280px",
            borderRadius: scrolled ? "9999px" : "16px",
            paddingLeft: scrolled ? "8px" : "24px",
            paddingRight: scrolled ? "8px" : "24px",
          }}
          transition={{ duration: 0.5, ease: easings.smooth }}
          className="flex items-center justify-between h-14 md:h-16 bg-background/60 backdrop-blur-2xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        >
          {navInner}
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-background/80 backdrop-blur-2xl md:hidden"
          >
            <MobileLinks activeSection={activeSection} onClose={closeMobile} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
