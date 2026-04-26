"use client"

import { Mail, X, Calendar, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import {
  weeklyLecture,
  upcomingLectures,
  getNextSundayNineTaipei,
  formatLectureDateTime,
  type LectureHighlight,
} from "@/data/lectures"

/**
 * 把 highlight 文字中，emphasis 關鍵詞用金色粗體高亮
 */
function HighlightText({ item }: { item: LectureHighlight }) {
  if (!item.emphasis || item.emphasis.length === 0) {
    return <>{item.text}</>
  }
  // build a regex that matches any of the emphasis terms
  const escaped = item.emphasis.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  const pattern = new RegExp(`(${escaped.join("|")})`, "g")
  const parts = item.text.split(pattern)
  return (
    <>
      {parts.map((part, idx) =>
        item.emphasis!.includes(part) ? (
          <span key={idx} className="text-brand-gold font-bold">
            {part}
          </span>
        ) : (
          <span key={idx}>{part}</span>
        ),
      )}
    </>
  )
}

export function FreeLectureSection() {
  const [emailPopupOpen, setEmailPopupOpen] = useState(false)
  const [nextSunday, setNextSunday] = useState<{ dateLabel: string; timeLabel: string } | null>(null)

  // 下個週日時間在 client 端計算，避免 SSR / client 不一致造成 hydration mismatch
  useEffect(() => {
    setNextSunday(getNextSundayNineTaipei())
  }, [])

  // Lock body scroll when email popup is open & load GHL embed script
  useEffect(() => {
    if (emailPopupOpen) {
      document.body.style.overflow = "hidden"
      if (!document.querySelector('script[src*="form_embed.js"]')) {
        const s = document.createElement("script")
        s.src = "https://link.digitalnomadstaiwan.com/js/form_embed.js"
        s.async = true
        document.body.appendChild(s)
      }
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [emailPopupOpen])

  return (
    <>
      <section id="free-lecture-section" className="bg-brand-offwhite py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-teal mb-3 text-balance">
              <span className="block sm:inline">{"下一場免費講座｜"}</span>
              <span className="block sm:inline">{"2 小時搞懂你的遠距下一步"}</span>
            </h3>
            <p className="text-sm sm:text-base text-brand-text/75 leading-relaxed">
              {"每週日晚 8pm 固定開講，不定期加場合作講座 & 主題工作坊"}
            </p>
          </div>

          {/* Featured Card - 每週日說明會 */}
          <div className="relative bg-brand-teal rounded-2xl overflow-hidden shadow-lg mb-10 sm:mb-12">
            {/* 裝飾圓圈 */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-32 -right-32 w-80 h-80 border border-brand-gold/15 rounded-full" />
              <div className="absolute -bottom-40 -left-24 w-96 h-96 border border-brand-gold/10 rounded-full" />
            </div>

            <div className="relative p-6 sm:p-10">
              {/* Banner 圖片 - 桌機版絕對定位於右上角，點擊跳轉報名連結 */}
              {weeklyLecture.bannerImage && (
                <a
                  href={weeklyLecture.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="點擊查看講座詳情與報名"
                  className="hidden sm:block absolute top-5 right-5 sm:w-72 md:w-80 lg:w-[24rem] xl:w-[28rem] rounded-lg overflow-hidden shadow-lg ring-1 ring-white/10 hover:ring-brand-gold/60 transition-all duration-200 z-10 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={weeklyLecture.bannerImage}
                    alt={weeklyLecture.bannerAlt || weeklyLecture.title}
                    className="block w-full h-auto group-hover:scale-[1.02] transition-transform duration-200"
                  />
                </a>
              )}

              {/* 文字內容區 - 桌機版右側預留 banner 空間避免被壓住 */}
              <div className={weeklyLecture.bannerImage ? "sm:pr-[20rem] md:pr-[22rem] lg:pr-[26rem] xl:pr-[30rem]" : ""}>
                {/* Top row: tag + date */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-brand-gold/20 text-brand-gold border border-brand-gold/40 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                    {weeklyLecture.tag}
                  </span>
                  {nextSunday && (
                    <span className="inline-flex items-center gap-1.5 text-white/85 text-xs sm:text-sm">
                      <Calendar className="w-4 h-4 text-brand-gold" aria-hidden />
                      <span className="font-semibold">{nextSunday.dateLabel}</span>
                      <span className="text-white/60">·</span>
                      <span>{nextSunday.timeLabel}（台灣時間）</span>
                    </span>
                  )}
                </div>

                {/* Title + speaker */}
                <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-balance">
                  {weeklyLecture.title}
                </h4>
                <p className="text-sm sm:text-base text-white/70 mb-6">
                  {"主講｜"}
                  <span className="text-white font-medium">{weeklyLecture.speaker}</span>
                </p>
              </div>

              {/* Highlights - 全寬，不讓 banner 佔用欄位 */}
              {weeklyLecture.highlights && weeklyLecture.highlights.length > 0 && (
                <div className="mb-8">
                  <p className="text-sm sm:text-base font-bold text-white mb-4">
                    {"這場講座將跟你分享："}
                  </p>
                  <ul className="space-y-3 sm:space-y-3.5">
                    {weeklyLecture.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/90 text-sm sm:text-base leading-relaxed">
                        <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-brand-gold/25 border border-brand-gold/40 flex items-center justify-center text-brand-gold text-xs sm:text-sm font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-pretty">
                          <HighlightText item={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Banner 圖片 - 手機版顯示於 CTA 上方 */}
              {weeklyLecture.bannerImage && (
                <a
                  href={weeklyLecture.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="點擊查看講座詳情與報名"
                  className="sm:hidden block w-full mb-5 rounded-lg overflow-hidden shadow-lg ring-1 ring-white/10 hover:ring-brand-gold/60 transition-all duration-200 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={weeklyLecture.bannerImage}
                    alt={weeklyLecture.bannerAlt || weeklyLecture.title}
                    className="block w-full h-auto group-hover:scale-[1.02] transition-transform duration-200"
                  />
                </a>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={weeklyLecture.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-teal font-bold text-base px-7 py-3.5 rounded-full hover:bg-[#c9a673] transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  {"免費卡位講座"}
                  <ArrowRight className="w-5 h-5 flex-shrink-0" aria-hidden />
                </a>
                <p className="text-xs sm:text-sm text-white/60 sm:ml-2">
                  {"免費 · 2 小時 · 線上直播"}
                </p>
              </div>
            </div>
          </div>

          {/* 近期加開場次 - 若有才顯示 */}
          {upcomingLectures.length > 0 && (
            <div className="mb-10 sm:mb-12">
              <div className="flex items-end justify-between mb-5">
                <h4 className="text-lg sm:text-xl font-bold text-brand-teal">
                  {"近期加開場次"}
                </h4>
                <span className="text-xs text-brand-text/60">{"講師合作 & 主題工作坊"}</span>
              </div>

              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-3 pb-2 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {upcomingLectures.map((lec) => {
                  const dt = lec.startAt ? formatLectureDateTime(lec.startAt) : null
                  return (
                    <a
                      key={lec.id}
                      href={lec.registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-[82%] sm:w-auto snap-center bg-white rounded-xl border border-brand-mist p-5 hover:border-brand-gold hover:shadow-md transition-all duration-200 flex flex-col"
                    >
                      <span className="inline-flex self-start items-center bg-brand-teal/10 text-brand-teal text-[11px] font-semibold px-2.5 py-1 rounded-full mb-3">
                        {lec.tag}
                      </span>
                      <h5 className="text-base font-bold text-brand-teal mb-2 leading-snug text-pretty">
                        {lec.title}
                      </h5>
                      <p className="text-xs text-brand-text/75 mb-3">
                        {"主講｜"}
                        <span className="text-brand-text">{lec.speaker}</span>
                      </p>
                      {dt && (
                        <p className="flex items-center gap-1.5 text-xs text-brand-text/80 mt-auto">
                          <Calendar className="w-3.5 h-3.5 text-brand-gold" aria-hidden />
                          <span>{dt.dateLabel}</span>
                          <span className="text-brand-text/50">·</span>
                          <span>{dt.timeLabel}</span>
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 text-sm text-brand-gold font-semibold mt-3">
                        {"了解詳情"}
                        <ArrowRight className="w-4 h-4" aria-hidden />
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          {/* 回放區 */}
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-lg sm:text-xl font-bold text-brand-teal mb-2">
              {"錯過場次了嗎？先看說明會回放"}
            </h4>
            <p className="text-sm text-brand-text/70 mb-5">
              {"每次內容都會變得更豐富，情況允許的話還是很建議參與直播，可以現場 QA 直接交流。"}
            </p>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/gZ37Pl9NdHU?rel=0"
                title="遠距遊牧學院說明會回放"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* 底部輔助資源 - 降級視覺 */}
          <div className="mt-10 pt-6 border-t border-brand-mist/60 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm">
            <button
              onClick={() => setEmailPopupOpen(true)}
              className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-gold font-medium transition-colors duration-200"
            >
              <Mail className="w-4 h-4 flex-shrink-0" aria-hidden />
              {"訂閱電子報，不錯過未來場次"}
            </button>
            <span className="hidden sm:inline text-brand-text/30">·</span>
            <a
              href="https://www.skool.com/twwgroup-3033/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand-text/70 hover:text-brand-teal font-medium transition-colors duration-200"
            >
              {"其他免費學習資源"}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* GHL Email Subscription Modal */}
      {emailPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="訂閱電子報"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEmailPopupOpen(false)} />
          <div
            className="relative z-10 w-full max-w-[calc(100vw-16px)] sm:max-w-lg bg-brand-teal rounded-2xl shadow-2xl"
            style={{ overflow: "hidden" }}
          >
            <button
              onClick={() => setEmailPopupOpen(false)}
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
              aria-label="關閉"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="h-[430px] overflow-hidden rounded-[20px]">
              <iframe
                src="https://link.digitalnomadstaiwan.com/widget/form/MpJ0wDqzBLszazx5vVRy"
                style={{ width: "100%", height: "100%", border: "none", borderRadius: "20px" }}
                id="inline-MpJ0wDqzBLszazx5vVRy"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="遠距遊牧學院 - 表單"
                data-height="430"
                data-layout-iframe-id="inline-MpJ0wDqzBLszazx5vVRy"
                data-form-id="MpJ0wDqzBLszazx5vVRy"
                title="遠距遊牧學院 - 表單"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
