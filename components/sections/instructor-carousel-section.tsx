"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { instructors } from "@/data/instructors"
import { calendarData } from "@/data/calendar"

type CarouselCard = {
  key: string
  name: string
  title: string
  image: string | null
  background: string
  isPlaceholder: boolean
  weekLabel: string
}

/**
 * 依據課表順序組裝本屆 12 張講師卡（11 位 + Week 11 待確認）。
 * 校長哈利不納入。
 */
function buildCards(): CarouselCard[] {
  // 從課表抓出每週的「主講師名稱」依序對應一張卡
  const seen = new Set<string>()
  const cards: CarouselCard[] = []

  calendarData.forEach((week) => {
    const primaryName = week.instructorNames?.[0]
    if (!primaryName) return
    if (primaryName === "校長哈利") return

    if (primaryName === "講師確認中") {
      const key = `placeholder-week-${week.week}`
      if (seen.has(key)) return
      seen.add(key)
      cards.push({
        key,
        name: "講師確認中",
        title: `Week ${week.week}・${week.title}`,
        image: null,
        background:
          "本堂課的講師正在最後敲定中，敬請期待。完整簡介將於講師確認後第一時間更新。",
        isPlaceholder: true,
        weekLabel: `Week ${week.week}`,
      })
      return
    }

    if (seen.has(primaryName)) return
    const instructor = instructors.find((i) => i.name === primaryName)
    if (!instructor) return
    seen.add(primaryName)
    cards.push({
      key: primaryName,
      name: instructor.name,
      title: instructor.title,
      image: instructor.image,
      background: instructor.background,
      isPlaceholder: false,
      weekLabel: `Week ${week.week}`,
    })
  })

  return cards
}

