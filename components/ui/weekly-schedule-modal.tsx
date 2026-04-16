"use client"

import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
import { calendarData, fourPhases, getTrackColor, type CalendarWeek } from "@/data/calendar"

interface WeeklyScheduleModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WeeklyScheduleModal({ isOpen, onClose }: WeeklyScheduleModalProps) {
  // 依階段分組
  const groupedByPhase = calendarData.reduce((acc, week) => {
    const phase = week.phase
    if (!acc[phase]) {
      acc[phase] = []
    }
    acc[phase].push(week)
    return acc
  }, {} as Record<string, CalendarWeek[]>)

  // 取得階段的月份
  const getPhaseMonth = (phaseName: string) => {
    const phase = fourPhases.find((p) => p.name === phaseName)
    return phase?.months || ""
  }

  // 取得路線標籤樣式
  const getTrackBadge = (track: string) => {
    if (track === "遠端上班線") {
      return {
        bg: "bg-brand-teal/10",
        text: "text-brand-teal",
        label: "遠端上班線",
      }
    }
    if (track === "接案線") {
      return {
        bg: "bg-brand-gold/10",
        text: "text-[#A06E56]",
        label: "接案線",
      }
    }
    return {
      bg: "bg-gray-100",
      text: "text-gray-600",
      label: "全體共同",
    }
  }

  // 從 monthWeek 取得週次
  const getWeekNumber = (monthWeek: string) => {
    const match = monthWeek.match(/Week\s*(\d+)/i)
    return match ? `Week ${match[1]}` : ""
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
          <DialogHeader className="p-6 pb-4 border-b border-brand-mist/30 flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-brand-teal flex items-center gap-2">
                <span className="text-2xl">📅</span> 四階段完整週次表
              </DialogTitle>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-brand-mist/30 hover:bg-brand-mist/50 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-brand-text/70" />
              </button>
            </div>
          </DialogHeader>

          {/* 週次表內容 */}
          <div className="flex-1 overflow-y-auto p-6">
            {Object.entries(groupedByPhase).map(([phase, weeks], phaseIndex) => {
              const month = getPhaseMonth(phase)
              const phaseColor = fourPhases.find((p) => p.name === phase)?.color

              return (
                <div key={phase} className="mb-8 last:mb-0">
                  {/* 階段標題 */}
                  <h3 className={`text-lg font-bold mb-4 ${phaseColor?.text || "text-brand-teal"}`}>
                    階段{phaseIndex + 1 > 3 ? "四" : ["一", "二", "三"][phaseIndex]}：{phase}（{month}）
                  </h3>

                  {/* 桌機版表格 */}
                  <div className="hidden md:block overflow-hidden rounded-xl border border-brand-mist/30">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-brand-teal text-white">
                          <th className="text-left py-3 px-4 font-semibold w-[100px]">週次</th>
                          <th className="text-left py-3 px-4 font-semibold">課程</th>
                          <th className="text-left py-3 px-4 font-semibold w-[120px]">路線</th>
                          <th className="text-left py-3 px-4 font-semibold w-[120px]">講師</th>
                        </tr>
                      </thead>
                      <tbody>
                        {weeks.map((week, index) => {
                          const trackBadge = getTrackBadge(week.track)
                          const weekNum = getWeekNumber(week.monthWeek)

                          return (
                            <tr
                              key={week.id}
                              className={index % 2 === 0 ? "bg-white" : "bg-brand-offwhite/50"}
                            >
                              <td className="py-3 px-4 text-brand-text font-medium">{weekNum}</td>
                              <td className="py-3 px-4 text-brand-text">{week.title}</td>
                              <td className="py-3 px-4">
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${trackBadge.bg} ${trackBadge.text}`}
                                >
                                  {trackBadge.label}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-brand-text/80">
                                {week.instructorNames.join(", ")}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* 手機版卡片 */}
                  <div className="md:hidden space-y-3">
                    {weeks.map((week) => {
                      const trackBadge = getTrackBadge(week.track)
                      const weekNum = getWeekNumber(week.monthWeek)

                      return (
                        <div
                          key={week.id}
                          className="bg-white rounded-lg border border-brand-mist/30 p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-brand-teal font-medium text-sm">{weekNum}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium ${trackBadge.bg} ${trackBadge.text}`}
                            >
                              {trackBadge.label}
                            </span>
                          </div>
                          <h4 className="font-medium text-brand-text mb-1">{week.title}</h4>
                          <p className="text-brand-text/60 text-sm">
                            講師：{week.instructorNames.join(", ")}
                          </p>
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
  )
}
