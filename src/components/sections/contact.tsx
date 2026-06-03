"use client"

import { useState, useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Mail, MessageCircle, MapPin, Clock, Check, ArrowUpRight } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { toast } from "sonner"
import { easings, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

function FloatingOrb({ className, size, color, delay }: { className?: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className={cn("absolute rounded-full blur-3xl pointer-events-none", className)}
      style={{ width: size, height: size, background: color }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -30, 20, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{ duration: 12, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

function ContactCard({ icon, label, value, href, accentColor = "accent" }: {
  icon: ReactNode; label: string; value: string; href?: string; accentColor?: string
}) {
  const Tag = href ? motion.a : motion.div
  const isEmail = href?.startsWith("mailto:")

  return (
    <Tag
      href={href}
      {...(href && !isEmail ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewport}
      transition={{ duration: 0.5, ease: easings.smooth }}
      whileHover={href ? { x: 4, transition: { type: "spring", stiffness: 300, damping: 20 } } : undefined}
      className={cn(
        "group relative p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm",
        href && "cursor-pointer hover:border-white/[0.12] transition-colors duration-300"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300",
        `bg-${accentColor}/10 group-hover:bg-${accentColor}/20`
      )}>
        {icon}
      </div>
      <p className="text-xs text-muted-foreground/60 tracking-wider uppercase mb-1 font-medium">{label}</p>
      <p className={cn(
        "text-sm md:text-base font-semibold text-foreground/90 transition-colors duration-300 flex items-center gap-1.5",
        href && `group-hover:text-${accentColor}`
      )}>
        {value}
        {href && <ArrowUpRight className="size-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />}
      </p>
    </Tag>
  )
}

function FormInput({ id, label, type = "text", value, onChange, required, multiline = false }: {
  id: string; label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean; multiline?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0
  const isActive = focused || hasValue

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 top-4 z-10 text-sm transition-all duration-300 pointer-events-none",
          isActive ? "text-xs text-primary -top-2 left-3 bg-background px-2 py-0" : "text-muted-foreground",
        )}
      >
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          rows={5}
          className={cn(
            "w-full rounded-xl border bg-transparent px-4 pt-4 pb-3 text-sm text-foreground transition-all duration-300 outline-none",
            "placeholder:text-transparent",
            "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20",
            "disabled:pointer-events-none disabled:opacity-50",
            focused ? "border-primary/50" : hasValue ? "border-white/20" : "border-white/[0.08]",
            "hover:border-white/[0.15]",
            "resize-none field-sizing-content min-h-[120px]",
          )}
          aria-label={label}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className={cn(
            "w-full h-14 rounded-xl border bg-transparent px-4 pt-5 pb-2 text-sm text-foreground transition-all duration-300 outline-none",
            "placeholder:text-transparent",
            "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20",
            "disabled:pointer-events-none disabled:opacity-50",
            focused ? "border-primary/50" : hasValue ? "border-white/20" : "border-white/[0.08]",
            "hover:border-white/[0.15]",
          )}
          aria-label={label}
        />
      )}
      <div className={cn(
        "absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 transition-all duration-500",
        focused && "from-primary/0 via-primary/40 to-primary/0",
      )} />
    </div>
  )
}

const contactMethods = [
  {
    icon: <Mail className="size-4 text-blue-400" />, label: "Email", value: "aliounefayediouf2@gmail.com",
    href: "mailto:aliounefayediouf2@gmail.com", accent: "blue",
  },
  {
    icon: <MessageCircle className="size-4 text-emerald-400" />, label: "WhatsApp", value: "+221 76 450 36 24",
    href: "https://wa.me/221764503624", accent: "emerald",
  },
  {
    icon: <MapPin className="size-4 text-amber-400" />, label: "Localisation", value: "Dakar, Liberté 6",
    accent: "amber",
  },
  {
    icon: <Clock className="size-4 text-purple-400" />, label: "Disponibilité", value: "Lun-Ven, 9h-19h",
    accent: "purple",
  },
]

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      toast.success("Message envoyé avec succès !")
      setFormData({ name: "", email: "", message: "" })
    } catch {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.")
    }
    setLoading(false)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 md:py-40 px-6 overflow-hidden">
      <FloatingOrb className="-top-40 -left-40" size={500} color="rgba(37, 99, 235, 0.06)" delay={0} />
      <FloatingOrb className="-bottom-40 -right-40" size={400} color="rgba(0, 212, 255, 0.04)" delay={4} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easings.smooth }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary font-medium mb-6"
          >
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Prêt à collaborer
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          >
            <span className="text-gradient">Contact</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Discutons de votre projet et créons quelque chose d&apos;exceptionnel ensemble.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: easings.smooth }}
            className="lg:col-span-2 space-y-4"
          >
            <p className="text-sm text-muted-foreground/60 mb-6 font-medium tracking-wider uppercase">
              Mes coordonnées
            </p>
            {contactMethods.map((method) => (
              <ContactCard key={method.label} {...method} />
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={viewport}
              className="p-5 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] mt-4"
            >
              <p className="text-xs text-muted-foreground leading-relaxed">
                Disponible pour des missions freelance, collaborations et projets ambitieux. 
                Je réponds généralement sous 24h.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: easings.smooth }}
            className="lg:col-span-3"
          >
            <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent">
              <div className="relative rounded-2xl bg-card/40 backdrop-blur-2xl border border-white/[0.06] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] pointer-events-none" />

                <form onSubmit={handleSubmit} className="relative z-10 p-6 md:p-8 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormInput id="contact-name" label="Nom complet" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} required />
                    <FormInput id="contact-email" label="Adresse email" type="email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} required />
                  </div>
                  <FormInput id="contact-message" label="Parlez-moi de votre projet" value={formData.message} onChange={(v) => setFormData({ ...formData, message: v })} required multiline />

                  <div className="flex items-center gap-4 pt-2">
                    <AnimatedButton
                      type="submit"
                      variant="gradient"
                      size="xl"
                      className="flex-1 md:flex-none"
                      loading={loading}
                      disabled={loading || sent}
                      icon={sent ? <Check className="size-4" /> : <Send className="size-4" />}
                      iconPosition="right"
                    >
                      {loading ? "Envoi..." : sent ? "Message envoyé" : "Envoyer le message"}
                    </AnimatedButton>
                    <p className="hidden md:block text-xs text-muted-foreground/40">
                      Réponse sous 24h
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
