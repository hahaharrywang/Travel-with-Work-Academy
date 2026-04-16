"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

const successStories = [
  {
    id: "case-a",
    title: "案例 A｜從 0 到 1 的作品集突破",
    identity: "科技公司 PM，從沒公開過自己作品",
    tags: ["#遠距遊牧學院"],
    content: [
      "加入學院之前，我在科技公司當了三年 PM，工作穩定、不算討厭，但每天就是通勤、開會、交報告。偶爾看到有人在海外遠距工作的分享，心裡會想「也許我也可以」，但想到自己完全沒有作品集——頂多只有幾個零散的 side project 與想法——每次想到要投履歷或嘗試接案，就卡在同一句話：「我好像沒有什麼可以拿得出來。」",
      "後來在學院的實作任務裡，我跟著專業框架一步一步整理自己的過去經驗，完成了第一個真正能「被展示」的個人專案：把專案背景寫清楚、我負責做了什麼、最後的產出與成效是什麼，並且整理成一份正式的作品集頁面，後來透過 vibe coding 工作坊，甚至做出了個人網頁。",
    ],
    quote:
      "我第一次可以很有底氣地，把作品集網站連結，貼在履歷跟訊息裡，不再只是說自己「會盡力完成工作」，而是讓成果自己說話。",
    currentStatus: [
      "已完成可投遞的作品集與個人網頁",
      "已開始對外投遞遠端職缺",
      "清楚知道下一個 90 天要做什麼",
    ],
  },
  {
    id: "case-b",
    title: "案例 B｜開啟接案變現之路",
    identity: "邊上班邊經營 IG 的設計人",
    tags: ["#遠距遊牧學院", "#接案線"],
    content: [
      "加入學院之前，我邊上班邊經營 IG，其實已經動了好一陣子。但做了半年，什麼都碰了一點，卻什麼都沒有真正做完——沒有穩定變現、也不知道下一步要加強哪裡。我一直有在發文、分享想法，但從來沒有收集過電子報名單，也不知道要怎麼把內容變成真正的付費產品。",
      "在學院的課後任務裡，我跟著步驟做了人生第一個「電子報引導頁」：先想清楚我想服務的讀者是誰、我可以承諾對方獲得什麼，接著把訂閱流程設定好，開始穩定邀請 IG／社團的追蹤者留下 email。",
      "兩週後，我收到了我的第一筆線上訂閱收入：30元，雖然不多，但收到當下我非常興奮",
    ],
    quote:
      "原來真的有人願意為我的內容付費，第一次打從心底覺得接案是一條可以慢慢累積變現的路，我會永遠記住這第一份線上收入。",
    currentStatus: [
      "已建立電子報訂閱頁與自動化流程",
      "已獲得第一筆線上訂閱收入",
      "持續累積付費內容產品線",
    ],
  },
  {
    id: "case-c",
    title: "案例 C｜第一次邊工作邊旅居",
    identity: "在台北工作 7 年、第一次帶著工作出國",
    tags: ["#Journey", "#邊工作邊旅行"],
    content: [
      "一開始我只是在網路上聽大家分享遊牧故事，心裡想著：「好羨慕，但應該不會輪到我吧。」",
      "因緣際會之下我跟著遊牧社群一起去了福岡，為自己安排了一次「一週旅居實驗」：白天大多時間還是要工作，不同的是，下班之後我有了新的選擇：晚上在異國街道散步、吃道地豚骨拉麵、探索城市。回到台灣後，我更清楚自己適合什麼樣的節奏——怎麼在旅途中面對未知、如何在探索與自律間取捨。",
    ],
    quote:
      "旅居不再只是想像中的夢，而是一個可以被規劃、也可以被重複的生活選項。這次之後我才明白：它只是需要經驗與準備，透過社群夥伴的幫助下，其實沒這麼困難。",
    currentStatus: [
      "已完成第一次海外旅居工作實驗",
      "已建立可重複的旅居工作節奏",
      "正在規劃下一趟 30 天長期旅居計畫",
    ],
  },
  {
    id: "case-d",
    title: "案例 D｜從「一直在想」到真的動起來",
    identity: "行銷公司企劃，工作第四年，每天都在幫別人做內容",
    tags: ["#接案"],
    content: [
      "加入學院之前，我每次看到「遠距工作」的貼文都會存起來，但存了一整個資料夾也沒用。我不是沒有想法，而是不知道從哪一步開始——看了很多人的分享，但總覺得他們的起點跟我不一樣。",
      "進學院之後，我第一次不是在收藏別人的故事，而是在寫自己的。我跟著任務完成了第一版服務定位、做了三次潛在客戶訪談、整理出一個真的可以對外講的 Offer 頁面。過程中我才發現，原來我不是沒有能力，只是從來沒有人幫我把這些能力「變成一個可以被看見的東西」。",
    ],
    quote:
      "以前我每次看到「遠距工作」的貼文都會存起來，但存了一整個資料夾也沒用。學院讓我第一次不是在收藏別人的故事，而是在寫自己的。",
    currentStatus: [
      "已完成個人服務定位與第一版 Offer 頁面",
      "完成 3 次潛在客戶市場調查",
      "建立每週固定產出節奏，不再只是「存貼文」",
    ],
  },
]

