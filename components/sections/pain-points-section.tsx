"use client"

export function PainPointsSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F5F3ED]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-4 text-balance">
            不是你不夠努力，而是一直一個人亂撞
          </h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
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
              所以日子一忙，又回到塬本的節奏。
            </p>
          </div>

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

        <div className="text-center">
          <p className="text-base sm:text-lg text-[#17464F] font-medium leading-relaxed max-w-3xl mx-auto px-4">
            你缺的不是更多資訊，而是一個地方，
            <br className="sm:hidden" />
            讓你在未來五個月裡，有人陪你一起試、一起走、一起修正方向。
          </p>
        </div>
      </div>
    </section>
  )
}
