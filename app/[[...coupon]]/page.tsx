"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import {
  ChevronDown,
  ChevronUp,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { usePricing } from "@/contexts/pricing-context"
import { AnnouncementBar } from "@/components/announcement-bar"
import { StickyBottomBar } from "@/components/sticky-bottom-bar"
import { FloatingSocialButtons } from "@/components/floating-social-buttons"
import { Footer } from "@/components/footer"
import { PricingSection } from "@/components/sections/pricing-section"

// Above-fold sections (loaded immediately)
import { HeroSection } from "@/components/sections/hero-section"
import { GalleryModal } from "@/components/ui/gallery-modal"
import { WeekDetailModal } from "@/components/ui/week-detail-modal"
import { CourseHighlightsSection } from "@/components/sections/course-highlights-section"
import { PainPointsSection } from "@/components/sections/pain-points-section"
import { KeyFeaturesSection } from "@/components/sections/key-features-section"
import { TestimonialsStrip } from "@/components/sections/testimonials-strip"

// V2 Learning Map Components
import { LearningMapSectionV2 } from "@/components/sections/learning-map-section-v2"
import { CourseDetailModal } from "@/components/ui/course-detail-modal"
import { WeeklyScheduleModal } from "@/components/ui/weekly-schedule-modal"

// Below-fold sections (loaded lazily for better initial performance)
const FAQSection = dynamic(() => import("@/components/sections/faq-section"), {
  ssr: true,
})
const SuccessStoriesSection = dynamic(
  () => import("@/components/sections/success-stories-section").then((mod) => mod.SuccessStoriesSection),
  { ssr: true }
)
const FreeLectureSection = dynamic(
  () => import("@/components/sections/free-lecture-section").then((mod) => mod.FreeLectureSection),
  { ssr: true }
)
const EcosystemSection = dynamic(
  () => import("@/components/sections/ecosystem-section").then((mod) => mod.EcosystemSection),
  { ssr: true }
)

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
import { calendarData, getPhaseColor, getTrackColor, getInstructorsByNames, remoteJobPhaseContent, freelancePhaseContent, type CalendarWeek } from "@/data/calendar"
import { stagePhotos } from "@/data/stage-photos"
import { instructors } from "@/data/instructors"



