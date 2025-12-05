"use client"

import type React from "react"

interface FAQItem {
  question: string
  answer: string | React.ReactNode
}

interface FAQCategory {
  title: string
  items: FAQItem[]
}

const faqData: FAQCategory[] = [
  {
    title: "適合對象",
    items: [
      {
        question: "這堂學院適合什麼樣的人？我現在只是在上班，可以報名嗎？",
        answer:
          "當然可以！這堂學院就是為了「有正職、但想探索更多可能」的人設計的。你不需要先離職，也不需要有任何接案或遠距經驗。只要你願意在未來六個月裡，每週騰出 2-4 小時來學習和行動，這裡就適合你。",
      },
      {
        question: "英文不好、程式不會，可以嗎？",
        answer:
          "可以。我們的課程主要用中文進行，不會要求你一開始就具備流利英文或程式能力。選修課程中有「工作英文」和「AI 工具應用」，會幫助你從零建立這些技能。最重要的是「願意學」，而不是「已經會」。",
      },
    ],
  },
  {
    title: "時間與節奏",
    items: [
      {
        question: "3+3 個月的節奏大概是怎麼安排的？會不會太硬？",
        answer: (
          <>
            <p className="mb-3">
              前 3 個月是「共學探索期」，每週會有 1 堂主課（約 60-90 分鐘）+ 課後任務，預計每週投入 2-4
              小時。這段時間會比較密集，但節奏是設計給有正職的人跟得上的。
            </p>
            <p>
              後 3
              個月是「延伸累積期」，節奏放慢，以每月復盤工作坊、選修課程、社群任務為主，讓你有空間把學到的東西真的用出來。
            </p>
          </>
        ),
      },
      {
        question: "我時間很不固定，有錄影可以回看嗎？作業一定要每週交嗎？",
        answer:
          "所有課程都會錄影，放在 Skool 社群讓你隨時回看。作業有建議繳交時間，但我們更鼓勵「完成比完美重要」——如果某週真的忙不過來，可以先跟上進度，之後再補。我們會有基本的及格門檻，但不會逼你每週都交滿。",
      },
      {
        question: "如果這六個月中途真的發生變故（工作太忙、人生事件），怎麼辦？",
        answer:
          "我們理解人生不會照劇本走。如果中途遇到重大變故，可以先私訊我們討論。錄影內容會保留讓你補課，部分情況也可以申請轉到下一梯次。詳細的退費與轉班規則會在報名後提供完整說明。",
      },
    ],
  },
  {
    title: "內容與線路",
    items: [
      {
        question: "自媒體接案線路與遠端上班線路有什麼差別？我不知道要選哪一個。",
        answer: (
          <>
            <p className="mb-3">
              <strong>自媒體接案線路</strong>
              ：適合想透過內容創作、個人品牌來獲得收入與自由的人。課程會教你怎麼從零開始經營自媒體、找到變現模式、接到第一個案子。
            </p>
            <p className="mb-3">
              <strong>遠端上班線路</strong>
              ：適合想找到一份可以遠距工作的正職或長期合作的人。課程會教你怎麼打造國際履歷、在哪裡找遠距職缺、如何通過面試。
            </p>
            <p>
              如果你還不確定，建議先選一條「現在比較有感覺」的線路走走看。六個月很長，你會在過程中慢慢釐清自己要的是什麼。
            </p>
          </>
        ),
      },
      {
        question: "可以中途換線、改成雙線並進嗎？",
        answer:
          "可以。如果你在前 3 個月發現另一條線路更適合自己，可以申請換線或升級成雙線並進方案（需補差額）。我們希望你選到真正適合的路，而不是被綁在一開始的選擇。",
      },
    ],
  },
  {
    title: "其他",
    items: [
      {
        question: "有發票／公司報帳、分期付款的選項嗎？",
        answer:
          "我們可以開立電子發票（含統編），適合需要公司報帳的學員。分期付款部分，目前支援信用卡分期（視發卡銀行而定）。如果有特殊需求，歡迎私訊我們討論。",
      },
    ],
  },
]

export function FAQSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            <span className="w-2 h-2 rounded-full bg-[#17464F]" />
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#17464F] mb-4">常見問題</h2>
          <p className="text-[#33393C]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            看到這裡，你可能還有一些問題想問清楚。
            <br className="hidden sm:block" />
            以下整理了大家最常問的幾個問題，如果沒找到答案，歡迎私訊我們。
          </p>
        </div>

        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-sm font-semibold text-[#D4B483] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-[#D4B483]" />
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <details
                    key={itemIndex}
                    className="group bg-white rounded-xl border border-[#C9D7D4] overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#F5F3ED]/50 transition-colors">
                      <span className="font-medium text-[#17464F] text-left pr-4">{item.question}</span>
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#17464F]/10 flex items-center justify-center text-[#17464F] group-open:rotate-45 transition-transform duration-200">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-[#33393C]/80 leading-relaxed border-t border-[#C9D7D4]/50 pt-4">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#33393C]/70 text-sm leading-relaxed">
            還有其他問題？歡迎到{" "}
            <a
              href="https://www.instagram.com/travelwithwork_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#17464F] underline hover:text-[#D4B483] transition-colors"
            >
              Instagram
            </a>{" "}
            私訊我們，或寄信到 Academy@travelwork.life
          </p>
        </div>
      </div>
    </section>
  )
}
