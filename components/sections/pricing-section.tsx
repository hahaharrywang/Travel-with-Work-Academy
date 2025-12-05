"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { usePricing, stages, type PlanId } from "@/contexts/pricing-context"

const planConfig: Record<PlanId, { name: string; checkoutPath: string }> = {
  selfMedia: { name: "自媒體線路方案", checkoutPath: "planId=selfmedia" },
  remoteJob: { name: "遠端上班線路方案", checkoutPath: "planId=remotejob" },
  dualLine: { name: "雙線整合方案", checkoutPath: "planId=be56b4ae-6f31-43be-8bfb-68fda4294a9a" },
}

const formatPrice = (price: number): string => {
  return price.toLocaleString("zh-TW")
}

const getCheckoutURL = (planId: PlanId, couponCode?: string) => {
  const baseURL = `https://travelworkacademy.myteachify.com/checkout?${planConfig[planId].checkoutPath}`
  return couponCode ? `${baseURL}&coupon=${encodeURIComponent(couponCode)}` : baseURL
}

const getTrackingParams = () => {
  if (typeof window === "undefined") return ""
  const urlParams = new URLSearchParams(window.location.search)
  const fbclid = urlParams.get("fbclid")
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift()
    return null
  }
  const fbc = getCookie("_fbc")
  const fbp = getCookie("_fbp")
  const params = new URLSearchParams()
  if (fbclid) params.append("fbclid", fbclid)
  if (fbc) params.append("fbc", fbc)
  if (fbp) params.append("fbp", fbp)
  return params.toString() ? `&${params.toString()}` : ""
}

interface PricingSectionProps {
  couponCode?: string | null
  selectedPlanId: PlanId | null
  setSelectedPlanId: (planId: PlanId | null) => void
}

