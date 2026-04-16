"use client"

import { useState } from "react"
import Image from "next/image"
import { CalendarDays, ChevronDown, ExternalLink, BookOpen, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
import {
  fourPhases,
  remoteJobPhaseContent,
  freelancePhaseContent,
  undecidedTabContent,
  calendarData,
  getPhaseColor,
  getTrackColor,
  getInstructorsByNames,
} from "@/data/calendar"

// 對比表格資料
const comparisonData = [
  { phase: "5月｜藍圖目標", freelance: "接案變現藍圖", remote: "遠距職位地圖" },
  { phase: "6月｜定位門面", freelance: "定位、產品服務方案", remote: "LinkedIn、履歷" },
  { phase: "7月｜拓渠轉化", freelance: "社群獲客漏斗、成交策略", remote: "投遞、求職信" },
  { phase: "8-9月｜永續經營", freelance: "顧客關係 + 案例資產化", remote: "面試談薪 & 留任" },
]

// 兩條路線說明
const trackDescriptions = {
  freelance: {
    title: "接案路線",
    icon: "🔧",
    description: "釐清主題定位、做出接案作品集、建立市場研究、社群獲客策略與變現思維",
  },
  remote: {
    title: "遠端上班路線",
    icon: "💼",
    description: "看懂遠端求職市場、整理履歷與 LinkedIn、練習求職信、面試與獵頭溝通",
  },
}

export function LearningMapSection() {
  const [activeMapTab, setActiveMapTab] = useState<string>("遠端上班")
  const [courseDetailModalOpen, setCourseDetailModalOpen] = useState(false)
  const [weeklyScheduleModalOpen, setWeeklyScheduleModalOpen] = useState(false)
  const [courseDetailTab, setCourseDetailTab] = useState<"接案路線" | "遠端上班" | "共同必修/選修">("遠端上班")

  // 從 calendarData 篩選各路線課程
  const freelanceCourses = calendarData.filter((week) => week.track === "接案線")
  const remoteCourses = calendarData.filter((week) => week.track === "遠端上班線")
  const coreCourses = calendarData.filter((week) => week.track === "全體共同")

  // 按階段分組週次表
  const phaseGroups = [
    { phase: "階段一：藍圖與目標（5 月）", phaseKey: "藍圖與目標" },
    { phase: "階段二：定位與門面（6 月）", phaseKey: "定位與門面" },
    { phase: "階段三：機會與轉化（7 月）", phaseKey: "機會與轉化" },
    { phase: "階段四：永續（8-9 月）", phaseKey: "永續" },
  ]

  return (
    <section id="learning-map" className="py-16 sm:py-20 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-teal mb-2 text-balance">
            課程概覽
          </h2>
          <p className="text-brand-text max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            兩條主線共用同一套四階段成長架構，每堂正課皆包含實作行動任務
          </p>
        </div>

        {/* 四階段卡片 - 桌機橫向 / 手機 2x2 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {fourPhases.map((phase, index) => (
            <div
              key={phase.id}
              className={`relative bg-brand-teal text-white rounded-xl p-4 sm:p-5 text-center ${
                index < 3 ? "lg:after:content-['→'] lg:after:absolute lg:after:right-[-14px] lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:text-brand-teal lg:after:text-xl lg:after:font-bold lg:after:z-10" : ""
              }`}
            >
              <div className="text-xs sm:text-sm opacity-80 mb-1">
                {index + 1} {phase.months}
              </div>
              <div className="text-base sm:text-lg font-bold mb-1">{phase.name}</div>
              <div className="text-xs opacity-70 leading-relaxed hidden sm:block">
                {phase.shortTagline}
              </div>
            </div>
          ))}
        </div>

        {/* 對比表格 - 桌機 */}
        <div className="hidden lg:block mb-10">
          <div className="bg-white rounded-xl border border-brand-mist overflow-hidden">
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
        </div>

        {/* 兩條路線說明卡片 - 桌機 */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-brand-mist">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{trackDescriptions.freelance.icon}</span>
              <h4 className="font-bold text-brand-teal">{trackDescriptions.freelance.title}</h4>
            </div>
            <p className="text-sm text-brand-text leading-relaxed">{trackDescriptions.freelance.description}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-brand-mist">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{trackDescriptions.remote.icon}</span>
              <h4 className="font-bold text-brand-teal">{trackDescriptions.remote.title}</h4>
            </div>
            <p className="text-sm text-brand-text leading-relaxed">{trackDescriptions.remote.description}</p>
          </div>
        </div>

        {/* Tabs 前導文字 - 手機版 */}
        <p className="lg:hidden text-center text-brand-text/80 text-sm mb-4">先選一條你現在最想嘗試的路線：</p>

        {/* Tabs - 手機版 */}
        <div className="lg:hidden flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
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

        {/* 手機版 Tab 內容：遠端上班 */}
        {activeMapTab === "遠端上班" && (
          <div className="lg:hidden animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-brand-teal mb-2">
                {trackDescriptions.remote.icon} {trackDescriptions.remote.title}
              </h3>
              <p className="text-sm text-brand-text">{trackDescriptions.remote.description}</p>
            </div>
            <div className="space-y-3">
              {remoteJobPhaseContent.map((content, index) => {
                const phase = fourPhases[index]
                return (
                  <details key={index} className={`group bg-white rounded-xl border-2 ${phase.color.border} overflow-hidden`}>
                    <summary className="p-4 cursor-pointer hover:bg-brand-offwhite/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full ${phase.color.solid} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-sm ${phase.color.text}`}>{phase.months}</span>
                            <span className={`text-sm font-semibold ${phase.color.text}`}>{phase.name}</span>
                          </div>
                          <p className="text-sm font-bold text-brand-teal truncate">{content.headline}</p>
                        </div>
                        <div className="flex items-center gap-1 text-brand-text/80 flex-shrink-0">
                          <span className="text-sm group-open:hidden">展開</span>
                          <span className="text-sm hidden group-open:inline">收合</span>
                          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                        </div>
                      </div>
                    </summary>
                    <div className="px-4 pb-4 pt-2 border-t border-brand-mist/30">
                      <p className="text-sm text-brand-text/80 mb-3 leading-relaxed">{content.description}</p>
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-brand-teal mb-2">你會得到：</p>
                        <ul className="space-y-1.5">
                          {content.outcomes.map((outcome, i) => (
                            <li key={i} className="text-sm text-brand-text/80 flex items-start gap-2">
                              <span className="text-brand-gold mt-0.5">•</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-3 border-t border-brand-mist/50">
                        <p className="text-sm font-semibold text-brand-text/80 mb-1">對應重點：</p>
                        <p className="text-sm text-brand-teal leading-relaxed">{content.courses.join("、")}</p>
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          </div>
        )}

        {/* 手機版 Tab 內容：接案 */}
        {activeMapTab === "接案" && (
          <div className="lg:hidden animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-brand-teal mb-2">
                {trackDescriptions.freelance.icon} {trackDescriptions.freelance.title}
              </h3>
              <p className="text-sm text-brand-text">{trackDescriptions.freelance.description}</p>
            </div>
            <div className="space-y-3">
              {freelancePhaseContent.map((content, index) => {
                const phase = fourPhases[index]
                return (
                  <details key={index} className={`group bg-white rounded-xl border-2 ${phase.color.border} overflow-hidden`}>
                    <summary className="p-4 cursor-pointer hover:bg-brand-offwhite/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full ${phase.color.solid} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-sm ${phase.color.text}`}>{phase.months}</span>
                            <span className={`text-sm font-semibold ${phase.color.text}`}>{phase.name}</span>
                          </div>
                          <p className="text-sm font-bold text-brand-teal truncate">{content.headline}</p>
                        </div>
                        <div className="flex items-center gap-1 text-brand-text/80 flex-shrink-0">
                          <span className="text-sm group-open:hidden">展開</span>
                          <span className="text-sm hidden group-open:inline">收合</span>
                          <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                        </div>
                      </div>
                    </summary>
                    <div className="px-4 pb-4 pt-2 border-t border-brand-mist/30">
                      <p className="text-sm text-brand-text/80 mb-3 leading-relaxed">{content.description}</p>
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-brand-teal mb-2">你會得到：</p>
                        <ul className="space-y-1.5">
                          {content.outcomes.map((outcome, i) => (
                            <li key={i} className="text-sm text-brand-text/80 flex items-start gap-2">
                              <span className="text-brand-gold mt-0.5">•</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-3 border-t border-brand-mist/50">
                        <p className="text-sm font-semibold text-brand-text/80 mb-1">對應重點：</p>
                        <p className="text-sm text-brand-teal leading-relaxed">{content.courses.join("、")}</p>
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          </div>
        )}

        {/* 手機版 Tab 內容：我還不確定 */}
        {activeMapTab === "我還不確定" && (
          <div className="lg:hidden animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-brand-teal mb-2">{undecidedTabContent.headline}</h3>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="text-brand-text text-sm leading-relaxed mb-6">
                <p className="whitespace-pre-line">{undecidedTabContent.intro}</p>
              </div>
              <div className="bg-brand-offwhite rounded-xl p-5 mb-6">
                <h4 className="font-bold text-brand-teal mb-3">{undecidedTabContent.flexibility.headline}</h4>
                <ul className="space-y-2">
                  {undecidedTabContent.flexibility.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-brand-text">
                      <svg className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
                <p className="text-center text-brand-teal font-medium text-sm">{undecidedTabContent.closing}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA 按鈕區 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-10">
          <button
            onClick={() => setCourseDetailModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-brand-teal text-white hover:bg-brand-teal/90 transition-all duration-300 shadow-md"
          >
            <BookOpen className="w-5 h-5" />
            查看各路線課程詳情
          </button>
          <button
            onClick={() => setWeeklyScheduleModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-brand-teal text-white hover:bg-brand-teal/90 transition-all duration-300 shadow-md"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-brand-teal border-2 border-brand-teal/30 hover:border-brand-teal hover:bg-brand-teal/5 transition-all duration-300"
          >
            <CalendarDays className="w-4 h-4" />
            課表行事曆
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 課程詳情 Modal */}
        <Dialog open={courseDetailModalOpen} onOpenChange={setCourseDetailModalOpen}>
          <DialogPortal>
            <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-brand-offwhite p-0">
              <DialogHeader className="sticky top-0 bg-brand-offwhite z-10 p-6 pb-4 border-b border-brand-mist">
                <DialogTitle className="text-xl font-bold text-brand-teal flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  各路線課程詳情
                </DialogTitle>
              </DialogHeader>

              {/* Tab 切換 */}
              <div className="sticky top-[76px] bg-brand-offwhite z-10 px-6 py-3 border-b border-brand-mist">
                <div className="flex justify-center">
                  <div className="inline-flex bg-white rounded-full p-1 border border-brand-mist">
                    {(["接案路線", "遠端上班", "共同必修/選修"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setCourseDetailTab(tab)}
                        className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          courseDetailTab === tab
                            ? "bg-brand-teal text-white shadow-sm"
                            : "text-brand-text/80 hover:text-brand-teal"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal 內容 */}
              <div className="p-6 space-y-4">
                {courseDetailTab === "接案路線" && (
                  <div className="space-y-4">
                    {freelanceCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                )}
                {courseDetailTab === "遠端上班" && (
                  <div className="space-y-4">
                    {remoteCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                )}
                {courseDetailTab === "共同必修/選修" && (
                  <div className="space-y-4">
                    {coreCourses.map((course) => (
                      <CourseCard key={course.id} course={course} isCore />
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>

        {/* 完整週次表 Modal */}
        <Dialog open={weeklyScheduleModalOpen} onOpenChange={setWeeklyScheduleModalOpen}>
          <DialogPortal>
            <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-brand-offwhite p-0">
              <DialogHeader className="sticky top-0 bg-brand-offwhite z-10 p-6 pb-4 border-b border-brand-mist">
                <DialogTitle className="text-xl font-bold text-brand-teal flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  四階段完整週次表
                </DialogTitle>
              </DialogHeader>

              <div className="p-6 space-y-8">
                {phaseGroups.map((group) => {
                  const phaseWeeks = calendarData.filter((week) => week.phase === group.phaseKey)
                  const phaseColor = getPhaseColor(group.phaseKey)
                  
                  return (
                    <div key={group.phase}>
                      <h3 className={`text-lg font-bold mb-4 ${phaseColor.text}`}>{group.phase}</h3>
                      <div className="bg-white rounded-xl border border-brand-mist overflow-hidden">
                        {/* 表頭 */}
                        <div className="hidden sm:grid sm:grid-cols-4 bg-brand-teal text-white text-sm">
                          <div className="p-3 font-semibold">週次</div>
                          <div className="p-3 font-semibold">課程</div>
                          <div className="p-3 font-semibold">路線</div>
                          <div className="p-3 font-semibold">講師</div>
                        </div>
                        {/* 表格內容 */}
                        {phaseWeeks.map((week, idx) => {
                          const trackColor = getTrackColor(week.track)
                          return (
                            <div
                              key={week.id}
                              className={`sm:grid sm:grid-cols-4 p-3 sm:p-0 ${idx % 2 === 0 ? "bg-white" : "bg-brand-offwhite/50"} border-t border-brand-mist/50 first:border-t-0`}
                            >
                              <div className="sm:p-3 font-medium text-brand-teal text-sm mb-1 sm:mb-0">
                                <span className="sm:hidden text-brand-text/60">週次：</span>
                                Week {week.id}
                              </div>
                              <div className="sm:p-3 text-brand-text text-sm mb-1 sm:mb-0">{week.title}</div>
                              <div className="sm:p-3 mb-1 sm:mb-0">
                                <span className={`inline-block px-2 py-0.5 text-xs rounded ${trackColor.bg} ${trackColor.text}`}>
                                  {week.track}
                                </span>
                              </div>
                              <div className="sm:p-3 text-brand-text text-sm">
                                {week.instructorNames.join("、")}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </section>
  )
}

// 課程卡片元件
function CourseCard({ course, isCore = false }: { course: typeof calendarData[0]; isCore?: boolean }) {
  const instructors = getInstructorsByNames(course.instructorNames)
  const phaseColor = getPhaseColor(course.phase)
  
  // 解析 focusDetail
  const sections = course.focusDetail.split("\n\n")
  const coreContent = sections.find((s) => s.startsWith("核心內容"))?.replace("核心內容\n", "") || ""
  const actionTask = sections.find((s) => s.startsWith("行動任務") || s.startsWith("基礎任務"))?.replace(/^(行動任務|基礎任務)\n/, "") || ""
  const advancedTask = sections.find((s) => s.startsWith("進階任務"))?.replace("進階任務\n", "") || ""

  // 從月份週次取得月份
  const month = course.monthWeek.split(" · ")[0]

  return (
    <div className="bg-white rounded-xl border border-brand-mist p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-medium ${phaseColor.text}`}>{month}</span>
            {isCore && (
              <span className="px-2 py-0.5 text-xs rounded bg-brand-gold/20 text-brand-clay font-medium">
                {course.track === "全體共同" ? "必修" : "選修"}
              </span>
            )}
          </div>
          <h4 className="text-base font-bold text-brand-teal">{course.title}</h4>
        </div>
        <div className="flex items-center gap-2 text-sm text-brand-text/80">
          {instructors[0] && (
            <>
              <Image
                src={instructors[0].image || "/placeholder.svg"}
                alt={instructors[0].name}
                width={28}
                height={28}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span>{instructors[0].name}</span>
            </>
          )}
        </div>
      </div>

      {/* 課程說明 */}
      <p className="text-sm text-brand-text/80 mb-4 leading-relaxed">{course.focusShort}</p>

      {/* 核心內容 */}
      {coreContent && (
        <div className="text-sm text-brand-text/80 mb-4 leading-relaxed whitespace-pre-line">
          {coreContent}
        </div>
      )}

      {/* 行動任務 */}
      {(actionTask || advancedTask) && (
        <div className="bg-brand-offwhite rounded-lg p-4 space-y-2">
          {actionTask && (
            <div className="flex items-start gap-2 text-sm">
              <span className="text-brand-gold">📝</span>
              <div>
                <span className="font-semibold text-brand-teal">行動任務：</span>
                <span className="text-brand-text/80">{actionTask}</span>
              </div>
            </div>
          )}
          {advancedTask && (
            <div className="flex items-start gap-2 text-sm">
              <span className="text-brand-gold">🚀</span>
              <div>
                <span className="font-semibold text-brand-teal">進階任務：</span>
                <span className="text-brand-text/80">{advancedTask}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
