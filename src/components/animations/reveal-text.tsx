"use client"

import { motion } from "framer-motion"
import { wordReveal, letterReveal, viewport, createTransition, easings } from "@/lib/motion"

interface RevealTextProps {
  text: string
  className?: string
  mode?: "words" | "chars"
  delay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p"
}

export function RevealText({
  text,
  className = "",
  mode = "words",
  delay = 0,
  as: Tag = "span",
}: RevealTextProps) {
  if (mode === "chars") {
    const chars = text.split("")
    return (
      <Tag className={className} aria-label={text}>
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.04,
                delayChildren: delay,
              },
            },
          }}
          className="inline-flex flex-wrap"
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              variants={letterReveal(i)}
              className="inline-block"
              aria-hidden="true"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </Tag>
    )
  }

  const words = text.split(" ")
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: delay,
            },
          },
        }}
        className="inline-flex flex-wrap gap-x-[0.25em]"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordReveal(i)}
            className="inline-block"
            aria-hidden="true"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}

export function GradientReveal({
  text,
  className = "",
  as: Tag = "span",
}: {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "span" | "p"
}) {
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.06,
              delayChildren: 0.1,
            },
          },
        }}
        className="inline-flex flex-wrap"
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: createTransition({
                  duration: 0.7,
                  delay: i * 0.04,
                  ease: easings.springy,
                }),
              },
            }}
            className="inline-block text-gradient"
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}
