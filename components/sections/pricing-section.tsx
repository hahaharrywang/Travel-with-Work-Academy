"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { usePricing, formatPrice, stages } from "@/contexts/pricing-context"
import { X } from "lucide-react"

export function PricingSection() {
  const { currentStageData, timeLeft, selectedPlanId, setSelectedPlanId, getCheckoutURLWithTracking } = usePricing()
  const [timelineExpanded, setTimelineExpanded] = useState(false)
  const [showAllStagesMobile, setShowAllStagesMobile] = useState(false)
  const [showTimelineModal, setShowTimelineModal] = useState(false)

  const collapsedStages = useMemo(() => {
    const now = new Date()
    const currentIndex = stages.findIndex((s) => now >= s.startAt && now <= s.endAt)
    const nextIndex = currentIndex + 1 < stages.length ? currentIndex + 1 : -1
    const originalIndex = stages.length - 1 // Last stage is "原價"

    // Always include: current, next (if exists), and original price
    const mustShowIndices = new Set<number>()
    if (currentIndex >= 0) mustShowIndices.add(currentIndex)
    if (nextIndex >= 0 && nextIndex !== originalIndex) mustShowIndices.add(nextIndex)
    mustShowIndices.add(originalIndex)

    // Calculate remaining slots (target ~6 total)
    const targetTotal = 6
    const remainingSlots = targetTotal - mustShowIndices.size

    // Evenly distribute remaining stages
    const otherIndices = stages.map((_, i) => i).filter((i) => !mustShowIndices.has(i))

    const step = Math.max(1, Math.floor(otherIndices.length / remainingSlots))
    const distributedIndices: number[] = []
    for (let i = 0; i < otherIndices.length && distributedIndices.length < remainingSlots; i += step) {
      distributedIndices.push(otherIndices[i])
    }

    // Combine and sort
    const allIndices = [...mustShowIndices, ...distributedIndices].sort((a, b) => a - b)
    return allIndices.map((i) => stages[i])
  }, [])

  const collapsedStagesMobile = useMemo(() => {
    const now = new Date()
    const currentIndex = stages.findIndex((s) => now >= s.startAt && now <= s.endAt)
    const nextIndex = currentIndex + 1 < stages.length ? currentIndex + 1 : -1
    const originalIndex = stages.length - 1

    const indices = new Set<number>()
    if (currentIndex >= 0) indices.add(currentIndex)
    if (nextIndex >= 0 && nextIndex !== originalIndex) indices.add(nextIndex)
    indices.add(originalIndex)

    // Add one more stage between next and original if there's room
    if (indices.size < 4 && nextIndex >= 0) {
      const midIndex = Math.floor((nextIndex + originalIndex) / 2)
      if (midIndex !== nextIndex && midIndex !== originalIndex) {
        indices.add(midIndex)
      }
    }

    return [...indices].sort((a, b) => a - b).map((i) => stages[i])
  }, [])

  return (
    <section id="pricing-section" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
            <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17464F] mb-6">
            選一條先走，
            <br className="sm:hidden" />
            也可以雙線並進
          </h2>
          <p className="text-lg sm:text-xl text-[#33393C] max-w-3xl mx-auto leading-relaxed">
            所有方案都包含四至九月的路線必修、共同必修、成長節奏、Skool共學群組、Line閒聊群、 LinkedIn校友群。
            <br className="hidden sm:block" />
            差別只在於：你想快速一次打開兩種可能，還是想先專心走一條主線。
          </p>
          {/* Removed 🔥目前為「招生啟動價」· 51 折 badge */}
        </div>

        {/* Countdown Card */}
        <div className="mb-16">
          {/* 當前階段摘要卡 */}
          {currentStageData && (
            <div className="bg-gradient-to-br from-[#17464F] to-[#1a5561] rounded-2xl p-6 sm:p-8 text-white text-center max-w-2xl mx-auto">
              {/* Corrected discount display, using discountLabel instead of discount */}
              <p className="text-lg text-white/80 mb-2">
                目前階段{" "}
                <span className="text-[#D4B483] font-bold">
                  {currentStageData.name} {currentStageData.discountLabel}
                </span>
              </p>
              <p className="text-sm text-white/60 mb-3">漲價倒數</p>
              <p className="text-3xl sm:text-4xl font-bold text-[#D4B483] mb-4">
                {timeLeft.days} 天 {String(timeLeft.hours).padStart(2, "0")} 時{" "}
                {String(timeLeft.minutes).padStart(2, "0")} 分 {String(timeLeft.seconds).padStart(2, "0")} 秒
              </p>
              {/* Button to open timeline modal */}
              <button
                onClick={() => setShowTimelineModal(true)}
                className="text-sm text-white/70 hover:text-[#D4B483] transition-colors underline underline-offset-4"
              >
                查看漲價時間軸
              </button>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* 自媒體接案線路 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col order-1">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-[#17464F] mb-2">自媒體接案線路</h4>
              <p className="text-sm text-[#33393C]/70">適合想要經營個人品牌、接案或創作者</p>
            </div>
            <ul className="space-y-3 mb-6 flex-1 text-sm text-[#33393C]">
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>自媒體路線必修課程 X4</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>共同必修課程 X4 </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>學院成長節奏(開學畢業典禮、同學交流會、復盤、期末 DemoDay) X10</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>共創專案參與機會</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>學員專屬社群 (Skool共學群｜Line閒聊｜校友 Linkedin群)</span>
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

          {/* 雙線並進（推薦） */}
          <div className="bg-white rounded-2xl border-2 border-[#D4B483] p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col relative order-3 md:order-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4B483] text-[#17464F] px-4 py-1 rounded-full text-sm font-bold">
              推薦
            </div>
            <div className="mb-6">
              <h4 className="text-xl font-bold text-[#17464F] mb-2">雙線並進</h4>
              <p className="text-sm text-[#33393C]/70">想要兩條路都打通、最大化機會的你</p>
            </div>
            <ul className="space-y-3 mb-6 flex-1 text-sm text-[#33393C]">
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>雙路線必修課程 X8</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>共同必修課程 X4 </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>學院成長節奏(開學畢業典禮、同學交流會、復盤、期末 DemoDay) X10</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>共創專案參與機會</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>學員專屬社群 (Skool共學群｜Line閒聊｜校友 Linkedin群)</span>
              </li>
            </ul>
            <div className="text-center pt-4 border-t border-slate-100">
              {currentStageData && (
                <>
                  <div className="text-sm text-gray-500 line-through mb-1">
                    原價 NT$ {formatPrice(currentStageData.prices.dualLine.original)}
                  </div>
                  <div className="text-3xl font-bold text-[#D4B483] mb-1">
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
                    選擇此方案
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
                  {selectedPlanId === "dualLine" ? "✓ 已選擇" : "選擇此方案"}
                </Button>
              </div>
            </div>
          </div>

          {/* 遠端上班線路 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col order-2 md:order-3">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-[#17464F] mb-2">遠端上班線路</h4>
              <p className="text-sm text-[#33393C]/70">想找到一份遠端工作、時間地點自由的你</p>
            </div>
            <ul className="space-y-3 mb-6 flex-1 text-sm text-[#33393C]">
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>遠端上班路線必修課程 X4</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>共同必修課程 X4 </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>學院成長節奏(開學畢業典禮、同學交流會、復盤、期末 DemoDay) X10</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>共創專案參與機會</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>學員專屬社群 (Skool共學群｜Line閒聊｜校友 Linkedin群)</span>
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

        {/* Limited Offer Section */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="bg-[#F5F3ED]/80 backdrop-blur rounded-2xl p-6 sm:p-8 shadow-lg border border-[#D4B483]/30">
            <div className="flex justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#17464F] mb-6 text-center">學員限定資源</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/80 rounded-xl p-4 border border-[#C9D7D4]/50">
                <div className="flex items-start gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-1.5 flex-shrink-0"></span>
                  <span className="font-semibold text-[#17464F] text-sm sm:text-base">活動特殊折扣＆優先報名資格</span>
                </div>
                <p className="text-[#33393C] text-xs sm:text-sm leading-snug pl-4">
                  選修課、工作坊、社群線下聚會海內外遊牧啟發之旅
                </p>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border border-[#C9D7D4]/50">
                <div className="flex items-start gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-1.5 flex-shrink-0"></span>
                  <span className="font-semibold text-[#17464F] text-sm sm:text-base">加入、發起共創專案</span>
                </div>
                <p className="text-[#33393C] text-xs sm:text-sm leading-snug pl-4">
                  遊牧之聲訪談、Builder 實習計劃、線上線下讀書會
                </p>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border border-[#C9D7D4]/50">
                <div className="flex items-start gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-1.5 flex-shrink-0"></span>
                  <span className="font-semibold text-[#17464F] text-sm sm:text-base">許願池</span>
                </div>
                <p className="text-[#33393C] text-xs sm:text-sm leading-snug pl-4">
                  定期許願，讓更多學習資源集中於學院
                </p>
              </div>
            </div>

            <div className="text-center">
              <a
                href={getCheckoutURLWithTracking()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#17464F] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#0f3339] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                onClick={() => {
                  if (typeof window !== "undefined" && (window as any).trackInitiateCheckout) {
                    ;(window as any).trackInitiateCheckout(0)
                  }
                }}
              >
                我要加入本梯
              </a>
            </div>
          </div>
        </div>

        {showTimelineModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowTimelineModal(false)}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setShowTimelineModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-5 h-5 text-[#33393C]" />
              </button>

              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#17464F] text-center mb-8">價格階段時間軸</h3>

                {/* Desktop: 橫向時間軸 */}
                <div className="hidden md:block">
                  <div className="relative overflow-x-auto pb-4">
                    <div className="flex items-center justify-between min-w-max px-4">
                      {(timelineExpanded ? stages : collapsedStages).map((stage, index, arr) => {
                        const now = new Date()
                        const isPast = now > stage.endAt
                        const isCurrent = now >= stage.startAt && now <= stage.endAt
                        const isNext =
                          !isCurrent &&
                          !isPast &&
                          stages.findIndex((s) => s.id === stage.id) ===
                            stages.findIndex((s) => now >= s.startAt && now <= stage.endAt) + 1
                        const isOriginal = stage.id === "stage_12"

                        return (
                          <div key={stage.id} className="flex items-center">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-4 h-4 rounded-full border-2 ${
                                  isCurrent
                                    ? "bg-[#D4B483] border-[#D4B483] ring-4 ring-[#D4B483]/20"
                                    : isNext
                                      ? "bg-[#17464F] border-[#17464F]"
                                      : isPast
                                        ? "bg-gray-300 border-gray-300"
                                        : isOriginal
                                          ? "bg-[#A06E56] border-[#A06E56]"
                                          : "bg-white border-[#17464F]"
                                }`}
                              />
                              <div className="mt-2 text-center">
                                <div
                                  className={`text-xs font-medium ${
                                    isCurrent
                                      ? "text-[#D4B483]"
                                      : isNext
                                        ? "text-[#17464F] font-bold"
                                        : isPast
                                          ? "text-gray-400"
                                          : isOriginal
                                            ? "text-[#A06E56]"
                                            : "text-[#17464F]"
                                  }`}
                                >
                                  {stage.name}
                                  {isCurrent && <span className="block text-[10px]">(目前)</span>}
                                  {isNext && <span className="block text-[10px]">(下一階段)</span>}
                                </div>
                                <div className={`text-xs ${isPast ? "text-gray-400" : "text-[#33393C]"}`}>
                                  {stage.discountLabel}
                                </div>
                                <div className={`text-xs ${isPast ? "text-gray-400" : "text-[#33393C]/60"}`}>
                                  ~{stage.endAt.getMonth() + 1}/{stage.endAt.getDate()}
                                </div>
                              </div>
                            </div>
                            {index < arr.length - 1 && (
                              <div className={`w-16 h-0.5 mx-2 ${isPast ? "bg-gray-300" : "bg-[#17464F]/20"}`} />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setTimelineExpanded(!timelineExpanded)}
                      className="text-sm text-[#17464F] hover:text-[#D4B483] transition-colors underline"
                    >
                      {timelineExpanded ? "收起" : "展開全部 12 個階段"}
                    </button>
                  </div>
                </div>

                {/* Mobile: 垂直卡片 */}
                <div className="md:hidden space-y-3">
                  {(showAllStagesMobile ? stages : collapsedStagesMobile).map((stage) => {
                    const now = new Date()
                    const isPast = now > stage.endAt
                    const isCurrent = now >= stage.startAt && now <= stage.endAt
                    const isNext =
                      !isCurrent &&
                      !isPast &&
                      stages.findIndex((s) => s.id === stage.id) ===
                        stages.findIndex((s) => now >= s.startAt && now <= stage.endAt) + 1
                    const isOriginal = stage.id === "stage_12"

                    return (
                      <div
                        key={stage.id}
                        className={`p-4 rounded-xl border ${
                          isCurrent
                            ? "border-[#D4B483] bg-[#D4B483]/10"
                            : isNext
                              ? "border-[#17464F] bg-[#17464F]/5"
                              : isPast
                                ? "border-gray-200 bg-gray-50"
                                : isOriginal
                                  ? "border-[#A06E56]/50 bg-[#A06E56]/5"
                                  : "border-[#17464F]/20 bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div
                              className={`font-medium ${
                                isCurrent
                                  ? "text-[#D4B483]"
                                  : isNext
                                    ? "text-[#17464F] font-bold"
                                    : isPast
                                      ? "text-gray-400"
                                      : isOriginal
                                        ? "text-[#A06E56]"
                                        : "text-[#17464F]"
                              }`}
                            >
                              {stage.name}
                              {isCurrent && <span className="ml-2 text-xs">(目前)</span>}
                              {isNext && <span className="ml-2 text-xs">(下一階段)</span>}
                            </div>
                            <div className={`text-sm ${isPast ? "text-gray-400" : "text-[#33393C]/70"}`}>
                              {stage.discountLabel} · ~{stage.endAt.getMonth() + 1}/{stage.endAt.getDate()}
                            </div>
                          </div>
                          <div className={`text-right ${isPast ? "text-gray-400" : "text-[#17464F]"}`}>
                            <div className="text-sm font-bold">
                              NT$ {formatPrice(stage.prices.selfMedia.stagePrice)}
                            </div>
                            <div className="text-xs">單線起</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <button
                    onClick={() => setShowAllStagesMobile(!showAllStagesMobile)}
                    className="w-full py-3 text-sm text-[#17464F] hover:text-[#D4B483] transition-colors underline"
                  >
                    {showAllStagesMobile ? "收起" : "展開看全部"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
