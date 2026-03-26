"use client"

import Image from "next/image"

// Section 3: Pain Points - 三大痛點
// Nomad Groups CIS Brand Colors Applied
// Desktop: uses full-width image, Mobile: compact gold vertical line layout

export function PainPointsSection() {
  return (
    <section className="bg-brand-teal relative overflow-hidden">
      {/* Desktop: Show the cut image */}
      <div className="hidden lg:block">
        <Image
          src="/images/section3-painpoints-desktop.png"
          alt="不是你不努力，而是拼圖還有缺 - 方向斷裂、方法斷裂、同伴斷裂"
          width={1920}
          height={800}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Mobile/Tablet: Compact gold vertical line layout */}
      <div className="lg:hidden py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-balance">
              不是你不努力，而是拼圖還有缺
            </h2>
            <div className="flex items-center justify-center gap-2 opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
            </div>
          </div>

          {/* Pain Points List - Gold vertical line (compact version) */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="border-l-2 border-brand-gold pl-4">
              <h3 className="text-base font-bold text-brand-gold mb-1">方向斷裂</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                想過很多版本，但每條路都沒真的走下去。
              </p>
            </div>
            <div className="border-l-2 border-brand-gold pl-4">
              <h3 className="text-base font-bold text-brand-gold mb-1">方法斷裂</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                {'買課、看影片、存筆記，但不知道今天該做哪一步。'}
              </p>
            </div>
            <div className="border-l-2 border-brand-gold pl-4">
              <h3 className="text-base font-bold text-brand-gold mb-1">同伴斷裂</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                {'身邊沒人能討論，久了就把想法藏在心裡。'}
              </p>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="relative">
            <div className="max-w-2xl mx-auto px-5 py-6 rounded-2xl border-2 border-brand-gold/30 bg-brand-teal/50 backdrop-blur-sm text-center relative">
              <p className="text-base sm:text-lg text-white font-bold leading-relaxed">
                AI時代下已經不缺資訊，你需要的是一個驗證過的決策指引＆環境，
                <span className="block mt-2 text-brand-gold">
                  在未來五個月裡，有人陪你一起試、一起走、一起調整方向。
                </span>
              </p>

              {/* Scroll CTA */}
              <div className="mt-5 border-t border-brand-gold/20 pt-5">
                <button
                  onClick={() => {
                    document.getElementById("key-features")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-brand-gold hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 mx-auto font-medium"
                >
                  了解為什麼學院可以幫你
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
