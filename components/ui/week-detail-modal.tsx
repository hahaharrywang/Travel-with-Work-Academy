"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ChevronDown,
  Globe,
  Linkedin,
  Instagram,
  Facebook,
  ExternalLink,
} from "lucide-react"
import { type CalendarWeek, getTrackColor, getInstructorsByNames } from "@/data/calendar"

interface WeekDetailModalProps {
  week: CalendarWeek | null
  onClose: () => void
}

export function WeekDetailModal({ week, onClose }: WeekDetailModalProps) {
  const [expandedInstructorBios, setExpandedInstructorBios] = useState<Set<string>>(new Set())

  if (!week) return null

  const toggleInstructorBio = (key: string) => {
    setExpandedInstructorBios((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      return newSet
    })
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 text-xl font-bold z-10"
        >
          {"×"}
        </button>

        {/* Week and Track Badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-bold text-brand-teal">{week.monthWeek}</span>
          <span
            className={`px-2 py-0.5 text-xs rounded ${getTrackColor(week.track).bg} ${getTrackColor(week.track).text}`}
          >
            {week.track}
          </span>
        </div>

        {/* Course Title */}
        <h3 className="text-2xl font-bold text-brand-teal mb-3">{week.title}</h3>

        {/* Course Type */}
        <p className="text-sm font-medium text-brand-gold mb-6">{week.type}</p>

        {/* Detailed Course Description */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-brand-teal mb-3">課程說明</h4>
          <p className="text-sm text-brand-text leading-relaxed whitespace-pre-line">{week.focusDetail}</p>
        </div>

        {/* Instructors Section */}
        {week.instructorNames.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-brand-teal mb-4">講師介紹</h4>
            <div className="space-y-6">
              {getInstructorsByNames(week.instructorNames).map((instructor, idx) => {
                const rawBackground = instructor.background || ""
                const instructorKey = `${week.id}-${idx}`
                const isExpanded = expandedInstructorBios.has(instructorKey)
                const shouldTruncate = rawBackground.length > 200
                const displayText = isExpanded ? rawBackground : rawBackground.slice(0, 200)

                return (
                  <div key={idx} className="p-6 bg-brand-offwhite rounded-xl">
                    {/* Header with avatar, name, title, and social links */}
                    <div className="flex items-start gap-4 mb-4">
                      <Image
                        src={instructor.image || "/placeholder.svg"}
                        alt={instructor.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        {/* Name and social links row */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h5 className="font-bold text-lg text-brand-teal leading-tight">{instructor.name}</h5>
                          {/* Social links */}
                          {(instructor.links || instructor.link) && (
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              {instructor.links?.website && (
                                <a
                                  href={instructor.links.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-brand-gold text-brand-teal hover:text-white transition-colors shadow-sm"
                                  title="個人網站"
                                >
                                  <Globe className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {instructor.links?.linkedin && (
                                <a
                                  href={instructor.links.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-[#0A66C2] text-brand-teal hover:text-white transition-colors shadow-sm"
                                  title="LinkedIn"
                                >
                                  <Linkedin className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {instructor.links?.instagram && (
                                <a
                                  href={instructor.links.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 text-brand-teal hover:text-white transition-colors shadow-sm"
                                  title="Instagram"
                                >
                                  <Instagram className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {instructor.links?.facebook && (
                                <a
                                  href={instructor.links.facebook}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-[#1877F2] text-brand-teal hover:text-white transition-colors shadow-sm"
                                  title="Facebook"
                                >
                                  <Facebook className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {!instructor.links && instructor?.link && (
                                <a
                                  href={instructor.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-brand-gold text-brand-teal hover:text-white transition-colors shadow-sm"
                                  title="外部連結"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                        {/* Title */}
                        <p className="text-sm text-brand-gold leading-snug">{instructor.title}</p>
                      </div>
                    </div>

                    {rawBackground && (
                      <div className="mt-4">
                        <p className="text-sm text-brand-text leading-relaxed whitespace-pre-line">
                          {displayText}
                          {!isExpanded && shouldTruncate && "..."}
                        </p>

                        {/* Toggle button */}
                        {shouldTruncate && (
                          <>
                            <div className="h-px bg-brand-gold/20 my-4" />
                            <button
                              onClick={() => toggleInstructorBio(instructorKey)}
                              className="mx-auto flex items-center gap-2 text-sm text-brand-gold hover:text-brand-teal transition-colors"
                            >
                              <span>{isExpanded ? "收起" : "查看更多"}</span>
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                              />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
