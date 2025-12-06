"use client"

{
  /* SECTION 5 COURSE OUTLINE END - After showFullSchedule block */
}

{
  /* Selected Week Modal */
}
{
  selectedWeek && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={() => setSelectedWeek(null)}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSelectedWeek(null)}
          className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 text-xl font-bold z-10"
        >
          ×
        </button>

        <div className="p-6 pr-12">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={selectedWeek.instructorData?.image || "/placeholder.svg"}
              alt={selectedWeek.instructor}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-[#D4B483]/30"
            />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#17464F] px-3 py-1 rounded-full text-sm font-semibold text-white">
                  第 {selectedWeek.week} 週
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#17464F] mb-1">{selectedWeek.instructor}</h3>
              <p className="text-[#33393C] text-sm">{selectedWeek.instructorData?.title}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#17464F] mb-4 text-balance">{selectedWeek.title}</h2>
            <div className="w-full h-1 rounded-full bg-[#D4B483]"></div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-[#17464F] mb-3">課程目標</h4>
            <div className="bg-[#F5F3ED] p-4 rounded-xl">
              <p className="text-[#33393C] leading-relaxed">
                {selectedWeek.month === 1 &&
                  selectedWeek.week === 1 &&
                  "打開對數位遊牧生活的想像，理解不同型態的遠距人生可能樣貌。掌握多元收入模式，從自由接案、自媒體經營到被動收入。繪製專屬的遊牧起點地圖，找到屬於自己的第一步。"}
                {selectedWeek.month === 1 &&
                  selectedWeek.week === 2 &&
                  "掌握 AI 與自動化的實際應用，學會與 AI 有效溝通並設計串接流程，完成第一個「從對話到自動化」的完整任務。"}
                {selectedWeek.month === 1 &&
                  selectedWeek.week === 3 &&
                  "學會定位並經營個人品牌，設計內容架構，提升流量與轉化力，完成一篇具備爆紅潛力的作品。"}
                {selectedWeek.month === 1 &&
                  selectedWeek.week === 4 &&
                  "掌握短影片流量密碼，理解爆紅三要素，完成一支短影片，體驗從腳本到成片，建立內容規劃能力，規劃未來短影片腳本。"}
                {selectedWeek.month === 1 &&
                  selectedWeek.week === 5 &&
                  "學會將作品轉化為能銷售的方案，練習現場銷售話術與應對，完成第一個可推廣的接案方案。"}
                {selectedWeek.month === 2 &&
                  selectedWeek.week === 6 &&
                  "拓展國際視野，了解跨國企業工作的可能性，學習規劃跨國職涯並提升薪資談判力，從真實案例找到國際職涯突破點。"}
                {selectedWeek.month === 2 &&
                  selectedWeek.week === 7 &&
                  "優化 LinkedIn 個人檔案，提升能見度，打造專業形象與品牌，吸引企業與合作邀約，學會主動 + 被動並行策略，拓展高品質人脈，建立即時可用的 LinkedIn 實戰方法。"}
                {selectedWeek.month === 2 &&
                  selectedWeek.week === 8 &&
                  "精準分析 JD，掌握雇主需求，熟悉外商面試流程與關鍵環節，完成一份客製化履歷與 Cover Letter draft，模擬外商面試問答，展現關鍵能力。"}
                {selectedWeek.month === 2 &&
                  selectedWeek.week === 9 &&
                  "學會優化履歷，在國際獵頭眼中脫穎而出，掌握薪資談判技巧，提升談判成功率，了解跨國職缺申請流程並實際投遞，建立職涯成長策略，找到「下一步」。"}
                {selectedWeek.month === 3 &&
                  selectedWeek.week === 10 &&
                  "學會知識產品全景介紹，知識萃取技巧，快速驗證方法。"}
                {selectedWeek.month === 3 &&
                  selectedWeek.week === 11 &&
                  "制定旅居財務規劃表，掌握收支平衡，了解跨國移動中如何保持財務穩定，預備未來自由生活，降低財務焦慮。"}
                {selectedWeek.month === 3 &&
                  selectedWeek.week === 12 &&
                  "學會設計生活與工作 SOP，建立可持續的人生規劃，建立身心靈平衡，提升專注力與效能，學會自我覺察與有效溝通。"}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-[#17464F] mb-3">講師更多資訊</h4>
            <a
              href={selectedWeek.instructorData?.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#17464F] hover:bg-[#17464F]/80 px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-200"
            >
              更多講師資訊
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

{
  /* PRICING SECTION */
}
;<section id="pricing-section" className="py-16 sm:py-24 bg-[#17464F] relative overflow-hidden">
  <PricingSection />
</section>

{
  /* LIMITED OFFER SECTION */
}
<section className="py-16 sm:py-20 bg-gradient-to-br from-[#17464F] to-[#1a5561]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/95 backdrop-blur rounded-2xl p-8 sm:p-12 shadow-xl border border-[#C9D7D4]">
            <div className="flex justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#17464F] mb-4">本梯限定的優惠與名額</h3>

            <p className="text-[#33393C] mb-8 leading-relaxed max-w-2xl mx-auto">
              為了讓教學與陪跑品質維持在好的狀態，
              <br className="hidden sm:block" />
              每一梯次的名額與優惠都會做控管，以下是這一梯的安排：
            </p>

            <div className="bg-[#F5F3ED] rounded-xl p-6 mb-8 text-left max-w-xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-2 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#17464F]">早鳥專屬價格</span>
                    <span className="text-[#33393C]">：限時優惠倒數中，把握內部名單專屬折扣</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-2 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#17464F]">加贈共學社群延長權限</span>
                    <span className="text-[#33393C]">：前 3 個月課程後，再享後 3 個月社群陪伴與資源</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4B483] mt-2 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#17464F]">名額上限控管</span>
                    <span className="text-[#33393C]">：為維持教學品質，本梯名額有限，額滿即收班</span>
                  </div>
                </li>
              </ul>
            </div>

            <a
              href={getCheckoutURLWithTracking()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#17464F] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#0f3339] transition-all duration-300 shadow-lg"
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).trackInitiateCheckout) {
                  (window as any).trackInitiateCheckout(0)
                }
              }}
            >
              我要加入本梯
            </a>

            <p className="mt-8 text-sm text-[#33393C]/80 leading-relaxed max-w-lg mx-auto">
              如果你還在觀望，也可以先把問題整理下來，
              <br className="hidden sm:block" />
              在下方 FAQ 或{" "}
              <a
                href="https://www.instagram.com/travelwithwork_\
