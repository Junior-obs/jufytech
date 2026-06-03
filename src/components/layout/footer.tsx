"use client"

import { motion } from "framer-motion"
import { Mail, Heart } from "lucide-react"
import { easings } from "@/lib/motion"

function GithubIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedinIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { href: "#projects", label: "Projets" },
      { href: "#services", label: "Services" },
      { href: "#about", label: "À propos" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:aliounefayediouf2@gmail.com", label: "aliounefayediouf2@gmail.com" },
      { href: "https://wa.me/221764503624", label: "WhatsApp", external: true },
      { href: "#contact", label: "Formulaire" },
    ],
  },
]

const socialLinks = [
  { href: "#", label: "GitHub", icon: GithubIcon },
  { href: "#", label: "LinkedIn", icon: LinkedinIcon },
  { href: "mailto:aliounefayediouf2@gmail.com", label: "Email", icon: Mail },
]

function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground/70 hover:text-foreground transition-all duration-300"
      >
        <span className="w-0 group-hover:w-1.5 h-px bg-primary transition-all duration-300" />
        {label}
      </a>
    </motion.li>
  )
}

function SocialIcon({ href, label, icon: Icon }: { href: string; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.06] text-muted-foreground/60 hover:text-foreground hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300"
    >
      <Icon size={16} />
    </motion.a>
  )
}

function FooterSection({ title, links, delay = 0 }: { title: string; links: { href: string; label: string; external?: boolean }[]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: easings.smooth }}
    >
      <h3 className="font-heading text-xs font-semibold tracking-widest text-muted-foreground/40 uppercase mb-5">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <FooterLink key={link.label} {...link} />
        ))}
      </ul>
    </motion.div>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-gradient-to-b from-transparent via-card/30 to-card/50">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easings.smooth }}
            className="col-span-2 md:col-span-4"
          >
            <a href="#" className="font-heading text-xl font-bold tracking-wider">
              <span className="text-gradient">JufyTech</span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground/50 max-w-xs leading-relaxed">
               Solutions digitales premium — développement web, applications modernes et expériences immersives basées à Dakar.
            </p>
          </motion.div>

          {footerLinks.map((section, i) => (
            <div key={section.title} className="col-span-1 md:col-span-2 md:col-start-8 md:col-end-10 md:ml-auto">
              <FooterSection title={section.title} links={section.links} delay={0.1 + i * 0.1} />
            </div>
          ))}

          <div className="col-span-2 md:col-span-3 md:col-start-10 md:col-end-13 pt-2 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: easings.smooth }}
            >
              <h3 className="font-heading text-xs font-semibold tracking-widest text-muted-foreground/40 uppercase mb-5">
                Suivez-moi
              </h3>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <SocialIcon key={social.label} {...social} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-6 border-t border-white/[0.04]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/40">
              &copy; {new Date().getFullYear()} JufyTech. Tous droits réservés.
            </p>
            <p className="text-xs text-muted-foreground/40 flex items-center gap-1.5">
              Conçu avec
              <Heart size={10} className="text-accent2/60" />
              à Dakar
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
