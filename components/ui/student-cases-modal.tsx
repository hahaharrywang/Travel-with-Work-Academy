"use client"

import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog"
import { extendedCases, type StudentCase } from "@/data/student-cases"

interface StudentCasesModalProps {
  isOpen: boolean
  onClose: () => void
}

function CaseCard({ item }: { item: StudentCase }) {
  const paragraphs = item.story.split("\n\n").filter(Boolean)

  return (
    <article className="bg-white rounded-2xl border border-brand-mist p-5 sm:p-6 shadow-sm flex flex-col h-full">
      {/* Achievement pill + track */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 bg-brand-gold/15 text-brand-teal text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          {item.pill}
        </span>
        <span className="inline-flex items-center bg-brand-teal/10 text-brand-teal text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full">
          {item.track}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-brand-teal leading-snug mb-2 text-pretty">
        {item.title}
      </h3>

      {/* Identity */}
      <p className="text-xs sm:text-sm text-brand-text/70 mb-3">{item.identity}</p>

      {/* Quote */}
      <blockquote className="border-l-2 border-brand-gold pl-3 mb-4">
        <p className="text-sm leading-relaxed text-brand-teal font-medium text-pretty">
          {item.quote}
        </p>
      </blockquote>

      {/* Full story */}
      <div className="space-y-2 mb-4">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="text-sm text-brand-text leading-relaxed text-pretty">
            {para}
          </p>
        ))}
      </div>

      {/* Outcomes */}
      {item.outcomes.length > 0 && (
        <div className="mt-auto pt-4 border-t border-brand-mist">
          <p className="text-xs font-semibold text-brand-teal mb-2">現在的行動與產出</p>
          <ul className="space-y-1.5 mb-3">
            {item.outcomes.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-brand-text/90 leading-relaxed">
                <svg className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>{action}</span>
              </li>
            ))}
          </ul>

          {/* Top tags */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-[11px] text-brand-text/60 bg-brand-offwhite px-2 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export function StudentCasesModal({ isOpen, onClose }: StudentCasesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
        <DialogContent
          className="fixed left-[50%] top-[50%] z-50 flex flex-col w-[96vw] max-w-5xl max-h-[92vh] translate-x-[-50%] translate-y-[-50%] bg-brand-offwhite p-0 shadow-2xl rounded-2xl border border-brand-mist overflow-hidden"
          onPointerDownOutside={onClose}
          onEscapeKeyDown={onClose}
        >
          {/* Sticky header */}
          <DialogHeader className="sticky top-0 z-10 bg-brand-teal text-white px-5 py-4 sm:px-8 sm:py-5 border-b border-brand-teal/30 flex-row items-center justify-center space-y-0">
            <DialogTitle className="flex-1 text-center text-lg sm:text-xl font-bold text-white text-pretty">
              更多學員案例故事
            </DialogTitle>
            <button
              type="button"
              onClick={onClose}
              aria-label="關閉"
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </DialogHeader>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-8 sm:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {extendedCases.map((item) => (
                <CaseCard key={item.id} item={item} />
              ))}
            </div>

            {/* Footer note */}
            <p className="text-center text-sm font-semibold text-brand-teal mt-8 leading-relaxed">
              還有更多未收錄的路上故事，都在學院中發生 ...
            </p>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
