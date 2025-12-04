"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useParams } from "next/navigation"

type PlanId = "selfMedia" | "remoteJob" | "dualLine"

interface StagePricing {
  original: number
  stagePrice: number
  savingAmount: number
}

interface Stage {
  id: string
  order: number
  name: string
  tagLine: string
  discountLabel: string
  discountRate: number
  startAt: Date
  endAt: Date
  prices: {
    [key in PlanId]: StagePricing
  }
}

const stages: Stage[] = [
  {
    id: "stage_1",
    order: 1,
    name: "招生啟動價",
    tagLine: "最早的一批，只有少部分人知道的方案，有「一起開始學院」的感覺",
    discountLabel: "51 折",
    discountRate: 0.51,
    startAt: new Date("2025-12-04T00:00:00"),
    endAt: new Date("2025-12-10T23:59:59"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 8499, savingAmount: 8001 },
      remoteJob: { original: 16500, stagePrice: 8499, savingAmount: 8001 },
      dualLine: { original: 22500, stagePrice: 11500, savingAmount: 11000 },
    },
  },
  {
    id: "stage_2",
    order: 2,
    name: "夢想試飛價",
    tagLine: "願意先試飛的人，給你最輕的票價",
    discountLabel: "58 折",
    discountRate: 0.58,
    startAt: new Date("2025-12-11T00:00:00"),
    endAt: new Date("2025-12-24T23:59:59"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 9499, savingAmount: 7001 },
      remoteJob: { original: 16500, stagePrice: 9499, savingAmount: 7001 },
      dualLine: { original: 22500, stagePrice: 12999, savingAmount: 9501 },
    },
  },
  {
    id: "stage_3",
    order: 3,
    name: "打包行李價",
    tagLine: "已經決定要上路、開始準備的人",
    discountLabel: "61 折",
    discountRate: 0.61,
    startAt: new Date("2025-12-25T00:00:00"),
    endAt: new Date("2026-01-07T23:59:59"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 9999, savingAmount: 6501 },
      remoteJob: { original: 16500, stagePrice: 9999, savingAmount: 6501 },
      dualLine: { original: 22500, stagePrice: 13699, savingAmount: 8801 },
    },
  },
  {
    id: "stage_4",
    order: 4,
    name: "開票起飛價",
    tagLine: "對標「機票開票」的那一刻，再晚就要變貴了",
    discountLabel: "64 折",
    discountRate: 0.64,
    startAt: new Date("2026-01-08T00:00:00"),
    endAt: new Date("2026-01-21T23:59:59"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 10499, savingAmount: 6001 },
      remoteJob: { original: 16500, stagePrice: 10499, savingAmount: 6001 },
      dualLine: { original: 22500, stagePrice: 14299, savingAmount: 8201 },
    },
  },
  {
    id: "stage_5",
    order: 5,
    name: "最後登機口價",
    tagLine: "再不上機就要關門了",
    discountLabel: "67 折",
    discountRate: 0.67,
    startAt: new Date("2026-01-22T00:00:00"),
    endAt: new Date("2026-02-04T23:59:59"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 10999, savingAmount: 5501 },
      remoteJob: { original: 16500, stagePrice: 10999, savingAmount: 5501 },
      dualLine: { original: 22500, stagePrice: 14999, savingAmount: 7501 },
    },
  },
  {
    id: "stage_6",
    order: 6,
    name: "起飛早鳥價",
    tagLine: "進入中段，還是早鳥，但已經離最便宜一段距離",
    discountLabel: "70 折",
    discountRate: 0.7,
    startAt: new Date("2026-02-05T00:00:00"),
    endAt: new Date("2026-02-18T23:59:59"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 11499, savingAmount: 5001 },
      remoteJob: { original: 16500, stagePrice: 11499, savingAmount: 5001 },
      dualLine: { original: 22500, stagePrice: 15699, savingAmount: 6801 },
    },
  },
  {
    id: "stage_7",
    order: 7,
    name: "雲端巡航價",
    tagLine: "隊伍已經在路上",
    discountLabel: "73 折",
    discountRate: 0.73,
    startAt: new Date("2026-02-19T00:00:00"),
    endAt: new Date("2026-03-04T23:59:59"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 11999, savingAmount: 4501 },
      remoteJob: { original: 16500, stagePrice: 11999, savingAmount: 4501 },
      dualLine: { original: 22500, stagePrice: 16399, savingAmount: 6101 },
    },
  },
  {
    id: "stage_8",
    order: 8,
    name: "中途轉機價",
    tagLine: "你還趕得上這班機，但不是最早那批價",
    discountLabel: "76 折",
    discountRate: 0.76,
    startAt: new Date("2026-03-05T00:00:00"),
    endAt: new Date("2026-03-11T23:59:59"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 12499, savingAmount: 4001 },
      remoteJob: { original: 16500, stagePrice: 12499, savingAmount: 4001 },
      dualLine: { original: 22500, stagePrice: 16999, savingAmount: 5501 },
    },
  },
  {
    id: "stage_9",
    order: 9,
    name: "入境前夕價",
    tagLine: "快要入境學院",
    discountLabel: "82 折",
    discountRate: 0.82,
    startAt: new Date("2026-03-12T00:00:00"),
    endAt: new Date("2026-03-18T23:59:59"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 13499, savingAmount: 3001 },
      remoteJob: { original: 16500, stagePrice: 13499, savingAmount: 3001 },
      dualLine: { original: 22500, stagePrice: 18399, savingAmount: 4101 },
    },
  },
  {
    id: "stage_10",
    order: 10,
    name: "落地衝刺價",
    tagLine: "最後加速衝進這一梯",
    discountLabel: "88 折",
    discountRate: 0.88,
    startAt: new Date("2026-03-19T00:00:00"),
    endAt: new Date("2026-03-25T23:59:59"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 14499, savingAmount: 2001 },
      remoteJob: { original: 16500, stagePrice: 14499, savingAmount: 2001 },
      dualLine: { original: 22500, stagePrice: 19699, savingAmount: 2801 },
    },
  },
  {
    id: "stage_11",
    order: 11,
    name: "壓線報名價",
    tagLine: "給還在猶豫但真的想上的你",
    discountLabel: "94 折",
    discountRate: 0.94,
    startAt: new Date("2026-03-26T00:00:00"),
    endAt: new Date("2026-03-30T23:59:59"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 15499, savingAmount: 1001 },
      remoteJob: { original: 16500, stagePrice: 15499, savingAmount: 1001 },
      dualLine: { original: 22500, stagePrice: 20999, savingAmount: 1501 },
    },
  },
  {
    id: "stage_final",
    order: 12,
    name: "原價",
    tagLine: "正常標價",
    discountLabel: "原價",
    discountRate: 1,
    startAt: new Date("2026-03-31T00:00:00"),
    endAt: new Date("2026-04-30T23:59:59"), // Enrollment deadline
    prices: {
      selfMedia: { original: 16500, stagePrice: 16500, savingAmount: 0 },
      remoteJob: { original: 16500, stagePrice: 16500, savingAmount: 0 },
      dualLine: { original: 22500, stagePrice: 22500, savingAmount: 0 },
    },
  },
]