type Story = (typeof successStories)[number]

function StoryCard({ story, className = "", expanded, onToggle }: { story: Story; className?: string; expanded: boolean; onToggle: () => void }) {

  return (
    <Card className={`bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-brand-mist flex flex-col ${className}`}>
      {/* Title */}
      <h3 className="text-lg font-bold text-brand-teal mb-1">{story.title}</h3>

      {/* Identity */}
      <p className="text-sm font-medium text-brand-clay mb-2">{story.identity}</p>

      {/* Quote - always visible */}
      <div className="mb-3">
        <div className="bg-brand-offwhite rounded-lg p-3 relative">
          <svg
            className="absolute -top-2 -left-2 w-6 h-6 text-brand-gold opacity-50"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>
          <p className="text-sm text-brand-teal font-medium italic leading-normal pl-4">{story.quote}</p>
        </div>
      </div>

      {/* Expand divider - only when collapsed */}
      {!expanded && (
        <button onClick={onToggle} className="relative w-full flex items-center py-3 group cursor-pointer">
          <span className="flex-grow border-t border-dashed border-brand-gold/50 group-hover:border-brand-gold/80 transition-colors" />
          <span className="flex items-center gap-1.5 px-4 text-sm font-semibold text-brand-teal group-hover:text-brand-clay transition-colors whitespace-nowrap">
            {'展開完整心得與實踐行動項目'}
            <ChevronDown className="w-4 h-4 text-brand-gold" />
          </span>
          <span className="flex-grow border-t border-dashed border-brand-gold/50 group-hover:border-brand-gold/80 transition-colors" />
        </button>
      )}

      {/* Collapsible content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Content */}
        <div className="text-sm text-brand-text leading-normal space-y-1 flex-grow pt-1">
          {story.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Current Status */}
        {story.currentStatus && (
          <div className="mt-4 pt-4 border-t border-brand-mist">
            <p className="text-xs font-bold text-brand-teal mb-2 tracking-wide">{'現在狀態：'}</p>
            <ul className="space-y-1">
              {story.currentStatus.map((status, idx) => (
                <li key={idx} className="text-xs text-brand-text flex items-start gap-1.5">
                  <span className="text-brand-gold flex-shrink-0">{'✔'}</span>
                  <span>{status}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Collapse divider - at bottom of expanded content */}
        <button onClick={onToggle} className="relative w-full flex items-center py-2 mt-4 group cursor-pointer">
          <span className="flex-grow border-t border-brand-mist/60 group-hover:border-brand-mist transition-colors" />
          <span className="flex items-center gap-1.5 px-3 text-xs font-medium text-brand-text/50 group-hover:text-brand-text/70 transition-colors whitespace-nowrap">
            {'收合心得'}
            <ChevronDown className="w-3.5 h-3.5 rotate-180" />
          </span>
          <span className="flex-grow border-t border-brand-mist/60 group-hover:border-brand-mist transition-colors" />
        </button>
      </div>
    </Card>
  )
}

export function SuccessStoriesSection() {
  const [storiesExpanded, setStoriesExpanded] = useState(false)

  return (
    <section id="student-results" className="relative pt-16 sm:pt-24 pb-12 sm:pb-20 bg-brand-teal overflow-hidden">
      {/* Background decorations - 呼應 Hero 的金色圓圈 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] border border-brand-gold/15 rounded-full" />
        <div className="absolute -bottom-60 -left-40 w-[600px] h-[600px] border border-brand-gold/10 rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 text-balance">學員真實成果</h2>
          <p className="text-lg sm:text-xl font-medium text-brand-gold mb-6">因為加入了學院，開始有了不一樣。</p>
          {/* Decorative gold line */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-0.5 bg-brand-gold"></div>
          </div>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            在遠距遊牧學院，我們不是只上課看影片，而是完成一個個具體行動：
            <br />
            有人從沒有作品集，到做出第一個 side
            project；有人開啟接案變現；有人第一次帶著工作出國旅居，找到了自己想過的生活樣子。
          </p>
        </div>

        {/* All screens: Carousel with peek + dots */}
        <SuccessCarousel stories={successStories} expanded={storiesExpanded} onToggle={() => setStoriesExpanded(!storiesExpanded)} />
      </div>
    </section>
  )
}

/* ── Carousel with peek, dots & auto-hint (all screens) ── */

function SuccessCarousel({ stories, expanded, onToggle }: { stories: Story[]; expanded: boolean; onToggle: () => void }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Auto-hint: nudge right then snap back on first load
  useEffect(() => {
    if (!api) return
    const timer = setTimeout(() => {
      const engine = api as any
      // Scroll a tiny bit to hint, then snap back
      if (engine.scrollTo) {
        api.scrollNext()
        setTimeout(() => {
          api.scrollTo(0)
        }, 400)
      }
    }, 800)
    return () => clearTimeout(timer)
  }, [api])

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = useCallback(() => api?.scrollNext(), [api])

  return (
    <div className="relative">
      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-3 lg:-ml-4">
          {stories.map((story) => (
            <CarouselItem key={story.id} className="pl-3 lg:pl-4 basis-[85%] md:basis-[48%] lg:basis-[32%]">
              <StoryCard story={story} className="h-full" expanded={expanded} onToggle={onToggle} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Left/Right Navigation Arrows - Desktop */}
      <button
        onClick={scrollPrev}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-white shadow-md border border-brand-mist hover:bg-brand-offwhite hover:border-brand-gold/50 transition-all z-10"
        aria-label="上一個案例"
      >
        <ChevronLeft className="w-5 h-5 text-brand-teal" />
      </button>
      <button
        onClick={scrollNext}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-white shadow-md border border-brand-mist hover:bg-brand-offwhite hover:border-brand-gold/50 transition-all z-10"
        aria-label="下一個案例"
      >
        <ChevronRight className="w-5 h-5 text-brand-teal" />
      </button>

      {/* Navigation controls */}
      <div className="flex justify-center items-center gap-3 mt-6">
        {/* Mobile left arrow */}
        <button
          onClick={scrollPrev}
          className="lg:hidden flex w-8 h-8 items-center justify-center rounded-full bg-white shadow-sm border border-brand-mist hover:bg-brand-offwhite transition-all"
          aria-label="上一個案例"
        >
          <ChevronLeft className="w-4 h-4 text-brand-teal" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {Array.from({ length: count }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              aria-label={`前往案例 ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                idx === current
                  ? "w-6 h-2 bg-brand-gold"
                  : "w-2 h-2 bg-white/30 hover:bg-brand-gold/60"
              }`}
            />
          ))}
        </div>

        {/* Mobile right arrow */}
        <button
          onClick={scrollNext}
          className="lg:hidden flex w-8 h-8 items-center justify-center rounded-full bg-white shadow-sm border border-brand-mist hover:bg-brand-offwhite transition-all"
          aria-label="下一個案例"
        >
          <ChevronRight className="w-4 h-4 text-brand-teal" />
        </button>

        {/* Page indicator */}
        <span className="text-xs text-white/70 ml-1">{`${current + 1} / ${count}`}</span>
      </div>

      {/* Swipe hint for mobile */}
      <p className="lg:hidden text-center text-xs text-white/60 mt-2">{'左右滑動查看更多案例'}</p>
    </div>
  )
}
