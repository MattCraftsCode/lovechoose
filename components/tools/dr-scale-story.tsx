"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export function DrScaleStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const scale = useTransform(scrollYProgress, [0.1, 0.72], [0.76, 1])
  const rotate = useTransform(scrollYProgress, [0.1, 0.72], [-12, 0])
  const lineScale = useTransform(scrollYProgress, [0.18, 0.8], [0, 1])

  return (
    <section
      ref={sectionRef}
      className="border-y border-foreground bg-[#5368ff] text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:px-8 lg:py-24">
        <div className="self-center">
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#dfff47] uppercase">
            A score in context
          </p>
          <h2 className="mt-4 max-w-md font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
            DR is a reading, not a finish line.
          </h2>
          <p className="mt-6 max-w-md text-base/8 text-white/72">
            Compare domains on the same scale, then use the number as one input
            alongside relevance, traffic and the quality of links.
          </p>
        </div>

        <div className="relative min-h-80 border border-white/40 bg-primary p-6 sm:p-8">
          <motion.div
            className="absolute top-1/2 right-8 left-8 h-px origin-left bg-[#dfff47]"
            style={reduceMotion ? { scaleX: 1 } : { scaleX: lineScale }}
          />
          <div className="relative z-10 flex h-full min-h-64 items-center justify-between gap-5">
            <ScalePoint value="0" label="New" />
            <motion.div
              className="grid size-36 place-items-center rounded-full border-[10px] border-[#dfff47] bg-[#ff7659] text-center shadow-[8px_8px_0_rgba(0,0,0,0.2)] sm:size-44"
              style={
                reduceMotion ? undefined : { scale: scale, rotate: rotate }
              }
            >
              <span>
                <span className="block font-serif text-5xl leading-none tracking-[-0.05em] sm:text-6xl">
                  DR
                </span>
                <span className="mt-2 block text-[10px] font-bold tracking-[0.16em] uppercase">
                  0 - 100
                </span>
              </span>
            </motion.div>
            <ScalePoint value="100" label="Established" align="right" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ScalePoint({
  value,
  label,
  align = "left",
}: {
  value: string
  label: string
  align?: "left" | "right"
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <span className="block font-serif text-4xl leading-none">{value}</span>
      <span className="mt-2 block text-[10px] font-bold tracking-[0.14em] text-white/55 uppercase">
        {label}
      </span>
    </div>
  )
}
