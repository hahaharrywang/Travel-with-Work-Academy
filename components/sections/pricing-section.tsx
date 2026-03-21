"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { usePricing, formatPrice, stages } from "@/contexts/pricing-context"
import { X } from "lucide-react"

interface PricingSectionProps {
  onTimelineModalChange?: (isOpen: boolean) => void
}

export function PricingSection({ onTimelineModalChange }: PricingSectionProps) {
  const { currentStageData, timeLeft, getCheckoutURLWithTracking } = usePricing()
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

  const handleTimelineModalOpen = () => {
    setShowTimelineModal(true)
    onTimelineModalChange?.(true)
  }

  const handleTimelineModalClose = () => {
    setShowTimelineModal(false)
    onTimelineModalChange?.(false)
  }

  return (
    <section id="pricing-section" className="pt-16 sm:pt-24 pb-8 sm:pb-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
            <span className="w-2 h-2 rounded-full bg-brand-teal"></span>
            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-teal mb-6">
            {'如何加入'}
          </h2>
          <p className="text-lg sm:text-xl text-brand-text max-w-3xl mx-auto leading-relaxed">
            {'先選一個最適合你現在狀態的起跑方式。'}
          </p>
          <p className="text-base text-brand-text/70 max-w-3xl mx-auto leading-relaxed mt-2">
            {'不一定要一次走到最完整，但你可以先決定：要專心走一條主線，還是用五個月更快打開兩種可能。'}
          </p>
        </div>

        {/* Countdown Card */}
        <div className="mb-16">
          {/* 當前階段摘要卡 */}
          {currentStageData && (
            <div className="bg-gradient-to-br from-brand-teal to-[#1a5561] rounded-2xl p-6 sm:p-8 text-white text-center max-w-2xl mx-auto">
              {/* Corrected discount display, using discountLabel instead of discount */}
              <p className="text-lg text-white/80 mb-2">
                目前階段{" "}
                <span className="text-brand-gold font-bold">
                  {currentStageData.name} {currentStageData.discountLabel}
                </span>
              </p>
              <p className="text-sm text-white/60 mb-3">漲價倒數</p>
              <p className="text-3xl sm:text-4xl font-bold text-brand-gold mb-4">
                {timeLeft.days} 天 {String(timeLeft.hours).padStart(2, "0")} 時{" "}
                {String(timeLeft.minutes).padStart(2, "0")} 分 {String(timeLeft.seconds).padStart(2, "0")} 秒
              </p>
              {/* Button to open timeline modal */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleTimelineModalOpen}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-brand-gold text-brand-gold font-bold hover:bg-brand-gold hover:text-brand-teal transition-colors"
                >
                  查看漲價時間軸
                </button>
                <p className="text-xs text-white/50">
                  隨著更多資訊釋出，每週四午夜調漲價格
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div id="pricing-cards" className="grid md:grid-cols-3 gap-6 mb-12">
          {/* 接案線路 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col order-1">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-brand-teal mb-2">接案線路</h4>
              <p className="text-sm text-brand-text/70">適合想要經營個人品牌、接案或創作者</p>
            </div>
            <ul className="space-y-3 mb-6 flex-1 text-sm text-brand-text">
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>接案路線必修課程 X4</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>共同必修課程 X4 </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>學院成長節奏(開學畢業典禮、同學交流會、復盤、期末 DemoDay) X10</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>共創專案參與機會</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>終身校友資格 (人脈群組、優先資訊＆專屬折扣)</span>
              </li>
            </ul>
            <div className="text-center pt-4 border-t border-slate-100">
              {currentStageData && (
                <>
                  <div className="text-sm text-gray-500 line-through mb-1">
                    原價 NT$ {formatPrice(currentStageData.prices.selfMedia.original)}
                  </div>
                  <div className="text-3xl font-bold text-brand-teal mb-1">
                    NT$ {formatPrice(currentStageData.prices.selfMedia.stagePrice)}
                  </div>
                  <div className="text-xs text-brand-gold font-medium mb-4">
                    目前為「{currentStageData.name}」· {currentStageData.discountLabel}（省 NT${" "}
                    {formatPrice(currentStageData.prices.selfMedia.savingAmount)}）
                  </div>
                </>
              )}
              <div className="hidden md:block">
                <a href={getCheckoutURLWithTracking("selfMedia")} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-brand-teal hover:bg-[#0f3339] text-white py-3 rounded-full font-medium">
                    選擇此方案
                  </Button>
                </a>
              </div>
              <div className="md:hidden">
                <a href={getCheckoutURLWithTracking("selfMedia")} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-brand-teal hover:bg-[#0f3339] text-white py-3 rounded-full font-medium">
                    選擇此方案
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* 雙線並進（推薦） */}
          <div className="bg-white rounded-2xl border-2 border-brand-gold p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col relative order-3 md:order-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-teal px-4 py-1 rounded-full text-sm font-bold">
              推薦
            </div>
            <div className="mb-6">
              <h4 className="text-xl font-bold text-brand-teal mb-2">雙線並進</h4>
              <p className="text-sm text-brand-text/70">同時探索兩條路線，適合最怕選錯、也想在五個月內更快看見答案的人</p>
            </div>
            <ul className="space-y-3 mb-6 flex-1 text-sm text-brand-text">
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>雙路線必修課程 X8</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>共同必修課程 X4 </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>學院成長節奏(開學畢業典禮、同學交流會、復盤、期末 DemoDay) X10</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>共創專案參與機會</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>終身校友資格 (人脈群組、優先資訊＆專屬折扣)</span>
              </li>
            </ul>
            <div className="text-center pt-4 border-t border-slate-100">
              {currentStageData && (
                <>
                  <div className="text-sm text-gray-500 line-through mb-1">
                    原價 NT$ {formatPrice(currentStageData.prices.dualLine.original)}
                  </div>
                  <div className="text-3xl font-bold text-brand-gold mb-1">
                    NT$ {formatPrice(currentStageData.prices.dualLine.stagePrice)}
                  </div>
                  <div className="text-xs text-brand-gold font-medium mb-4">
                    目前為「{currentStageData.name}」· {currentStageData.discountLabel}（省 NT${" "}
                    {formatPrice(currentStageData.prices.dualLine.savingAmount)}）
                  </div>
                </>
              )}
              <div className="hidden md:block">
                <a href={getCheckoutURLWithTracking("dualLine")} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-brand-gold hover:bg-[#c9a673] text-brand-teal py-3 rounded-full font-bold">
                    選擇此方案
                  </Button>
                </a>
              </div>
              <div className="md:hidden">
                <a href={getCheckoutURLWithTracking("dualLine")} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-brand-gold hover:bg-[#c9a673] text-brand-teal py-3 rounded-full font-bold">
                    選擇此方案
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* 遠端上班線路 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col order-2 md:order-3">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-brand-teal mb-2">遠端上班線路</h4>
              <p className="text-sm text-brand-text/70">想找到一份遠端工作、時間地點自由的你</p>
            </div>
            <ul className="space-y-3 mb-6 flex-1 text-sm text-brand-text">
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>遠端上班路線必修課程 X4</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>共同必修課程 X4 </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>學院成長節奏(開學畢業典禮、同學交流會、復盤、期末 DemoDay) X10</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>共創專案參與機會</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-gold mt-0.5">●</span>
                <span>終身校友資格 (人脈群組、優先資訊＆專屬折扣)</span>
              </li>
            </ul>
            <div className="text-center pt-4 border-t border-slate-100">
              {currentStageData && (
                <>
                  <div className="text-sm text-gray-500 line-through mb-1">
                    原價 NT$ {formatPrice(currentStageData.prices.remoteJob.original)}
                  </div>
                  <div className="text-3xl font-bold text-brand-teal mb-1">
                    NT$ {formatPrice(currentStageData.prices.remoteJob.stagePrice)}
                  </div>
                  <div className="text-xs text-brand-gold font-medium mb-4">
                    目前為「{currentStageData.name}」· {currentStageData.discountLabel}（省 NT${" "}
                    {formatPrice(currentStageData.prices.remoteJob.savingAmount)}）
                  </div>
                </>
              )}
              <div className="hidden md:block">
                <a href={getCheckoutURLWithTracking("remoteJob")} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-brand-teal hover:bg-[#0f3339] text-white py-3 rounded-full font-medium">
                    選擇此方案
                  </Button>
                </a>
              </div>
              <div className="md:hidden">
                <a href={getCheckoutURLWithTracking("remoteJob")} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-brand-teal hover:bg-[#0f3339] text-white py-3 rounded-full font-medium">
                    選擇此方案
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer note */}
        <div className="rounded-xl bg-brand-mist/30 border border-brand-mist px-5 py-4 text-center mb-4">
          <p className="text-brand-text text-xs sm:text-sm leading-relaxed">
            <span className="font-semibold text-brand-teal">重要說明：</span>學院方案以「課程＋社群＋校友資格」為主；多數線下活動／工作坊／旅程為選配加購，但校友享優先與專屬價。
          </p>
        </div>

        {/* Timeline Modal */}
        {showTimelineModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleTimelineModalClose} />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pb-20 md:pb-6">
              {/* Close Button */}
              <button
                onClick={handleTimelineModalClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-5 h-5 text-brand-text" />
              </button>

              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-teal text-center mb-8">價格階段時間軸</h3>

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
                        const isOriginal = stage.id === "stage_15"

                        return (
                          <div key={stage.id} className="flex items-center">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-4 h-4 rounded-full border-2 ${
                                  isCurrent
                                    ? "bg-brand-gold border-brand-gold ring-4 ring-brand-gold/20"
                                    : isNext
                                      ? "bg-brand-teal border-brand-teal"
                                      : isPast
                                        ? "bg-gray-300 border-gray-300"
                                        : isOriginal
                                          ? "bg-[#A06E56] border-[#A06E56]"
                                          : "bg-white border-brand-teal"
                                }`}
                              />
                              <div className="mt-2 text-center">
                                <div
                                  className={`text-xs font-medium ${
                                    isCurrent
                                      ? "text-brand-gold"
                                      : isNext
                                        ? "text-brand-teal font-bold"
                                        : isPast
                                          ? "text-gray-400"
                                          : isOriginal
                                            ? "text-[#A06E56]"
                                            : "text-brand-teal"
                                  }`}
                                >
                                  {stage.name}
                                  {isCurrent && <span className="block text-[10px]">(目前)</span>}
                                  {isNext && <span className="block text-[10px]">(下一階段)</span>}
                                </div>
                                <div className="flex gap-1 justify-center mt-1">
                                  <span
                                    className={`text-[10px] px-1.5 py-0.5 rounded ${isPast ? "bg-gray-200 text-gray-400" : "bg-brand-teal/10 text-brand-teal"}`}
                                  >
                                    單 {stage.prices.remoteJob.stagePrice.toLocaleString()}
                                  </span>
                                  <span
                                    className={`text-[10px] px-1.5 py-0.5 rounded ${isPast ? "bg-gray-200 text-gray-400" : "bg-brand-gold/20 text-[#A06E56]"}`}
                                  >
                                    雙 {stage.prices.dualLine.stagePrice.toLocaleString()}
                                  </span>
                                </div>
                                <div className={`text-xs mt-1 ${isPast ? "text-gray-400" : "text-brand-text"}`}>
                                  {stage.discountLabel}
                                </div>
                                <div className={`text-xs ${isPast ? "text-gray-400" : "text-brand-text/60"}`}>
                                  {isOriginal ? (
                                    <>{String(stage.startAt.getFullYear())}/{String(stage.startAt.getMonth() + 1).padStart(2, "0")}/{String(stage.startAt.getDate()).padStart(2, "0")} {"起~"}</>
                                  ) : (
                                    <>~{String(stage.endAt.getMonth() + 1).padStart(2, "0")}/{String(stage.endAt.getDate()).padStart(2, "0")}{" "}{String(stage.endAt.getHours()).padStart(2, "0")}:{String(stage.endAt.getMinutes()).padStart(2, "0")}</>
                                  )}
                                </div>
                              </div>
                            </div>
                            {index < arr.length - 1 && (
                              <div className={`w-16 h-0.5 mx-2 ${isPast ? "bg-gray-300" : "bg-brand-teal/20"}`} />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setTimelineExpanded(!timelineExpanded)}
                      className="text-sm text-brand-teal hover:text-brand-gold transition-colors underline"
                    >
                      {timelineExpanded ? "收起" : "展開全部 15 個階段"}
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
                    const isOriginal = stage.id === "stage_15"

                    return (
                      <div
                        key={stage.id}
                        className={`p-4 rounded-xl border ${
                          isCurrent
                            ? "border-brand-gold bg-brand-gold/10"
                            : isNext
                              ? "border-brand-teal bg-brand-teal/5"
                              : isPast
                                ? "border-gray-200 bg-gray-50"
                                : isOriginal
                                  ? "border-[#A06E56]/50 bg-[#A06E56]/5"
                                  : "border-brand-teal/20 bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div
                              className={`font-medium ${
                                isCurrent
                                  ? "text-brand-gold"
                                  : isNext
                                    ? "text-brand-teal font-bold"
                                    : isPast
                                      ? "text-gray-400"
                                      : isOriginal
                                        ? "text-[#A06E56]"
                                        : "text-brand-teal"
                              }`}
                            >
                              {stage.name}
                              {isCurrent && <span className="ml-2 text-xs">(目前)</span>}
                              {isNext && <span className="ml-2 text-xs">(下一階段)</span>}
                            </div>
                            <div className={`text-sm mt-1 ${isPast ? "text-gray-400" : "text-brand-text/70"}`}>
                              {isOriginal ? (
                                <>{stage.discountLabel} · {String(stage.startAt.getFullYear())}/{String(stage.startAt.getMonth() + 1).padStart(2, "0")}/{String(stage.startAt.getDate()).padStart(2, "0")} {"起~"}</>
                              ) : (
                                <>{stage.discountLabel} · ~{String(stage.endAt.getMonth() + 1).padStart(2, "0")}/{String(stage.endAt.getDate()).padStart(2, "0")}{" "}{String(stage.endAt.getHours()).padStart(2, "0")}:{String(stage.endAt.getMinutes()).padStart(2, "0")}</>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 items-end ml-4">
                            <span
                              className={`text-xs px-2 py-1 rounded ${isPast ? "bg-gray-200 text-gray-400" : "bg-brand-teal/10 text-brand-teal font-medium"}`}
                            >
                              單線 {stage.prices.remoteJob.stagePrice.toLocaleString()}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded ${isPast ? "bg-gray-200 text-gray-400" : "bg-brand-gold/20 text-[#A06E56] font-medium"}`}
                            >
                              雙線 {stage.prices.dualLine.stagePrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <button
                    onClick={() => setShowAllStagesMobile(!showAllStagesMobile)}
                    className="w-full py-3 text-sm text-brand-teal hover:text-brand-gold transition-colors underline"
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
