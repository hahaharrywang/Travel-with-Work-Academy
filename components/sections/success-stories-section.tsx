"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { featuredCases, extendedCases, type StudentCase } from "@/data/student-cases"
import { StudentCasesModal } from "@/components/ui/student-cases-modal"

function StoryCard({
  story,
  className = "",
  expanded,
  onToggle,
}: {
  story: StudentCase
  className?: string
  expanded: boolean
  onToggle: () => void
}) {
  const paragraphs = story.story.split("\n\n").filter(Boolean)

  return (
    <Card
      className={`bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-brand-mist flex flex-col ${className}`}
    >
      {/* Pill + track */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 bg-brand-gold/15 text-brand-teal text-[11px] font-bold px-2.5 py-1 rounded-full">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          {story.pill}
        </span>
        <span className="inline-flex items-center bg-brand-teal/10 text-brand-teal text-[11px] font-medium px-2.5 py-1 rounded-full">
          {story.track}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-brand-teal leading-snug mb-1 text-pretty">
        {story.title}
      </h3>

      {/* Identity */}
      <p className="text-xs sm:text-sm font-medium text-brand-clay mb-3 text-pretty">{story.identity}</p>

      {/* Quote - always visible */}
      <div className="mb-3">
        <div className="bg-brand-offwhite rounded-lg p-3 relative">
          <svg
            className="absolute -top-2 -left-2 w-6 h-6 text-brand-gold opacity-50"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>
          <p className="text-sm text-brand-teal font-medium italic leading-normal pl-4 text-pretty">
            {story.quote}
          </p>
        </div>
      </div>

      {/* Expand divider - only when collapsed */}
      {!expanded && (
        <button onClick={onToggle} className="relative w-full flex items-center py-3 group cursor-pointer">
          <span className="flex-grow border-t border-dashed border-brand-gold/50 group-hover:border-brand-gold/80 transition-colors" />
          <span className="flex items-center gap-1.5 px-4 text-sm font-semibold text-brand-teal group-hover:text-brand-clay transition-colors whitespace-nowrap">
            {'展開完整心得與行動產出'}
            <ChevronDown className="w-4 h-4 text-brand-gold" />
          </span>
          <span className="flex-grow border-t border-dashed border-brand-gold/50 group-hover:border-brand-gold/80 transition-colors" />
        </button>
      )}

      {/* Collapsible content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Content */}
        <div className="text-sm text-brand-text leading-relaxed space-y-2 flex-grow pt-1">
          {paragraphs.map((paragraph, idx) => (
            <p key={idx} className="text-pretty">{paragraph}</p>
          ))}
        </div>

        {/* Outcomes */}
        {story.outcomes.length > 0 && (
          <div className="mt-4 pt-4 border-t border-brand-mist">
            <p className="text-xs font-bold text-brand-teal mb-2 tracking-wide">{'現在的行動與產出'}</p>
            <ul className="space-y-1.5">
              {story.outcomes.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-brand-text flex items-start gap-2 leading-relaxed">
                  <span className="text-brand-gold flex-shrink-0 mt-0.5">{'✔'}</span>
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {story.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {story.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] sm:text-[11px] text-brand-text/60 bg-brand-offwhite px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Collapse divider - at bottom of expanded content */}
        <button onClick={onToggle} className="relative w-full flex items-center py-2 mt-4 group cursor-pointer">
          <span className="flex-grow border-t border-brand-mist/60 group-hover:border-brand-mist transition-colors" />
          <span className="flex items-center gap-1.5 px-3 text-xs font-medium text-brand-text/50 group-hover:text-brand-text/70 transition-colors whitespace-nowrap">
            {'收合心得'}
            <ChevronDown className="w-3.5 h-3.5 rotate-180" />
          </span>
          <span className="flex-grow border-t border-brand-mist/60 group-hover:border-brand-mist transition-colors" />
        </button>
      </div>
    </Card>
  )
}

export function SuccessStoriesSection() {
  const [storiesExpanded, setStoriesExpanded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="student-results" className="relative pt-16 sm:pt-24 pb-12 sm:pb-20 bg-brand-teal overflow-hidden">
      {/* Background decorations - 呼應 Hero 的金色圓圈 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] border border-brand-gold/15 rounded-full" />
        <div className="absolute -bottom-60 -left-40 w-[600px] h-[600px] border border-brand-gold/10 rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 text-balance">學員真實成果</h2>
          <p className="text-lg sm:text-xl font-medium text-brand-gold mb-6">因為加入了學院，開始有了不一樣。</p>
          {/* Decorative gold line */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-0.5 bg-brand-gold"></div>
          </div>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            在遠距遊牧學院，我們不是只上課看影片，而是完成一個個具體行動：
            <br />
            有人從沒有作品集，到做出第一個 side
            project；有人開啟接案變現；有人第一次帶著工作出國旅居，找到了自己想過的生活樣子。
          </p>
        </div>

        {/* Carousel with peek + dots */}
        <SuccessCarousel
          stories={featuredCases}
          expanded={storiesExpanded}
          onToggle={() => setStoriesExpanded(!storiesExpanded)}
        />

        {/* CTA to open modal */}
        {extendedCases.length > 0 && (
          <div className="flex justify-center mt-10 sm:mt-12">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-teal font-bold text-sm sm:text-base px-6 py-3 rounded-full hover:bg-[#c9a673] transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              查看更多學員案例
              <span aria-hidden>{'→'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal for extended cases */}
      <StudentCasesModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}

/* ── Carousel with peek, dots & auto-hint (all screens) ── */

function SuccessCarousel({
  stories,
  expanded,
  onToggle,
}: {
  stories: StudentCase[]
  expanded: boolean
  onToggle: () => void
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Auto-hint: nudge right then snap back on first load
  useEffect(() => {
    if (!api) return
    const timer = setTimeout(() => {
      api.scrollNext()
      setTimeout(() => {
        api.scrollTo(0)
      }, 400)
    }, 800)
    return () => clearTimeout(timer)
  }, [api])

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = useCallback(() => api?.scrollNext(), [api])

  return (
    <div className="relative">
      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-3 lg:-ml-4">
          {stories.map((story) => (
            <CarouselItem key={story.id} className="pl-3 lg:pl-4 basis-[85%] md:basis-[48%] lg:basis-[32%]">
              <StoryCard story={story} className="h-full" expanded={expanded} onToggle={onToggle} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Left/Right Navigation Arrows - Desktop */}
      <button
        onClick={scrollPrev}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-white shadow-md border border-brand-mist hover:bg-brand-offwhite hover:border-brand-gold/50 transition-all z-10"
        aria-label="上一個案例"
      >
        <ChevronLeft className="w-5 h-5 text-brand-teal" />
      </button>
      <button
        onClick={scrollNext}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-white shadow-md border border-brand-mist hover:bg-brand-offwhite hover:border-brand-gold/50 transition-all z-10"
        aria-label="下一個案例"
      >
        <ChevronRight className="w-5 h-5 text-brand-teal" />
      </button>

      {/* Navigation controls */}
      <div className="flex justify-center items-center gap-3 mt-6">
        {/* Mobile left arrow */}
        <button
          onClick={scrollPrev}
          className="lg:hidden flex w-8 h-8 items-center justify-center rounded-full bg-white shadow-sm border border-brand-mist hover:bg-brand-offwhite transition-all"
          aria-label="上一個案例"
        >
          <ChevronLeft className="w-4 h-4 text-brand-teal" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {Array.from({ length: count }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              aria-label={`前往案例 ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                idx === current
                  ? "w-6 h-2 bg-brand-gold"
                  : "w-2 h-2 bg-white/30 hover:bg-brand-gold/60"
              }`}
            />
          ))}
        </div>

        {/* Mobile right arrow */}
        <button
          onClick={scrollNext}
          className="lg:hidden flex w-8 h-8 items-center justify-center rounded-full bg-white shadow-sm border border-brand-mist hover:bg-brand-offwhite transition-all"
          aria-label="下一個案例"
        >
          <ChevronRight className="w-4 h-4 text-brand-teal" />
        </button>

        {/* Page indicator */}
        <span className="text-xs text-white/70 ml-1">{`${current + 1} / ${count}`}</span>
      </div>

      {/* Swipe hint for mobile */}
      <p className="lg:hidden text-center text-xs text-white/60 mt-2">{'左右滑動查看更多案例'}</p>
    </div>
  )
}
