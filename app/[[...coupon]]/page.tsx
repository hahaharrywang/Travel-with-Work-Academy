"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useParams } from "next/navigation"

const getCheckoutURL = (couponCode?: string) => {
  const baseURL = "https://travelworkacademy.myteachify.com/checkout?planId=8ffeedda-e624-4c43-a050-39b8bcac5cc0"
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

  const stagePhotos = [
    [
      { src: "/online-learning-digital-skills.png", alt: "線上學習工作坊" },
      { src: "/remote-work-home-office.png", alt: "遠距工作環境設置" },
      { src: "/digital-skills-training.png", alt: "數位技能培訓課程" },
    ],
    [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2_2.jpg-sr1t7443ADzaGZCXce0k5aYt0RkoWp.jpeg",
        alt: "一日同事 Coworking",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2_3.jpg-0IyLFbeEHPFpShsNWLO9p3lk3vexg3.jpeg",
        alt: "遊牧者交流活動",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2_1.jpg-M9xnN0cObzxZFIjRmdkIGVNYU5AGoL.jpeg",
        alt: "每月數位遊牧小聚",
      },
    ],
    [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-1-POkyUXEvofiKnJD7RW7y8XPZ8TiZax.webp",
        alt: "越南峴港Holi節慶文化體驗",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3_3-HocinB3Ob9XBKSh401ZMSUqERXMVxK.webp",
        alt: "海邊冥想身心平衡",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3_2-C9qMchRBOXVbbJQkpaPWTdXz2KU5wg.webp",
        alt: "台灣數位遊牧社群聚會",
      },
    ],
    [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_2-CyyyNGc5AMNLnbmY31T06rUaCfIBo8.png",
        alt: "線上會議討論",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_3.jpg-AFOdzrdCQRmkAbTaNaKX14AklTPiJe.jpeg",
        alt: "專業演講分享",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%88%AA%E5%9C%96%202025-08-27%20%E6%99%9A%E4%B8%8A7.38.33-F8SRPgmQ0uyCHk9uLjQilXpKZjQxfk.png",
        alt: "數位學習科技應用",
      },
    ],
    [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20231216-0D0A0595.jpg-S5ylj7p7LbnLaaq59pym2qSAwNJYxf.jpeg",
        alt: "社群網絡建立慶祝活動",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250329-DSC01965.jpg-Esdk9O9x29Jwx4P1jFc334RC972HXB.jpeg",
        alt: "學習成果展示與認證儀式",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/227A8906.jpg-9G3V7GbFRKiwyUgZrRL0wSXbJyVHNN.jpeg",
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
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%B7%A5%E5%85%B7%E7%8E%8B%E5%95%8A%E7%92%8B-LVeQPDeN0gNF0tBbw1KTugUs5Agdql.png",
      link: "https://www.johntool.com",
      background:
        "工具王阿璋是『阿璋遊牧』電子報創辦人、數位遊牧陪跑計劃創辦人、IP 經營者，擁有豐富的數位遊牧經驗與社群經營知識。",
    },
    {
      name: "三分鐘",
      title: "IG+FB+Threads 共 10萬粉絲、知識型 IP 經營者，揭秘如何透過社群影響力，放大個人價值",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E4%B8%89%E5%88%86%E9%90%98.jpg-uRO2bzeSUZ5RWwa1iYEvEPfNB9Mcjl.jpeg",
      link: "https://www.instagram.com/only3minute/",
      background:
        "三分鐘是擁有超過10萬粉絲的知識型 IP 經營者，擅長透過社群媒體放大個人價值，並分享實用的內容創作與經營策略。",
    },
    {
      name: "鮪魚",
      title: "生鮮時書創辦人、知名知識變現顧問，知識產品 MVP思維：最小可行產品測試",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%AE%AA%E9%AD%9A.jpg-VDNe0wRiY8em6DXNMgYTf5f3C7grun.jpeg",
      link: "https://www.instagram.com/newsvegtw/",
      background: "專注於知識變現與內容創新，協助超過百位講師完成課程開發，累積銷售額突破 3 億。",
    },
    {
      name: "西打藍",
      title: "創立一人公司、IG 粉絲近 1 萬、電子報訂閱 2500+，五年真實經驗帶你從零開始到高價接案的完整路徑",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%A5%BF%E6%89%93%E8%97%8D.jpg-WIgmlh9hxrDGJzHm4CRJsKCNsyldoX.jpeg",
      link: "https://siddharam.com",
      background:
        "西打藍是一位成功的獨立工作者，創立一人公司並累積豐富的接案經驗，將分享從零開始到高價接案的完整路徑。",
    },
    {
      name: "林上哲",
      title: "非資訊背景 AI生產力工具教育者，已幫助4200+ 台灣、日本和香港的學員",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%9E%97%E4%B8%8A%E5%93%B2_2.jpg-G5bK6x7qmVDbalRXX4a6EqVc8YVzW0.jpeg",
      link: "https://www.instagram.com/nuva.now/",
      background:
        "林上哲是一位非資訊背景的 AI 生產力工具教育者，擅長將複雜的 AI 工具轉化為易於理解的教學內容，幫助學員提升工作效率。",
    },
    {
      name: "許詮",
      title: "前 TikTok 子公司總經理、前阿里巴巴子公司副總、XChange創辦人、33 歲退休旅居峇里島。",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%A8%B1%E8%A9%AE.jpg-itDEjBXa0hB8ICG282sBZU9QpyFY6P.jpeg",
      link: "https://www.facebook.com/SnT.life",
      background:
        "許詮曾任職於 TikTok 和阿里巴巴等知名企業，現為 XChange 創辦人，並已實現33歲退休旅居峇里島的目標，是實現財務自由的典範。",
    },
    {
      name: "Shelley",
      title: "ADPList 2025 Top 50 Global Mentor，LinkedIn 個人品牌術，機會自己來敲門",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shelly.jpg-PyXkAhj2OxAkXAl9Sb17kH47TZpuFY.jpeg",
      link: "https://www.linkedin.com/in/yuhsuan-tien",
      background:
        "Shelley 是 ADPList 2025 Top 50 Global Mentor，專精於 LinkedIn 個人品牌建立，協助個人發掘機會並拓展職涯。",
    },
    {
      name: "讀者太太",
      title: "英國職涯教練、「女力學院」《人脈力》講師，突破跨國遠距職涯天花板",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%AE%80%E8%80%85%E5%A4%AA%E5%A4%AA.jpg-S6PC1XhLu0mpPoDfHEZowxDfv77RmP.jpeg",
      link: "https://www.facebook.com/duzhetaitai",
      background: "讀者太太是英國職涯教練，也是「女力學院」《人脈力》講師，擅長協助專業人士突破跨國遠距職涯的限制。",
    },
    {
      name: "Emilia",
      title: "高階跨國獵頭，獵頭揭密談薪技巧與職涯躍升策略",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Emilia.jpg-FpV0n9aFLdhY5GYrItCdLACYQsR1zU.jpeg",
      link: "https://www.linkedin.com/in/emchh/",
      background: "Emilia 是一位經驗豐富的高階跨國獵頭，將分享獵頭行業的秘辛、談薪技巧以及職涯躍升的策略。",
    },
    {
      name: "Joyce Weng",
      title: "過去為記者的她，跳脫傳統、成功於海外轉型遠全遠距工作，她將剖析如何規劃旅居財務、精打細算開銷！",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joyce.jpg-kKQwCgv6ckQRZXeM1TkEavpB1UxKSt.jpeg",
      link: "https://www.facebook.com/storiesinmyworld",
      background:
        "Joyce Weng 是一位成功從記者轉型為遠距工作者的前輩，將分享她在海外的經驗，以及如何規劃旅居財務與開銷。",
    },
    {
      name: "林佳 Zoe",
      title: "9萬粉絲自媒體創作者，專長於打造自媒體與 IG 流量，協助你產出具潛力的短影片與貼文！",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%AF%8F%E6%97%A5E%E9%8C%A0.jpg-uUoyWQD7LwmMBYTszPZiaMDwYYf7Cj.jpeg",
      link: "https://www.daydayding.com",
      background:
        "林佳 Zoe 是一位擁有9萬粉絲的自媒體創作者，專長於 IG 流量經營與短影片製作，將分享如何打造吸引人的內容。",
    },
    {
      name: "Angela Feng",
      title: "Ness Wellness 共同創辦人、創業投資管理者，遠距生活可持續的身心靈平衡",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Angela.jpg-AQCGKocPMUR7UrNaGtZQ1YUjKcSM2t.jpeg",
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.png"
            alt="Remote work scene"
            fill
            className="object-cover opacity-20"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/1200%20X%20630_%E5%8E%BB%E8%83%8C%281%29-yC64DWAch4EN9iMJGxAbGWqOVTKT2B.png"
              alt="遠距遊牧學院 Travel With Work Academy"
              width={400}
              height={120}
              className="mx-auto"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            告別朝九晚五
            <br />
            <span className="text-[#FF6B35]">解鎖你的全球遠距自由人生！</span>
          </h1>

          {/* Subtitle */}
          <div className="mb-8">
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              臺灣首個系統性 『遠距遊牧實戰學院』
              <br className="sm:hidden" /> 助你邊旅行邊實現人生價值
            </p>
          </div>

          {/* Core Promise */}
          {/* Mobile Version */}
          <div className="block sm:hidden bg-black/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-200">
            <p className="text-lg text-black font-medium leading-relaxed">
              10個月學習與累積
              <br />
              讓你獲得開啟副業、遠距職涯的基礎能力
              <br />
              不只是學習方法
              <br />
              是大家一起付諸行動、一起成長
            </p>
          </div>

          {/* Desktop Version */}
          <div className="hidden sm:block bg-black/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-8 border border-gray-200">
            <p className="text-lg sm:text-xl text-black font-medium leading-relaxed">
              10個月學習與累積，讓你獲得開啟副業、遠距職涯的基礎能力
              <br />
              不只是學習方法，是大家一起付諸行動、一起成長
            </p>
          </div>

          {/* CTA Button */}
          <div className="space-y-4 relative z-30">
            <Button
              asChild
              size="lg"
              className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-semibold px-8 py-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative z-30"
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
                開啟自由人生
                <br />
                早鳥優惠，立刻報名
              </a>
            </Button>
            <p className="text-sm text-gray-500"> </p>
          </div>
        </div>
      </section>

      {/* Course Super Highlights Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
              <span className="text-black">課程超級亮點</span>
            </h2>
            <div className="w-24 h-1 bg-[#FF6B35] mx-auto rounded-full"></div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Highlight 1 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">副業增收 + 遠距工作</h3>
                <h4 className="text-lg font-semibold text-[#FF6B35] mb-2">雙軌並行，多元可能</h4>
                <p className="text-gray-600 leading-relaxed">
                  無需辭職，掌握高薪遠距工作技能，同步開啟多元副業收入，邁向職涯與財務升級！
                </p>
              </CardContent>
            </Card>

            {/* Highlight 2 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">行動導向設計</h3>
                <h4 className="text-lg font-semibold text-[#FF6B35] mb-2">實戰為王，成果可見</h4>
                <p className="text-gray-600 leading-relaxed">
                  獨家『行動導向學習路徑』，從課後任務、專屬資源包到期末實戰發表，確保你學以致用！{" "}
                </p>
              </CardContent>
            </Card>

            {/* Highlight 3 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20a3 3 0 01-3-3v-2a3 3 0 013-3m3-3a3 3 0 110-6 3 3 0 010 6m0 3a3 3 0 017.111 1.542M10 9a3 3 0 110-6 3 3 0 010 6m0 3a3 3 0 017.111 1.542c.422.621.78 1.293 1.067 2M18 9v3m0 0v3m-3 0" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">社群支持</h3>
                <h4 className="text-lg font-semibold text-[#FF6B35] mb-2">頂尖社群，加速成長</h4>
                <p className="text-gray-600 leading-relaxed">
                  加入臺灣最大數位遊牧社群，與全球菁英共同旅行、共創專案、激盪創意，成長之路從此不再孤單！
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ecosystem Integration & Partnership Section */}
          <section className="py-12 sm:py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* 遊牧資源生態系 */}
              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">遊牧資源生態系</h2>
                <h3 className="text-xl sm:text-2xl text-black mb-4">線上教育 | 線下社群 | 國際鏈結</h3>
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
                      <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-lg p-2 sm:p-4">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/%E6%95%B8%E4%BD%8D%E9%81%8A%E7%89%A7%E5%8F%B0%E7%81%A3%20Logo%281%29-C61XdAGmggafsIPGsR4Mk87gbWTReK.png"
                          alt="Taiwan Digital Nomad"
                          width={96}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </a>
                    <p className="text-[#FF6B35] font-semibold text-xs sm:text-sm">#台灣最大數位遊牧社群</p>
                  </div>

                  <div className="hidden lg:block text-[#FF6B35] text-9xl flex items-center justify-center h-32 -mt-12">
                    ×
                  </div>

                  {/* Partner 2 - t campus */}
                  <div className="text-center">
                    <a
                      href="https://www.instagram.com/elsacampus/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:scale-105 transition-transform duration-200"
                    >
                      <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-lg p-2 sm:p-4">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/%E6%88%90%E9%95%B7%E7%87%9FLogo.jpg%281%29-Gb0vHOQKr1blPM9S9W5TMAMalV3J1D.jpeg"
                          alt="成長營"
                          width={96}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </a>
                    <p className="text-[#FF6B35] font-semibold text-xs sm:text-sm">#多年不同學院創建經驗</p>
                  </div>

                  <div className="hidden lg:block text-[#FF6B35] text-9xl flex items-center justify-center h-32 -mt-12">
                    ×
                  </div>

                  {/* Partner 3 - 生鮮時書 */}
                  <div className="text-center">
                    <a
                      href="https://newsveg.tw/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:scale-105 transition-transform duration-200"
                    >
                      <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-lg p-2 sm:p-4">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/%E7%94%9F%E9%AE%AE%E6%99%82%E6%9B%B8%20Logo%281%29-nuqMyguQqjONd0soWjVTsiGAAMPvdz.png"
                          alt="生鮮時書 NEWSVEG"
                          width={96}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </a>
                    <p className="text-[#FF6B35] font-semibold text-xs sm:text-sm">#知識萃取專家</p>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-black">強強聯手，全面資源整合</h3>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-16 sm:py-6 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">精選講師陣容</h2>
            <p className="text-xl text-gray-600 mb-6">10月 - 12月 / 每週三晚間直播課程</p>
            <div className="w-24 h-1 bg-[#FF6B35] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {instructors.map((instructor, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-4">
                  <a
                    href={instructor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <Image
                      src={instructor.image || "/placeholder.svg"}
                      alt={instructor.name}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-black mb-2">{instructor.name}</h3>
                <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed mb-1">{instructor.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Outline Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">課程大綱</h2>
            <p className="text-lg text-gray-600 mb-6">10月 - 12月 / 每週三晚間直播課程</p>
            <div className="w-24 h-1 bg-[#FF6B35] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-12">
            {/* Month 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div
                className="p-6"
                style={{
                  background: "linear-gradient(to right, #FF6B35, #FF8C42)",
                  backgroundColor: "#FF6B35",
                }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ color: "#ffffff" }}>
                  十月：副業與個人品牌啟動
                </h3>
                <p className="text-white/90 text-lg" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  核心目標：了解遠距收入來源的多樣性，並踏出第一筆線上收入。
                </p>
              </div>
              <div className="p-6 space-y-6">
                {/* Week 1 */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        instructors.find((i) => i.name === "工具王阿璋")?.image || "/placeholder.svg?height=80&width=80"
                      }
                      alt="工具王阿璋"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        第 1 週
                      </span>
                      <span className="text-[#FF6B35] font-semibold">工具王阿璋</span>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-3">
                      從零到第一步的遠距人生：打造你的數位遊牧起跑線
                    </h4>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          week: 1,
                          title: "從零到第一步的遠距人生：打造你的數位遊牧起跑線",
                          instructor: "工具王阿璋",
                          instructorData: instructors.find((i) => i.name === "工具王阿璋"),
                          month: 1,
                        })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>

                {/* Week 2 */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Image
                      src={instructors.find((i) => i.name === "林上哲")?.image || "/placeholder.svg?height=80&width=80"}
                      alt="林上哲"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        第 2 週
                      </span>
                      <span className="text-[#FF6B35] font-semibold">林上哲</span>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-3">
                      Focus on Your True Value 讓 AI 成為你的實習生：從對話到自動化的第一個完整流程
                    </h4>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          week: 2,
                          title: "Focus on Your True Value 讓 AI 成為你的實習生：從對話到自動化的第一個完整流程",
                          instructor: "林上哲",
                          instructorData: instructors.find((i) => i.name === "林上哲"),
                          month: 1,
                        })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>

                {/* Week 3 */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Image
                      src={instructors.find((i) => i.name === "三分鐘")?.image || "/placeholder.svg?height=80&width=80"}
                      alt="三分鐘"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        第 3 週
                      </span>
                      <span className="text-[#FF6B35] font-semibold">三分鐘</span>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-3">爆款內容養成術：上班族也能做出會紅的作品</h4>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          week: 3,
                          title: "爆款內容養成術：上班族也能做出會紅的作品",
                          instructor: "三分鐘",
                          instructorData: instructors.find((i) => i.name === "三分鐘"),
                          month: 1,
                        })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>

                {/* Week 4 */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        instructors.find((i) => i.name === "林佳 Zoe")?.image || "/placeholder.svg?height=80&width=80"
                      }
                      alt="林佳 Zoe"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        第 4 週
                      </span>
                      <span className="text-[#FF6B35] font-semibold">林佳 Zoe</span>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-3">30 秒變人氣：短影片爆紅腳本全攻略</h4>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          week: 4,
                          title: "30 秒變人氣：短影片爆紅腳本全攻略",
                          instructor: "林佳 Zoe",
                          instructorData: instructors.find((i) => i.name === "林佳 Zoe"),
                          month: 1,
                        })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>

                {/* Week 5 */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Image
                      src={instructors.find((i) => i.name === "西打藍")?.image || "/placeholder.svg?height=80&width=80"}
                      alt="西打藍"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        第 5 週
                      </span>
                      <span className="text-[#FF6B35] font-semibold">西打藍</span>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-3">立即開始：打磨你的第一個接案方案</h4>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          week: 5,
                          title: "立即開始：打磨你的第一個接案方案",
                          instructor: "西打藍",
                          instructorData: instructors.find((i) => i.name === "西打藍"),
                          month: 1,
                        })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Month 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div
                className="p-6"
                style={{
                  background: "linear-gradient(to right, #FF6B35, #FF8C42)",
                  backgroundColor: "#FF6B35",
                }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ color: "#ffffff" }}>
                  十一月：遠端、國際職涯與高薪機會
                </h3>
                <p className="text-white/90 text-lg" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  核心目標：探索跨國遠距工作與高薪職涯的可能性。
                </p>
              </div>
              <div className="p-6 space-y-6">
                {/* Week 6 */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Image
                      src={instructors.find((i) => i.name === "許詮")?.image || "/placeholder.svg?height=80&width=80"}
                      alt="許詮"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        第 6 週
                      </span>
                      <span className="text-[#FF6B35] font-semibold">許詮</span>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-3">突破薪資天花板：跨國職涯的高薪祕訣</h4>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          week: 6,
                          title: "突破薪資天花板：跨國職涯的高薪祕訣",
                          instructor: "許詮",
                          instructorData: instructors.find((i) => i.name === "許詮"),
                          month: 2,
                        })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>

                {/* Week 7 */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        instructors.find((i) => i.name === "Shelley")?.image || "/placeholder.svg?height=80&width=80"
                      }
                      alt="Shelley"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        第 7 週
                      </span>
                      <span className="text-[#FF6B35] font-semibold">Shelley</span>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-3">讓機會找上你：LinkedIn 國際個人品牌攻略</h4>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          week: 7,
                          title: "讓機會找上你：LinkedIn 國際個人品牌攻略",
                          instructor: "Shelley",
                          instructorData: instructors.find((i) => i.name === "Shelley"),
                          month: 2,
                        })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>

                {/* Week 8 */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        instructors.find((i) => i.name === "讀者太太")?.image || "/placeholder.svg?height=80&width=80"
                      }
                      alt="讀者太太"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        第 8 週
                      </span>
                      <span className="text-[#FF6B35] font-semibold">讀者太太</span>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-3">
                      外商面試全拆解：讀懂雇主需求，打造讓 HR 馬上點頭的履歷與回答
                    </h4>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          week: 8,
                          title: "外商面試全拆解：讀懂雇主需求，打造讓 HR 馬上點頭的履歷與回答",
                          instructor: "讀者太太",
                          instructorData: instructors.find((i) => i.name === "讀者太太"),
                          month: 2,
                        })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>

                {/* Week 9 */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Image
                      src={instructors.find((i) => i.name === "Emilia")?.image || "/placeholder.svg?height=80&width=80"}
                      alt="Emilia"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        第 9 週
                      </span>
                      <span className="text-[#FF6B35] font-semibold">Emilia</span>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-3">獵頭不告訴你的祕密：談薪與職涯跳躍策略</h4>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          week: 9,
                          title: "獵頭不告訴你的祕密：談薪與職涯跳躍策略",
                          instructor: "Emilia",
                          instructorData: instructors.find((i) => i.name === "Emilia"),
                          month: 2,
                        })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Month 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div
                className="p-6"
                style={{
                  background: "linear-gradient(to right, #FF6B35, #FF8C42)",
                  backgroundColor: "#FF6B35",
                }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ color: "#ffffff" }}>
                  十二月：實戰應用與未來規劃
                </h3>
                <p className="text-white/90 text-lg" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  核心目標：整合所學技能，制定長期發展策略，實現可持續的遠距職涯。
                </p>
              </div>
              <div className="p-6 space-y-6">
                {/* Week 10 */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Image
                      src={instructors.find((i) => i.name === "鮪魚")?.image || "/placeholder.svg?height=80&width=80"}
                      alt="鮪魚"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        第 10 週
                      </span>
                      <span className="text-[#FF6B35] font-semibold">鮪魚</span>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-3">
                      透過市場驗證過之有效框架，讓你的知識專業成為商品
                    </h4>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          week: 10,
                          title: "透過市場驗證過之有效框架，讓你的知識專業成為商品",
                          instructor: "鮪魚",
                          instructorData: instructors.find((i) => i.name === "鮪魚"),
                          month: 3,
                        })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>

                {/* Week 11 */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        instructors.find((i) => i.name === "Joyce Weng")?.image || "/placeholder.svg?height=80&width=80"
                      }
                      alt="Joyce Weng"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        第 11 週
                      </span>
                      <span className="text-[#FF6B35] font-semibold">Joyce Weng</span>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-3">邊旅行邊安心：旅居人生的財務自由設計</h4>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          week: 11,
                          title: "邊旅行邊安心：旅居人生的財務自由設計",
                          instructor: "Joyce Weng",
                          instructorData: instructors.find((i) => i.name === "Joyce Weng"),
                          month: 3,
                        })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>

                {/* Week 12 */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        instructors.find((i) => i.name === "Angela Feng")?.image ||
                        "/placeholder.svg?height=80&width=80" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt="Angela Feng"
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        第 12 週
                      </span>
                      <span className="text-[#FF6B35] font-semibold">Angela</span>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-3">個人遠距職涯發展計劃制定</h4>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          week: 12,
                          title: "個人遠距職涯發展計劃制定",
                          instructor: "Angela",
                          instructorData: instructors.find((i) => i.name === "Angela Feng"),
                          month: 3,
                        })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#FF6B35] px-3 py-1 rounded-full text-sm font-semibold text-white">
                      第 {selectedWeek.week} 週
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-1">{selectedWeek.instructor}</h3>
                  <p className="text-gray-600 text-sm">{selectedWeek.instructorData?.title}</p>
                </div>
              </div>

              {/* Course Title */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-black mb-4 text-balance">{selectedWeek.title}</h2>
                <div className="w-full h-1 rounded-full bg-[#FF6B35]"></div>
              </div>

              {/* 課程目標 */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-black mb-3">課程目標</h4>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">
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
                      "學會知識萃取的方法，將專業轉化為知識產品，完成快速驗證的知識商品方案，降低試錯成本，建立多元變現思維。"}
                    {selectedWeek.month === 3 &&
                      selectedWeek.week === 11 &&
                      "制定旅居財務規劃表，掌握收支平衡，了解跨國移動中如何保持財務穩定，預備未來自由生活，降低財務焦慮。"}
                    {selectedWeek.month === 3 &&
                      selectedWeek.week === 12 &&
                      "學會設計生活與工作 SOP，建立可持續的人生規劃，建立身心靈平衡，提升專注力與效能，學會自我覺察與有效溝通。"}
                  </p>
                </div>
              </div>

              {/* 核心內容 */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-black mb-3">核心內容</h4>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <ul className="text-gray-700 leading-relaxed space-y-2">
                    {selectedWeek.month === 1 && selectedWeek.week === 1 && (
                      <>
                        <li>• 真實案例分享：講師夫妻的遊牧經歷</li>
                        <li>• 收入模式全景圖：解析主要收入來源與轉換歷程</li>
                        <li>• 起跑線設計：設定目標與初步收入策略</li>
                        <li>• 兩種起點的故事：還沒賺到錢 → 如何獲得第一筆收入；已有收入 → 如何在不穩定中找到穩定</li>
                      </>
                    )}
                    {selectedWeek.month === 1 && selectedWeek.week === 2 && (
                      <>
                        <li>• AI 溝通 × 串接：透過 n8n workflow 串接</li>
                        <li>• 實用案例：自動寄送表單回覆 Email</li>
                        <li>• 思維轉換：辨識哪些任務該自己做、哪些交給 AI</li>
                        <li>• 60 分鐘完成一個自動化 MVP</li>
                      </>
                    )}
                    {selectedWeek.month === 1 && selectedWeek.week === 3 && (
                      <>
                        <li>• 個人品牌全貌：從定位、內容到變現</li>
                        <li>• 爆款內容拆解：判斷文章或作品為何會紅</li>
                        <li>• 上班族時間管理技巧</li>
                        <li>• 內容創作系統：長期產出方法</li>
                        <li>• 粉絲互動策略：提升社群黏著度</li>
                        <li>• 個人 IP 建立</li>
                      </>
                    )}
                    {selectedWeek.month === 1 && selectedWeek.week === 4 && (
                      <>
                        <li>• 短影片爆紅三要素與熱門腳本</li>
                        <li>• 日常 routine 帶入方法</li>
                        <li>• 露臉與不露臉的案例解析</li>
                        <li>• 腳本設計與實作練習</li>
                      </>
                    )}
                    {selectedWeek.month === 1 && selectedWeek.week === 5 && (
                      <>
                        <li>• 方案演化史：作品集到提案</li>
                        <li>• 現場銷售演練：模擬互動與市場回饋</li>
                        <li>• 完成完整接案提案</li>
                        <li>• 市場檢驗：學員提案分享與反饋</li>
                        <li>• 銷售心法：如何提升成交機會</li>
                      </>
                    )}
                    {selectedWeek.month === 2 && selectedWeek.week === 6 && (
                      <>
                        <li>• 講師跨國職涯經驗分享</li>
                        <li>• 轉職與薪資翻倍案例（45 位學生成功案例）</li>
                        <li>• 跨文化溝通與管理經驗</li>
                      </>
                    )}
                    {selectedWeek.month === 2 && selectedWeek.week === 7 && (
                      <>
                        <li>• LinkedIn 策略總覽</li>
                        <li>• 專業形象優化技巧</li>
                        <li>• 多元經營方式（接案、跨國職涯）</li>
                        <li>• Quality Networking 實務</li>
                        <li>• Coffee Chat 溝通技巧</li>
                      </>
                    )}
                    {selectedWeek.month === 2 && selectedWeek.week === 8 && (
                      <>
                        <li>• 個人介紹與國際職場分析</li>
                        <li>• 如何閱讀 JD：邏輯與關鍵字</li>
                        <li>• 外商求職申請流程解析</li>
                        <li>• 履歷與 Cover Letter 撰寫技巧</li>
                        <li>• 外商面試模擬演練</li>
                      </>
                    )}
                    {selectedWeek.month === 2 && selectedWeek.week === 9 && (
                      <>
                        <li>• 獵頭工作流程揭秘</li>
                        <li>• 履歷優化技巧</li>
                        <li>• 面試表現指南</li>
                        <li>• 薪資談判策略</li>
                        <li>• 跨國求職防踩雷</li>
                      </>
                    )}
                    {selectedWeek.month === 3 && selectedWeek.week === 10 && (
                      <>
                        <li>• 知識商品全景介紹</li>
                        <li>• 知識萃取技巧</li>
                        <li>• 快速驗證方法</li>
                      </>
                    )}
                    {selectedWeek.month === 3 && selectedWeek.week === 11 && (
                      <>
                        <li>• 講師財務與職涯經驗分享</li>
                        <li>• 財務規劃的重要性與方法</li>
                        <li>• 多樣案例分析：他人方法 vs. 自身方法</li>
                        <li>• 財務工具應用：旅居財務規劃表</li>
                      </>
                    )}
                    {selectedWeek.month === 3 && selectedWeek.week === 12 && (
                      <>
                        <li>• 個人 SOP 使用說明書</li>
                        <li>• 身心狀態管理方法</li>
                        <li>• 吸引力法則與正念</li>
                        <li>• 自我覺察與溝通力</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* 講師背景 */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-black mb-3">講師背景</h4>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-gray-700 leading-relaxed space-y-2">
                    {selectedWeek.month === 1 && selectedWeek.week === 1 && (
                      <div>
                        <p>• 工具王阿璋 IP 經營（超過 20 萬粉絲)</p>
                        <p>• 碩士開始全職經營自媒體，至今超過 6 年</p>
                        <p>• 夫妻數位遊牧 2 年經歷，前往泰國、越南、菲律賓、日本、馬來西亞等多國旅居</p>
                        <p>• 經營「阿璋遊牧」電子報，持續週更 2 年，累積超過 7000 位忠實讀者</p>
                        <p>• 創立「數位遊牧陪跑計劃」，協助讀者成功轉型開始數位遊牧</p>
                        <p>• 以幫助他人為目標，成功獲得理想生活</p>
                      </div>
                    )}
                    {selectedWeek.month === 1 && selectedWeek.week === 2 && (
                      <div>
                        <p>• nuva 創辦人，致力推動 AI 教育與應用</p>
                        <p>• 與 NVIDIA 官方合作，擔任 AI 與 AIGC 講師</p>
                        <p>• 舉辦超過 20 場以上 AI 講座與實戰課程，累積 4,200+ 名學員</p>
                        <p>• 專長 ChatGPT、AI Line Bot、MyGPT、AIGC 實作</p>
                        <p>• 品牌「nuva」已成為台灣知名 AI 教育與實戰社群，受到 450+ 企業信賴</p>
                      </div>
                    )}
                    {selectedWeek.month === 1 && selectedWeek.week === 3 && (
                      <div>
                        <p>• 前 Skyline 編採顧問</p>
                        <p>• 前 遠見 合作社群編輯</p>
                        <p>• 前 奧美廣告 業務經理</p>
                        <p>• 神農生活 / 食習 行銷社群顧問</p>
                        <p>• 9 萬讀者 IG「三分鐘｜行銷在學中」經營者</p>
                        <p>• 行銷顧問 / 講師 / 自媒體創作者</p>
                        <p>• 合作 100+ 品牌，培訓經驗超過 50 場</p>
                      </div>
                    )}
                    {selectedWeek.month === 1 && selectedWeek.week === 4 && (
                      <div>
                        <p>• 自媒體創作者、社群行銷顧問</p>
                        <p>• 8 年跨產業行銷經驗，操盤百萬粉絲團</p>
                        <p>• IG 經營 4 個月破萬追蹤，現累積 9 萬粉絲</p>
                        <p>• 輔導逾 10,000 名學員打造個人品牌</p>
                        <p>• 曾授課於政府、企業與國際平台</p>
                      </div>
                    )}
                    {selectedWeek.month === 1 && selectedWeek.week === 5 && (
                      <div>
                        <p>• 自由接案 5 年，IG 粉絲近萬</p>
                        <p>• 電子報 2500+ 訂閱，開信率穩定 60–70%</p>
                        <p>• 代筆出版 3 本書，受邀 Podcast 專訪</p>
                        <p>• 輔導近 100 名學員接到第一個案子</p>
                        <p>• 創立接案公司，最高單筆案子 94.5 萬</p>
                        <p>• 商業行銷顧問</p>
                      </div>
                    )}
                    {selectedWeek.month === 2 && selectedWeek.week === 6 && (
                      <div>
                        <p>• 前阿里巴巴子公司副總經理、TikTok 印尼總經理</p>
                        <p>• 28 歲年薪破 700 萬，33 歲退休環遊世界</p>
                        <p>• 創辦 XChange 創投暨教育 NGO，幫助上千台灣青年</p>
                        <p>• 投資科技新創、咖啡廳與民宿</p>
                        <p>• 獲選 20 大青年領袖</p>
                        <p>• 著有《別輸在只知道努力》</p>
                      </div>
                    )}
                    {selectedWeek.month === 2 && selectedWeek.week === 7 && (
                      <div>
                        <p>• 國際職涯顧問、思維領導導師</p>
                        <p>• LinkedIn 近萬名追蹤，單篇文章破萬瀏覽</p>
                        <p>• ADPList 2025 Top 50 Global Mentor</p>
                        <p>• Favikon 台灣區「職涯發展」創作者 Top 3</p>
                        <p>• Inspiring Women Award 入圍</p>
                        <p>• 曾受邀多國論壇與企業培訓</p>
                        <p>• 培訓超過 500+ 國際專業人士</p>
                      </div>
                    )}
                    {selectedWeek.month === 2 && selectedWeek.week === 8 && (
                      <div>
                        <p>• 政大社會系、復旦新聞所畢業，曾任記者與公關</p>
                        <p>• 2011 移居英國後投入行銷產業</p>
                        <p>• 創立公司，協助台灣企業與政府推廣品牌</p>
                        <p>• 近 900 小時一對一職涯教練經驗</p>
                        <p>• 英國政大校友會首屆會長</p>
                        <p>• 著有三本著作（英國文化、跨文化職涯）</p>
                      </div>
                    )}
                    {selectedWeek.month === 2 && selectedWeek.week === 9 && (
                      <div>
                        <p>• Polygon Search 創辦人 & CEO</p>
                        <p>• 曾任 People Search、Michael Page</p>
                        <p>• 專注台美市場金融與科技領域獵才</p>
                        <p>• 職涯教練，結合獵頭專業與遊牧經驗</p>
                        <p>• 足跡遍及法國、葡萄牙與台灣</p>
                        <p>• 專長國際履歷、職涯策略、英語面試</p>
                      </div>
                    )}
                    {selectedWeek.month === 3 && selectedWeek.week === 10 && (
                      <div>
                      專注於知識變現與內容創新，經營全遠端公司，致力於以「知識為你所用」為核心理念，協助超過100位講師課程開發，累計銷售額超過 3 億。

                      曾擔任商業周刊等多家企業顧問，創辦人氣文創商品「讀曆書店」，並推出多檔 Podcast 節目，持續探索知識經濟的可能性。
                      </div>
                    )}
                    {selectedWeek.month === 3 && selectedWeek.week === 11 && (
                      <div>
                        <p>• 日本慶應大學媒體設計碩士</p>
                        <p>• 曾任台灣主流媒體國際新聞記者</p>
                        <p>• 跨文化觀察與時事解析專家</p>
                        <p>• 赴紐約進修，轉型跨領域知識實踐者</p>
                        <p>• 現任美國新創公司策略顧問</p>
                        <p>• 著有多本著作（國際觀察、職涯力養成）</p>
                      </div>
                    )}
                    {selectedWeek.month === 3 && selectedWeek.week === 12 && (
                      <div>
                        <p>• ness 共同創辦人、亞洲區品牌行銷顧問</p>
                        <p>• 14 年行銷與創投經驗</p>
                        <p>• 北京清華大學 × INSEAD 雙碩士 EMBA</p>
                        <p>• 曾管理 50+ 國際品牌推廣</p>
                        <p>• 國際舞台豐富經驗（UN CSW、Women in Tech Forum 等）</p>
                        <p>• 足跡遍及 45+ 國家</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 講師更多資訊 */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-black mb-3">講師更多資訊</h4>
                <a
                  href={selectedWeek.instructorData?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#FF6B35] hover:bg-[#E55A2B] px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-200"
                >
                  查看講師完整資料
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Content & Pricing Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">完整課程學籍內容</h2>
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
                  <div className="text-xl font-bold text-black mb-2">遊牧領域新星Podcast</div>
                  <div className="text-xs text-gray-600">獨家現身說法，興趣、熱情事業的永續經營之道</div>
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
              </div>
              <div className="mt-8 bg-gradient-to-r from-[#E55A2B] to-[#D2691E] rounded-xl p-6 text-center text-white shadow-lg">
                <div className="text-lg font-bold mb-2">🏆 績優學員專屬獎勵</div>
                <div className="text-sm">
                  課程期間成長表現優異的學員，將有機會獲得<span className="font-semibold">學費的部分或全額</span>
                  <span className="text-2xl font-bold text-yellow-200 mx-1">獎學金</span>， 以及
                  <span className="font-semibold">2026年遊牧啟發之旅招待名額</span>！
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
              早鳥優惠價來了！
            </h3>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="bg-black text-white rounded-2xl p-6 shadow-sm border-2 border-[#FF6B35]">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[#FF6B35] font-bold text-lg">9月16日-9月22日</div>
                    <div className="text-sm">晚鳥預購價</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 7,999</div>
                </div>
              </div>

              <div className="bg-gray-800 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-200 font-bold text-lg">9月23日-9月30日</div>
                    <div className="text-sm">開學前最後預購</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 8,999</div>
                </div>
              </div>

              <div className="bg-gray-700 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-200 font-bold text-lg">10月1日-10月13日</div>
                    <div className="text-sm">剛開學後悔價</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 9,999</div>
                </div>
              </div>

              <div className="bg-gray-600 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-100 font-bold text-lg">10月14日-10月27日</div>
                    <div className="text-sm">課程中加入相見恨晚</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 11,500</div>
                </div>
              </div>

              <div className="bg-gray-500 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-900 font-bold text-lg">10月28日-11月30日</div>
                    <div className="text-sm">晚還是必須加入</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 12,500</div>
                </div>
              </div>

              <div className="bg-gray-400 text-gray-900 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-900 font-bold text-lg">12月1日起</div>
                    <div className="text-sm">原價</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 13,500</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Time Offer Section */}
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
              3個月連續直播課程
              <br />
              追加7個月線上社群延續學習熱度
              <br />
              讓你的遠距遊牧之路不孤單
              <br />
              持續成長與進步。
            </p>

            {/* 電腦版 */}
            <p className="hidden sm:block text-gray-600 mb-8 leading-relaxed">
              3個月連續直播課程，追加7個月線上社群延續學習熱度
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

      {/* FAQ Section */}
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

      {/* Footer Section */}
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
    </main>
  )
}