export default function InstructorCarouselSection() {
  const cards = useMemo(buildCards, [])
  const [activeIndex, setActiveIndex] = useState(0)
  const [flippedKey, setFlippedKey] = useState<string | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const dragStartX = useRef<number | null>(null)
  const dragMoved = useRef<boolean>(false)

  const total = cards.length

  const goTo = useCallback(
    (next: number) => {
      const wrapped = ((next % total) + total) % total
      setActiveIndex(wrapped)
      setFlippedKey(null)
    },
    [total],
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  // Keyboard arrows for accessibility
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [goPrev, goNext])

  // Touch / pointer drag swipe
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX
    dragMoved.current = false
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current == null) return
    if (Math.abs(e.clientX - dragStartX.current) > 8) dragMoved.current = true
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current == null) return
    const dx = e.clientX - dragStartX.current
    dragStartX.current = null
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext()
      else goPrev()
    }
  }

  if (total === 0) return null

  return (
    <section
      id="instructor-carousel"
      className="py-16 sm:py-20 lg:py-24 bg-brand-offwhite scroll-mt-24"
      aria-label="本屆講師介紹"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm font-semibold tracking-widest text-brand-gold uppercase mb-3">
            Instructors
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-teal mb-4 text-balance">
            本屆 12 位講師，依課表順序登場
          </h2>
          <p className="text-base sm:text-lg text-brand-text/80 max-w-2xl mx-auto leading-relaxed">
            點擊卡片翻面，看見每位講師完整背景。左右切換或滑動，依課程週次認識他們。
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            dragStartX.current = null
          }}
        >
          {/* Arrow: Prev */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="上一位講師"
            className="absolute left-0 sm:left-2 lg:-left-4 top-1/2 -translate-y-1/2 z-30 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-teal text-white shadow-lg hover:bg-brand-teal/90 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Track: 3 visible cards (left-peek / center / right-peek) */}
          <div
            ref={trackRef}
            className="relative h-[480px] sm:h-[540px] lg:h-[580px] overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {cards.map((card, idx) => {
                const offset = idx - activeIndex
                // 用 modulo 處理循環顯示距離（最近的方向）
                let normalized = offset
                if (offset > total / 2) normalized = offset - total
                if (offset < -total / 2) normalized = offset + total

                const abs = Math.abs(normalized)
                const visible = abs <= 1
                if (!visible) return null

                const isCenter = normalized === 0
                const translatePercent = normalized * 70 // 0 / ±70%（露邊）
                const scale = isCenter ? 1 : 0.78
                const opacity = isCenter ? 1 : 0.55
                const z = isCenter ? 20 : 10
                const isFlipped = flippedKey === card.key

                return (
                  <div
                    key={card.key}
                    className="absolute top-0 bottom-0 transition-all duration-500 ease-in-out perspective-1200"
                    style={{
                      transform: `translateX(${translatePercent}%) scale(${scale})`,
                      opacity,
                      zIndex: z,
                      width: "min(85vw, 360px)",
                    }}
                    onClick={(e) => {
                      // 拖曳超過閾值時不觸發點擊
                      if (dragMoved.current) {
                        e.stopPropagation()
                        return
                      }
                      if (!isCenter) {
                        // 點擊側邊卡，先切到中央
                        goTo(idx)
                        return
                      }
                      // 中央卡：翻面
                      setFlippedKey(isFlipped ? null : card.key)
                    }}
                    role={isCenter ? "button" : undefined}
                    tabIndex={isCenter ? 0 : -1}
                    aria-label={isCenter ? `翻面查看 ${card.name} 完整介紹` : undefined}
                    onKeyDown={(e) => {
                      if (!isCenter) return
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setFlippedKey(isFlipped ? null : card.key)
                      }
                    }}
                  >
                    <div
                      className={`relative w-full h-full preserve-3d transition-transform duration-700 ease-in-out ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                    >
                      {/* FRONT */}
                      <div className="absolute inset-0 backface-hidden bg-white rounded-2xl border border-brand-mist shadow-xl overflow-hidden flex flex-col cursor-pointer">
                        {/* Photo */}
                        <div className="relative aspect-[4/5] w-full bg-brand-mist/40">
                          {card.image ? (
                            <Image
                              src={card.image || "/placeholder.svg"}
                              alt={card.name}
                              fill
                              className="object-cover"
                              sizes="(min-width: 1024px) 360px, 85vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-mist to-brand-offwhite">
                              <span className="text-brand-teal/50 text-6xl font-handwriting">
                                ?
                              </span>
                            </div>
                          )}
                          {/* Week chip */}
                          <span className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full bg-brand-teal text-white text-xs font-semibold shadow-md">
                            {card.weekLabel}
                          </span>
                        </div>

                        {/* Body */}
                        <div className="flex-1 flex flex-col px-5 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6">
                          <h3 className="font-handwriting text-3xl sm:text-4xl text-brand-teal leading-tight mb-2">
                            {card.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-brand-gold font-medium leading-snug line-clamp-2 mb-3">
                            {card.title}
                          </p>
                          <p className="text-xs sm:text-sm text-brand-text/75 leading-relaxed line-clamp-3">
                            {card.background}
                          </p>

                          <div className="mt-auto pt-3 flex items-center justify-between">
                            <span className="text-xs font-semibold text-brand-teal">
                              查看更多
                            </span>
                            <span className="block w-10 h-px bg-brand-gold/70" aria-hidden />
                          </div>
                        </div>
                      </div>

                      {/* BACK */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl shadow-xl overflow-hidden bg-brand-teal text-white flex flex-col cursor-pointer">
                        <div className="relative px-5 pt-5 pb-3 sm:px-6 sm:pt-6">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-[11px] font-semibold tracking-widest uppercase">
                            講師簡介
                          </span>
                          <h3 className="font-handwriting text-3xl sm:text-4xl text-white leading-tight mt-3">
                            {card.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-brand-gold/90 font-medium leading-snug mt-1.5">
                            {card.title}
                          </p>
                        </div>
                        <div className="flex-1 px-5 sm:px-6 pb-4 overflow-y-auto scrollbar-thin">
                          <p className="text-sm leading-relaxed text-white/85 whitespace-pre-line">
                            {card.background}
                          </p>
                        </div>
                        <div className="relative px-5 sm:px-6 pb-5 pt-2 flex items-center justify-between border-t border-white/10">
                          <span className="font-handwriting text-base text-white/30 leading-none select-none">
                            Travel with Work
                          </span>
                          <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-gold">
                            <span className="block w-1.5 h-1.5 rounded-full bg-brand-gold" aria-hidden />
                            點擊返回
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Arrow: Next */}
          <button
            type="button"
            onClick={goNext}
            aria-label="下一位講師"
            className="absolute right-0 sm:right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-30 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-teal text-white shadow-lg hover:bg-brand-teal/90 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Counter + dots */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3">
          <p className="text-sm text-brand-text/70 tabular-nums">
            <span className="text-brand-teal font-semibold">{activeIndex + 1}</span>
            <span className="mx-1.5 text-brand-text/40">/</span>
            <span>{total}</span>
            <span className="ml-2 text-brand-text/60">{cards[activeIndex]?.name}</span>
          </p>
          <div className="flex items-center justify-center gap-1.5 max-w-full overflow-x-auto px-4">
            {cards.map((card, idx) => (
              <button
                key={card.key}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`跳至第 ${idx + 1} 位：${card.name}`}
                className={`shrink-0 transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? "w-8 h-2 bg-brand-teal"
                    : "w-2 h-2 bg-brand-mist hover:bg-brand-gold/60"
                }`}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-brand-text/55">
            滑動 / 點擊側邊卡片 / 使用左右箭頭切換 ・ 點擊主卡翻面查看完整介紹
          </p>
        </div>
      </div>
    </section>
  )
}
