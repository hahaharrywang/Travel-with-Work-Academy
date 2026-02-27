"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, Video, Users, ArrowRight, CheckCircle } from "lucide-react"

interface WebinarSession {
  id: number
  date: string
  weekday: string
  time: string
  topic: string
  description: string
  registrationUrl: string
  spotsLeft?: number
  isFull?: boolean
}

const sessions: WebinarSession[] = [
  {
    id: 1,
    date: "2025/04/12",
    weekday: "六",
    time: "14:00 – 15:30",
    topic: "遠距遊牧學院 | 免費線上說明會",
    description: "了解學院的完整課程結構、3+3 月行動學院模式，以及加入後你將獲得的一切。適合正在考慮報名的你。",
    registrationUrl: "https://link.digitalnomadstaiwan.com",
    spotsLeft: 8,
  },
  {
    id: 2,
    date: "2025/04/26",
    weekday: "六",
    time: "14:00 – 15:30",
    topic: "遠距工作實戰講座 | 如何找到第一份遠距工作",
    description: "從零開始的遠距工作路徑：哪些技能最好入門、如何建立作品集、接案平台怎麼運作，一次講清楚。",
    registrationUrl: "https://link.digitalnomadstaiwan.com",
    spotsLeft: 15,
  },
  {
    id: 3,
    date: "2025/05/10",
    weekday: "六",
    time: "14:00 – 15:30",
    topic: "數位遊牧生活分享 | 邊旅行邊工作，真實樣貌",
    description: "社群學員現身說法，分享遠距遊牧生活一年的日常：工作節奏、旅行安排、財務狀況，沒有糖衣。",
    registrationUrl: "https://link.digitalnomadstaiwan.com",
    spotsLeft: 22,
  },
]

const faqs = [
  {
    q: "說明會是免費的嗎？",
    a: "是的，所有線上說明會與公開講座皆完全免費，只需提前報名即可。",
  },
  {
    q: "會議以什麼平台進行？",
    a: "我們使用 Zoom 進行線上說明會。報名後將收到含有連結的確認信件。",
  },
  {
    q: "說明會會有錄影嗎？",
    a: "部分場次會提供錄影，但建議盡量參與直播，因為 Q&A 環節才是最有價值的部分。",
  },
  {
    q: "我已經很想報名了，還需要參加說明會嗎？",
    a: "不一定，你可以直接前往課程頁面報名。說明會適合仍有疑問、想更了解學院的人。",
  },
]

export default function WebinarPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-[#F5F3ED] font-sans">
      {/* Header */}
      <header className="bg-[#17464F] py-5 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/images/academy-logo.png"
              alt="遠距遊牧學院"
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
            />
          </a>
          <a
            href="/"
            className="text-[#C9D7D4] hover:text-white text-sm transition-colors"
          >
            ← 返回課程頁
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#17464F] pb-16 pt-10 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.18em] uppercase text-[#D4B483] font-medium mb-4">
            線上說明會 ＆ 公開講座
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-snug text-balance">
            加入前，先來認識我們
          </h1>
          <p className="text-[#C9D7D4] text-base sm:text-lg leading-relaxed">
            每月固定舉辦線上說明會與主題講座，免費參與，歡迎帶著問題來。
          </p>
        </div>
      </section>

      {/* Wave divider */}
      <div className="bg-[#17464F]">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40 Z" fill="#F5F3ED" />
        </svg>
      </div>

      {/* Sessions */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-xl font-bold text-[#17464F] mb-8 text-center">近期場次</h2>

        <div className="flex flex-col gap-5">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl shadow-sm border border-[#C9D7D4]/40 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Date block */}
                <div className="bg-[#17464F] text-white flex flex-row sm:flex-col items-center justify-center gap-3 sm:gap-1 px-6 py-4 sm:py-6 sm:min-w-[100px] sm:text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[#D4B483] text-xs font-medium tracking-widest uppercase">
                      {s.date.split("/")[0]}/{s.date.split("/")[1]}
                    </span>
                    <span className="text-3xl font-bold leading-none">{s.date.split("/")[2]}</span>
                    <span className="text-[#C9D7D4] text-sm">（{s.weekday}）</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#33393C]/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {s.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Video className="w-3.5 h-3.5" />
                      線上 Zoom
                    </span>
                    {s.spotsLeft !== undefined && !s.isFull && (
                      <span className="flex items-center gap-1 text-[#A06E56] font-medium">
                        <Users className="w-3.5 h-3.5" />
                        剩餘 {s.spotsLeft} 個名額
                      </span>
                    )}
                    {s.isFull && (
                      <span className="text-red-500 font-medium">已額滿</span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#17464F] leading-snug">
                    {s.topic}
                  </h3>
                  <p className="text-sm text-[#33393C]/70 leading-relaxed">
                    {s.description}
                  </p>

                  <a
                    href={s.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`self-start mt-1 inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors duration-200 ${
                      s.isFull
                        ? "bg-[#C9D7D4]/40 text-[#33393C]/40 cursor-not-allowed pointer-events-none"
                        : "bg-[#D4B483] text-[#17464F] hover:bg-[#c4a470]"
                    }`}
                  >
                    免費報名
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if no sessions */}
        {sessions.length === 0 && (
          <div className="text-center py-16 text-[#33393C]/50">
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>近期暫無安排場次，請訂閱電子報以獲得最新通知。</p>
          </div>
        )}
      </section>

      {/* What to expect */}
      <section className="bg-[#C9D7D4]/30 py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-[#17464F] mb-8 text-center">說明會你會了解什麼</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "學院的 3+3 月課程結構與學習節奏",
              "加入後每週會做什麼、怎麼安排時間",
              "遠距遊牧的生活樣貌與財務現實",
              "各種費用、方案與付款方式說明",
              "社群學員真實回饋與 Q&A",
              "如何判斷現在的自己適不適合加入",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#17464F] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#33393C] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-14">
        <h2 className="text-xl font-bold text-[#17464F] mb-8 text-center">常見問題</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-[#C9D7D4]/40 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                aria-expanded={openFaq === i}
              >
                <span className="font-semibold text-[#17464F] text-sm sm:text-base">{faq.q}</span>
                <span className="text-[#17464F] text-lg leading-none ml-4 flex-shrink-0">
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-[#33393C]/70 leading-relaxed border-t border-[#C9D7D4]/40 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#17464F] py-14 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">還沒找到適合的場次？</h2>
          <p className="text-[#C9D7D4] text-sm mb-6 leading-relaxed">
            訂閱電子報，新場次公告第一時間通知你。
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-[#D4B483] text-[#17464F] font-semibold px-8 py-4 rounded-full hover:bg-[#c4a470] transition-colors duration-200"
          >
            回課程頁訂閱通知
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#17464F] border-t border-white/10 py-6 px-6 text-center">
        <p className="text-[#C9D7D4]/60 text-xs">
          © 2025 Nomad Groups 遠距遊牧學院 · 保留所有權利
        </p>
      </footer>
    </main>
  )
}
