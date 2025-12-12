"use client"

import { useParams } from "next/navigation"

import { useState, useEffect, useCallback, useRef } from "react" // Import useRef
import Image from "next/image"
import { TrendingUp, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePricing } from "@/contexts/pricing-context"
import { AnnouncementBar } from "@/components/announcement-bar"
import { PricingSection } from "@/components/sections/pricing-section" // Import PricingSection
import FAQSection from "@/components/sections/faq-section" // Import FAQSection

import { type PlanId, getCheckoutURL } from "@/data/plan-config"
import type { CalendarWeek } from "@/data/calendar"
import { stagePhotos } from "@/data/stage-photos"

// Define PlanId type here or import it if it's defined elsewhere
// type PlanId = "selfMedia" | "remoteJob" | "dualLine"

// const planConfig: Record<PlanId, { name: string; checkoutPath: string }> = {
//   selfMedia: { name: "自媒體線路方案", checkoutPath: "planId=selfmedia" },
//   remoteJob: { name: "遠端上班線路方案", checkoutPath: "planId=remotejob" },
//   dualLine: { name: "雙線整合方案", checkoutPath: "planId=be56b4ae-6f31-43be-8bfb-68fda4294a9a" },
// }

// const popularPlanId: PlanId = "dualLine"

// const formatPrice = (price: number): string => {
//   return price.toLocaleString("zh-TW")
// }

// const getCheckoutURL = (planId: PlanId, couponCode?: string) => {
//   const baseURL = `https://travelworkacademy.myteachify.com/checkout?${planConfig[planId].checkoutPath}`
//   return couponCode ? `${baseURL}&coupon=${encodeURIComponent(couponCode)}` : baseURL
// }

