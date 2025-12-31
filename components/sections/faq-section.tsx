"use client"

import type React from "react"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string | React.ReactNode
}

interface FAQCategory {
  title: string
  items: FAQItem[]
}

interface FAQSectionProps {
  onPriceDiffModalChange?: (isOpen: boolean) => void
}

interface UpgradePricingAnswerProps {
  onModalChange?: (isOpen: boolean) => void
}

const faqData: FAQCategory[] = [
  {
    title: "適合對象",
    items: [
      {
        question: "這堂學院適合什麼樣的人？我現在只是在上班，可以報名嗎？",
        answer:
          "當然可以！學院就是為了「想探索多元可能」的人設計的。你如果正在上班，完全不需要先離職，也不需要有任何接案或遠距經驗。只要你願意在未來六個月裡，每週騰出 2-4 小時來學習和行動，這裡就適合你。",
      },
      {
        question: "英文不好、不會寫程式，可以嗎？",
        answer:
          "可以。我們的課程主要用中文進行，雖然英文能力＆程式能力在遠距遊牧之路上很加分，但絕對不是會阻止你開始的理由。選修課程中有「工作英文」和「AI vibe coding 等工具應用」，會幫助你從零建立方向與技能。最重要的是「願意以開放的心開始」，而不是「已經會」。",
      },
    ],
  },
  {
    title: "時間與節奏",
    items: [
      {
        question: "學習的節奏大概是怎麼安排的？會不會太硬？",
        answer: (
          <>
            <p className="mb-3">
              主課程將集中於前四個月，每堂主課（約 120 分鐘）+ 課後任務，預計每週投入 2-4
              小時。這段期間上課會比較密集，但節奏是設計給有正職的人跟得上的。詳細請見學習行事曆。
            </p>
            <p>
              後三個月是「延伸累積期」，節奏放慢，以每月復盤工作坊、選修課程、社群共創任務為主，有更多消化復盤、共創交流、延伸學習的機會。
            </p>
          </>
        ),
      },
      {
        question: "我時間很不固定，有錄影可以回看嗎？作業一定要每週交嗎？",
        answer:
          "所有課程都會錄影，放在 Skool 社群讓你隨時回看。作業有建議繳交時間，但我們更鼓勵「完成比完美重要」——如果某段時期真的忙不過來，可以先跟上進度，之後再補。我們會有基本的及格門檻，但不會逼你每週都交滿。",
      },
    ],
  },
  {
    title: "內容與線路",
    items: [
      {
        question: "自媒體接案線路與遠端上班線路有什麼差別？",
        answer: (
          <>
            <p className="mb-3">
              <strong className="text-[#17464F]">自媒體接案線路</strong>
              ：適合想透過內容創作與個人品牌，建立「可變現的影響力」與收入來源的人。重點會放在：定位、內容策略、變現路徑、拿到第一個案子。
            </p>
            <p>
              <strong className="text-[#17464F]">遠端上班線路</strong>
              ：適合想找到一份可遠距的正職／長期合作的人。重點會放在：履歷與作品呈現、求職策略、遠距職缺管道、面試準備。
            </p>
          </>
        ),
      },
      {
        question: "報名時先選了一條主線，可以中途換線嗎？",
        answer: (
          <>
            <p className="mb-4">可以。為了讓你真的選到適合自己的路，我們在前 4 週設計了「探索 + 決策」機制：</p>

            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-bold text-[#17464F] mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483]" />第 3–4 週會有試上機會
                </h4>
                <ul className="text-[#33393C]/80 pl-3.5 space-y-1.5">
                  <li>• 第 3 週課程：「自媒體接案變現地圖 & 目標設定」</li>
                  <li>• 第 4 週課程：「遠端自由職涯藍圖 & 目標設定」</li>
                </ul>
                <p className="text-xs text-[#33393C]/60 pl-3.5 mt-2">
                  （單路線學員會有機會試上另一條線的起步課，再做選擇）
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#17464F] mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483]" />第 4 週截止前可申請 1 次調整
                </h4>
                <p className="text-[#33393C]/80 pl-3.5">
                  你可以選擇<strong>換線</strong>（單路線 A → 單路線 B），或<strong>加購升級成雙線並進</strong>（單路線
                  → 雙路線）。
                </p>
                <p className="text-xs text-[#33393C]/60 pl-3.5 mt-2">
                  ※ 第 4 週截止後路線將鎖定，以確保分組與學習體驗品質。
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        question: "換線 / 升級成雙線並進，需要多少費用？",
        answer: <UpgradePricingAnswer />,
      },
    ],
  },
]

export function FAQSection({ onPriceDiffModalChange }: FAQSectionProps) {
  const [openCategory, setOpenCategory] = useState<number | null>(null)
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  return (
    <section id="faq" className="pt-8 sm:pt-12 pb-16 sm:pb-24 bg-white">
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
                {category.items.map((item, itemIndex) => {
                  const answerContent =
                    category.title === "內容與線路" && item.question === "換線 / 升級成雙線並進，需要多少費用？" ? (
                      <UpgradePricingAnswer onModalChange={onPriceDiffModalChange} />
                    ) : (
                      item.answer
                    )

                  return (
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
                        {answerContent}
                      </div>
                    </details>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection

function UpgradePricingAnswer({ onModalChange }: UpgradePricingAnswerProps) {
  const [showModal, setShowModal] = useState(false)

  const handleModalOpen = () => {
    setShowModal(true)
    onModalChange?.(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    onModalChange?.(false)
  }

  return (
    <>
      <p className="mb-4">我們的計算很簡單：「當初購買的價差 + 手續費」（手續費統一 NT$500）。</p>

      <div className="space-y-4 text-sm mb-4">
        <div>
          <h4 className="font-bold text-[#17464F] mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483]" />
            換線（單路線 → 另一單路線）
          </h4>
          <p className="text-[#33393C]/80 pl-3.5">
            兩條單路線價格相同，所以：
            <br />
            換線費用 = 0（價差）+ 500（手續費）= <strong className="text-[#17464F]">NT$500</strong>
          </p>
        </div>

        <div>
          <h4 className="font-bold text-[#17464F] mb-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483]" />
            加購升級（單路線 → 雙路線）
          </h4>
          <p className="text-[#33393C]/80 pl-3.5 mb-2">
            加購費用 = （你入學當時的「雙路線價格 - 單路線價格」）+ 500（手續費）
          </p>
          <p className="text-xs text-[#33393C]/60 pl-3.5 italic">
            重點：看你「當初下單入學」落在哪個價格階段，不是你申請加購當天的價格。而且因為有固定手續費，所以加購會略高於當期價差——如果你本來就高度可能需要雙線，越早直接選雙線越划算。
          </p>
        </div>
      </div>

      <div className="bg-[#F5F3ED] rounded-lg p-4 space-y-2 text-sm mb-4">
        <p className="font-semibold text-[#17464F]">例子 1 ｜你在「夢想試飛價」入學</p>
        <p className="text-xs text-[#33393C]/70">購買時間：2026/01/09 00:00:00 – 2026/01/22 23:59:59</p>
        <p className="text-[#33393C]/80">
          單 9,499／雙 12,999 → 價差 3,500
          <br />
          加購費用 = 3,500 + 500 = <strong className="text-[#17464F]">NT$4,000</strong>
        </p>
      </div>

      <div className="bg-[#F5F3ED] rounded-lg p-4 space-y-2 text-sm mb-4">
        <p className="font-semibold text-[#17464F]">例子 2 ｜你在「雲端巡航價」入學</p>
        <p className="text-xs text-[#33393C]/70">購買時間：2026/02/27 00:00:00 – 2026/03/12 23:59:59</p>
        <p className="text-[#33393C]/80">
          單 11,999／雙 16,399 → 價差 4,400
          <br />
          加購費用 = 4,400 + 500 = <strong className="text-[#17464F]">NT$4,900</strong>
        </p>
      </div>

      <button
        onClick={handleModalOpen}
        className="w-full sm:w-auto px-6 py-2.5 bg-[#17464F] text-white rounded-lg hover:bg-[#1a5561] transition-colors text-sm font-medium"
      >
        查看完整加購價差表
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
          onClick={handleModalClose}
        >
          <div
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto pb-20 md:pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-[#C9D7D4] p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#17464F]">加購價差表</h3>
              <button
                onClick={handleModalClose}
                className="w-8 h-8 rounded-full bg-[#F5F3ED] flex items-center justify-center hover:bg-[#C9D7D4] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-[#33393C]/80 mb-6">
                以下為所有價格階段的加購費用，找到你當初購買的時間區間，即可得知你的加購費用。
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F5F3ED]">
                      <th className="text-left p-3 font-semibold text-[#17464F]">入學付款日區間</th>
                      <th className="text-left p-3 font-semibold text-[#17464F]">價格階段</th>
                      <th className="text-right p-3 font-semibold text-[#17464F]">單路線</th>
                      <th className="text-right p-3 font-semibold text-[#17464F]">雙路線</th>
                      <th className="text-right p-3 font-semibold text-[#17464F]">價差</th>
                      <th className="text-right p-3 font-semibold text-[#D4B483]">加購費用</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C9D7D4]/30">
                    <tr className="hover:bg-[#F5F3ED]/50">
                      <td className="p-3 text-[#33393C]/80">2025/12/26 00:00:00 – 2026/01/08 23:59:59</td>
                      <td className="p-3 text-[#33393C]">公開招生啟動價</td>
                      <td className="p-3 text-right text-[#33393C]">8,499</td>
                      <td className="p-3 text-right text-[#33393C]">11,500</td>
                      <td className="p-3 text-right text-[#33393C]">3,001</td>
                      <td className="p-3 text-right font-semibold text-[#D4B483]">3,501</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3ED]/50">
                      <td className="p-3 text-[#33393C]/80">2026/01/09 00:00:00 – 2026/01/22 23:59:59</td>
                      <td className="p-3 text-[#33393C]">夢想試飛價</td>
                      <td className="p-3 text-right text-[#33393C]">9,499</td>
                      <td className="p-3 text-right text-[#33393C]">12,999</td>
                      <td className="p-3 text-right text-[#33393C]">3,500</td>
                      <td className="p-3 text-right font-semibold text-[#D4B483]">4,000</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3ED]/50">
                      <td className="p-3 text-[#33393C]/80">2026/01/23 00:00:00 – 2026/02/05 23:59:59</td>
                      <td className="p-3 text-[#33393C]">打包行李價</td>
                      <td className="p-3 text-right text-[#33393C]">9,999</td>
                      <td className="p-3 text-right text-[#33393C]">13,699</td>
                      <td className="p-3 text-right text-[#33393C]">3,700</td>
                      <td className="p-3 text-right font-semibold text-[#D4B483]">4,200</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3ED]/50">
                      <td className="p-3 text-[#33393C]/80">2026/02/06 00:00:00 – 2026/02/12 23:59:59</td>
                      <td className="p-3 text-[#33393C]">開票起飛價</td>
                      <td className="p-3 text-right text-[#33393C]">10,499</td>
                      <td className="p-3 text-right text-[#33393C]">14,299</td>
                      <td className="p-3 text-right text-[#33393C]">3,800</td>
                      <td className="p-3 text-right font-semibold text-[#D4B483]">4,300</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3ED]/50">
                      <td className="p-3 text-[#33393C]/80">2026/02/13 00:00:00 – 2026/02/19 23:59:59</td>
                      <td className="p-3 text-[#33393C]">最後登機口價</td>
                      <td className="p-3 text-right text-[#33393C]">10,999</td>
                      <td className="p-3 text-right text-[#33393C]">14,999</td>
                      <td className="p-3 text-right text-[#33393C]">4,000</td>
                      <td className="p-3 text-right font-semibold text-[#D4B483]">4,500</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3ED]/50">
                      <td className="p-3 text-[#33393C]/80">2026/02/20 00:00:00 – 2026/02/26 23:59:59</td>
                      <td className="p-3 text-[#33393C]">起飛早鳥價</td>
                      <td className="p-3 text-right text-[#33393C]">11,499</td>
                      <td className="p-3 text-right text-[#33393C]">15,699</td>
                      <td className="p-3 text-right text-[#33393C]">4,200</td>
                      <td className="p-3 text-right font-semibold text-[#D4B483]">4,700</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3ED]/50">
                      <td className="p-3 text-[#33393C]/80">2026/02/27 00:00:00 – 2026/03/12 23:59:59</td>
                      <td className="p-3 text-[#33393C]">雲端巡航價</td>
                      <td className="p-3 text-right text-[#33393C]">11,999</td>
                      <td className="p-3 text-right text-[#33393C]">16,399</td>
                      <td className="p-3 text-right text-[#33393C]">4,400</td>
                      <td className="p-3 text-right font-semibold text-[#D4B483]">4,900</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3ED]/50">
                      <td className="p-3 text-[#33393C]/80">2026/03/13 00:00:00 – 2026/03/19 23:59:59</td>
                      <td className="p-3 text-[#33393C]">高空穩定價</td>
                      <td className="p-3 text-right text-[#33393C]">12,499</td>
                      <td className="p-3 text-right text-[#33393C]">17,099</td>
                      <td className="p-3 text-right text-[#33393C]">4,600</td>
                      <td className="p-3 text-right font-semibold text-[#D4B483]">5,100</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3ED]/50">
                      <td className="p-3 text-[#33393C]/80">2026/03/20 00:00:00 – 2026/03/26 23:59:59</td>
                      <td className="p-3 text-[#33393C]">標準航程價</td>
                      <td className="p-3 text-right text-[#33393C]">12,999</td>
                      <td className="p-3 text-right text-[#33393C]">17,799</td>
                      <td className="p-3 text-right text-[#33393C]">4,800</td>
                      <td className="p-3 text-right font-semibold text-[#D4B483]">5,300</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3ED]/50">
                      <td className="p-3 text-[#33393C]/80">2026/03/27 00:00:00 – 2026/03/31 23:59:59</td>
                      <td className="p-3 text-[#33393C]">最終飛行價</td>
                      <td className="p-3 text-right text-[#33393C]">13,499</td>
                      <td className="p-3 text-right text-[#33393C]">18,499</td>
                      <td className="p-3 text-right text-[#33393C]">5,000</td>
                      <td className="p-3 text-right font-semibold text-[#D4B483]">5,500</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3ED]/50">
                      <td className="p-3 text-[#33393C]/80">2026/04/01 00:00:00 – 2026/04/09 23:59:59</td>
                      <td className="p-3 text-[#33393C]">全價啟程</td>
                      <td className="p-3 text-right text-[#33393C]">13,999</td>
                      <td className="p-3 text-right text-[#33393C]">19,199</td>
                      <td className="p-3 text-right text-[#33393C]">5,200</td>
                      <td className="p-3 text-right font-semibold text-[#D4B483]">5,700</td>
                    </tr>
                    <tr className="hover:bg-[#F5F3ED]/50">
                      <td className="p-3 text-[#33393C]/80">2026/04/10 00:00:00 之後</td>
                      <td className="p-3 text-[#33393C]">全價啟程</td>
                      <td className="p-3 text-right text-[#33393C]">13,999</td>
                      <td className="p-3 text-right text-[#33393C]">19,199</td>
                      <td className="p-3 text-right text-[#33393C]">5,200</td>
                      <td className="p-3 text-right font-semibold text-[#D4B483]">5,700</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-[#C9D7D4]/20 rounded-lg text-sm text-[#33393C]/80">
                <p className="font-semibold text-[#17464F] mb-2">💡 溫馨提醒</p>
                <p>加購費用固定為「當時價差 + NT$500 手續費」。如果你高度可能需要雙線，越早直接選擇雙線方案越划算。</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