export default function LandingPage({ params }: { params: { coupon?: string | string[] } }) {
  const [couponCode, setCouponCode] = useState<string | null>(null)
  const [selectedWeek, setSelectedWeek] = useState<CalendarWeek | null>(null)
  const [activeCalendarTab, setActiveCalendarTab] = useState<"schedule" | "instructors" | "principal">("instructors")
  const [selectedInstructor, setSelectedInstructor] = useState<typeof instructors[0] | null>(null)

  // V2 Modal states
  const [isCourseDetailModalOpen, setIsCourseDetailModalOpen] = useState(false)
  const [isWeeklyScheduleModalOpen, setIsWeeklyScheduleModalOpen] = useState(false)

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
  const [emailPopupOpen, setEmailPopupOpen] = useState(false)



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
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set())
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set())

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
    highlightPopup.isOpen ||
    isCourseDetailModalOpen ||
    isWeeklyScheduleModalOpen

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





  return (
    <main className="min-h-screen bg-white pb-24 md:pb-0">
      <AnnouncementBar scrollToPricing={scrollToPricing} onEmailSubscribe={() => setEmailPopupOpen(true)} />
      {/* SECTION 1 HERO */}
      <HeroSection />

      {/* TESTIMONIALS STRIP - social proof above fold */}
      <TestimonialsStrip />
      {/* SECTION 2 COURSE HIGHLIGHTS - 正在尋找「下一步」的你 */}
      <CourseHighlightsSection />
      {/* SECTION 3 PAIN POINTS - 三大痛點 */}
      <PainPointsSection />
      {/* SECTION 2.1 COURSE HIGHLIGHTS CONTINUED (Part 2: 三大亮點) */}
      <KeyFeaturesSection />

      {/* SECTION 5 INSTRUCTORS - 師資 (currently hidden, use <InstructorsSection instructors={instructors} /> to enable) */}
      
      {/* NEW V2 LEARNING MAP - 課程概覽（新版） */}
      <LearningMapSectionV2
        onOpenCourseDetail={() => setIsCourseDetailModalOpen(true)}
        onOpenWeeklySchedule={() => setIsWeeklyScheduleModalOpen(true)}
      />

      {/* SECTION: 講師與課表 */}
      <section className="py-16 sm:py-20 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 講師與課表 Tab Section */}
          <div id="course-and-instructors" className="scroll-mt-24">
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-teal mb-3">講師與課表</h3>
              <p className="text-sm text-brand-text/80">看看每週三晚間八點到十點，具體在做什麼</p>
            </div>
            {/* Tab Navigation */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-brand-offwhite rounded-full p-1 border border-brand-mist">
                <button
                  onClick={() => setActiveCalendarTab("instructors")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCalendarTab === "instructors"
                      ? "bg-brand-teal text-white shadow-sm"
                      : "text-brand-text/80 hover:text-brand-teal"
                  }`}
                >
                  講師介紹
                </button>
                <button
                  onClick={() => setActiveCalendarTab("schedule")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCalendarTab === "schedule"
                      ? "bg-brand-teal text-white shadow-sm"
                      : "text-brand-text/80 hover:text-brand-teal"
                  }`}
                >
                  課表
                </button>
                <button
                  onClick={() => setActiveCalendarTab("principal")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCalendarTab === "principal"
                      ? "bg-brand-teal text-white shadow-sm"
                      : "text-brand-text/80 hover:text-brand-teal"
                  }`}
                >
                  校長介紹
                </button>
              </div>
            </div>

            {/* Tab Content: Instructors */}
            {activeCalendarTab === "instructors" && (
              <div className="animate-in fade-in duration-300">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {(() => {
                    const calendarInstructorNames = new Set(
                      calendarData.flatMap((week) => week.instructorNames)
                    )
                    const filteredInstructors = instructors
                      .filter((instructor) => calendarInstructorNames.has(instructor.name) && instructor.name !== "校長哈利")
                    
                    // 計算需要多少個佔位卡片（目標 12 位講師）
                    const placeholderCount = Math.max(0, 12 - filteredInstructors.length)
                    
                    return (
                      <>
                        {filteredInstructors.map((instructor) => (
                          <div
                            key={instructor.name}
                            className="flex flex-col items-center p-4 bg-white rounded-xl border border-brand-mist/50 hover:border-brand-gold hover:shadow-md transition-all duration-300 cursor-pointer group"
                            onClick={() => setSelectedInstructor(instructor)}
                          >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 border-brand-gold/30 group-hover:border-brand-gold transition-colors mb-3">
                              <Image
                                src={instructor.image || "/placeholder.svg"}
                                alt={instructor.name}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="text-sm font-semibold text-brand-teal text-center mb-1">
                              {instructor.name}
                            </h4>
                            <p className="text-xs text-brand-text/80 text-center line-clamp-2 mb-2">
                              {instructor.title}
                            </p>
                            <button className="text-xs text-brand-gold hover:text-brand-teal transition-colors font-medium">
                              查看詳情
                            </button>
                          </div>
                        ))}
                        {/* 佔位卡片 */}
                        {Array.from({ length: Math.min(placeholderCount, 3) }).map((_, index) => (
                          <div
                            key={`placeholder-${index}`}
                            className="flex flex-col items-center justify-center p-4 bg-brand-offwhite/50 rounded-xl border-2 border-dashed border-brand-mist"
                          >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-brand-mist/30 flex items-center justify-center mb-3">
                              <span className="text-3xl text-brand-mist">?</span>
                            </div>
                            <h4 className="text-sm font-medium text-brand-text/40 text-center">
                              即將公佈
                            </h4>
                          </div>
                        ))}
                      </>
                    )
                  })()}
                </div>
                {/* 底部提示 */}
                <div className="text-center mt-6">
                  <p className="text-sm text-brand-gold font-medium">講師陣容持續更新中...</p>
                </div>
              </div>
            )}

            {/* Tab Content: Schedule */}
            {activeCalendarTab === "schedule" && (
              <div className="space-y-4">
                {(() => {
                  const phases = ["藍圖與目標", "定位與門面", "機會與轉化", "永續"]
                  const phaseDescriptions: Record<string, string> = {
                    藍圖與目標: "先知道你要往哪裡走",
                    定位與門面: "把你整理成別人看得懂的樣子",
                    機會與轉化: "開始讓曝光、投遞與合作變成機會",
                    永續: "找到工作不是終點，走得久才是",
                  }
                  const phaseMonths: Record<string, string> = {
                    藍圖與目標: "5 月",
                    定位與門面: "6 月",
                    機會與轉化: "7 月",
                    永續: "8–9 月",
                  }

                  // 漸變色階：5月最淺 → 8-9月最深（與 V2 學習地圖一致）
                  const phaseGradients = ["bg-[#3d8b8b]", "bg-[#357878]", "bg-[#2d6565]", "bg-[#255454]"]

                  return phases.map((phase, phaseIndex) => {
                    const phaseWeeks = calendarData.filter((week) => week.phase === phase)
                    if (phaseWeeks.length === 0) return null
                    const isExpanded = expandedPhases.has(phase)

                    return (
                      <div key={phase} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <button
                          onClick={() => {
                            const newSet = new Set(expandedPhases)
                            if (newSet.has(phase)) {
                              newSet.delete(phase)
                            } else {
                              newSet.add(phase)
                            }
                            setExpandedPhases(newSet)
                          }}
                          className={`w-full flex items-center justify-between p-5 text-left transition-colors ${phaseGradients[phaseIndex]} text-white hover:brightness-110`}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-base sm:text-lg font-bold mb-1">
                              <span className="text-brand-gold font-medium">{phaseMonths[phase]}</span>{" "}
                              {phase}
                            </p>
                            <p className="text-sm text-white/85">{phaseDescriptions[phase]}</p>
                          </div>
                          <div className="flex items-center gap-2 text-white/90 flex-shrink-0 ml-4">
                            <span className="text-xs">{isExpanded ? "收合" : "展開"}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="p-4 bg-white border-x border-b border-brand-mist/50 rounded-b-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {phaseWeeks.map((week) => {
                                const weekInstructors = getInstructorsByNames(week.instructorNames)
                                return (
                                  <div
                                    key={week.id}
                                    className="bg-white rounded-lg p-4 border border-brand-mist/30 hover:border-brand-gold/50 hover:shadow-sm transition-all cursor-pointer"
                                    onClick={() => setSelectedWeek(week)}
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs text-brand-text/80">{week.monthWeek}</span>
                                      <span
                                        className={`text-xs px-2 py-0.5 rounded-full ${
                                          week.track === "全體共同"
                                            ? "bg-brand-teal/10 text-brand-teal"
                                            : week.track === "遠端上班線"
                                              ? "bg-blue-100 text-blue-700"
                                              : "bg-brand-gold/10 text-brand-gold"
                                        }`}
                                      >
                                        {week.track}
                                      </span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-brand-teal mb-2">{week.title}</h4>
                                    <p className="text-xs text-brand-text/80 line-clamp-2 mb-3">{week.focusShort}</p>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full overflow-hidden border border-brand-mist">
                                          <Image
                                            src={weekInstructors[0]?.image || "/placeholder.svg"}
                                            alt={weekInstructors[0]?.name || "講師"}
                                            width={24}
                                            height={24}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        <span className="text-xs text-brand-text/80">
                                          {weekInstructors[0]?.name === "講師確認中"
                                            ? "待公開"
                                            : weekInstructors[0]?.name}
                                        </span>
                                      </div>
                                      <ChevronRight className="w-4 h-4 text-brand-text/40" />
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })
                })()}
              </div>
            )}

            {/* Tab Content: Principal */}
            {activeCalendarTab === "principal" && (
              <div className="animate-in fade-in duration-300">
                {(() => {
                  const principal = instructors.find((i) => i.name === "校長哈利")
                  if (!principal) return null
                  return (
                    <div className="max-w-2xl mx-auto">
                      <div className="bg-white rounded-2xl shadow-sm border border-brand-mist/50 overflow-hidden">
                        <div className="bg-gradient-to-br from-brand-teal to-brand-teal/80 pt-8 pb-16 px-6 text-center">
                          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                            <Image
                              src={principal.image || "/placeholder.svg"}
                              alt={principal.name}
                              width={112}
                              height={112}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-1">Harry</h3>
                          <p className="text-white/80 text-sm">DigitalNomadsTaiwan 創辦人暨執行長</p>
                        </div>
                        <div className="px-6 py-6 -mt-8">
                          <div className="bg-brand-offwhite rounded-xl p-5 mb-5">
                            <h4 className="text-sm font-semibold text-brand-teal mb-3">關於校長</h4>
                            <p className="text-sm text-brand-text/80 leading-relaxed">
                              Harry 是數位遊牧台灣（DigitalNomadsTaiwan）創辦人暨執行長，也是遠距遊牧學院校長。畢業後，曾跨足不同產業與多元遠端工作角色，其中也包含跨國人資產業的第一線經驗。這段歷程讓他從產業端更早看見：遠距工作、全球人才流動與更彈性的職涯模式，正在快速崛起，並逐漸成為新世代的重要趨勢。
                            </p>
                            <p className="text-sm text-brand-text/80 leading-relaxed mt-3">
                              此後，他持續投入數位遊牧社群的經營、活動策劃與國際交��。也正因為在一次次真實的交流、相遇與陪伴中，看見許多人對自由職涯的嚮往、卡點與轉變，他更加確信：比起只提供靈感與想像，真正重要的，是一套能幫助人逐步行動、持續前進的學習路線。這也成為遠距遊牧學院持續發展的核心方向。
                            </p>
                            <p className="text-sm text-brand-text/80 leading-relaxed mt-3">
                              品牌成立以來，已累積舉辦超過 50 場線下活動，吸引超過 1800 人次付費參與，其中近一半來自口碑推薦。作為遠距遊牧學院校長，Harry 希望做的，不只是分享理念，而是陪伴更多人把對自由的想像，轉化成可以一步步開始的職涯路線。
                            </p>
                          </div>
                          <div className="bg-brand-offwhite rounded-xl p-5 mb-5">
                            <h4 className="text-sm font-semibold text-brand-teal mb-3">職涯背景</h4>
                            <ul className="text-sm text-brand-text/80 space-y-2">
                              <li className="flex items-start gap-2">
                                <span className="text-brand-gold mt-1">•</span>
                                <span>數位遊牧台灣／創辦人暨執行長</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-brand-gold mt-1">•</span>
                                <span>遠距遊牧學院／創辦人兼校長</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-brand-gold mt-1">•</span>
                                <span>跨國人力資源外商 / 全遠端商務開發</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-brand-gold mt-1">•</span>
                                <span>新創加速器 / 遠端PM</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-brand-gold mt-1">•</span>
                                <span>科技新創 / 遠端外部營運顧問</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-brand-offwhite rounded-xl p-5">
                            <h4 className="text-sm font-semibold text-brand-teal mb-3">數位遊牧相關經歷</h4>
                            <ul className="text-sm text-brand-text/80 space-y-2">
                              <li className="flex items-start gap-2">
                                <span className="text-brand-gold mt-1">•</span>
                                <span>2025 Vietnam Nomad Fest／講者</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-brand-gold mt-1">•</span>
                                <span>2025 Kozarocks 遊牧對談台灣講者</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-brand-gold mt-1">•</span>
                                <span>2024 Japan Okinawa Nomad Resort／台灣宣傳大使</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-brand-gold mt-1">•</span>
                                <span>2024 Japan Colive Fukuoka／講者</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-brand-gold mt-1">•</span>
                                <span>2024 Asian Nomad Alliance Summit／台灣代表</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}
          </div>
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
            <p className="text-sm sm:text-base text-brand-text/80">
              {'遠距職涯 x 遠端接案 — 一套從定位到落地的完整行動系統'}
            </p>
          </div>

          {/* Block 1: Growth System (desktop only - merged into Block 2 on mobile) */}
          <div className="hidden md:block mb-4">
            <h4 className="font-bold text-brand-teal text-lg lg:text-xl mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-brand-gold"></span>
              {'一套「把能力變成機會」的成長系統'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 border border-brand-mist/50 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-brand-teal flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{'01'}</span>
                  </div>
                  <h5 className="font-bold text-brand-teal text-base lg:text-lg">{'當屆五個月完整課程'}</h5>
                </div>
                <p className="text-brand-text/80 text-sm lg:text-base leading-relaxed pl-[52px]">
                  {'聚焦遠距求職與接案兩條路，從目標、定位到落地流程（直播 / 回放一年）'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-brand-mist/50 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-brand-teal flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{'02'}</span>
                  </div>
                  <h5 className="font-bold text-brand-teal text-base lg:text-lg">{'作業與落地任務'}</h5>
                </div>
                <p className="text-brand-text/80 text-sm lg:text-base leading-relaxed pl-[52px]">
                  {'每堂正課都要交付 — 一步步把你推到「可以展示 / 被詢問」的狀態'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-brand-mist/50 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-brand-teal flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{'03'}</span>
                  </div>
                  <h5 className="font-bold text-brand-teal text-base lg:text-lg">{'成長節奏'}</h5>
                </div>
                <p className="text-brand-text/80 text-sm lg:text-base leading-relaxed pl-[52px]">
                  {'固定課表、線上同學會 / 團體 QA / DemoDay，互相學習、彼此督促跟上進度'}
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
                <h4 className="font-bold text-brand-teal text-lg lg:text-xl">{'你會做出什麼成果'}</h4>
                <div className="flex gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-brand-gold/15 text-brand-clay font-medium">{'可展示'}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-brand-gold/15 text-brand-clay font-medium">{'可投遞'}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-brand-gold/15 text-brand-clay font-medium">{'可成交'}</span>
                </div>
              </div>
              {/* 展開/收合按鈕 — 兩端都顯示 */}
              <div className="flex items-center gap-1.5 text-brand-text/80 flex-shrink-0 ml-3">
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
                      <span className="font-semibold text-brand-teal text-sm">{'當屆五個月完整課程'}</span>
                      <span className="text-brand-text/80 text-xs">{' — 聚焦遠距求職與接案兩條路，從目標、定位到落地流程（直播 / 回放一年）'}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-teal font-bold text-xs mt-0.5 flex-shrink-0">{'02'}</span>
                    <div>
                      <span className="font-semibold text-brand-teal text-sm">{'作業與落地任務'}</span>
                      <span className="text-brand-text/80 text-xs">{' — 每堂正課都要交付，一步步把你推到「可以展示 / 被詢問」的狀態'}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-teal font-bold text-xs mt-0.5 flex-shrink-0">{'03'}</span>
                    <div>
                      <span className="font-semibold text-brand-teal text-sm">{'成長節奏'}</span>
                      <span className="text-brand-text/80 text-xs">{' — 固定課表、線上同學會 / 團體 QA / DemoDay，互相學習、彼此督促跟上進度'}</span>
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
              <ul className="space-y-5 md:mt-4">
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold flex-shrink-0 mt-0.5 font-bold text-base md:text-lg">{'✔'}</span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm md:text-base lg:text-lg">{'定位與可能性：遠距路線決策 & 啟動目標'}</span>
                    <p className="text-brand-text/80 text-sm md:text-base mt-1">{'— 釐清你要的自由是什麼（時間／地點／收入），並選定「上班線／接案線／雙軌」的起跑方向及目標'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold flex-shrink-0 mt-0.5 font-bold text-base md:text-lg">{'✔'}</span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm md:text-base lg:text-lg">{'對外門面與信任：一套讓人秒懂專業與價值的門面'}</span>
                    <p className="text-brand-text/80 text-sm md:text-base mt-1">{'— 把你的能力、案例、價值主張整理成：LinkedIn／提案頁 / 作品集的關鍵內容與結構'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold flex-shrink-0 mt-0.5 font-bold text-base md:text-lg">{'✔'}</span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm md:text-base lg:text-lg">{'接觸與轉化：把「接觸」變成「機會」的可擴增系統'}</span>
                    <div className="mt-1.5 space-y-1">
                      <p className="text-brand-text/80 text-sm md:text-base">{'— 上班線：JD 拆解 → 客製化履歷 → 面試 & 談薪策略'}</p>
                      <p className="text-brand-text/80 text-sm md:text-base">{'— 接案線：社群內容策略 → 作品呈現 → 獲客管道 → 成交流程'}</p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold flex-shrink-0 mt-0.5 font-bold text-base md:text-lg">{'✔'}</span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm md:text-base lg:text-lg">{'留任與永續：交付的「點 > 線 > 面」永續結構'}</span>
                    <p className="text-brand-text/80 text-sm md:text-base mt-1">{'— 在前期合作能活下來並能持續成長的方法'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-gold flex-shrink-0 mt-0.5 font-bold text-base md:text-lg">{'✔'}</span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm md:text-base lg:text-lg">{'DemoDay 發表：把行動證明公開呈現'}</span>
                    <p className="text-brand-text/80 text-sm md:text-base mt-1">{'— 讓你完成一次真正的「交付」與「曝光」，也讓機會更容易找上門'}</p>
                  </div>
                </li>
              </ul>

              {/* 結果畫面層 — 讓讀者看到「自己變成什麼樣的人」 */}
              <div className="mt-6 p-5 sm:p-6 rounded-xl bg-brand-gold/10 border border-brand-gold/20">
                <p className="text-sm md:text-base text-brand-clay font-medium mb-4 tracking-wide">{'結業後的你'}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold mt-0.5 flex-shrink-0 text-lg">{'"'}</span>
                    <p className="text-sm md:text-base text-brand-text leading-relaxed">
                      {'你不再只是羨慕別人遠距，而是'}
                      <span className="font-semibold text-brand-teal">{'你也在路上，開始有自己的遠距職涯門面'}</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold mt-0.5 flex-shrink-0 text-lg">{'"'}</span>
                    <p className="text-sm md:text-base text-brand-text leading-relaxed">
                      {'你不再只是想接案，而是'}
                      <span className="font-semibold text-brand-teal">{'開始有第一版可拿去接觸市場的作品與 offer'}</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-gold mt-0.5 flex-shrink-0 text-lg">{'"'}</span>
                    <p className="text-sm md:text-base text-brand-text leading-relaxed">
                      {'你不再只是看內容，而是'}
                      <span className="font-semibold text-brand-teal">{'開始留下履歷、提案、內容、DemoDay 這些能被看見的痕跡'}</span>
                    </p>
                  </li>
                </ul>
              </div>

<p className="mt-6 pt-5 border-t border-brand-mist/50 text-center text-sm md:text-base font-bold text-brand-clay">
{'你的目標是「開始更容易拿到遠距工作 / 接案機會」。'}
              </p>
            </div>
          </details>

          {/* Block: 兩條路線的具體能力培養 — HIDDEN（內容尚未定稿，暫不公開；要重新顯示把此條件改回 true 或移除條件包裹） */}
          {false && (
            <div className="mb-3 bg-white rounded-2xl border border-brand-mist/50 shadow-sm overflow-hidden">
              <div className="p-5 sm:px-8 sm:py-6 border-b border-brand-mist/30">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-1.5 h-6 rounded-full bg-brand-gold flex-shrink-0"></span>
                  <h4 className="font-bold text-brand-teal text-base sm:text-lg lg:text-xl">{'兩條路線的具體能力培養'}</h4>
                  <span className="text-xs px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal font-medium">{'按階段推進，看得見的進展'}</span>
                </div>
              </div>

              <div className="px-5 pb-5 sm:px-8 sm:pb-8 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* 遠端上班線 */}
                  <div>
                    <h5 className="font-bold text-brand-teal text-base md:text-lg pb-3 mb-4 border-b-2 border-brand-teal/20">
                      {'遠端上班線'}
                    </h5>
                    <div className="space-y-5">
                      {remoteJobPhaseContent.map((phase, idx) => {
                        const monthLabels = ["5月", "6月", "7月", "8-9月"]
                        return (
                          <div key={phase.phase}>
                            <p className="font-semibold text-brand-teal text-sm md:text-base mb-2">
                              <span className="text-brand-gold mr-2">{monthLabels[idx]}</span>
                              {phase.phase}
                            </p>
                            <ul className="space-y-1.5">
                              {phase.outcomes.map((outcome, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-brand-text/80 leading-relaxed">
                                  <span className="text-brand-gold flex-shrink-0 mt-0.5">{'•'}</span>
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 接案線 */}
                  <div>
                    <h5 className="font-bold text-brand-teal text-base md:text-lg pb-3 mb-4 border-b-2 border-brand-teal/20">
                      {'接案線'}
                    </h5>
                    <div className="space-y-5">
                      {freelancePhaseContent.map((phase, idx) => {
                        const monthLabels = ["5月", "6月", "7月", "8-9月"]
                        return (
                          <div key={phase.phase}>
                            <p className="font-semibold text-brand-teal text-sm md:text-base mb-2">
                              <span className="text-brand-gold mr-2">{monthLabels[idx]}</span>
                              {phase.phase}
                            </p>
                            <ul className="space-y-1.5">
                              {phase.outcomes.map((outcome, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-brand-text/80 leading-relaxed">
                                  <span className="text-brand-gold flex-shrink-0 mt-0.5">{'•'}</span>
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Block 3: Alumni Status — collapsible */}
          <details className="group/alumni mb-3 bg-brand-offwhite/80 rounded-2xl border border-brand-gold/30 shadow-sm overflow-hidden">
            <summary className="flex items-center justify-between p-5 sm:p-8 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-brand-gold/5 transition-colors">
              <div className="flex items-center gap-3 flex-wrap">
                <h4 className="font-bold text-brand-teal text-base sm:text-lg lg:text-xl">{'校友資格'}</h4>
                <span className="text-xs px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal font-medium">{'入學即擁有，結業後延續'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-brand-text/80 flex-shrink-0 ml-3">
                <span className="text-xs sm:text-sm group-open/alumni:hidden">展開</span>
                <span className="text-xs sm:text-sm hidden group-open/alumni:inline">收合</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-open/alumni:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </summary>

            <div className="px-5 pb-5 sm:px-8 sm:pb-8 border-t border-brand-gold/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div className="flex items-start gap-3 bg-white/60 rounded-xl p-5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm md:text-base block mb-1">{'校友 Skool 社群永久留存'}</span>
                    <p className="text-brand-text/80 text-xs md:text-sm leading-relaxed">{'畢業後不用搬家，仍在同一個社群交流（當屆專區僅當屆可見）'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/60 rounded-xl p-5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm md:text-base block mb-1">{'已購內容回放觀看'}</span>
                    <p className="text-brand-text/80 text-xs md:text-sm leading-relaxed">{'你買過課程(學院正課有一年限制)的回放與學習資源訪問權限'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/60 rounded-xl p-5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm md:text-base block mb-1">{'校友 LinkedIn 群'}</span>
                    <p className="text-brand-text/80 text-xs md:text-sm leading-relaxed">{'僅限學員與校友加入，職涯拓展與合作'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/60 rounded-xl p-5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-brand-teal text-sm md:text-base block mb-1">{'全產品校友價'}</span>
                    <p className="text-brand-text/80 text-xs md:text-sm leading-relaxed">{'下屆學院 / Journey 旅程 / 工作坊與線下聚會 / 合作夥伴福利（依公告）'}</p>
                  </div>
                </div>
              </div>

              {/* Co-creation card */}
              <div className="mt-5 bg-white/60 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <h5 className="font-semibold text-brand-teal text-sm md:text-base">{'共創與參與權'}</h5>
                  <span className="text-sm md:text-base px-4 py-1.5 rounded-full bg-brand-gold/20 text-brand-clay font-semibold">{'把圈子變成機會場'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-brand-teal text-sm md:text-base block mb-1">{'共創專案'}</span>
                      <p className="text-brand-text/80 text-xs md:text-sm leading-relaxed">{'可優先參與、可共同發起（讀書會、實戰企劃、工具共學、Builder 實習等）'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-brand-teal text-sm md:text-base block mb-1">{'許願池'}</span>
                      <p className="text-brand-text/80 text-xs md:text-sm leading-relaxed">{'定期提案 / 投票，讓學院資源與活動更貼近你的需求'}</p>
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
            <p className="text-[10px] sm:text-xs text-brand-text/80 mb-5">{'在學期間有效，不需另外加購'}</p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0 text-sm font-bold text-brand-gold">{'1'}</span>
                <div>
                  <p className="text-sm font-medium text-brand-teal">
                    {'付費講座、工作坊折扣'}
                    <span className="text-brand-text/80 font-normal text-xs ml-1.5">{'每月至少一場'}</span>
                  </p>
                  <p className="text-xs text-brand-text/80 mt-0.5">{'參加到 1.5 場就回本'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0 text-sm font-bold text-brand-gold">{'2'}</span>
                <div>
                  <p className="text-sm font-medium text-brand-teal">
                    {'合作夥伴 / 活動優惠搶先看'}
                  </p>
                  <p className="text-xs text-brand-text/80 mt-0.5">{'訂閱會員限��的合作夥伴優惠與活動搶先通知'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-brand-gold/15 flex items-center justify-center flex-shrink-0 text-sm font-bold text-brand-gold">{'3'}</span>
                <div>
                  <p className="text-sm font-medium text-brand-teal">
                    {'世界遊牧資訊'}
                    <span className="text-brand-text/80 font-normal text-xs ml-1.5">{'趨勢整理 + 活動情報'}</span>
                  </p>
                  <p className="text-xs text-brand-text/80 mt-0.5">{'遠距工作市場趨勢、工具更新、海內外活動情報'}</p>
                </div>
              </div>
            </div>

            <p className="mt-5 pt-3 border-t border-brand-teal/10 text-xs text-brand-text/80 text-center">{'結業後若想持續使用，可再自行續訂 Premium。'}</p>
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

      {/* CLOSING CTA */}
      <section className="relative py-16 sm:py-20 bg-brand-teal overflow-hidden">
        {/* 裝飾圓圈 - 呼應 Hero 與見證區 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] border border-brand-gold/15 rounded-full" />
          <div className="absolute -bottom-40 -left-32 w-[480px] h-[480px] border border-brand-gold/10 rounded-full" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-balance">
            {'看完還有疑問？'}
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed text-pretty">
            來講座現場直接問校長，順便認識下一屆同學
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#free-lecture-section"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("free-lecture-section")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-teal font-bold text-base px-7 py-3.5 rounded-full hover:bg-[#c9a673] transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              免費卡位講座
              <span aria-hidden>{'→'}</span>
            </a>
            <a
              href="https://lin.ee/r7kh3fX"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:text-brand-gold hover:border-brand-gold/60 font-medium text-sm px-6 py-3.5 rounded-full transition-colors duration-200"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738S0 4.935 0 10.304c0 4.813 4.27 8.846 10.035 9.608.391.084.923.258 1.058.592.121.303.079.779.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967C22.802 14.988 24 12.801 24 10.304zM7.632 13.286H5.237a.636.636 0 01-.636-.635V8.12a.636.636 0 111.272 0v3.895h1.759a.636.636 0 110 1.271zm2.459-.635a.636.636 0 11-1.272 0V8.12a.636.636 0 111.272 0v4.531zm5.504 0a.636.636 0 01-.436.603.64.64 0 01-.2.032.634.634 0 01-.508-.254l-2.339-3.181v2.8a.636.636 0 11-1.271 0V8.12a.634.634 0 01.436-.603.632.632 0 01.7.222l2.347 3.184v-2.8a.636.636 0 111.271 0v4.528zm3.675-2.9a.636.636 0 110 1.272h-1.759v1.12h1.759a.635.635 0 110 1.27h-2.395a.635.635 0 01-.635-.635v-4.53a.636.636 0 01.635-.636h2.395a.636.636 0 110 1.272h-1.759v1.12h1.759v-.253z" />
              </svg>
              加入 Line 官方
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* GALLERY MODAL */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        photos={stagePhotos[currentStage] || []}
        currentIndex={currentPhotoIndex}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />

      {/* EMAIL SUBSCRIPTION POPUP - GHL Form */}
      {emailPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="訂閱電子報"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEmailPopupOpen(false)} />
          {/* Modal */}
          <div
            className="relative z-10 w-full max-w-[calc(100vw-16px)] sm:max-w-lg bg-brand-teal rounded-2xl shadow-2xl"
            style={{ overflow: "hidden" }}
          >
            {/* Close button */}
            <button
              onClick={() => setEmailPopupOpen(false)}
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
              aria-label="關閉"
            >
              <X className="w-4 h-4" />
            </button>
            {/* GHL form embed container */}
            <div className="h-[430px] overflow-hidden rounded-[20px]">
              <iframe
                src="https://link.digitalnomadstaiwan.com/widget/form/MpJ0wDqzBLszazx5vVRy"
                style={{ width: "100%", height: "100%", border: "none", borderRadius: "20px" }}
                id="inline-MpJ0wDqzBLszazx5vVRy-announcement"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="遠距遊牧學院 - 表單"
                data-height="430"
                data-layout-iframe-id="inline-MpJ0wDqzBLszazx5vVRy-announcement"
                data-form-id="MpJ0wDqzBLszazx5vVRy"
                title="遠距遊牧學院 - 表單"
              ></iframe>
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

{/* WEEK DETAIL MODAL */}
<WeekDetailModal week={selectedWeek} onClose={() => setSelectedWeek(null)} />

{/* INSTRUCTOR DETAIL MODAL */}
{selectedInstructor && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
    onClick={() => setSelectedInstructor(null)}
  >
    <div
      className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 fade-in duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="relative bg-gradient-to-br from-brand-teal to-brand-teal/80 pt-8 pb-16 px-6 text-center">
        <button
          onClick={() => setSelectedInstructor(null)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
          <Image
            src={selectedInstructor.image || "/placeholder.svg"}
            alt={selectedInstructor.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{selectedInstructor.name}</h3>
        <p className="text-white/80 text-sm">{selectedInstructor.title}</p>
      </div>

      {/* Content */}
      <div className="px-6 py-6 -mt-8 relative z-10">
        <div className="bg-brand-offwhite rounded-xl p-4 mb-4">
          <h4 className="text-sm font-semibold text-brand-teal mb-2">講師介紹</h4>
          <p className="text-sm text-brand-text/80 leading-relaxed whitespace-pre-line">
            {selectedInstructor.background}
          </p>
        </div>

        {/* Social Links */}
        {selectedInstructor.links && Object.keys(selectedInstructor.links).length > 0 && (
          <div className="bg-brand-offwhite rounded-xl p-4 mb-4">
            <h4 className="text-sm font-semibold text-brand-teal mb-3">社群連結</h4>
            <div className="flex flex-wrap gap-3">
              {selectedInstructor.links.website && (
                <a
                  href={selectedInstructor.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-brand-mist/50 hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-colors"
                >
                  <svg className="w-4 h-4 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="text-sm font-medium text-brand-teal">網站</span>
                </a>
              )}
              {selectedInstructor.links.linkedin && (
                <a
                  href={selectedInstructor.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-brand-mist/50 hover:border-[#0077B5]/50 hover:bg-[#0077B5]/5 transition-colors"
                >
                  <svg className="w-4 h-4 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-sm font-medium text-[#0077B5]">LinkedIn</span>
                </a>
              )}
              {selectedInstructor.links.instagram && (
                <a
                  href={selectedInstructor.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-brand-mist/50 hover:border-[#E4405F]/50 hover:bg-[#E4405F]/5 transition-colors"
                >
                  <svg className="w-4 h-4 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-sm font-medium text-[#E4405F]">Instagram</span>
                </a>
              )}
              {selectedInstructor.links.facebook && (
                <a
                  href={selectedInstructor.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-brand-mist/50 hover:border-[#1877F2]/50 hover:bg-[#1877F2]/5 transition-colors"
                >
                  <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium text-[#1877F2]">Facebook</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Instructor's Courses */}
        {(() => {
          const instructorCourses = calendarData.filter((week) =>
            week.instructorNames.includes(selectedInstructor.name)
          )
          if (instructorCourses.length === 0) return null
          return (
            <div className="bg-brand-offwhite rounded-xl p-4">
              <h4 className="text-sm font-semibold text-brand-teal mb-3">負責課程</h4>
              <div className="space-y-3">
                {instructorCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg p-3 border border-brand-mist/50"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-brand-gold font-medium">{course.monthWeek}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-brand-mist/50 text-brand-teal">
                        {course.track}
                      </span>
                    </div>
                    <h5 className="text-sm font-semibold text-brand-teal mb-1">{course.title}</h5>
                    <p className="text-xs text-brand-text/80">{course.focusShort}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        })()}
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <button
          onClick={() => setSelectedInstructor(null)}
          className="w-full py-3 bg-brand-teal text-white rounded-full font-medium hover:bg-brand-teal/90 transition-colors"
        >
          關閉
        </button>
      </div>
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

      {/* V2 Course Detail Modal */}
      <CourseDetailModal
        isOpen={isCourseDetailModalOpen}
        onClose={() => setIsCourseDetailModalOpen(false)}
      />

      {/* V2 Weekly Schedule Modal */}
      <WeeklyScheduleModal
        isOpen={isWeeklyScheduleModalOpen}
        onClose={() => setIsWeeklyScheduleModalOpen(false)}
      />

      {/* CHANGE: Pass isAnyModalOpen to hide bottom bar when modals are open */}
      <StickyBottomBar scrollToPricing={scrollToPricing} isHidden={isAnyModalOpen} isInFreeSection={isInFreeSection} />
      <FloatingSocialButtons />

      {/* Hidden preload iframe for GHL form - loads in background for instant popup */}
      <iframe
        src="https://link.digitalnomadstaiwan.com/widget/form/MpJ0wDqzBLszazx5vVRy"
        className="sr-only"
        style={{ position: "absolute", width: 0, height: 0, border: "none", overflow: "hidden" }}
        tabIndex={-1}
        aria-hidden="true"
        title="Preload form"
      />
    </main>
  )
}
