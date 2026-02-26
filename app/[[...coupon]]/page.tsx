"use client"

import { useState, useEffect, useCallback, useRef, Suspense } from "react"
import Image from "next/image"
import Script from "next/script"
import {
  ChevronDown,
  ChevronUp,
  X,
  TrendingUp,
  FileText,
  Users,
  ChevronRight,
  ChevronLeft,
  Mail,
  Globe,
  Linkedin,
  Instagram,
  Facebook,
  ExternalLink,
  Layers,
} from "lucide-react" // Import social icons
import { Button } from "@/components/ui/button"
import { usePricing } from "@/contexts/pricing-context"
import { AnnouncementBar } from "@/components/announcement-bar"
import { StickyBottomBar } from "@/components/sticky-bottom-bar"
import { FloatingSocialButtons } from "@/components/floating-social-buttons" // Import FloatingSocialButtons
import { PricingSection } from "@/components/sections/pricing-section" // Import PricingSection
import FAQSection from "@/components/sections/faq-section" // Import FAQSection
import { SuccessStoriesSection } from "@/components/sections/success-stories-section"

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
import { calendarData, getPhaseColor, getTrackColor, getInstructorsByNames, type CalendarWeek } from "@/data/calendar"
import { stagePhotos } from "@/data/stage-photos"
import { instructors } from "@/data/instructors"



