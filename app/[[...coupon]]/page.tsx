"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

  return (
    <main className="min-h-screen bg-white">
      {/* // SECTION 1 HERO START */}
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
                {/* Primary CTA - 保留原有邏輯 */}
                <Button
                  asChild
                  size="lg"
                  className="bg-[#17464F] hover:bg-[#17464F]/90 text-white font-semibold px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
                    我要加入本屆學員
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

        {/* Scroll Indicator - 向下箭頭提示 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-[#17464F]/60 tracking-wider">往下滑動</span>
            <svg className="w-6 h-6 text-[#17464F]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>
      {/* // SECTION 1 HERO END */}

      {/* // SECTION 2 COURSE HIGHLIGHTS START */}
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
      {/* // SECTION 2 COURSE HIGHLIGHTS END (Part 1: 適合誰) */}

      {/* // SECTION 3 PAIN POINTS START */}
      <section className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-4 text-balance">
              不是你不夠努力，而是一直一個人亂撞
            </h2>
            {/* Three dots decoration */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>
          </div>

          {/* Three Pain Point Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Card 1: 方向斷裂 */}
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

            {/* Card 2: 方法斷裂 */}
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
                所以日子一忙，又回到原本的節奏。
              </p>
            </div>

            {/* Card 3: 同伴斷裂 */}
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

          {/* Summary Sentence */}
          <div className="text-center">
            <p className="text-base sm:text-lg text-[#17464F] font-medium leading-relaxed max-w-3xl mx-auto px-4">
              你缺的不是更多資訊，而是一個地方，
              <br className="sm:hidden" />
              讓你在未來六個月裡，有人陪你一起試、一起走、一起修正方向。
            </p>
          </div>
        </div>
      </section>
      {/* // SECTION 3 PAIN POINTS END */}

      {/* // SECTION 2 COURSE HIGHLIGHTS CONTINUED (Part 2: 學院怎麼幫你) START */}
      <section className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Lower Section: 學院怎麼幫你 */}
          <div>
            {/* Section Subtitle */}
            <div className="text-center mb-10 sm:mb-12">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#17464F] mb-4 text-balance">
                學院提供的，不是一堆資訊，而是一條走得完的六個月路線
              </h3>
              <p className="text-[#33393C] max-w-2xl mx-auto">
                我們先陪你選線路，再幫你打底能力，中間所有卡住的地方，就交給課程、社群和工作坊，一起拆開來看。
              </p>
            </div>

            {/* Three Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 1: 雙線路設計 (Left) */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#C9D7D4]/50">
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
                <h4 className="text-xl font-bold text-[#17464F] mb-3">雙線路設計</h4>
                <p className="text-sm text-[#A06E56] font-medium mb-4">先選一條主線，也可以雙線並進</p>
                <div className="text-[#33393C] text-sm leading-relaxed space-y-3">
                  <p>你會在兩條線路中選擇自己的主修方向：</p>
                  <ul className="space-y-2 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483] mt-2 shrink-0" />
                      <span>
                        <strong className="text-[#17464F]">自媒體接案線路</strong>：內容／短影音、接案方案、作品集
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483] mt-2 shrink-0" />
                      <span>
                        <strong className="text-[#17464F]">遠端上班線路</strong>：履歷、LinkedIn、職涯藍圖、面試與談薪
                      </span>
                    </li>
                  </ul>
                  <p className="pt-1">
                    你可以先選一條線試走，也可以選「雙線並進方案」，一邊為副業收入鋪路，一邊為職涯升級做準備。
                  </p>
                </div>
              </div>

              {/* Card 2: 通識課程 (Middle) */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#C9D7D4]/50">
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
                <h4 className="text-xl font-bold text-[#17464F] mb-3">通識課程</h4>
                <p className="text-sm text-[#A06E56] font-medium mb-4">先把「自由人生的核心能力」打好</p>
                <div className="text-[#33393C] text-sm leading-relaxed space-y-3">
                  <p>不管你最後走向自媒體接案，還是遠端上班，所有學員都會一起完成 4 堂通識課程：</p>
                  <div className="flex flex-wrap gap-2 py-1">
                    <span className="px-3 py-1 bg-[#F5F3ED] rounded-full text-xs text-[#17464F] font-medium">
                      知識變現
                    </span>
                    <span className="px-3 py-1 bg-[#F5F3ED] rounded-full text-xs text-[#17464F] font-medium">
                      AI 自動化工作流
                    </span>
                    <span className="px-3 py-1 bg-[#F5F3ED] rounded-full text-xs text-[#17464F] font-medium">
                      旅居財務規劃
                    </span>
                    <span className="px-3 py-1 bg-[#F5F3ED] rounded-full text-xs text-[#17464F] font-medium">
                      人生 SOP
                    </span>
                  </div>
                  <p>先幫你補齊「想過自由生活之前，應該先想清楚的事」。</p>
                </div>
              </div>

              {/* Card 3: Skool 共學社群 (Right) */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#C9D7D4]/50">
                <div className="w-12 h-12 bg-[#17464F] rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#17464F] mb-3">Skool 共學社群</h4>
                <p className="text-sm text-[#A06E56] font-medium mb-4">路線不同，但教室是同一間</p>
                <div className="text-[#33393C] text-sm leading-relaxed space-y-3">
                  <p>不論你選哪一條線，大家都會進到同一個 Skool 學習空間。</p>
                  <p>你看得到兩條路線同學的作業、提問與成果，也會一起參與任務、討論、選修工作坊與線下聚會。</p>
                  <p className="text-[#17464F] font-medium pt-1">
                    很多學員都是在這裡，看著別人的嘗試，一點一滴長出自己的方向感和勇氣。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* // SECTION 2 COURSE HIGHLIGHTS CONTINUED END */}

      {/* // SECTION 2.1 ECOSYSTEM PARTNERSHIP START */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 遊牧資源生態系 */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17464F] mb-4">遊牧資源生態系</h2>
            <p className="text-lg text-[#33393C]">線上教育 | 線下社群 | 國際鏈結</p>
          </div>

          <div className="p-4 sm:p-6">
            {/* Partners Grid */}
            <div className="grid grid-cols-3 gap-2 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-12 mb-8">
              {/* Partner 1 - Taiwan Digital Nomad */}
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

              {/* Partner 2 - 成長營 */}
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

              {/* Partner 3 - 生鮮時書 */}
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
      {/* // SECTION 2.1 ECOSYSTEM PARTNERSHIP END */}

      {/* // SECTION 4 INSTRUCTORS START */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            {/* Three dots decoration */}
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
              帶你打造個人品牌、經營內容、從零開始接案變現
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
      {/* // SECTION 4 INSTRUCTORS END */}

      {/* // SECTION 5 COURSE OUTLINE START */}
      <section id="course-map" className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-4 text-balance">
              六個月課程地圖：先打底，再走你自己的線路
            </h2>
            {/* Three dots decoration */}
            <div className="flex items-center justify-center gap-2 mt-6 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
              <span className="w-2 h-2 rounded-full bg-[#17464F]" />
              <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            </div>
            <p className="text-[#33393C] max-w-2xl mx-auto leading-relaxed">
              上線後，你會先完成 4 堂通識課程，
              <br className="hidden sm:block" />
              接著依照自己的選擇，主修「自媒體接案線路」或「遠端上班線路」，也可以雙線一起走。
            </p>
          </div>

          {/* Three Column Course Map Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {/* Left Column: 雙線路概覽 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#C9D7D4]/50">
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
              <h3 className="text-xl font-bold text-[#17464F] mb-3">兩條線路</h3>
              <p className="text-sm text-[#A06E56] font-medium mb-4">自媒體接案線｜遠端上班線</p>
              <div className="text-[#33393C] text-sm leading-relaxed space-y-4">
                <div className="border-l-2 border-[#D4B483] pl-4">
                  <p className="font-semibold text-[#17464F] mb-1">自媒體接案線路</p>
                  <p>
                    適合想透過內容、短影音、個人品牌，慢慢累積讀者與客戶的人。你會學到內容創作、接案方案設計、作品集打造。
                  </p>
                </div>
                <div className="border-l-2 border-[#17464F] pl-4">
                  <p className="font-semibold text-[#17464F] mb-1">遠端上班線路</p>
                  <p>適合想往遠端團隊、外商或更彈性職涯前進的人。你會學到 LinkedIn 經營、國際履歷、面試與談薪策略。</p>
                </div>
                <p className="text-[#17464F] font-medium pt-2">你可以只選一條線，也可以選擇「雙線並進方案」。</p>
              </div>
            </div>

            {/* Middle Column: 通識課程 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#C9D7D4]/50">
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
              <h3 className="text-xl font-bold text-[#17464F] mb-3">通識課程</h3>
              <p className="text-sm text-[#A06E56] font-medium mb-4">所有學員共同打底的 4 堂課</p>
              <div className="text-[#33393C] text-sm leading-relaxed space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#F5F3ED] rounded-lg">
                  <span className="w-6 h-6 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </span>
                  <div>
                    <p className="font-semibold text-[#17464F]">知識變現 & 個人定位</p>
                    <p className="text-xs text-[#33393C]/80">找到你的核心價值，把經驗轉化成可銷售的方案</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#F5F3ED] rounded-lg">
                  <span className="w-6 h-6 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </span>
                  <div>
                    <p className="font-semibold text-[#17464F]">AI 自動化工作流</p>
                    <p className="text-xs text-[#33393C]/80">讓 AI 成為你的實習生，省時省力做更多</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#F5F3ED] rounded-lg">
                  <span className="w-6 h-6 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </span>
                  <div>
                    <p className="font-semibold text-[#17464F]">旅居 & 財務規劃</p>
                    <p className="text-xs text-[#33393C]/80">邊旅行邊安心，建立可持續的財務基礎</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#F5F3ED] rounded-lg">
                  <span className="w-6 h-6 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    4
                  </span>
                  <div>
                    <p className="font-semibold text-[#17464F]">人生 SOP 與長程設計</p>
                    <p className="text-xs text-[#33393C]/80">身心靈平衡，打造可持續的自由人生</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 線路課程 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#C9D7D4]/50">
              <div className="w-12 h-12 bg-[#17464F] rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#17464F] mb-3">線路課程</h3>
              <p className="text-sm text-[#A06E56] font-medium mb-4">依你的選擇，往下深挖</p>
              <div className="text-[#33393C] text-sm leading-relaxed space-y-4">
                {/* 自媒體接案線路 */}
                <div>
                  <p className="font-semibold text-[#17464F] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4B483]" />A 線｜自媒體接案
                  </p>
                  <ul className="space-y-1 pl-4 text-[#33393C]/80">
                    <li>• 爆款內容養成術</li>
                    <li>• 短影片爆紅腳本全攻略</li>
                    <li>• 打磨你的第一個接案方案</li>
                  </ul>
                </div>
                {/* 遠端上班線路 */}
                <div>
                  <p className="font-semibold text-[#17464F] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#17464F]" />B 線｜遠端上班
                  </p>
                  <ul className="space-y-1 pl-4 text-[#33393C]/80">
                    <li>• 跨國職涯的高薪秘訣</li>
                    <li>• LinkedIn 國際個人品牌攻略</li>
                    <li>• 外商面試全拆解</li>
                    <li>• 獵頭不告訴你的談薪策略</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Expand Button for Full Schedule */}
          <div className="text-center">
            <button
              onClick={() => setShowFullSchedule(!showFullSchedule)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#17464F] text-[#17464F] rounded-full font-medium hover:bg-[#17464F] hover:text-white transition-all duration-300"
            >
              {showFullSchedule ? "收起完整課程時間表" : "想看每週怎麼安排？展開完整課程時間表"}
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

          {/* Collapsible Full Schedule */}
          {showFullSchedule && (
            <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
              {/* Month 1: 通識課程 + 自媒體接案 */}
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

              {/* Month 2 */}
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

              {/* Month 3 */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 bg-[#17464F]">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">第三個月：系統整合與可持續規劃</h3>
                  <p className="text-white/80">核心目標：整合所學，建立長期發展策略，打造可持續的遠距人生</p>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    {
                      week: 10,
                      title: "透過市場驗證過之有效框架，讓你的知識專業成為商品",
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
      {/* // SECTION 5 COURSE OUTLINE END */}

      {/* // SECTION 5.1 COURSE DETAIL MODAL START */}
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
              {/* Modal Header */}
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

              {/* Course Title */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#17464F] mb-4 text-balance">{selectedWeek.title}</h2>
                <div className="w-full h-1 rounded-full bg-[#D4B483]"></div>
              </div>

              {/* 課程目標 */}
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

              {/* 講師更多資訊 */}
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
      {/* // SECTION 5.1 COURSE DETAIL MODAL END */}

      {/* // SECTION 6 PODCAST LEADERS START */}
      <section className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            {/* Three dots decoration */}
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

          {/* Guest Cards - 3 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1 - Osera Ryo */}
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

            {/* Card 2 - Johannes Völkner */}
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

            {/* Card 3 - Harry Wang / Nomad Leaders Podcast */}
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

          {/* Podcast CTA */}
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
                  className="inline-flex items-center gap-2 bg-[#17464F] text-white px-6 py-3 rounded-full font-medium hover:bg-[#17464F]/90 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  在這裡聽故事
                </a>
              </div>
            </div>
          </div>

          {/* Section Footer */}
          <div className="text-center">
            <p className="text-lg text-[#33393C] leading-relaxed max-w-2xl mx-auto">
              你不只是在上「一門課」，
              <br />
              而是在和一群分散在世界各地的人，一起思考怎麼活出更自由的版本。
            </p>
          </div>
        </div>
      </section>
      {/* // SECTION 6 PODCAST LEADERS END */}

      {/* // SECTION 7 LEARNING RESOURCES START */}
      <section className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            {/* Three dots decoration */}
            <div className="flex justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#17464F] mb-4">
              你不只是買一門課，而是走進一個行動生態系
            </h2>
            <p className="text-lg text-[#33393C]/80 max-w-2xl mx-auto leading-relaxed">
              六個月裡，你會接觸到的不只是固定幾堂課，
              <br className="hidden sm:inline" />
              而是一整套幫你「學、做、問、連結」的資源組合。
            </p>
          </div>

          {/* Resource Cards - 2x2 grid on desktop, single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: 主課程 & 課後任務 */}
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
                {/* Photo gallery */}
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

            {/* Card 2: 實作工作坊 & 選修課程 */}
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
                  依照你的目標與卡關點，你可以選修不同主題的實作工作坊：影音剪輯、內容系統、AI、自動化、工作英文、網站 /
                  Vibe Coding⋯這些課都是「邊看邊做」，幫你把主課程裡學到的東西，變成看得見、用得出的成果。
                </p>
                {/* Photo gallery */}
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

            {/* Card 3: 共學社群 & 校友 network */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#17464F] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
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
                {/* Photo gallery */}
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

            {/* Card 4: 旅居 & 機會生態 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#17464F] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
                {/* Photo gallery */}
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
      {/* // SECTION 7 LEARNING RESOURCES END */}

      {/* // SECTION 8 PRICING START */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] bg-clip-text text-transparent">
                完整課程學籍內容
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              幫助你擺脫朝九晚五、地點限制
              <br className="sm:hidden" />
              ，讓工作帶你去世界每一個想去的角落！
            </p>
          </div>

          {/* Course Highlights */}
          <div className="mb-16">
            <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 border border-gray-200">
              <div className="text-center mb-8">
                <div className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg font-bold">
                  首屆學員限定內容組合
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-black mb-2">12週 線上衝刺實踐班</div>
                  <div className="text-xs text-gray-600">
                    12位導師每週三晚間直播課程+QA、課程終身回放：
                    分享最真實的遠距工作與副業經驗，助你少走彎路。搭配課後任務，提升執行力。{" "}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-black mb-2">學習資源統整</div>
                  <div className="text-xs text-gray-600">
                    專屬工具包，效率倍增：
                    獨家『副業斜槓啟動包』、『職涯躍升包』、『系統平衡包』，助你高效學習，快速上手
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-black mb-2">破框者電子月刊 3本</div>
                  <div className="text-xs text-gray-600">細膩的訪談內容，認識每月講者＆嘉賓的行動願景與故事</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-black mb-2">課程期間 Skool線上社群論壇</div>
                  <div className="text-xs text-gray-600">留言板心得交流、每月分享聚會、期末DemoDay</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-black mb-2">Linkedin 校友網絡</div>
                  <div className="text-xs text-gray-600">加入群組建立長期連結、商業合作職涯機會分享</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-black mb-2">際遊牧領袖Podcast趨勢分享</div>
                  <div className="text-xs text-gray-600">獨家現身說法，興趣、熱情事業的永續經營之道</div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-[#FF6B35] to-[#FF6B35] rounded-xl p-6 text-center text-white shadow-lg">
                <div className="text-lg font-bold mb-2">🏆 績優學員專屬獎勵</div>
                <div className="text-sm">
                  課程期間成長表現優異的學員，將有機會獲得<span className="font-semibold">學費的部分或全額</span>
                  <span className="text-2xl font-bold text-yellow-200 mx-1">獎學金</span>， 以及
                  <span className="text-2xl font-bold text-yellow-200 mx-1">2026年遊牧啟發之旅招待名額</span>！
                </div>
              </div>
            </div>
          </div>

          {/* Course Outcomes */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">完整課程過後，你將會獲得</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border-2 border-[#FF6B35] rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-[#FF6B35] mb-2">01.</div>
                <div className="border-b-2 border-[#FF6B35] mb-4"></div>
                <h4 className="font-bold text-black mb-2">開啟副業斜槓</h4>
                <p className="text-sm text-gray-600">
                  開啟多元收入： 掌握個人定位與行動策略，啟航高收入副業，邁向財務自由！
                </p>
              </div>
              <div className="bg-white border-2 border-[#FF6B35] rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-[#FF6B35] mb-2">02.</div>
                <div className="border-b-2 border-[#FF6B35] mb-4"></div>
                <h4 className="font-bold text-black mb-2">國際、遠距職涯</h4>
                <p className="text-sm text-gray-600">
                  履歷更新與求職策略，助你成功進入國際遠距市場，獲得夢寐以求的職位！
                </p>
              </div>
              <div className="bg-white border-2 border-[#FF6B35] rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-[#FF6B35] mb-2">03.</div>
                <div className="border-b-2 border-[#FF6B35] mb-4"></div>
                <h4 className="font-bold text-black mb-2">全面規劃</h4>
                <p className="text-sm text-gray-600">
                  人生藍圖，清晰可見： 以終為始的生活職涯綜合考量，助你打造專屬人生藍圖，實現工作與生活的完美平衡。
                </p>
              </div>
              <div className="bg-white border-2 border-[#FF6B35] rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-[#FF6B35] mb-2">04.</div>
                <div className="border-b-2 border-[#FF6B35] mb-4"></div>
                <h4 className="font-bold text-black mb-2">成長路上的夥伴</h4>
                <p className="text-sm text-gray-600">
                  終身戰友，共同奔向自由： 加入頂尖遊牧社群，與一群志同道合的夥伴共同成長，你的自由人生從此不再孤單！
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-12 bg-black rounded-2xl py-6 px-8 inline-block">
              還有優惠！
            </h3>
            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Changed: Removed expired pricing cards (TWD 9,999 and TWD 11,500) and moved orange border to current price (TWD 12,500) */}
              <div className="bg-gray-800 text-white rounded-2xl p-6 shadow-sm border-4 border-[#FF6B35]">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-200 font-bold text-lg">10月28日-11月30日</div>
                    <div className="text-sm">晚還是必須加入</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 12,500</div>
                </div>
              </div>

              <div className="bg-gray-700 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-200 font-bold text-lg">12月日起</div>
                    <div className="text-sm">原價</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 13,500</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* // SECTION 8 PRICING END */}

      {/* // SECTION 9 BONUS START */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border-2 border-orange-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">🎁 獨享加贈</h3>

            <div className="bg-orange-50 rounded-xl p-6 mb-6">
              <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-2">
                現在報名享有 「限量免費」
                <br />
                人脈社群互助交流社群
              </div>
              <div className="text-lg text-gray-600 line-through mb-2">原價 399/月 × 7個月 = 2,793元</div>
            </div>

            {/* 手機版 */}
            <p className="block sm:hidden text-gray-600 mb-8 leading-relaxed">
              3 個月課程後
              <br />
              追加 7 個月線上社群延續學習熱度
              <br />
              讓你的遠距遊牧之路不孤單
              <br />
              持續成長與進步。
            </p>

            {/* 電腦版 */}
            <p className="hidden sm:block text-gray-600 mb-8 leading-relaxed">
              3 個月連續課程後，追加 7 個月線上社群，延續學習熱度
              <br /> 讓你的遠距遊牧之路不孤單，持續成長與進步。
            </p>

            <a
              href={getCheckoutURLWithTracking()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => {
                if (typeof window !== "undefined" && window.trackInitiateCheckout) {
                  window.trackInitiateCheckout(0)
                }
              }}
            >
              立即搶購限量優惠 →
            </a>

            <div className="mt-4 text-sm text-gray-500">⏰ 名額有限贈完為止！</div>
          </div>
        </div>
      </section>
      {/* // SECTION 9 BONUS END */}

      {/* // SECTION 10 FAQ START */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">常見問題</h2>
            <div className="w-24 h-1 bg-[#FF6B35] mx-auto rounded-full"></div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {/* FAQ 1 */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-black mb-3">Q: 課程結束後，我能達到什麼程度？</h3>
                <p className="text-gray-700 leading-relaxed">
                  A: 課程結束後，你將具備開始接案、跨國遠距工作的基礎能力，並擁有個人品牌和國際履歷。
                </p>
              </CardContent>
            </Card>

            {/* FAQ 2 */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-black mb-3">Q: 課程內容適合完全沒有經驗的新手嗎？</h3>
                <p className="text-gray-700 leading-relaxed">
                  A: 課程設計從零開始，適合沒有經驗的新手。我們將提供初學者也能執行的第一步指導，讓你輕鬆入門。
                </p>
              </CardContent>
            </Card>

            {/* FAQ 3 */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-black mb-3">Q: 課程時間如何安排？</h3>
                <p className="text-gray-700 leading-relaxed">
                  A:
                  課程為期12週，每週有線上課程和課後實作任務。直播課程也會錄製下來提供回放，你可以根據自己的時間彈性安排學習進度。
                </p>
              </CardContent>
            </Card>

            {/* FAQ 4 */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-black mb-3">Q: 課程費用包含哪些內容？</h3>
                <p className="text-gray-700 leading-relaxed">A: 課程費用包含所有線上課程、實作練習、社群資源。</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* // SECTION 10 FAQ END */}

      {/* // FOOTER START */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p className="text-sm">
          &copy; 2025 遠距遊牧學院 Travel With Work Academy. All rights reserved.
          <br />
          任何疑問請洽 Instagram:{" "}
          <a
            href="https://www.instagram.com/travelwithwork_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 transition-colors"
          >
            遠距遊牧學院
          </a>{" "}
          / Email: Academy@travelwithwork.life
        </p>
      </footer>
      {/* // FOOTER END */}

      {/* Image Gallery Modal */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 z-10 text-xl font-bold"
            >
              ✕
            </button>

            {/* Previous Button */}
            {stagePhotos[currentStage].length > 1 && (
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
            )}

            {/* Next Button */}
            {stagePhotos[currentStage].length > 1 && (
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
            )}

            {/* Image Container */}
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

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent text-white p-6 rounded-b-lg">
                  <p className="text-center text-sm sm:text-base font-medium leading-relaxed">
                    {stagePhotos[currentStage][currentPhotoIndex]?.alt}
                  </p>
                </div>
              </div>
            </div>

            {/* Photo Counter */}
            {stagePhotos[currentStage].length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                <span className="text-orange-400">{currentPhotoIndex + 1}</span>
                <span className="mx-2 text-gray-300">/</span>
                <span>{stagePhotos[currentStage].length}</span>
              </div>
            )}

            {/* Keyboard navigation hint */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg text-xs opacity-70">
              使用 ← → 鍵或點擊按鈕切換圖片
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
