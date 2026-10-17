"use client"

import {
  motion,
  type MotionStyle,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react"
import { useRef } from "react"

export function MozMetricsStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const panelY = useTransform(scrollYProgress, [0.12, 0.74], [50, 0])
  const panelRotate = useTransform(scrollYProgress, [0.12, 0.74], [-5, 0])
  const daWidth = useTransform(scrollYProgress, [0.16, 0.72], [0.1, 0.74])
  const paWidth = useTransform(scrollYProgress, [0.22, 0.78], [0.1, 0.56])
  const spamWidth = useTransform(scrollYProgress, [0.28, 0.84], [0.1, 0.21])

  return (
    <section
      ref={sectionRef}
      className="border-y border-foreground bg-[#ff7659]"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:px-8 lg:py-24">
        <div className="self-center">
          <p className="text-[11px] font-bold tracking-[0.18em] text-primary/65 uppercase">
            Three metrics, one view
          </p>
          <h2 className="mt-4 max-w-md font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
            Authority needs a second opinion.
          </h2>
          <p className="mt-6 max-w-md text-base/8 text-primary/75">
            DA and PA help frame authority. Spam Score adds a risk signal, so
            the result is a useful starting point rather than a single verdict.
          </p>
        </div>

        <motion.div
          className="border border-foreground bg-primary p-6 text-white shadow-[9px_9px_0_rgba(25,26,23,0.2)] sm:p-8"
          style={reduceMotion ? undefined : { y: panelY, rotate: panelRotate }}
        >
          <div className="flex items-end justify-between border-b border-white/30 pb-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] text-[#dfff47] uppercase">
                Authority snapshot
              </p>
              <p className="mt-2 font-serif text-3xl leading-none tracking-[-0.03em]">
                Three signals, side by side.
              </p>
            </div>
            <span className="font-serif text-4xl text-white/35">01</span>
          </div>
          <div className="mt-8 space-y-6">
            <MetricBar
              label="DA"
              title="Domain Authority"
              value="74"
              colorClassName="bg-[#dfff47]"
              width={reduceMotion ? 0.74 : daWidth}
            />
            <MetricBar
              label="PA"
              title="Page Authority"
              value="56"
              colorClassName="bg-[#cfe7ff]"
              width={reduceMotion ? 0.56 : paWidth}
            />
            <MetricBar
              label="Spam"
              title="Spam Score"
              value="21%"
              colorClassName="bg-[#ff7659]"
              width={reduceMotion ? 0.21 : spamWidth}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function MetricBar({
  label,
  title,
  value,
  colorClassName,
  width,
}: {
  label: string
  title: string
  value: string
  colorClassName: string
  width: MotionStyle["width"]
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-bold">
          <span className="mr-3 text-[#dfff47]">{label}</span>
          {title}
        </p>
        <p className="font-serif text-2xl leading-none">{value}</p>
      </div>
      <div className="mt-3 h-3 overflow-hidden border border-white/30 bg-white/10">
        <motion.div className={`h-full ${colorClassName}`} style={{ width }} />
      </div>
    </div>
  )
}
