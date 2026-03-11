"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePricing, formatPrice, getSingleLinePrice } from "@/contexts/pricing-context"

export function HeroSection() {
  const { currentStageData, timeLeft, getCheckoutURLWithTracking } = usePricing()

  const singleLinePrice = currentStageData ? getSingleLinePrice(currentStageData) : 0

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#F5F3ED] via-white to-[#C9D7D4]/30 overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#D4B483]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#17464F]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left space-y-6 sm:space-y-8">
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
              用五個月，
              <span className="block mt-2 text-[#D4B483]">把「也許有一天」變成「我正在路上」</span>
            </h1>

            <p className="text-base sm:text-lg text-[#33393C] leading-relaxed max-w-xl mx-auto lg:mx-0">
              不用先辭職，也不用一下子 all-in。 透過 5
              個月的遠距職涯探索旅途，結合線上課程、行動任務、共學社群與遊牧體驗資源，開啟探索最適合你生活與成長。
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
              <span className="px-4 py-2 rounded-full bg-[#17464F] text-white text-sm font-medium">接案線路</span>
              <span className="px-4 py-2 rounded-full bg-[#17464F] text-white text-sm font-medium">遠端上班線路</span>
              <span className="px-4 py-2 rounded-full bg-[#D4B483] text-[#17464F] text-sm font-medium">
                也可以雙線並進
              </span>
            </div>

            <p className="text-sm text-[#33393C]/60 max-w-lg mx-auto lg:mx-0">
              這不是一張離職門票，而是一段可以在保有現職下完成的五個月行動旅程。
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
                  立刻鎖定【{currentStageData?.name} NT${formatPrice(singleLinePrice)}起】
                </a>
              </Button>
              <a
                href="https://www.accupass.com/organizer/detail/2304050942218markup872544"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#17464F] hover:text-[#D4B483] font-medium text-base underline underline-offset-4 transition-colors duration-200"
              >
                查看免費講座場次
              </a>
              <button
                onClick={() => {
                  document.getElementById("course-highlights")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="text-[#17464F] hover:text-[#D4B483] font-medium text-base underline underline-offset-4 transition-colors duration-200"
              >
                還在觀望？先看五個月怎麼走 ↓
              </button>
            </div>

            <div className="hidden md:block text-center lg:text-left pt-2">
              {currentStageData && (
                <>
                  <p className="text-sm text-[#33393C]/70">
                    目前為{" "}
                    <span className="text-[#D4B483] font-semibold">
                      🔥 {currentStageData.name}｜單線 NT${formatPrice(singleLinePrice)} 起
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
  )
}
