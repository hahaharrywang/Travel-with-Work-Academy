"use client"

import { usePricing, formatPrice, getSingleLinePrice } from "@/contexts/pricing-context"
import { Button } from "@/components/ui/button"

export function AnnouncementBar() {
  const { currentStageData, timeLeft, getCheckoutURLWithTracking } = usePricing()

  if (!currentStageData) return null

  const singleLinePrice = getSingleLinePrice(currentStageData)

  return (
    <div className="hidden md:block sticky top-0 z-50 bg-[#17464F] text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm">
            現在是 <span className="text-[#D4B483] font-semibold">🔥 {currentStageData.name}</span>
          </span>
          <span className="text-sm">
            單線 <span className="font-bold">NT${formatPrice(singleLinePrice)}</span> 起
            <span className="text-white/60 line-through ml-1">
              NT${formatPrice(currentStageData.prices.selfMedia.original)}
            </span>
          </span>
          <span className="text-sm text-[#D4B483]">
            剩餘：{String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 小時{" "}
            {String(timeLeft.minutes).padStart(2, "0")} 分 {String(timeLeft.seconds).padStart(2, "0")} 秒
          </span>
        </div>
        <Button
          asChild
          size="sm"
          className="bg-[#D4B483] hover:bg-[#D4B483]/90 text-[#17464F] rounded-full px-4 py-1 text-sm font-semibold"
        >
          <a
            href={getCheckoutURLWithTracking()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).trackInitiateCheckout) {
                ;(window as any).trackInitiateCheckout(0)
              }
            }}
          >
            立即鎖定{currentStageData.name}
          </a>
        </Button>
      </div>
    </div>
  )
}
