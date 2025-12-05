"use client"

import { usePricing, formatPrice, getSingleLinePrice } from "@/contexts/pricing-context"
import { Button } from "@/components/ui/button"

export function StickyBottomBar() {
  const { currentStageData, timeLeft, selectedPlanId, getCheckoutURLWithTracking } = usePricing()

  if (!currentStageData) return null

  const singleLinePrice = getSingleLinePrice(currentStageData)

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#17464F] text-white py-3 px-4 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-white/80 truncate">
            🔥 {currentStageData.name}｜NT${formatPrice(singleLinePrice)} 起
          </p>
          <p className="text-xs text-[#D4B483]">
            {String(timeLeft.days).padStart(2, "0")}天 {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
          </p>
        </div>
        <Button
          asChild
          size="sm"
          className="bg-[#D4B483] hover:bg-[#D4B483]/90 text-[#17464F] rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap"
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
            {selectedPlanId ? "以此價格報名" : "查看方案"}
          </a>
        </Button>
      </div>
    </div>
  )
}
