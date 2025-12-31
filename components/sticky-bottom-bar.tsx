"use client"

import { usePricing, formatPrice } from "@/contexts/pricing-context"

type PlanId = "selfMedia" | "remoteJob" | "dualLine"

const planConfig: Record<PlanId, { name: string; checkoutId: string }> = {
  selfMedia: { name: "自媒體接案", checkoutId: "1708" },
  remoteJob: { name: "遠端上班", checkoutId: "1709" },
  dualLine: { name: "雙線並進", checkoutId: "1710" },
}

interface StickyBottomBarProps {
  scrollToPricing: () => void
  isHidden?: boolean
}

export function StickyBottomBar({ scrollToPricing, isHidden = false }: StickyBottomBarProps) {
  const { currentStageData, timeLeft, lowestPrice, selectedPlanId, getCheckoutURLWithTracking } = usePricing()

  if (!currentStageData) return null

  if (isHidden) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#C9D7D4] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      {!selectedPlanId ? (
        <div className="px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-xs text-[#33393C] mb-2">
            <span className="text-[#D4B483] font-bold">{currentStageData.name}</span>
            <span>·</span>
            <span>{currentStageData.discountLabel}</span>
            <span>·</span>
            <span>
              倒數{" "}
              <span className="font-bold">
                {String(timeLeft.days).padStart(2, "0")}天 {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span className="text-sm text-[#33393C]">
                單線方案本階段{" "}
                <span className="font-bold text-[#17464F]">NT$ {lowestPrice ? formatPrice(lowestPrice) : "--"}</span> 起
              </span>
            </div>
            <button
              onClick={scrollToPricing}
              className="flex-shrink-0 bg-[#17464F] text-white px-5 py-3 rounded-full text-sm font-bold hover:bg-[#0f3339] transition-all duration-300 shadow-md"
            >
              查看方案
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-xs text-[#33393C] mb-2">
            <span className="text-[#D4B483] font-bold">{currentStageData.name}</span>
            <span>·</span>
            <span>全方案 {currentStageData.discountLabel}</span>
            <span>·</span>
            <span>
              倒數{" "}
              <span className="font-bold">
                {String(timeLeft.days).padStart(2, "0")}天 {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[#33393C]">已選擇：{planConfig[selectedPlanId].name}</div>
              <div className="text-sm">
                <span className="font-bold text-[#17464F]">
                  NT$ {formatPrice(currentStageData.prices[selectedPlanId].stagePrice)}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  （原價 NT$ {formatPrice(currentStageData.prices[selectedPlanId].original)}｜省 NT${" "}
                  {formatPrice(currentStageData.prices[selectedPlanId].savingAmount)}）
                </span>
              </div>
            </div>
            <a
              href={getCheckoutURLWithTracking(selectedPlanId)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).trackInitiateCheckout) {
                  ;(window as any).trackInitiateCheckout(currentStageData.prices[selectedPlanId].stagePrice)
                }
              }}
              className="flex-shrink-0 bg-[#D4B483] text-[#17464F] px-5 py-3 rounded-full text-sm font-bold hover:bg-[#c9a673] transition-all duration-300 shadow-md"
            >
              以此價格加入本梯
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
