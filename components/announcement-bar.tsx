"use client"

import Image from "next/image"
import { usePricing } from "@/contexts/pricing-context"

interface AnnouncementBarProps {
  scrollToPricing: () => void
}

export function AnnouncementBar({ scrollToPricing }: AnnouncementBarProps) {
  const { currentStageData, timeLeft } = usePricing()

  if (!currentStageData) return null

  const navItems = [
    { label: "課程介紹", href: "#course-intro" },
    { label: "六個月路線", href: "#six-month-route" },
    { label: "學員回饋", href: "#testimonials" },
    { label: "學習方案", href: "#pricing" },
    { label: "常見問題", href: "#faq" },
  ]

  return (
    <div className="sticky top-0 z-50 bg-[#17464F] text-white py-2 px-4 hidden md:block overflow-visible">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative -ml-4 -my-4">
            <Image
              src="/images/academy-logo.png"
              alt="遠距遊牧學院"
              width={240}
              height={60}
              className="h-14 w-auto object-contain brightness-0 invert"
              priority
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span>🔥</span>
          <span className="text-[#D4B483] font-bold">{currentStageData.name}</span>
          <span className="text-[#D4B483] font-bold">{currentStageData.discountLabel}</span>
          <span className="mx-1">｜</span>
          {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
            <span>
              漲價倒數
              <span className="font-bold text-[#D4B483] ml-1">
                {String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 時{" "}
                {String(timeLeft.minutes).padStart(2, "0")} 分 {String(timeLeft.seconds).padStart(2, "0")} 秒
              </span>
            </span>
          ) : (
            <span className="text-white/80">本階段已結束</span>
          )}
        </div>

        <nav className="flex items-center gap-6 flex-shrink-0">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.href === "#pricing") {
                  e.preventDefault()
                  scrollToPricing()
                }
              }}
              className="text-sm text-white/90 hover:text-[#D4B483] transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
