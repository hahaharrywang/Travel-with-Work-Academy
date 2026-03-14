"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import {
  ChevronDown,
  ChevronUp,
  X,
  ChevronRight,
  ChevronLeft,
  Mail,
  Linkedin,
  Instagram,
  Facebook,
  ExternalLink,
} from "lucide-react"
import { usePricing } from "@/contexts/pricing-context"
import { AnnouncementBar } from "@/components/announcement-bar"
import { StickyBottomBar } from "@/components/sticky-bottom-bar"
import { FloatingSocialButtons } from "@/components/floating-social-buttons" // Import FloatingSocialButtons
import { PricingSection } from "@/components/sections/pricing-section" // Import PricingSection
import FAQSection from "@/components/sections/faq-section" // Import FAQSection
import { SuccessStoriesSection } from "@/components/sections/success-stories-section"
import { FreeLectureSection } from "@/components/sections/free-lecture-section"
import { EcosystemSection } from "@/components/sections/ecosystem-section"
import { KeyFeaturesSection } from "@/components/sections/key-features-section"
import { CourseHighlightsSection } from "@/components/sections/course-highlights-section"
import { PainPointsSection } from "@/components/sections/pain-points-section"
import { HeroSection } from "@/components/sections/hero-section"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"

import { type PlanId, getCheckoutURL } from "@/data/plan-config"
import { calendarData, getPhaseColor, getTrackColor, getInstructorsByNames, fourPhases, remoteJobPhaseContent, freelancePhaseContent, undecidedTabContent, type CalendarWeek } from "@/data/calendar"
import { stagePhotos } from "@/data/stage-photos"
import { instructors } from "@/data/instructors"



