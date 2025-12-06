"use client"

import { useRef } from "react"
import Image from "next/image"
import Script from "next/script"
import { HeroSection } from "@/components/sections/hero-section"
import { FAQSection } from "@/components/sections/faq-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { AnnouncementBar } from "@/components/announcement-bar"
import { StickyBottomBar } from "@/components/sticky-bottom-bar"
import { usePricing } from "@/contexts/pricing-context"

export default function HomePage() {
  const pricingSectionRef = useRef<HTMLDivElement>(null)
  const { currentStageData } = usePricing()

  const scrollToPricing = () => {
    pricingSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-[#F5F3ED]">
      {/* Meta Pixel Code */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <Image
          height={1}
          width={1}
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}
      </Script>

      {/* Desktop Announcement Bar */}
      <AnnouncementBar scrollToPricing={scrollToPricing} />

      {/* Hero Section */}
      <HeroSection />

      {/* Section 2: 正在尋找「下一步」的你 */}
      <section className="py-16 sm:py-24 bg-[#17464F] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              正在尋找「<span className="text-[#D4B483]">下一步</span>」的你
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              不管你現在在哪個階段，你都有機會在這裡找到開始的位置。
              <br />
              你不一定已經想好要不要辭職、要不要成為全職 Nomad。但你心裡大概知道——
              <br />
              接下來的人生，應該不只有「每天通勤、等著放假」這一種選項。
            </p>
          </div>

          <p className="text-center text-[#D4B483] text-lg sm:text-xl mb-10">
            在這裡，你可能會在這幾種狀態裡，看到自己的影子：
          </p>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-[#D4B483]/30 rounded-2xl p-6 relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4B483] rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4B483] rounded-br-2xl" />
              <div className="flex justify-center mb-6">
                <svg
                  className="w-16 h-16 text-[#D4B483]"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="32" cy="32" r="20" />
                  <path d="M32 12 L32 32 L44 44" strokeLinecap="round" />
                  <circle cx="32" cy="8" r="3" fill="currentColor" />
                  <text x="20" y="8" fontSize="8" fill="currentColor">
                    ?
                  </text>
                  <text x="44" y="8" fontSize="8" fill="currentColor">
                    ?
                  </text>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#D4B483] text-center mb-4">想要更有選擇權的職涯主線</h3>
              <p className="text-white/70 text-sm leading-relaxed text-center">
                有穩定工作、不一定討厭現在公司，但看得到天花板；正在思考能否換到更彈性、可遠距的團隊，或讓履歷在未來更有選擇。
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-[#D4B483]/30 rounded-2xl p-6 relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4B483] rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4B483] rounded-br-2xl" />
              <div className="flex justify-center mb-6">
                <svg
                  className="w-16 h-16 text-[#D4B483]"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="8" y="40" width="12" height="8" rx="1" />
                  <rect x="26" y="32" width="12" height="16" rx="1" />
                  <rect x="44" y="24" width="12" height="24" rx="1" />
                  <path d="M14 36 L32 28 L50 20" strokeLinecap="round" />
                  <polygon points="50,16 54,22 48,22" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#D4B483] text-center mb-4">想多一條安全感，不想只靠一份薪水</h3>
              <p className="text-white/70 text-sm leading-relaxed text-center">
                想用內容、接案、知識服務慢慢累積第二條收入線；希望在不壓垮自己的前提下，踏出有感的一步，而不是一次
                all-in。
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-[#D4B483]/30 rounded-2xl p-6 relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4B483] rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4B483] rounded-br-2xl" />
              <div className="flex justify-center mb-6">
                <svg
                  className="w-16 h-16 text-[#D4B483]"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="12" y="16" width="40" height="32" rx="2" />
                  <circle cx="32" cy="32" r="4" />
                  <path d="M28 32 L20 40" strokeLinecap="round" />
                  <circle cx="48" cy="20" r="6" />
                  <circle cx="48" cy="20" r="2" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#D4B483] text-center mb-4">答案還不確定，但不想再只是想想</h3>
              <p className="text-white/70 text-sm leading-relaxed text-center">
                現在的路看起來還行，但常被旅居、遠距、遊牧故事勾起一點遺憾；想在未來六個月裡，用比較踏實的方法去體驗、去嘗試，而不是只滑過別人的人生。
              </p>
            </div>
          </div>

          {/* Three dots divider */}
          <div className="flex justify-center gap-2 mb-10">
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            <span className="w-2 h-2 rounded-full bg-white/50" />
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
          </div>

          {/* Bottom Quote */}
          <div className="text-center">
            <p className="text-white/70 text-base mb-4">
              不需要完美符合其中一個分類，很多學員一開始也是「幾種狀態混在一起」，只是共同都有一個念頭：
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-[#D4B483]">
              「我想給自己一段時間，認真對待我真正想要的生活。」
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: 不是你不努力，而是拼圖還有缺 - SVG 切圖 */}
      <section className="bg-[#17464F]">
        <div className="max-w-[1920px] mx-auto">
          <Image
            src="/images/section3-painpoints-desktop.svg"
            alt="不是你不努力，而是拼圖還有缺 - 方向斷裂、方法斷裂、同伴斷裂"
            width={1920}
            height={1234}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </section>

      {/* Section 4: 三大亮點 */}
      <section id="course-highlights" className="py-16 sm:py-24 bg-[#F5F3ED]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-4">
              三大亮點，讓改變真的走起來
            </h2>
            <div className="flex justify-center gap-2 mt-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
              <span className="w-2 h-2 rounded-full bg-[#17464F]" />
              <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Highlight 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#C9D7D4]/50">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-[#17464F] mb-2">雙軌資源</h3>
                <p className="text-[#D4B483] text-sm mb-4">副業增收 × 遠端上班</p>
              </div>
              <p className="text-[#33393C] text-sm leading-relaxed hidden md:block">
                自媒體接案線路協助你定位、製作接案作品集、市場調查、內容與流量；
                遠端上班線路幫你了解遠端求職市場、獵頭關係、優化履歷、LinkedIn、求職信、面試準備。
                你可以先選一條為主，也可以雙線並進，邊學邊試水溫。
              </p>
              <button className="md:hidden w-full text-center text-[#17464F] text-sm underline mt-2">了解更多 →</button>
            </div>

            {/* Highlight 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#C9D7D4]/50">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-[#17464F] mb-2">行動導向設計</h3>
                <p className="text-[#D4B483] text-sm mb-4">課後任務 × 實作工作坊</p>
              </div>
              <p className="text-[#33393C] text-sm leading-relaxed hidden md:block">
                每一堂課後，都有做得到、但有一點挑戰的行動任務：
                在發出一支影片貼文、進行市場調查、寫一封求職信、更新履歷、製作一個知識產品之前...
                會被先拆解成策略定位學習單等模板。 還有實作工作坊，講師陪同把想法落地成操作與行動。
                你不用在繁忙的生活中還要自己猜下一步，只要跟著課後任務走就好。
              </p>
              <button className="md:hidden w-full text-center text-[#17464F] text-sm underline mt-2">了解更多 →</button>
            </div>

            {/* Highlight 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#C9D7D4]/50">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-[#17464F] mb-2">共學社群</h3>
                <p className="text-[#D4B483] text-sm mb-4">Skool 社群 × 月復盤工作坊</p>
              </div>
              <p className="text-[#33393C] text-sm leading-relaxed hidden md:block">
                加入 Skool 共學社群，和同期學員一起討論、互相回饋、彼此打氣。
                每個月都有復盤工作坊，讓你定期檢視進度、調整方向。 不再是一個人悶著頭學，而是有一群人陪你一起走。
              </p>
              <button className="md:hidden w-full text-center text-[#17464F] text-sm underline mt-2">了解更多 →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div ref={pricingSectionRef}>
        <PricingSection />
      </div>

      {/* FAQ Section */}
      <FAQSection />

      {/* Mobile Sticky Bottom Bar */}
      <StickyBottomBar />
    </main>
  )
}
