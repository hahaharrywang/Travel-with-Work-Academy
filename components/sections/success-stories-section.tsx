"use client"

import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const successStories = [
  {
    id: "case-a",
    title: "案例 A｜從 0 到 1 的作品集突破",
    tags: ["#遠距遊牧學院"],
    content: [
      "加入之前，他完全沒有作品集，頂多只有幾個零散的 side project 想法，每次想到要投履歷或嘗試接案，就卡在：「我好像沒有什麼可以拿得出來。」",
      "在學院的實作任務裡，他跟著模板一步一步整理過去的經驗，完成第一個個人專案：寫清楚專案背景、自己做了什麼、最後產出與成效，排版成一份正式作品集，第一次勇敢地公開在網路上。",
    ],
    quote: "我第一次可以很有底氣地，把作品集連結貼在履歷跟訊息裡，不再只是說自己 '很努力'，而是讓成果自己說話。",
  },
  {
    id: "case-b",
    title: "案例 B｜開啟自媒體變現之路",
    tags: ["#遠距遊牧學院", "#自媒體接案線"],
    content: [
      "過去他一直有在發文、分享想法，卻從來沒有收集過電子報名單，也不知道要怎麼把內容變成真正的付費產品。",
      "在學院的課後任務中，他跟著步驟設計了第一個「電子報引導頁」：想清楚要服務的讀者、承諾對方會獲得什麼，設定好訂閱流程，開始穩定邀請 IG／社團的追蹤者留下 email。幾週後，他收到第一筆線上訂閱收入。金額不大，但對他來說是一個關鍵轉折：",
    ],
    quote: "原來真的有人願意為我的內容付費。那一刻我知道，自媒體不只是興趣，而是一條可以慢慢走下去的變現路。",
  },
  {
    id: "case-c",
    title: "案例 C｜第一次邊工作邊旅居",
    tags: ["#Journey", "#邊工作邊旅行"],
    content: [
      "一開始，他只是在社群活動裡聽別人分享清邁、峴港、福岡的故事，心裡想著：「好羨慕，但應該不會輪到我吧。」",
      "跟著學院同學一起，他安排了一次「一週旅居實驗」：白天在共工空間準時打卡上班，晚上跟同學一起吃飯、散步、探索城市與在地生活。回到台灣後，他很清楚自己適合什麼樣的旅居節奏：需要多早起、什麼樣的住宿環境、怎樣安排會議與時差，旅居不再只是想像中的夢，而是一個可以被規劃、被重複的生活選項。",
    ],
    quote: "以前覺得 '邊工作邊旅居' 是少數人的人生劇本，這次之後，我知道只是需要多一點準備和夥伴，而不是完全不可能。",
  },
]

export function SuccessStoriesSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F5F3ED]">
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
              <h3 className="text-lg font-bold text-[#17464F] mb-4">{story.title}</h3>

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
                    <h3 className="text-lg font-bold text-[#17464F] mb-4">{story.title}</h3>

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
