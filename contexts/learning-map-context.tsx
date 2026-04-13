"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { type CalendarWeek } from "@/data/calendar"

interface LearningMapContextType {
  // Tab state
  activeMapTab: string
  setActiveMapTab: (tab: string) => void
  
  // Week selection
  selectedWeek: CalendarWeek | null
  setSelectedWeek: (week: CalendarWeek | null) => void
  
  // Expansion states
  expandedWeeks: Set<number>
  toggleWeekExpansion: (weekId: number) => void
  expandedPhases: Set<string>
  togglePhase: (phase: string) => void
  
  // Calendar display
  showCalendarInline: boolean
  setShowCalendarInline: (show: boolean) => void
  showCalendarModal: boolean
  setShowCalendarModal: (show: boolean) => void
  
  // Instructor bio expansion
  expandedInstructorBios: Set<string>
  toggleInstructorBio: (name: string) => void
}

const LearningMapContext = createContext<LearningMapContextType | null>(null)

export function LearningMapProvider({ children }: { children: ReactNode }) {
  const [activeMapTab, setActiveMapTab] = useState<string>("遠端上班")
  const [selectedWeek, setSelectedWeek] = useState<CalendarWeek | null>(null)
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set())
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set())
  const [showCalendarInline, setShowCalendarInline] = useState(false)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [expandedInstructorBios, setExpandedInstructorBios] = useState<Set<string>>(new Set())

  const toggleWeekExpansion = useCallback((weekId: number) => {
    setExpandedWeeks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(weekId)) {
        newSet.delete(weekId)
      } else {
        newSet.add(weekId)
      }
      return newSet
    })
  }, [])

  const togglePhase = useCallback((phase: string) => {
    setExpandedPhases((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(phase)) {
        newSet.delete(phase)
      } else {
        newSet.add(phase)
      }
      return newSet
    })
  }, [])

  const toggleInstructorBio = useCallback((name: string) => {
    setExpandedInstructorBios((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(name)) {
        newSet.delete(name)
      } else {
        newSet.add(name)
      }
      return newSet
    })
  }, [])

  return (
    <LearningMapContext.Provider
      value={{
        activeMapTab,
        setActiveMapTab,
        selectedWeek,
        setSelectedWeek,
        expandedWeeks,
        toggleWeekExpansion,
        expandedPhases,
        togglePhase,
        showCalendarInline,
        setShowCalendarInline,
        showCalendarModal,
        setShowCalendarModal,
        expandedInstructorBios,
        toggleInstructorBio,
      }}
    >
      {children}
    </LearningMapContext.Provider>
  )
}

export function useLearningMap() {
  const context = useContext(LearningMapContext)
  if (!context) {
    throw new Error("useLearningMap must be used within a LearningMapProvider")
  }
  return context
}
