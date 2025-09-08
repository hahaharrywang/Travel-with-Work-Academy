"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useParams } from "next/navigation"

const getCheckoutURL = (couponCode?: string) => {
  const baseURL = "https://travelworkacademy.myteachify.com/checkout?planId=e8bd54a6-8f9d-4b2f-affc-45c438b2b4a6"
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
    },
    {
      name: "三分鐘",
      title: "IG+FB+Threads 共 10萬粉絲、知識型 IP 經營者，揭秘如何透過社群影響力，放大個人價值",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E4%B8%89%E5%88%86%E9%90%98.jpg-uRO2bzeSUZ5RWwa1iYEvEPfNB9Mcjl.jpeg",
      link: "https://www.instagram.com/only3minute/",
    },
    {
      name: "鮪魚",
      title: "生鮮時書創辦人、知名知識變現顧問，知識產品 MVP思維：最小可行產品測試",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%AE%AA%E9%AD%9A.jpg-VDNe0wRiY8em6DXNMgYTf5f3C7grun.jpeg",
      link: "https://www.instagram.com/newsvegtw/",
    },
    {
      name: "西打藍",
      title: "創立一人公司、IG 粉絲近 1 萬、電子報訂閱 2500+，五年真實經驗帶你從零開始到高價接案的完整路徑",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%A5%BF%E6%89%93%E8%97%8D.jpg-WIgmlh9hxrDGJzHm4CRJsKCNsyldoX.jpeg",
      link: "https://siddharam.com",
    },
    {
      name: "林上哲",
      title: "非資訊背景 AI生產力工具教育者，已幫助4200+ 台灣、日本和香港的學員",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%9E%97%E4%B8%8A%E5%93%B2_2.jpg-G5bK6x7qmVDbalRXX4a6EqVc8YVzW0.jpeg",
      link: "https://www.instagram.com/nuva.now/",
    },
    {
      name: "許詮",
      title: "前 TikTok 子公司總經理、前阿里巴巴子公司副總、XChange創辦人、33 歲退休旅居峇里島。",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%A8%B1%E8%A9%AE.jpg-itDEjBXa0hB8ICG282sBZU9QpyFY6P.jpeg",
      link: "https://www.facebook.com/SnT.life",
    },
    {
      name: "Shelley",
      title: "ADPList 2025 Top 50 Global Mentor，LinkedIn 個人品牌術，機會自己來敲門",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shelly.jpg-PyXkAhj2OxAkXAl9Sb17kH47TZpuFY.jpeg",
      link: "https://www.linkedin.com/in/yuhsuan-tien",
    },
    {
      name: "讀者太太",
      title: "英國職涯教練、「女力學院」《人脈力》講師，突破跨國遠距職涯天花板",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%AE%80%E8%80%85%E5%A4%AA%E5%A4%AA.jpg-S6PC1XhLu0mpPoDfHEZowxDfv77RmP.jpeg",
      link: "https://www.facebook.com/duzhetaitai",
    },
    {
      name: "Emilia",
      title: "高階跨國獵頭，獵頭揭密談薪技巧與職涯躍升策略",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Emilia.jpg-FpV0n9aFLdhY5GYrItCdLACYQsR1zU.jpeg",
      link: "https://www.linkedin.com/in/emchh/",
    },
    {
      name: "Joyce Weng",
      title: "過去為記者的她，跳脫傳統、成功於海外轉型遠全遠距工作，她將剖析如何規劃旅居財務、精打細算開銷！",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joyce.jpg-kKQwCgv6ckQRZXeM1TkEavpB1UxKSt.jpeg",
      link: "https://www.facebook.com/storiesinmyworld",
    },
    {
      name: "林佳 Zoe",
      title: "9萬粉絲自媒體創作者，專長於打造自媒體與 IG 流量，協助你產出具潛力的短影片與貼文！",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%AF%8F%E6%97%A5E%E9%8C%A0.jpg-uUoyWQD7LwmMBYTszPZiaMDwYYf7Cj.jpeg",
      link: "https://www.daydayding.com",
    },
    {
      name: "Angela Feng",
      title: "Ness Wellness 共同創辦人、創業投資管理者，遠距生活可持續的身心靈平衡",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Angela.jpg-AQCGKocPMUR7UrNaGtZQ1YUjKcSM2t.jpeg",
      link: "https://www.nesswellness.com/",
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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1200%20X%20630_%E5%8E%BB%E8%83%8C-Kdt9BA7d8dcS493DQ68ttHn9t2JUBl.png"
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
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20a3 3 0 01-3-3v-2a3 3 0 013-3m3-3a3 3 0 110-6 3 3 0 010 6m0 3a3 3 0 017.111 1.542M10 9a3 3 0 110-6 3 3 0 010 6zm7.111 1.542c.422.621.78 1.293 1.067 2M18 9v3m0 0v3m-3 0" />
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
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%95%B8%E4%BD%8D%E9%81%8A%E7%89%A7%E5%8F%B0%E7%81%A3%20Logo-CktjpYvle8tI4IOT03r29miCGKO58R.png"
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
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%88%90%E9%95%B7%E7%87%9FLogo.jpg-zuFCrnsLrBmoAlID64foDSlt4TNwYe.jpeg"
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
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%94%9F%E9%AE%AE%E6%99%82%E6%9B%B8%20Logo-tmulzAwGVPgRWnQAeoA9Jjr2CySR0G.png"
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

      {/* International Nomad Experts Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
              <span className="text-black">國際遊牧領袖趨勢分享</span>
            </h2>
            <div className="w-24 h-1 bg-[#FF6B35] mx-auto rounded-full"></div>
          </div>

          {/* International Experts */}
          <div className="space-y-8">
            {/* Expert 1 - Osera Ryo */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg relative">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ryo-bFyW4xHw7vYoeiko6q1imn47K4niyb.png"
                        alt="Osera Ryo"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                      {/* Japan Flag */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-4 bg-white rounded-sm flex items-center justify-center border">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-black mb-2">
                        Colive Fukuoka 共同創辦人、日本數位遊牧協會執行理事
                      </h3>
                      <p className="text-[#FF6B35] font-semibold text-lg">Osera Ryo</p>
                    </div>
                    <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                      <p>
                        畢業於筑波大學，曾任職於日本電通公司、擔任筑波市都市規劃顧問、受日本首相任命為社群行銷主管。2019年共同創立旅遊訂閱服務HafH，推動日本長期旅遊與遠距生活，自2020年起擔任日本Workcation協會顧問。
                      </p>
                      <p>
                        2022年創辦日本首間遊牧專注的行銷公司 yugyo
                        inc.，並於2023年成為金澤大學觀光前沿研究所副教授。長期致力於推動日本與國際間的遊牧交流與創新專案。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Expert 2 - Johannes Voelkner */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg relative">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joheness-Mh5hKrdSQ1eDHmVyf6cAHpZIJJ8nDP.png"
                        alt="Johannes Voelkner"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                      {/* German Flag */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-4 bg-black rounded-sm flex">
                        <div className="w-2 bg-black"></div>
                        <div className="w-2 bg-red-600"></div>
                        <div className="w-2 bg-yellow-400"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-black mb-2">
                        Nomad Cruise 創辦人 | 全球數位遊牧線下社群先驅
                      </h3>
                      <p className="text-[#FF6B35] font-semibold text-lg">Johannes Völkner</p>
                    </div>
                    <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                      <p>
                        他來自德國，2010年起展開數位遊牧生活並創立Global Digital Nomad Network，全球最大遊牧者社群之一。
                      </p>
                      <p>
                        2015年創辦Nomad
                        Cruise，結合郵輪旅遊與遠距工作社群，至今已舉辦十餘次跨國航程，吸引來自70多國、逾2,500名參與者。
                      </p>
                      <p>
                        疫情期間轉型推出Nomad
                        Base，持續打造全球線下聚會與據點網絡，並以「社群先於產品」的理念設計經典活動如失敗之夜（FuckUp
                        Nights），啟發全球遊牧者交流與成長。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Expert 3 - Harry Wang */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg relative">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Harry%20DigitalNomadsTaiwan-vPP7yxJAQWVuhzufbeHLJBvmbDzDqF.png"
                        alt="Harry Wang"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                      {/* Taiwan Flag */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                        <div className="w-3 h-2 bg-red-600 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-black mb-2">DigitalNomadsTaiwan 數位遊牧台灣創辦人 </h3>
                      <p className="text-[#FF6B35] font-semibold text-lg">Harry Wang</p>
                    </div>
                    <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                      <p>
                        2021年畢業於日本立命館亞洲太平洋大學國際經營學系，曾任AI保養品新創營運、跨國遠距人力資源公司商務開發，以及台越跨國專案PM等職務，於職涯早期透過遠距工作快速迭代經驗。
                      </p>
                      <p>
                        2024年創辦DigitalNomadsTaiwan，舉辦逾50場數位遊牧主題活動，累積超過1,200名線下參與者，參加者國籍數已超過70，其中近半來自口碑推薦。
                      </p>
                      <p>
                        作為推動台灣遊牧Movement的發起人，曾受邀於日本Colive Fukuoka、日本Okinawa Kozarocks、Asian Nomad
                        Alliance Summit、越南Nomad Fest等國際論壇擔任講者，分享台灣遊牧社群發展與跨國交流經驗。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8A65] rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">跟隨國際領袖腳步，開啟你的遊牧之路</h3>
            <p className="text-white/90 text-lg mb-6 leading-relaxed">學習頂尖遊牧領袖的實戰經驗，掌握全球趨勢與機會</p>
            <a
              href={getCheckoutURLWithTracking()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#FF6B35] font-bold text-lg rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => {
                if (typeof window !== "undefined" && window.trackInitiateCheckout) {
                  window.trackInitiateCheckout(0)
                }
              }}
            >
              立即加入，與領袖同行
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points Section - moved from later in the page */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              這些心聲，是否也曾在你心中響起？
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          {/* Pain Points Grid with Dialogue Bubbles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {[
              {
                question: "🌍 渴望跨國遠距工作，卻不知從何開始？",
                description:
                  "每天看著辦公室天花板，想著世界有多大。心動數位遊牧生活，卻擔心自己是否適合。其實，這是可以學習的技能。",
              },
              {
                question: "✈️ 想邊旅行邊工作，實現理想生活？",
                description:
                  "誰說工作與生活只能二選一？週四下班後出現在曼谷街上散心，是有機會實踐的生活方式。真正的 work-life balance 不是口號，需要透過時間與積累化為你的真實。",
              },
              {
                question: "💰 希望創造多元收入，卻苦無方向？",
                description: "存款數字停滯，夢想清單卻越來越長。你需要的不只是副業，而是打造可持續的遠距收入組合。",
              },
              {
                question: "📚 資訊爆炸，反而更迷茫？",
                description:
                  "Google了好幾晚筆記爆滿，卻還是不知道第一步該怎麼走。你不缺資訊，缺的是系統化的實戰指南與前線的趨勢。",
              },
              {
                question: "🚀 準備好改變，只差臨門一腳？",
                description:
                  "看了無數成功故事，理論也都懂，但行動力始終是零。你需要的不是更多資訊，而是清晰的路徑和跨出第一步的勇氣與戰友。",
              },
            ].map((painPoint, index) => (
              <div key={index} className="relative">
                {/* Dialogue Bubble */}
                <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-lg border border-border relative">
                  {/* Speech Bubble Tail */}
                  <div className="absolute -bottom-3 left-8 w-6 h-6 bg-card border-r border-b border-border transform rotate-45"></div>

                  {/* Question */}
                  <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-4 leading-tight">
                    {painPoint.question}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">{painPoint.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Encouraging Message */}
          <div className="text-center bg-card rounded-2xl p-8 sm:p-12 shadow-lg border border-border">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-6">我們都懂。</h3>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 leading-relaxed">
                因為我們也曾在同樣的十字路口徘徊。
              </p>
              {/* 手機版文案 */}
              <p className="block sm:hidden text-xl font-bold text-accent">
                現在的我們相信
                <br />
                自由值得有更多選擇
              </p>

              {/* 電腦版文案 */}
              <p className="hidden sm:block text-2xl font-bold text-accent">現在的我們相信，自由值得有更多選擇。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Five-Stage Learning Map */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">五階段學習地圖</h2>
            <div className="w-24 h-1 bg-[#FF6B35] mx-auto rounded-full"></div>
          </div>

          {/* Learning Path Timeline */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Stage 1 */}
            <div className="relative">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-white p-6 sm:p-8 border-l-4 border-[#FF6B35]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold">
                          1
                        </div>
                        <h3 className="text-xl font-bold text-black">第一階段</h3>
                      </div>
                      <p className="text-[#FF6B35] font-semibold">10-12月 線上技能學習</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {stagePhotos[0].map((photo, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={photo.src || "/placeholder.svg"}
                            alt={photo.alt}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openGallery(0, index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-black mb-2">10月 - 啟動月</h4>
                      <p className="text-sm text-gray-600 mb-2">「建立基礎，看見可能」</p>
                      <p className="text-sm text-gray-600">從0啟動個人品牌與副業</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-black mb-2">11月 - 提升月</h4>
                      <p className="text-sm text-gray-600 mb-2">「專業化與國際化」</p>
                      <p className="text-sm text-gray-600">提升職場競爭力，開啟國際遠距與高薪機會</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-black mb-2">12月 - 平衡月</h4>
                      <p className="text-sm text-gray-600 mb-2">「覺察與系統性規劃」</p>
                      <p className="text-sm text-gray-600">整合所學，強化業外知識、人生規劃</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stage 2 */}
            <div className="relative">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-white p-6 sm:p-8 border-l-4 border-[#FF6B35]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold">
                          2
                        </div>
                        <h3 className="text-xl font-bold text-black">第二階段</h3>
                      </div>
                      <p className="text-[#FF6B35] font-semibold">遊牧者社群交流、啟發、共創</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {stagePhotos[1].map((photo, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={photo.src || "/placeholder.svg"}
                            alt={photo.alt}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openGallery(1, index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      參加每月數位遊牧社群活動，與來自不同背景、不同專業的世界遊牧者或同儕交流
                      經驗、成長的最新資訊，加入共創專案、積累經驗人脈，一起實踐自由工作人生、遠距旅居夢
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stage 3 */}
            <div className="relative">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-white p-6 sm:p-8 border-l-4 border-[#FF6B35]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold">
                          3
                        </div>
                        <h3 className="text-xl font-bold text-black">第三階段</h3>
                      </div>
                      <p className="text-[#FF6B35] font-semibold">2026年1-7月遊牧線下啟發之旅</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {stagePhotos[2].map((photo, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={photo.src || "/placeholder.svg"}
                            alt={photo.alt}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openGallery(2, index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      數位遊牧講師帶隊前往清邁、峇里島、福岡、恆春等地，遊牧工作的同時，交流、學習、運動、社交等，實際感受數位遊牧工作者的標準生活，並從中覺察自己的心之所向，
                      找到動能加速啟動夢想。
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stage 4 */}
            <div className="relative">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-white p-6 sm:p-8 border-l-4 border-[#FF6B35]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold">
                          4
                        </div>
                        <h3 className="text-xl font-bold text-black">第四階段</h3>
                      </div>
                      <p className="text-[#FF6B35] font-semibold">2026年1-7月 復盤&衝刺WORKSHOP</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {stagePhotos[3].map((photo, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={photo.src || "/placeholder.svg"}
                            alt={photo.alt}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openGallery(3, index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">線上工作坊、與同儕一起精進自我、復盤、持續學習。</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stage 5 */}
            <div className="relative">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-white p-6 sm:p-8 border-l-4 border-[#FF6B35]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-.181h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold">
                          5
                        </div>
                        <h3 className="text-xl font-bold text-black">第五階段</h3>
                      </div>
                      <p className="text-[#FF6B35] font-semibold">成為社群內的遊牧之星</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {stagePhotos[4].map((photo, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={photo.src || "/placeholder.svg"}
                            alt={photo.alt}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openGallery(4, index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      數位遊牧者的成功，往往來源於「執行力」，我們提供獎勵機制、鼓勵大家學習中實踐
                      <br className="sm:hidden" />
                      ，優秀學員將有機會獲得：未來課程折扣、助教資格、遊牧之旅招待名額、以及與導師共享舞台的機會。
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-gray-300"
            >
              ✕
            </button>

            {/* Main Image */}
            <div className="relative">
              <img
                src={stagePhotos[currentStage][currentPhotoIndex].src || "/placeholder.svg"}
                alt={stagePhotos[currentStage][currentPhotoIndex].alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />

              {/* Navigation Buttons */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
              >
                ←
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
              >
                →
              </button>
            </div>

            {/* Photo Counter */}
            <div className="text-center text-white mt-4">
              <p className="text-lg font-semibold">第{currentStage + 1}階段</p>
              <p className="text-sm">
                {currentPhotoIndex + 1} / {stagePhotos[currentStage].length}
              </p>
              <p className="text-sm mt-2">{stagePhotos[currentStage][currentPhotoIndex].alt}</p>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-2 mt-4">
              {stagePhotos[currentStage].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-3 h-3 rounded-full ${index === currentPhotoIndex ? "bg-[#FF6B35]" : "bg-gray-400"}`}
                />
              ))}
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
                    <div className="text-[#FF6B35] font-bold text-lg">9月1日-9月8日</div>
                    <div className="text-sm">盲鳥預購優惠</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 6,999</div>
                </div>
              </div>

              <div className="bg-gray-800 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-200 font-bold text-lg">9月9日-9月15日</div>
                    <div className="text-sm">早鳥預購優惠</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 7,499</div>
                </div>
              </div>

              <div className="bg-gray-700 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-200 font-bold text-lg">9月16日-9月22日</div>
                    <div className="text-sm">晚鳥預購價</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 7,999</div>
                </div>
              </div>

              <div className="bg-gray-600 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-100 font-bold text-lg">9月23日-9月30日</div>
                    <div className="text-sm">開學前最後預購</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 8,999</div>
                </div>
              </div>

              <div className="bg-gray-500 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-800 font-bold text-lg">10月1日-10月13日</div>
                    <div className="text-sm">剛開學後悔價</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 9,999</div>
                </div>
              </div>

              <div className="bg-gray-400 text-gray-900 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-900 font-bold text-lg">10月14日-10月27日</div>
                    <div className="text-sm">課程中加入相見恨晚</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 11,500</div>
                </div>
              </div>

              <div className="bg-gray-300 text-gray-900 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-orange-900 font-bold text-lg">10月28日-11月30日</div>
                    <div className="text-sm">晚還是必須加入</div>
                  </div>
                  <div className="text-3xl font-bold">TWD 12,500</div>
                </div>
              </div>

              <div className="bg-gray-200 text-gray-900 rounded-2xl p-6 shadow-sm">
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