const planConfig: Record<PlanId, { name: string; checkoutPath: string }> = {
  selfMedia: { name: "自媒體線路方案", checkoutPath: "planId=selfmedia" },
  remoteJob: { name: "遠端上班線路方案", checkoutPath: "planId=remotejob" },
  dualLine: { name: "雙線整合方案", checkoutPath: "planId=be56b4ae-6f31-43be-8bfb-68fda4294a9a" },
}

const popularPlanId: PlanId = "dualLine"

const formatPrice = (price: number): string => {
  return price.toLocaleString("zh-TW")
}

const getCheckoutURL = (planId: PlanId, couponCode?: string) => {
  const baseURL = `https://travelworkacademy.myteachify.com/checkout?${planConfig[planId].checkoutPath}`
  return couponCode ? `${baseURL}&coupon=${encodeURIComponent(couponCode)}` : baseURL
}

const getTrackingParams = () => {
  if (typeof window === "undefined") return ""

  const urlParams = new URLSearchParams(window.location.search)
  const fbclid = urlParams.get("fbclid")

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift()
    return null
  }

  const fbc = getCookie("_fbc")
  const fbp = getCookie("_fbp")

  const params = new URLSearchParams()
  if (fbclid) params.append("fbclid", fbclid)
  if (fbc) params.append("fbc", fbc)
  if (fbp) params.append("fbp", fbp)

  return params.toString() ? `&${params.toString()}` : ""
}

