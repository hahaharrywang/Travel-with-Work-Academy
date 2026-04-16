"use client"

import { X, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog"
import { calendarData, fourPhases, type CalendarWeek } from "@/data/calendar"

interface WeeklyScheduleModalProps {
  isOpen: boolean
  onClose: () => void
}

// 將課程按階段分組
const groupByPhase = (data: CalendarWeek[]) => {
  const grouped: { [key: string]: CalendarWeek[] } = {}
  
  for (const week of data) {
    if (!grouped[week.phase]) {
      grouped[week.phase] = []
    }
    grouped[week.phase].push(week)
  }
  
  return grouped
}

// 取得路線標籤樣式
const getTrackStyle = (track: string) => {
  if (track === "遠端上班線") {
    return "bg-brand-teal text-white"
  }
  if (track === "接案線") {
    return "bg-brand-gold text-white"
  }
  return "bg-brand-mist text-brand-text"
}

// 取得路線簡稱
const getTrackShort = (track: string) => {
  if (track === "遠端上班線") return "遠端上班線"
  if (track === "接案線") return "接案線"
  if (track === "全體共同") return "全體共同"
  return track
}

// 取得階段對應的月份描述
const getPhaseMonths = (phase: string) => {
  const phaseObj = fourPhases.find(p => p.name === phase)
  return phaseObj?.months || ""
}

export function WeeklyScheduleModal({ isOpen, onClose }: WeeklyScheduleModalProps) {
  const groupedData = groupByPhase(calendarData)
  const phases = ["藍圖與目標", "定位與門面", "機會與轉化", "永續"]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
        <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col bg-brand-offwhite p-0 rounded-2xl">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b border-brand-mist bg-white rounded-t-2xl flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-brand-teal flex items-center gap-2">
                <Calendar className="w-6 h-6" /> 四階段完整週次表
              </DialogTitle>
              <button
                onClick={onClose}
                className="p-2 hover:bg-brand-mist/30 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-brand-text" />
              </button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {phases.map((phase) => {
              const weeks = groupedData[phase] || []
              const months = getPhaseMonths(phase)
              
              return (
                <div key={phase} className="mb-8 last:mb-0">
                  {/* 階段標題 */}
                  <h3 className="text-lg font-bold text-brand-teal mb-4">
                    階段{phases.indexOf(phase) + 1}：{phase}（{months}）
                  </h3>

                  {/* Desktop 表格 */}
                  <div className="hidden md:block bg-white rounded-xl border border-brand-mist overflow-hidden">
                    {/* 表頭 */}
                    <div className="grid grid-cols-12 bg-brand-teal text-white text-sm">
                      <div className="col-span-2 p-3 font-semibold">週次</div>
                      <div className="col-span-5 p-3 font-semibold">課程</div>
                      <div className="col-span-2 p-3 font-semibold">路線</div>
                      <div className="col-span-3 p-3 font-semibold">講師</div>
                    </div>
                    {/* 表格內容 */}
                    {weeks.map((week, index) => (
                      <div
                        key={week.id}
                        className={`grid grid-cols-12 text-sm ${
                          index % 2 === 0 ? "bg-white" : "bg-brand-offwhite/50"
                        }`}
                      >
                        <div className="col-span-2 p-3 font-medium text-brand-text">
                          Week {week.id}
                        </div>
                        <div className="col-span-5 p-3 text-brand-text">
                          {week.title}
                        </div>
                        <div className="col-span-2 p-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getTrackStyle(week.track)}`}>
                            {getTrackShort(week.track)}
                          </span>
                        </div>
                        <div className="col-span-3 p-3 text-brand-text/80">
                          {week.instructorNames.join("、")}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile 卡片 */}
                  <div className="md:hidden space-y-3">
                    {weeks.map((week) => (
                      <div
                        key={week.id}
                        className="bg-white rounded-xl border border-brand-mist p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-brand-teal">Week {week.id}</span>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getTrackStyle(week.track)}`}>
                            {getTrackShort(week.track)}
                          </span>
                        </div>
                        <h4 className="font-medium text-brand-text mb-2">{week.title}</h4>
                        <p className="text-sm text-brand-text/70">
                          講師：{week.instructorNames.join("、")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
