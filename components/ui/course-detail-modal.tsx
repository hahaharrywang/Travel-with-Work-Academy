"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog"
import { calendarData, getInstructorsByNames, type CalendarWeek } from "@/data/calendar"

interface CourseDetailModalProps {
  isOpen: boolean
  onClose: () => void
}

// 從 calendarData 提取各路線課程
const getFreelanceCourses = (): CalendarWeek[] => {
  return calendarData.filter(
    (week) => week.track === "接案線"
  )
}

const getRemoteCourses = (): CalendarWeek[] => {
  return calendarData.filter(
    (week) => week.track === "遠端上班線"
  )
}

const getCommonCourses = (): CalendarWeek[] => {
  return calendarData.filter(
    (week) => week.track === "全體共同" && 
    (week.type.includes("共同必修") || week.title.includes("可持續的自由") || week.title.includes("AI") || week.title.includes("自媒體") || week.title.includes("財務"))
  )
}

// 解析 focusDetail 取得核心內容和行動任務
const parseFocusDetail = (focusDetail: string): { content: string; tasks: string[] } => {
  const parts = focusDetail.split("\n\n")
  let content = ""
  let tasks: string[] = []

  for (const part of parts) {
    if (part.startsWith("核心內容")) {
      content = part.replace("核心內容\n", "").replace(/• /g, "").split("\n").join(" ")
    } else if (part.startsWith("行動任務") || part.startsWith("基礎任務") || part.startsWith("進階任務")) {
      const taskLines = part.split("\n").slice(1)
      tasks = tasks.concat(taskLines.map(t => t.replace(/• /, "").trim()).filter(t => t))
    }
  }

  return { content, tasks }
}

// 根據階段取得月份
const getMonthFromPhase = (phase: string): string => {
  if (phase === "藍圖與目標") return "5月"
  if (phase === "定位與門面") return "6月"
  if (phase === "機會與轉化") return "7月"
  if (phase === "永續") return "8-9月"
  return ""
}

// 課程卡片元件
function CourseCard({ course, isRequired = true }: { course: CalendarWeek; isRequired?: boolean }) {
  const { content, tasks } = parseFocusDetail(course.focusDetail)
  const month = getMonthFromPhase(course.phase)
  const instructors = getInstructorsByNames(course.instructorNames)

  return (
    <div className="bg-white border border-brand-mist rounded-xl p-5 mb-4">
      {/* 月份與標籤 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-brand-gold font-medium text-sm">{month}</span>
        {isRequired !== undefined && (
          <span className={`text-xs px-2 py-0.5 rounded ${isRequired ? 'bg-brand-teal/10 text-brand-teal' : 'bg-brand-mist text-brand-text/70'}`}>
            {isRequired ? '必修' : '選修'}
          </span>
        )}
      </div>

      {/* 課程標題 */}
      <h4 className="text-lg font-bold text-brand-teal mb-2">{course.title}</h4>

      {/* 課程說明 */}
      <p className="text-sm text-brand-text/80 mb-4 leading-relaxed">
        {content || course.focusShort}
      </p>

      {/* 行動任務 */}
      {tasks.length > 0 && (
        <div className="bg-brand-offwhite rounded-lg p-3 mb-4">
          {tasks.map((task, i) => (
            <p key={i} className="text-sm text-brand-text flex items-start gap-2 mb-1 last:mb-0">
              <span className="text-brand-gold">&#9997;</span>
              <span><strong>{i === 0 ? '行動任務：' : ''}</strong>{task}</span>
            </p>
          ))}
        </div>
      )}

      {/* 講師資訊（頭像 + 姓名 + 職稱） */}
      {instructors.length > 0 && (
        <div className="pt-4 border-t border-brand-mist/50">
          <p className="text-xs text-brand-text/60 mb-3 uppercase tracking-wider">{'講師'}</p>
          <div className="space-y-3">
            {instructors.map((instructor, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Image
                  src={instructor.image || "/placeholder.svg"}
                  alt={instructor.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brand-teal text-sm">{instructor.name}</p>
                  <p className="text-xs text-brand-gold leading-snug mt-0.5">{instructor.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function CourseDetailModal({ isOpen, onClose }: CourseDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"freelance" | "remote" | "common">("freelance")

  const freelanceCourses = getFreelanceCourses()
  const remoteCourses = getRemoteCourses()
  const commonCourses = getCommonCourses()

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col bg-brand-offwhite p-0 rounded-2xl">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b border-brand-mist bg-white rounded-t-2xl flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-brand-teal flex items-center gap-2">
                <span>&#128218;</span> 各路線課程詳情
              </DialogTitle>
              <button
                onClick={onClose}
                className="p-2 hover:bg-brand-mist/30 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-brand-text" />
              </button>
            </div>

            {/* Tab 切換 */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setActiveTab("freelance")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "freelance"
                    ? "bg-brand-teal text-white"
                    : "bg-brand-mist/30 text-brand-text hover:bg-brand-mist/50"
                }`}
              >
                接案路線
              </button>
              <button
                onClick={() => setActiveTab("remote")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "remote"
                    ? "bg-brand-teal text-white"
                    : "bg-brand-mist/30 text-brand-text hover:bg-brand-mist/50"
                }`}
              >
                遠端上班
              </button>
              <button
                onClick={() => setActiveTab("common")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "common"
                    ? "bg-brand-teal text-white"
                    : "bg-brand-mist/30 text-brand-text hover:bg-brand-mist/50"
                }`}
              >
                共同必修/選修
              </button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* 接案路線 */}
            {activeTab === "freelance" && (
              <div className="animate-in fade-in duration-200">
                {freelanceCourses.map((course) => (
                  <CourseCard key={course.id} course={course} isRequired={true} />
                ))}
              </div>
            )}

            {/* 遠端上班 */}
            {activeTab === "remote" && (
              <div className="animate-in fade-in duration-200">
                {remoteCourses.map((course) => (
                  <CourseCard key={course.id} course={course} isRequired={true} />
                ))}
              </div>
            )}

            {/* 共同必修/選修 */}
            {activeTab === "common" && (
              <div className="animate-in fade-in duration-200">
                {commonCourses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    isRequired={course.type.includes("共同必修")}
                  />
                ))}
              </div>
            )}

            {/* 引導提示：查看講師完整介紹 */}
            <div className="mt-4 p-4 bg-brand-offwhite rounded-xl border border-brand-mist/50 text-center">
              <p className="text-sm text-brand-text/80 mb-2">{'想看每週講師的完整介紹？'}</p>
              <button
                onClick={() => {
                  onClose()
                  setTimeout(() => {
                    document.getElementById("course-and-instructors")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }, 300)
                }}
                className="inline-flex items-center gap-1.5 text-brand-teal hover:text-brand-teal/80 font-semibold text-sm transition-colors"
              >
                {'前往「課表與講師」區塊'}
                <span aria-hidden>&#8595;</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
