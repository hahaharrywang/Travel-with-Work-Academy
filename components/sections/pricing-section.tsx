"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { usePricing, formatPrice, stages } from "@/contexts/pricing-context"

export function PricingSection() {
  const { currentStageData, timeLeft, selectedPlanId, setSelectedPlanId, getCheckoutURLWithTracking } = usePricing()
  const [timelineExpanded, setTimelineExpanded] = useState(false)
  const [showAllStagesMobile, setShowAllStagesMobile] = useState(false)

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

        {/* Timeline Section */}
        <div className="mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-[#17464F] text-center mb-8">價格階段時間軸</h3>

          {/* Desktop: 橫向時間軸，預設顯示 6 個，可展開全部 */}
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
                                ? "bg-[#D4B483] border-[#D4B483] ring-4 ring-[#D4B483]/20"
                                : isPast
                                  ? "bg-gray-300 border-gray-300"
                                  : "bg-white border-[#17464F]"
                            }`}
                          />
                          <div className="mt-2 text-center">
                            <div
                              className={`text-xs font-medium ${isCurrent ? "text-[#D4B483]" : isPast ? "text-gray-400" : "text-[#17464F]"}`}
                            >
                              {stage.name}
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
                  },
                )}
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

          {/* Mobile: 垂直卡片，預設顯示 4 個 */}
          <div className="md:hidden space-y-3">
            {(showAllStagesMobile ? stages : stages.slice(0, 4)).map((stage) => {
              const now = new Date()
              const isPast = now > stage.endAt
              const isCurrent = now >= stage.startAt && now <= stage.endAt

              return (
                <div
                  key={stage.id}
                  className={`p-4 rounded-xl border ${
                    isCurrent
                      ? "border-[#D4B483] bg-[#D4B483]/10"
                      : isPast
                        ? "border-gray-200 bg-gray-50"
                        : "border-[#17464F]/20 bg-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div
                        className={`font-medium ${isCurrent ? "text-[#D4B483]" : isPast ? "text-gray-400" : "text-[#17464F]"}`}
                      >
                        {stage.name}
                        {isCurrent && <span className="ml-2 text-xs">(目前)</span>}
                      </div>
                      <div className={`text-sm ${isPast ? "text-gray-400" : "text-[#33393C]/70"}`}>
                        {stage.discountLabel} · ~{stage.endAt.getMonth() + 1}/{stage.endAt.getDate()}
                      </div>
                    </div>
                    <div className={`text-right ${isPast ? "text-gray-400" : "text-[#17464F]"}`}>
                      <div className="text-sm font-bold">NT$ {formatPrice(stage.prices.selfMedia.stagePrice)}</div>
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

          {/* 當前階段摘要卡 */}
          {currentStageData && (
            <div className="mt-8 bg-gradient-to-br from-[#17464F] to-[#1a5561] rounded-2xl p-6 sm:p-8 text-white text-center">
              <div className="inline-flex items-center gap-2 bg-[#D4B483] text-[#17464F] px-4 py-1 rounded-full text-sm font-medium mb-4">
                <span>🔥</span>
                <span>目前階段</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold mb-2">{currentStageData.name}</h4>
              <p className="text-white/80 mb-4">
                截止：{currentStageData.endAt.getMonth() + 1}/{currentStageData.endAt.getDate()}
              </p>
              <p className="text-[#D4B483] font-medium">
                距離下一階段：{timeLeft.days} 天 {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
              </p>
              <p className="text-sm text-white/60 mt-4">請在下方選擇適合你的方案</p>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* 自媒體接案線路 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-[#17464F] mb-2">自媒體接案線路</h4>
              <p className="text-sm text-[#33393C]/70">適合想要經營個人品牌、接案或創作者</p>
            </div>
            <ul className="space-y-3 mb-6 flex-1 text-sm text-[#33393C]">
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>自媒體 Module 完整課程</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>通識課程（Direction + General）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>Skool 共學社群 6 個月</span>
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

          {/* 雙線並進（推薦） */}
          <div className="bg-white rounded-2xl border-2 border-[#D4B483] p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col relative">
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
                <span>自媒體 + 遠端工作 雙 Module 完整課程</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>通識課程（Direction + General）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>Skool 共學社群 6 個月</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>選修實作工作坊（剪輯、AI、自動化、工作英文等）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>雙線整合專屬資源與案例</span>
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
          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="mb-6">
              <h4 className="text-xl font-bold text-[#17464F] mb-2">遠端上班線路</h4>
              <p className="text-sm text-[#33393C]/70">想找到一份遠端工作、時間地點自由的你</p>
            </div>
            <ul className="space-y-3 mb-6 flex-1 text-sm text-[#33393C]">
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>遠端工作 Module 完整課程</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>通識課程（Direction + General）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4B483] mt-0.5">●</span>
                <span>Skool 共學社群 6 個月</span>
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

        {/* All Plans Include */}
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
