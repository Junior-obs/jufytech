"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { springs } from "@/lib/motion"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "gradient" | "shimmer"
type ButtonSize = "sm" | "default" | "lg" | "xl"

interface AnimatedButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  glow?: boolean
  href?: string
  type?: "button" | "submit" | "reset"
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  target?: string
  rel?: string
  id?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30",
  secondary: "bg-card/80 text-foreground border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-sm",
  outline: "border border-white/[0.15] text-foreground bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary",
  ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/[0.06]",
  gradient: "text-white bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-lg shadow-primary/25",
  shimmer: "relative overflow-hidden bg-primary text-primary-foreground shadow-lg shadow-primary/25",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs gap-1.5 rounded-lg",
  default: "h-11 px-6 text-sm gap-2 rounded-xl",
  lg: "h-12 px-8 text-base gap-2.5 rounded-xl",
  xl: "h-14 px-10 text-lg gap-3 rounded-2xl",
}

export const AnimatedButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, AnimatedButtonProps>(
  function AnimatedButton(
    {
      children,
      variant = "primary",
      size = "default",
      className,
      disabled = false,
      loading = false,
      icon,
      iconPosition = "right",
      glow = false,
      href,
      type = "button",
      onClick,
      target,
      rel,
      id,
    },
    ref,
  ) {
    const isDisabled = disabled || loading
    const Tag = href ? motion.a : motion.button

    return (
      <Tag
        ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
        href={href}
        type={href ? undefined : type}
        disabled={href ? undefined : isDisabled || undefined}
        aria-disabled={isDisabled || undefined}
        data-loading={loading || undefined}
        className={cn(
          "relative inline-flex items-center justify-center font-medium whitespace-nowrap",
          "transition-all duration-300 select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:translate-y-[0.5px]",
          isDisabled && "pointer-events-none opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          glow && "shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]",
          variant === "gradient" && "transition-[background-position] duration-700",
          className,
        )}
        whileHover={!isDisabled ? { scale: 1.02, transition: { type: "spring", ...springs.snappy } } : undefined}
        whileTap={!isDisabled ? { scale: 0.97, transition: { type: "spring", ...springs.snappy } } : undefined}
        onClick={onClick}
        target={target}
        rel={rel}
        id={id}
      >
        {loading && <Loader2 className="size-4 animate-spin shrink-0" />}
        {icon && iconPosition === "left" && !loading && <span className="shrink-0">{icon}</span>}
        <span className="relative">{children}</span>
        {icon && iconPosition === "right" && !loading && <span className="shrink-0">{icon}</span>}
        {variant === "shimmer" && !isDisabled && (
          <motion.span
            className="absolute inset-0 -inset-x-full"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)" }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        )}
      </Tag>
    )
  },
)
