"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
import { calendarData } from "@/data/calendar"
import { instructors } from "@/data/instructors"
import type { Instructor } from "@/components/sections/instructors-section"

export function InstructorsGridSection() {
  const [selectedInstructor, setSelectedInstructor] = useState<typeof instructors[0] | null>(null)

  // 收集課表中所有講師名稱，並排除校長
  const calendarInstructorNames = new Set(
    calendarData.flatMap((week) => week.instructorNames)
  )
  const filteredInstructors = instructors.filter(
    (instructor) => calendarInstructorNames.has(instructor.name) && instructor.name !== "校長哈利"
  )

  // 計算需要多少個佔位卡片（目標 12 位講師）
  const placeholderCount = Math.max(0, 12 - filteredInstructors.length)

  // 取得校長資料
  const principal = instructors.find((i) => i.name === "校長哈利")

  return (
    <section id="instructors" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-teal mb-3 text-balance">
            導師陣容
          </h2>
          <p className="text-brand-text max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            一群真的在路上走的人，陪你打底、選方向、走路線
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredInstructors.map((instructor) => (
            <div
              key={instructor.name}
              className="flex flex-col items-center p-4 bg-brand-offwhite rounded-xl border border-brand-mist/50 hover:border-brand-gold hover:shadow-md transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedInstructor(instructor)}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 border-brand-gold/30 group-hover:border-brand-gold transition-colors mb-3">
                <Image
                  src={instructor.image || "/placeholder.svg"}
                  alt={instructor.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-sm font-semibold text-brand-teal text-center mb-1">
                {instructor.name}
              </h4>
              <p className="text-xs text-brand-text/80 text-center line-clamp-2 mb-2">
                {instructor.title}
              </p>
              <button className="text-xs text-brand-gold hover:text-brand-teal transition-colors font-medium">
                查看詳情
              </button>
            </div>
          ))}
          {/* 佔位卡片 */}
          {Array.from({ length: Math.min(placeholderCount, 3) }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="flex flex-col items-center justify-center p-4 bg-brand-offwhite/50 rounded-xl border-2 border-dashed border-brand-mist"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-brand-mist/30 flex items-center justify-center mb-3">
                <span className="text-3xl text-brand-mist">?</span>
              </div>
              <h4 className="text-sm font-medium text-brand-text/40 text-center">
                即將公佈
              </h4>
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-6">
          <p className="text-sm text-brand-gold font-medium">講師陣容持續更新中...</p>
        </div>

        {/* 校長介紹區塊 */}
        {principal && (
          <div className="mt-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-brand-teal" />
              <h3 className="text-xl sm:text-2xl font-bold text-brand-teal">校長介紹</h3>
              <div className="h-px w-12 bg-brand-teal" />
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-brand-mist/50 overflow-hidden">
                {/* Header with photo */}
                <div className="bg-gradient-to-br from-brand-teal to-brand-teal/80 pt-8 pb-16 px-6 text-center">
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                    <Image
                      src={principal.image || "/placeholder.svg"}
                      alt={principal.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">Harry</h3>
                  <p className="text-white/80 text-sm">DigitalNomadsTaiwan 創辦人暨執行長</p>
                </div>

                {/* Content */}
                <div className="px-6 py-6 -mt-8">
                  {/* 關於校長 */}
                  <div className="bg-brand-offwhite rounded-xl p-5 mb-5">
                    <h4 className="text-sm font-semibold text-brand-teal mb-3">關於校長</h4>
                    <p className="text-sm text-brand-text/80 leading-relaxed">
                      Harry 是數位遊牧台灣（DigitalNomadsTaiwan）創辦人暨執行長，也是遠距遊牧學院校長。畢業後，曾跨足不同產業與多元遠端工作角色，其中也包含跨國人資產業的第一線經驗。這段歷程讓他從產業端更早看見：遠距工作、全球人才流動與更彈性的職涯模式，正在快速崛起，並逐漸成為新世代的重要趨勢。
                    </p>
                    <p className="text-sm text-brand-text/80 leading-relaxed mt-3">
                      此後，他持續投入數位遊牧社群的經營、活動策劃與國際交流。也正因為在一次次真實的交流、相遇與陪伴中，看見許多人對自由職涯的嚮往、卡點與轉變，他更加確信：比起只提供靈感與想像，真正重要的，是一套能幫助人逐步行動、持續前進的學習路線。這也成為遠距遊牧學院持續發展的核心方向。
                    </p>
                    <p className="text-sm text-brand-text/80 leading-relaxed mt-3">
                      品牌成立以來，已累積舉辦超過 50 場線下活動，吸引超過 1800 人次付費參與，其中近一半來自口碑推薦。作為遠距遊牧學院校長，Harry 希望做的，不只是分享理念，而是陪伴更多人把對自由的想像，轉化成可以一步步開始的職涯路線。
                    </p>
                  </div>

                  {/* 職涯背景 */}
                  <div className="bg-brand-offwhite rounded-xl p-5 mb-5">
                    <h4 className="text-sm font-semibold text-brand-teal mb-3">職涯背景</h4>
                    <ul className="text-sm text-brand-text/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>數位遊牧台灣／創辦人暨執行長</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>遠距遊牧學院／創辦人兼校長</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>跨國人力資源外商 / 全遠端商務開發</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>新創加速器 / 遠端PM</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>科技新創 / 遠端外部營運顧問</span>
                      </li>
                    </ul>
                  </div>

                  {/* 數位遊牧相關經歷 */}
                  <div className="bg-brand-offwhite rounded-xl p-5">
                    <h4 className="text-sm font-semibold text-brand-teal mb-3">數位遊牧相關經歷</h4>
                    <ul className="text-sm text-brand-text/80 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>2025 Vietnam Nomad Fest／講者</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>2025 Kozarocks 遊牧對談台灣講者</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>2024 Japan Okinawa Nomad Resort／台灣宣傳大使</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>2024 Japan Colive Fukuoka／講者</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-gold mt-1">•</span>
                        <span>2024 Asian Nomad Alliance Summit／台灣代表</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 講師詳情 Modal */}
        <Dialog open={!!selectedInstructor} onOpenChange={() => setSelectedInstructor(null)}>
          <DialogPortal>
            <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
            <DialogContent className="max-w-lg bg-white p-0 overflow-hidden">
              {selectedInstructor && (
                <>
                  {/* Header with gradient */}
                  <div className="bg-gradient-to-br from-brand-teal to-brand-teal/80 pt-8 pb-16 px-6 text-center">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                      <Image
                        src={selectedInstructor.image || "/placeholder.svg"}
                        alt={selectedInstructor.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{selectedInstructor.name}</h3>
                    <p className="text-white/80 text-sm">{selectedInstructor.title}</p>
                  </div>

                  {/* Content */}
                  <div className="px-6 py-6 -mt-8">
                    <div className="bg-brand-offwhite rounded-xl p-5">
                      <h4 className="text-sm font-semibold text-brand-teal mb-3">背景介紹</h4>
                      <p className="text-sm text-brand-text/80 leading-relaxed whitespace-pre-line">
                        {selectedInstructor.background || "講師詳細資料即將更新..."}
                      </p>
                    </div>

                    {/* Social Links */}
                    {selectedInstructor.links && Object.keys(selectedInstructor.links).length > 0 && (
                      <div className="mt-4 flex justify-center gap-4">
                        {selectedInstructor.links.website && (
                          <a
                            href={selectedInstructor.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-brand-teal hover:text-brand-gold transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            網站
                          </a>
                        )}
                        {selectedInstructor.links.linkedin && (
                          <a
                            href={selectedInstructor.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-brand-teal hover:text-brand-gold transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            LinkedIn
                          </a>
                        )}
                        {selectedInstructor.links.instagram && (
                          <a
                            href={selectedInstructor.links.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-brand-teal hover:text-brand-gold transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Instagram
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </section>
  )
}
