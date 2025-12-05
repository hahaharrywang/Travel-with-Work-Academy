"use client"
import { useState, useRef } from "react"
import Image from "next/image"
import { TrendingUp, FileText, Users, ChevronDown } from "lucide-react"
import { usePricing, formatPrice } from "@/contexts/pricing-context"
import { AnnouncementBar } from "@/components/announcement-bar"
import { StickyBottomBar } from "@/components/sticky-bottom-bar"
import { PricingSection } from "@/components/sections/pricing-section"
import { FAQSection } from "@/components/sections/faq-section"

// Instructor data
const instructors = [
  { id: "zoey", name: "Zoey", role: "品牌策略", image: "/professional-asian-female-brand-strategist.png" },
  { id: "dean", name: "Dean", role: "遠端工作", image: "/asian-tech-entrepreneur.png" },
  { id: "karen", name: "Karen", role: "職涯教練", image: "/asian-female-career-coach.png" },
  { id: "wei", name: "Wei", role: "自媒體經營", image: "/young-asian-executive.png" },
  { id: "amber", name: "Amber", role: "內容行銷", image: "/professional-female-mentor.png" },
  { id: "jason", name: "Jason", role: "財務規劃", image: "/asian-male-financial-advisor.png" },
]

// Course weeks data
const courseWeeks = [
  { week: 1, title: "遠距職涯藍圖", instructor: "zoey", description: "建立你的遠距工作願景與目標設定" },
  { week: 2, title: "個人品牌定位", instructor: "wei", description: "找到你的獨特價值主張" },
  { week: 3, title: "LinkedIn 優化", instructor: "dean", description: "打造國際化的專業形象" },
  { week: 4, title: "履歷與作品集", instructor: "karen", description: "展示你的專業能力" },
  { week: 5, title: "內容創作入門", instructor: "amber", description: "開始你的自媒體之旅" },
  { week: 6, title: "接案與報價", instructor: "jason", description: "建立穩定的收入來源" },
]