export default function LandingPage({ params }: { params: { coupon?: string | string[] } }) {
  const [couponCode, setCouponCode] = useState<string | null>(null)
  const [activeMapTab, setActiveMapTab] = useState<string>("遠端上班") // State for Learning Map tabs
  const [selectedWeek, setSelectedWeek] = useState<CalendarWeek | null>(null)

  const { currentStageData, timeLeft, lowestPrice, selectedPlanId, setSelectedPlanId, getTrackingParams } = usePricing()

  // State for the highlight popup
  const [highlightPopup, setHighlightPopup] = useState<{
    isOpen: boolean
    title: string
    subtitle: string
    content: string
  }>({
    isOpen: false,
    title: "",
    subtitle: "",
    content: "",
  })

  useEffect(() => {
    if (params.coupon && Array.isArray(params.coupon) && params.coupon.length > 0) {
      setCouponCode(params.coupon[0])
    } else if (typeof params.coupon === "string") {
      setCouponCode(params.coupon)
    }
  }, [params])

  const getCheckoutURLWithTracking = (planId: PlanId = "dualLine") => {
    const effectivePlanId = selectedPlanId || planId
    const baseURL = getCheckoutURL(effectivePlanId, couponCode || undefined)
    const trackingParams = getTrackingParams()
    return `${baseURL}${trackingParams}`
  }

  const scrollToPricing = useCallback(() => {
    document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showFullSchedule, setShowFullSchedule] = useState(false)
  const [showAllStages, setShowAllStages] = useState(false) // New state for showing all stages in pricing timeline
  const [timelineExpanded, setTimelineExpanded] = useState(false) // State for timeline expansion



  const openGallery = (stageIndex: number, photoIndex = 0) => {
    setCurrentStage(stageIndex)
    setCurrentPhotoIndex(photoIndex)
    setIsGalleryOpen(true)
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === stagePhotos[currentStage].length - 1 ? 0 : prev + 1))
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? stagePhotos[currentStage].length - 1 : prev - 1))
  }

  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [showCalendarInline, setShowCalendarInline] = useState(false)
  const calendarSectionRef = useRef<HTMLDivElement>(null)
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set())
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(["階段一 起步打底"]))
  const [expandedInstructorBios, setExpandedInstructorBios] = useState<Set<string>>(new Set())

  const [pricingTimelineModalOpen, setPricingTimelineModalOpen] = useState(false)
  const [faqPriceDiffModalOpen, setFaqPriceDiffModalOpen] = useState(false)
  const [isInFreeSection, setIsInFreeSection] = useState(false)

  // IntersectionObserver for pricing section - change sticky bar CTA
  useEffect(() => {
    const pricingSection = document.getElementById("pricing-section")
    if (!pricingSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInFreeSection(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(pricingSection)
    return () => observer.disconnect()
  }, [])


  const isAnyModalOpen =
    isGalleryOpen ||
    selectedWeek !== null ||
    showCalendarModal ||
    pricingTimelineModalOpen ||
    faqPriceDiffModalOpen ||
    highlightPopup.isOpen

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isAnyModalOpen])

  const toggleWeekExpansion = (weekId: number) => {
    setExpandedWeeks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(weekId)) {
        newSet.delete(weekId)
      } else {
        newSet.add(weekId)
      }
      return newSet
    })
  }



  const togglePhase = (phase: string) => {
    setExpandedPhases((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(phase)) {
        newSet.delete(phase)
      } else {
        newSet.add(phase)
      }
      return newSet
    })
  }

  const toggleFeature = (index: number) => {
    setExpandedFeatures((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }



  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt: string }>>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxOpen) {
        setLightboxOpen(false)
      }
      if (lightboxOpen) {
        if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1))
        }
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0))
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, lightboxImages.length])

  const openLightbox = (images: Array<{ src: string; alt: string }>, startIndex: number) => {
    setLightboxImages(images)
    setLightboxIndex(startIndex)
    setLightboxOpen(true)
  }

  return (
    <main className="min-h-screen bg-white pb-24 md:pb-0">
      <AnnouncementBar scrollToPricing={scrollToPricing} onEmailSubscribe={() => setEmailPopupOpen(true)} />
      {/* SECTION 1 HERO */}
      <HeroSection />
      {/* SECTION 2 COURSE HIGHLIGHTS - 正在尋找「下一步」的你 */}
      <CourseHighlightsSection />
      {/* SECTION 3 PAIN POINTS - 三大痛點 */}
      <PainPointsSection />
      {/* SECTION 2.1 COURSE HIGHLIGHTS CONTINUED (Part 2: 三大亮點) */}
      <KeyFeaturesSection />

      {/* SECTION 5 INSTRUCTORS - 師資 (currently hidden, use <InstructorsSection instructors={instructors} /> to enable) */}
      {/* SECTION 6 COURSE OUTLINE START - 學習地圖（四階段） */}
      <section id="learning-map" className="py-16 sm:py-20 bg-brand-offwhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-teal mb-2 text-balance">學習地圖</h2>
            <p className="text-base sm:text-lg text-brand-gold font-medium mb-6">五月開學，每週三晚間八點準時上線。</p>
            <p className="text-brand-text max-w-2xl mx-auto leading-relaxed text-sm sm:text-base font-medium">
              這不是一堆零散課程，而是一套 5 個月、4 階段的行動節奏。
            </p>
            <p className="text-brand-text/60 max-w-2xl mx-auto leading-relaxed text-xs sm:text-sm mt-2">
              兩條路各有主線課，也會共用通用能力模組，例如 AI、自媒體、人生使用說明SOP、財務。
            </p>
          </div>

          {/* Tabs 前導文字 */}
          <p className="text-center text-brand-text/70 text-sm mb-4">先選一條你現在最想嘗試的路線：</p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
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

          {/* Tab Content: 遠端上班 - 四階段卡片 */}
          {activeMapTab === "遠端上班" && (
            <div className="animate-in fade-in duration-300">
              {/* Tab 標題 */}
              <div className="text-center mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-brand-teal mb-2">遠端上班：從看懂機會，到更有機會被錄用，也更有能力走得長久</h3>
              </div>
              
              {/* Desktop: 四張卡片 grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
                {remoteJobPhaseContent.map((content, index) => {
                  const phase = fourPhases[index]
                  return (
                    <div key={index} className={`bg-white rounded-xl p-5 shadow-sm border-2 ${phase.color.border}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`w-6 h-6 rounded-full ${phase.color.solid} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                          {index + 1}
                        </span>
                        <span className="text-xs text-brand-text/50">{phase.months}</span>
                        <span className={`text-xs font-semibold ${phase.color.text}`}>{phase.name}</span>
                      </div>
                      <h4 className="font-bold text-brand-teal text-sm mb-2 leading-snug">{content.headline}</h4>
                      <p className="text-xs text-brand-text/70 mb-3 leading-relaxed">{content.description}</p>
                      
                      <div className="mb-3">
                        <p className="text-[10px] font-semibold text-brand-teal mb-1.5">你會得到：</p>
                        <ul className="space-y-1">
                          {content.outcomes.map((outcome, i) => (
                            <li key={i} className="text-[10px] text-brand-text/80 flex items-start gap-1.5">
                              <span className="text-brand-gold mt-0.5">•</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-2 border-t border-brand-mist/50">
                        <p className="text-[10px] font-semibold text-brand-text/60 mb-1">對應重點：</p>
                        <p className="text-[10px] text-brand-teal leading-relaxed">{content.courses.join("、")}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Mobile: Accordion 折疊式 */}
              <div className="md:hidden space-y-3">
                {remoteJobPhaseContent.map((content, index) => {
                  const phase = fourPhases[index]
                  const isFirst = index === 0
                  return (
                    <details key={index} className={`group bg-white rounded-xl border-2 ${phase.color.border} overflow-hidden`} open={isFirst}>
                      <summary className="p-4 cursor-pointer hover:bg-brand-offwhite/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-full ${phase.color.solid} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-brand-text/50">{phase.months}</span>
                              <span className={`text-xs font-semibold ${phase.color.text}`}>{phase.name}</span>
                            </div>
                            <p className="text-sm font-bold text-brand-teal truncate">{content.headline}</p>
                          </div>
                          {/* 展開/收合提示 */}
                          <div className="flex items-center gap-1 text-brand-text/50 flex-shrink-0">
                            <span className="text-xs group-open:hidden">展開</span>
                            <span className="text-xs hidden group-open:inline">收合</span>
                            <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </summary>
                      <div className="px-4 pb-4 pt-2 border-t border-brand-mist/30">
                        <p className="text-sm text-brand-text/70 mb-3 leading-relaxed">{content.description}</p>
                        
                        <div className="mb-3">
                          <p className="text-xs font-semibold text-brand-teal mb-2">你會得到：</p>
                          <ul className="space-y-1.5">
                            {content.outcomes.map((outcome, i) => (
                              <li key={i} className="text-xs text-brand-text/80 flex items-start gap-2">
                                <span className="text-brand-gold mt-0.5">•</span>
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-3 border-t border-brand-mist/50">
                          <p className="text-xs font-semibold text-brand-text/60 mb-1">對應重點：</p>
                          <p className="text-xs text-brand-teal leading-relaxed">{content.courses.join("、")}</p>
                        </div>
                      </div>
                    </details>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tab Content: 接案 - 四階段卡片 */}
          {activeMapTab === "接案" && (
            <div className="animate-in fade-in duration-300">
              {/* Tab 標題 */}
              <div className="text-center mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-brand-teal mb-2">接案：從想靠自己變現，到做出能持續合作的內容與服務</h3>
              </div>
              
              {/* Desktop: 四張卡片 grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
                {freelancePhaseContent.map((content, index) => {
                  const phase = fourPhases[index]
                  return (
                    <div key={index} className={`bg-white rounded-xl p-5 shadow-sm border-2 ${phase.color.border}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`w-6 h-6 rounded-full ${phase.color.solid} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                          {index + 1}
                        </span>
                        <span className="text-xs text-brand-text/50">{phase.months}</span>
                        <span className={`text-xs font-semibold ${phase.color.text}`}>{phase.name}</span>
                      </div>
                      <h4 className="font-bold text-brand-teal text-sm mb-2 leading-snug">{content.headline}</h4>
                      <p className="text-xs text-brand-text/70 mb-3 leading-relaxed">{content.description}</p>
                      
                      <div className="mb-3">
                        <p className="text-[10px] font-semibold text-brand-teal mb-1.5">你會得到：</p>
                        <ul className="space-y-1">
                          {content.outcomes.map((outcome, i) => (
                            <li key={i} className="text-[10px] text-brand-text/80 flex items-start gap-1.5">
                              <span className="text-brand-gold mt-0.5">•</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-2 border-t border-brand-mist/50">
                        <p className="text-[10px] font-semibold text-brand-text/60 mb-1">對應重點：</p>
                        <p className="text-[10px] text-brand-teal leading-relaxed">{content.courses.join("、")}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Mobile: Accordion 折疊式 */}
              <div className="md:hidden space-y-3">
                {freelancePhaseContent.map((content, index) => {
                  const phase = fourPhases[index]
                  const isFirst = index === 0
                  return (
                    <details key={index} className={`group bg-white rounded-xl border-2 ${phase.color.border} overflow-hidden`} open={isFirst}>
                      <summary className="p-4 cursor-pointer hover:bg-brand-offwhite/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-full ${phase.color.solid} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-brand-text/50">{phase.months}</span>
                              <span className={`text-xs font-semibold ${phase.color.text}`}>{phase.name}</span>
                            </div>
                            <p className="text-sm font-bold text-brand-teal truncate">{content.headline}</p>
                          </div>
                          {/* 展開/收合提示 */}
                          <div className="flex items-center gap-1 text-brand-text/50 flex-shrink-0">
                            <span className="text-xs group-open:hidden">展開</span>
                            <span className="text-xs hidden group-open:inline">收合</span>
                            <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </summary>
                      <div className="px-4 pb-4 pt-2 border-t border-brand-mist/30">
                        <p className="text-sm text-brand-text/70 mb-3 leading-relaxed">{content.description}</p>
                        
                        <div className="mb-3">
                          <p className="text-xs font-semibold text-brand-teal mb-2">你會得到：</p>
                          <ul className="space-y-1.5">
                            {content.outcomes.map((outcome, i) => (
                              <li key={i} className="text-xs text-brand-text/80 flex items-start gap-2">
                                <span className="text-brand-gold mt-0.5">•</span>
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-3 border-t border-brand-mist/50">
                          <p className="text-xs font-semibold text-brand-text/60 mb-1">對應重點：</p>
                          <p className="text-xs text-brand-teal leading-relaxed">{content.courses.join("、")}</p>
                        </div>
                      </div>
                    </details>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tab Content: 我還不確定 - 簡化版，降低決策焦慮 */}
          {activeMapTab === "我還不確定" && (
            <div className="animate-in fade-in duration-300 max-w-3xl mx-auto">
              {/* Tab 標題 */}
              <div className="text-center mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-brand-teal mb-2">{undecidedTabContent.headline}</h3>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                {/* 常見困惑 */}
                <div className="text-brand-text text-sm leading-relaxed mb-6">
                  <p className="whitespace-pre-line">{undecidedTabContent.intro}</p>
                </div>

                {/* 決策彈性區塊 */}
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

                {/* 試上資訊 */}
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

                {/* 收尾 */}
                <div className="pt-4 border-t border-brand-mist">
                  <p className="text-center text-brand-teal font-medium">{undecidedTabContent.closing}</p>
                </div>
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div id="learning-map-cta" className="text-center mt-10">
            <button
              onClick={() => {
                setShowCalendarInline(!showCalendarInline)
                setTimeout(() => {
                  document.getElementById("learning-map-cta")?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }, 300)
              }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                showCalendarInline
                  ? "bg-brand-offwhite text-brand-teal border border-brand-mist hover:bg-brand-mist"
                  : "bg-brand-teal text-white hover:bg-[#1a5561]"
              }`}
            >
              {showCalendarInline ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  收合行事曆
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  展開學習行事曆＆課程講師
                </>
              )}
            </button>
            {!showCalendarInline && <p className="text-sm text-brand-text/60 mt-2">看看每週三晚間八點，具體在做什麼</p>}
          </div>

          {showCalendarInline && (
            <div ref={calendarSectionRef} className="mt-8 animate-in slide-in-from-top-4 fade-in duration-500">
              {/* Timeline Content - Grouped by Phase */}
              <div className="space-y-4">
                {(() => {
                  const phaseGroups = [
                    {
                      phase: "階段一 藍圖與目標",
                      phaseKey: "藍圖與目標",
                      months: ["5 月"],
                      weeks: [1, 2, 3, 4],
                      description: "先知道你要往哪裡走",
                    },
                    {
                      phase: "階段二 定位與門面",
                      phaseKey: "定位與門面",
                      months: ["6 月"],
                      weeks: [5, 6, 7, 8],
                      description: "把你整理成別人看得懂的樣子",
                    },
                    {
                      phase: "階段三 接觸機會與轉化",
                      phaseKey: "接觸機會與轉化",
                      months: ["7 月"],
                      weeks: [9, 10, 11, 12, 13],
                      description: "開始讓曝光、投遞與合作變成機會",
                    },
                    {
                      phase: "階段四 永續",
                      phaseKey: "永續",
                      months: ["8 月", "9 月"],
                      weeks: [14, 15, 16, 17, 18, 19, 20, 21, 22],
                      description: "把一次嘗試走成長期節奏",
                    },
                  ]

                  return (
                    <>
                      {phaseGroups.map((group) => {
                        const phaseWeeks = calendarData.filter((week) => week.phase === group.phaseKey)
                        const isPhaseExpanded = expandedPhases.has(group.phase)
                        const phaseColor = getPhaseColor(group.phaseKey)

                        if (phaseWeeks.length === 0) return null

                        return (
                          <div
                            key={group.phase}
                            className="border border-brand-mist rounded-xl overflow-hidden bg-white"
                          >
                            {/* Phase Header - Clickable */}
                            <button
                              onClick={() => togglePhase(group.phase)}
                              className={`w-full px-4 md:px-6 py-4 flex items-center justify-center relative transition-colors ${
                                isPhaseExpanded ? "bg-brand-offwhite" : "bg-white hover:bg-brand-offwhite/50"
                              }`}
                            >
                              <div className="flex flex-col items-center gap-1 text-center flex-1">
                                <span
                                  className={`px-3 py-1 text-sm font-semibold rounded-lg ${phaseColor.bg} ${phaseColor.text}`}
                                >
                                  {group.phase}
                                </span>
                                <p className="text-sm text-gray-500">
                                  {group.months.join("、")}　{group.description}
                                </p>
                              </div>
                              <ChevronDown
                                className={`w-5 h-5 text-brand-teal transition-transform flex-shrink-0 absolute right-4 md:right-6 ${
                                  isPhaseExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {/* Phase Content - Expandable */}
                            {isPhaseExpanded && (
                              <div className="px-4 md:px-6 py-4 border-t border-brand-mist animate-in slide-in-from-top-2 fade-in duration-300">
                                {/* Week Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                  {phaseWeeks.map((week) => {
                                    const trackColor = getTrackColor(week.track)
                                    const weekInstructors = getInstructorsByNames(week.instructorNames)

                                    return (
                                      <div
                                        key={week.id}
                                        className="border border-brand-mist rounded-lg p-4 bg-white hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
                                        onClick={() => setSelectedWeek(week)}
                                      >
                                        {/* Week Header */}
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-bold text-brand-teal">{week.monthWeek}</span>
                                          <span
                                            className={`px-2 py-0.5 text-xs rounded ${trackColor.bg} ${trackColor.text}`}
                                          >
                                            {week.track}
                                          </span>
                                        </div>

                                        {/* Title */}
                                        <h4 className="text-sm font-semibold text-brand-teal mb-2 line-clamp-2">
                                          {week.title}
                                        </h4>

                                        <p className="text-xs text-brand-text mb-3 line-clamp-2">{week.focusShort}</p>

                                        <div className="flex-1"></div>

                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-brand-mist/30">
                                          <div className="flex items-center gap-2">
                                            <div className="flex items-center -space-x-2">
                                              {weekInstructors.slice(0, 3).map((instructor, idx) => (
                                                <div
                                                  key={idx}
                                                  className="w-6 h-6 rounded-full overflow-hidden border-2 border-white"
                                                >
                                                  <Image
                                                    src={instructor.image || "/placeholder.svg"}
                                                    alt={instructor.name}
                                                    width={24}
                                                    height={24}
                                                    className="w-full h-full object-cover"
                                                  />
                                                </div>
                                              ))}
                                            </div>
                                            <span className="text-xs text-brand-text/70">
                                              {weekInstructors.length === 1
                                                ? weekInstructors[0].name === "講師確認中"
                                                  ? "待公開"
                                                  : weekInstructors[0].name
                                                : `${weekInstructors[0].name === "講師確認中" ? "待公開" : weekInstructors[0].name} 等 ${weekInstructors.length} 位`}
                                            </span>
                                          </div>
                                          <ChevronRight className="w-4 h-4 text-brand-teal/50" />
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </>
                  )
                })()}
              </div>
            </div>
          )}

          {/* Footer with collapse button */}
          {showCalendarInline && (
            <div className="flex justify-center py-6">
              <button
                onClick={() => {
                  setShowCalendarInline(false)
                  setTimeout(() => {
                    document.getElementById("learning-map-cta")?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  }, 300)
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-offwhite text-brand-teal rounded-full font-medium hover:bg-brand-mist transition-all duration-300 border border-brand-mist"
              >
                <ChevronUp className="w-4 h-4" />
                收合行事曆
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Member Exclusive Resources Section */}
      {/* What You Get Section */}
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-24 bg-brand-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
              <span className="w-2 h-2 rounded-full bg-brand-teal"></span>
              <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-teal mb-3 text-balance">
              {'成為本屆學員你會得到什麼'}
            </h3>
            <p className="text-sm sm:text-base text-brand-text/70">
              {'遠距職涯 x 遠端接案 — 一套從定位到落地的完整行動系統'}
            </p>
          </div>

          {/* Block 1: Growth System (desktop only - merged into Block 2 on mobile) */}
          <div className="hidden md:block mb-3">
            <h4 className="font-bold text-brand-teal text-base sm:text-lg mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-brand-gold"></span>
              {'一套「把能力變成機會」的成長系統'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-5 border border-brand-mist/50 shadow-sm">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{'01'}</span>
                  </div>
                  <h5 className="font-bold text-brand-teal text-sm">{'當屆完整課程'}</h5>
                </div>
                <p className="text-brand-text/70 text-xs leading-relaxed pl-[42px]">
                  {'聚焦遠距求職與接案兩條路，從定位到落地流程（直播 / 回放一年）'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-brand-mist/50 shadow-sm">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{'02'}</span>
                  </div>
                  <h5 className="font-bold text-brand-teal text-sm">{'作業與落地任務'}</h5>
                </div>
                <p className="text-brand-text/70 text-xs leading-relaxed pl-[42px]">
                  {'每周都要交付 — 一步步把你推到「可以被採用 / 被下單」的狀態'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-brand-mist/50 shadow-sm">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{'03'}</span>
                  </div>
                  <h5 className="font-bold text-brand-teal text-sm">{'成長節奏'}</h5>
                </div>
                <p className="text-brand-text/70 text-xs leading-relaxed pl-[42px]">
                  {'線上同學會 / 團體 QA / DemoDay，互相學習、幫助，彼此督促跟上進度'}
                </p>
              </div>
            </div>
          </div>

          {/* Block 2: Mobile — 成長系統 + 你會做出什麼成果 合併成一張可收合卡片 */}
          {/* Desktop — 你會做出什麼成果 獨立可收合卡片 */}
          <details className="group/block2 mb-3 bg-white rounded-2xl border border-brand-mist/50 shadow-sm overflow-hidden">
            <summary className="flex items-center justify-between p-5 sm:px-8 sm:py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-brand-offwhite/30 transition-colors">
              {/* Mobile: 顯示「成長系統」標題 */}
              <div className="flex md:hidden items-center gap-2 flex-1 min-w-0">
                <span className="w-1.5 h-6 rounded-full bg-brand-gold flex-shrink-0"></span>
                <h4 className="font-bold text-brand-teal text-base">{'一套「把能力變成機會」的成長系統'}</h4>
              </div>
              {/* Desktop: 顯示「你會做出什麼成果」標題 */}
              <div className="hidden md:flex items-center gap-3 flex-wrap">
                <h4 className="font-bold text-brand-teal text-lg">{'你會做出什麼成果'}</h4>
                <div className="flex gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-clay font-medium">{'可展示'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-clay font-medium">{'可投遞'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-clay font-medium">{'可成交'}</span>
                </div>
              </div>
              {/* 展開/收合按鈕 — 兩端都顯示 */}
              <div className="flex items-center gap-1.5 text-brand-text/50 flex-shrink-0 ml-3">
                <span className="text-xs sm:text-sm group-open/block2:hidden">展開</span>
                <span className="text-xs sm:text-sm hidden group-open/block2:inline">收合</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-open/block2:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </summary>

            <div className="px-5 pb-5 sm:px-8 sm:pb-8 border-t border-brand-mist/30">
              {/* Mobile-only: 成長系統內容 */}
              <div className="md:hidden mt-4 mb-5">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-teal font-bold text-xs mt-0.5 flex-shrink-0">{'01'}</span>
                    <div>
                      <span className="font-semibold text-brand-teal text-sm">{'當屆完整課程'}</span>
                      <span className="text-brand-text/60 text-xs">{' — 聚焦遠距求職與接案兩條路，從定位到落地流程（直播 / 回放一年）'}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-teal font-bold text-xs mt-0.5 flex-shrink-0">{'02'}</span>
                    <div>
                      <span className="font-semibold text-brand-teal text-sm">{'作業與落地任務'}</span>
                      <span className="text-brand-text/60 text-xs">{' — 每周都要交付，一步步把你推到「可以被採用 / 被下單」的狀態'}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-teal font-bold text-xs mt-0.5 flex-shrink-0">{'03'}</span>
                    <div>
                      <span className="font-semibold text-brand-teal text-sm">{'成長節奏'}</span>
                      <span className="text-brand-text/60 text-xs">{' — 線上同學會 / 團體 QA / DemoDay，互相學習、幫助，彼此督促跟上進度'}</span>
                    </div>
                  </li>
                </ul>
                {/* 分隔線 + 「你會做出什麼成果」小標 */}
                <div className="mt-5 pt-4 border-t border-brand-mist/40">
                  <div className="flex items-center gap-2 mb-3">
                    <h5 className="font-bold text-brand-teal text-sm">{'你會做出什麼成果'}</h5>
                    <div className="flex gap-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-clay font-medium">{'可展示'}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-clay font-medium">{'可投遞'}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-clay font-medium">{'可成交'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 共用：你會做出什麼成果的 checklist */}
              <ul className="space-y-4">
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-gold flex-shrink-0 mt-0.5 font-bold text-sm">{'✔'}</span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm">{'定位與可能性：遠距路線決策 & 啟動目標'}</span>
                    <p className="text-brand-text/60 text-sm mt-0.5">{'— 釐清你要的自由是什麼（時間／地點／收入），並選定「上班線／接案線／雙軌」的起跑方向及目標'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-gold flex-shrink-0 mt-0.5 font-bold text-sm">{'✔'}</span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm">{'對外門面與信任：一套讓人秒懂專業與價值的門面'}</span>
                    <p className="text-brand-text/60 text-sm mt-0.5">{'— 把你的能力、案例、價值主張整理成：LinkedIn／提案頁 / 作品集的關鍵內容與結構'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-gold flex-shrink-0 mt-0.5 font-bold text-sm">{'✔'}</span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm">{'接觸與轉化：把「接觸」變成「機會」的可擴增系統'}</span>
                    <div className="mt-1 space-y-0.5">
                      <p className="text-brand-text/60 text-sm">{'— 上班線：JD 拆解 → 客製化履歷 → 面試 & 談薪策略'}</p>
                      <p className="text-brand-text/60 text-sm">{'— 接案線：社群內容策略 → 作品呈現 → 獲客管道 → 成交流程'}</p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-gold flex-shrink-0 mt-0.5 font-bold text-sm">{'✔'}</span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm">{'留任與永續：交付的「點 > 線 > 面」永續結構'}</span>
                    <p className="text-brand-text/60 text-sm mt-0.5">{'— 在前期合作能活下來並能持續成長的方法'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-brand-gold flex-shrink-0 mt-0.5 font-bold text-sm">{'✔'}</span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm">{'DemoDay 發表：把行動證明公開呈現'}</span>
                    <p className="text-brand-text/60 text-sm mt-0.5">{'— 讓你完成一次真正的「交付」與「曝光」，也讓機會更容易找上門'}</p>
                  </div>
                </li>
              </ul>

              {/* 結果畫面層 — 讓讀者看到「自己變成什麼樣的人」 */}
              <div className="mt-6 p-4 sm:p-5 rounded-xl bg-brand-gold/10 border border-brand-gold/20">
                <p className="text-xs sm:text-sm text-brand-clay font-medium mb-3 tracking-wide">{'結業後的你'}</p>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold mt-0.5 flex-shrink-0">{'"'}</span>
                    <p className="text-sm text-brand-text leading-relaxed">
                      {'你不再只是羨慕別人遠距，而是'}
                      <span className="font-semibold text-brand-teal">{'開始有自己的遠距職涯門面'}</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold mt-0.5 flex-shrink-0">{'"'}</span>
                    <p className="text-sm text-brand-text leading-relaxed">
                      {'你不再只是想接案，而是'}
                      <span className="font-semibold text-brand-teal">{'開始有第一版可拿去接觸市場的作品與 offer'}</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold mt-0.5 flex-shrink-0">{'"'}</span>
                    <p className="text-sm text-brand-text leading-relaxed">
                      {'你不再只是看內容，而是'}
                      <span className="font-semibold text-brand-teal">{'開始留下履歷、提案、內容、DemoDay 這些能被看見的痕跡'}</span>
                    </p>
                  </li>
                </ul>
              </div>

              <p className="mt-5 pt-4 border-t border-brand-mist/50 text-center text-sm font-bold text-brand-gold">
                {'你的目標是「開始更容易拿到遠距工作 / 接案機會」。'}
              </p>
            </div>
          </details>

          {/* Block 3: Alumni Status — collapsible */}
          <details className="group/alumni mb-3 bg-brand-offwhite/80 rounded-2xl border border-brand-gold/30 shadow-sm overflow-hidden">
            <summary className="flex items-center justify-between p-5 sm:p-8 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-brand-gold/5 transition-colors">
              <div className="flex items-center gap-3 flex-wrap">
                <h4 className="font-bold text-brand-teal text-base sm:text-lg">{'校友資格'}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-teal/10 text-brand-teal font-medium">{'入學即擁有，結業後延續'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-brand-text/50 flex-shrink-0 ml-3">
                <span className="text-xs sm:text-sm group-open/alumni:hidden">展開</span>
                <span className="text-xs sm:text-sm hidden group-open/alumni:inline">收合</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-open/alumni:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </summary>

            <div className="px-5 pb-5 sm:px-8 sm:pb-8 border-t border-brand-gold/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                <div className="flex items-start gap-2.5 bg-white/60 rounded-xl p-4">
                  <span className="w-2 h-2 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm block mb-0.5">{'Skool 社群永久留存'}</span>
                    <p className="text-brand-text/60 text-xs leading-relaxed">{'畢業後不用搬家，仍在同一個社群交流（當屆專區僅當屆可見）'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 bg-white/60 rounded-xl p-4">
                  <span className="w-2 h-2 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm block mb-0.5">{'已購內容回放觀看'}</span>
                    <p className="text-brand-text/60 text-xs leading-relaxed">{'你買過課程(學院正課有一年限制)的回放與學習資源訪問權限'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 bg-white/60 rounded-xl p-4">
                  <span className="w-2 h-2 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm block mb-0.5">{'校友 LinkedIn 群'}</span>
                    <p className="text-brand-text/60 text-xs leading-relaxed">{'僅限學員與校友加入，職涯拓展與合作'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 bg-white/60 rounded-xl p-4">
                  <span className="w-2 h-2 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm block mb-0.5">{'全產品校友價'}</span>
                    <p className="text-brand-text/60 text-xs leading-relaxed">{'下屆學院 / Journey 旅程 / 工作坊與線下聚會 / 合作夥伴福利（依公告）'}</p>
                  </div>
                </div>
              </div>

              {/* Co-creation card */}
              <div className="mt-4 bg-white/60 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <h5 className="font-semibold text-brand-teal text-sm">{'共創與參與權'}</h5>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-clay font-medium">{'把圈子變成機會場'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-brand-teal text-sm block mb-0.5">{'共創專案'}</span>
                      <p className="text-brand-text/60 text-xs leading-relaxed">{'可優先參與、可共同發起（讀書會、實戰企劃、工具共學、Builder 實習等）'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-brand-teal text-sm block mb-0.5">{'許願池'}</span>
                      <p className="text-brand-text/60 text-xs leading-relaxed">{'定期提案 / 投票，讓學院資源與活動更貼近你的需求'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </details>

          {/* Block 5: Community Subscription - HIDDEN */}
          {/* 
          <div className="mb-8 bg-brand-teal/5 rounded-2xl p-5 sm:p-8 border border-brand-teal/10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
              <h4 className="font-bold text-brand-teal text-base sm:text-lg">{'入學自動開通 — 職涯成長社群 Premium 訂閱權益'}</h4>
            </div>
            <p className="text-[10px] sm:text-xs text-brand-text/50 mb-5">{'在學期間有效，不需另外加購'}</p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0 text-sm font-bold text-brand-gold">{'1'}</span>
                <div>
                  <p className="text-sm font-medium text-brand-teal">
                    {'付費講座、工作坊折扣'}
                    <span className="text-brand-text/50 font-normal text-xs ml-1.5">{'每月至少一場'}</span>
                  </p>
                  <p className="text-xs text-brand-text/60 mt-0.5">{'參加到 1.5 場就回本'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0 text-sm font-bold text-brand-gold">{'2'}</span>
                <div>
                  <p className="text-sm font-medium text-brand-teal">
                    {'合作夥伴 / 活動優惠搶先看'}
                  </p>
                  <p className="text-xs text-brand-text/60 mt-0.5">{'訂閱會員限定的合作夥伴優惠與活動搶先通知'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0 text-sm font-bold text-brand-gold">{'3'}</span>
                <div>
                  <p className="text-sm font-medium text-brand-teal">
                    {'世界遊牧資訊'}
                    <span className="text-brand-text/50 font-normal text-xs ml-1.5">{'趨勢整理 + 活動情報'}</span>
                  </p>
                  <p className="text-xs text-brand-text/60 mt-0.5">{'遠距工作市場趨勢、工具更新、海內外活動情報'}</p>
                </div>
              </div>
            </div>

            <p className="mt-5 pt-3 border-t border-brand-teal/10 text-xs text-brand-text/50 text-center">{'結業後若想持續使用，可再自行續訂 Premium。'}</p>
          </div>
          */}

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={scrollToPricing}
              className="inline-block bg-brand-teal text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#0f3339] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {'我要加入本梯'}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2.1 ECOSYSTEM PARTNERSHIP - 生態系 */}
      <EcosystemSection
        onOpenLightbox={(images, index) => {
          setLightboxImages(images)
          setLightboxIndex(index)
          setLightboxOpen(true)
        }}
      />

      {/* Success Stories Section */}
      <SuccessStoriesSection id="success-stories-section" />

      {/* PRICING SECTION */}
      <section id="pricing-section" className="pt-0 pb-0 bg-brand-teal relative overflow-hidden">
        {/* CHANGE: Pass modal states to child components and track when they open/close */}
        <PricingSection onTimelineModalChange={setPricingTimelineModalOpen} />
      </section>

      {/* FREE LECTURE SECTION */}
      <FreeLectureSection />

      {/* FAQ SECTION */}
      <FAQSection
        // CHANGE: Pass modal state to FAQ section
        onPriceDiffModalChange={setFaqPriceDiffModalOpen}
      />

      {/* FOOTER */}
      <footer className="py-12 bg-brand-teal text-white">
        <div className="container mx-auto px-4">
          {/* Contact Information */}
          <div className="text-center mb-6">
            <p className="text-sm text-white/80 leading-relaxed mb-2">如果有問題請洽詢 Line 官方帳號 or Instagram</p>
            <p className="text-sm text-white/80 leading-relaxed">
              也可以{" "}
              <a
                href="mailto:academy@travelwork.life"
                className="inline-flex items-center gap-1 text-brand-gold hover:text-brand-gold/80 transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5" />
                academy@travelwork.life
              </a>
            </p>
          </div>

          <p className="text-xs text-white/60 mb-8 text-center">會有專人回覆</p>

          {/* Social Media Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 pb-8 border-b border-white/10">
            <a
              href="https://www.instagram.com/travelwithwork_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 group border border-white/10"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">Instagram</p>
                <p className="text-xs text-white/60">@travelwithwork_</p>
              </div>
            </a>

            <a
              href="https://lin.ee/r7kh3fX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 group border border-white/10"
            >
              <div className="w-10 h-10 rounded-full bg-[#06C755] flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63-.63-.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">Line 官方帳號</p>
                <p className="text-xs text-white/60">@travelwithwork</p>
              </div>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs text-white/50">
              &copy; 2025 遠距遊牧學院 Travel With Work Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* GALLERY MODAL */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 z-10 text-xl font-bold"
            >
              ✕
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                prevPhoto()
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-xl flex items-center justify-center text-gray-800 hover:text-orange-500 transition-all duration-200 z-10 group"
            >
              <svg
                className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextPhoto()
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-xl flex items-center justify-center text-gray-800 hover:text-orange-500 transition-all duration-200 z-10 group"
            >
              <svg
                className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-w-full max-h-full">
                <Image
                  src={stagePhotos[currentStage][currentPhotoIndex]?.src || "/placeholder.svg"}
                  alt={stagePhotos[currentStage][currentPhotoIndex]?.alt || ""}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent text-white p-6 rounded-b-lg">
                  <p className="text-center text-sm sm:text-base font-medium leading-relaxed">
                    {stagePhotos[currentStage][currentPhotoIndex]?.alt}
                  </p>
                </div>
              </div>
            </div>

            {stagePhotos[currentStage].length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                <span className="text-orange-400">{currentPhotoIndex + 1}</span>
                <span className="mx-2 text-gray-300">/</span>
                <span>{stagePhotos[currentStage].length}</span>
              </div>
            )}

            <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg text-xs opacity-70">
              使用 ← → 鍵或點擊按鈕切換圖片
            </div>
          </div>
        </div>
      )}

      {/* HIGHLIGHT POPUP MODAL */}
      {highlightPopup.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setHighlightPopup({ ...highlightPopup, isOpen: false })}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setHighlightPopup({ ...highlightPopup, isOpen: false })}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 text-xl font-bold z-10"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-brand-teal mb-2">{highlightPopup.title}</h3>
            <p className="text-sm font-medium text-brand-gold mb-6">{highlightPopup.subtitle}</p>
            <div className="text-sm text-brand-text leading-relaxed space-y-4">
              {highlightPopup.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/*SELECTED CALENDAR WEEK MODAL */}
      {selectedWeek && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]"
          onClick={() => setSelectedWeek(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedWeek(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 text-xl font-bold z-10"
            >
              ×
            </button>

            {/* Week and Track Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-bold text-brand-teal">{selectedWeek.monthWeek}</span>
              <span
                className={`px-2 py-0.5 text-xs rounded ${getTrackColor(selectedWeek.track).bg} ${
                  getTrackColor(selectedWeek.track).text
                }`}
              >
                {selectedWeek.track}
              </span>
            </div>

            {/* Course Title */}
            <h3 className="text-2xl font-bold text-brand-teal mb-3">{selectedWeek.title}</h3>

            {/* Course Type */}
            <p className="text-sm font-medium text-brand-gold mb-6">{selectedWeek.type}</p>

            {/* Detailed Course Description */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-brand-teal mb-3">課程說明</h4>
              <p className="text-sm text-brand-text leading-relaxed whitespace-pre-line">{selectedWeek.focusDetail}</p>
            </div>

            {/* Instructors Section */}
            {selectedWeek.instructorNames.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-brand-teal mb-4">講師介紹</h4>
                <div className="space-y-6">
                  {getInstructorsByNames(selectedWeek.instructorNames).map((instructor, idx) => {
                    const rawBackground = instructor.background || ""
                    const instructorKey = `${selectedWeek.id}-${idx}`
                    const isExpanded = expandedInstructorBios.has(instructorKey)

                    const toggleExpanded = () => {
                      setExpandedInstructorBios((prev) => {
                        const newSet = new Set(prev)
                        if (newSet.has(instructorKey)) {
                          newSet.delete(instructorKey)
                        } else {
                          newSet.add(instructorKey)
                        }
                        return newSet
                      })
                    }

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
                                  onClick={toggleExpanded}
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
      )}

      {/* CALENDAR MODAL */}
      {showCalendarModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowCalendarModal(false)}
        >
          <div
            className="relative w-full max-w-[1040px] max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-5">
              <button
                onClick={() => setShowCalendarModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <h3 className="text-xl md:text-2xl font-bold text-brand-teal">完整 <span className="border-2 border-red-500 bg-red-50 px-1 rounded">3+3</span> 學習行事曆</h3>
              {/* CHANGE: Added opening schedule information */}
              <p className="text-sm text-gray-600 mt-1">
                五月開學，週三晚上八點準時上線。
                <br />
                24 週的課程與行動任務，分成三個階段：起步打底、出擊試水、累積整合。
              </p>
            </div>

            {/* Modal Content - Timeline */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {calendarData.map((week) => {
                  const isExpanded = expandedWeeks.has(week.id)
                  const phaseColor = getPhaseColor(week.phase)
                  const trackColor = getTrackColor(week.track)

                  return (
                    <div
                      key={week.id}
                      className={`relative border rounded-xl overflow-hidden transition-all ${
                        isExpanded ? "shadow-md" : "shadow-sm hover:shadow-md"
                      } ${phaseColor.border}`}
                    >
                      {/* Week Header (always visible) */}
                      <div className="p-4 cursor-pointer" onClick={() => toggleWeekExpansion(week.id)}>
                        {/* Phase & Month/Week */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded ${phaseColor.bg} ${phaseColor.text}`}
                          >
                            {week.phase.replace("Phase ", "P")}
                          </span>
                          <span className="text-sm text-gray-500">{week.monthWeek}</span>
                          <span className={`px-2 py-0.5 text-xs rounded ${trackColor.bg} ${trackColor.text}`}>
                            {week.track}
                          </span>
                        </div>

                        {/* Title & Type */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <h4 className="text-base md:text-lg font-semibold text-brand-teal">{week.title}</h4>
                          <span className="text-xs text-gray-400 shrink-0">{week.type}</span>
                        </div>

                        {/* Focus Short */}
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{week.focusShort}</p>

                        {/* Instructors & Expand Button */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            {week.instructors.map((instructor, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-brand-gold/30">
                                  <Image
                                    src={instructor.image || "/placeholder.svg"}
                                    alt={instructor.name}
                                    width={28}
                                    height={28}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="text-xs text-gray-600">{instructor.name}</span>
                              </div>
                            ))}
                          </div>
                          <button
                            className="flex items-center gap-1 text-xs text-brand-teal hover:text-brand-gold transition-colors"
                            onClick={() => toggleWeekExpansion(week.id)}
                          >
                            {isExpanded ? (
                              <>
                                收合 <ChevronUp className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                展開 <ChevronDown className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                          {/* Focus Detail */}
                          <div className="mt-4 p-4 bg-[#F7F2EA] rounded-lg">
                            <h5 className="text-sm font-semibold text-brand-teal mb-2">本週行動任務</h5>
                            <p className="text-sm text-gray-700 leading-relaxed">{week.focusDetail}</p>
                          </div>

                          {/* Instructor Details */}
                          <div className="mt-4">
                            <h5 className="text-sm font-semibold text-brand-teal mb-3">講師資訊</h5>
                            <div className="flex flex-wrap gap-4">
                              {week.instructors.map((instructor, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
                                >
                                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold/50 shrink-0">
                                    <Image
                                      src={instructor.image || "/placeholder.svg"}
                                      alt={instructor.name}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium text-brand-teal">{instructor.name}</p>
                                    <p className="text-xs text-gray-500">{instructor.title}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
              <p className="text-xs text-gray-500 text-center">共 {calendarData.length} 週</p>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE: Pass isAnyModalOpen to hide bottom bar when modals are open */}
      <StickyBottomBar scrollToPricing={scrollToPricing} isHidden={isAnyModalOpen} isInFreeSection={isInFreeSection} />
      <FloatingSocialButtons />
    </main>
  )
}
