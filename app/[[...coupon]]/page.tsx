"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useParams } from "next/navigation"

const getCheckoutURL = (couponCode?: string) => {
  const baseURL = "https://travelworkacademy.myteachify.com/checkout?planId=be56b4ae-6f31-43be-8bfb-68fda4294a9a"
  return couponCode ? `${baseURL}&coupon=${encodeURIComponent(couponCode)}` : baseURL
}

const getTrackingParams = () => {
  if (typeof window === "undefined") return ""

  // 讀取 URL 中的 fbclid
  const urlParams = new URLSearchParams(window.location.search)
  const fbclid = urlParams.get("fbclid")

  // 讀取 cookie 中的 fbc 和 fbp
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift()
    return null
  }

  const fbc = getCookie("_fbc")
  const fbp = getCookie("_fbp")

  // 組合參數
  const params = new URLSearchParams()
  if (fbclid) params.append("fbclid", fbclid)
  if (fbc) params.append("fbc", fbc)
  if (fbp) params.append("fbp", fbp)

  return params.toString() ? `&${params.toString()}` : ""
}

export default function HomePage() {
  const params = useParams()
  const [couponCode, setCouponCode] = useState<string | null>(null)

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

  const checkoutURL = getCheckoutURL(couponCode || undefined)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showFullSchedule, setShowFullSchedule] = useState(false) // State to control schedule visibility

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
        src: "/digital-learning-technology-application-with-lapto.jpg",
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

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set target date to August 15, 2025 (超早鳥價結束)
    const targetDate = new Date("2025-08-15T23:59:59").getTime()

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
  }, [])

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

  const pricingTiers = [
    { stage: "🔥 超早鳥價", deadline: "8/15", price: "$149", discount: "62.7% OFF", savings: "省$251" },
    { stage: "早鳥第一波", deadline: "8/29", price: "$179", discount: "55.2% OFF", savings: "省$221" },
    { stage: "早鳥第二波", deadline: "9/5", price: "$209", discount: "47.7% OFF", savings: "省$191" },
    { stage: "早鳥第三波", deadline: "9/12", price: "$249", discount: "37.7% OFF", savings: "省$151" },
    { stage: "預購價", deadline: "9/26", price: "$349", discount: "12.7% OFF", savings: "省$51" },
    { stage: "正式售價", deadline: "10/1起", price: "$400", discount: "--", savings: "--" },
  ]

  const getCheckoutURLWithTracking = () => {
    const baseURL = checkoutURL
    const trackingParams = getTrackingParams()
    return `${baseURL}${trackingParams}`
  }

  const getCurrentPricingTier = () => {
    const now = new Date()
    // Target dates for each tier (August 15th for super early bird)
    const tiers = [
      { stage: "🔥 超早鳥價", deadline: new Date("2025-08-15T23:59:59"), price: "$149", originalPrice: "$400" },
      // Note: Added "早鳥第一波" which was missing in original pricingTiers but implied by its absence in example
      { stage: "早鳥第一波", deadline: new Date("2025-08-29T23:59:59"), price: "$179", originalPrice: "$400" },
      { stage: "早鳥第二波", deadline: new Date("2025-09-05T23:59:59"), price: "$209", originalPrice: "$400" },
      { stage: "早鳥第三波", deadline: new Date("2025-09-12T23:59:59"), price: "$249", originalPrice: "$400" },
      { stage: "預購價", deadline: new Date("2025-09-26T23:59:59"), price: "$349", originalPrice: "$400" },
    ]
    for (const tier of tiers) {
      if (now < tier.deadline) return tier
    }
    // If no tier matches, it's the final price
    return { stage: "正式售價", deadline: null, price: "$400", originalPrice: "$400" }
  }

  const currentTier = getCurrentPricingTier()

  return (
    <main className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-[#17464F] text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 text-sm sm:text-base text-center sm:text-left">
            <span>現在是</span>
            <span className="text-[#D4B483] font-bold">🔥 {currentTier.stage}</span>
            <span className="font-bold">{currentTier.price}</span>
            <span className="text-white/70 line-through text-sm">（原價 {currentTier.originalPrice}）</span>
            {currentTier.deadline && (
              <span className="hidden sm:inline text-white/80">
                ，剩下 {String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 小時調漲
              </span>
            )}
          </div>
          <a
            href={getCheckoutURLWithTracking()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== "undefined" && window.trackInitiateCheckout) {
                window.trackInitiateCheckout(0)
              }
            }}
            className="inline-flex items-center px-4 py-1.5 bg-[#D4B483] hover:bg-[#D4B483]/90 text-[#17464F] font-semibold text-sm rounded-full transition-colors"
          >
            立即鎖定{currentTier.stage}
          </a>
        </div>
      </div>

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
                不用先辭職。透過線上課程、課後行動任務、共學社群，再搭配選修工作坊與國內外遊牧生態資源，在這六個月嘗試一連串的小行動與體驗，幫你一步步摸清楚：遠距／接案／遊牧是不是你要追的方向。
              </p>

              {/* 路線 Tag Bar */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                <span className="px-4 py-2 rounded-full bg-[#17464F] text-white text-sm font-medium">
                  自媒體接案線路
                </span>
                <span className="px-4 py-2 rounded-full bg-[#17464F] text-white text-sm font-medium">遠端上班線路</span>
                <span className="px-4 py-2 rounded-full bg-[#D4B483] text-[#17464F] text-sm font-medium">
                  也可以雙線並進
                </span>
              </div>

              {/* 安心小句 */}
              <p className="text-sm text-[#33393C]/60 max-w-lg mx-auto lg:mx-0">
                這不是一張離職門票，而是一段可以在保有現職下完成的六個月行動旅程。
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
                      if (typeof window !== "undefined" && window.trackInitiateCheckout) {
                        window.trackInitiateCheckout(0)
                      }
                    }}
                  >
                    立刻鎖定【{currentTier.stage} {currentTier.price}】
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
                    🔥 {currentTier.stage}｜{currentTier.price}
                  </span>
                  <span className="text-[#33393C]/50 line-through ml-1">（原價 {currentTier.originalPrice}）</span>
                </p>
                {currentTier.deadline && (
                  <p className="text-sm text-[#33393C]/60 mt-1">
                    截止：{currentTier.deadline.getMonth() + 1}/{currentTier.deadline.getDate()}（台北時間
                    23:59）｜剩餘：
                    <span className="font-medium text-[#17464F]">
                      {String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 小時
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Image Collage */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {/* Main large image */}
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
                {/* Two smaller images */}
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
              {/* Decorative element - 細金色線條 */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-[#D4B483]/40 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 border-2 border-[#17464F]/20 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 1 HERO END */}

      {/* SECTION 2 COURSE HIGHLIGHTS START */}
      <section id="course-highlights" className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upper Section: 適合誰 */}
          <div className="mb-16 sm:mb-24">
            {/* Section Title */}
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-4 text-balance">
                正在尋找「下一步」的你
              </h2>
              {/* Three dots decoration */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
                <span className="w-2 h-2 rounded-full bg-[#17464F]" />
                <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
              </div>
            </div>

            {/* Content Block */}
            <div className="max-w-3xl mx-auto text-left">
              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-[#17464F] font-medium mb-6 text-balance">
                不管你現在在哪個階段，你都有機會在這裡找到開始的位置
              </p>

              {/* Opening Paragraph */}
              <div className="text-[#33393C] leading-relaxed mb-10 space-y-2">
                <p>你不一定已經想好要不要離職、要不要成為全職 Nomad。</p>
                <p>但你心裡大概知道——</p>
                <p>接下來的人生，應該不只有「每天通勤、等著放假」這一種選項。</p>
                <p className="pt-2 text-[#17464F] font-medium">在這裡，你可能會在這幾種狀態裡，看到自己的影子：</p>
              </div>

              {/* Three Personas */}
              <div className="space-y-8 mb-10">
                {/* Persona 1 */}
                <div className="border-l-4 border-[#D4B483] pl-5 sm:pl-6">
                  <h4 className="text-lg sm:text-xl font-bold text-[#17464F] mb-2">想要更有選擇權的職涯主線</h4>
                  <p className="text-[#33393C] leading-relaxed">
                    有穩定工作、不一定討厭現在公司，但看得到天花板；正在思考能否換到更彈性、可遠距的團隊，或讓履歷在未來更有選擇。
                  </p>
                </div>

                {/* Persona 2 */}
                <div className="border-l-4 border-[#D4B483] pl-5 sm:pl-6">
                  <h4 className="text-lg sm:text-xl font-bold text-[#17464F] mb-2">想多一條安全感，不想只靠一份薪水</h4>
                  <p className="text-[#33393C] leading-relaxed">
                    想用內容、接案、知識服務慢慢累積第二條收入線；希望在不壓垮自己的前提下，踏出有感的一步，而不是一次
                    all-in。
                  </p>
                </div>

                {/* Persona 3 */}
                <div className="border-l-4 border-[#D4B483] pl-5 sm:pl-6">
                  <h4 className="text-lg sm:text-xl font-bold text-[#17464F] mb-2">答案還不確定，但不想再只是想想</h4>
                  <p className="text-[#33393C] leading-relaxed">
                    現在的路看起來還行，但常被旅居、遠距、遊牧故事勾起一點遺憾；想在未來六個月裡，用比較踏實的方法去體驗、去嘗試，而不是只滑過別人的人生。
                  </p>
                </div>
              </div>

              {/* Closing Paragraph */}
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

          {/* Divider with decoration */}
          <div className="flex items-center justify-center gap-4 mb-16 sm:mb-20">
            <div className="h-px w-16 bg-[#D4B483]/50" />
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            <div className="h-px w-16 bg-[#D4B483]/50" />
          </div>
        </div>
      </section>
      {/* SECTION 2 COURSE HIGHLIGHTS END (Part 1: 適合誰) */}

      {/* SECTION 3 PAIN POINTS START */}
      <section className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upper Section: 痛點 */}
          <div className="mb-16 sm:mb-24">
            {/* Section Title */}
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-4 text-balance">
                現在的你，是否正在為這些問題煩惱？
              </h2>
              {/* Three dots decoration */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
                <span className="w-2 h-2 rounded-full bg-[#17464F]" />
                <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
              </div>
            </div>

            {/* Content Block */}
            <div className="max-w-3xl mx-auto text-left">
              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-[#17464F] font-medium mb-6 text-balance">
                不管你現在在哪個階段，你都有機會在這裡找到開始的位置
              </p>

              {/* Opening Paragraph */}
              <div className="text-[#33393C] leading-relaxed mb-10 space-y-2">
                <p>你可能正在為以下問題煩惱：</p>
                <p className="pt-2 text-[#17464F] font-medium">在這裡，你可能會在這幾種狀態裡，看到自己的影子：</p>
              </div>

              {/* Three Pain Points */}
              <div className="space-y-8 mb-10">
                {/* Pain Point 1 */}
                <div className="border-l-4 border-[#D4B483] pl-5 sm:pl-6">
                  <h4 className="text-lg sm:text-xl font-bold text-[#17464F] mb-2">不知道遠距工作如何開始</h4>
                  <p className="text-[#33393C] leading-relaxed">
                    不知道如何開始轉型為遠距工作者，不知道該從哪裡開始培養遠距工作技能。
                  </p>
                </div>

                {/* Pain Point 2 */}
                <div className="border-l-4 border-[#D4B483] pl-5 sm:pl-6">
                  <h4 className="text-lg sm:text-xl font-bold text-[#17464F] mb-2">沒有足夠的收入來支持遠距生活</h4>
                  <p className="text-[#33393C] leading-relaxed">
                    想要遠距生活，但目前的收入無法支持，不知道如何增加收入來實現遠距夢想。
                  </p>
                </div>

                {/* Pain Point 3 */}
                <div className="border-l-4 border-[#D4B483] pl-5 sm:pl-6">
                  <h4 className="text-lg sm:text-xl font-bold text-[#17464F] mb-2">不知道如何找到對的接案機會</h4>
                  <p className="text-[#33393C] leading-relaxed">
                    不知道如何找到對的接案機會，不知道如何制定接案策略來增加收入。
                  </p>
                </div>
              </div>

              {/* Closing Paragraph */}
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

          {/* Divider with decoration */}
          <div className="flex items-center justify-center gap-4 mb-16 sm:mb-20">
            <div className="h-px w-16 bg-[#D4B483]/50" />
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            <div className="h-px w-16 bg-[#D4B483]/50" />
          </div>
        </div>
      </section>
      {/* SECTION 3 PAIN POINTS END */}

      {/* MOBILE STICKY BOTTOM BAR START */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-[#C9D7D4] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Price Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-[#D4B483] text-sm font-semibold">🔥 {currentTier.stage.replace("🔥 ", "")}</span>
              <span className="text-[#17464F] font-bold text-lg">{currentTier.price}</span>
            </div>
            <div className="text-xs text-[#33393C]/60">
              剩 {String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 小時
            </div>
          </div>

          {/* Right: CTA Button */}
          <a
            href={getCheckoutURLWithTracking()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#17464F] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#0f3339] transition-all duration-300 shadow-md"
            onClick={() => {
              if (typeof window !== "undefined" && window.trackInitiateCheckout) {
                window.trackInitiateCheckout(0)
              }
            }}
          >
            立即報名
          </a>
        </div>
      </div>
      {/* MOBILE STICKY BOTTOM BAR END */}

      {/* Add bottom padding to main content to account for sticky bar on mobile */}
      <div className="h-16 md:hidden"></div>
    </main>
  )
}