export default function HomePage() {
  const { currentStageData, lowestPrice, getCheckoutURLWithTracking } = usePricing()
  const pricingRef = useRef<HTMLDivElement>(null)
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
  const [highlightPopup, setHighlightPopup] = useState<{
    isOpen: boolean
    title: string
    subtitle: string
    content: string
  }>({ isOpen: false, title: "", subtitle: "", content: "" })

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  if (!currentStageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#17464F]">
        <div className="text-white text-xl">載入中...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      {/* Announcement Bar */}
      <AnnouncementBar scrollToPricing={scrollToPricing} />

      {/* SECTION 1: HERO */}
      <section className="relative bg-[#17464F] text-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full border border-[#E8C547]/20" />
          <div className="absolute top-40 left-20 w-96 h-96 rounded-full border border-[#E8C547]/10" />
          <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full border border-[#E8C547]/15" />
          {/* Gold particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#E8C547]/60"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 30}%`,
                animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              {/* Logo with flight path */}
              <div className="relative mb-8">
                <Image
                  src="/images/academy-logo.png"
                  alt="遠距遊牧學院"
                  width={280}
                  height={80}
                  className="w-[200px] sm:w-[240px] lg:w-[280px] h-auto mx-auto lg:mx-0 brightness-0 invert"
                  priority
                />
                {/* Flight path decoration */}
                <svg
                  className="absolute -bottom-4 left-0 w-32 h-8 text-[#D4B483]/40 hidden lg:block"
                  viewBox="0 0 100 20"
                >
                  <path
                    d="M0 10 Q 25 0, 50 10 T 100 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                  />
                </svg>
              </div>

              {/* Subtitle */}
              <p className="text-[#D4B483] text-sm sm:text-base mb-4">華語世界第一個以「行動」設計的遠距遊牧學院</p>

              {/* Main title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                用六個月，
                <br />
                把「也許有一天」變成「<span className="text-[#D4B483]">我正在路上</span>」
              </h1>

              {/* Description */}
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                遠距遊牧學院結合線上課程、行動任務、共學社群與旅居體驗，幫助已經準備行動的上班族，在不辭職、不斷線收入的前提下，驗證自己適合的遠距路線：遠端上班、自媒體接案，或雙線並行。
              </p>

              {/* Route tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                <span className="px-4 py-2 border border-white/30 rounded-full text-sm">自媒體接案線路</span>
                <span className="px-4 py-2 border border-white/30 rounded-full text-sm">遠端上班線路</span>
                <span className="px-4 py-2 border border-white/30 rounded-full text-sm">雙線整合線路</span>
              </div>

              {/* Feature list with icons */}
              <div className="space-y-3 mb-8 text-left max-w-md mx-auto lg:mx-0">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#D4B483] flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">梳理你的遠距職涯藍圖與下一步行動</span>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#D4B483] flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">完成履歷、作品集、個人頁面等可見成果</span>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#D4B483] flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">加入一群真的在為自由生活行動的夥伴</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <a
                  href={getCheckoutURLWithTracking()}
                  className="inline-block bg-[#E8C547] text-[#17464F] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#D4B483] transition-all duration-300 shadow-lg"
                >
                  我要加入這一梯學員
                </a>
                <p className="text-white/60 text-sm">
                  還在觀望？
                  <button onClick={scrollToPricing} className="text-[#D4B483] hover:underline ml-1">
                    先看六個月怎麼走 ↓
                  </button>
                </p>
              </div>

              {/* Social proof */}
              <p className="mt-8 text-white/50 text-sm">
                2024-2025 已累積 400+ 付費學員與 1,000+ 社群成員，一起在台灣與世界各地行動中。
              </p>
            </div>

            {/* Right image - Desktop only */}
            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Double gold frame */}
                <div className="absolute -inset-4 rounded-2xl border-2 border-[#E8C547]/30" />
                <div className="absolute -inset-8 rounded-3xl border border-[#E8C547]/20" />
                <Image
                  src="/images/hero-background.png"
                  alt="遠距遊牧學院學員"
                  width={600}
                  height={400}
                  className="rounded-xl object-cover w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Target Audience */}
      <section className="py-16 sm:py-24 bg-[#17464F] text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full border border-[#E8C547]/10" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full border border-[#E8C547]/15" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              正在尋找「<span className="text-[#D4B483]">下一步</span>」的你
            </h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
              不管你現在在哪個階段，你都有機會在這裡找到開始的位置。你不一定已經想好要不要辭職、要不要成為全職
              Nomad。但你心裡大概知道——接下來的人生，應該不只有「每天通勤、等著放假」這一種選項。
            </p>
            <p className="text-[#D4B483] mt-6">在這裡，你可能會在這幾種狀態裡，看到自己的影子：</p>
          </div>

          {/* Three cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[#E8C547]/20 relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E8C547]/40 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E8C547]/40 rounded-br-xl" />
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-[#D4B483]"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="32" cy="32" r="24" />
                  <circle cx="32" cy="32" r="4" fill="currentColor" />
                  <path d="M32 12 L32 20" />
                  <path d="M32 44 L32 52" />
                  <path d="M12 32 L20 32" />
                  <path d="M44 32 L52 32" />
                  <path d="M32 32 L42 22" strokeWidth="2" />
                </svg>
                <h3 className="text-[#D4B483] text-xl font-bold mb-3">想要更有選擇權的職涯主線</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  有穩定工作、不一定討厭現在公司，但看得到天花板；正在思考能否換到更彈性、可遠距的團隊，或讓履歷在未來更有選擇。
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[#E8C547]/20 relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E8C547]/40 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E8C547]/40 rounded-br-xl" />
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-[#D4B483]"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <ellipse cx="32" cy="48" rx="8" ry="4" fill="currentColor" opacity="0.3" />
                  <ellipse cx="32" cy="40" rx="10" ry="5" fill="currentColor" opacity="0.5" />
                  <ellipse cx="32" cy="32" rx="12" ry="6" fill="currentColor" opacity="0.7" />
                  <path d="M32 14 L32 8 M28 12 L32 8 L36 12" strokeWidth="2" />
                </svg>
                <h3 className="text-[#D4B483] text-xl font-bold mb-3">想多一條安全感，不想只靠一份薪水</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  想用內容、接案、知識服務慢慢累積第二條收入線；希望在不壓垮自己的前提下，踏出有感的一步，而不是一次
                  all-in。
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[#E8C547]/20 relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E8C547]/40 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E8C547]/40 rounded-br-xl" />
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-[#D4B483]"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="12" y="16" width="40" height="32" rx="2" />
                  <path d="M12 24 L52 24" />
                  <path d="M20 32 L32 32" />
                  <path d="M20 40 L28 40" />
                  <circle cx="44" cy="36" r="6" fill="currentColor" />
                  <path d="M44 33 L44 36 L46 38" strokeWidth="1" stroke="#17464F" />
                </svg>
                <h3 className="text-[#D4B483] text-xl font-bold mb-3">答案還不確定，但不想再只是想想</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  現在的路看起來還行，但常被旅居、遠距、遊牧故事勾起一點遺憾；想在未來六個月裡，用比較踏實的方法去體驗、去嘗試，而不是只滑過別人的人生。
                </p>
              </div>
            </div>
          </div>

          {/* Three dots */}
          <div className="flex justify-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            <span className="w-2 h-2 rounded-full bg-[#17464F] border border-[#D4B483]" />
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
          </div>

          {/* Bottom quote */}
          <div className="text-center">
            <p className="text-white/70 mb-4">
              不需要完美符合其中一個分類，很多學員一開始也是「幾種狀態混在一起」，只是共同都有一個念頭：
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-[#D4B483]">
              「我想給自己一段時間，認真對待我真正想要的生活。」
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Pain Points */}
      <section className="py-16 sm:py-24 bg-[#17464F] text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              不是你不努力，而是<span className="text-[#D4B483]">拼圖還有缺</span>
            </h2>
          </div>

          {/* Pain points - Mobile: stacked, Desktop: flow layout */}
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Pain point 1 */}
            <div className="text-center lg:text-left">
              <svg
                className="w-20 h-20 mx-auto lg:mx-0 mb-4 text-[#D4B483]"
                viewBox="0 0 80 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="40" cy="40" r="28" />
                <circle cx="40" cy="40" r="6" fill="currentColor" />
                <path d="M40 16 L40 24" />
                <path d="M40 56 L40 64" />
                <path d="M16 40 L24 40" />
                <path d="M56 40 L64 40" />
                <path d="M40 40 L52 28" strokeWidth="2" />
                <text x="58" y="20" fontSize="12" fill="currentColor">
                  ?
                </text>
              </svg>
              <h3 className="text-[#D4B483] text-xl font-bold mb-3">方向斷裂</h3>
              <p className="text-white/70 leading-relaxed">
                你是不是也想過很多種版本：有時想去外商、有時想接案當
                freelancer，但每次看到別人的故事就改變主意，到最後，反而哪一條都沒真的走下去。
              </p>
            </div>

            {/* Pain point 2 */}
            <div className="text-center lg:text-left">
              <svg
                className="w-20 h-20 mx-auto lg:mx-0 mb-4 text-[#D4B483]"
                viewBox="0 0 80 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="10" y="20" width="25" height="40" rx="2" />
                <path d="M15 30 L30 30" />
                <path d="M15 38 L30 38" />
                <path d="M15 46 L25 46" />
                <path d="M45 15 L70 15 L70 50 L45 50 Z" />
                <path d="M50 25 L65 25" />
                <path d="M50 33 L65 33" />
                <path d="M55 50 L55 65 L70 65" strokeWidth="2" />
                <path d="M62 58 L70 65 L62 72" strokeWidth="2" />
              </svg>
              <h3 className="text-[#D4B483] text-xl font-bold mb-3">方法斷裂</h3>
              <p className="text-white/70 leading-relaxed">
                你也不是沒學東西：買課、看影片、存下很多筆記，真正卡住的是——「那我今天到底要做哪一個小步驟？」所以日子一忙，又回到原本的節奏。
              </p>
            </div>

            {/* Pain point 3 */}
            <div className="text-center lg:text-left">
              <svg
                className="w-20 h-20 mx-auto lg:mx-0 mb-4 text-[#D4B483]"
                viewBox="0 0 80 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="25" cy="30" r="8" />
                <path d="M25 38 L25 55" strokeWidth="3" />
                <path d="M18 45 L32 45" strokeWidth="3" />
                <rect x="45" y="20" width="20" height="35" rx="1" />
                <path d="M50 25 L60 25" />
                <path d="M38 37 L45 37" strokeDasharray="2 2" />
              </svg>
              <h3 className="text-[#D4B483] text-xl font-bold mb-3">同伴斷裂</h3>
              <p className="text-white/70 leading-relaxed">
                身邊的人大多走很標準的路，你很難跟他們分享「我其實想過不一樣的生活」。不知道可以跟誰討論、問誰意見，久了就習慣把這些想法藏在心裡。
              </p>
            </div>
          </div>

          {/* Conclusion box */}
          <div className="mt-16 text-center">
            <div className="inline-block border-2 border-[#D4B483]/50 rounded-xl px-8 py-6 bg-[#17464F]/50 backdrop-blur-sm">
              <p className="text-white text-lg leading-relaxed">
                你缺的不是更多資訊，而是一個地方，
                <br />
                讓你在未來六個月裡，有人陪你一起試、一起走、一起調整方向。
              </p>
            </div>
            <div className="mt-6">
              <ChevronDown className="w-8 h-8 text-[#D4B483] mx-auto animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Three Highlights */}
      <section className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
              <span className="w-2 h-2 rounded-full bg-[#17464F]" />
              <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#17464F]">三大亮點，讓改變真的走起來</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Highlight 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#C9D7D4]">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#17464F] mb-2">雙軌資源</h3>
                <p className="text-[#D4B483] text-sm mb-4">副業增收 × 遠端上班</p>
                <p className="text-[#33393C]/80 text-sm leading-relaxed hidden md:block">
                  自媒體接案線路協助你定位、製作接案作品集、市場調查、內容與流量；遠端上班線路幫你了解遠端求職市場、獵頭關係、優化履歷、LinkedIn、求職信、面試準備。你可以先選一條為主，也可以雙線並進，邊學邊試水溫。
                </p>
                <button
                  className="md:hidden text-[#17464F] text-sm underline"
                  onClick={() =>
                    setHighlightPopup({
                      isOpen: true,
                      title: "雙軌資源",
                      subtitle: "副業增收 × 遠端上班",
                      content:
                        "自媒體接案線路協助你定位、製作接案作品集、市場調查、內容與流量；遠端上班線路幫你了解遠端求職市場、獵頭關係、優化履歷、LinkedIn、求職信、面試準備。你可以先選一條為主，也可以雙線並進，邊學邊試水溫。",
                    })
                  }
                >
                  了解更多 →
                </button>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#C9D7D4]">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#17464F] mb-2">行動導向設計</h3>
                <p className="text-[#D4B483] text-sm mb-4">課後任務 × 實作工作坊</p>
                <p className="text-[#33393C]/80 text-sm leading-relaxed hidden md:block">
                  每一堂課後，都有做得到、但有一點挑戰的行動任務：在發出一支影片貼文、進行市場調查、寫一封求職信、更新履歷、製作一個知識產品之前...會被先拆解成策略定位學習單等模板。還有實作工作坊，講師陪同把想法落地成操作與行動。
                </p>
                <button
                  className="md:hidden text-[#17464F] text-sm underline"
                  onClick={() =>
                    setHighlightPopup({
                      isOpen: true,
                      title: "行動導向設計",
                      subtitle: "課後任務 × 實作工作坊",
                      content:
                        "每一堂課後，都有做得到、但有一點挑戰的行動任務：在發出一支影片貼文、進行市場調查、寫一封求職信、更新履歷、製作一個知識產品之前...會被先拆解成策略定位學習單等模板。還有實作工作坊，講師陪同把想法落地成操作與行動。",
                    })
                  }
                >
                  了解更多 →
                </button>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#C9D7D4]">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#17464F] mb-2">共學社群</h3>
                <p className="text-[#D4B483] text-sm mb-4">Skool 平台 × 六個月陪伴</p>
                <p className="text-[#33393C]/80 text-sm leading-relaxed hidden md:block">
                  你不會一個人走這條路。加入 Skool
                  共學社群，和同期夥伴一起完成任務、互相回饋、分享進度。每月還有線上聚會和復盤工作坊，讓你持續保持動力，不會學完就忘。
                </p>
                <button
                  className="md:hidden text-[#17464F] text-sm underline"
                  onClick={() =>
                    setHighlightPopup({
                      isOpen: true,
                      title: "共學社群",
                      subtitle: "Skool 平台 × 六個月陪伴",
                      content:
                        "你不會一個人走這條路。加入 Skool 共學社群，和同期夥伴一起完成任務、互相回饋、分享進度。每月還有線上聚會和復盤工作坊，讓你持續保持動力，不會學完就忘。",
                    })
                  }
                >
                  了解更多 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Popup Modal */}
      {highlightPopup.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setHighlightPopup({ ...highlightPopup, isOpen: false })}
        >
          <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-[#17464F] mb-2">{highlightPopup.title}</h3>
            <p className="text-[#D4B483] text-sm mb-4">{highlightPopup.subtitle}</p>
            <p className="text-[#33393C]/80 text-sm leading-relaxed mb-6">{highlightPopup.content}</p>
            <button
              className="w-full bg-[#17464F] text-white py-3 rounded-lg font-medium"
              onClick={() => setHighlightPopup({ ...highlightPopup, isOpen: false })}
            >
              關閉
            </button>
          </div>
        </div>
      )}

      {/* SECTION 5: Course Map */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
              <span className="w-2 h-2 rounded-full bg-[#17464F]" />
              <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#17464F] mb-4">六個月課程地圖</h2>
            <p className="text-[#33393C]/80 text-lg">3+3 的行動節奏，讓你穩穩走完這段旅程</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseWeeks.map((week) => {
              const instructor = instructors.find((i) => i.id === week.instructor)
              return (
                <button
                  key={week.week}
                  className="bg-[#F5F3ED] rounded-xl p-4 text-left hover:shadow-md transition-shadow border border-[#C9D7D4]"
                  onClick={() => setSelectedWeek(week.week)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#D4B483] font-bold">W{week.week}</span>
                    <span className="text-[#17464F] font-medium">{week.title}</span>
                  </div>
                  {instructor && (
                    <div className="flex items-center gap-2 text-sm text-[#33393C]/60">
                      <Image
                        src={instructor.image || "/placeholder.svg"}
                        alt={instructor.name}
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                        loading="lazy"
                      />
                      <span>{instructor.name}</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Week Detail Modal */}
      {selectedWeek && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSelectedWeek(null)}
        >
          <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const week = courseWeeks.find((w) => w.week === selectedWeek)
              const instructor = week ? instructors.find((i) => i.id === week.instructor) : null
              if (!week) return null
              return (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#D4B483] text-white px-3 py-1 rounded-full text-sm font-bold">
                      第 {week.week} 週
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#17464F] mb-2">{week.title}</h3>
                  <p className="text-[#33393C]/80 mb-4">{week.description}</p>
                  {instructor && (
                    <div className="flex items-center gap-3 p-3 bg-[#F5F3ED] rounded-lg">
                      <Image
                        src={instructor.image || "/placeholder.svg"}
                        alt={instructor.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-[#17464F]">{instructor.name}</p>
                        <p className="text-sm text-[#33393C]/60">{instructor.role}</p>
                      </div>
                    </div>
                  )}
                  <button
                    className="w-full mt-6 bg-[#17464F] text-white py-3 rounded-lg font-medium"
                    onClick={() => setSelectedWeek(null)}
                  >
                    關閉
                  </button>
                </>
              )
            })()}
          </div>
        </div>
      )}

      {/* SECTION 6: Pricing */}
      <div ref={pricingRef} id="pricing">
        <PricingSection />
      </div>

      {/* SECTION 7: FAQ */}
      <div id="faq">
        <FAQSection />
      </div>

      {/* SECTION 8: Final CTA */}
      <section className="py-16 sm:py-24 bg-[#17464F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            準備好開始你的<span className="text-[#D4B483]">遠距旅程</span>了嗎？
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            這不是一張離職門票，
            <span className="block md:inline">而是一段可以在保有現職下完成的六個月行動旅程。</span>
          </p>
          <a
            href={getCheckoutURLWithTracking()}
            className="inline-block bg-[#E8C547] text-[#17464F] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#D4B483] transition-all duration-300 shadow-lg"
          >
            立刻鎖定【{currentStageData.name} NT${formatPrice(lowestPrice)}起】
          </a>
          <p className="mt-6 text-white/50 text-sm">
            {currentStageData.discountLabel} 優惠即將結束，把握機會加入這一梯！
          </p>
        </div>
      </section>

      {/* Sticky Bottom Bar - Mobile */}
      <StickyBottomBar scrollToPricing={scrollToPricing} />
    </main>
  )
}
