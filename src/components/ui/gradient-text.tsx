interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p"
  from?: string
  to?: string
}

export function GradientText({
  children,
  className = "",
  as: Tag = "span",
}: GradientTextProps) {
  return (
    <Tag className={`text-gradient ${className}`}>
      {children}
    </Tag>
  )
}