"use client"

import { useState } from "react"
import { X, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
import { calendarData, type CalendarWeek } from "@/data/calendar"

interface CourseDetailModalProps {
  isOpen: boolean
  onClose: () => void
}

type TabType = "接案路線" | "遠端上班" | "共同必修/選修"

export function CourseDetailModal({ isOpen, onClose }: CourseDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("遠端上班")

  // 篩選課程資料
  const getCoursesForTab = (tab: TabType): CalendarWeek[] => {
    switch (tab) {
      case "接案路線":
        return calendarData.filter((week) => week.track === "接案線")
      case "遠端上班":
        return calendarData.filter((week) => week.track === "遠端上班線")
      case "共同必修/選修":
        return calendarData.filter(
          (week) =>
            week.track === "全體共同" &&
            (week.type.includes("共同必修") || week.type.includes("選修") || week.title.includes("可持續的自由") || week.title.includes("AI") || week.title.includes("自媒體") || week.title.includes("旅居財務"))
        )
      default:
        return []
    }
  }

  const courses = getCoursesForTab(activeTab)

  // 從 focusDetail 解析出行動任務
  const parseActionTasks = (focusDetail: string) => {
    const lines = focusDetail.split("\n")
    const tasks: { basic?: string; advanced?: string; general?: string } = {}
    
    let currentSection = ""
    for (const line of lines) {
      if (line.includes("基礎任務")) {
        currentSection = "basic"
      } else if (line.includes("進階任務")) {
        currentSection = "advanced"
      } else if (line.includes("行動任務")) {
        currentSection = "general"
      } else if (line.startsWith("•") && currentSection) {
        const content = line.replace("•", "").trim()
        if (currentSection === "basic") {
          tasks.basic = (tasks.basic ? tasks.basic + "\n" : "") + content
        } else if (currentSection === "advanced") {
          tasks.advanced = (tasks.advanced ? tasks.advanced + "\n" : "") + content
        } else if (currentSection === "general") {
          tasks.general = (tasks.general ? tasks.general + "\n" : "") + content
        }
      }
    }
    return tasks
  }

  // 從 focusDetail 解析出核心內容
  const parseCoreContent = (focusDetail: string) => {
    const lines = focusDetail.split("\n")
    const coreLines: string[] = []
    let inCoreSection = false
    
    for (const line of lines) {
      if (line.includes("核心內容")) {
        inCoreSection = true
        continue
      }
      if (line.includes("行動任務") || line.includes("基礎任務") || line.includes("進階任務")) {
        inCoreSection = false
      }
      if (inCoreSection && line.startsWith("•")) {
        coreLines.push(line.replace("•", "").trim())
      }
    }
    return coreLines
  }

  // 從月週取得月份
  const getMonth = (monthWeek: string) => {
    const match = monthWeek.match(/(\d+)\s*月/)
    return match ? `${match[1]}月` : ""
  }

  // 判斷是否為必修
  const isRequired = (week: CalendarWeek) => {
    return week.type.includes("必修")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
          <DialogHeader className="p-6 pb-4 border-b border-brand-mist/30 flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-brand-teal flex items-center gap-2">
                <span className="text-2xl">📚</span> 各路線課程詳情
              </DialogTitle>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-brand-mist/30 hover:bg-brand-mist/50 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-brand-text/70" />
              </button>
            </div>

            {/* Tab 切換 */}
            <div className="flex mt-4 bg-brand-offwhite rounded-lg p-1">
              {(["接案路線", "遠端上班", "共同必修/選修"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-white text-brand-teal shadow-sm"
                      : "text-brand-text/60 hover:text-brand-text"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </DialogHeader>

          {/* 課程列表 */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {courses.length === 0 ? (
              <div className="text-center py-12 text-brand-text/60">
                此分類暫無課程資料
              </div>
            ) : (
              courses.map((course) => {
                const month = getMonth(course.monthWeek)
                const coreContent = parseCoreContent(course.focusDetail)
                const tasks = parseActionTasks(course.focusDetail)
                const instructorName = course.instructorNames[0] || "講師確認中"

                return (
                  <div
                    key={course.id}
                    className="bg-brand-offwhite/50 rounded-xl border border-brand-mist/30 overflow-hidden"
                  >
                    {/* 課程 Header */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-brand-gold font-medium">{month}</span>
                          {activeTab === "共同必修/選修" && (
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium ${
                                isRequired(course)
                                  ? "bg-brand-teal/10 text-brand-teal"
                                  : "bg-brand-gold/10 text-brand-gold"
                              }`}
                            >
                              {isRequired(course) ? "必修" : "選修"}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-brand-text/70 text-sm">
                          <User className="w-4 h-4" />
                          <span>{instructorName}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-brand-teal mb-2">{course.title}</h3>
                      
                      {/* 核心內容 */}
                      {coreContent.length > 0 && (
                        <div className="text-brand-text/80 text-sm leading-relaxed mb-4">
                          {coreContent.map((line, i) => (
                            <p key={i} className="mb-1">• {line}</p>
                          ))}
                        </div>
                      )}

                      {/* 行動任務 */}
                      <div className="bg-brand-gold/5 rounded-lg p-4 border border-brand-gold/20">
                        {tasks.general && (
                          <div className="flex items-start gap-2">
                            <span className="text-brand-gold">📝</span>
                            <div>
                              <span className="font-semibold text-brand-gold text-sm">行動任務：</span>
                              <span className="text-brand-text/80 text-sm ml-1">{tasks.general}</span>
                            </div>
                          </div>
                        )}
                        {tasks.basic && (
                          <div className="flex items-start gap-2 mb-2">
                            <span className="text-brand-teal">📝</span>
                            <div>
                              <span className="font-semibold text-brand-teal text-sm">基礎任務：</span>
                              <span className="text-brand-text/80 text-sm ml-1">{tasks.basic}</span>
                            </div>
                          </div>
                        )}
                        {tasks.advanced && (
                          <div className="flex items-start gap-2">
                            <span className="text-brand-clay">🚀</span>
                            <div>
                              <span className="font-semibold text-brand-clay text-sm">進階任務：</span>
                              <span className="text-brand-text/80 text-sm ml-1">{tasks.advanced}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
