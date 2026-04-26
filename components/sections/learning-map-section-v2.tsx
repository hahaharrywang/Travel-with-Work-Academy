"use client"

import { useState } from "react"
import { Calendar, ExternalLink, LayoutGrid } from "lucide-react"
import { fourPhases, undecidedTabContent } from "@/data/calendar"

interface LearningMapSectionV2Props {
  onOpenCourseDetail: () => void
  onOpenWeeklySchedule: () => void
}

export function LearningMapSectionV2({ onOpenCourseDetail, onOpenWeeklySchedule }: LearningMapSectionV2Props) {
  const [activeTab, setActiveTab] = useState<"remote" | "freelance" | "undecided">("remote")

  // 路線標語與副標
  const routeContent = {
    remote: {
      tagline: "從看懂機會，到更有機會被錄用，也更有能力走得長久",
      subtitle: "看懂遠端求職市場、整理履歷與 LinkedIn、練習求職信、面試與獵頭溝通",
    },
    freelance: {
      tagline: "從想靠自己變現，到做出能持續合作的內容與服務",
      subtitle: "釐清主題定位、做出接案作品集、建立市場研究、社群獲客策略與變現思維",
    },
  }

  // 路線必修課程表格資料
  const routeCourseData = {
    remote: [
      {
        phase: "5月",
        course: "遠端上班職涯藍圖＆目標設定",
        description: "先看懂這條路長什麼樣。釐清想要的工作型態、適合的職缺方向，以及接下來要集中火力的目標。",
      },
      {
        phase: "6月",
        course: "LinkedIn 經營全攻略",
        description: "把價值變成「更容易被看懂」。重新整理經歷、優勢與故事，放進 LinkedIn 與對外呈現。",
      },
      {
        phase: "7月",
        course: "履歷、求職信秘笈、面試談薪",
        description: "真正開始出擊。從履歷、求職信到面試談薪，把「我想投」變成「我真的可以去爭取」。",
      },
      {
        phase: "8-9月",
        course: "留任策略＆溝通",
        description: "從思維、協作到長期職涯策略，這堂課一次帶你建立並規劃能持續成長的遠距職涯路徑。",
      },
    ],
    freelance: [
      {
        phase: "5月",
        course: "接案變現地圖＆目標設定",
        description: "先不要急著發內容或開服務。先看懂接案與變現的幾種可能，找到適合自己的起跑方式。",
      },
      {
        phase: "6月",
        course: "定位、方案定價 Offer",
        description: "讓你的價值開始有形。整理定位、服務與方案，讓別人看得懂你可以幫他解決什麼問題。",
      },
      {
        phase: "7月",
        course: "社群獲客漏斗＆內容策略",
        description: "開始對外被看見。進入內容策略與社群獲客，讓曝光變成機會、讓機會靠近成交。",
      },
      {
        phase: "8-9月",
        course: "接案的永續與合作",
        description: "接到案不代表能長久，能合作下去才會真的穩。思考合作關係、交付節奏與長期累積。",
      },
    ],
  }

  // 共同必修課程
  const commonRequired = [
    "可持續的自由：身心靈平衡的遠距人生 SOP",
    "讓 AI 成為你的實習生：從對話到自動化的第一個流程",
    "自媒體變現藍圖",
    "旅居財務課程",
  ]

  // 成長節奏
  const growthRhythm = [
    "開學典禮 & 遠距遊牧概論",
    "每月交流 / 成果發表",
    "每月講師團體 QA",
    "每月同學會",
    "校長 AMA",
    "學習復盤 & 目標調整",
    "共創專案大會議",
    "一對一同儕互助",
    "全體期末成果發表會",
    "結業典禮",
  ]

  return (
    <section id="learning-map" className="py-16 sm:py-20 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - 融入舊版核心敘事 */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-teal mb-2 text-balance">
            學習地圖
          </h2>
          <p className="text-base sm:text-lg text-brand-clay font-medium mb-4">
            五月開學，每週三晚間八點準時上線。
          </p>
          <p className="text-brand-text max-w-2xl mx-auto leading-relaxed text-sm sm:text-base font-medium">
            這不是一堆零散課程，而是一套 5 個月、4 階段的行動節奏。
          </p>
          <p className="text-brand-text/80 max-w-2xl mx-auto leading-relaxed text-xs sm:text-sm mt-2">
            兩條路各有主線課，也會共用通用能力模組，例如 AI、自媒體、人生使用說明SOP、財務。
          </p>
        </div>

        {/* 四階段時間軸卡片 - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 mb-12">
          {fourPhases.map((phase, index) => {
            // 階段漸變色：從淺到深，象徵成長
            const phaseColors = [
              "bg-[#3d8b8b]", // 5月 - 較淺
              "bg-[#357878]", // 6月
              "bg-[#2d6565]", // 7月
              "bg-[#255454]", // 8-9月 - 最深
            ]
            return (
              <div key={phase.id} className="relative group">
                <div className={`${phaseColors[index]} text-white rounded-xl p-5 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <h3 className="text-xl font-bold mb-2">
                    <span className="text-brand-gold font-medium">{phase.months}</span>{" "}
                    {phase.name}
                  </h3>
                  <p className="text-sm text-white/85">{phase.shortTagline}</p>
                </div>
                {/* 箭頭連接（除了最後一個） */}
                {index < 3 && (
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-10 hidden lg:block">
                    <span className="text-brand-gold/60 text-xl">&#10095;</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* 四階段時間軸卡片 - Mobile (垂直排列) */}
        <div className="flex flex-col gap-3 mb-8 lg:hidden">
          {fourPhases.map((phase, index) => {
            const phaseColors = [
              "bg-[#3d8b8b]",
              "bg-[#357878]",
              "bg-[#2d6565]",
              "bg-[#255454]",
            ]
            return (
              <div key={phase.id} className={`${phaseColors[index]} text-white rounded-xl p-4 shadow-md`}>
                <h3 className="text-base font-bold mb-1">
                  <span className="text-brand-gold font-medium">{phase.months}</span>{" "}
                  {phase.name}
                </h3>
                <p className="text-sm text-white/85">{phase.shortTagline}</p>
              </div>
            )
          })}
        </div>

        {/* Tab 引導文案 */}
        <p className="text-center text-brand-text/80 text-sm mb-4">先選一條你現在最想嘗試的路線：</p>

        {/* Tab 切換 */}
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

        {/* Tab Content: 遠端上班 / 接案 */}
        {(activeTab === "remote" || activeTab === "freelance") && (
          <div className="animate-in fade-in duration-300">
            {/* 路線標語與副標 */}
            <div className="text-center mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-brand-teal mb-2">
                {activeTab === "remote" ? "遠端上班" : "接案"}：{routeContent[activeTab].tagline}
              </h3>
              <p className="text-brand-text/80 text-sm sm:text-base max-w-2xl mx-auto">
                {routeContent[activeTab].subtitle}
              </p>
            </div>

            {/* 路線必修課程表格 - Desktop */}
            <div className="hidden md:block bg-white rounded-xl border border-brand-mist overflow-hidden mb-8">
              {/* 表頭 */}
              <div className="grid grid-cols-[80px_1fr_1.5fr] bg-brand-teal text-white">
                <div className="p-4 font-semibold text-sm">階段</div>
                <div className="p-4 font-semibold text-sm">
                  {activeTab === "remote" ? "遠端上班路線必修" : "接案路線必修"}
                </div>
                <div className="p-4 font-semibold text-sm">課程簡介</div>
              </div>
              {/* 表格內容 */}
              {routeCourseData[activeTab].map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-[80px_1fr_1.5fr] ${index % 2 === 0 ? "bg-white" : "bg-brand-offwhite/50"}`}
                >
                  <div className="p-4 font-medium text-brand-gold text-sm">{row.phase}</div>
                  <div className="p-4 text-brand-teal font-medium text-sm">{row.course}</div>
                  <div className="p-4 text-brand-text text-sm leading-relaxed">{row.description}</div>
                </div>
              ))}
            </div>

            {/* 路線必修課程表格 - Mobile (卡片式) */}
            <div className="md:hidden space-y-4 mb-8">
              {routeCourseData[activeTab].map((row, index) => (
                <div key={index} className="bg-white rounded-xl border border-brand-mist p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-brand-gold font-medium text-sm">{row.phase}</span>
                  </div>
                  <h4 className="text-brand-teal font-medium mb-2">{row.course}</h4>
                  <p className="text-brand-text text-sm leading-relaxed">{row.description}</p>
                </div>
              ))}
            </div>

            {/* 共同必修與成長節奏 - 兩張卡片 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* 共同必修卡片 */}
              <div className="bg-white rounded-xl border border-brand-mist p-6">
                <h4 className="text-lg font-bold text-brand-teal mb-3">共同必修</h4>
                <p className="text-brand-text/80 text-sm mb-4 leading-relaxed">
                  無論選擇哪條路線，這些正課都是你的必修學分——幫你建立可持續的生活節奏、掌握 AI 工具、學會知識變現，以及做好財務規劃。
                </p>
                <ul className="space-y-2">
                  {commonRequired.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-text text-sm">
                      <span className="text-brand-gold mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 成長節奏卡片 */}
              <div className="bg-white rounded-xl border border-brand-mist p-6">
                <h4 className="text-lg font-bold text-brand-teal mb-3">成長節奏</h4>
                <p className="text-brand-text/80 text-sm mb-4 leading-relaxed">
                  除了正課，我們也設計了一套貫穿 5 個月的成長節奏，讓你不只是上課，而是真的有推進、有產出、有交流。
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {growthRhythm.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-text text-sm">
                      <span className="text-brand-gold mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
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
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://link.travelwithwork.life/tww2calendar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-brand-mist rounded-full text-brand-text hover:bg-brand-mist/20 transition-colors text-sm"
              >
                <Calendar className="w-4 h-4" />
                課表行事曆 Google Sheet 版
                <ExternalLink className="w-3 h-3" />
              </a>
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
