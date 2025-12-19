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
}

export function StickyBottomBar({ scrollToPricing }: StickyBottomBarProps) {
  const { currentStageData, timeLeft, lowestPrice, selectedPlanId, getCheckoutURLWithTracking } = usePricing()

  if (!currentStageData) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#C9D7D4] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      {!selectedPlanId ? (
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
          <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-[#C9D7D4]">
            <a
              href="https://www.instagram.com/travelwithwork_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-full text-xs font-medium hover:shadow-md transition-all"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://lin.ee/r7kh3fX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-[#06C755] text-white rounded-full text-xs font-medium hover:shadow-md transition-all"
              aria-label="Line 官方帳號"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              <span>Line 官方</span>
            </a>
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
          <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-[#C9D7D4]">
            <a
              href="https://www.instagram.com/travelwithwork_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-full text-xs font-medium hover:shadow-md transition-all"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://lin.ee/r7kh3fX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-[#06C755] text-white rounded-full text-xs font-medium hover:shadow-md transition-all"
              aria-label="Line 官方帳號"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              <span>Line 官方</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
