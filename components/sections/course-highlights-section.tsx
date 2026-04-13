"use client"

// Section 2: 正在尋找「下一步」的你
// Nomad Groups CIS Brand Colors Applied

export function CourseHighlightsSection() {
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
            你不一定已經決定要不要辭職、要不要成為全職 Nomad。
            <br className="hidden sm:block" />
            但你大概知道——現在的生活節奏，好像不是你想一直過下去的版本。
          </p>
          <p className="text-brand-gold font-medium mt-6">你可能會在這幾種狀態裡，看見自己的影子：</p>
        </div>

        {/* Mobile: Bullet Points */}
        <div className="md:hidden space-y-5 mb-12 max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-brand-gold flex-shrink-0" />
            <div>
              <h3 className="text-base font-bold text-brand-gold mb-1">悶在穩定工作裡，覺得人生應該還有別的可能</h3>
              <p className="text-white/70 text-sm leading-relaxed">工作不算差，但每天通勤、開會、等週末，日子過得到，卻也看得到天花板。偶爾滑到別人遠距工作的限動，心裡有一點什麼說不清楚——不是要逃，而是開始覺得自己值得更多選擇。</p>
            </div>
          </div>
          <div className="border-t border-brand-gold/20 mx-4" />
          <div className="flex items-start gap-3">
            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-brand-gold flex-shrink-0" />
            <div>
              <h3 className="text-base font-bold text-brand-gold mb-1">其實動過了，但什麼都碰、什麼都沒做完</h3>
              <p className="text-white/70 text-sm leading-relaxed">你不是沒努力。經營過自媒體、投過接案平台、改過 LinkedIn，認真上過幾堂課。但做了一輪之後，沒有一個作品集能拿出來、沒有穩定的案子——有點累了，不是累在努力，而是累在一直重新開始。</p>
            </div>
          </div>
          <div className="border-t border-brand-gold/20 mx-4" />
          <div className="flex items-start gap-3">
            <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-brand-gold flex-shrink-0" />
            <div>
              <h3 className="text-base font-bold text-brand-gold mb-1">被故事吸引了很多次，但從來沒跨出去</h3>
              <p className="text-white/70 text-sm leading-relaxed">看過很多人邊旅行邊工作的分享，每次都有點心動，但總覺得那些人的起點跟自己差太遠。你不是不想，只是不知道「從我現在的狀態」到底能從哪裡開始——而每次猶豫完，又回到原本的日常。</p>
            </div>
          </div>
        </div>

        {/* Desktop: Three Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-brand-gold/30 hover:border-brand-gold/50 transition-all duration-300 relative group">
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-gold/60 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-gold/60 rounded-br-2xl" />

            <div className="flex flex-col text-center">
              <h3 className="text-lg sm:text-xl font-bold text-brand-gold mb-4 leading-snug">
                悶在穩定工作裡，覺得人生應該還有別的可能
              </h3>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                工作不算差，但每天通勤、開會、等週末，日子過得到，卻也看得到天花板。偶爾滑到別人遠距工作的限動，心裡有一點什麼說不清楚——不是要逃，而是開始覺得自己值得更多選擇。
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-brand-gold/30 hover:border-brand-gold/50 transition-all duration-300 relative group">
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-gold/60 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-gold/60 rounded-br-2xl" />

            <div className="flex flex-col text-center">
              <h3 className="text-lg sm:text-xl font-bold text-brand-gold mb-4 leading-snug">
                其實動過了，但什麼都碰、什麼都沒做完
              </h3>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                你不是沒努力。經營過自媒體、投過接案平台、改過 LinkedIn，認真上過幾堂課。但做了一輪之後，沒有一個作品集能拿出來、沒有穩定的案子——有點累了，不是累在努力，而是累在一直重新開始。
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-brand-gold/30 hover:border-brand-gold/50 transition-all duration-300 relative group">
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-gold/60 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-gold/60 rounded-br-2xl" />

            <div className="flex flex-col text-center">
              <h3 className="text-lg sm:text-xl font-bold text-brand-gold mb-4 leading-snug">
                被故事吸引了很多次，但從來沒跨出去
              </h3>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                看過很多人邊旅行邊工作的分享，每次都有點心動，但總覺得那些人的起點跟自己差太遠。你不是不想，只是不知道「從我現在的狀態」到底能從哪裡開始——而每次猶豫完，又回到原本的日常。
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
