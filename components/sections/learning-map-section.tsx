"use client"

import { useState, useRef } from "react"
import { ChevronUp, ChevronDown, X, Play, ChevronRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import {
  calendarData,
  getPhaseColor,
  fourPhases,
  remoteJobPhaseContent,
  freelancePhaseContent,
  undecidedTabContent,
  getInstructorsByNames,
} from "@/data/calendar"

interface LearningMapSectionProps {
  onOpenWeekDetail?: (week: number) => void
}

export function LearningMapSection({ onOpenWeekDetail }: LearningMapSectionProps) {
  const [activeMapTab, setActiveMapTab] = useState("遠端上班")
  const [showCalendarInline, setShowCalendarInline] = useState(false)
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(["階段一 起步打底"]))
  const calendarSectionRef = useRef<HTMLDivElement>(null)

  const phaseGroups = [
    {
      phase: "階段一 藍圖與目標",
      phaseKey: "藍圖與目標",
      months: ["5 月"],
      weeks: [1, 2, 3, 4],
      description: "先知道你要往哪裡走",
    },
    {
      phase: "階段二 定位與門面",
      phaseKey: "定位與門面",
      months: ["6 月"],
      weeks: [5, 6, 7, 8],
      description: "把你整理成別人看得懂的樣子",
    },
    {
      phase: "階段三 接觸機會與轉化",
      phaseKey: "接觸機會與轉化",
      months: ["7 月"],
      weeks: [9, 10, 11, 12, 13],
      description: "開始讓曝光、投遞與合作變成機會",
    },
    {
      phase: "階段四 永續",
      phaseKey: "永續",
      months: ["8 月", "9 月"],
      weeks: [14, 15, 16, 17, 18, 19, 20, 21, 22],
      description: "把一次嘗試走成長期節奏",
    },
  ]

  const togglePhase = (phaseName: string) => {
    setExpandedPhases((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(phaseName)) {
        newSet.delete(phaseName)
      } else {
        newSet.add(phaseName)
      }
      return newSet
    })
  }

  return (
    <section id="learning-map" className="py-16 sm:py-20 bg-brand-offwhite">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-teal mb-2 text-balance">學習地圖</h2>
          <p className="text-base sm:text-lg text-brand-gold font-medium mb-6">五月開學，每週三晚間八點準時上線。</p>
          <p className="text-brand-text max-w-2xl mx-auto leading-relaxed text-sm sm:text-base font-medium">
            這不是一堆零散課程，而是一套 5 個月、4 階段的行動節奏。
          </p>
          <p className="text-brand-text/60 max-w-2xl mx-auto leading-relaxed text-xs sm:text-sm mt-2">
            兩條路各有主線課，也會共用通用能力模組，例如 AI、自媒體、人生使用說明SOP、財務。
          </p>
        </div>

        {/* Tabs 前導文字 */}
        <p className="text-center text-brand-text/70 text-sm mb-4">先選一條你現在最想嘗試的路線：</p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {["遠端上班", "接案", "我還不確定"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMapTab(tab)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 border-2 ${
                activeMapTab === tab
                  ? "bg-brand-teal text-white border-brand-teal"
                  : "bg-white text-brand-teal border-brand-teal/30 hover:border-brand-teal"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content: 遠端上班 */}
        {activeMapTab === "遠端上班" && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-brand-teal mb-2">
                遠端上班：從看懂機會，到更有機會被錄用，也更有能力走得長久
              </h3>
            </div>

            {/* Desktop: 四張卡片 grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
              {remoteJobPhaseContent.map((content, index) => {
                const phase = fourPhases[index]
                return (
                  <div key={index} className={`bg-white rounded-xl p-5 shadow-sm border-2 ${phase.color.border}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`w-6 h-6 rounded-full ${phase.color.solid} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-xs text-brand-text/50">{phase.months}</span>
                      <span className={`text-xs font-semibold ${phase.color.text}`}>{phase.name}</span>
                    </div>
                    <h4 className="font-bold text-brand-teal text-sm mb-2 leading-snug">{content.headline}</h4>
                    <p className="text-xs text-brand-text/70 mb-3 leading-relaxed">{content.description}</p>

                    <div className="mb-3">
                      <p className="text-[10px] font-semibold text-brand-teal mb-1.5">你會得到：</p>
                      <ul className="space-y-1">
                        {content.outcomes.map((outcome, i) => (
                          <li key={i} className="text-[10px] text-brand-text/80 flex items-start gap-1.5">
                            <span className="text-brand-gold mt-0.5">•</span>
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-brand-mist/50">
                      <p className="text-[10px] font-semibold text-brand-text/60 mb-1">對應重點：</p>
                      <p className="text-[10px] text-brand-teal leading-relaxed">{content.courses.join("、")}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Mobile: Accordion 折疊式 */}
            <div className="md:hidden space-y-3">
              {remoteJobPhaseContent.map((content, index) => {
                const phase = fourPhases[index]
                const isFirst = index === 0
                return (
                  <details
                    key={index}
                    className={`group bg-white rounded-xl border-2 ${phase.color.border} overflow-hidden`}
                    open={isFirst}
                  >
                    <summary className="p-4 cursor-pointer hover:bg-brand-offwhite/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full ${phase.color.solid} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}
                        >
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-brand-text/50">{phase.months}</span>
                            <span className={`text-xs font-semibold ${phase.color.text}`}>{phase.name}</span>
                          </div>
                          <p className="text-sm font-bold text-brand-teal truncate">{content.headline}</p>
                        </div>
                        <div className="flex items-center gap-1 text-brand-text/50 flex-shrink-0">
                          <span className="text-xs group-open:hidden">展開</span>
                          <span className="text-xs hidden group-open:inline">收合</span>
                          <svg
                            className="w-4 h-4 transition-transform group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </summary>
                    <div className="px-4 pb-4 pt-2 border-t border-brand-mist/30">
                      <p className="text-sm text-brand-text/70 mb-3 leading-relaxed">{content.description}</p>

                      <div className="mb-3">
                        <p className="text-xs font-semibold text-brand-teal mb-2">你會得到：</p>
                        <ul className="space-y-1.5">
                          {content.outcomes.map((outcome, i) => (
                            <li key={i} className="text-xs text-brand-text/80 flex items-start gap-2">
                              <span className="text-brand-gold mt-0.5">•</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-brand-mist/50">
                        <p className="text-xs font-semibold text-brand-text/60 mb-1">對應重點：</p>
                        <p className="text-xs text-brand-teal leading-relaxed">{content.courses.join("、")}</p>
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          </div>
        )}

        {/* Tab Content: 接案 */}
        {activeMapTab === "接案" && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-brand-teal mb-2">
                接案：從想靠自己變現，到做出能持續合作的內容與服務
              </h3>
            </div>

            {/* Desktop: 四張卡片 grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
              {freelancePhaseContent.map((content, index) => {
                const phase = fourPhases[index]
                return (
                  <div key={index} className={`bg-white rounded-xl p-5 shadow-sm border-2 ${phase.color.border}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`w-6 h-6 rounded-full ${phase.color.solid} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-xs text-brand-text/50">{phase.months}</span>
                      <span className={`text-xs font-semibold ${phase.color.text}`}>{phase.name}</span>
                    </div>
                    <h4 className="font-bold text-brand-teal text-sm mb-2 leading-snug">{content.headline}</h4>
                    <p className="text-xs text-brand-text/70 mb-3 leading-relaxed">{content.description}</p>

                    <div className="mb-3">
                      <p className="text-[10px] font-semibold text-brand-teal mb-1.5">你會得到：</p>
                      <ul className="space-y-1">
                        {content.outcomes.map((outcome, i) => (
                          <li key={i} className="text-[10px] text-brand-text/80 flex items-start gap-1.5">
                            <span className="text-brand-gold mt-0.5">•</span>
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-brand-mist/50">
                      <p className="text-[10px] font-semibold text-brand-text/60 mb-1">對應重點：</p>
                      <p className="text-[10px] text-brand-teal leading-relaxed">{content.courses.join("、")}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Mobile: Accordion 折疊式 */}
            <div className="md:hidden space-y-3">
              {freelancePhaseContent.map((content, index) => {
                const phase = fourPhases[index]
                const isFirst = index === 0
                return (
                  <details
                    key={index}
                    className={`group bg-white rounded-xl border-2 ${phase.color.border} overflow-hidden`}
                    open={isFirst}
                  >
                    <summary className="p-4 cursor-pointer hover:bg-brand-offwhite/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full ${phase.color.solid} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}
                        >
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-brand-text/50">{phase.months}</span>
                            <span className={`text-xs font-semibold ${phase.color.text}`}>{phase.name}</span>
                          </div>
                          <p className="text-sm font-bold text-brand-teal truncate">{content.headline}</p>
                        </div>
                        <div className="flex items-center gap-1 text-brand-text/50 flex-shrink-0">
                          <span className="text-xs group-open:hidden">展開</span>
                          <span className="text-xs hidden group-open:inline">收合</span>
                          <svg
                            className="w-4 h-4 transition-transform group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </summary>
                    <div className="px-4 pb-4 pt-2 border-t border-brand-mist/30">
                      <p className="text-sm text-brand-text/70 mb-3 leading-relaxed">{content.description}</p>

                      <div className="mb-3">
                        <p className="text-xs font-semibold text-brand-teal mb-2">你會得到：</p>
                        <ul className="space-y-1.5">
                          {content.outcomes.map((outcome, i) => (
                            <li key={i} className="text-xs text-brand-text/80 flex items-start gap-2">
                              <span className="text-brand-gold mt-0.5">•</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-brand-mist/50">
                        <p className="text-xs font-semibold text-brand-text/60 mb-1">對應重點：</p>
                        <p className="text-xs text-brand-teal leading-relaxed">{content.courses.join("、")}</p>
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          </div>
        )}

        {/* Tab Content: 我還不確定 */}
        {activeMapTab === "我還不確定" && (
          <div className="animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-brand-teal mb-2">{undecidedTabContent.headline}</h3>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="text-brand-text text-sm leading-relaxed mb-6">
                <p className="whitespace-pre-line">{undecidedTabContent.intro}</p>
              </div>

              <div className="bg-brand-offwhite rounded-xl p-5 mb-6">
                <h4 className="font-bold text-brand-teal mb-3">{undecidedTabContent.flexibility.headline}</h4>
                <ul className="space-y-2">
                  {undecidedTabContent.flexibility.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-brand-text">
                      <svg className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-brand-teal mb-3">{undecidedTabContent.trialInfo.headline}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative bg-gradient-to-br from-brand-teal to-[#1a5561] rounded-xl p-4 text-white">
                    <div className="absolute top-2 right-2 bg-brand-gold text-brand-teal text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Week 2
                    </div>
                    <p className="font-semibold text-sm">{undecidedTabContent.trialInfo.week2}</p>
                  </div>
                  <div className="relative bg-gradient-to-br from-brand-teal to-[#1a5561] rounded-xl p-4 text-white">
                    <div className="absolute top-2 right-2 bg-brand-gold text-brand-teal text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Week 3
                    </div>
                    <p className="font-semibold text-sm">{undecidedTabContent.trialInfo.week3}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-mist">
                <p className="text-center text-brand-teal font-medium">{undecidedTabContent.closing}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div id="learning-map-cta" className="text-center mt-10">
          <button
            onClick={() => {
              setShowCalendarInline(!showCalendarInline)
              setTimeout(() => {
                document.getElementById("learning-map-cta")?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }, 300)
            }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              showCalendarInline
                ? "bg-brand-offwhite text-brand-teal border border-brand-mist hover:bg-brand-mist"
                : "bg-brand-teal text-white hover:bg-[#1a5561]"
            }`}
          >
            {showCalendarInline ? (
              <>
                <ChevronUp className="w-4 h-4" />
                收合行事曆
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                展開學習行事曆＆課程講師
              </>
            )}
          </button>
          {!showCalendarInline && <p className="text-sm text-brand-text/60 mt-2">看看每週三晚間八點，具體在做什麼</p>}
        </div>

        {showCalendarInline && (
          <div ref={calendarSectionRef} className="mt-8 animate-in slide-in-from-top-4 fade-in duration-500">
            {/* Timeline Content - Grouped by Phase */}
            <div className="space-y-4">
              {phaseGroups.map((group) => {
                const phaseWeeks = calendarData.filter((week) => week.phase === group.phaseKey)
                const isPhaseExpanded = expandedPhases.has(group.phase)
                const phaseColor = getPhaseColor(group.phaseKey)

                return (
                  <div key={group.phase} className="bg-white rounded-xl border border-brand-mist overflow-hidden">
                    {/* Phase Header */}
                    <button
                      onClick={() => togglePhase(group.phase)}
                      className={`w-full flex items-center justify-between p-4 hover:bg-brand-offwhite/50 transition-colors ${phaseColor.lightBg}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${phaseColor.bg} flex items-center justify-center`}>
                          <span className="text-white text-sm font-bold">
                            {group.phase.includes("一") ? "1" : group.phase.includes("二") ? "2" : group.phase.includes("三") ? "3" : "4"}
                          </span>
                        </div>
                        <div className="text-left">
                          <h4 className={`font-bold ${phaseColor.text}`}>{group.phase}</h4>
                          <p className="text-xs text-brand-text/60">
                            {group.months.join("、")} · {group.description}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-brand-text/50 transition-transform ${isPhaseExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Phase Weeks */}
                    {isPhaseExpanded && (
                      <div className="border-t border-brand-mist/50">
                        {phaseWeeks.map((week) => {
                          const instructors = getInstructorsByNames(week.instructor)
                          return (
                            <div
                              key={week.week}
                              className="p-4 border-b border-brand-mist/30 last:border-b-0 hover:bg-brand-offwhite/30 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`w-6 h-6 rounded-full ${phaseColor.bg} flex items-center justify-center flex-shrink-0`}
                                >
                                  <span className="text-white text-xs font-bold">{week.week}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs text-brand-text/50">{week.date}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${phaseColor.lightBg} ${phaseColor.text}`}>
                                      {week.track}
                                    </span>
                                  </div>
                                  <h5 className="font-semibold text-brand-teal text-sm">{week.title}</h5>
                                  {week.subtitle && <p className="text-xs text-brand-text/60 mt-1">{week.subtitle}</p>}
                                  {instructors.length > 0 && (
                                    <div className="flex items-center gap-2 mt-2">
                                      <div className="flex -space-x-2">
                                        {instructors.slice(0, 3).map((instructor, idx) => (
                                          <div
                                            key={idx}
                                            className="w-6 h-6 rounded-full border-2 border-white overflow-hidden"
                                          >
                                            <Image
                                              src={instructor.image || "/placeholder.svg"}
                                              alt={instructor.name}
                                              width={24}
                                              height={24}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                        ))}
                                      </div>
                                      <span className="text-xs text-brand-text/70">
                                        {instructors.map((i) => i.name).join("、")}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                {onOpenWeekDetail && (
                                  <button
                                    onClick={() => onOpenWeekDetail(week.week)}
                                    className="text-brand-gold hover:text-brand-teal transition-colors"
                                  >
                                    <ChevronRight className="w-5 h-5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