export default function LandingPage({ params }: { params: { coupon?: string | string[] } }) {
  const [couponCode, setCouponCode] = useState<string | null>(null)
  const [activeMapTab, setActiveMapTab] = useState<string>("遠端上班") // State for Learning Map tabs
  const [selectedWeek, setSelectedWeek] = useState<CalendarWeek | null>(null)

  // Feature dialog state
  const [featureDialogOpen, setFeatureDialogOpen] = useState<number | null>(null)
  // Add state for features data
  const featuresData = [
    {
      id: 0,
      title: "雙軌資源",
      icon: (
        <svg className="w-5 h-5 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7l4-4m0 0l4 4m-4-4v18M16 17l4 4m0 0l-4-4m4 4H4"
          />
        </svg>
      ),
      shortDesc: "這裡不是要你馬上做對選擇，而是可以開始行動起來，讓行動告訴你答案。",
      details: [
        "<strong>接案線路：</strong>幫你釐清主題定位，做出接案作品集，學會基本市場調查、內容與流量思維。",
        "<strong>遠端上班線路：</strong>認識遠端求職市場，調整履歷與 LinkedIn，練習求職信、面試與獵頭溝通。",
        "你可以雙線並進，快速全面探索。也可以先選一條當主線，讓行動開始。",
      ],
      images: [
        {
          src: "/images/e8-87-aa-e5-aa-92-e9-ab-94-e6-8e-a5-e6-a1-88-e8-b7-af-e7-b7-9a-ef-bc-bfreels-e9-87-8d-e8-a6-81-e6-8c-87-e6-a8-99.png",
          alt: "接案路線：Reels演算法重要指標",
        },
        {
          src: "/images/e4-b8-8a-e7-8f-ad-e8-b7-af-e7-b7-9a-ef-bc-bf-e9-9b-87-e4-b8-bb-e7-84-a1-e5-8b-95-e6-96-bc-e8-a1-b7.png",
          alt: "上班路線：讓雇主無動於衷的答案",
        },
      ],
    },
    {
      id: 1,
      title: "行動導向設計",
      icon: (
        <svg className="w-5 h-5 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      shortDesc: "每堂課都有做得到的行動任務，拆成模板和小步驟，不再只聽懂卻做不出來。",
      details: [
        "每堂課都對應到一個「做得到」的任務：目標設定、AI加速生產、策略定位、發一篇文、做一支影片、更新履歷、寫求職信……不是看完就結束，而是立刻動手。",
        "任務拆成學習單與模板：透過清楚的步驟與範例，帶你完成策略定位、影片腳本、JD拆解、面試 STAR 故事庫等關鍵輸出，讓行動不再只靠意志力。",
        "想走更快，可以加選實作工作坊：短影音剪輯、Coffee Chat、Vibe Coding、工作英語等選修，讓你在需要時針對性加強，把成長慾望落地成真實行動。",
        "讓你不再只是聽懂、記下來，而是 完成、留下、可以被看見。",
      ],
      images: [
        {
          src: "/images/e8-a1-8c-e5-8b-95-e5-b0-8e-e5-90-91-ef-bc-bf-e4-bb-bb-e5-8b-99-e6-8b-86-e8-a7-a3.png",
          alt: "任務拆解",
        },
        {
          src: "/images/e8-a1-8c-e5-8b-95-e5-b0-8e-e5-90-91-ef-bc-bf-e4-bd-9c-e6-a5-ad-e5-b9-b3-e5-8f-b0.png",
          alt: "作業平台",
        },
        {
          src: "/images/e8-a1-8c-e5-8b-95-e5-b0-8e-e5-90-91-ef-bc-bfvibe-20coding-20-e5-b7-a5-e4-bd-9c-e5-9d-8a-20.png",
          alt: "Vibe Coding 工作坊",
        },
      ],
    },
    {
      id: 2,
      title: "社群支持",
      icon: (
        <svg className="w-5 h-5 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      shortDesc: "線上共學＋閒聊群＋線下小聚，一路上都有人一起問、一起試、一起走，讓你撐過放棄期的結構。",
      details: [
        "不再一個人被影片追進度：大家固定出現在 Skool 線上共學空間，彼此分享卡關與成果、一起前行，讓「學習」變成日常節奏的一部分。",
        "定期線上同學會，一起打開鏡頭結識戰友。還有線上共學群組、LinkedIn 校友群組、Line 閒聊群，擁有更多不同情境的連結。",
        "線下聚會＆Nomad 活動：台北、高雄定期遊牧小聚，加上國內外遊牧啟發之旅，讓你真的遇見那些在清邁、峴港、台北之間移動的人，把遠距生活從想像變成現場。",
      ],
      images: [
        {
          src: "/images/2-1.jpeg",
          alt: "遊牧小聚",
        },
        { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e7-95-99-e8-a8-80.png", alt: "留言" },
        { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e4-ba-a4-e6-b5-81.png", alt: "交流" },
        {
          src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e4-bd-9c-e6-a5-ad-e4-ba-a4-e6-b5-81.png",
          alt: "作業交流",
        },
        { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e5-90-8c-e5-ad-b8-e6-9c-83.png", alt: "同學會" },
        {
          src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e5-90-8c-e5-ad-b8-e6-9c-83-e4-bd-9c-e6-a5-ad.png",
          alt: "同學會作業",
        },
        { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bfline-20group.png", alt: "Line Group" },
        {
          src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e8-b6-8a-e5-8d-97-e9-81-8a-e7-89-a7-e4-b9-8b-e6-97-85.jpg",
          alt: "越南遊牧之旅",
        },
      ],
    },
  ]

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
  const [expandedFeatures, setExpandedFeatures] = useState<Set<number>>(new Set()) // State for expanded features in Section 2.1
  const [expandedInstructorBios, setExpandedInstructorBios] = useState<Set<string>>(new Set())
  // Add state for dialogs
  const [openDialog, setOpenDialog] = useState<number | null>(null)

  const [pricingTimelineModalOpen, setPricingTimelineModalOpen] = useState(false)
  const [faqPriceDiffModalOpen, setFaqPriceDiffModalOpen] = useState(false)

  const isAnyModalOpen =
    isGalleryOpen ||
    selectedWeek !== null ||
    featureDialogOpen !== null ||
    openDialog !== null ||
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



  const toggleFeatureDialog = (featureId: number | null) => {
    setOpenDialog(featureId)
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
      <AnnouncementBar scrollToPricing={scrollToPricing} />
      {/* SECTION 1 HERO START */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#17464F]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] border border-[#E8C547]/30 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] border border-[#E8C547]/20 rounded-full" />
          <div className="absolute bottom-1/4 right-1/2 w-[300px] h-[300px] border border-[#E8C547]/10 rounded-full" />
          <div className="absolute bottom-0 left-0 right-0 h-40">
            <div className="absolute bottom-8 left-[10%] w-1 h-1 bg-[#E8C547] rounded-full animate-pulse" />
            <div className="absolute bottom-16 left-[20%] w-1.5 h-1.5 bg-[#E8C547]/80 rounded-full animate-pulse delay-100" />
            <div className="absolute bottom-12 left-[35%] w-1 h-1 bg-[#E8C547]/60 rounded-full animate-pulse delay-200" />
            <div className="absolute bottom-20 left-[45%] w-2 h-2 bg-[#E8C547]/70 rounded-full animate-pulse delay-300" />
            <div className="absolute bottom-6 left-[55%] w-1 h-1 bg-[#E8C547] rounded-full animate-pulse delay-150" />
            <div className="absolute bottom-14 left-[65%] w-1.5 h-1.5 bg-[#E8C547]/80 rounded-full animate-pulse delay-250" />
            <div className="absolute bottom-10 left-[75%] w-1 h-1 bg-[#E8C547]/60 rounded-full animate-pulse delay-100" />
            <div className="absolute bottom-18 left-[85%] w-1.5 h-1.5 bg-[#E8C547]/70 rounded-full animate-pulse delay-200" />
            <div className="absolute bottom-4 left-[90%] w-1 h-1 bg-[#E8C547] rounded-full animate-pulse delay-300" />
          </div>
        </div>

        <div className="absolute top-0 left-0 z-30 py-0 px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Image
              src="/images/academy-logo.png"
              alt="遠距遊牧學院 Travel with Work Academy"
              width={200}
              height={105}
              className="h-auto w-[180px] sm:w-[240px] lg:w-[360px] brightness-0 invert"
              priority
            />
            {/* Airplane trajectory dotted line */}
            <svg
              className="absolute -bottom-20 left-4 w-16 h-24 text-white/40"
              viewBox="0 0 60 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            >
              <path d="M30 0 Q 10 30, 20 50 Q 30 70, 15 100" />
            </svg>
          </div>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 lg:pt-44 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left content */}
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-wide">
                今年五月，
                <br />
                一起把「也許有一天」
                <br />
                變成「<span className="text-[#D4B483]">我也正在路上</span>」
              </h1>

              <p className="text-sm sm:text-base text-[#D4B483] font-medium tracking-wide leading-relaxed">
                {'看見可能，踏出行動。這不只是一門課，'}
                <br />
                {'而是一套要求你把行動，走成「下一步職涯能用成果」的系統。'}
              </p>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                透過線上學習、行動任務和社群支持，幫你在不停薪、不斷線的情況下，透過實際行動，找到適合自己的遠距路徑。
              </p>

              <div className="space-y-3 text-left max-w-xl mx-auto lg:mx-0">
                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-[#D4B483] mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">雙軌起步：接案 × 遠端上班，先走一條，也可雙線並進</p>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#D4B483] mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">路線清楚：把模糊的嚮往，轉成 5 個月可執行的行動藍圖</p>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#D4B483] mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">成果可展示：履歷、作品集、個人頁面，不只是學過</p>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#D4B483] mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">不是一個人：和一群真的在往自由生活前進的人同行</p>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#D4B483] mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">國際 × 線下遊牧生態系：加入連結台灣與世界的遊牧社群，從每月線下小聚到海外啟發之旅</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col gap-4 items-center lg:items-start">
                <Button
                  size="lg"
                  onClick={() => {
                    document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })
                    // Track initiate checkout event
                    if (typeof window !== "undefined" && (window as any).trackInitiateCheckout) {
                      ;(window as any).trackInitiateCheckout(0)
                    }
                  }}
                  className="bg-[#D4B483] text-[#17464F] hover:bg-[#C9A673] text-xl font-bold tracking-wider w-full sm:w-auto px-16 py-8 rounded-full whitespace-nowrap"
                >
                  五月一起開學
                </Button>
                <button
                  onClick={() => {
                    document.getElementById("course-highlights")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-white/70 hover:text-[#D4B483] font-medium text-base transition-colors duration-200"
                >
                  看看這梯次怎麼走 ↓
                </button>
              </div>

              {/* Social proof */}
              <div className="pt-4 text-center lg:text-left">
                <p className="text-sm text-white/60">
                  2025第一屆 已累積 <span className="text-[#D4B483] font-semibold">300+</span> 學員與{" "}
                  <span className="text-[#D4B483] font-semibold">1,500+</span> 線下社群參與，
                  <br className="hidden sm:block" />
                  在台灣與世界各地，把「想像」變成實際行動。
                </p>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] bg-[#C9D7D4] relative">
                  <Image
                    src="/images/hero-background.png"
                    alt="遠距工作場景 - 共同工作空間"
                    fill
                    className="object-cover"
                    priority
                    sizes="50vw"
                  />
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-full h-full border-2 border-[#D4AF37]/50 rounded-2xl pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-full h-full border border-[#D4AF37]/25 rounded-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-28 h-28 border-2 border-[#D4AF37]/40 rounded-full pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 border border-[#D4AF37]/20 rounded-full pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 2 COURSE HIGHLIGHTS START - 正在尋找「下一步」的你 */}
      <section id="course-highlights" className="py-16 sm:py-24 bg-[#17464F] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#D4B483]/20 rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-[#D4B483]/15 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-20 hidden lg:block">
          <svg className="w-8 h-8 text-[#D4B483]/30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 text-balance">
              正在尋找「下一步」的你
            </h2>
            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-4">
              不管你現在在哪個階段，你都有機會在這裡找到開始的位置。
              <br className="hidden sm:block" /> 你不一定已經決定要不要辭職、要不要成為全職 Nomad。
              <br className="hidden sm:block" />
              但你大概知道——人生不該只剩「通勤、等週末、等放假」。
            </p>
            <p className="text-[#D4B483] font-medium mt-6">你可能會在這幾種狀態裡，看見自己的影子：</p>
          </div>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {/* Card 1 - 職涯主線 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#D4B483]/30 hover:border-[#D4B483]/50 transition-all duration-300 relative group">
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4B483]/60 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4B483]/60 rounded-br-2xl" />

              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                  <svg
                    className="w-14 h-14 text-[#D4B483]"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="32" cy="32" r="20" />
                    <circle cx="32" cy="32" r="4" fill="currentColor" />
                    <path d="M32 16V12M32 52V48M16 32H12M52 32H48" strokeWidth="2" />
                    <path d="M32 32L42 22" strokeWidth="2" />
                    <text x="48" y="16" fontSize="12" fill="currentColor">
                      ?
                    </text>
                    <text x="8" y="52" fontSize="10" fill="currentColor">
                      ?
                    </text>
                  </svg>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#D4B483] mb-4 leading-snug">
                  想要更有選擇權的職涯主線
                </h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  有穩定工作、不一定討厭現在公司，但看得到天花板；正在思考能否換到更彈性、可遠距的團隊，或讓履歷在未來更有選擇。
                </p>
              </div>
            </div>

            {/* Card 2: 安全感 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#D4B483]/30 hover:border-[#D4B483]/50 transition-all duration-300 relative group">
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4B483]/60 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4B483]/60 rounded-br-2xl" />

              <div className="flex flex-col items-center text-center">
                {/* Icon - Coins */}
                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                  <svg
                    className="w-14 h-14 text-[#D4B483]"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <ellipse cx="32" cy="18" rx="20" ry="8" />
                    <path d="M12 18v12c0 4.4 8.9 8 20 8s20-3.5 20-8V18" />
                    <path d="M12 28v12c0 4.4 8.9 8 20 8s20-3.5 20-8v-12" />
                    <path d="M12 38v12c0 4.4 8.9 8 20 8s20-3.5 20-8v-12" />
                    <path d="M32 25v8M32 41v8" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 11l8 8h-16l8-8z" fill="currentColor" />
                  </svg>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#D4B483] mb-4 leading-snug">
                  想多一條安全感，不想只靠一份薪水
                </h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  想用內容、接案、知識服務慢慢累積第二條收入線；希望在不壓垮自己的前提下，踏出有感的一步，而不是一次
                  all-in。
                </p>
              </div>
            </div>

            {/* Card 3: 不確定 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#D4B483]/30 hover:border-[#D4B483]/50 transition-all duration-300 relative group">
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4B483]/60 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4B483]/60 rounded-br-2xl" />

              <div className="flex flex-col items-center text-center">
                {/* Icon - Map with pin */}
                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                  <svg
                    className="w-14 h-14 text-[#D4B483]"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="6" y="14" width="52" height="36" rx="4" />
                    <path d="M6 24h52M22 14v36M42 14v36" />
                    <circle cx="50" cy="22" r="8" fill="currentColor" />
                    <path d="M50 30v8" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#D4B483] mb-4 leading-snug">
                  答案還不確定，但不想再只是想想
                </h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  現在的路看起來還行，但常被旅居、遠距、遊牧故事勾起一點遺憾；想在未來五個月裡，用比較踏實的方法去體驗、去嘗試，而不是只滑過別人的人生。
                </p>
              </div>
            </div>
          </div>

          {/* Three dots separator */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            <span className="w-2 h-2 rounded-full bg-[#17464F] border border-[#D4B483]" />
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
          </div>
        </div>
      </section>
      {/* SECTION 3 PAIN POINTS START - 三大痛點 (重製版) */}
      <section className="bg-[#17464F] relative overflow-hidden">
        {/* 桌面版：顯示切圖 */}
        <div className="hidden lg:block">
          <Image
            src="/images/section3-painpoints-desktop.png"
            alt="不是你不努力，而是拼圖還有缺 - 方向斷裂、方法斷裂、同伴斷裂"
            width={1920}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* 手機版/平板版：保持原有程式碼佈局 */}
        <div className="lg:hidden py-16 sm:py-24">
          {/* 背景裝飾：金色弧線 (極細微) */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-[#D4B483]/10 rounded-full -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] border border-[#D4B483]/10 rounded-full translate-y-1/3 translate-x-1/3"></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            {/* 區塊標題 */}
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-balance">
                不是你不努力，而是拼圖還有缺
              </h2>
              {/* 裝飾用的三點 */}
              <div className="flex items-center justify-center gap-2 opacity-80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#17464F]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483]"></span>
              </div>
            </div>

            {/* 痛點路徑容器 */}
            <div className="relative">
              {/* 痛點 1: 方向斷裂 */}
              <div className="relative z-10 flex flex-col items-center gap-6 mb-8">
                <div className="w-20 h-20 hidden md:flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-[#D4B483]"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="32" cy="32" r="20" />
                    <circle cx="32" cy="32" r="4" fill="currentColor" />
                    <path d="M32 16V12M32 52V48M16 32H12M52 32H48" strokeWidth="2" />
                    <path d="M32 32L42 22" strokeWidth="2" />
                    <text x="48" y="16" fontSize="12" fill="currentColor">
                      ?
                    </text>
                    <text x="8" y="52" fontSize="10" fill="currentColor">
                      ?
                    </text>
                  </svg>
                </div>
                <div className="text-center max-w-sm">
                  <h3 className="text-xl font-bold text-[#D4B483] mb-3">方向斷裂</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    你是不是也想過很多種版本：有時想去外商、有時想接案當
                    freelancer，但每次看到別人的故事就改變主意，到最後，反而哪一條都沒真的走下去。
                  </p>
                </div>
              </div>

              {/* 連接線 1 */}
              <div className="w-0.5 h-10 bg-[#D4B483]/30 mx-auto my-2 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#D4B483] rounded-full"></div>
              </div>

              {/* 痛點 2: 方法斷裂 */}
              <div className="relative z-10 flex flex-col items-center gap-6 mb-8">
                <div className="w-20 h-20 hidden md:flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-[#D4B483]"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="8" y="28" width="20" height="16" rx="2" />
                    <rect x="36" y="28" width="20" height="16" rx="2" />
                    <rect x="22" y="12" width="20" height="16" rx="2" />
                    <path d="M52 20L56 16M56 16V24M56 16H48" strokeWidth="2" />
                  </svg>
                </div>
                <div className="text-center max-w-sm">
                  <h3 className="text-xl font-bold text-[#D4B483] mb-3">方法斷裂</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    你也不是沒學東西：買課、看影片、存下很多筆記，真正卡住的是——「那我今天到底要做哪一個小步驟？」所以日子一忙，又回到原本的節奏。
                  </p>
                </div>
              </div>

              {/* 連接線 2 */}
              <div className="w-0.5 h-10 bg-[#D4B483]/30 mx-auto my-2 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#D4B483] rounded-full"></div>
              </div>

              {/* 痛點 3: 同伴斷裂 */}
              <div className="relative z-10 flex flex-col items-center gap-6 mb-12">
                <div className="w-20 h-20 hidden md:flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-[#D4B483]"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="8" y="16" width="20" height="32" rx="2" />
                    <circle cx="18" cy="28" r="6" />
                    <path d="M12 40h12" />
                    <circle cx="44" cy="24" r="4" fill="currentColor" />
                    <circle cx="36" cy="32" r="4" fill="currentColor" />
                    <circle cx="52" cy="32" r="4" fill="currentColor" />
                    <circle cx="40" cy="40" r="4" fill="currentColor" />
                    <circle cx="48" cy="40" r="4" fill="currentColor" />
                  </svg>
                </div>
                <div className="text-center max-w-sm">
                  <h3 className="text-xl font-bold text-[#D4B483] mb-3">同伴斷裂</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    身邊的人大多走很標準的路，你很難跟他們分享「我其實想過不一樣的生活」。不知道可以跟誰討論、問誰意見，久了就習慣把這些想法藏在心裡。
                  </p>
                </div>
              </div>
            </div>

            {/* 結語區塊 */}
            <div className="relative mt-8">
              <div className="w-0.5 h-6 bg-[#D4B483]/30 mx-auto mb-6"></div>

              <div className="max-w-2xl mx-auto px-6 py-8 rounded-2xl border-2 border-[#D4B483]/30 bg-[#17464F]/50 backdrop-blur-sm text-center relative">
                <p className="text-base sm:text-lg text-white font-bold leading-relaxed">
                  你缺的不是更多資訊，而是一個地方，
                  <span className="block mt-2 text-[#D4B483]">
                    讓你在未來五個月裡，有人陪你一起試、一起走、一起調整方向。
                  </span>
                </p>
                <p className="text-sm sm:text-base text-white/70 mt-4 leading-relaxed">
                  {'一起用結構化的方式，'}
                  <br />
                  {'逼你把想法變成能被驗證的行動。'}
                </p>

                {/* 底部箭頭 */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <svg className="h-5 w-5 text-[#D4B483]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 2.1 COURSE HIGHLIGHTS CONTINUED (Part 2: 三大亮點) START */}
      <section id="key-features" className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-4 text-balance">
              學院三大特色，讓行動成為習慣
            </h2>
            <p className="text-[#33393C] max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
              {'不只是學習新知'}
              <br />
              {'雙軌資源、行動任務節奏、和一群真的在實驗新生活的同伴。'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuresData.map((feature) => (
              <div
                key={feature.id}
                onClick={() => toggleFeatureDialog(feature.id)}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#17464F]/10 flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#17464F] mb-2">{feature.title}</h3>
                  </div>
                </div>

                <div className="hidden md:block mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={feature.images[0].src || "/placeholder.svg"}
                    alt={feature.images[0].alt}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <p className="text-[#33393C] text-sm leading-relaxed mb-4">{feature.shortDesc}</p>

                <div className="w-full mt-4 flex items-center justify-center gap-2 text-[#D4B483] font-medium text-sm">
                  了解更多
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL FOR FEATURES */}
      <Suspense fallback={<div>Loading...</div>}>
        {featuresData.map((feature) => (
          <Dialog
            key={feature.id}
            open={openDialog === feature.id}
            onOpenChange={(open) => !open && setOpenDialog(null)}
          >
            <DialogPortal>
              <DialogOverlay />
              {/* CHANGE: Restructured DialogContent to keep close button fixed while content scrolls */}
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-[#F5F3ED] p-0" showCloseButton={true}>
                {/* Scrollable content container */}
                <div className="max-h-[90vh] overflow-y-auto px-6 pt-6 pb-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#17464F] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#17464F]/10 flex items-center justify-center flex-shrink-0">
                        {feature.icon}
                      </div>
                      {feature.title}
                    </DialogTitle>
                    <DialogDescription className="text-[#33393C] text-base leading-relaxed pt-4">
                      <div className="space-y-4">
                        {feature.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-[#D4B483] mt-1">–</span>
                            <span dangerouslySetInnerHTML={{ __html: detail }} />
                          </div>
                        ))}
                      </div>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-6">
                    {/* CHANGE: Removed carousel for mobile, now using vertical scrolling for all screen sizes */}
                    <div className="space-y-4">
                      {feature.images.map((image, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openLightbox(feature.images, idx)}
                        >
                          <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        ))}

        {lightboxOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-[101] text-white hover:text-[#D4B483] transition-colors p-2"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1))
              }}
              className="absolute left-4 z-[101] text-white hover:text-[#D4B483] transition-colors p-2 bg-black/50 rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Image */}
            <div
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImages[lightboxIndex]?.src || "/placeholder.svg"}
                alt={lightboxImages[lightboxIndex]?.alt || ""}
                width={1920}
                height={1080}
                className="object-contain max-w-full max-h-full"
              />
            </div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0))
              }}
              className="absolute right-4 z-[101] text-white hover:text-[#D4B483] transition-colors p-2 bg-black/50 rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[101] text-white text-sm bg-black/50 px-4 py-2 rounded-full">
              {lightboxIndex + 1} / {lightboxImages.length}
            </div>
          </div>
        )}
      </Suspense>

      {/* SECTION 5 INSTRUCTORS START - 師資 */}
      <section className="hidden py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17464F] mb-6">
              你的路線，不會只有一位老師在陪你走
            </h2>
            <p className="text-[#33393C] text-lg leading-relaxed max-w-2xl mx-auto">
              這堂學院不是把所有主題塞給同一個講師，
              <br className="hidden sm:block" />
              而是找了一群真的在路上走的人，一起陪你打底、選方向、走路線。
            </p>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#17464F]"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17464F]">
                <span className="text-[#D4B483]">A 線｜</span>接案線路導師
              </h3>
              <div className="h-px w-12 bg-[#17464F]"></div>
            </div>
            <p className="text-center text-[#33393C] mb-8 max-w-xl mx-auto">
              帶你建立個人品牌、經營內容、從零開始接案變現
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {instructors
                .filter((i) => ["工具王阿璋", "林佳 Zoe", "三分鐘", "西打藍"].includes(i.name))
                .map((instructor, index) => (
                  <div key={index} className="group text-center">
                    <div className="relative mb-4">
                      <a
                        href={instructor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 cursor-pointer ring-4 ring-[#17464F]/20"
                      >
                        <Image
                          src={instructor.image || "/placeholder.svg"}
                          alt={instructor.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </a>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#17464F] mb-1">{instructor.name}</h4>
                    <p className="text-[#33393C] text-xs sm:text-sm leading-relaxed line-clamp-2 px-2">
                      {instructor.title.split("，")[0]}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#17464F]"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17464F]">
                <span className="text-[#D4B483]">B 線｜</span>遠端上班線路導師
              </h3>
              <div className="h-px w-12 bg-[#17464F]"></div>
            </div>
            <p className="text-center text-[#33393C] mb-8 max-w-xl mx-auto">
              帶你建立國際職涯視野、遠端求職策略、跨國人脈經營
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {instructors
                .filter((i) => ["許詮", "Shelley", "讀者太太", "Emilia"].includes(i.name))
                .map((instructor, index) => (
                  <div key={index} className="group text-center">
                    <div className="relative mb-4">
                      <a
                        href={instructor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 cursor-pointer ring-4 ring-[#17464F]/20"
                      >
                        <Image
                          src={instructor.image || "/placeholder.svg"}
                          alt={instructor.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </a>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#17464F] mb-1">{instructor.name}</h4>
                    <p className="text-[#33393C] text-xs sm:text-sm leading-relaxed line-clamp-2 px-2">
                      {instructor.title.split("，")[0]}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#D4B383]"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17464F]">共同必修</h3>
              <div className="h-px w-12 bg-[#D4B483]"></div>
            </div>
            <p className="text-center text-[#33393C] mb-8 max-w-xl mx-auto">
              打底知識變現、AI 工具、財務思維、人生 SOP 的核心講師
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {instructors
                .filter((i) => ["林上哲", "鮪魚", "Joyce Weng", "Angela Feng"].includes(i.name))
                .map((instructor, index) => (
                  <div key={index} className="group text-center">
                    <div className="relative mb-4">
                      <a
                        href={instructor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 cursor-pointer ring-4 ring-[#D4B483]/30"
                      >
                        <Image
                          src={instructor.image || "/placeholder.svg"}
                          alt={instructor.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </a>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#17464F] mb-1">{instructor.name}</h4>
                    <p className="text-[#33393C] text-xs sm:text-sm leading-relaxed line-clamp-2 px-2">
                      {instructor.title.split("，")[0]}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 6 COURSE OUTLINE START - 課程地圖 */}
      <section id="learning-map" className="py-16 sm:py-20 bg-[#F5F3ED]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-2 text-balance">學習地圖</h2>
            <p className="text-base sm:text-lg text-[#D4B483] font-medium mb-6">五月開學，每週三晚間八點準時上線。</p>
            <p className="text-[#33393C] max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
              五個月的旅程，3 階段成長節奏：<span className="font-semibold text-[#17464F]">起步打底</span>、
              <span className="font-semibold text-[#17464F]">出擊試水</span>、
              <span className="font-semibold text-[#17464F]">累積整合</span>。
              <br className="hidden sm:block" />
              前期集中於啟發＆踏出行動； 後期注重於持續產出與積累。
            </p>
          </div>

          {/* Tabs 前導文字 */}
          <p className="text-center text-[#33393C]/70 text-sm mb-4">先選一條你現在最想嘗試的路線：</p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {["遠端上班", "接案", "我還不確定"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMapTab(tab)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 border-2 ${
                  activeMapTab === tab
                    ? "bg-[#17464F] text-white border-[#17464F]"
                    : "bg-white text-[#17464F] border-[#17464F]/30 hover:border-[#17464F]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content: 遠端上班 */}
          {activeMapTab === "遠端上班" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {/* 卡片 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#D4B483] bg-[#D4B483]/10 px-2 py-1 rounded">
                    上班線 × 三階段成果
                  </span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">這幾個月，你會怎麼走？</h3>
                <div className="space-y-3 text-[#33393C] leading-relaxed text-sm">
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <div>
                      <p>
                        <span className="font-semibold text-[#17464F]">階段一 起步打底：</span>
                        對外，看懂遠端職缺市場；對內，釐清個人優勢與目標職缺，整理出之後要寫進履歷與 LinkedIn
                        的關鍵故事，以及具備加速未來生產力的Ai思維。
                      </p>
                      <p className="text-xs text-[#A06E56] mt-1 italic">👉 你會擁有清楚的方向與目標職缺。</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <div>
                      <p>
                        <span className="font-semibold text-[#17464F]">階段二 出擊試水：</span>
                        優化 LinkedIn，根據 JD 做出客製化、遠端友善的履歷與求職信，準備一整套面試 STAR 故事庫。
                      </p>
                      <p className="text-xs text-[#A06E56] mt-1 italic">👉 你會對下一次遠端求職「敢投、敢面試」。</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <div>
                      <p>
                        <span className="font-semibold text-[#17464F]">階段三 累積整合：</span>
                        復盤所學，把求職技巧、AI 工作流、財務規劃、整理成可持續精進的職涯成長節奏。
                      </p>
                      <p className="text-xs text-[#A06E56] mt-1 italic">👉 你會有一套適合自己的遠端職涯 SOP。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卡片 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">路線必修課程是什麼？</h3>
                <div className="space-y-4">
                  {/* Phase 1 */}
                  <div className="border-l-3 border-[#D4B483] pl-3">
                    <span className="inline-block bg-[#D4B483]/20 text-[#A06E56] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                      階段一 起步打底
                    </span>
                    <p className="text-xs text-[#33393C]/70 mb-1">第 1–8 週</p>
                    <p className="text-xs text-[#33393C] leading-relaxed">
                      遠距職涯地圖、目標設定、盤點經歷＆改寫 LinkedIn 與履歷骨架、講師團體QA。
                    </p>
                  </div>
                  {/* Phase 2 */}
                  <div className="border-l-3 border-[#17464F] pl-3">
                    <span className="inline-block bg-[#17464F]/10 text-[#17464F] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                      階段二 出擊試水
                    </span>
                    <p className="text-xs text-[#33393C]/70 mb-1">第 9–17 週</p>
                    <p className="text-xs text-[#33393C] leading-relaxed">
                      看懂面試流程＆客製化履歷與求職信、學習與獵頭打交道的心法＆談薪攻略。
                    </p>
                  </div>
                  {/* Phase 3 */}
                  <div className="border-l-3 border-[#C9D7D4] pl-3">
                    <span className="inline-block bg-[#C9D7D4]/30 text-[#17464F] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                      階段三 累積整合
                    </span>
                    <p className="text-xs text-[#33393C]/70 mb-1">第 17–24 週</p>
                    <p className="text-xs text-[#33393C] leading-relaxed">
                      復盤成長、調整方向、選修工作坊、期末成果檢視。
                    </p>
                  </div>
                </div>
              </div>

              {/* 共用卡片：共同必修 & 選修 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-[#C9D7D4] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#17464F]">共同必修 & 選修</h3>
                </div>
                <div className="text-[#33393C] text-xs leading-relaxed space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#17464F] text-white text-[10px] sm:text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0">
                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        共同必修
                      </span>
                      <span className="text-[#33393C]/70 text-[10px] sm:text-xs">不管哪一條路線，都會一起上。</span>
                    </div>
                    <ul className="space-y-1 pl-4">
                      <li>• 遠距遊牧概論＆目標設定</li>
                      <li>• AI ＆ 自動化工作流</li>
                      <li>• 知識變現、財務規劃、人生溝通SOP</li>
                      <li>• 每月月底學習交流會</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#D4B483] text-white text-[10px] sm:text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0">
                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        選修
                      </span>
                      <span className="text-[#33393C]/70 text-[10px] sm:text-xs">依據個別需求，額外加速成長：</span>
                    </div>
                    <ul className="space-y-1 pl-4">
                      <li>• 短影音剪輯、素材拍攝技巧</li>
                      <li>• 網頁製作＆銷售漏斗</li>
                      <li>• 商業思維、口播價值銷售攻略</li>
                      <li>• AI vibe coding、n8n 自動化工作流</li>
                      <li>• Coffee Chat</li>
                    </ul>
                    <p className="text-[#A06E56] font-medium pt-1">
                      這些節奏貫穿三階段，讓你能整合思考、也能主動出擊。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: 接案 */}
          {activeMapTab === "接案" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {/* 卡片 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#D4B483] bg-[#D4B483]/10 px-2 py-1 rounded">
                    接案線 × 三階段成果
                  </span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">這幾個月，你會走到哪？</h3>
                <div className="space-y-3 text-[#33393C] leading-relaxed text-sm">
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <div>
                      <p>
                        <span className="font-semibold text-[#17464F]">階段一 起步打底：</span>
                        看懂接案市場，釐清 TA、主題與價值主張，整理出第一版服務項目與作品集框架，以及具備加速未來生產力的AI思維。
                      </p>
                      <p className="text-xs text-[#A06E56] mt-1 italic">
                        👉 你會做出第一版「可以拿出來給人看」的作品集雛形。
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <div>
                      <p>
                        <span className="font-semibold text-[#17464F]">階段二 出擊試水：</span>
                        定位設定、規劃內容製作策略，完成並公開至少 1 支短影音或內容作品，開始對外曝光。
                      </p>
                      <p className="text-xs text-[#A06E56] mt-1 italic">
                        👉 你會完成一輪內容上線，開始建立讀者與潛在客戶。
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <div>
                      <p>
                        <span className="font-semibold text-[#17464F]">階段三 累積整合：</span>
                        用數據與回饋復盤內容與服務，調整定位，把 AI 工作流、內容節奏與收入目標整理成自己的接案 SOP。
                      </p>
                      <p className="text-xs text-[#A06E56] mt-1 italic">
                        👉 你會有一套自己的接案 / 副業 方向與成長節奏。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卡片 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">路線必修課程是什麼？</h3>
                <div className="space-y-4">
                  {/* Phase 1 */}
                  <div className="border-l-3 border-[#D4B483] pl-3">
                    <span className="inline-block bg-[#D4B483]/20 text-[#A06E56] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                      階段一 起步打底
                    </span>
                    <p className="text-xs text-[#33393C]/70 mb-1">第 1–8 週</p>
                    <p className="text-xs text-[#33393C] leading-relaxed">
                      接案變現地圖、目標設定、定位與接案 Offer。
                    </p>
                  </div>
                  {/* Phase 2 */}
                  <div className="border-l-3 border-[#17464F] pl-3">
                    <span className="inline-block bg-[#17464F]/10 text-[#17464F] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                      階段二 出擊試水
                    </span>
                    <p className="text-xs text-[#33393C]/70 mb-1">第 9–16 週</p>
                    <p className="text-xs text-[#33393C] leading-relaxed">
                      市場價值定位、內容企劃＆框架、短影音流量攻略。
                    </p>
                  </div>
                  {/* Phase 3 */}
                  <div className="border-l-3 border-[#C9D7D4] pl-3">
                    <span className="inline-block bg-[#C9D7D4]/30 text-[#17464F] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                      階段三 累積整合
                    </span>
                    <p className="text-xs text-[#33393C]/70 mb-1">第 17–24 週</p>
                    <p className="text-xs text-[#33393C] leading-relaxed">
                      復盤內容成效，調整服務與定價，搭配財務與人生 SOP、把這一輪嘗試整理成下一季可複製的內容與接案計畫。
                    </p>
                  </div>
                </div>
              </div>

              {/* 共用卡片：共同必修 & 選修 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-[#C9D7D4] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#17464F]">共同必修 & 選修</h3>
                </div>
                <div className="text-[#33393C] text-xs leading-relaxed space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#17464F] text-white text-[10px] sm:text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0">
                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        共同必修
                      </span>
                      <span className="text-[#33393C]/70 text-[10px] sm:text-xs">不管哪一條路線，都會一起上：</span>
                    </div>
                    <ul className="space-y-1 pl-4">
                      <li>• 遠距遊牧概論＆目標設定</li>
                      <li>• AI ＆ 自動化工作流</li>
                      <li>• 知識變現、財務規劃、人生 SOP</li>
                      <li>• 每月月底學習交流會</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#D4B483] text-white text-[10px] sm:text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0">
                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        選修
                      </span>
                      <span className="text-[#33393C]/70 text-[10px] sm:text-xs">依據個別需求，額外加速成長：</span>
                    </div>
                    <ul className="space-y-1 pl-4">
                      <li>• 短影音剪輯、素材拍攝技巧</li>
                      <li>• 網頁製作＆銷售漏斗</li>
                      <li>• 商業思維、口播價值銷售攻略</li>
                      <li>• AI vibe coding、n8n 自動化工作流</li>
                      <li>• Coffee Chat</li>
                    </ul>
                    <p className="text-[#A06E56] font-medium pt-1">
                      這些節奏貫穿三階段，讓你能整合思考、也能主動出擊。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: 我還不確定 */}
          {activeMapTab === "我還不確定" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">先行動起來，讓行動告訴你答案</h3>
                <div className="text-[#33393C] text-sm leading-relaxed space-y-3 flex-1">
                  <p className="font-medium text-[#17464F]">很多人加入學院時，其實也不確定：</p>
                  <p className="pl-3 border-l-2 border-[#D4B483] italic text-[#17464F]">
                    「我更適合遠端上班？還是接案？」
                  </p>
                  <p>
                    這很正常——因為你缺的是
                    <span className="font-semibold text-[#17464F]">用行動試過一輪</span>。
                  </p>

                  {/* Callout 區塊 */}
                  <div className="bg-[#F5F3ED] border-l-3 border-[#D4B483] rounded-r-lg p-4 my-4">
                    <p className="text-[#17464F] font-semibold text-sm">
                      時間才是最貴的資源——別把它花在『想像猶豫』無限比較。
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <p className="font-medium text-[#17464F] mb-2">學院幫你：</p>
                    <ul className="space-y-1.5 pl-1">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4B483] mt-0.5">•</span>
                        <span>更快看見自己更適合哪一種節奏</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4B483] mt-0.5">•</span>
                        <span>連結可能用得上的工具、方法與潛在資源</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4B483] mt-0.5">•</span>
                        <span>把「想像」變成「有跡可循的方向」</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 mt-auto border-t border-slate-200">
                    <p className="text-xs text-[#33393C]/70 italic">先探索，再選擇，通常比一直想更省時間、更踏實。</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">先選雙軌，省下你最貴的時間</h3>
                <div className="text-[#33393C] text-sm leading-relaxed space-y-4 flex-1">
                  <p>
                    很多人卡在：「選錯怎麼辦？」、「現在投入會不會太晚？」、「我適合哪一條？」——結果一等再等，時間反而越來越貴。
                  </p>

                  {/* Callout 區塊 */}
                  <div className="bg-[#F5F3ED] border-l-3 border-[#D4B483] rounded-r-lg p-4">
                    <p className="text-[#17464F] font-semibold text-sm">
                      如果時間很貴，最划算的做法就是：找個都能試一遍的環境。
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-[#17464F]">雙軌的真正價值：</p>
                    <ul className="space-y-1.5 pl-1">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4B483] mt-0.5">•</span>
                        <span>不用把第一個選擇當成賭注</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4B483] mt-0.5">•</span>
                        <span>更快找到適合自己的主線</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4B483] mt-0.5">•</span>
                        <span>也更容易遇到能幫上忙的人與資源</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 mt-auto border-t border-slate-200">
                    <p className="text-xs font-medium text-[#D4B483] flex items-start gap-2">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>如果你正在『兩條都想要、又怕選錯』，雙軌通常是最省時間的解法。</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col">
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">選擇彈性與節奏</h3>
                <div className="text-[#33393C] text-sm leading-relaxed space-y-4 flex-1">
                  <p>每個人的情況不同——也許你對其中一條路更有感、預算需要彈性配置。</p>

                  {/* Callout 區塊 */}
                  <div className="bg-[#F5F3ED] border-l-3 border-[#D4B483] rounded-r-lg p-4 my-3">
                    <p className="text-[#17464F] font-semibold text-sm">
                      你不需要現在就走到最滿——學院希望你先開始行動，行動才是最重要的。
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="font-medium text-[#17464F]">Week 2 & 3 免費試上機會：</p>
                    <p className="text-xs text-[#33393C]/80">
                      已經單路線加入的正式學員，會有機會免費試上另一條線的「起步課」，用過來者經驗與實際藍圖，讓你知道自己更被哪條路點燃。
                    </p>

                    {/* Week blocks */}
                    <div className="space-y-2">
                      <div className="relative bg-gradient-to-br from-[#17464F] to-[#1a5561] rounded-xl p-3 text-white">
                        <div className="absolute top-2 right-2 bg-[#D4B483] text-[#17464F] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Week 2
                        </div>
                        <p className="font-semibold text-xs mb-0.5">接案變現藍圖</p>
                        <p className="text-[10px] opacity-90">& 目標設定</p>
                      </div>

                      <div className="relative bg-gradient-to-br from-[#17464F] to-[#1a5561] rounded-xl p-3 text-white">
                        <div className="absolute top-2 right-2 bg-[#D4B483] text-[#17464F] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Week 3
                        </div>
                        <p className="font-semibold text-xs mb-0.5">遠端自由職涯藍圖</p>
                        <p className="text-[10px] opacity-90">& 目標設定</p>
                      </div>
                    </div>

                    {/* Feature rows - 保留原有3條規則 */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-2.5 bg-[#F5F3ED] rounded-lg">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#17464F] flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-[#17464F] text-xs mb-0.5">第 1 個月結束前，可換線/加購雙軌 1 次</p>
                          <p className="text-[10px] text-[#333939]/80">詳細請見問答區，以名額為準</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-auto border-t border-slate-200">
                    <p className="text-xs text-[#33393C]/70 italic">
                      試過，你會更確信：哪條路最適合成為你接下來幾個月的主線。
                    </p>
                  </div>
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
                  ? "bg-[#F5F3ED] text-[#17464F] border border-[#C9D7D4] hover:bg-[#C9D7D4]"
                  : "bg-[#17464F] text-white hover:bg-[#1a5561]"
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
            {!showCalendarInline && <p className="text-sm text-[#33393C]/60 mt-2">看看每週三晚間八點，具體在做什麼</p>}
          </div>

          {showCalendarInline && (
            <div ref={calendarSectionRef} className="mt-8 animate-in slide-in-from-top-4 fade-in duration-500">
              {/* Timeline Content - Grouped by Phase */}
              <div className="space-y-4">
                {(() => {
                  const phaseGroups = [
                    {
                      phase: "階段一 起步打底",
                      phaseKey: "Phase 1 起步打底",
                      months: ["5 月", "6 月"],
                      weeks: [1, 2, 3, 4, 5, 6, 7, 8],
                      description: "看懂市場、釐清方向、整理素材",
                    },
                    {
                      phase: "階段二 出擊試水",
                      phaseKey: "Phase 2 出擊試水",
                      months: ["7 月", "8 月"],
                      weeks: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
                      description: "做出履歷或作品集，實際投遞或發佈",
                    },
                    {
                      phase: "階段三 累積整合",
                      phaseKey: "Phase 3 累積整合",
                      months: ["9 月"],
                      weeks: [19, 20, 21, 22, 23],
                      description: "復盤調整，建立長期可運作的系統",
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
                            className="border border-[#C9D7D4] rounded-xl overflow-hidden bg-white"
                          >
                            {/* Phase Header - Clickable */}
                            <button
                              onClick={() => togglePhase(group.phase)}
                              className={`w-full px-4 md:px-6 py-4 flex items-center justify-center relative transition-colors ${
                                isPhaseExpanded ? "bg-[#F5F3ED]" : "bg-white hover:bg-[#F5F3ED]/50"
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
                                className={`w-5 h-5 text-[#17464F] transition-transform flex-shrink-0 absolute right-4 md:right-6 ${
                                  isPhaseExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {/* Phase Content - Expandable */}
                            {isPhaseExpanded && (
                              <div className="px-4 md:px-6 py-4 border-t border-[#C9D7D4] animate-in slide-in-from-top-2 fade-in duration-300">
                                {/* Week Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                  {phaseWeeks.map((week) => {
                                    const trackColor = getTrackColor(week.track)
                                    const weekInstructors = getInstructorsByNames(week.instructorNames)

                                    return (
                                      <div
                                        key={week.id}
                                        className="border border-[#C9D7D4] rounded-lg p-4 bg-white hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
                                        onClick={() => setSelectedWeek(week)}
                                      >
                                        {/* Week Header */}
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-bold text-[#17464F]">{week.monthWeek}</span>
                                          <span
                                            className={`px-2 py-0.5 text-xs rounded ${trackColor.bg} ${trackColor.text}`}
                                          >
                                            {week.track}
                                          </span>
                                        </div>

                                        {/* Title */}
                                        <h4 className="text-sm font-semibold text-[#17464F] mb-2 line-clamp-2">
                                          {week.title}
                                        </h4>

                                        <p className="text-xs text-[#33393C] mb-3 line-clamp-2">{week.focusShort}</p>

                                        <div className="flex-1"></div>

                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#C9D7D4]/30">
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
                                            <span className="text-xs text-[#33393C]/70">
                                              {weekInstructors.length === 1
                                                ? weekInstructors[0].name === "講師確認中"
                                                  ? "待公開"
                                                  : weekInstructors[0].name
                                                : `${weekInstructors[0].name === "講師確認中" ? "待公開" : weekInstructors[0].name} 等 ${weekInstructors.length} 位`}
                                            </span>
                                          </div>
                                          <ChevronRight className="w-4 h-4 text-[#17464F]/50" />
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
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F5F3ED] text-[#17464F] rounded-full font-medium hover:bg-[#C9D7D4] transition-all duration-300 border border-[#C9D7D4]"
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
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-24 bg-[#F5F3ED]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#17464F] mb-3 text-balance">
              {'成為本屆學員你會得到什麼'}
            </h3>
            <p className="text-sm sm:text-base text-[#33393C]/70">
              {'遠距職涯 x 遠端接案 — 一套從定位到落地的完整行動系統'}
            </p>
          </div>

          {/* Block 1: Growth System (desktop only - merged into Block 2 on mobile) */}
          <div className="hidden md:block mb-10">
            <h4 className="font-bold text-[#17464F] text-base sm:text-lg mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 rounded-full bg-[#D4B483]"></span>
              {'一套「把能力變成機會」的成長系統'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-5 border border-[#C9D7D4]/50 shadow-sm">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#17464F] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{'01'}</span>
                  </div>
                  <h5 className="font-bold text-[#17464F] text-sm">{'當屆完整課程'}</h5>
                </div>
                <p className="text-[#33393C]/70 text-xs leading-relaxed pl-[42px]">
                  {'聚焦遠距求職與接案兩條路，從定位到落地流程（直播 / 回放一年）'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-[#C9D7D4]/50 shadow-sm">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#17464F] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{'02'}</span>
                  </div>
                  <h5 className="font-bold text-[#17464F] text-sm">{'作業與落地任務'}</h5>
                </div>
                <p className="text-[#33393C]/70 text-xs leading-relaxed pl-[42px]">
                  {'每周都要交付 — 一步步把你推到「可以被採用 / 被下單」的狀態'}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-[#C9D7D4]/50 shadow-sm">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#17464F] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{'03'}</span>
                  </div>
                  <h5 className="font-bold text-[#17464F] text-sm">{'成長節奏'}</h5>
                </div>
                <p className="text-[#33393C]/70 text-xs leading-relaxed pl-[42px]">
                  {'線上同學會 / 團體 QA / DemoDay，互相學習、幫助，彼此督促跟上進度'}
                </p>
              </div>
            </div>
          </div>

          {/* Block 2: Deliverables */}
          <div className="mb-10 bg-white rounded-2xl p-5 sm:p-8 border border-[#C9D7D4]/50 shadow-sm">
            {/* Mobile-only: Growth System merged here */}
            <div className="md:hidden mb-5">
              <h4 className="font-bold text-[#17464F] text-base mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#D4B483]"></span>
                {'一套「把能力變成機會」的成長系統'}
              </h4>
              <ul className="space-y-2 mb-5">
                <li className="flex items-start gap-2">
                  <span className="text-[#17464F] font-bold text-xs mt-0.5 flex-shrink-0">{'01'}</span>
                  <div>
                    <span className="font-semibold text-[#17464F] text-sm">{'當屆完整課程'}</span>
                    <span className="text-[#33393C]/60 text-xs">{' — 聚焦遠距求職與接案兩條路，從定位到落地流程（直播 / 回放一年）'}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#17464F] font-bold text-xs mt-0.5 flex-shrink-0">{'02'}</span>
                  <div>
                    <span className="font-semibold text-[#17464F] text-sm">{'作業與落地任務'}</span>
                    <span className="text-[#33393C]/60 text-xs">{' — 每周都要交付，一步步把你推到「可以被採用 / 被下單」的狀態'}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#17464F] font-bold text-xs mt-0.5 flex-shrink-0">{'03'}</span>
                  <div>
                    <span className="font-semibold text-[#17464F] text-sm">{'成長節奏'}</span>
                    <span className="text-[#33393C]/60 text-xs">{' — 線上同學會 / 團體 QA / DemoDay，互相學習、幫助，彼此督促跟上進度'}</span>
                  </div>
                </li>
              </ul>
              <div className="border-t border-[#C9D7D4]/50"></div>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <h4 className="font-bold text-[#17464F] text-base sm:text-lg">{'你會做出什麼成果'}</h4>
              <div className="flex gap-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4B483]/15 text-[#A06E56] font-medium">{'可展示'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4B483]/15 text-[#A06E56] font-medium">{'可投遞'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4B483]/15 text-[#A06E56] font-medium">{'可成交'}</span>
              </div>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <span className="text-[#D4B483] flex-shrink-0 mt-0.5 font-bold text-sm">{'✔'}</span>
                <div>
                  <span className="font-semibold text-[#17464F] text-sm">{'定位與可能性：遠距路線決策 & 啟動目標'}</span>
                  <p className="text-[#33393C]/60 text-sm mt-0.5">{'— 釐清你要的自由是什麼（時間／地點／收入），並選定「上班線／接案線／雙軌」的起跑方向及目標'}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#D4B483] flex-shrink-0 mt-0.5 font-bold text-sm">{'✔'}</span>
                <div>
                  <span className="font-semibold text-[#17464F] text-sm">{'對外門面與信任：一套讓人秒懂專業與價值的門面'}</span>
                  <p className="text-[#33393C]/60 text-sm mt-0.5">{'— 把你的能力、案例、價值主張整理成：LinkedIn／提案頁 / 作品集的關鍵內容與結構'}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#D4B483] flex-shrink-0 mt-0.5 font-bold text-sm">{'✔'}</span>
                <div>
                  <span className="font-semibold text-[#17464F] text-sm">{'接觸與轉化：把「接觸」變成「機會」的可擴增系統'}</span>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[#33393C]/60 text-sm">{'— 上班線：JD 拆解 → 客製化履歷 → 面試 & 談薪策略'}</p>
                    <p className="text-[#33393C]/60 text-sm">{'— 接案線：社群內容策略 → 作品呈現 → 獲客管道 → 成交流程'}</p>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#D4B483] flex-shrink-0 mt-0.5 font-bold text-sm">{'✔'}</span>
                <div>
                  <span className="font-semibold text-[#17464F] text-sm">{'留任與永續：交付的「點 > 線 > 面」永續結構'}</span>
                  <p className="text-[#33393C]/60 text-sm mt-0.5">{'— 在前期合作能活下來並能持續成長的方法'}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#D4B483] flex-shrink-0 mt-0.5 font-bold text-sm">{'✔'}</span>
                <div>
                  <span className="font-semibold text-[#17464F] text-sm">{'DemoDay 發表：把行動證明公開呈現'}</span>
                  <p className="text-[#33393C]/60 text-sm mt-0.5">{'— 讓你完成一次真正的「交付」與「曝光」，也讓機會更容易找上門'}</p>
                </div>
              </li>
            </ul>
            <p className="mt-5 pt-4 border-t border-[#C9D7D4]/50 text-center text-sm font-bold text-[#D4B483]">
              {'你的目標是「開始更容易拿到遠距工作 / 接案機會」。'}
            </p>
          </div>

          {/* Block 3: Alumni Status */}
          <div className="mb-10 bg-[#F5F3ED]/80 rounded-2xl p-5 sm:p-8 border border-[#D4B483]/30 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <h4 className="font-bold text-[#17464F] text-base sm:text-lg">{'校友資格'}</h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#17464F]/10 text-[#17464F] font-medium">{'入學即擁有，結業後延續'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 bg-white/60 rounded-xl p-4">
                <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-1.5 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold text-[#17464F] text-sm block mb-0.5">{'Skool 社群永久留存'}</span>
                  <p className="text-[#33393C]/60 text-xs leading-relaxed">{'畢業後不用搬家，仍在同一個社群交流（當屆專區僅當屆可見）'}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-white/60 rounded-xl p-4">
                <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-1.5 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold text-[#17464F] text-sm block mb-0.5">{'已購內容回放觀看'}</span>
                  <p className="text-[#33393C]/60 text-xs leading-relaxed">{'你買過課程(學院正課有一年限制)的回放與學習資源訪問權限'}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-white/60 rounded-xl p-4">
                <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-1.5 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold text-[#17464F] text-sm block mb-0.5">{'校友 LinkedIn 群'}</span>
                  <p className="text-[#33393C]/60 text-xs leading-relaxed">{'僅限學員與校友加入，職涯拓展與合作'}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-white/60 rounded-xl p-4">
                <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-1.5 flex-shrink-0"></span>
                <div>
                  <span className="font-semibold text-[#17464F] text-sm block mb-0.5">{'全產品校友價'}</span>
                  <p className="text-[#33393C]/60 text-xs leading-relaxed">{'下屆學院 / Journey 旅程 / 工作坊與線下聚會 / 合作夥伴福利（依公告）'}</p>
                </div>
              </div>
            </div>

            {/* Co-creation card merged here */}
            <div className="mt-4 bg-white/60 rounded-xl p-4 sm:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <h5 className="font-semibold text-[#17464F] text-sm">{'共創與參與權'}</h5>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4B483]/15 text-[#A06E56] font-medium">{'把圈子變成機會場'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-1.5 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#17464F] text-sm block mb-0.5">{'共創專案'}</span>
                    <p className="text-[#33393C]/60 text-xs leading-relaxed">{'可優先參與、可共同發起（讀書會、實戰企劃、工具共學、Builder 實習等）'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-1.5 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#17464F] text-sm block mb-0.5">{'許願池'}</span>
                    <p className="text-[#33393C]/60 text-xs leading-relaxed">{'定期提案 / 投票，讓學院資源與活動更貼近你的需求'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 5: Community Subscription */}
          <div className="mb-8 bg-[#17464F]/5 rounded-2xl p-5 sm:p-8 border border-[#17464F]/10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
              <h4 className="font-bold text-[#17464F] text-base sm:text-lg">{'入學自動開通 — 職涯成長社群 Premium 訂閱權益'}</h4>
            </div>
            <p className="text-[10px] sm:text-xs text-[#33393C]/50 mb-5">{'在學期間有效，不需另外加購'}</p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#D4B483]/15 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#D4B483]">{'1'}</span>
                <div>
                  <p className="text-sm font-medium text-[#17464F]">
                    {'付費講座、工作坊折扣'}
                    <span className="text-[#33393C]/50 font-normal text-xs ml-1.5">{'每月至少一場'}</span>
                  </p>
                  <p className="text-xs text-[#33393C]/60 mt-0.5">{'參加到 1.5 場就回本'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#D4B483]/15 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#D4B483]">{'2'}</span>
                <div>
                  <p className="text-sm font-medium text-[#17464F]">
                    {'合作夥伴 / 活動優惠搶先看'}
                  </p>
                  <p className="text-xs text-[#33393C]/60 mt-0.5">{'訂閱會員限定的合作夥伴優惠與活動搶先通知'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#D4B483]/15 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#D4B483]">{'3'}</span>
                <div>
                  <p className="text-sm font-medium text-[#17464F]">
                    {'世界遊牧資訊'}
                    <span className="text-[#33393C]/50 font-normal text-xs ml-1.5">{'趨勢整理 + 活動情報'}</span>
                  </p>
                  <p className="text-xs text-[#33393C]/60 mt-0.5">{'遠距工作市場趨勢、工具更新、海內外活動情報'}</p>
                </div>
              </div>
            </div>

            <p className="mt-5 pt-3 border-t border-[#17464F]/10 text-xs text-[#33393C]/50 text-center">{'結業後若想持續使用，可再自行續訂 Premium。'}</p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={scrollToPricing}
              className="inline-block bg-[#17464F] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#0f3339] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {'我要加入本梯'}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2.1 ECOSYSTEM PARTNERSHIP - 生態系 */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17464F] mb-3">你踏入的遠遠不只是學習課程</h2>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17464F] mb-3">是多元體驗的遊牧資源生態系</h2>
            <p className="text-sm sm:text-base text-[#33393C]/70 mt-2">從線上到線下｜從台灣到國際｜從知識到行動</p>
          </div>

          {/* Value proposition — compact list */}
          <div className="max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-baseline gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483] flex-shrink-0 translate-y-[0.35rem]"></span>
                <p className="text-sm sm:text-base text-[#33393C] leading-relaxed">
                  <span className="font-bold text-[#17464F]">國際鏈結</span>
                  <span className="mx-1.5 text-[#C9D7D4]">|</span>
                  接軌海外遊牧社群與活動資訊、國際遊牧者／領袖訪談
                </p>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483] flex-shrink-0 translate-y-[0.35rem]"></span>
                <p className="text-sm sm:text-base text-[#33393C] leading-relaxed">
                  <span className="font-bold text-[#17464F]">線下場域</span>
                  <span className="mx-1.5 text-[#C9D7D4]">|</span>
                  定期小聚、遊牧啟發旅程，與遊牧者、同路人、潛在合作夥伴面對面交流
                </p>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483] flex-shrink-0 translate-y-[0.35rem]"></span>
                <p className="text-sm sm:text-base text-[#33393C] leading-relaxed">
                  <span className="font-bold text-[#17464F]">工作坊</span>
                  <span className="mx-1.5 text-[#C9D7D4]">|</span>
                  「上課中就做出來」加速行動落地、根據個人需求延伸學習
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1: Lifestyle */}
            {(() => {
              const lifestylePhotos = [
                { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e9-81-8a-e7-89-a7-e5-b0-8f-e8-81-9a.jpg", alt: "遊牧小聚" },
                { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e8-b6-8a-e5-8d-97-e9-81-8a-e7-89-a7-e4-b9-8b-e6-97-85.jpg", alt: "越南遊牧之旅" },
                { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e5-90-8c-e5-ad-b8-e6-9c-83.png", alt: "同學會" },
                { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e4-ba-a4-e6-b5-81.png", alt: "交流活動" },
              ]
              return (
                <div className="rounded-2xl border border-[#C9D7D4] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Top Header Strip */}
                  <a href="https://www.instagram.com/digitalnomadstaiwan/" target="_blank" rel="noopener noreferrer" className="block bg-[#17464F] px-4 py-3 sm:px-6 sm:py-4 hover:bg-[#1a5260] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white p-1.5 flex-shrink-0">
                        <Image
                          src="/images/design-mode/%E6%95%B8%E4%BD%8D%E9%81%8A%E7%89%A7%E5%8F%B0%E7%81%A3%20Logo%281%29%281%29%281%29%281%29.png"
                          alt="Taiwan Digital Nomad"
                          width={36}
                          height={36}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white font-bold text-base sm:text-lg leading-tight truncate">{'數位遊牧 Lifestyle 社群'}</h3>
                        <span className="text-[#D4B483] text-xs sm:text-sm">@digitalnomadstaiwan</span>
                      </div>
                    </div>
                  </a>

                  {/* Main Image */}
                  <div className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden cursor-pointer"
                    onClick={() => {
                      setLightboxImages(lifestylePhotos)
                      setLightboxIndex(0)
                      setLightboxOpen(true)
                    }}
                  >
                    <Image
                      src={lifestylePhotos[0].src || "/placeholder.svg"}
                      alt="數位遊牧 Lifestyle 社群"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#17464F] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>
                      {lifestylePhotos.length} 張照片
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs sm:text-sm text-[#A06E56] bg-[#A06E56]/10 px-2.5 py-1 rounded-full"># 台灣最大數位遊牧社群</span>
                      <span className="text-xs sm:text-sm text-[#A06E56] bg-[#A06E56]/10 px-2.5 py-1 rounded-full"># 每月遊牧聚會</span>
                      <span className="text-xs sm:text-sm text-[#A06E56] bg-[#A06E56]/10 px-2.5 py-1 rounded-full"># 遊牧啟發之旅</span>
                    </div>

                    {/* Thumbnail Grid */}
                    <div className="grid grid-cols-4 gap-2">
                      {lifestylePhotos.map((photo, i) => (
                        <div
                          key={i}
                          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => {
                            setLightboxImages(lifestylePhotos)
                            setLightboxIndex(i)
                            setLightboxOpen(true)
                          }}
                        >
                          <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" loading="lazy" />
                          {i === 0 && (
                            <div className="absolute inset-0 ring-2 ring-[#D4B483] ring-inset rounded-lg" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Card 2: Career Growth */}
            {(() => {
              const careerPhotos = [
                { src: "/images/e8-a1-8c-e5-8b-95-e5-b0-8e-e5-90-91-ef-bc-bfvibe-20coding-20-e5-b7-a5-e4-bd-9c-e5-9d-8a-20.png", alt: "Vibe Coding 工作坊" },
                { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e7-95-99-e8-a8-80.png", alt: "社群留言互動" },
                { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e4-bd-9c-e6-a5-ad-e4-ba-a4-e6-b5-81.png", alt: "作業交流" },
                { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e9-a0-98-e8-8b-b1.png", alt: "LinkedIn 社群" },
              ]
              return (
                <div className="rounded-2xl border border-[#C9D7D4] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Top Header Strip */}
                  <a href="https://www.instagram.com/twnomadacademy/" target="_blank" rel="noopener noreferrer" className="block bg-[#17464F] px-4 py-3 sm:px-6 sm:py-4 hover:bg-[#1a5260] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white p-1.5 flex-shrink-0">
                        <Image
                          src="/images/logo.png"
                          alt="遠距遊牧學院"
                          width={36}
                          height={36}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white font-bold text-base sm:text-lg leading-tight truncate">{'數位遊牧線上職涯成長社群'}</h3>
                        <span className="text-[#D4B483] text-xs sm:text-sm">@twnomadacademy</span>
                      </div>
                    </div>
                  </a>

                  {/* Main Image */}
                  <div className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden cursor-pointer"
                    onClick={() => {
                      setLightboxImages(careerPhotos)
                      setLightboxIndex(0)
                      setLightboxOpen(true)
                    }}
                  >
                    <Image
                      src={careerPhotos[0].src || "/placeholder.svg"}
                      alt="數位遊牧線上職涯成長社群"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#17464F] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>
                      {careerPhotos.length} 張照片
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs sm:text-sm text-[#A06E56] bg-[#A06E56]/10 px-2.5 py-1 rounded-full"># 線上線下講座工作坊</span>
                      <span className="text-xs sm:text-sm text-[#A06E56] bg-[#A06E56]/10 px-2.5 py-1 rounded-full"># 遊牧之聲</span>
                    </div>

                    {/* Thumbnail Grid */}
                    <div className="grid grid-cols-4 gap-2">
                      {careerPhotos.map((photo, i) => (
                        <div
                          key={i}
                          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => {
                            setLightboxImages(careerPhotos)
                            setLightboxIndex(i)
                            setLightboxOpen(true)
                          }}
                        >
                          <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" loading="lazy" />
                          {i === 0 && (
                            <div className="absolute inset-0 ring-2 ring-[#D4B483] ring-inset rounded-lg" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <SuccessStoriesSection id="success-stories-section" />

      {/* PRICING SECTION */}
      <section id="pricing-section" className="pt-0 pb-0 bg-[#17464F] relative overflow-hidden">
        {/* CHANGE: Pass modal states to child components and track when they open/close */}
        <PricingSection onTimelineModalChange={setPricingTimelineModalOpen} />
      </section>

      {/* EMAIL SUBSCRIPTION BANNER */}
      <section className="bg-[#F5F3ED] py-10 sm:py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-xs tracking-[0.15em] uppercase text-[#A06E56] font-medium mb-3">{'保持連結'}</p>
          <h3 className="text-xl sm:text-2xl font-bold text-[#17464F] mb-2">
            {'還沒準備好加入？先收到最新消息'}
          </h3>
          <p className="text-sm text-[#33393C]/70 mb-6 leading-relaxed">
            {'公開講座通知、開班資訊、遠距工作分享，定期送到你信箱。'}
          </p>
          <button
            onClick={() => {
              // GHL popup: click the hidden trigger that form_embed.js listens to
              const iframe = document.getElementById("inline-MpJ0wDqzBLszazx5vVRy")
              if (iframe) {
                iframe.dispatchEvent(new Event("click", { bubbles: true }))
              }
              // Also try direct API if available
              if (typeof window !== "undefined" && (window as any).LC_API?.open_chat_window) {
                ;(window as any).LC_API.open_chat_window()
              }
            }}
            className="inline-flex items-center gap-2 bg-[#17464F] text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-full hover:bg-[#1a5561] transition-colors duration-200 shadow-sm"
          >
            <Mail className="w-4 h-4 flex-shrink-0" />
            {'我想要收到公開講座＆最新消息'}
          </button>
        </div>
      </section>

      {/* GHL Popup Form — hidden iframe + script, popup handled by form_embed.js */}
      <iframe
        src="https://link.digitalnomadstaiwan.com/widget/form/MpJ0wDqzBLszazx5vVRy"
        style={{ display: "none", width: "100%", height: "100%", border: "none", borderRadius: "4px" }}
        id="inline-MpJ0wDqzBLszazx5vVRy"
        data-layout="{'id':'POPUP'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Contact us - Academy"
        data-height="340"
        data-layout-iframe-id="inline-MpJ0wDqzBLszazx5vVRy"
        data-form-id="MpJ0wDqzBLszazx5vVRy"
        title="Contact us - Academy"
      />
      <Script
        src="https://link.digitalnomadstaiwan.com/js/form_embed.js"
        strategy="lazyOnload"
      />

      {/* FAQ SECTION */}
      <FAQSection
        // CHANGE: Pass modal state to FAQ section
        onPriceDiffModalChange={setFaqPriceDiffModalOpen}
      />

      {/* FOOTER */}
      <footer className="py-12 bg-[#17464F] text-white">
        <div className="container mx-auto px-4">
          {/* Contact Information */}
          <div className="text-center mb-6">
            <p className="text-sm text-white/80 leading-relaxed mb-2">如果有問題請洽詢 Line 官方帳號 or Instagram</p>
            <p className="text-sm text-white/80 leading-relaxed">
              也可以{" "}
              <a
                href="mailto:academy@travelwork.life"
                className="inline-flex items-center gap-1 text-[#D4B483] hover:text-[#D4B483]/80 transition-colors font-medium"
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
            <h3 className="text-2xl font-bold text-[#17464F] mb-2">{highlightPopup.title}</h3>
            <p className="text-sm font-medium text-[#D4B483] mb-6">{highlightPopup.subtitle}</p>
            <div className="text-sm text-[#33393C] leading-relaxed space-y-4">
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
              <span className="text-sm font-bold text-[#17464F]">{selectedWeek.monthWeek}</span>
              <span
                className={`px-2 py-0.5 text-xs rounded ${getTrackColor(selectedWeek.track).bg} ${
                  getTrackColor(selectedWeek.track).text
                }`}
              >
                {selectedWeek.track}
              </span>
            </div>

            {/* Course Title */}
            <h3 className="text-2xl font-bold text-[#17464F] mb-3">{selectedWeek.title}</h3>

            {/* Course Type */}
            <p className="text-sm font-medium text-[#D4B483] mb-6">{selectedWeek.type}</p>

            {/* Detailed Course Description */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-[#17464F] mb-3">課程說明</h4>
              <p className="text-sm text-[#33393C] leading-relaxed whitespace-pre-line">{selectedWeek.focusDetail}</p>
            </div>

            {/* Instructors Section */}
            {selectedWeek.instructorNames.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-[#17464F] mb-4">講師介紹</h4>
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
                      <div key={idx} className="p-6 bg-[#F5F3ED] rounded-xl">
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
                              <h5 className="font-bold text-lg text-[#17464F] leading-tight">{instructor.name}</h5>
                              {/* Social links */}
                              {(instructor.links || instructor.link) && (
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  {instructor.links?.website && (
                                    <a
                                      href={instructor.links.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-[#D4B483] text-[#17464F] hover:text-white transition-colors shadow-sm"
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
                                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-[#0A66C2] text-[#17464F] hover:text-white transition-colors shadow-sm"
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
                                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 text-[#17464F] hover:text-white transition-colors shadow-sm"
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
                                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-[#1877F2] text-[#17464F] hover:text-white transition-colors shadow-sm"
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
                                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-[#D4B483] text-[#17464F] hover:text-white transition-colors shadow-sm"
                                      title="外部連結"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                            {/* Title */}
                            <p className="text-sm text-[#D4B483] leading-snug">{instructor.title}</p>
                          </div>
                        </div>

                        {rawBackground && (
                          <div className="mt-4">
                            <p className="text-sm text-[#33393C] leading-relaxed whitespace-pre-line">
                              {displayText}
                              {!isExpanded && shouldTruncate && "..."}
                            </p>

                            {/* Toggle button */}
                            {shouldTruncate && (
                              <>
                                <div className="h-px bg-[#D4B483]/20 my-4" />
                                <button
                                  onClick={toggleExpanded}
                                  className="mx-auto flex items-center gap-2 text-sm text-[#D4B483] hover:text-[#17464F] transition-colors"
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
              <h3 className="text-xl md:text-2xl font-bold text-[#17464F]">完整 <span className="border-2 border-red-500 bg-red-50 px-1 rounded">3+3</span> 學習行事曆</h3>
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
                          <h4 className="text-base md:text-lg font-semibold text-[#17464F]">{week.title}</h4>
                          <span className="text-xs text-gray-400 shrink-0">{week.type}</span>
                        </div>

                        {/* Focus Short */}
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{week.focusShort}</p>

                        {/* Instructors & Expand Button */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            {week.instructors.map((instructor, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-[#D4B483]/30">
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
                            className="flex items-center gap-1 text-xs text-[#17464F] hover:text-[#D4B483] transition-colors"
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
                            <h5 className="text-sm font-semibold text-[#17464F] mb-2">本週行動任務</h5>
                            <p className="text-sm text-gray-700 leading-relaxed">{week.focusDetail}</p>
                          </div>

                          {/* Instructor Details */}
                          <div className="mt-4">
                            <h5 className="text-sm font-semibold text-[#17464F] mb-3">講師資訊</h5>
                            <div className="flex flex-wrap gap-4">
                              {week.instructors.map((instructor, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
                                >
                                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4B483]/50 shrink-0">
                                    <Image
                                      src={instructor.image || "/placeholder.svg"}
                                      alt={instructor.name}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium text-[#17464F]">{instructor.name}</p>
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
      <StickyBottomBar scrollToPricing={scrollToPricing} isHidden={isAnyModalOpen} />
      <FloatingSocialButtons />
    </main>
  )
}
