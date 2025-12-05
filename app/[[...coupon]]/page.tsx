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
  plans?: {
    singleLine: {
      price: number
      originalPrice: number
    }
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
    plans: {
      singleLine: { price: 8499, originalPrice: 16500 },
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
    plans: {
      singleLine: { price: 9499, originalPrice: 16500 },
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
    plans: {
      singleLine: { price: 9999, originalPrice: 16500 },
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
    plans: {
      singleLine: { price: 10499, originalPrice: 16500 },
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
    plans: {
      singleLine: { price: 10999, originalPrice: 16500 },
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
    plans: {
      singleLine: { price: 11499, originalPrice: 16500 },
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
    plans: {
      singleLine: { price: 11999, originalPrice: 16500 },
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
    plans: {
      singleLine: { price: 12499, originalPrice: 16500 },
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
    plans: {
      singleLine: { price: 13499, originalPrice: 16500 },
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
    plans: {
      singleLine: { price: 14499, originalPrice: 16500 },
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
    plans: {
      singleLine: { price: 15499, originalPrice: 16500 },
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
    plans: {
      singleLine: { price: 16500, originalPrice: 16500 },
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
    // Get the lowest price among single-line plans (selfMedia and remoteJob)
    const singleLinePrices = [
      currentStageData.prices.selfMedia.stagePrice,
      currentStageData.prices.remoteJob.stagePrice,
    ]
    return Math.min(...singleLinePrices)
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
    // If a plan is selected (e.g., from mobile view), use that planId. Otherwise, default to dualLine.
    const effectivePlanId = selectedPlanId || planId
    const baseURL = getCheckoutURL(effectivePlanId, couponCode || undefined)
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
  const [showAllStages, setShowAllStages] = useState(false) // New state for showing all stages in pricing timeline
  const [timelineExpanded, setTimelineExpanded] = useState(false) // State for timeline expansion

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
            <div className="flex items-center gap-2 text-sm">
              <span>🔥</span>
              <span>
                <span className="text-[#D4B483] font-bold">{currentStageData.name}</span> <span className="text-[#D4B483] font-bold">{currentStageData.discountLabel}</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
                <span>
                  距離距離下次價格調：
                  <span className="font-bold text-[#D4B483] ml-1">
                    {String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 小時{" "}
                    {String(timeLeft.minutes).padStart(2, "0")} 分 {String(timeLeft.seconds).padStart(2, "0")} 秒
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

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <p className="text-sm sm:text-base text-[#17464F]/70 font-medium tracking-wide">
                六個月後的你，可能會變成這樣的人：
              </p>

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

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17464F] leading-tight tracking-wide">
                用六個月，
                <span className="block mt-2 text-[#D4B483]">把「也許有一天」變成「我正在路上」</span>
              </h1>

              <p className="text-base sm:text-lg text-[#33393C] leading-relaxed max-w-xl mx-auto lg:mx-0">
                不用先辭職。透過線上課程、課後行動任務、共學社群，再搭配選修工作坊與國內外遊牧生態資源，在這六個月嘗試一連串的小行動與體驗，幫你一步步摸清楚：遠距／接案／遊牧是不是你要追的方向。
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                <span className="px-4 py-2 rounded-full bg-[#17464F] text-white text-sm font-medium">
                  自媒體接案線路
                </span>
                <span className="px-4 py-2 rounded-full bg-[#17464F] text-white text-sm font-medium">遠端上班線路</span>
                <span className="px-4 py-2 rounded-full bg-[#D4B483] text-[#17464F] text-sm font-medium">
                  也可以雙線並進
                </span>
              </div>

              <p className="text-sm text-[#33393C]/60 max-w-lg mx-auto lg:mx-0">
                這不是一張離職門票，而是一段可以在保有現職下完成的六個月行動旅程。
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col items-center lg:items-start gap-4">
                <Button
                  asChild
                  size="lg"
                  className="hidden md:inline-flex bg-[#17464F] hover:bg-[#17464F]/90 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
                    {currentStageData ? formatPrice(currentStageData.plans?.singleLine.price) : "--"}起】
                  </a>
                </Button>
                <button
                  onClick={() => {
                    document.getElementById("course-highlights")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-[#17464F] hover:text-[#D4B483] font-medium text-base underline underline-offset-4 transition-colors duration-200"
                >
                  還在觀望？先看六個月怎麼走 ↓
                </button>
              </div>

              <div className="hidden md:block text-center lg:text-left pt-2">
                {currentStageData && (
                  <>
                    <p className="text-sm text-[#33393C]/70">
                      目前為{" "}
                      <span className="text-[#D4B483] font-semibold">
                        🔥 {currentStageData.name}｜單線 NT${formatPrice(currentStageData.plans.singleLine.price)} 起
                      </span>
                      <span className="text-[#33393C]/50 line-through ml-1">
                        （原價 NT${formatPrice(currentStageData.prices.selfMedia.original)}）
                      </span>
                    </p>
                    <p className="text-sm text-[#33393C]/60 mt-1">
                      截止：{currentStageData.endAt.getMonth() + 1}/{currentStageData.endAt.getDate()}（台北時間
                      23:59）｜剩餘：
                      <span className="font-medium text-[#17464F]">
                        {String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 小時
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg">
                  <div className="aspect-[16/9] bg-[#C9D7D4] relative">
                    <Image
                      src="/images/hero-background.png"
                      alt="遠距工作場景 - 共同工作空間"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <div className="aspect-square bg-[#C9D7D4] relative">
                    <Image src="/images/2-1.jpeg" alt="遠距工作場景 - 旅途中工作" fill className="object-cover" />
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <div className="aspect-square bg-[#C9D7D4] relative">
                    <Image src="/images/2-2.jpeg" alt="遠距工作場景 - 小聚互動" fill className="object-cover" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-[#D4B483]/40 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 border-2 border-[#17464F]/20 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 1 HERO END */}

      {/* SECTION 2 COURSE HIGHLIGHTS START - 適合誰 */}
      <section id="course-highlights" className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 sm:mb-24">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-4 text-balance">
                正在尋找「下一步」的你
              </h2>
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
                <span className="w-2 h-2 rounded-full bg-[#17464F]" />
                <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-left">
              <p className="text-lg sm:text-xl text-[#17464F] font-medium mb-6 text-balance">
                不管你現在在哪個階段，你都有機會在這裡找到開始的位置
              </p>

              <div className="text-[#33393C] leading-relaxed mb-10 space-y-2">
                <p>你不一定已經想好要不要辭職、要不要成為全職 Nomad。</p>
                <p>但你心裡大概知道——</p>
                <p>接下來的人生，應該不只有「每天通勤、等著放假」這一種選項。</p>
                <p className="pt-2 text-[#17464F] font-medium">在這裡，你可能會在這幾種狀態裡，看到自己的影子：</p>
              </div>

              <div className="space-y-8 mb-10">
                <div className="border-l-4 border-[#D4B483] pl-5 sm:pl-6">
                  <h4 className="text-lg sm:text-xl font-bold text-[#17464F] mb-2">想要更有選擇權的職涯主線</h4>
                  <p className="text-[#33393C] leading-relaxed">
                    有穩定工作、不一定討厭現在公司，但看得到天花板；正在思考能否換到更彈性、可遠距的團隊，或讓履歷在未來更有選擇。
                  </p>
                </div>

                <div className="border-l-4 border-[#D4B483] pl-5 sm:pl-6">
                  <h4 className="text-lg sm:text-xl font-bold text-[#17464F] mb-2">想多一條安全感，不想只靠一份薪水</h4>
                  <p className="text-[#33393C] leading-relaxed">
                    想用內容、接案、知識服務慢慢累積第二條收入線；希望在不壓垮自己的前提下，踏出有感的一步，而不是一次
                    all-in。
                  </p>
                </div>

                <div className="border-l-4 border-[#D4B483] pl-5 sm:pl-6">
                  <h4 className="text-lg sm:text-xl font-bold text-[#17464F] mb-2">答案還不確定，但不想再只是想想</h4>
                  <p className="text-[#33393C] leading-relaxed">
                    現在的路看起來還行，但常被旅居、遠距、遊牧故事勾起一點遺憾；想在未來六個月裡，用比較踏實的方法去體驗、去嘗試，而不是只滑過別人的人生。
                  </p>
                </div>
              </div>

              <div className="bg-white/60 rounded-2xl p-6 sm:p-8 border border-[#C9D7D4]">
                <p className="text-[#33393C] leading-relaxed">
                  不需要完美符合其中一個分類，
                  <br className="hidden sm:block" />
                  很多學員一開始也是「幾種狀態混在一起」，
                  <br className="hidden sm:block" />
                  只是共同都有一個念頭：
                </p>
                <p className="text-[#17464F] font-semibold mt-3 text-lg">
                  「我想給自己一段時間，認真對待我真正想要的生活。」
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-16 sm:mb-20">
            <div className="h-px w-16 bg-[#D4B483]/50" />
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            <div className="h-px w-16 bg-[#D4B483]/50" />
          </div>
        </div>
      </section>
      {/* SECTION 2 COURSE HIGHLIGHTS END (Part 1: 適合誰) */}

      {/* SECTION 3 PAIN POINTS START - 三大痛點 */}
      <section className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-4 text-balance">
              不是你不夠努力，而是一直一個人亂撞
            </h2>
            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#C9D7D4]/50 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#C9D7D4]/30 rounded-full flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#17464F] mb-4">方向斷裂</h3>
              <p className="text-[#33393C] leading-relaxed text-sm sm:text-base">
                你是不是也想過很多種版本：
                <br />
                有時想去外商、有時想接案當 freelancer，
                <br />
                但每次看到別人的故事就改變主意，
                <br />
                到最後，反而哪一條都沒真的走下去。
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#C9D7D4]/50 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#C9D7D4]/30 rounded-full flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#17464F] mb-4">方法斷裂</h3>
              <p className="text-[#33393C] leading-relaxed text-sm sm:text-base">
                你也不是沒學東西：買課、看影片、存下很多筆記，
                <br />
                真正卡住的是——
                <br />
                「那我今天到底要做哪一個小步驟？」
                <br />
                所以日子一忙，又回到塬本的節奏。
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#C9D7D4]/50 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-[#C9D7D4]/30 rounded-full flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#17464F] mb-4">同伴斷裂</h3>
              <p className="text-[#33393C] leading-relaxed text-sm sm:text-base">
                身邊的人大多走很標準的路，
                <br />
                你很難跟他們分享「我其實想過不一樣的生活」。
                <br />
                不知道可以跟誰討論、問誰意見，
                <br />
                久了就習慣把這些想法藏在心裡。
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-base sm:text-lg text-[#17464F] font-medium leading-relaxed max-w-3xl mx-auto px-4">
              你缺的不是更多資訊，而是一個地方，
              <br className="sm:hidden" />
              讓你在未來六個月裡，有人陪你一起試、一起走、一起修正方向。
            </p>
          </div>
        </div>
      </section>
      {/* SECTION 3 PAIN POINTS END */}

      {/* SECTION 2 COURSE HIGHLIGHTS CONTINUED (Part 2: 六個月路線｜3+3 × 三大亮點) START */}
      <section className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#17464F] mb-6 text-balance">
              六個月路線｜3+3 月 × 三大亮點，讓改變真的走得完
            </h3>
            <div className="max-w-2xl mx-auto space-y-2">
              <p className="text-[#33393C] leading-relaxed">前 3 個月，是一起打底、一起行動的「共學探索期」。</p>
              <p className="text-[#33393C] leading-relaxed">後 3 個月，是把成果拉高、串起機會的「延伸累積期」。</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/60 rounded-2xl border border-slate-200 p-6 md:p-7 shadow-sm flex flex-col gap-4">
              <h4 className="text-base md:text-lg font-semibold text-[#17464F]">雙軌資源：副業增收 × 遠端上班</h4>
              <div className="text-sm md:text-base leading-relaxed text-slate-700 space-y-4">
                <p>
                  前 3 個月，你會在同一個學院裡，同時看見兩條路線的真實樣子：
                  自媒體接案線路幫你練習作品集、內容與接案提案； 遠端上班線路幫你優化履歷、LinkedIn、求職信與面試準備。
                  你可以先選一條線為主，也可以雙線並進，一邊學一邊試水溫。
                </p>
                <p>
                  後 3 個月，我們會用每月復盤工作坊幫你檢查： 哪一條路現在比較有動能？接下來 1–2 個月要押在哪裡？
                  也會優先把已經完成任務的學員，串接到 Journey 旅居活動， 以及未來生態系內部的 Job Board 機會池。
                </p>
              </div>
            </div>

            <div className="bg-white/60 rounded-2xl border border-slate-200 p-6 md:p-7 shadow-sm flex flex-col gap-4">
              <h4 className="text-base md:text-lg font-semibold text-[#17464F]">行動導向：課後任務 × 實作工作坊</h4>
              <div className="text-sm md:text-base leading-relaxed text-slate-700 space-y-4">
                <p>
                  前 3 個月，每一課後都有做得到、但有一點挑戰的行動任務：
                  發一支影片、寫一封信、更新履歷、完成一個小專案⋯⋯
                  你不用自己猜下一步，只要跟著每週任務，把遠距上班或接案， 拆成一個一個可以完成的小步驟，並在 Skool
                  上交作業、收到回饋。
                </p>
                <p>
                  後 3 個月，重心會從「學新東西」轉向「把成果拉高」：
                  依照你最卡的地方，選修影音剪輯、AI、自動化、英文、網站等實作工作坊，
                  並把作業整理成可以對外公開的作品集、內容或提案， 讓別人看得到你的行動，也讓機會有機會找到你。
                </p>
              </div>
            </div>

            <div className="bg-white/60 rounded-2xl border border-slate-200 p-6 md:p-7 shadow-sm flex flex-col gap-4">
              <h4 className="text-base md:text-lg font-semibold text-[#17464F]">社群支持：Skool × 同學會 × 校友連結</h4>
              <div className="text-sm md:text-base leading-relaxed text-slate-700 space-y-4">
                <p>
                  前 3 個月，你不會一個人在房間裡上課、做作業。 所有學員都在同一個 Skool
                  共學空間裡，看得到彼此的提問與成果， 再依線路與主題分成小隊與專屬群組，
                  搭配線上同學會，分享每個月的心得、卡關與實驗結果。
                </p>
                <p>
                  後 3 個月，這個社群會變成你的長期資源： 延伸的校友與城市群組（Skool、Line、LinkedIn），
                  讓你在結業後，仍然有一群人可以一起交換機會、一起對齊方向； 線上線下聚會與 Journey
                  活動，也會把螢幕前的同學， 變成世界各地真的一起走路的夥伴。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 2 COURSE HIGHLIGHTS CONTINUED (Part 2) END */}

      {/* SECTION 2.1 ECOSYSTEM PARTNERSHIP START - 生態系 */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17464F] mb-4">遊牧資源生態系</h2>
            <p className="text-lg text-[#33393C]">線上教育 | 線下社群 | 國際鏈結</p>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-2 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-12 mb-8">
              <div className="text-center">
                <a
                  href="https://www.instagram.com/digitalnomadstaiwan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-105 transition-transform duration-200"
                >
                  <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-lg p-2 sm:p-4 border border-[#C9D7D4]">
                    <Image
                      src="/images/design-mode/%E6%95%B8%E4%BD%8D%E9%81%8A%E7%89%A7%E5%8F%B0%E7%81%A3%20Logo%281%29%281%29%281%29%281%29.png"
                      alt="Taiwan Digital Nomad"
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </a>
                <p className="text-[#17464F] font-medium text-xs sm:text-sm">#台灣最大數位遊牧社群</p>
              </div>

              <div className="hidden lg:flex text-[#D4B483] text-7xl items-center justify-center h-32">×</div>

              <div className="text-center">
                <a
                  href="https://www.instagram.com/elsacampus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-105 transition-transform duration-200"
                >
                  <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-lg p-2 sm:p-4 border border-[#C9D7D4]">
                    <Image
                      src="/images/design-mode/%E6%88%90%E9%95%B7%E7%87%9FLogo.jpg"
                      alt="艾兒莎成長營"
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </a>
                <p className="text-[#17464F] font-medium text-xs sm:text-sm">#多年不同學院創建經驗</p>
              </div>

              <div className="hidden lg:flex text-[#D4B483] text-7xl items-center justify-center h-32">×</div>

              <div className="text-center">
                <a
                  href="https://newsveg.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-105 transition-transform duration-200"
                >
                  <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-lg p-2 sm:p-4 border border-[#C9D7D4]">
                    <Image
                      src="/images/design-mode/%E7%94%9F%E9%AE%AE%E6%99%82%E6%9B%B8%20Logo%281%29%281%29%281%29%281%29.png"
                      alt="生鮮時書 NEWSVEG"
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </a>
                <p className="text-[#17464F] font-medium text-xs sm:text-sm">#知識萃取專家</p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-[#17464F]">強強聯手，全面資源整合</h3>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 2.1 ECOSYSTEM PARTNERSHIP END */}

      {/* SECTION 4 INSTRUCTORS START - 師資 */}
      <section className="py-16 sm:py-24 bg-white">
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
                <span className="text-[#D4B483]">A 線｜</span>自媒體接案線路導師
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
              <div className="h-px w-12 bg-[#D4B483]"></div>
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
      {/* SECTION 4 INSTRUCTORS END */}

      {/* SECTION 5 COURSE OUTLINE START - 課程地圖 */}
      <section id="course-map" className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-4 text-balance">
              課程地圖｜3+3 個月，先打底，再累積
            </h2>
            <div className="flex items-center justify-center gap-2 mt-6 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
              <span className="w-2 h-2 rounded-full bg-[#17464F]" />
              <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            </div>
            <p className="text-[#33393C] max-w-2xl mx-auto leading-relaxed">
              前 3 個月，用線上課程＋課後任務打好基礎、走完一條主線；
              <br className="hidden sm:block" />後 3 個月，透過復盤、選修工作坊與社群機制，把成果累積成真正的改變。
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#17464F] mb-2">前 3 個月｜行動共學期</h3>
            <p className="text-[#33393C]/80">選線路、修共同必修、搭配選修課程</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-[#17464F] rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#17464F] mb-3">線路課程</h3>
              <p className="text-sm text-[#A06E56] font-medium mb-4">自媒體接案線路 × 遠端上班線路</p>
              <div className="text-[#33393C] text-sm md:text-base leading-relaxed space-y-5">
                <div className="border-l-2 border-[#D4B483] pl-4">
                  <p className="font-semibold text-[#17464F] mb-2">A 線｜自媒體接案</p>
                  <p className="text-[#33393C]/80 mb-2">想透過內容、短影音、個人品牌，累積讀者與客戶</p>
                  <ul className="space-y-1 text-[#33393C]/70 text-sm">
                    <li>• 自媒體變現攻略</li>
                    <li>• 接案作品集與市場調查</li>
                    <li>• 自媒體定位與內容</li>
                    <li>• 短影音實作</li>
                  </ul>
                </div>
                <div className="border-l-2 border-[#17464F] pl-4">
                  <p className="font-semibold text-[#17464F] mb-2">B 線｜遠端上班</p>
                  <p className="text-[#33393C]/80 mb-2">想往遠端團隊、外商或更彈性職涯前進</p>
                  <ul className="space-y-1 text-[#33393C]/70 text-sm">
                    <li>• 職涯成長藍圖與目標設定</li>
                    <li>• LinkedIn 經營攻略</li>
                    <li>• 履歷與求職信秘笈</li>
                    <li>• 獵頭與面試談薪策略</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-[#D4B483] rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#17464F] mb-3">共同必修</h3>
              <p className="text-sm text-[#A06E56] font-medium mb-4">Direction × General 通識</p>
              <div className="text-[#33393C] text-sm md:text-base leading-relaxed space-y-5">
                <div className="border-l-2 border-[#D4B483] pl-4">
                  <p className="font-semibold text-[#17464F] mb-2">Direction｜方向定位</p>
                  <p className="text-[#33393C]/80 mb-2">幫你找到核心價值，定位自己的方向</p>
                  <ul className="space-y-1 text-[#33393C]/70 text-sm">
                    <li>• 人生自由藍圖</li>
                    <li>• 自我盤點與定位</li>
                    <li>• 知識變現起步</li>
                  </ul>
                </div>
                <div className="border-l-2 border-[#17464F] pl-4">
                  <p className="font-semibold text-[#17464F] mb-2">General｜通識技能</p>
                  <p className="text-[#33393C]/80 mb-2">遠距人生必備的基礎能力</p>
                  <ul className="space-y-1 text-[#33393C]/70 text-sm">
                    <li>• AI 與自動化工作流</li>
                    <li>• 旅居財務規劃</li>
                    <li>• 人生 SOP 與身心平衡</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-[#C9D7D4] rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110-4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#17464F] mb-3">選修課程</h3>
              <p className="text-sm text-[#A06E56] font-medium mb-4">依你的目標，加上需要的實作肌肉</p>
              <div className="text-[#33393C] text-sm md:text-base leading-relaxed">
                <p className="text-[#33393C]/80 mb-4">
                  不是為了修滿學分，而是補上自己現在最缺的能力。依據你的目標，選擇需要的實作工作坊：
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F5F3ED] rounded-lg p-3 text-center">
                    <span className="text-[#17464F] font-medium text-sm">工作英文</span>
                  </div>
                  <div className="bg-[#F5F3ED] rounded-lg p-3 text-center">
                    <span className="text-[#17464F] font-medium text-sm">Coffee Chat</span>
                  </div>
                  <div className="bg-[#F5F3ED] rounded-lg p-3 text-center">
                    <span className="text-[#17464F] font-medium text-sm">跨文化協作</span>
                  </div>
                  <div className="bg-[#F5F3ED] rounded-lg p-3 text-center">
                    <span className="text-[#17464F] font-medium text-sm">Vibe Coding</span>
                  </div>
                  <div className="bg-[#F5F3ED] rounded-lg p-3 text-center">
                    <span className="text-[#17464F] font-medium text-sm">影音剪輯</span>
                  </div>
                  <div className="bg-[#F5F3ED] rounded-lg p-3 text-center">
                    <span className="text-[#17464F] font-medium text-sm">AI 實作</span>
                  </div>
                </div>
                <p className="text-[#33393C]/70 text-sm mt-4">＊ 選修課程會依據學員需求持續更新</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#17464F] to-[#1a5952] rounded-2xl p-6 md:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              後 3 個月｜延伸累積期：復盤、加強、銜接機會
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4B483] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">每月復盤工作坊</p>
                    <p className="text-white/80 text-sm leading-relaxed">一起檢視進度，調整你的接案／求職／旅居策略</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4B483] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">選修課程與延伸實作工作坊</p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      針對影音剪輯、AI、自動化、英文、網站…做針對性加強
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4B483] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">講師團隊 QA ＋ 線上線下聚會</p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      在
                      Skool、共學群組與同學會中，把作業變成對外可公開的作品集、履歷或內容。完成任務的同學未來也會優先被推薦參與
                      Journey 旅居活動或 Job Board 相關機會。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setShowFullSchedule(!showFullSchedule)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#17464F] text-[#17464F] rounded-full font-medium hover:bg-[#17464F] hover:text-white transition-all duration-300"
            >
              {showFullSchedule ? "收起完整課程時間表" : "查看完整每週安排"}
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${showFullSchedule ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {showFullSchedule && (
            <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 bg-[#17464F]">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">第一個月：通識打底 + 自媒體接案啟動</h3>
                  <p className="text-white/80">核心目標：建立遠距基礎認知，踏出內容創作與接案的第一步</p>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    {
                      week: 1,
                      title: "從零到第一步的遠距人生：打造你的數位遊牧起跑線",
                      instructor: "工具王阿璋",
                      type: "通識",
                    },
                    {
                      week: 2,
                      title: "讓 AI 成為你的實習生：從對話到自動化的第一個完整流程",
                      instructor: "林上哲",
                      type: "通識",
                    },
                    { week: 3, title: "爆款內容養成術：上班族也能做出會紅的作品", instructor: "三分鐘", type: "A線" },
                    { week: 4, title: "30 秒變人氣：短影片爆紅腳本全攻略", instructor: "林佳 Zoe", type: "A線" },
                    { week: 5, title: "立即開始：打磨你的第一個接案方案", instructor: "西打藍", type: "A線" },
                  ].map((item) => (
                    <div key={item.week} className="flex items-center gap-4 p-4 bg-[#F5F3ED] rounded-xl">
                      <div className="flex-shrink-0">
                        <Image
                          src={instructors.find((i) => i.name === item.instructor)?.image || "/placeholder.svg"}
                          alt={item.instructor}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-full object-cover shadow-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-[#17464F] text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                            第 {item.week} 週
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.type === "通識" ? "bg-[#D4B483] text-white" : "bg-[#C9D7D4] text-[#17464F]"}`}
                          >
                            {item.type}
                          </span>
                          <span className="text-[#17464F] font-medium text-sm">{item.instructor}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-semibold text-[#33393C] truncate">{item.title}</h4>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedWeek({
                            week: item.week,
                            title: item.title,
                            instructor: item.instructor,
                            instructorData: instructors.find((i) => i.name === item.instructor),
                            month: 1,
                          })
                        }
                        className="flex-shrink-0 bg-[#17464F] hover:bg-[#17464F]/80 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        詳情
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 bg-[#17464F]">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">第二個月：遠端上班線路深挖</h3>
                  <p className="text-white/80">核心目標：打造國際履歷、LinkedIn 品牌，掌握外商面試與談薪策略</p>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { week: 6, title: "突破薪資天花板：跨國職涯的高薪祕訣", instructor: "許詮", type: "通識" },
                    { week: 7, title: "讓機會找上你：LinkedIn 國際個人品牌攻略", instructor: "Shelley", type: "B線" },
                    {
                      week: 8,
                      title: "外商面試全拆解：讀懂雇主需求，打造讓 HR 馬上點頭的履歷與回答",
                      instructor: "讀者太太",
                      type: "B線",
                    },
                    { week: 9, title: "獵頭不告訴你的祕密：談薪與職涯跳躍策略", instructor: "Emilia", type: "B線" },
                  ].map((item) => (
                    <div key={item.week} className="flex items-center gap-4 p-4 bg-[#F5F3ED] rounded-xl">
                      <div className="flex-shrink-0">
                        <Image
                          src={instructors.find((i) => i.name === item.instructor)?.image || "/placeholder.svg"}
                          alt={item.instructor}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-full object-cover shadow-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-[#17464F] text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                            第 {item.week} 週
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.type === "通識" ? "bg-[#D4B483] text-white" : "bg-[#C9D7D4] text-[#17464F]"}`}
                          >
                            {item.type}
                          </span>
                          <span className="text-[#17464F] font-medium text-sm">{item.instructor}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-semibold text-[#33393C] truncate">{item.title}</h4>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedWeek({
                            week: item.week,
                            title: item.title,
                            instructor: item.instructor,
                            instructorData: instructors.find((i) => i.name === item.instructor),
                            month: 2,
                          })
                        }
                        className="flex-shrink-0 bg-[#17464F] hover:bg-[#17464F]/80 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        詳情
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 bg-[#17464F]">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">第三個月：系統整合與可持續規劃</h3>
                  <p className="text-white/80">核心目標：整合所學，建立長期發展策略，打造可持續的遠距人生</p>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    {
                      week: 10,
                      title: "從零到第一步的遠距人生：打造你的數位遊牧起跑線",
                      instructor: "鮪魚",
                      type: "通識",
                    },
                    { week: 11, title: "邊旅行邊安心：旅居人生的財務自由設計", instructor: "Joyce Weng", type: "通識" },
                    {
                      week: 12,
                      title: "可持續的自由：身心靈平衡的遠距人生 SOP",
                      instructor: "Angela Feng",
                      type: "通識",
                    },
                  ].map((item) => (
                    <div key={item.week} className="flex items-center gap-4 p-4 bg-[#F5F3ED] rounded-xl">
                      <div className="flex-shrink-0">
                        <Image
                          src={instructors.find((i) => i.name === item.instructor)?.image || "/placeholder.svg"}
                          alt={item.instructor}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-full object-cover shadow-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-[#17464F] text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                            第 {item.week} 週
                          </span>
                          <span className="bg-[#D4B483] text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                            {item.type}
                          </span>
                          <span className="text-[#17464F] font-medium text-sm">{item.instructor}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-semibold text-[#33393C] truncate">{item.title}</h4>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedWeek({
                            week: item.week,
                            title: item.title,
                            instructor: item.instructor,
                            instructorData: instructors.find((i) => i.name === item.instructor),
                            month: 3,
                          })
                        }
                        className="flex-shrink-0 bg-[#17464F] hover:bg-[#17464F]/80 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        詳情
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* SECTION 5 COURSE OUTLINE END */}

      {/* SECTION 5.1 COURSE DETAIL MODAL START */}
      {selectedWeek && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedWeek(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedWeek(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 text-xl font-bold z-10"
            >
              ×
            </button>

            <div className="p-6 pr-12">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={selectedWeek.instructorData?.image || "/placeholder.svg"}
                  alt={selectedWeek.instructor}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-[#D4B483]/30"
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#17464F] px-3 py-1 rounded-full text-sm font-semibold text-white">
                      第 {selectedWeek.week} 週
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#17464F] mb-1">{selectedWeek.instructor}</h3>
                  <p className="text-[#33393C] text-sm">{selectedWeek.instructorData?.title}</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#17464F] mb-4 text-balance">{selectedWeek.title}</h2>
                <div className="w-full h-1 rounded-full bg-[#D4B483]"></div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#17464F] mb-3">課程目標</h4>
                <div className="bg-[#F5F3ED] p-4 rounded-xl">
                  <p className="text-[#33393C] leading-relaxed">
                    {selectedWeek.month === 1 &&
                      selectedWeek.week === 1 &&
                      "打開對數位遊牧生活的想像，理解不同型態的遠距人生可能樣貌。掌握多元收入模式，從自由接案、自媒體經營到被動收入。繪製專屬的遊牧起點地圖，找到屬於自己的第一步。"}
                    {selectedWeek.month === 1 &&
                      selectedWeek.week === 2 &&
                      "掌握 AI 與自動化的實際應用，學會與 AI 有效溝通並設計串接流程，完成第一個「從對話到自動化」的完整任務。"}
                    {selectedWeek.month === 1 &&
                      selectedWeek.week === 3 &&
                      "學會定位並經營個人品牌，設計內容架構，提升流量與轉化力，完成一篇具備爆紅潛力的作品。"}
                    {selectedWeek.month === 1 &&
                      selectedWeek.week === 4 &&
                      "掌握短影片流量密碼，理解爆紅三要素，完成一支短影片，體驗從腳本到成片，建立內容規劃能力，規劃未來短影片腳本。"}
                    {selectedWeek.month === 1 &&
                      selectedWeek.week === 5 &&
                      "學會將作品轉化為能銷售的方案，練習現場銷售話術與應對，完成第一個可推廣的接案方案。"}
                    {selectedWeek.month === 2 &&
                      selectedWeek.week === 6 &&
                      "拓展國際視野，了解跨國企業工作的可能性，學習規劃跨國職涯並提升薪資談判力，從真實案例找到國際職涯突破點。"}
                    {selectedWeek.month === 2 &&
                      selectedWeek.week === 7 &&
                      "優化 LinkedIn 個人檔案，提升能見度，打造專業形象與品牌，吸引企業與合作邀約，學會主動 + 被動並行策略，拓展高品質人脈，建立即時可用的 LinkedIn 實戰方法。"}
                    {selectedWeek.month === 2 &&
                      selectedWeek.week === 8 &&
                      "精準分析 JD，掌握雇主需求，熟悉外商面試流程與關鍵環節，完成一份客製化履歷與 Cover Letter draft，模擬外商面試問答，展現關鍵能力。"}
                    {selectedWeek.month === 2 &&
                      selectedWeek.week === 9 &&
                      "學會優化履歷，在國際獵頭眼中脫穎而出，掌握薪資談判技巧，提升談判成功率，了解跨國職缺申請流程並實際投遞，建立職涯成長策略，找到「下一步」。"}
                    {selectedWeek.month === 3 &&
                      selectedWeek.week === 10 &&
                      "學會知識產品全景介紹，知識萃取技巧，快速驗證方法。"}
                    {selectedWeek.month === 3 &&
                      selectedWeek.week === 11 &&
                      "制定旅居財務規劃表，掌握收支平衡，了解跨國移動中如何保持財務穩定，預備未來自由生活，降低財務焦慮。"}
                    {selectedWeek.month === 3 &&
                      selectedWeek.week === 12 &&
                      "學會設計生活與工作 SOP，建立可持續的人生規劃，建立身心靈平衡，提升專注力與效能，學會自我覺察與有效溝通。"}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#17464F] mb-3">講師更多資訊</h4>
                <a
                  href={selectedWeek.instructorData?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#17464F] hover:bg-[#17464F]/80 px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-200"
                >
                  更多講師資訊
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* SECTION 5.1 COURSE DETAIL MODAL END */}

      {/* SECTION 6 PODCAST LEADERS START */}
      <section className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17464F] mb-6">
              國際視野，不只是課堂裡的投影片
            </h2>
            <div className="w-24 h-1 bg-[#D4B483] mx-auto rounded-full mb-8"></div>
            <p className="text-[#33393C] text-lg leading-relaxed max-w-3xl mx-auto">
              遠距遊牧學院的內容，不是關在房間裡想像出來的。
              <br className="hidden sm:block" />
              這幾年，我們持續和來自不同國家的 Nomad、遠端工作者、創業者對話，
              <br className="hidden sm:block" />
              也透過 Nomad Leaders Podcast 訪談在世界各地實驗不同生活方式的人。
              <br className="hidden sm:block" />
              學院裡很多觀念，都是從這些真實故事長出來的。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#C9D7D4] hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#D4B483]/30 mb-4">
                  <img src="/images/osera-ryo.png" alt="Osera Ryo" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs bg-[#17464F]/10 text-[#17464F] px-3 py-1 rounded-full mb-2">日本</span>
                <h3 className="text-lg font-bold text-[#17464F] mb-1">Osera Ryo</h3>
                <p className="text-sm text-[#33393C] mb-3">
                  Colive Fukuoka 共同創辦人
                  <br />
                  日本數位遊牧協會執行理事
                </p>
                <p className="text-sm text-[#33393C]/80 leading-relaxed">
                  「社群不只是網路上的連結，而是讓人們在不同城市找到歸屬感的方式。」
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#C9D7D4] hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#D4B483]/30 mb-4">
                  <img
                    src="/images/johannes-volkner.png"
                    alt="Johannes Völkner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs bg-[#17464F]/10 text-[#17464F] px-3 py-1 rounded-full mb-2">德國</span>
                <h3 className="text-lg font-bold text-[#17464F] mb-1">Johannes Völkner</h3>
                <p className="text-sm text-[#33393C] mb-3">
                  Nomad Cruise 創辦人
                  <br />
                  全球數位遊牧社群先驅
                </p>
                <p className="text-sm text-[#33393C]/80 leading-relaxed">
                  「社群先於產品——當人們真正連結，一切都會自然發生。」
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#C9D7D4] hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#D4B483]/30 mb-4">
                  <img src="/images/harry-wang.png" alt="Harry Wang" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs bg-[#17464F]/10 text-[#17464F] px-3 py-1 rounded-full mb-2">台灣</span>
                <h3 className="text-lg font-bold text-[#17464F] mb-1">Harry Wang</h3>
                <p className="text-sm text-[#33393C] mb-3">
                  DigitalNomadsTaiwan 創辦人
                  <br />
                  Nomad Leaders Podcast 主持人
                </p>
                <p className="text-sm text-[#33393C]/80 leading-relaxed">
                  「把台灣的遊牧故事帶到世界，也把世界的視野帶回台灣。」
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 border border-[#C9D7D4] mb-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-xl overflow-hidden shadow-md">
                  <img
                    src="/images/podcast-cover.png"
                    alt="Nomad Leaders Podcast"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-[#17464F] mb-2">Nomad Leaders Podcast</h3>
                <p className="text-[#33393C] mb-4 leading-relaxed">
                  收錄超過 50 集國際遊牧者訪談，從日本、德國、泰國、越南到台灣，
                  <br className="hidden lg:block" />
                  聽聽這些人怎麼設計自己的工作與生活。
                </p>
                <a
                  href="https://open.spotify.com/show/nomadleaders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#17464F] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0f3339] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  在這裡聽故事
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-[#33393C] leading-relaxed max-w-2xl mx-auto">
              你不只是在上「一門課」，
              <br />
              而是在和一群分散在世界各地的人，一起思考怎麼活出更自由的版本。
            </p>
          </div>
        </div>
      </section>
      {/* SECTION 6 PODCAST LEADERS END */}

      {/* SECTION 7 LEARNING RESOURCES START */}
      <section className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#17464F] mb-4">
              你不只是買一門課，而是走進一個行動生態系
            </h2>
            <p className="text-[#33393C]/80 max-w-2xl mx-auto leading-relaxed">
              六個月裡，你會接觸到的不只是固定幾堂課，
              <br className="hidden sm:inline" />
              而是一整套幫你「學、做、問、連結」的資源組合。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#17464F] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#17464F]">主課程與課後任務</h3>
                </div>
                <p className="text-[#D4B483] font-medium text-sm mb-3">讓每一週都有明確下一步</p>
                <p className="text-[#33393C]/80 leading-relaxed mb-6">
                  通識課程＋雙線路主課程，是你六個月的主軸。每一堂課後都有設計好的必修作業與進階挑戰，讓你不會只停在「聽懂」，而是每週都完成一個小行動。
                </p>
                <div className="hidden sm:grid sm:grid-cols-3 gap-3">
                  {stagePhotos[0].slice(0, 3).map((photo, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openGallery(0, index)}
                    >
                      <Image
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
                <div className="sm:hidden overflow-x-auto">
                  <div className="flex gap-3 pb-2">
                    {stagePhotos[0].slice(0, 3).map((photo, index) => (
                      <div
                        key={index}
                        className="relative w-48 aspect-video rounded-lg overflow-hidden cursor-pointer group flex-shrink-0"
                        onClick={() => openGallery(0, index)}
                      >
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#17464F] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#17464F]">實作工作坊與選修</h3>
                </div>
                <p className="text-[#D4B483] font-medium text-sm mb-3">針對卡關點補強實戰能力</p>
                <p className="text-[#33393C]/80 leading-relaxed mb-6">
                  依照你的目標與卡關點，你可以選修不同主題的實作工作坊：影音剪輯、AI、自動化、工作英文、網站 / Vibe
                  Coding⋯這些課都是「邊看邊做」，幫你把主課程裡學到的東西，變成看得見、用得出的成果。
                </p>
                <div className="hidden sm:grid sm:grid-cols-3 gap-3">
                  {stagePhotos[3].slice(0, 3).map((photo, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openGallery(3, index)}
                    >
                      <Image
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
                <div className="sm:hidden overflow-x-auto">
                  <div className="flex gap-3 pb-2">
                    {stagePhotos[3].slice(0, 3).map((photo, index) => (
                      <div
                        key={index}
                        className="relative w-48 aspect-video rounded-lg overflow-hidden cursor-pointer group flex-shrink-0"
                        onClick={() => openGallery(3, index)}
                      >
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#17464F] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#17464F]">共學社群與校友連結</h3>
                </div>
                <p className="text-[#D4B483] font-medium text-sm mb-3">讓路上不只剩你一個人</p>
                <p className="text-[#33393C]/80 leading-relaxed mb-6">
                  Skool
                  共學空間、線上同學會、專屬群組，讓你可以在六個月裡隨時提問、分享、找人討論。結業後，還有校友與城市群組，持續交換機會與經驗。
                </p>
                <div className="hidden sm:grid sm:grid-cols-3 gap-3">
                  {stagePhotos[1].slice(0, 3).map((photo, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openGallery(1, index)}
                    >
                      <Image
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
                <div className="sm:hidden overflow-x-auto">
                  <div className="flex gap-3 pb-2">
                    {stagePhotos[1].slice(0, 3).map((photo, index) => (
                      <div
                        key={index}
                        className="relative w-48 aspect-video rounded-lg overflow-hidden cursor-pointer group flex-shrink-0"
                        onClick={() => openGallery(1, index)}
                      >
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#17464F] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#17464F]">旅居與機會生態</h3>
                </div>
                <p className="text-[#D4B483] font-medium text-sm mb-3">把學到的帶到真實世界</p>
                <p className="text-[#33393C]/80 leading-relaxed mb-6">
                  學院背後連結的是完整的 Nomad 生態系：國內外 Nomad Journey 旅居活動、生態系內部機會、未來 Job
                  Board⋯當你準備好，這裡有下一步可以嘗試的舞台。
                </p>
                <div className="hidden sm:grid sm:grid-cols-3 gap-3">
                  {stagePhotos[2].slice(0, 3).map((photo, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openGallery(2, index)}
                    >
                      <Image
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
                <div className="sm:hidden overflow-x-auto">
                  <div className="flex gap-3 pb-2">
                    {stagePhotos[2].slice(0, 3).map((photo, index) => (
                      <div
                        key={index}
                        className="relative w-48 aspect-video rounded-lg overflow-hidden cursor-pointer group flex-shrink-0"
                        onClick={() => openGallery(2, index)}
                      >
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 7 LEARNING RESOURCES END */}

      {/* SECTION 8 PRICING & TIMELINE START */}
      <section id="pricing" className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17464F] mb-6">
              選一條先走，也可以雙線並進
            </h2>
            <p className="text-lg sm:text-xl text-[#33393C] max-w-3xl mx-auto leading-relaxed">
              所有方案都包含六個月的 3+3 成長節奏、通識課程、Skool 共學社群，
              <br className="hidden sm:block" />
              差別只在於：你想先專心走哪一條主線，或是一次打開兩種可能。
            </p>
            {currentStageData && (
              <div className="mt-6 inline-flex items-center gap-2 bg-[#17464F] text-white px-4 py-1 rounded-full text-sm">
                <span>🔥</span>
                <span>
                  目前為「<span className="text-[#D4B483] font-bold">{currentStageData.name}</span>」·{" "}
                  {currentStageData.discountLabel}
                </span>
              </div>
            )}
          </div>

          <div className="mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-[#17464F] text-center mb-8">價格階段時間軸</h3>

            {/* Desktop: 橫向時間軸，預設顯示 6 個，可展開全部 */}
            <div className="hidden md:block">
              <div className="relative overflow-x-auto pb-4">
                <div className="flex items-center justify-between min-w-max px-4">
                  {(timelineExpanded ? stages : stages.filter((_, i) => i % 2 === 0 || i === stages.length - 1)).map(
                    (stage, index, arr) => {
                      const now = new Date()
                      const isPast = now > stage.endAt
                      const isCurrent = now >= stage.startAt && now <= stage.endAt
                      const isFuture = now < stage.startAt

                      return (
                        <div key={stage.id} className="flex items-center">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                isCurrent
                                  ? "bg-[#D4B483] border-[#D4B483] ring-4 ring-[#D4B483]/30"
                                  : isPast
                                    ? "bg-gray-300 border-gray-300"
                                    : "bg-white border-[#17464F]"
                              }`}
                            />
                            <div
                              className={`mt-3 text-center ${
                                isCurrent ? "text-[#17464F] font-bold" : isPast ? "text-gray-400" : "text-[#33393C]"
                              }`}
                            >
                              <div className="text-xs sm:text-sm whitespace-nowrap">{stage.name}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                {stage.startAt.getMonth() + 1}/{stage.startAt.getDate()}
                              </div>
                              {isCurrent && (
                                <div className="text-xs text-[#D4B483] font-medium mt-1">{stage.discountLabel}</div>
                              )}
                            </div>
                          </div>
                          {index < arr.length - 1 && (
                            <div
                              className={`w-12 sm:w-16 h-0.5 mx-2 ${
                                isPast ? "bg-gray-300" : isCurrent ? "bg-[#D4B483]" : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>
                      )
                    },
                  )}
                </div>
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={() => setTimelineExpanded(!timelineExpanded)}
                  className="text-[#17464F] hover:text-[#D4B483] text-sm font-medium transition-colors"
                >
                  {timelineExpanded ? "收合時間軸" : `展開全部 ${stages.length} 個階段`}
                </button>
              </div>
            </div>

            {/* Mobile: 垂直時間軸，預設顯示 4 個 */}
            <div className="md:hidden">
              <div className="space-y-4">
                {(timelineExpanded ? stages : stages.slice(0, 4)).map((stage, index) => {
                  const now = new Date()
                  const isPast = now > stage.endAt
                  const isCurrent = now >= stage.startAt && now <= stage.endAt

                  return (
                    <div
                      key={stage.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${
                        isCurrent
                          ? "bg-[#17464F] text-white border-[#17464F]"
                          : isPast
                            ? "bg-gray-100 text-gray-400 border-gray-200"
                            : "bg-white text-[#33393C] border-slate-200"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          isCurrent ? "bg-[#D4B483]" : isPast ? "bg-gray-300" : "bg-[#17464F]"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{stage.name}</div>
                        <div className={`text-xs ${isCurrent ? "text-white/70" : "text-gray-500"}`}>
                          {stage.startAt.getMonth() + 1}/{stage.startAt.getDate()} ~ {stage.endAt.getMonth() + 1}/
                          {stage.endAt.getDate()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${isCurrent ? "text-[#D4B483]" : ""}`}>{stage.discountLabel}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
              {!timelineExpanded && stages.length > 4 && (
                <button
                  onClick={() => setTimelineExpanded(true)}
                  className="w-full mt-4 py-3 text-[#17464F] hover:text-[#D4B483] text-sm font-medium border border-[#17464F] rounded-full transition-colors"
                >
                  展開看全部 {stages.length} 個階段
                </button>
              )}
              {timelineExpanded && (
                <button
                  onClick={() => setTimelineExpanded(false)}
                  className="w-full mt-4 py-3 text-[#17464F] hover:text-[#D4B483] text-sm font-medium transition-colors"
                >
                  收合
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div
              className={`bg-white rounded-2xl border shadow-sm flex flex-col transition-all duration-300 ${
                selectedPlanId === "selfMedia"
                  ? "border-[#D4B483] border-2 shadow-lg ring-2 ring-[#D4B483]/20"
                  : "border-slate-200"
              }`}
            >
              <div className="bg-[#17464F] text-white py-4 px-6 text-center">
                <h3 className="text-xl font-bold">自媒體接案線路</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[#33393C] text-sm mb-4 pb-4 border-b border-slate-100">
                  適合想用內容與個人品牌，慢慢建立第二條收入的人。
                </p>
                <ul className="space-y-3 text-sm text-[#33393C] mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>
                      <strong>通識課程</strong>（Direction＋General）：人生藍圖、AI、自動化、旅居財務
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>
                      <strong>自媒體接案主課程</strong>：定位、內容系統、作品集、短影音實作
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>六個月 Skool 共學社群與同學會</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>選修實作工作坊（剪輯、AI、自動化、工作英文等）</span>
                  </li>
                </ul>
                <div className="text-center pt-4 border-t border-slate-100">
                  {currentStageData && (
                    <>
                      <div className="text-sm text-gray-500 line-through mb-1">
                        原價 NT$ {formatPrice(currentStageData.prices.selfMedia.original)}
                      </div>
                      <div className="text-3xl font-bold text-[#17464F] mb-1">
                        NT$ {formatPrice(currentStageData.prices.selfMedia.stagePrice)}
                      </div>
                      <div className="text-xs text-[#D4B483] font-medium mb-4">
                        目前為「{currentStageData.name}」· {currentStageData.discountLabel}（省 NT${" "}
                        {formatPrice(currentStageData.prices.selfMedia.savingAmount)}）
                      </div>
                    </>
                  )}
                  <div className="hidden md:block">
                    <a href={getCheckoutURLWithTracking("selfMedia")} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[#17464F] hover:bg-[#0f3339] text-white py-3 rounded-full font-medium">
                        選擇此方案
                      </Button>
                    </a>
                  </div>
                  <div className="md:hidden">
                    <Button
                      onClick={() => setSelectedPlanId("selfMedia")}
                      className={`w-full py-3 rounded-full font-medium ${
                        selectedPlanId === "selfMedia"
                          ? "bg-[#D4B483] text-[#17464F]"
                          : "bg-[#17464F] hover:bg-[#0f3339] text-white"
                      }`}
                    >
                      {selectedPlanId === "selfMedia" ? "✓ 已選擇" : "選擇此方案"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`bg-white rounded-2xl shadow-lg overflow-hidden relative flex flex-col transition-all duration-300 ${
                selectedPlanId === "dualLine"
                  ? "border-4 border-[#D4B483] ring-4 ring-[#D4B483]/20"
                  : "border-2 border-[#D4B483]"
              }`}
            >
              <div className="absolute top-0 right-0 bg-[#D4B483] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                推薦方案
              </div>
              <div className="bg-gradient-to-r from-[#17464F] to-[#1a5259] text-white py-4 px-6 text-center">
                <h3 className="text-xl font-bold">雙線並進方案</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[#33393C] text-sm mb-4 pb-4 border-b border-slate-100">
                  適合想同時為副業收入與職涯升級鋪路的人。
                </p>
                <ul className="space-y-3 text-sm text-[#33393C] mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>
                      <strong>通識課程</strong>（Direction＋General）：人生藍圖、AI、自動化、旅居財務
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>
                      <strong>自媒體接案 + 遠端上班</strong> 雙主線課程全解鎖
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>六個月 Skool 共學社群與同學會</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>選修實作工作坊（全部工作坊優先報名）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>專屬雙軌學員交流小組</span>
                  </li>
                </ul>
                <div className="text-center pt-4 border-t border-slate-100">
                  {currentStageData && (
                    <>
                      <div className="text-sm text-gray-500 line-through mb-1">
                        原價 NT$ {formatPrice(currentStageData.prices.dualLine.original)}
                      </div>
                      <div className="text-3xl font-bold text-[#17464F] mb-1">
                        NT$ {formatPrice(currentStageData.prices.dualLine.stagePrice)}
                      </div>
                      <div className="text-xs text-[#D4B483] font-medium mb-4">
                        目前為「{currentStageData.name}」· {currentStageData.discountLabel}（省 NT${" "}
                        {formatPrice(currentStageData.prices.dualLine.savingAmount)}）
                      </div>
                    </>
                  )}
                  <div className="hidden md:block">
                    <a href={getCheckoutURLWithTracking("dualLine")} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[#D4B483] hover:bg-[#c9a673] text-[#17464F] py-3 rounded-full font-bold">
                        選擇雙線方案
                      </Button>
                    </a>
                  </div>
                  <div className="md:hidden">
                    <Button
                      onClick={() => setSelectedPlanId("dualLine")}
                      className={`w-full py-3 rounded-full font-bold ${
                        selectedPlanId === "dualLine"
                          ? "bg-[#17464F] text-white"
                          : "bg-[#D4B483] hover:bg-[#c9a673] text-[#17464F]"
                      }`}
                    >
                      {selectedPlanId === "dualLine" ? "✓ 已選擇" : "選擇雙線方案"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col transition-all duration-300 ${
                selectedPlanId === "remoteJob"
                  ? "border-[#D4B483] border-2 shadow-lg ring-2 ring-[#D4B483]/20"
                  : "border-2 border-[#D4B483]"
              }`}
            >
              <div className="bg-[#17464F] text-white py-4 px-6 text-center">
                <h3 className="text-xl font-bold">遠端上班線路</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[#33393C] text-sm mb-4 pb-4 border-b border-slate-100">
                  適合想往遠端團隊、外商或更有彈性的職涯前進的人。
                </p>
                <ul className="space-y-3 text-sm text-[#33393C] mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>
                      <strong>通識課程</strong>（Direction＋General）：人生藍圖、AI、自動化、旅居財務
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>
                      <strong>遠端上班主課程</strong>：職涯藍圖、履歷、LinkedIn、面試與談薪、獵頭合作
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>六個月 Skool 共學社群與同學會</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-0.5">●</span>
                    <span>選修實作工作坊（剪輯、AI、自動化、工作英文等）</span>
                  </li>
                </ul>
                <div className="text-center pt-4 border-t border-slate-100">
                  {currentStageData && (
                    <>
                      <div className="text-sm text-gray-500 line-through mb-1">
                        原價 NT$ {formatPrice(currentStageData.prices.remoteJob.original)}
                      </div>
                      <div className="text-3xl font-bold text-[#17464F] mb-1">
                        NT$ {formatPrice(currentStageData.prices.remoteJob.stagePrice)}
                      </div>
                      <div className="text-xs text-[#D4B483] font-medium mb-4">
                        目前為「{currentStageData.name}」· {currentStageData.discountLabel}（省 NT${" "}
                        {formatPrice(currentStageData.prices.remoteJob.savingAmount)}）
                      </div>
                    </>
                  )}
                  <div className="hidden md:block">
                    <a href={getCheckoutURLWithTracking("remoteJob")} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[#17464F] hover:bg-[#0f3339] text-white py-3 rounded-full font-medium">
                        選擇此方案
                      </Button>
                    </a>
                  </div>
                  <div className="md:hidden">
                    <Button
                      onClick={() => setSelectedPlanId("remoteJob")}
                      className={`w-full py-3 rounded-full font-medium ${
                        selectedPlanId === "remoteJob"
                          ? "bg-[#D4B483] text-[#17464F]"
                          : "bg-[#17464F] hover:bg-[#0f3339] text-white"
                      }`}
                    >
                      {selectedPlanId === "remoteJob" ? "✓ 已選擇" : "選擇此方案"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/60 rounded-2xl border border-slate-200 p-6 md:p-8 text-center mb-12">
            <h4 className="text-lg font-bold text-[#17464F] mb-4">所有方案皆包含</h4>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-[#33393C]">
              <span className="bg-[#C9D7D4]/50 px-4 py-2 rounded-full">六個月 3+3 成長節奏</span>
              <span className="bg-[#C9D7D4]/50 px-4 py-2 rounded-full">通識課程（Direction + General）</span>
              <span className="bg-[#C9D7D4]/50 px-4 py-2 rounded-full">Skool 共學社群</span>
              <span className="bg-[#C9D7D4]/50 px-4 py-2 rounded-full">課程終身回放</span>
              <span className="bg-[#C9D7D4]/50 px-4 py-2 rounded-full">LinkedIn 校友網絡</span>
              <span className="bg-[#C9D7D4]/50 px-4 py-2 rounded-full">Nomad Leaders Podcast</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#17464F] to-[#1a5259] rounded-2xl p-6 text-center text-white shadow-lg">
            <div className="text-lg font-bold mb-2">績優學員專屬獎勵</div>
            <div className="text-sm opacity-90">
              課程期間成長表現優異的學員，將有機會獲得<span className="font-semibold">學費的部分或全額</span>
              <span className="text-[#D4B483] font-bold mx-1">獎學金</span>，以及
              <span className="text-[#D4B483] font-bold mx-1">2026 年遊牧啟發之旅招待名額</span>！
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 8 PRICING & TIMELINE END */}

      {/* SECTION 9 LIMITED OFFER + SECTION 10 FAQ COMBINED START */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#17464F] to-[#1a5561]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/95 backdrop-blur rounded-2xl p-8 sm:p-12 shadow-xl border border-[#C9D7D4]">
            <div className="flex justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#17464F] mb-4">本梯限定的優惠與名額</h3>

            <p className="text-[#33393C] mb-8 leading-relaxed max-w-2xl mx-auto">
              為了讓教學與陪跑品質維持在好的狀態，
              <br className="hidden sm:block" />
              每一梯次的名額與優惠都會做控管，以下是這一梯的安排：
            </p>

            <div className="bg-[#F5F3ED] rounded-xl p-6 mb-8 text-left max-w-xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-2 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#17464F]">早鳥專屬價格</span>
                    <span className="text-[#33393C]">：限時優惠倒數中，把握內部名單專屬折扣</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-2 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#17464F]">加贈共學社群延長權限</span>
                    <span className="text-[#33393C]">：前 3 個月課程後，再享後 3 個月社群陪伴與資源</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-2 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#17464F]">名額上限控管</span>
                    <span className="text-[#33393C]">：為維持教學品質，本梯名額有限，額滿即收班</span>
                  </div>
                </li>
              </ul>
            </div>

            <a
              href={getCheckoutURLWithTracking()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#17464F] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#0f3339] transition-all duration-300 shadow-lg"
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).trackInitiateCheckout) {
                  ;(window as any).trackInitiateCheckout(0)
                }
              }}
            >
              我要加入本梯
            </a>

            <p className="mt-8 text-sm text-[#33393C]/80 leading-relaxed max-w-lg mx-auto">
              如果你還在觀望，也可以先把問題整理下來，
              <br className="hidden sm:block" />
              在下方 FAQ 或{" "}
              <a
                href="https://www.instagram.com/travelwithwork_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#17464F] underline hover:text-[#D4B483] transition-colors"
              >
                Instagram
              </a>{" "}
              問清楚，再決定這六個月要不要一起走。
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#17464F] mb-4">常見問題</h2>
            <p className="text-[#33393C]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              看到這裡，你可能還有一些問題想問清楚。
              <br className="hidden sm:block" />
              以下整理了大家最常問的幾個問題，如果沒找到答案，歡迎私訊我們。
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-[#D4B483] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-[#D4B483]"></span>
                適合對象
              </h3>
              <div className="space-y-3">
                <details className="group bg-white rounded-xl border border-[#C9D7D4] overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#F5F3ED]/50 transition-colors">
                    <span className="font-medium text-[#17464F] text-left pr-4">
                      這堂學院適合什麼樣的人？我現在只是在上班，可以報名嗎？
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#17464F]/10 flex items-center justify-center text-[#17464F] group-open:rotate-45 transition-transform duration-200">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[#33393C]/80 leading-relaxed border-t border-[#C9D7D4]/50 pt-4">
                    當然可以！這堂學院就是為了「有正職、但想探索更多可能」的人設計的。你不需要先離職，也不需要有任何接案或遠距經驗。只要你願意在未來六個月裡，每週騰出
                    2-4 小時來學習和行動，這裡就適合你。
                  </div>
                </details>

                <details className="group bg-white rounded-xl border border-[#C9D7D4] overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#F5F3ED]/50 transition-colors">
                    <span className="font-medium text-[#17464F] text-left pr-4">英文不好、程式不會，可以嗎？</span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#17464F]/10 flex items-center justify-center text-[#17464F] group-open:rotate-45 transition-transform duration-200">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[#33393C]/80 leading-relaxed border-t border-[#C9D7D4]/50 pt-4">
                    可以。我們的課程主要用中文進行，不會要求你一開始就具備流利英文或程式能力。選修課程中有「工作英文」和「AI
                    工具應用」，會幫助你從零建立這些技能。最重要的是「願意學」，而不是「已經會」。
                  </div>
                </details>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#D4B483] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-[#D4B483]"></span>
                時間與節奏
              </h3>
              <div className="space-y-3">
                <details className="group bg-white rounded-xl border border-[#C9D7D4] overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#F5F3ED]/50 transition-colors">
                    <span className="font-medium text-[#17464F] text-left pr-4">
                      3+3 個月的節奏大概是怎麼安排的？會不會太硬？
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#17464F]/10 flex items-center justify-center text-[#17464F] group-open:rotate-45 transition-transform duration-200">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[#33393C]/80 leading-relaxed border-t border-[#C9D7D4]/50 pt-4">
                    <p className="mb-3">
                      前 3 個月是「共學探索期」，每週會有 1 堂主課（約 60-90 分鐘）+ 課後任務，預計每週投入 2-4
                      小時。這段時間會比較密集，但節奏是設計給有正職的人跟得上的。
                    </p>
                    <p>
                      後 3
                      個月是「延伸累積期」，節奏放慢，以每月復盤工作坊、選修課程、社群任務為主，讓你有空間把學到的東西真的用出來。
                    </p>
                  </div>
                </details>

                <details className="group bg-white rounded-xl border border-[#C9D7D4] overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#F5F3ED]/50 transition-colors">
                    <span className="font-medium text-[#17464F] text-left pr-4">
                      我時間很不固定，有錄影可以回看嗎？作業一定要每週交嗎？
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#17464F]/10 flex items-center justify-center text-[#17464F] group-open:rotate-45 transition-transform duration-200">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[#33393C]/80 leading-relaxed border-t border-[#C9D7D4]/50 pt-4">
                    所有課程都會錄影，放在 Skool
                    社群讓你隨時回看。作業有建議繳交時間，但我們更鼓勵「完成比完美重要」——如果某週真的忙不過來，可以先跟上進度，之後再補。我們會有基本的及格門檻，但不會逼你每週都交滿。
                  </div>
                </details>

                <details className="group bg-white rounded-xl border border-[#C9D7D4] overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#F5F3ED]/50 transition-colors">
                    <span className="font-medium text-[#17464F] text-left pr-4">
                      如果這六個月中途真的發生變故（工作太忙、人生事件），怎麼辦？
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#17464F]/10 flex items-center justify-center text-[#17464F] group-open:rotate-45 transition-transform duration-200">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[#33393C]/80 leading-relaxed border-t border-[#C9D7D4]/50 pt-4">
                    我們理解人生不會照劇本走。如果中途遇到重大變故，可以先私訊我們討論。錄影內容會保留讓你補課，部分情況也可以申請轉到下一梯次。詳細的退費與轉班規則會在報名後提供完整說明。
                  </div>
                </details>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#D4B483] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-[#D4B483]"></span>
                內容與線路
              </h3>
              <div className="space-y-3">
                <details className="group bg-white rounded-xl border border-[#C9D7D4] overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#F5F3ED]/50 transition-colors">
                    <span className="font-medium text-[#17464F] text-left pr-4">
                      自媒體接案線路與遠端上班線路有什麼差別？我不知道要選哪一個。
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#17464F]/10 flex items-center justify-center text-[#17464F] group-open:rotate-45 transition-transform duration-200">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[#33393C]/80 leading-relaxed border-t border-[#C9D7D4]/50 pt-4">
                    <p className="mb-3">
                      <strong>自媒體接案線路</strong>
                      ：適合想透過內容創作、個人品牌來獲得收入與自由的人。課程會教你怎麼從零開始經營自媒體、找到變現模式、接到第一個案子。
                    </p>
                    <p className="mb-3">
                      <strong>遠端上班線路</strong>
                      ：適合想找到一份可以遠距工作的正職或長期合作的人。課程會教你怎麼打造國際履歷、在哪裡找遠距職缺、如何通過面試。
                    </p>
                    <p>
                      如果你還不確定，建議先選一條「現在比較有感覺」的線路走走看。六個月很長，你會在過程中慢慢釐清自己要的是什麼。
                    </p>
                  </div>
                </details>

                <details className="group bg-white rounded-xl border border-[#C9D7D4] overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#F5F3ED]/50 transition-colors">
                    <span className="font-medium text-[#17464F] text-left pr-4">可以中途換線、改成雙線並進嗎？</span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#17464F]/10 flex items-center justify-center text-[#17464F] group-open:rotate-45 transition-transform duration-200">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[#33393C]/80 leading-relaxed border-t border-[#C9D7D4]/50 pt-4">
                    可以。如果你在前 3
                    個月發現另一條線路更適合自己，可以申請換線或升級成雙線並進方案（需補差額）。我們希望你選到真正適合的路，而不是被綁在一開始的選擇。
                  </div>
                </details>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#D4B483] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-[#D4B483]"></span>
                其他
              </h3>
              <div className="space-y-3">
                <details className="group bg-white rounded-xl border border-[#C9D7D4] overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#F5F3ED]/50 transition-colors">
                    <span className="font-medium text-[#17464F] text-left pr-4">
                      有發票／公司報帳、分期付款的選項嗎？
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#17464F]/10 flex items-center justify-center text-[#17464F] group-open:rotate-45 transition-transform duration-200">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[#33393C]/80 leading-relaxed border-t border-[#C9D7D4]/50 pt-4">
                    我們可以開立電子發票（含統編），適合需要公司報帳的學員。分期付款部分，目前支援信用卡分期（視發卡銀行而定）。如果有特殊需求，歡迎私訊我們討論。
                  </div>
                </details>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#33393C]/70 text-sm leading-relaxed">
              還有其他問題？歡迎到{" "}
              <a
                href="https://www.instagram.com/travelwithwork_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#17464F] underline hover:text-[#D4B483] transition-colors"
              >
                Instagram
              </a>{" "}
              私訊我們，或寄信到 Academy@travelwork.life
            </p>
          </div>
        </div>
      </section>
      {/* SECTION 9 LIMITED OFFER + SECTION 10 FAQ COMBINED END */}

      {/* FOOTER START */}
      <footer className="py-8 bg-[#17464F] text-white text-center">
        <p className="text-sm text-white/80">
          &copy; 2025 遠距遊牧學院 Travel With Work Academy. All rights reserved.
          <br />
          任何疑問請洽 Instagram:{" "}
          <a
            href="https://www.instagram.com/travelwithwork_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4B483] hover:text-[#D4B483]/80 transition-colors"
          >
            遠距遊牧學院
          </a>{" "}
          / Email: Academy@travelwork.life
        </p>
      </footer>
      {/* FOOTER END */}

      {/* Image Gallery Modal */}
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
      {/* MOBILE STICKY BOTTOM BAR - Mobile Only */}
      {currentStageData && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#C9D7D4] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
          {!selectedPlanId ? (
            <div className="px-4 py-3">
              <div className="flex items-center justify-center gap-2 text-xs text-[#33393C] mb-2">
                <span className="text-[#D4B483] font-bold">{currentStageData.name}</span>
                <span>·</span>
                <span>全方案 {currentStageData.discountLabel}</span>
                <span>·</span>
                {/* CHANGE: Unified countdown format with days, hours, minutes, seconds */}
                <span>
                  倒數{" "}
                  <span className="font-bold">
                    {String(timeLeft.days).padStart(2, "0")}天 {String(timeLeft.hours).padStart(2, "0")}:
                    {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-[#33393C]">
                    單線方案本階段{" "}
                    <span className="font-bold text-[#17464F]">
                      NT$ {lowestPrice ? formatPrice(lowestPrice) : "--"}
                    </span>{" "}
                    起
                  </span>
                </div>
                <button
                  onClick={scrollToPricing}
                  className="flex-shrink-0 bg-[#17464F] text-white px-5 py-3 rounded-full text-sm font-bold hover:bg-[#0f3339] transition-all duration-300 shadow-md"
                >
                  查看三種方案
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-3">
              <div className="flex items-center justify-center gap-2 text-xs text-[#33393C] mb-2">
                <span className="text-[#D4B483] font-bold">{currentStageData.name}</span>
                <span>·</span>
                <span>全方案 {currentStageData.discountLabel}</span>
                <span>·</span>
                <span>
                  倒數{" "}
                  <span className="font-bold">
                    {String(timeLeft.days).padStart(2, "0")}天 {String(timeLeft.hours).padStart(2, "0")}:
                    {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#33393C]">已選擇：{planConfig[selectedPlanId].name}</div>
                  <div className="text-sm">
                    <span className="font-bold text-[#17464F]">
                      NT$ {formatPrice(currentStageData.prices[selectedPlanId].stagePrice)}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      （原價 NT$ {formatPrice(currentStageData.prices[selectedPlanId].original)}｜省 NT${" "}
                      {formatPrice(currentStageData.prices[selectedPlanId].savingAmount)}）
                    </span>
                  </div>
                </div>
                <a
                  href={getCheckoutURLWithTracking(selectedPlanId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 bg-[#D4B483] text-[#17464F] px-5 py-3 rounded-full text-sm font-bold hover:bg-[#c9a66f] transition-all duration-300 shadow-md"
                  onClick={() => {
                    if (typeof window !== "undefined" && (window as any).trackInitiateCheckout) {
                      ;(window as any).trackInitiateCheckout(selectedPlanId)
                    }
                  }}
                >
                  以此價格加入本梯
                </a>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="h-24 md:hidden"></div>
    </main>
  )
}
