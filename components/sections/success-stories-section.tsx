"use client"

import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const successStories = [
  {
    id: "case-a",
    title: "案例 A｜從 0 到 1 的作品集突破",
    identity: "科技公司 PM，從沒公開過自己作品",
    tags: ["#遠距遊牧學院"],
    content: [
      "加入學院之前，我完全沒有作品集。頂多只有幾個零散的 side project 與想法。每次想到要投履歷或嘗試接案，就會卡在同一句話：「我好像沒有什麼可以拿得出來。」"
      "後來在學院的實作任務裡，我跟著專業框架一步一步整理自己的過去經驗，完成了第一個真正能「被展示」的個人專案：把專案背景寫清楚、我負責做了什麼、最後的產出與成效是什麼，並且整理成一份正式的作品集頁面，後來透過 vibe coding 工作坊，甚至做出了個人網頁。",
    ],
    quote: "我第一次可以很有底氣地，把作品集網站連結，貼在履歷跟訊息裡，不再只是說自己「會盡力完成工作」，而是讓成果自己說話。",
  },
  {
    id: "case-b",
    title: "案例 B｜開啟自媒體變現之路",
    identity: "邊上班邊經營 IG 的設計人",
    tags: ["#遠距遊牧學院", "#自媒體接案線"],
    content: [
      "以前我一直有在發文、分享想法，但我從來沒有收集過電子報名單，也不知道要怎麼把內容變成真正的付費產品。"
      "在學院的課後任務裡，我跟著步驟做了人生第一個「電子報引導頁」：先想清楚我想服務的讀者是誰、我可以承諾對方獲得什麼，接著把訂閱流程設定好，開始穩定邀請 IG／社團的追蹤者留下 email。",
    ],
    quote: "原來真的有人願意為我的內容付費，第一次打從心底覺得自媒體是一條可以慢慢累積變現的路，我會永遠記住這第一份線上收入。",
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
    quote: "旅居不再只是想像中的夢，而是一個可以被規劃、也可以被重複的生活選項。這次之後我才明白：它只是需要經驗與準備，透過社群夥伴的幫助下，其實沒這麼困難。",
  },
]

export function SuccessStoriesSection() {
  return (
    <section id="student-results" className="pt-16 sm:pt-24 pb-0 bg-[#F5F3ED]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#17464F] mb-6 text-balance">
            學員真實成果：把「想想看」變成做得到
          </h2>
          {/* Decorative gold line */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-0.5 bg-[#D4B483]"></div>
          </div>
          <p className="text-base sm:text-lg text-[#33393C] max-w-3xl mx-auto leading-relaxed">
            在遠距遊牧學院，學員不是只看完一堆影片，而是完成一個個具體行動：
            <br />
            有人從沒有作品集，到做出第一個 side
            project；有人開啟自媒體變現；有人第一次帶著工作出國旅居，找到了自己想過的生活樣子。
          </p>
        </div>

        {/* Small Title */}
        <div className="text-center mb-8">
          <p className="text-sm sm:text-base font-medium text-[#D4B483] tracking-wide">真實案例｜他們也是從零開始</p>
        </div>

        {/* Desktop: Grid Layout (lg and above) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8">
          {successStories.map((story) => (
            <Card
              key={story.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-[#C9D7D4] flex flex-col"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-xs font-medium bg-[#D4B483]/20 text-[#17464F] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#17464F] mb-3">{story.title}</h3>

              {/* Identity */}
              <p className="text-sm font-medium text-[#A06E56] mb-4 pb-3 border-b border-[#C9D7D4]">{story.identity}</p>

              {/* Content */}
              <div className="text-sm text-[#33393C] leading-relaxed space-y-3 mb-6 flex-grow">
                {story.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Quote */}
              <div className="mt-auto pt-4 border-t border-[#C9D7D4]">
                <div className="bg-[#F5F3ED] rounded-lg p-4 relative">
                  {/* Quote icon */}
                  <svg
                    className="absolute -top-2 -left-2 w-6 h-6 text-[#D4B483] opacity-50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                  <p className="text-sm text-[#17464F] font-medium italic leading-relaxed pl-4">{story.quote}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile/Tablet: Carousel (below lg) */}
        <div className="lg:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {successStories.map((story) => (
                <CarouselItem key={story.id} className="pl-4 md:basis-1/2">
                  <Card className="bg-white rounded-2xl p-6 shadow-sm border border-[#C9D7D4] h-full flex flex-col">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-3 py-1 text-xs font-medium bg-[#D4B483]/20 text-[#17464F] rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#17464F] mb-3">{story.title}</h3>

                    {/* Identity */}
                    <p className="text-sm font-medium text-[#A06E56] mb-4 pb-3 border-b border-[#C9D7D4]">
                      {story.identity}
                    </p>

                    {/* Content */}
                    <div className="text-sm text-[#33393C] leading-relaxed space-y-3 mb-6 flex-grow">
                      {story.content.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="mt-auto pt-4 border-t border-[#C9D7D4]">
                      <div className="bg-[#F5F3ED] rounded-lg p-4 relative">
                        {/* Quote icon */}
                        <svg
                          className="absolute -top-2 -left-2 w-6 h-6 text-[#D4B483] opacity-50"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                        </svg>
                        <p className="text-sm text-[#17464F] font-medium italic leading-relaxed pl-4">{story.quote}</p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
