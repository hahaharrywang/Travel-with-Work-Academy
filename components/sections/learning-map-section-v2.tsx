"use client"

import { useState } from "react"
import { ChevronRight, CalendarDays, FileText } from "lucide-react"
import {
  fourPhases,
  remoteJobPhaseContent,
  freelancePhaseContent,
  undecidedTabContent,
} from "@/data/calendar"

interface LearningMapSectionV2Props {
  onOpenCourseDetail: () => void
  onOpenWeeklySchedule: () => void
}

export function LearningMapSectionV2({
  onOpenCourseDetail,
  onOpenWeeklySchedule,
}: LearningMapSectionV2Props) {
  const [activeTab, setActiveTab] = useState<"遠端上班" | "接案" | "我還不確定">("遠端上班")

  // 對比表格資料
  const comparisonData = [
    { phase: "5月｜藍圖目標", freelance: "接案變現藍圖", remote: "遠距職位地圖" },
    { phase: "6月｜定位門面", freelance: "定位、產品服務方案", remote: "LinkedIn、履歷" },
    { phase: "7月｜拓渠轉化", freelance: "社群獲客漏斗、成交策略", remote: "投遞、求職信" },
    { phase: "8-9月｜永續經營", freelance: "顧客關係＋案例資產化", remote: "面試談薪 & 留任" },
  ]

  return (
    <section id="learning-map-v2" className="py-16 md:py-24 bg-brand-offwhite">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 標題 */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-teal mb-4">
            課程概覽
          </h2>
          <p className="text-brand-text/80 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            兩條主線共用同一套四階段成長架構，每堂正課皆包含實作行動任務
          </p>
        </div>

        {/* 四階段卡片 - 桌機版橫向排列 */}
        <div className="hidden lg:flex items-center justify-center gap-2 mb-12">
          {fourPhases.map((phase, index) => (
            <div key={phase.id} className="flex items-center">
              <div className={`${phase.color.solid} text-white rounded-lg p-4 min-w-[180px] text-center`}>
                <div className="flex items-center justify-center gap-1 text-white/80 text-sm mb-1">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{phase.months}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{phase.name}</h3>
                <p className="text-white/80 text-xs">{phase.shortTagline}</p>
              </div>
              {index < fourPhases.length - 1 && (
                <ChevronRight className="w-6 h-6 text-brand-teal/40 mx-1 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* 四階段卡片 - 手機版 2x2 網格 */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mb-8">
          {fourPhases.map((phase, index) => (
            <div
              key={phase.id}
              className={`${phase.color.solid} text-white rounded-lg p-3 text-center`}
            >
              <div className="flex items-center justify-center gap-1 text-white/80 text-xs mb-1">
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                  {index + 1}
                </span>
                <span>{phase.months}</span>
              </div>
              <h3 className="font-bold text-sm mb-0.5">{phase.name}</h3>
              <p className="text-white/80 text-[10px] leading-tight">{phase.shortTagline}</p>
            </div>
          ))}
        </div>

        {/* Tab 切換 */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-brand-mist/30">
            {(["遠端上班", "接案", "我還不確定"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-brand-teal text-white shadow-sm"
                    : "text-brand-text/70 hover:text-brand-teal"
                }`}
              >
                {tab === "遠端上班" ? "遠端上班" : tab === "接案" ? "接案" : "我還不確定"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 內容 */}
        <div className="bg-white rounded-2xl shadow-sm border border-brand-mist/30 p-6 md:p-8">
          {activeTab === "遠端上班" && (
            <RemoteJobContent comparisonData={comparisonData} />
          )}
          {activeTab === "接案" && (
            <FreelanceContent comparisonData={comparisonData} />
          )}
          {activeTab === "我還不確定" && <UndecidedContent />}
        </div>

        {/* CTA 按鈕 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={onOpenCourseDetail}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-lg font-medium hover:bg-brand-teal/90 transition-colors shadow-sm"
          >
            <FileText className="w-5 h-5" />
            查看各路線課程詳情
          </button>
          <button
            onClick={onOpenWeeklySchedule}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-lg font-medium hover:bg-brand-teal/90 transition-colors shadow-sm"
          >
            <CalendarDays className="w-5 h-5" />
            查看完整週次表（22 週）
          </button>
        </div>

        {/* 外部連結 */}
        <div className="flex justify-center mt-4">
          <a
            href="https://link.travelwithwork.life/tww2calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-brand-teal hover:text-brand-teal/80 text-sm font-medium transition-colors"
          >
            <CalendarDays className="w-4 h-4" />
            課表行事曆
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// 遠端上班內容
function RemoteJobContent({ comparisonData }: { comparisonData: typeof comparisonData }) {
  return (
    <div>
      {/* 路線說明 */}
      <div className="mb-8 p-4 bg-brand-teal/5 rounded-xl border border-brand-teal/20">
        <h3 className="font-bold text-brand-teal mb-2 flex items-center gap-2">
          <span className="text-lg">💼</span> 遠端上班路線
        </h3>
        <p className="text-brand-text/80 text-sm leading-relaxed">
          看懂遠端求職市場、整理履歷與 LinkedIn、練習求職信、面試與獵頭溝通
        </p>
      </div>

      {/* 對比表格 - 桌機版 */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-brand-mist/30">
        <table className="w-full">
          <thead>
            <tr className="bg-brand-teal text-white">
              <th className="text-left py-3 px-4 font-semibold">階段</th>
              <th className="text-left py-3 px-4 font-semibold">接案路線</th>
              <th className="text-left py-3 px-4 font-semibold">遠端上班路線</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-brand-offwhite/50"}>
                <td className="py-4 px-4 text-brand-teal font-medium">{row.phase}</td>
                <td className="py-4 px-4 text-brand-text/70">{row.freelance}</td>
                <td className="py-4 px-4 text-brand-text font-medium">{row.remote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 對比表格 - 手機版卡片 */}
      <div className="md:hidden space-y-3">
        {comparisonData.map((row, index) => (
          <div key={index} className="bg-brand-offwhite/50 rounded-lg p-4">
            <div className="text-brand-teal font-medium text-sm mb-2">{row.phase}</div>
            <div className="text-brand-text font-medium">{row.remote}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 接案內容
function FreelanceContent({ comparisonData }: { comparisonData: typeof comparisonData }) {
  return (
    <div>
      {/* 路線說明 */}
      <div className="mb-8 p-4 bg-brand-gold/10 rounded-xl border border-brand-gold/30">
        <h3 className="font-bold text-brand-gold mb-2 flex items-center gap-2">
          <span className="text-lg">🛠</span> 接案路線
        </h3>
        <p className="text-brand-text/80 text-sm leading-relaxed">
          釐清主題定位、做出接案作品集、建立市場研究、社群獲客策略與變現思維
        </p>
      </div>

      {/* 對比表格 - 桌機版 */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-brand-mist/30">
        <table className="w-full">
          <thead>
            <tr className="bg-brand-teal text-white">
              <th className="text-left py-3 px-4 font-semibold">階段</th>
              <th className="text-left py-3 px-4 font-semibold">接案路線</th>
              <th className="text-left py-3 px-4 font-semibold">遠端上班路線</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-brand-offwhite/50"}>
                <td className="py-4 px-4 text-brand-teal font-medium">{row.phase}</td>
                <td className="py-4 px-4 text-brand-text font-medium">{row.freelance}</td>
                <td className="py-4 px-4 text-brand-text/70">{row.remote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 對比表格 - 手機版卡片 */}
      <div className="md:hidden space-y-3">
        {comparisonData.map((row, index) => (
          <div key={index} className="bg-brand-offwhite/50 rounded-lg p-4">
            <div className="text-brand-teal font-medium text-sm mb-2">{row.phase}</div>
            <div className="text-brand-text font-medium">{row.freelance}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 我還不確定內容
function UndecidedContent() {
  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-xl md:text-2xl font-bold text-brand-teal mb-6 text-center">
        {undecidedTabContent.headline}
      </h3>

      <div className="prose prose-sm md:prose-base text-brand-text/80 mb-8">
        <p className="whitespace-pre-line leading-relaxed">{undecidedTabContent.intro}</p>
      </div>

      <div className="bg-brand-teal/5 rounded-xl p-6 mb-8 border border-brand-teal/20">
        <h4 className="font-bold text-brand-teal mb-4">{undecidedTabContent.flexibility.headline}</h4>
        <ul className="space-y-3">
          {undecidedTabContent.flexibility.points.map((point, index) => (
            <li key={index} className="flex items-start gap-3 text-brand-text/80">
              <span className="w-5 h-5 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                {index + 1}
              </span>
              <span className="text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-brand-gold/10 rounded-xl p-6 mb-8 border border-brand-gold/30">
        <h4 className="font-bold text-brand-gold mb-4">{undecidedTabContent.trialInfo.headline}</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-brand-gold/20 text-brand-gold rounded text-xs font-medium">Week 2</span>
            <span className="text-brand-text/80">{undecidedTabContent.trialInfo.week2}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-brand-teal/20 text-brand-teal rounded text-xs font-medium">Week 3</span>
            <span className="text-brand-text/80">{undecidedTabContent.trialInfo.week3}</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-brand-text/80 text-sm leading-relaxed whitespace-pre-line">
          {undecidedTabContent.closing}
        </p>
      </div>
    </div>
  )
}

// 為了型別檢查
const comparisonData = [
  { phase: "5月｜藍圖目標", freelance: "接案變現藍圖", remote: "遠距職位地圖" },
  { phase: "6月｜定位門面", freelance: "定位、產品服務方案", remote: "LinkedIn、履歷" },
  { phase: "7月｜拓渠轉化", freelance: "社群獲客漏斗、成交策略", remote: "投遞、求職信" },
  { phase: "8-9月｜永續經營", freelance: "顧客關係＋案例資產化", remote: "面試談薪 & 留任" },
]
