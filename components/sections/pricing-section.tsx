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


  const visibleStages = useMemo(() => {
    const now = new Date()
    const currentIndex = stages.findIndex((s) => now >= s.startAt && now <= s.endAt)
    const lastIndex = stages.length - 1

    // Past: only show up to 2 stages before current (never changes)
    const pastStart = Math.max(0, currentIndex - 2)
    const pastIndices: number[] = []
    for (let i = pastStart; i < currentIndex; i++) {
      pastIndices.push(i)
    }

    // Current
    const currentIndices = currentIndex >= 0 ? [currentIndex] : []

    // Future: all stages after current
    const futureIndices: number[] = []
    for (let i = currentIndex + 1; i <= lastIndex; i++) {
      futureIndices.push(i)
    }

    // Collapsed: past(2) + current + next(+1) + (+3) + last(原價)
    const nextIndex = currentIndex + 1
    const skipOneIndex = currentIndex + 3
    const collapsedFutureIndices = futureIndices.filter((i) =>
      i === nextIndex || i === skipOneIndex || i === lastIndex
    )
    const collapsedIndices = [...pastIndices, ...currentIndices, ...collapsedFutureIndices]
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => a - b)

    // Expanded: past(2) + current + all future
    const expandedIndices = [...pastIndices, ...currentIndices, ...futureIndices]
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => a - b)

    return {
      collapsed: collapsedIndices.map((i) => stages[i]),
      expanded: expandedIndices.map((i) => stages[i]),
    }
  }, [])

  const collapsedStages = visibleStages.collapsed
  const collapsedStagesMobile = visibleStages.collapsed

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
              <p className="text-2xl sm:text-4xl font-bold text-brand-gold mb-4">
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
                <p className="text-sm text-white/60">
                  隨著更多資訊釋出，每週日說明會後午夜調漲價格
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Value Stack - 完整價值拆解 */}
        <div className="mb-10 sm:mb-12">
          <div className="text-center mb-6 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-teal mb-3 text-balance">
              {'最大的成本，從來不是學費'}
            </h3>
            <p className="text-sm sm:text-base text-brand-text/80 leading-relaxed mb-1.5">
              市場上已有許多垂直深度陪跑、單向觀看的線上課程，但卻找不太到這麼完整的初期探索資源。
            </p>
            <p className="text-sm sm:text-base text-brand-text/80 leading-relaxed">
              獨自找資源、累積這些能力與啟發，除了錢，花更多的是試錯成本與一去不復返的時間。
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-brand-mist overflow-hidden">
            {/* Desktop: table */}
            <table className="w-full hidden md:table">
              <thead>
                <tr className="bg-brand-gold/20 border-b border-brand-mist">
                  <th className="text-left px-6 py-3 text-sm font-bold text-brand-teal w-40">項目</th>
                  <th className="text-left px-6 py-3 text-sm font-bold text-brand-teal">說明</th>
                  <th className="text-right px-6 py-3 text-sm font-bold text-brand-teal w-40">價值</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-brand-mist/50">
                  <td className="px-6 py-4 text-sm font-semibold text-brand-teal">正式課程</td>
                  <td className="px-6 py-4 text-sm text-brand-text leading-relaxed">四階段課綱、12 堂專家正課、課後作業、含實戰範例模板</td>
                  <td className="px-6 py-4 text-sm font-semibold text-brand-teal text-right whitespace-nowrap">NT$ 24,000</td>
                </tr>
                <tr className="bg-brand-offwhite/60 border-b border-brand-mist/50">
                  <td className="px-6 py-4 text-sm font-semibold text-brand-teal">成長節奏</td>
                  <td className="px-6 py-4 text-sm text-brand-text leading-relaxed">共 10 堂，包涵每月底同學交流發表會、復盤課、導師團體 QA、彈性課程、共創專案機會、工作坊許願池</td>
                  <td className="px-6 py-4 text-sm font-semibold text-brand-teal text-right whitespace-nowrap">NT$ 12,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-brand-teal">終身校友資格</td>
                  <td className="px-6 py-4 text-sm text-brand-text leading-relaxed">最新世界遊牧資訊、Line 校友群、LinkedIn 校友連結、生態系活動折扣 ... 等持續累積之資源</td>
                  <td className="px-6 py-4 text-sm font-semibold text-brand-teal text-right whitespace-nowrap">
                    NT$ 6,000
                    <span className="block text-xs font-normal text-brand-text/60 mt-0.5">(持續漲價)</span>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Mobile: stacked cards */}
            <div className="md:hidden divide-y divide-brand-mist/50">
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-brand-teal">正式課程</span>
                  <span className="text-sm font-semibold text-brand-teal whitespace-nowrap">NT$ 24,000</span>
                </div>
                <p className="text-xs text-brand-text/80 leading-relaxed">四階段課綱、12 堂專家正課、課後作業、含實戰範例模板</p>
              </div>
              <div className="p-4 bg-brand-offwhite/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-brand-teal">成長節奏</span>
                  <span className="text-sm font-semibold text-brand-teal whitespace-nowrap">NT$ 12,000</span>
                </div>
                <p className="text-xs text-brand-text/80 leading-relaxed">共 10 堂，包涵每月底同學交流發表會、復盤課、導師團體 QA、彈性課程、共創專案機會、工作坊許願池</p>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-brand-teal">終身校友資格</span>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-brand-teal whitespace-nowrap">NT$ 6,000</div>
                    <div className="text-[10px] text-brand-text/60">(持續漲價)</div>
                  </div>
                </div>
                <p className="text-xs text-brand-text/80 leading-relaxed">最新世界遊牧資訊、Line 校友群、LinkedIn 校友連結、生態系活動折扣 ... 等持續累積之資源</p>
              </div>
            </div>

            {/* Funnel - 三層遞減 */}
            <div className="bg-gradient-to-br from-brand-teal to-[#0f3d44] p-5 sm:p-7">
              {/* 第一層：自己累積成本 */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/15">
                <div>
                  <p className="text-sm sm:text-base text-white/85">{'自己一項一項累積'}</p>
                  <p className="text-[11px] sm:text-xs text-white/50 mt-0.5">市價合計（還不包括你找資源、統整的時間）</p>
                </div>
                <span className="text-lg sm:text-xl font-semibold text-white/85 line-through decoration-white/40">
                  NT$ 42,000
                </span>
              </div>

              {/* 第二層：學院打包價 */}
              <div className="flex items-center justify-between gap-3 py-3 border-b border-white/15">
                <div>
                  <p className="text-sm sm:text-base text-white">{'整套打包進學院'}</p>
                  <p className="text-[11px] sm:text-xs text-brand-gold mt-0.5">
                    {'先幫你省 NT$ 15,500'}
                  </p>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white">
                  NT$ {formatPrice(currentStageData.prices.dualLine.original)}
                </span>
              </div>

              {/* 第三層：現在卡位 */}
              <div className="flex items-end justify-between gap-3 pt-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base text-brand-gold font-bold mb-0.5">
                    {'現在卡位 '}
                    <span className="text-white/95">{currentStageData.name}</span>
                  </p>
                  <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed">
                    {currentStageData.discountLabel}
                    {'｜再省 NT$ '}{formatPrice(currentStageData.prices.dualLine.savingAmount)}
                    {'，倒數結束自動漲價'}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 flex items-baseline gap-1">
                  <span className="text-sm sm:text-base font-semibold text-brand-gold/90">NT$</span>
                  <span className="text-3xl sm:text-4xl font-bold text-brand-gold leading-none">
                    {formatPrice(currentStageData.prices.dualLine.stagePrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
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
                  <div className="text-base text-brand-text/70 line-through decoration-brand-clay decoration-2 mb-1">
                    原價 NT$ {formatPrice(currentStageData.prices.selfMedia.original)}
                  </div>
                  <div className="text-3xl font-bold text-brand-teal mb-1">
                    NT$ {formatPrice(currentStageData.prices.selfMedia.stagePrice)}
                  </div>
                  <div className="text-sm text-brand-gold font-medium mb-4">
                    目前 {currentStageData.discountLabel}，現省 NT$ {formatPrice(currentStageData.prices.selfMedia.savingAmount)}，每週日說明會後午夜調漲
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
                  <div className="text-base text-brand-text/70 line-through decoration-brand-clay decoration-2 mb-1">
                    原價 NT$ {formatPrice(currentStageData.prices.dualLine.original)}
                  </div>
                  <div className="text-3xl font-bold text-brand-gold mb-1">
                    NT$ {formatPrice(currentStageData.prices.dualLine.stagePrice)}
                  </div>
                  <div className="text-sm text-brand-gold font-medium mb-4">
                    目前 {currentStageData.discountLabel}，現省 NT$ {formatPrice(currentStageData.prices.dualLine.savingAmount)}，每週日說明會後午夜調漲
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
                  <div className="text-base text-brand-text/70 line-through decoration-brand-clay decoration-2 mb-1">
                    原價 NT$ {formatPrice(currentStageData.prices.remoteJob.original)}
                  </div>
                  <div className="text-3xl font-bold text-brand-teal mb-1">
                    NT$ {formatPrice(currentStageData.prices.remoteJob.stagePrice)}
                  </div>
                  <div className="text-sm text-brand-gold font-medium mb-4">
                    目前 {currentStageData.discountLabel}，現省 NT$ {formatPrice(currentStageData.prices.remoteJob.savingAmount)}，每週日說明會後午夜調漲
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
          <p className="text-brand-text text-sm leading-relaxed">
            <span className="font-semibold text-brand-teal">重要說明：</span>學院方案以「課程＋社群＋校友資格」為主；多數線下活動／工作坊／旅程為選配加購，校友皆享有專屬折扣。
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
                                  {isCurrent && <span className="block text-xs">(目前)</span>}
                                  {isNext && <span className="block text-xs">(下一階段)</span>}
                                </div>
                                <div className="flex gap-1 justify-center mt-1">
                                  <span
                                    className={`text-xs px-1.5 py-0.5 rounded ${isPast ? "bg-gray-200 text-gray-400" : "bg-brand-teal/10 text-brand-teal"}`}
                                  >
                                    單 {stage.prices.remoteJob.stagePrice.toLocaleString()}
                                  </span>
                                  <span
                                    className={`text-xs px-1.5 py-0.5 rounded ${isPast ? "bg-gray-200 text-gray-400" : "bg-brand-gold/20 text-[#A06E56]"}`}
                                  >
                                    雙 {stage.prices.dualLine.stagePrice.toLocaleString()}
                                  </span>
                                </div>
                                <div className={`text-xs mt-1 ${isPast ? "text-gray-400" : "text-brand-text"}`}>
                                  {stage.discountLabel}
                                </div>
                                <div className={`text-xs ${isPast ? "text-gray-400" : "text-brand-text/70"}`}>
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
