import { Code2, MousePointer2, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

export function StudioVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "studio-visual relative isolate aspect-[4/5] overflow-hidden border border-white/45 bg-[#5368ff] p-4 shadow-[8px_8px_0_rgba(0,0,0,0.2)]",
        className
      )}
      aria-label="Abstract illustration of an indie developer workspace"
      role="img"
    >
      <div className="absolute inset-x-0 top-0 h-[46%] bg-[#cfe7ff]" />
      <div className="absolute top-[9%] left-[10%] h-[31%] w-[42%] border-[10px] border-white/75 bg-[#ff7659] shadow-[inset_-10px_0_0_rgba(255,255,255,0.35)]" />
      <div className="absolute top-[13%] right-[12%] grid size-12 place-items-center border border-foreground bg-[#dfff47] text-primary shadow-sm">
        <Sparkles className="size-5" aria-hidden="true" />
      </div>

      <div className="absolute inset-x-[8%] bottom-[9%] h-[43%] border border-foreground bg-[#f5e9d1] shadow-[0_18px_35px_rgba(25,26,23,0.2)]">
        <div className="absolute -top-[26%] left-[12%] h-[62%] w-[62%] rotate-[-2deg] border-[6px] border-[#191a17] bg-[#fffdf7] shadow-xl">
          <div className="m-3 flex h-[calc(100%-1.5rem)] flex-col border border-white/20 bg-[#191a17] p-3">
            <div className="mb-3 flex gap-1.5">
              <span className="size-1.5 rounded-full bg-[#dfff47]" />
              <span className="size-1.5 rounded-full bg-[#5368ff]" />
              <span className="size-1.5 rounded-full bg-white/45" />
            </div>
            <div className="h-2 w-[62%] rounded-full bg-[#5368ff]/80" />
            <div className="mt-2 h-2 w-[82%] rounded-full bg-white/20" />
            <div className="mt-2 h-2 w-[48%] rounded-full bg-[#dfff47]/65" />
            <Code2
              className="mt-auto size-5 text-white/70"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="absolute top-[15%] right-[8%] size-[31%] rounded-full border-[10px] border-[#191a17] bg-[#dfff47] shadow-md">
          <div className="absolute inset-[22%] rounded-full bg-[#ff7659]" />
        </div>
        <div className="absolute bottom-[10%] left-[10%] h-[27%] w-[39%] rotate-3 border border-foreground bg-[#fffdf7] shadow-md">
          <div className="mx-3 mt-3 h-1.5 rounded-full bg-[#cfe7ff]" />
          <div className="mx-3 mt-2 h-1.5 w-3/5 rounded-full bg-[#ff7659]" />
        </div>
        <MousePointer2 className="absolute right-[21%] bottom-[12%] size-7 rotate-[-14deg] fill-[#dfff47] text-[#191a17]" />
      </div>
      <div className="absolute bottom-[3%] left-[8%] text-[10px] font-bold tracking-[0.18em] text-[#191a17] uppercase">
        useful details / 03
      </div>
    </div>
  )
}
