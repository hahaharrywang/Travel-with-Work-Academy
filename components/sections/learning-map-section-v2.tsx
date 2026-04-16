"use client"

import { useState } from "react"
import { Calendar, ExternalLink, BookOpen, LayoutGrid } from "lucide-react"
import { fourPhases, freelancePhaseContent, remoteJobPhaseContent, undecidedTabContent } from "@/data/calendar"

interface LearningMapSectionV2Props {
  onOpenCourseDetail: () => void
  onOpenWeeklySchedule: () => void
}

export function LearningMapSectionV2({ onOpenCourseDetail, onOpenWeeklySchedule }: LearningMapSectionV2Props) {
  const [activeTab, setActiveTab] = useState<"remote" | "freelance" | "undecided">("remote")

  // 對比表格資料
  const comparisonData = [
    {
      phase: "5月 | 藍圖目標",
      freelance: "接案變現藍圖",
      remote: "遠距職位地圖",
    },
    {
      phase: "6月 | 定位門面",
      freelance: "定位、產品服務方案",
      remote: "LinkedIn、履歷",
    },
    {
      phase: "7月 | 拓渠轉化",
      freelance: "社群獲客漏斗、成交策略",
      remote: "投遞、求職信",
    },
    {
      phase: "8-9月 | 永續經營",
      freelance: "顧客關係 + 案例資產化",
      remote: "面試談薪 & 留任",
    },
  ]

  return (
    <section id="learning-map-v2" className="py-16 sm:py-20 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-teal mb-3 flex items-center justify-center gap-2">
            <span className="text-2xl">&#9757;</span> 課程概覽
          </h2>
          <p className="text-brand-text text-base sm:text-lg max-w-2xl mx-auto">
            兩條主線共用同一套四階段成長架構，每堂正課皆包含實作行動任務
          </p>
        </div>

        {/* 四階段時間軸卡片 - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 mb-12">
          {fourPhases.map((phase, index) => (
            <div key={phase.id} className="relative">
              <div className="bg-brand-teal text-white rounded-xl p-5 h-full">
                <div className="text-sm opacity-80 mb-1">
                  {index + 1} {phase.months}
                </div>
                <h3 className="text-xl font-bold mb-2">{phase.name}</h3>
                <p className="text-sm opacity-90">{phase.shortTagline}</p>
              </div>
              {/* 箭頭連接（除了最後一個） */}
              {index < 3 && (
                <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-brand-teal z-10 hidden lg:block">
                  <span className="text-2xl">→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 四階段時間軸卡片 - Mobile (2x2 grid) */}
        <div className="grid grid-cols-2 gap-3 mb-8 lg:hidden">
          {fourPhases.map((phase, index) => (
            <div key={phase.id} className="bg-brand-teal text-white rounded-xl p-4">
              <div className="text-xs opacity-80 mb-1">
                {index + 1} {phase.months}
              </div>
              <h3 className="text-base font-bold mb-1">{phase.name}</h3>
              <p className="text-xs opacity-90 line-clamp-2">{phase.shortTagline}</p>
            </div>
          ))}
        </div>

        {/* 路線說明卡片 - Desktop only */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 mb-8">
          {/* 接案路線 */}
          <div className="bg-white border-2 border-brand-mist rounded-xl p-6">
            <h3 className="text-lg font-bold text-brand-teal mb-2 flex items-center gap-2">
              <span>&#128736;</span> 接案路線
            </h3>
            <p className="text-brand-text text-sm leading-relaxed">
              釐清主題定位、做出接案作品集、建立市場研究、社群獲客策略與變現思維
            </p>
          </div>
          {/* 遠端上班路線 */}
          <div className="bg-white border-2 border-brand-mist rounded-xl p-6">
            <h3 className="text-lg font-bold text-brand-teal mb-2 flex items-center gap-2">
              <span>&#128188;</span> 遠端上班路線
            </h3>
            <p className="text-brand-text text-sm leading-relaxed">
              看懂遠端求職市場、整理履歷與 LinkedIn、練習求職信、面試與獵頭溝通
            </p>
          </div>
        </div>

        {/* CTA 按鈕區 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={onOpenCourseDetail}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-full font-medium hover:bg-brand-teal/90 transition-colors"
          >
            <LayoutGrid className="w-5 h-5" />
            查看各路線課程詳情
          </button>
          <button
            onClick={onOpenWeeklySchedule}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-full font-medium hover:bg-brand-teal/90 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            查看完整週次表（22 週）
          </button>
        </div>

        {/* 外部連結 */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="https://link.travelwithwork.life/tww2calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-brand-mist rounded-full text-brand-text hover:bg-brand-mist/20 transition-colors text-sm"
          >
            <Calendar className="w-4 h-4" />
            課表行事曆
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Tab 切換 - 桌機與手機共用 */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 border border-brand-mist">
            <button
              onClick={() => setActiveTab("remote")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === "remote"
                  ? "bg-brand-teal text-white"
                  : "text-brand-text hover:bg-brand-mist/30"
              }`}
            >
              遠端上班
            </button>
            <button
              onClick={() => setActiveTab("freelance")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === "freelance"
                  ? "bg-brand-teal text-white"
                  : "text-brand-text hover:bg-brand-mist/30"
              }`}
            >
              接案
            </button>
            <button
              onClick={() => setActiveTab("undecided")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === "undecided"
                  ? "bg-brand-teal text-white"
                  : "text-brand-text hover:bg-brand-mist/30"
              }`}
            >
              我還不確定
            </button>
          </div>
        </div>

        {/* Tab Content: 對比表格 (遠端上班/接案) */}
        {(activeTab === "remote" || activeTab === "freelance") && (
          <div className="animate-in fade-in duration-300">
            {/* 對比表格 - Desktop */}
            <div className="hidden md:block bg-white rounded-xl border border-brand-mist overflow-hidden">
              {/* 表頭 */}
              <div className="grid grid-cols-3 bg-brand-teal text-white">
                <div className="p-4 font-semibold">階段</div>
                <div className="p-4 font-semibold">接案路線</div>
                <div className="p-4 font-semibold">遠端上班路線</div>
              </div>
              {/* 表格內容 */}
              {comparisonData.map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 ${index % 2 === 0 ? "bg-white" : "bg-brand-offwhite/50"}`}
                >
                  <div className="p-4 font-medium text-brand-teal">{row.phase}</div>
                  <div className="p-4 text-brand-text">{row.freelance}</div>
                  <div className="p-4 text-brand-text">{row.remote}</div>
                </div>
              ))}
            </div>

            {/* 對比表格 - Mobile (卡片式) */}
            <div className="md:hidden space-y-4">
              {comparisonData.map((row, index) => (
                <div key={index} className="bg-white rounded-xl border border-brand-mist p-4">
                  <div className="font-medium text-brand-teal mb-3">{row.phase}</div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-xs text-brand-text/60 block mb-1">接案路線</span>
                      <span className="text-brand-text">{row.freelance}</span>
                    </div>
                    <div>
                      <span className="text-xs text-brand-text/60 block mb-1">遠端上班</span>
                      <span className="text-brand-text">{row.remote}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: 我還不確定 */}
        {activeTab === "undecided" && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-white rounded-xl border border-brand-mist p-6 sm:p-8 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-brand-teal mb-4">{undecidedTabContent.headline}</h3>
              <div className="text-brand-text whitespace-pre-line mb-6 leading-relaxed">
                {undecidedTabContent.intro}
              </div>

              <div className="bg-brand-offwhite rounded-lg p-5 mb-6">
                <h4 className="font-semibold text-brand-teal mb-3">{undecidedTabContent.flexibility.headline}</h4>
                <ul className="space-y-2">
                  {undecidedTabContent.flexibility.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-text text-sm">
                      <span className="text-brand-gold mt-0.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-gold/10 rounded-lg p-5 mb-6">
                <h4 className="font-semibold text-brand-teal mb-3">{undecidedTabContent.trialInfo.headline}</h4>
                <div className="space-y-2 text-sm text-brand-text">
                  <p><strong>Week 2：</strong>{undecidedTabContent.trialInfo.week2}</p>
                  <p><strong>Week 3：</strong>{undecidedTabContent.trialInfo.week3}</p>
                </div>
              </div>

              <p className="text-brand-text whitespace-pre-line leading-relaxed text-sm">
                {undecidedTabContent.closing}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
