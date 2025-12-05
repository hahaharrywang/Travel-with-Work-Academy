"use client"

import { usePricing, formatPrice } from "@/contexts/pricing-context"

interface AnnouncementBarProps {
  scrollToPricing: () => void
}

export function AnnouncementBar({ scrollToPricing }: AnnouncementBarProps) {
  const { currentStageData, timeLeft, lowestPrice } = usePricing()

  if (!currentStageData) return null

  return (
    <div className="sticky top-0 z-50 bg-[#17464F] text-white py-3 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span>🔥</span>
          <span>
            <span className="text-[#D4B483] font-bold">{currentStageData.name}</span>
            <span className="text-[#D4B483] font-bold">{currentStageData.discountLabel}</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
            <span>
              距離下次價格調整還有：
              <span className="font-bold text-[#D4B483] ml-1">
                {String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 小時{" "}
                {String(timeLeft.minutes).padStart(2, "0")} 分 {String(timeLeft.seconds).padStart(2, "0")} 秒
              </span>
            </span>
          ) : (
            <span className="text-white/80">本階段已結束，價格即將切換至下一階段</span>
          )}
          <span className="mx-1">|</span>
          <span>
            單線方案本階段最低{" "}
            <span className="font-bold text-[#D4B483]">NT$ {lowestPrice ? formatPrice(lowestPrice) : "--"}</span> 起
          </span>
        </div>

        <button
          onClick={scrollToPricing}
          className="bg-[#D4B483] text-[#17464F] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#c9a673] transition-colors flex-shrink-0"
        >
          查看三種方案
        </button>
      </div>
    </div>
  )
}
