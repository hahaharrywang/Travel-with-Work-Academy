"use client"

// Section 2: 正在尋找「下一步」的你
// Nomad Groups CIS Brand Colors Applied

export function TargetAudienceSection() {
  return (
    <section id="course-highlights" className="py-16 sm:py-24 bg-brand-teal relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-brand-gold/20 rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-brand-gold/15 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-20 hidden lg:block">
        <svg className="w-8 h-8 text-brand-gold/30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 text-balance">
            正在尋找「下一步」的你
          </h2>
          <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-4">
            不管你現在在哪個階段，你都有機會在這裡找到開始的位置。
            <br className="hidden sm:block" /> 你不一定已經決定要不要辭職、要不要成為全職 Nomad。
            <br className="hidden sm:block" />
            但你大概知道——人生不該只剩「通勤、等週末、等放假」。
          </p>
          <p className="text-brand-gold font-medium mt-6">你可能會在這幾種狀態裡，看見自己的影子：</p>
        </div>

        {/* Mobile: Bullet Points */}
        <div className="md:hidden space-y-5 mb-12 max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-brand-gold flex-shrink-0" />
            <div>
              <h3 className="text-base font-bold text-brand-gold mb-1">想要更有選擇權的職涯主線</h3>
              <p className="text-white/70 text-sm leading-relaxed">有穩定工作、不一定討厭現在公司，但看得到天花板；正在思考能否換到更彈性、可遠距的團隊，或讓履歷在未來更有選擇。</p>
            </div>
          </div>
          <div className="border-t border-brand-gold/20 mx-4" />
          <div className="flex items-start gap-3">
            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-brand-gold flex-shrink-0" />
            <div>
              <h3 className="text-base font-bold text-brand-gold mb-1">想多一條安全感，不想只靠一份薪水</h3>
              <p className="text-white/70 text-sm leading-relaxed">{'想用內容、接案、知識服務慢慢累積第二條收入線；希望在不壓垮自己的前提下，踏出有感的一步，而不是一次 all-in。'}</p>
            </div>
          </div>
          <div className="border-t border-brand-gold/20 mx-4" />
          <div className="flex items-start gap-3">
            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-brand-gold flex-shrink-0" />
            <div>
              <h3 className="text-base font-bold text-brand-gold mb-1">答案還不確定，但不想再只是想想</h3>
              <p className="text-white/70 text-sm leading-relaxed">現在的路看起來還行，但常被旅居、遠距、遊牧故事勾起一點遺憾；想在未來五個月裡，用比較踏實的方法去體驗、去嘗試，而不是只滑過別人的人生。</p>
            </div>
          </div>
        </div>

        {/* Desktop: Three Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 - 職涯主線 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-brand-gold/30 hover:border-brand-gold/50 transition-all duration-300 relative group">
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-gold/60 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-gold/60 rounded-br-2xl" />

            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-16 h-16 mb-6 flex items-center justify-center">
                <svg
                  className="w-14 h-14 text-brand-gold"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="32" cy="32" r="20" />
                  <circle cx="32" cy="32" r="4" fill="currentColor" />
                  <path d="M32 16V12M32 52V48M16 32H12M52 32H48" strokeWidth="2" />
                  <path d="M32 32L42 22" strokeWidth="2" />
                  <text x="48" y="16" fontSize="12" fill="currentColor">
                    ?
                  </text>
                  <text x="8" y="52" fontSize="10" fill="currentColor">
                    ?
                  </text>
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-brand-gold mb-4 leading-snug">
                想要更有選擇權的職涯主線
              </h3>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                有穩定工作、不一定討厭現在公司，但看得到天花板；正在思考能否換到更彈性、可遠距的團隊，或讓履歷在未來更有選擇。
              </p>
            </div>
          </div>

          {/* Card 2: 安全感 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-brand-gold/30 hover:border-brand-gold/50 transition-all duration-300 relative group">
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-gold/60 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-gold/60 rounded-br-2xl" />

            <div className="flex flex-col items-center text-center">
              {/* Icon - Coins */}
              <div className="w-16 h-16 mb-6 flex items-center justify-center">
                <svg
                  className="w-14 h-14 text-brand-gold"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <ellipse cx="32" cy="18" rx="20" ry="8" />
                  <path d="M12 18v12c0 4.4 8.9 8 20 8s20-3.5 20-8V18" />
                  <path d="M12 28v12c0 4.4 8.9 8 20 8s20-3.5 20-8v-12" />
                  <path d="M12 38v12c0 4.4 8.9 8 20 8s20-3.5 20-8v-12" />
                  <path d="M32 25v8M32 41v8" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 11l8 8h-16l8-8z" fill="currentColor" />
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-brand-gold mb-4 leading-snug">
                想多一條安全感，不想只靠一份薪水
              </h3>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                想用內容、接案、知識服務慢慢累積第二條收入線；希望在不壓垮自己的前提下，踏出有感的一步，而不是一次
                all-in。
              </p>
            </div>
          </div>

          {/* Card 3: 不確定 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-brand-gold/30 hover:border-brand-gold/50 transition-all duration-300 relative group">
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-gold/60 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-gold/60 rounded-br-2xl" />

            <div className="flex flex-col items-center text-center">
              {/* Icon - Map with pin */}
              <div className="w-16 h-16 mb-6 flex items-center justify-center">
                <svg
                  className="w-14 h-14 text-brand-gold"
                  viewBox="0 0 64 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="6" y="14" width="52" height="36" rx="4" />
                  <path d="M6 24h52M22 14v36M42 14v36" />
                  <circle cx="50" cy="22" r="8" fill="currentColor" />
                  <path d="M50 30v8" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-brand-gold mb-4 leading-snug">
                答案還不確定，但不想再只是想想
              </h3>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                現在的路看起來還行，但常被旅居、遠距、遊牧故事勾起一點遺憾；想在未來五個月裡，用比較踏實的方法去體驗、去嘗試，而不是只滑過別人的人生。
              </p>
            </div>
          </div>
        </div>

        {/* Three dots separator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="w-2 h-2 rounded-full bg-brand-gold" />
          <span className="w-2 h-2 rounded-full bg-brand-teal border border-brand-gold" />
          <span className="w-2 h-2 rounded-full bg-brand-gold" />
        </div>
      </div>
    </section>
  )
}