export function PricingSection({ couponCode, selectedPlanId, setSelectedPlanId }: PricingSectionProps) {
  const { currentStageData } = usePricing()
  const [timelineExpanded, setTimelineExpanded] = useState(false)

  const getCheckoutURLWithTracking = (planId: PlanId = "dualLine") => {
    const effectivePlanId = selectedPlanId || planId
    const baseURL = getCheckoutURL(effectivePlanId, couponCode || undefined)
    const trackingParams = getTrackingParams()
    return `${baseURL}${trackingParams}`
  }

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            <span className="w-2 h-2 rounded-full bg-[#17464F]" />
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17464F] mb-6">選一條先走，也可以雙線並進</h2>
          <p className="text-lg sm:text-xl text-[#33393C] max-w-3xl mx-auto leading-relaxed">
            所有方案都包含六個月的 3+3 成長節奏、通識課程、Skool 共學社群，
            <br className="hidden sm:block" />
            差別只在於：你想先專心走哪一條主線，或是一次打開兩種可能。
          </p>
          {currentStageData && (
            <div className="mt-6 inline-flex items-center gap-2 bg-[#17464F] text-white px-4 py-1 rounded-full text-sm">
              <span>🔥</span>
              <span>
                目前為「<span className="text-[#D4B483] font-bold">{currentStageData.name}</span>」·{" "}
                {currentStageData.discountLabel}
              </span>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-[#17464F] text-center mb-8">價格階段時間軸</h3>

          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative overflow-x-auto pb-4">
              <div className="flex items-center justify-between min-w-max px-4">
                {(timelineExpanded ? stages : stages.filter((_, i) => i % 2 === 0 || i === stages.length - 1)).map(
                  (stage, index, arr) => {
                    const now = new Date()
                    const isPast = now > stage.endAt
                    const isCurrent = now >= stage.startAt && now <= stage.endAt

                    return (
                      <div key={stage.id} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              isCurrent
                                ? "bg-[#D4B483] border-[#D4B483] ring-4 ring-[#D4B483]/30"
                                : isPast
                                  ? "bg-gray-300 border-gray-300"
                                  : "bg-white border-[#17464F]"
                            }`}
                          />
                          <div
                            className={`mt-3 text-center ${
                              isCurrent ? "text-[#17464F] font-bold" : isPast ? "text-gray-400" : "text-[#33393C]"
                            }`}
                          >
                            <div className="text-xs sm:text-sm whitespace-nowrap">{stage.name}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {stage.startAt.getMonth() + 1}/{stage.startAt.getDate()}
                            </div>
                            {isCurrent && (
                              <div className="text-xs text-[#D4B483] font-medium mt-1">{stage.discountLabel}</div>
                            )}
                          </div>
                        </div>
                        {index < arr.length - 1 && (
                          <div
                            className={`w-12 sm:w-16 h-0.5 mx-2 ${
                              isPast ? "bg-gray-300" : isCurrent ? "bg-[#D4B483]" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    )
                  },
                )}
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={() => setTimelineExpanded(!timelineExpanded)}
                className="text-[#17464F] hover:text-[#D4B483] text-sm font-medium transition-colors"
              >
                {timelineExpanded ? "收合時間軸" : `展開全部 ${stages.length} 個階段`}
              </button>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden">
            <div className="space-y-4">
              {(timelineExpanded ? stages : stages.slice(0, 4)).map((stage) => {
                const now = new Date()
                const isPast = now > stage.endAt
                const isCurrent = now >= stage.startAt && now <= stage.endAt

                return (
                  <div
                    key={stage.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${
                      isCurrent
                        ? "bg-[#17464F] text-white border-[#17464F]"
                        : isPast
                          ? "bg-gray-100 text-gray-400 border-gray-200"
                          : "bg-white text-[#33393C] border-slate-200"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        isCurrent ? "bg-[#D4B483]" : isPast ? "bg-gray-300" : "bg-[#17464F]"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{stage.name}</div>
                      <div className={`text-xs ${isCurrent ? "text-white/70" : "text-gray-500"}`}>
                        {stage.startAt.getMonth() + 1}/{stage.startAt.getDate()} ~ {stage.endAt.getMonth() + 1}/
                        {stage.endAt.getDate()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${isCurrent ? "text-[#D4B483]" : ""}`}>{stage.discountLabel}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            {!timelineExpanded && stages.length > 4 && (
              <button
                onClick={() => setTimelineExpanded(true)}
                className="w-full mt-4 py-3 text-[#17464F] hover:text-[#D4B483] text-sm font-medium border border-[#17464F] rounded-full transition-colors"
              >
                展開看全部 {stages.length} 個階段
              </button>
            )}
            {timelineExpanded && (
              <button
                onClick={() => setTimelineExpanded(false)}
                className="w-full mt-4 py-3 text-[#17464F] hover:text-[#D4B483] text-sm font-medium border border-[#17464F] rounded-full transition-colors"
              >
                收合
              </button>
            )}
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Self Media Plan */}
          <div
            className={`bg-white rounded-2xl border shadow-sm flex flex-col transition-all duration-300 ${
              selectedPlanId === "selfMedia"
                ? "border-[#D4B483] border-2 shadow-lg ring-2 ring-[#D4B483]/20"
                : "border-slate-200"
            }`}
          >
            <div className="bg-[#17464F] text-white py-4 px-6 text-center">
              <h3 className="text-xl font-bold">自媒體接案線路</h3>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-[#33393C] text-sm mb-4 pb-4 border-b border-slate-100">
                適合想用內容與個人品牌，慢慢建立第二條收入的人。
              </p>
              <ul className="space-y-3 text-sm text-[#33393C] mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>
                    <strong>通識課程</strong>（Direction＋General）：人生藍圖、AI、自動化、旅居財務
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>
                    <strong>自媒體接案主課程</strong>：定位、內容系統、作品集、短影音實作
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>六個月 Skool 共學社群與同學會</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>選修實作工作坊（剪輯、AI、自動化、工作英文等）</span>
                </li>
              </ul>
              <div className="text-center pt-4 border-t border-slate-100">
                {currentStageData && (
                  <>
                    <div className="text-sm text-gray-500 line-through mb-1">
                      原價 NT$ {formatPrice(currentStageData.prices.selfMedia.original)}
                    </div>
                    <div className="text-3xl font-bold text-[#17464F] mb-1">
                      NT$ {formatPrice(currentStageData.prices.selfMedia.stagePrice)}
                    </div>
                    <div className="text-xs text-[#D4B483] font-medium mb-4">
                      目前為「{currentStageData.name}」· {currentStageData.discountLabel}（省 NT${" "}
                      {formatPrice(currentStageData.prices.selfMedia.savingAmount)}）
                    </div>
                  </>
                )}
                <div className="hidden md:block">
                  <a href={getCheckoutURLWithTracking("selfMedia")} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-[#17464F] hover:bg-[#0f3339] text-white py-3 rounded-full font-medium">
                      選擇此方案
                    </Button>
                  </a>
                </div>
                <div className="md:hidden">
                  <Button
                    onClick={() => setSelectedPlanId("selfMedia")}
                    className={`w-full py-3 rounded-full font-medium ${
                      selectedPlanId === "selfMedia"
                        ? "bg-[#D4B483] text-[#17464F]"
                        : "bg-[#17464F] hover:bg-[#0f3339] text-white"
                    }`}
                  >
                    {selectedPlanId === "selfMedia" ? "✓ 已選擇" : "選擇此方案"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Dual Line Plan (Recommended) */}
          <div
            className={`bg-white rounded-2xl shadow-lg overflow-hidden relative flex flex-col transition-all duration-300 ${
              selectedPlanId === "dualLine"
                ? "border-4 border-[#D4B483] ring-4 ring-[#D4B483]/20"
                : "border-2 border-[#D4B483]"
            }`}
          >
            <div className="absolute top-0 right-0 bg-[#D4B483] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              推薦方案
            </div>
            <div className="bg-gradient-to-r from-[#17464F] to-[#1a5259] text-white py-4 px-6 text-center">
              <h3 className="text-xl font-bold">雙線並進方案</h3>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-[#33393C] text-sm mb-4 pb-4 border-b border-slate-100">
                適合想同時為副業收入與職涯升級鋪路的人。
              </p>
              <ul className="space-y-3 text-sm text-[#33393C] mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>
                    <strong>通識課程</strong>（Direction＋General）：人生藍圖、AI、自動化、旅居財務
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>
                    <strong>自媒體接案 + 遠端上班</strong> 雙主線課程全解鎖
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>六個月 Skool 共學社群與同學會</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>選修實作工作坊（全部工作坊優先報名）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>專屬雙軌學員交流小組</span>
                </li>
              </ul>
              <div className="text-center pt-4 border-t border-slate-100">
                {currentStageData && (
                  <>
                    <div className="text-sm text-gray-500 line-through mb-1">
                      原價 NT$ {formatPrice(currentStageData.prices.dualLine.original)}
                    </div>
                    <div className="text-3xl font-bold text-[#17464F] mb-1">
                      NT$ {formatPrice(currentStageData.prices.dualLine.stagePrice)}
                    </div>
                    <div className="text-xs text-[#D4B483] font-medium mb-4">
                      目前為「{currentStageData.name}」· {currentStageData.discountLabel}（省 NT${" "}
                      {formatPrice(currentStageData.prices.dualLine.savingAmount)}）
                    </div>
                  </>
                )}
                <div className="hidden md:block">
                  <a href={getCheckoutURLWithTracking("dualLine")} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-[#D4B483] hover:bg-[#c9a673] text-[#17464F] py-3 rounded-full font-bold">
                      選擇雙線方案
                    </Button>
                  </a>
                </div>
                <div className="md:hidden">
                  <Button
                    onClick={() => setSelectedPlanId("dualLine")}
                    className={`w-full py-3 rounded-full font-bold ${
                      selectedPlanId === "dualLine"
                        ? "bg-[#17464F] text-white"
                        : "bg-[#D4B483] hover:bg-[#c9a673] text-[#17464F]"
                    }`}
                  >
                    {selectedPlanId === "dualLine" ? "✓ 已選擇" : "選擇雙線方案"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Remote Job Plan */}
          <div
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col transition-all duration-300 ${
              selectedPlanId === "remoteJob"
                ? "border-[#D4B483] border-2 shadow-lg ring-2 ring-[#D4B483]/20"
                : "border-2 border-[#D4B483]"
            }`}
          >
            <div className="bg-[#17464F] text-white py-4 px-6 text-center">
              <h3 className="text-xl font-bold">遠端上班線路</h3>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-[#33393C] text-sm mb-4 pb-4 border-b border-slate-100">
                適合想往遠端團隊、外商或更有彈性的職涯前進的人。
              </p>
              <ul className="space-y-3 text-sm text-[#33393C] mb-6 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>
                    <strong>通識課程</strong>（Direction＋General）：人生藍圖、AI、自動化、旅居財務
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>
                    <strong>遠端上班主課程</strong>：職涯藍圖、履歷、LinkedIn、面試與談薪、獵頭合作
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>六個月 Skool 共學社群與同學會</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4B483] mt-0.5">●</span>
                  <span>選修實作工作坊（剪輯、AI、自動化、工作英文等）</span>
                </li>
              </ul>
              <div className="text-center pt-4 border-t border-slate-100">
                {currentStageData && (
                  <>
                    <div className="text-sm text-gray-500 line-through mb-1">
                      原價 NT$ {formatPrice(currentStageData.prices.remoteJob.original)}
                    </div>
                    <div className="text-3xl font-bold text-[#17464F] mb-1">
                      NT$ {formatPrice(currentStageData.prices.remoteJob.stagePrice)}
                    </div>
                    <div className="text-xs text-[#D4B483] font-medium mb-4">
                      目前為「{currentStageData.name}」· {currentStageData.discountLabel}（省 NT${" "}
                      {formatPrice(currentStageData.prices.remoteJob.savingAmount)}）
                    </div>
                  </>
                )}
                <div className="hidden md:block">
                  <a href={getCheckoutURLWithTracking("remoteJob")} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-[#17464F] hover:bg-[#0f3339] text-white py-3 rounded-full font-medium">
                      選擇此方案
                    </Button>
                  </a>
                </div>
                <div className="md:hidden">
                  <Button
                    onClick={() => setSelectedPlanId("remoteJob")}
                    className={`w-full py-3 rounded-full font-medium ${
                      selectedPlanId === "remoteJob"
                        ? "bg-[#D4B483] text-[#17464F]"
                        : "bg-[#17464F] hover:bg-[#0f3339] text-white"
                    }`}
                  >
                    {selectedPlanId === "remoteJob" ? "✓ 已選擇" : "選擇此方案"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Included in all plans */}
        <div className="bg-white/60 rounded-2xl border border-slate-200 p-6 md:p-8 text-center mb-12">
          <h4 className="text-lg font-bold text-[#17464F] mb-4">所有方案皆包含</h4>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-[#33393C]">
            <span className="bg-[#C9D7D4]/50 px-4 py-2 rounded-full">六個月 3+3 成長節奏</span>
            <span className="bg-[#C9D7D4]/50 px-4 py-2 rounded-full">通識課程（Direction + General）</span>
            <span className="bg-[#C9D7D4]/50 px-4 py-2 rounded-full">Skool 共學社群</span>
            <span className="bg-[#C9D7D4]/50 px-4 py-2 rounded-full">課程終身回放</span>
            <span className="bg-[#C9D7D4]/50 px-4 py-2 rounded-full">LinkedIn 校友網絡</span>
            <span className="bg-[#C9D7D4]/50 px-4 py-2 rounded-full">Nomad Leaders Podcast</span>
          </div>
        </div>

        {/* Scholarship Banner */}
        <div className="bg-gradient-to-r from-[#17464F] to-[#1a5259] rounded-2xl p-6 text-center text-white shadow-lg">
          <div className="text-lg font-bold mb-2">績優學員專屬獎勵</div>
          <div className="text-sm opacity-90">
            課程期間成長表現優異的學員，將有機會獲得<span className="font-semibold">學費的部分或全額</span>
            <span className="text-[#D4B483] font-bold mx-1">獎學金</span>，以及
            <span className="text-[#D4B483] font-bold mx-1">2026 年遊牧啟發之旅招待名額</span>！
          </div>
        </div>
      </div>
    </section>
  )
}
