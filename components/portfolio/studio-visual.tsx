import { Code2, MousePointer2, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

export function StudioVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "studio-visual relative isolate aspect-[4/5] overflow-hidden rounded-[min(7vw,2rem)] border border-white/45 bg-[#a7bc9a] p-4 shadow-[0_24px_70px_rgba(58,79,49,0.14)]",
        className
      )}
      aria-label="Abstract illustration of an indie developer workspace"
      role="img"
    >
      <div className="absolute inset-x-0 top-0 h-[46%] bg-[#e7efd6]" />
      <div className="absolute top-[9%] left-[10%] h-[31%] w-[42%] border-[10px] border-white/75 bg-[#c7ddaa] shadow-[inset_-10px_0_0_rgba(255,255,255,0.35)]" />
      <div className="absolute top-[13%] right-[12%] grid size-12 place-items-center rounded-full bg-[#fff2a6] text-[#566948] shadow-sm">
        <Sparkles className="size-5" aria-hidden="true" />
      </div>

      <div className="absolute inset-x-[8%] bottom-[9%] h-[43%] rounded-xl bg-[#f4e7c8] shadow-[0_18px_35px_rgba(46,58,40,0.15)]">
        <div className="absolute -top-[26%] left-[12%] h-[62%] w-[62%] rotate-[-2deg] rounded-lg border-[6px] border-[#4c5946] bg-[#fcfbf2] shadow-xl">
          <div className="m-3 flex h-[calc(100%-1.5rem)] flex-col rounded-md bg-[#263323] p-3">
            <div className="mb-3 flex gap-1.5">
              <span className="size-1.5 rounded-full bg-[#fff2a6]" />
              <span className="size-1.5 rounded-full bg-[#9dbf7c]" />
              <span className="size-1.5 rounded-full bg-white/45" />
            </div>
            <div className="h-2 w-[62%] rounded-full bg-[#c7ddaa]/80" />
            <div className="mt-2 h-2 w-[82%] rounded-full bg-white/20" />
            <div className="mt-2 h-2 w-[48%] rounded-full bg-[#fff2a6]/65" />
            <Code2
              className="mt-auto size-5 text-white/70"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="absolute top-[15%] right-[8%] size-[31%] rounded-full border-[10px] border-[#789363] bg-[#cfdda9] shadow-md">
          <div className="absolute inset-[22%] rounded-full bg-[#779a5d]" />
        </div>
        <div className="absolute bottom-[10%] left-[10%] h-[27%] w-[39%] rotate-3 rounded-md bg-[#fffdf2] shadow-md">
          <div className="mx-3 mt-3 h-1.5 rounded-full bg-[#c5d5ad]" />
          <div className="mx-3 mt-2 h-1.5 w-3/5 rounded-full bg-[#e3d98f]" />
        </div>
        <MousePointer2 className="absolute right-[21%] bottom-[12%] size-7 rotate-[-14deg] fill-[#fff2a6] text-[#34452d]" />
      </div>
      <div className="absolute bottom-[3%] left-[8%] text-[10px] font-bold tracking-[0.24em] text-[#40513b] uppercase">
        quiet work · useful details
      </div>
    </div>
  )
}
