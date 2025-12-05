"use client"

import { useState } from "react"

const Page = () => {
  const [highlightPopup, setHighlightPopup] = useState({ isOpen: false, title: "", subtitle: "", content: "" })
  return (
    <section className="py-16 sm:py-24 bg-[#F5F3ED]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#17464F] mb-6 text-balance">
            三大亮點，讓改變真的走起來
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1: 雙軌資源 */}
          <div className="bg-white/60 rounded-2xl border border-slate-200 p-6 md:p-7 shadow-sm flex flex-col gap-4">
            <div className="text-center">
              <h4 className="text-xl md:text-2xl font-bold text-[#17464F] mb-1">雙軌資源</h4>
              <p className="text-sm md:text-base text-[#D4B483] font-medium">副業增收 × 遠端上班</p>
            </div>
            {/* Desktop: show content directly */}
            <div className="hidden md:block text-sm md:text-base leading-relaxed text-slate-700">
              <p>
                自媒體接案線路協助你定位、製作接案作品集、市場調查、內容與流量；
                遠端上班線路幫你了解遠端求職市場、獵頭關係、優化履歷、LinkedIn、求職信、面試準備。你可以先選一條為主，也可以雙線並進，邊學邊試水溫。
              </p>
            </div>
            <button
              onClick={() =>
                setHighlightPopup({
                  isOpen: true,
                  title: "雙軌資源",
                  subtitle: "副業增收 × 遠端上班",
                  content:
                    "自媒體接案線路協助你定位、製作接案作品集、市場調查、內容與流量； 遠端上班線路幫你了解遠端求職市場、獵頭關係、優化履歷、LinkedIn、求職信、面試準備。你可以先選一條為主，也可以雙線並進，邊學邊試水溫。",
                })
              }
              className="md:hidden text-sm text-[#17464F] underline underline-offset-2 text-center hover:text-[#D4B483] transition-colors"
            >
              了解更多 →
            </button>
          </div>

          {/* Card 2: 行動導向設計 */}
          <div className="bg-white/60 rounded-2xl border border-slate-200 p-6 md:p-7 shadow-sm flex flex-col gap-4">
            <div className="text-center">
              <h4 className="text-xl md:text-2xl font-bold text-[#17464F] mb-1">行動導向設計</h4>
              <p className="text-sm md:text-base text-[#D4B483] font-medium">課後任務 × 實作工作坊</p>
            </div>
            {/* Desktop: show content directly */}
            <div className="hidden md:block text-sm md:text-base leading-relaxed text-slate-700">
              <p>
                每一堂課後，都有做得到、但有一點挑戰的行動任務：
                在發出一支影片貼文、進行市場調查、寫一封求職信、更新履歷、製作一個知識產品之前...會被先拆解成策略定位學習單等模板。
                還有實作工作坊，講師陪同把想法落地成操作與行動。
                你不用在繁忙的生活中還要自己猜下一步，只要跟著課後任務，把遠距上班或自媒體接案，
                循著一個一個可以完成的小步驟前進。
              </p>
            </div>
            <button
              onClick={() =>
                setHighlightPopup({
                  isOpen: true,
                  title: "行動導向設計",
                  subtitle: "課後任務 × 實作工作坊",
                  content:
                    "每一堂課後，都有做得到、但有一點挑戰的行動任務：在發出一支影片貼文、進行市場調查、寫一封求職信、更新履歷、製作一個知識產品之前...會被先拆解成策略定位學習單等模板。還有實作工作坊，講師陪同把想法落地成操作與行動。你不用在繁忙的生活中還要自己猜下一步，只要跟著課後任務，把遠距上班或自媒體接案，循著一個一個可以完成的小步驟前進。",
                })
              }
              className="md:hidden text-sm text-[#17464F] underline underline-offset-2 text-center hover:text-[#D4B483] transition-colors"
            >
              了解更多 →
            </button>
          </div>

          {/* Card 3: 社群支持 */}
          <div className="bg-white/60 rounded-2xl border border-slate-200 p-6 md:p-7 shadow-sm flex flex-col gap-4">
            <div className="text-center">
              <h4 className="text-xl md:text-2xl font-bold text-[#17464F] mb-1">社群支持</h4>
              <p className="text-sm md:text-base text-[#D4B483] font-medium">共學閒聊群 × LinkedIn群 × 線下聚會</p>
            </div>
            {/* Desktop: show content directly */}
            <div className="hidden md:block text-sm md:text-base leading-relaxed text-slate-700">
              <p>
                不會像補習班補課，一個人在房間裡看影片、做作業。同學會在固定時間出現在 Skool
                線上共學空間，分享提問與成果。透過線上同學會＆閒聊 Line
                群，分享每個月的酸甜苦辣，病結識志趣相投、可以一起成長的夥伴。 甚至第一次加入校友專屬 LinkedIn
                群，與校友連結。也可以每月參加線下遊牧小聚 or 遊牧之旅，與國內外不同文化背景、在遠距遊牧路上的同胞交流。
              </p>
            </div>
            <button
              onClick={() =>
                setHighlightPopup({
                  isOpen: true,
                  title: "社群支持",
                  subtitle: "共學閒聊群 × LinkedIn群 × 線下聚會",
                  content:
                    "不會像補習班補課，一個人在房間裡看影片、做作業。同學會在固定時間出現在 Skool 線上共學空間，分享提問與成果。透過線上同學會＆閒聊 Line 群，分享每個月的酸甜苦辣，並結識志趣相投、可以一起成長的夥伴。甚至第一次加入校友專屬 LinkedIn 群，與校友連結。也可以每月參加線下遊牧小聚 or 遊牧之旅，與國內外不同文化背景、在遠距遊牧路上的同胞交流。",
                })
              }
              className="md:hidden text-sm text-[#17464F] underline underline-offset-2 text-center hover:text-[#D4B483] transition-colors"
            >
              了解更多 →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