export default function HomePage() {
  const params = useParams()
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

  // const stagePhotos = [
  //   [
  //     {
  //       src: "/images/e6-88-90-e9-95-b7-e7-87-9flogo.jpg",
  //       alt: "艾兒莎成長營 Logo",
  //     },
  //     {
  //       src: "/images/e6-88-90-e9-95-b7-e7-87-9flogo.jpg",
  //       alt: "艾兒莎成長營 Logo",
  //     },
  //     { src: "/remote-work-home-office.png", alt: "遠距工作環境設置" },
  //   ],
  //   [
  //     {
  //       src: "/images/2-2.jpeg",
  //       alt: "一日同事 Coworking",
  //     },
  //     {
  //       src: "/images/2-3.jpeg",
  //       alt: "遊牧者交流活動",
  //     },
  //     {
  //       src: "/images/2-1.jpeg",
  //       alt: "每月數位遊牧小聚",
  //     },
  //   ],
  //   [
  //     {
  //       src: "/images/3-1.webp",
  //       alt: "越南峴港Holi節慶文化體驗",
  //     },
  //     {
  //       src: "/images/3-3.webp",
  //       alt: "海邊冥想身心平衡",
  //     },
  //     {
  //       src: "/images/3-2.webp",
  //       alt: "台灣數位遊牧社群聚會",
  //     },
  //   ],
  //   [
  //     {
  //       src: "/images/4-2.png",
  //       alt: "線上會議討論",
  //     },
  //     {
  //       src: "/images/4-3.jpeg",
  //       alt: "專業演講分享",
  //     },
  //     {
  //       src: "/images/digital-learning-technology-application-with-lapto.jpg",
  //       alt: "數位學習科技應用",
  //     },
  //   ],
  //   [
  //     {
  //       src: "/images/20231216.jpeg",
  //       alt: "社群網絡建立慶祝活動",
  //     },
  //     {
  //       src: "/images/20250329.jpeg",
  //       alt: "學習成果展示與認證儀式",
  //     },
  //     {
  //       src: "/images/227a8906.jpeg",
  //       alt: "線上復盤工作坊知識分享",
  //     },
  //   ],
  // ]

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
  // Find line with "const [expandedWeeks, setExpandedWeeks]" and add after it
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(["階段一 起步打底"])) // Default first phase expanded

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

  // const getPhaseColor = (phase: string) => {
  //   if (phase.includes("Phase 1")) return { bg: "bg-[#D4B483]/20", text: "text-[#D4B483]", border: "border-[#D4B483]" }
  //   if (phase.includes("Phase 2")) return { bg: "bg-[#17464F]/20", text: "text-[#17464F]", border: "border-[#17464F]" }
  //   if (phase.includes("Phase 3")) return { bg: "bg-[#A06E56]/20", text: "text-[#A06E56]", border: "border-[#A06E56]" }
  //   return { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" }
  // }

  // const getTrackColor = (track: string) => {
  //   if (track === "遠端上班線") return { bg: "bg-[#17464F]", text: "text-white" }
  //   if (track === "自媒體接案線") return { bg: "bg-[#D4B483]", text: "text-white" }
  //   return { bg: "bg-gray-500", text: "text-white" }
  // }

  // const instructors = [
  //   {
  //     name: "工具王阿璋",
  //     title: "『阿璋遊牧』電子報創辦人、數位遊牧陪跑計劃創辦人、IP 經營者",
  //     image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b.png",
  //     link: "https://www.johntool.com",
  //     background:
  //       "工具王阿璋是『阿璋遊牧』電子報創辦人、數位遊牧陪跑計劃創辦人、IP 經營者，擁有豐富的數位遊牧經驗與社群經營知識。",
  //   },
  //   {
  //     name: "三分鐘",
  //     title: "IG+FB+Threads 共 10萬粉絲、知識型 IP 經營者，揭秘如何透過社群影響力，放大個人價值",
  //     image: "/images/e4-b8-89-e5-88-86-e9-90-98.jpeg",
  //     link: "https://www.instagram.com/only3minute/",
  //     background:
  //       "三分鐘是擁有超過10萬粉絲的知識型 IP 經營者，擅長透過社群媒體放大個人價值，並分享實用的內容創作與經營策略。",
  //   },
  //   {
  //     name: "鮪魚",
  //     title: "專注於知識變現與內容創新，協助超過百位講師完成課程開發，累積銷售額突破 3 億。",
  //     image: "/images/e9-ae-aa-e9-ad-9a.jpeg",
  //     link: "https://www.instagram.com/newsvegtw/",
  //     background: "專注於知識變現與內容創新，協助超過百位講師完成課程開發，累積銷售額突破 3 億。",
  //   },
  //   {
  //     name: "西打藍",
  //     title: "創立一人公司、IG 粉絲近 1 萬、電子報訂閱 2500+，五年真實經驗帶你從零開始到高價接案的完整路徑",
  //     image: "/images/e8-a5-bf-e6-89-93-e8-97-8d.jpeg",
  //     link: "https://siddharam.com",
  //     background:
  //       "西打藍是一位成功的獨立工作者，創立一人公司並累積豐富的接案經驗，將分享從零開始到高價接案的完整路徑。",
  //   },
  //   {
  //     name: "林上哲",
  //     title: "非資訊背景 AI生產力工具教育者，已幫助4200+ 台灣、日本和香港的學員",
  //     image: "/images/e6-9e-97-e4-b8-8a-e5-93-b2-2.jpeg",
  //     link: "https://www.instagram.com/nuva.now/",
  //     background:
  //       "林上哲是一位非資訊背景的 AI 生產力工具教育者，擅長將複雜的 AI 工具轉化為易於理解的教學內容，幫助學員提升工作效率。",
  //   },
  //   {
  //     name: "許詮",
  //     title: "前 TikTok 子公司總經理、前阿里巴巴子公司副總、XChange創辦人、33 歲退休旅居峇里島。",
  //     image: "/images/e8-a8-b1-e8-a9-ae.jpeg",
  //     link: "https://www.facebook.com/SnT.life",
  //     background:
  //       "許詮曾任職於 TikTok 和阿里巴巴等知名企業，現為 XChange 創辦人，並已實現33歲退休旅居峇里島的目標，是實現財務自由的典範。",
  //   },
  //   {
  //     name: "Shelley",
  //     title: "ADPList 2025 Top 50 Global Mentor，LinkedIn 個人品牌術，機會自己來敲門",
  //     image: "/images/shelly.jpeg",
  //     link: "https://www.linkedin.com/in/yuhsuan-tien",
  //     background:
  //       "Shelley 是 ADPList 2025 Global Mentor，專精於 LinkedIn 個人品牌建立，協助個人發掘機會並拓展職涯。",
  //   },
  //   {
  //     name: "讀者太太",
  //     title: "英國職涯教練、「女力學院」《人脈力》講師，突破跨國遠距職涯天花板",
  //     image: "/images/e8-ae-80-e8-80-85-e5-a4-aa-e5-a4-aa.jpeg",
  //     link: "https://www.facebook.com/duzhetaitai",
  //     background: "讀者太太是英國職涯教練，也是「女力學院」《人脈力》講師，擅長協助專業人士突破跨國遠距職涯的限制。",
  //   },
  //   {
  //     name: "Emilia",
  //     title: "高階跨國獵頭，獵頭揭密談薪技巧與職涯躍升策略",
  //     image: "/images/emilia.jpeg",
  //     link: "https://www.linkedin.com/in/emchh/",
  //     background: "Emilia 是一位經驗豐富的高階跨國獵頭，將分享獵頭行業的秘辛、談薪技巧以及職涯躍升的策略。",
  //   },
  //   {
  //     name: "Joyce Weng",
  //     title: "過去為記者的她，跳脫傳統、成功於海外轉型遠全遠距工作，她將剖析如何規劃旅居財務、精打細算開銷！",
  //     image: "/images/joyce.jpeg",
  //     link: "https://www.facebook.com/storiesinmyworld",
  //     background:
  //       "Joyce Weng 是一位成功從記者轉型為遠距工作者的前輩，將分享她在海外的經驗，以及如何規劃旅居財務與開銷。",
  //   },
  //   {
  //     name: "林佳 Zoe",
  //     title: "9萬粉絲自媒體創作者，專長於打造自媒體與 IG 流量，協助你產出具潛力的短影片與貼文！",
  //     image: "/images/e6-af-8f-e6-97-a5e-e9-8c-a0.jpeg",
  //     link: "https://www.daydayding.com",
  //     background:
  //       "林佳 Zoe 是一位擁有9萬粉絲的自媒體創作者，專長於 IG 流量經營與短影片製作，將分享如何打造吸引人的內容。",
  //   },
  //   {
  //     name: "Angela Feng",
  //     title: "Ness Wellness 共同創辦人、創業投資管理者，遠距生活可持續的身心靈平衡",
  //     image: "/images/angela.jpeg",
  //     link: "https://www.nesswellness.com/",
  //     background:
  //       "Angela Feng 是 Ness Wellness 的共同創辦人，也是創業投資管理者，將分享如何實現遠距生活中的身心靈平衡。",
  //   },
  // ]

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

  return (
    <main className="min-h-screen bg-white">
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

        <div className="absolute top-6 left-0 z-30 py-4 px-4 sm:px-6 lg:px-8">
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
              <p className="text-sm sm:text-base text-[#D4B483] font-medium tracking-wide">
                華語世界第一個以「行動導向」設計的遠距遊牧學院
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-wide">
                今年4月，
                <br />
                一起把「也許有一天」
                <br />
                變成「<span className="text-[#D4B483]">我也正在路上</span>」
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                遠距遊牧學院結合線上課程、行動任務、共學社群與旅居體驗，
                幫助已經準備行動的探索者，在不需要辭職、不斷線收入的前提下， 也能快速尋找適合幾的遠距路徑。
              </p>

              {/* Route tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                <span className="px-4 py-2 rounded-full border border-white/40 text-white text-sm font-medium">
                  自媒體接案線路
                </span>
                <span className="px-4 py-2 rounded-full border border-white/40 text-white text-sm font-medium">
                  遠端上班線路
                </span>
                <span className="px-4 py-2 rounded-full border border-white/40 text-white text-sm font-medium">
                  雙線整合線路
                </span>
              </div>

              <div className="space-y-3 text-left max-w-xl mx-auto lg:mx-0">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#D4B483] mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">梳理你的遠距職涯藍圖與下一步行動</p>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#D4B483] mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">完成履歷、作品集、個人頁面等可見成果</p>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#D4B483] mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">加入一群真的朝向自由生活行動的夥伴</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col items-center lg:items-start gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#E8C547] hover:bg-[#D4B483] text-[#17464F] rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  <a
                    href={getCheckoutURLWithTracking()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (typeof window !== "undefined" && (window as any).trackInitiateCheckout) {
                        ;(window as any).trackInitiateCheckout(0)
                      }
                    }}
                  >
                    我要加入這一梯學員
                  </a>
                </Button>
                <button
                  onClick={() => {
                    document.getElementById("course-highlights")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-white/70 hover:text-[#D4B483] font-medium text-base transition-colors duration-200"
                >
                  看看這六個月怎麼走 ↓
                </button>
              </div>

              {/* Social proof */}
              <div className="pt-4 text-center lg:text-left">
                <p className="text-sm text-white/60">
                  2024-2025 已累積 <span className="text-[#D4B483] font-semibold">400+</span> 付費學員與{" "}
                  <span className="text-[#D4B483] font-semibold">1,000+</span> 社群成員，
                  <br className="hidden sm:block" />
                  一起在台灣與世界各地行動中。
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
              <br className="hidden sm:block" />
              你有夢想，有目標，有勇氣，
              <br className="hidden sm:block" />
              那就一起開始，實現你的遠距遊牧夢想吧！
            </p>
          </div>
          {/* Pricing Section */}
          <PricingSection />
          {/* FAQ Section */}
          <FAQSection />
        </div>
      </section>
      {/* SECTION 3 FOOTER START */}
      <section className="py-8 bg-[#17464F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left content */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">聯絡我們</h3>
              <p>電郵：info@travelworkacademy.com</p>
              <p>電話：+886 2 1234 5678</p>
            </div>
            {/* Right content */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">關注我們</h3>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://www.facebook.com/travelworkacademy" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/facebook-icon.png" alt="Facebook Icon" width={32} height={32} />
                </a>
                <a href="https://www.instagram.com/travelworkacademy" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/instagram-icon.png" alt="Instagram Icon" width={32} height={32} />
                </a>
                <a href="https://www.linkedin.com/company/travelworkacademy" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/linkedin-icon.png" alt="LinkedIn Icon" width={32} height={32} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
