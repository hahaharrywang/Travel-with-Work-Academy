"use client"

const strip = [
  {
    id: "case-a",
    tag: "作品集 0 → 1",
    quote: "第一次能很有底氣地把作品集連結貼在履歷裡，讓成果自己說話。",
    identity: "科技公司 PM｜案例 A",
  },
  {
    id: "case-b",
    tag: "首筆線上收入",
    quote: "兩週後收到第一筆線上訂閱收入，第一次相信接案可以慢慢累積變現。",
    identity: "邊上班邊經營 IG 的設計人｜案例 B",
  },
  {
    id: "case-c",
    tag: "完成第一次海外旅居",
    quote: "旅居不再只是想像中的夢，而是一個可以被規劃、也可以被重複的生活選項。",
    identity: "台北工作 7 年的上班族｜案例 C",
  },
  {
    id: "case-d",
    tag: "服務定位 + Offer 上線",
    quote: "第一次不是在收藏別人的故事，而是在寫自己的。",
    identity: "行銷公司企劃，工作第四年｜案例 D",
  },
]

export function TestimonialsStrip() {
  const scrollToFull = () => {
    document.getElementById("student-results")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="testimonials-strip"
      aria-label="學員成果速覽"
      className="bg-brand-offwhite py-12 sm:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with decorative line */}
        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
          <span className="h-px w-8 sm:w-12 bg-brand-gold/60" aria-hidden />
          <p className="text-xs sm:text-sm font-medium text-brand-teal tracking-wide">
            第一屆 <span className="font-bold">300+</span> 學員已在路上
          </p>
          <span className="h-px w-8 sm:w-12 bg-brand-gold/60" aria-hidden />
        </div>

        {/* Cards: desktop 4-col flex, mobile horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:snap-none pb-2 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {strip.map((item) => (
            <button
              key={item.id}
              onClick={scrollToFull}
              aria-label={`查看 ${item.identity} 完整案例`}
              className="group flex-shrink-0 snap-start w-[82%] sm:w-auto sm:flex-1 bg-white rounded-2xl p-5 sm:p-6 text-left border border-brand-mist hover:border-brand-gold/50 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Outcome tag */}
              <span className="inline-flex items-center self-start gap-1.5 bg-brand-gold/15 text-brand-teal text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {item.tag}
              </span>

              {/* Quote */}
              <p className="text-sm sm:text-[15px] leading-relaxed text-brand-teal font-medium text-pretty mb-4 flex-1">
                <span className="text-brand-gold text-lg leading-none mr-0.5" aria-hidden>&ldquo;</span>
                {item.quote}
                <span className="text-brand-gold text-lg leading-none ml-0.5" aria-hidden>&rdquo;</span>
              </p>

              {/* Identity */}
              <p className="text-xs text-brand-text/70 pt-3 border-t border-brand-mist">
                {item.identity}
              </p>

              {/* Hover hint */}
              <span className="mt-3 text-xs font-semibold text-brand-teal/50 group-hover:text-brand-gold transition-colors inline-flex items-center gap-1">
                看完整故事
                <span aria-hidden className="group-hover:translate-x-0.5 transition-transform">{'→'}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Mobile swipe hint */}
        <p className="sm:hidden text-center text-[11px] text-brand-text/50 mt-3">
          左右滑動瀏覽 · 點擊查看完整故事
        </p>
      </div>
    </section>
  )
}