export default function HomePage() {
  const params = useParams()
  const [couponCode, setCouponCode] = useState<string | null>(null)

  const [selectedPlanId, setSelectedPlanId] = useState<PlanId | null>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [selectedWeek, setSelectedWeek] = useState<{
    week: number
    title: string
    instructor: string
    instructorData: any
    month: number
  } | null>(null)

  useEffect(() => {
    if (params.coupon && Array.isArray(params.coupon) && params.coupon.length > 0) {
      setCouponCode(params.coupon[0])
    } else if (typeof params.coupon === "string") {
      setCouponCode(params.coupon)
    }
  }, [params])

  const currentStageData = useMemo((): Stage | null => {
    const now = new Date()
    for (const stage of stages) {
      if (now >= stage.startAt && now <= stage.endAt) {
        return stage
      }
    }
    // If past all stages, return final stage
    return stages[stages.length - 1]
  }, [])

  const lowestPrice = useMemo((): number | null => {
    if (!currentStageData) return null
    const prices = Object.values(currentStageData.prices).map((p) => p.stagePrice)
    return Math.min(...prices)
  }, [currentStageData])

  useEffect(() => {
    if (!currentStageData || !currentStageData.endAt) return

    const targetDate = currentStageData.endAt.getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [currentStageData])

  const getCheckoutURLWithTracking = (planId: PlanId = "dualLine") => {
    const baseURL = getCheckoutURL(planId, couponCode || undefined)
    const trackingParams = getTrackingParams()
    return `${baseURL}${trackingParams}`
  }

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
  }

  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showFullSchedule, setShowFullSchedule] = useState(false)

  const stagePhotos = [
    [
      {
        src: "/images/e6-88-90-e9-95-b7-e7-87-9flogo.jpg",
        alt: "艾兒莎成長營 Logo",
      },
      {
        src: "/images/e6-88-90-e9-95-b7-e7-87-9flogo.jpg",
        alt: "艾兒莎成長營 Logo",
      },
      { src: "/remote-work-home-office.png", alt: "遠距工作環境設置" },
    ],
    [
      {
        src: "/images/2-2.jpeg",
        alt: "一日同事 Coworking",
      },
      {
        src: "/images/2-3.jpeg",
        alt: "遊牧者交流活動",
      },
      {
        src: "/images/2-1.jpeg",
        alt: "每月數位遊牧小聚",
      },
    ],
    [
      {
        src: "/images/3-1.webp",
        alt: "越南峴港Holi節慶文化體驗",
      },
      {
        src: "/images/3-3.webp",
        alt: "海邊冥想身心平衡",
      },
      {
        src: "/images/3-2.webp",
        alt: "台灣數位遊牧社群聚會",
      },
    ],
    [
      {
        src: "/images/4-2.png",
        alt: "線上會議討論",
      },
      {
        src: "/images/4-3.jpeg",
        alt: "專業演講分享",
      },
      {
        src: "/images/digital-learning-technology-application-with-lapto.jpg",
        alt: "數位學習科技應用",
      },
    ],
    [
      {
        src: "/images/20231216.jpeg",
        alt: "社群網絡建立慶祝活動",
      },
      {
        src: "/images/20250329.jpeg",
        alt: "學習成果展示與認證儀式",
      },
      {
        src: "/images/227a8906.jpeg",
        alt: "線上復盤工作坊知識分享",
      },
    ],
  ]

  // Now using only currentStageData from stages config

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

  const instructors = [
    {
      name: "工具王阿璋",
      title: "『阿璋遊牧』電子報創辦人、數位遊牧陪跑計劃創辦人、IP 經營者",
      image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b-e5-95-8a-e7-92-8b.png",
      link: "https://www.johntool.com",
      background:
        "工具王阿璋是『阿璋遊牧』電子報創辦人、數位遊牧陪跑計劃創辦人、IP 經營者，擁有豐富的數位遊牧經驗與社群經營知識。",
    },
    {
      name: "三分鐘",
      title: "IG+FB+Threads 共 10萬粉絲、知識型 IP 經營者，揭秘如何透過社群影響力，放大個人價值",
      image: "/images/e4-b8-89-e5-88-86-e9-90-98.jpeg",
      link: "https://www.instagram.com/only3minute/",
      background:
        "三分鐘是擁有超過10萬粉絲的知識型 IP 經營者，擅長透過社群媒體放大個人價值，並分享實用的內容創作與經營策略。",
    },
    {
      name: "鮪魚",
      title: "專注於知識變現與內容創新，協助超過百位講師完成課程開發，累積銷售額突破 3 億。",
      image: "/images/e9-ae-aa-e9-ad-9a.jpeg",
      link: "https://www.instagram.com/newsvegtw/",
      background: "專注於知識變現與內容創新，協助超過百位講師完成課程開發，累積銷售額突破 3 億。",
    },
    {
      name: "西打藍",
      title: "創立一人公司、IG 粉絲近 1 萬、電子報訂閱 2500+，五年真實經驗帶你從零開始到高價接案的完整路徑",
      image: "/images/e8-a5-bf-e6-89-93-e8-97-8d.jpeg",
      link: "https://siddharam.com",
      background:
        "西打藍是一位成功的獨立工作者，創立一人公司並累積豐富的接案經驗，將分享從零開始到高價接案的完整路徑。",
    },
    {
      name: "林上哲",
      title: "非資訊背景 AI生產力工具教育者，已幫助4200+ 台灣、日本和香港的學員",
      image: "/images/e6-9e-97-e4-b8-8a-e5-93-b2-2.jpeg",
      link: "https://www.instagram.com/nuva.now/",
      background:
        "林上哲是一位非資訊背景的 AI 生產力工具教育者，擅長將複雜的 AI 工具轉化為易於理解的教學內容，幫助學員提升工作效率。",
    },
    {
      name: "許詮",
      title: "前 TikTok 子公司總經理、前阿里巴巴子公司副總、XChange創辦人、33 歲退休旅居峇里島。",
      image: "/images/e8-a8-b1-e8-a9-ae.jpeg",
      link: "https://www.facebook.com/SnT.life",
      background:
        "許詮曾任職於 TikTok 和阿里巴巴等知名企業，現為 XChange 創辦人，並已實現33歲退休旅居峇里島的目標，是實現財務自由的典範。",
    },
    {
      name: "Shelley",
      title: "ADPList 2025 Top 50 Global Mentor，LinkedIn 個人品牌術，機會自己來敲門",
      image: "/images/shelly.jpeg",
      link: "https://www.linkedin.com/in/yuhsuan-tien",
      background:
        "Shelley 是 ADPList 2025 Top 50 Global Mentor，專精於 LinkedIn 個人品牌建立，協助個人發掘機會並拓展職涯。",
    },
    {
      name: "讀者太太",
      title: "英國職涯教練、「女力學院」《人脈力》講師，突破跨國遠距職涯天花板",
      image: "/images/e8-ae-80-e8-80-85-e5-a4-aa-e5-a4-aa.jpeg",
      link: "https://www.facebook.com/duzhetaitai",
      background: "讀者太太是英國職涯教練，也是「女力學院」《人脈力》講師，擅長協助專業人士突破跨國遠距職涯的限制。",
    },
    {
      name: "Emilia",
      title: "高階跨國獵頭，獵頭揭密談薪技巧與職涯躍升策略",
      image: "/images/emilia.jpeg",
      link: "https://www.linkedin.com/in/emchh/",
      background: "Emilia 是一位經驗豐富的高階跨國獵頭，將分享獵頭行業的秘辛、談薪技巧以及職涯躍升的策略。",
    },
    {
      name: "Joyce Weng",
      title: "過去為記者的她，跳脫傳統、成功於海外轉型遠全遠距工作，她將剖析如何規劃旅居財務、精打細算開銷！",
      image: "/images/joyce.jpeg",
      link: "https://www.facebook.com/storiesinmyworld",
      background:
        "Joyce Weng 是一位成功從記者轉型為遠距工作者的前輩，將分享她在海外的經驗，以及如何規劃旅居財務與開銷。",
    },
    {
      name: "林佳 Zoe",
      title: "9萬粉絲自媒體創作者，專長於打造自媒體與 IG 流量，協助你產出具潛力的短影片與貼文！",
      image: "/images/e6-af-8f-e6-97-a5e-e9-8c-a0.jpeg",
      link: "https://www.daydayding.com",
      background:
        "林佳 Zoe 是一位擁有9萬粉絲的自媒體創作者，專長於 IG 流量經營與短影片製作，將分享如何打造吸引人的內容。",
    },
    {
      name: "Angela Feng",
      title: "Ness Wellness 共同創辦人、創業投資管理者，遠距生活可持續的身心靈平衡",
      image: "/images/angela.jpeg",
      link: "https://www.nesswellness.com/",
      background:
        "Angela Feng 是 Ness Wellness 的共同創辦人，也是創業投資管理者，將分享如何實現遠距生活中的身心靈平衡。",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* ANNOUNCEMENT BAR - Desktop Only */}
      {currentStageData && (
        <div className="sticky top-0 z-50 bg-[#17464F] text-white py-3 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Stage + Discount */}
            <div className="flex items-center gap-2 text-sm">
              <span>🔥</span>
              <span>
                本梯【<span className="text-[#D4B483] font-bold">{currentStageData.name}</span>】進行中
              </span>
              <span className="mx-1">·</span>
              <span>
                全方案 <span className="text-[#D4B483] font-bold">{currentStageData.discountLabel}</span>
              </span>
            </div>

            {/* Center: Countdown + Lowest Price */}
            <div className="flex items-center gap-4 text-sm">
              {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 ? (
                <span>
                  距離下一階段價格調整還有：
                  <span className="font-bold text-[#D4B483] ml-1">
                    {String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 小時{" "}
                    {String(timeLeft.minutes).padStart(2, "0")} 分
                  </span>
                </span>
              ) : (
                <span className="text-white/80">本階段已結束，價格即將切換至下一階段</span>
              )}
              <span className="mx-1">|</span>
              <span>
                單線方案本階段最低{" "}
                <span className="font-bold text-[#D4B483]">NT$ {lowestPrice ? formatPrice(lowestPrice) : "--"}</span> 起
              </span>
            </div>

            {/* Right: CTA */}
            <button
              onClick={scrollToPricing}
              className="bg-[#D4B483] text-[#17464F] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#c9a673] transition-colors flex-shrink-0"
            >
              查看三種方案
            </button>
          </div>
        </div>
      )}

      {/* SECTION 1 HERO START */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F5F3ED]">
        {/* Decorative Elements - 三個小圓點 */}
        <div className="absolute top-20 left-10 flex gap-2 z-10">
          <div className="w-2 h-2 rounded-full bg-[#D4B483]" />
          <div className="w-2 h-2 rounded-full bg-[#D4B483]/60" />
          <div className="w-2 h-2 rounded-full bg-[#D4B483]/30" />
        </div>
        <div className="absolute top-40 right-20 flex gap-2 z-10 hidden lg:flex">
          <div className="w-2 h-2 rounded-full bg-[#17464F]/30" />
          <div className="w-2 h-2 rounded-full bg-[#17464F]/60" />
          <div className="w-2 h-2 rounded-full bg-[#17464F]" />
        </div>

        {/* Main Content - Left Text, Right Image */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6 text-center lg:text-left">
              {/* 頂部小句 */}
              <p className="text-sm sm:text-base text-[#17464F]/70 font-medium tracking-wide">
                六個月後的你，可能會變成這樣的人：
              </p>

              {/* 三個「未來狀態」chips */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-[#C9D7D4] text-sm text-[#33393C] shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483] mr-2" />
                  知道自己適合哪條遠距路線
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-[#C9D7D4] text-sm text-[#33393C] shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483] mr-2" />
                  有一份能被看見、邏輯清楚的接案作品集
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-[#C9D7D4] text-sm text-[#33393C] shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483] mr-2" />
                  身邊有一群正在前進的成長夥伴
                </span>
              </div>

              {/* 主標 */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17464F] leading-tight tracking-wide">
                用六個月，
                <span className="block mt-2 text-[#D4B483]">把「也許有一天」變成「我正在路上」</span>
              </h1>

              {/* 副標 */}
              <p className="text-base sm:text-lg text-[#33393C] leading-relaxed max-w-xl mx-auto lg:mx-0">
                不用先辭職。透過線上課程、課後行動任務、
              </p>

              {/* CTA 區 */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#17464F] hover:bg-[#17464F]/90 text-white font-semibold px-8 py-7 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
                    立刻鎖定【{currentStageData?.name} NT$
                    {currentStageData ? formatPrice(currentStageData.prices.dualLine.stagePrice) : "--"}】
                  </a>
                </Button>
                {/* Secondary CTA */}
                <button
                  onClick={() => {
                    document.getElementById("course-highlights")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-[#17464F] hover:text-[#D4B483] font-medium text-base underline underline-offset-4 transition-colors duration-200"
                >
                  還在觀望？先看六個月怎麼走 ↓
                </button>
              </div>

              <div className="text-center lg:text-left pt-2">
                <p className="text-sm text-[#33393C]/70">
                  目前為{" "}
                  <span className="text-[#D4B483] font-semibold">
                    🔥 {currentStageData?.name}｜NT$
                    {currentStageData ? formatPrice(currentStageData.prices.dualLine.stagePrice) : "--"}
                  </span>
                  <span className="text-[#33393C]/50 line-through ml-1">
                    （原價 NT${currentStageData ? formatPrice(currentStageData.prices.dualLine.original) : "--"}）
                  </span>
                </p>
                {currentStageData && (
                  <p className="text-sm text-[#33393C]/60 mt-1">
                    截止：{currentStageData.endAt.getMonth() + 1}/{currentStageData.endAt.getDate()}（台北時間
                    23:59）｜剩餘：
                    <span className="font-medium text-[#17464F]">
                      {String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 小時
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Image Content */}
            <div className="hidden lg:block">
              {currentStageData && (
                <Image
                  src={stagePhotos[currentStageData.order - 1][currentPhotoIndex].src || "/placeholder.svg"}
                  alt={stagePhotos[currentStageData.order - 1][currentPhotoIndex].alt}
                  width={500}
                  height={500}
                  className="object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 1 HERO END */}

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#17464F] mb-8">選擇適合你的方案</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(currentStageData?.prices || {}).map(([planId, pricing]) => {
              const plan = planConfig[planId as PlanId]
              return (
                <div key={planId} className="bg-[#F5F3ED] rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-[#17464F] mb-4">{plan.name}</h3>
                  <p className="text-base text-[#33393C] mb-6">{currentStageData.tagLine}</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-[#D4B483]">{formatPrice(pricing.stagePrice)}</span>
                    <span className="text-sm text-[#33393C]"> NT$</span>
                  </div>
                  <Button
                    onClick={() => window.open(getCheckoutURLWithTracking(planId as PlanId), "_blank")}
                    className="bg-[#D4B483] text-[#17464F] px-6 py-3 rounded-full text-sm font-bold hover:bg-[#c9a673] transition-colors"
                  >
                    立即報名
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* Pricing Section End */}

      {/* Gallery Section */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="relative w-full h-[500px] mb-8">
              <Image
                src={stagePhotos[currentStage][currentPhotoIndex].src || "/placeholder.svg"}
                alt={stagePhotos[currentStage][currentPhotoIndex].alt}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-between">
              <button onClick={prevPhoto} className="text-gray-500 hover:text-gray-700">
                ←
              </button>
              <button onClick={nextPhoto} className="text-gray-500 hover:text-gray-700">
                →
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Gallery Section End */}

      {/* Instructor Section */}
      <section className="bg-[#F5F3ED] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#17464F] mb-8">專業講師陣容</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div key={instructor.name} className="bg-white rounded-lg p-6 text-center">
                <Image
                  src={instructor.image || "/placeholder.svg"}
                  alt={instructor.name}
                  width={100}
                  height={100}
                  className="rounded-full mb-4"
                />
                <h3 className="text-xl font-bold text-[#17464F] mb-2">{instructor.name}</h3>
                <p className="text-base text-[#33393C] mb-4">{instructor.title}</p>
                <Button
                  onClick={() => window.open(instructor.link, "_blank")}
                  className="bg-[#D4B483] text-[#17464F] px-6 py-3 rounded-full text-sm font-bold hover:bg-[#c9a673] transition-colors"
                >
                  瞭解更多
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Instructor Section End */}
    </main>
  )
}
