import { type Variants, type Transition, type ViewportOptions } from "framer-motion"

export const easings = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  springy: [0.16, 1, 0.3, 1] as const,
  dramatic: [0.87, 0, 0.13, 1] as const,
  snappy: [0.4, 0, 0.2, 1] as const,
  anticipate: [0.68, -0.3, 0.32, 1] as const,
  smoothOut: [0, 0, 0.2, 1] as const,
  smoothIn: [0.4, 0, 1, 1] as const,
}

export const durations = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
  cinematic: 1.2,
  epic: 1.8,
  hero: 2.2,
} as const

export const springs = {
  gentle: { stiffness: 200, damping: 25, mass: 0.5 },
  snappy: { stiffness: 400, damping: 17, mass: 0.5 },
  bouncy: { stiffness: 300, damping: 10, mass: 0.8 },
  stiff: { stiffness: 500, damping: 30, mass: 0.5 },
  heavy: { stiffness: 100, damping: 20, mass: 2 },
  premium: { stiffness: 250, damping: 20, mass: 0.6 },
} as const

export const viewport: ViewportOptions = {
  once: true,
  margin: "-50px",
}

export const viewportEarly: ViewportOptions = {
  once: true,
  margin: "-100px",
}

export function createTransition(overrides?: Partial<Transition>): Transition {
  return {
    duration: durations.normal,
    ease: easings.smooth,
    ...overrides,
  }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: createTransition({ duration: durations.slow }),
  },
}

export function slideIn(direction: "up" | "down" | "left" | "right", distance = 40): Variants {
  const offset = { x: 0, y: 0 }
  if (direction === "up") offset.y = distance
  if (direction === "down") offset.y = -distance
  if (direction === "left") offset.x = distance
  if (direction === "right") offset.x = -distance

  return {
    hidden: { opacity: 0, ...offset, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: createTransition({ duration: durations.slow, ease: easings.springy }),
    },
  }
}

export const blurIn: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: createTransition({ duration: durations.slow, ease: easings.springy }),
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: createTransition({ duration: durations.slow, ease: easings.springy }),
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: createTransition({ duration: 0.6, ease: easings.springy }),
  },
}

export const cardHover = {
  y: -6,
  scale: 1.01,
  transition: { type: "spring" as const, ...springs.premium },
}

export const cardTap = {
  scale: 0.98,
  transition: { type: "spring" as const, ...springs.snappy },
}

export const floatAnimation = (delay = 0) => ({
  y: [0, -12, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: easings.smooth,
    delay,
  },
})

export function letterReveal(index: number): Variants {
  return {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: createTransition({
        duration: 0.6,
        delay: index * 0.04,
      }),
    },
  }
}

export function wordReveal(index: number): Variants {
  return {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: createTransition({
        duration: 0.6,
        delay: index * 0.08,
      }),
    },
  }
}

export const shimmerVariants: Variants = {
  initial: { x: "-100%" },
  animate: {
    x: "200%",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
}

export const rotateGlow: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
}

export const pulseGlow: Variants = {
  initial: { opacity: 0.4, scale: 1 },
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easings.smooth,
    },
  },
}
