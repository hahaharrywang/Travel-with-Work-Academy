// Calendar data types and constants for the course schedule

import { instructors } from "./instructors"
import type { Instructor } from "@/components/sections/instructors-section"

export interface CalendarInstructor {
  name: string
  image: string
  title: string
}

export interface CalendarWeek {
  id: number
  phase: string
  monthWeek: string
  type: string
  track: string
  title: string
  focusShort: string
  focusDetail: string
  instructorNames: string[] // Changed from instructors array to instructorNames string array
}

export const calendarData: CalendarWeek[] = [
  {
    id: 1,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 1",
    type: "學院功能｜開學典禮",
    track: "全體共同",
    title: "開學典禮 ＆ 遠距遊牧概論",
    focusShort: "把「我想過自由生活」變成一張可執行的 6 個月起跑線。",
    focusDetail:
      "核心內容\n• 認識遠距／接案／自媒體／雙軌的差異與常見路徑\n• 釐清你現在的限制條件、可用資源與可行策略\n• 設定本梯的學習節奏與社群參與方式（怎麼學、怎麼做、怎麼被支持）\n\n行動任務\n• 寫下你的「遠距目標一句話」＋目前最大卡點（1 句）",
    instructorNames: ["校長哈利"],
  },
  {
    id: 2,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 2",
    type: "共同必修",
    track: "全體共同",
    title: "AI & 自動化工具",
    focusShort: "用 AI + 自動化把日常工作變輕：做出你的第一個可運作流程。",
    focusDetail:
      "核心內容\n• 什麼工作適合交給 AI／什麼仍要自己做（避免用錯力）\n• 把「想法」變成「可執行流程」：從對話到跨工具串接\n• 以最小可用成果（MVP）為導向：先跑起來，再逐步優化\n\n行動任務\n• 以每週會重複做的情境（例如：表單回覆、整理名單、寄信通知）做出 1 個「能實際跑起來」的自動化流程（可簡單、但要能用）\n• 寫下你的「AI 使用規則」：哪些事交給 AI、哪些事一定自己確認",
    instructorNames: ["講師確認中"],
  },
  {
    id: 3,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 3",
    type: "路線必修 – 自媒線",
    track: "自媒體接案線",
    title: "自媒體接案變現地圖 & 目標設定",
    focusShort: "把「想接案／想做內容」變成可走的變現地圖與 90 天目標。",
    focusDetail:
      "核心內容\n• 盤點你可行的收入來源（不只接案：也包含多種商業可能）\n• 定義你「提供什麼價值」與「適合誰」的清晰版本\n• 把目標拆成可追蹤的指標＋每週固定節奏（讓努力不再散）\n\n行動任務\n• 列出可能性與優先順序，並設定成果指標\n• 了解自己的成長節奏",
    instructorNames: ["工具王阿璋"],
  },
  {
    id: 4,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 4",
    type: "路線必修 – 上班線",
    track: "遠端上班線",
    title: "遠端自由職涯藍圖 & 目標設定",
    focusShort: "把「想找遠端工作」變成職涯藍圖：目標職位＋90 天可落地計畫。",
    focusDetail:
      "核心內容\n• 釐清你適合的遠端職位方向與工作型態（不是越多越好）\n• 把求職變成一套「可持續的行動系統」：每週做什麼才會前進\n• 設定可追蹤的求職成果指標（讓焦慮變成可管理）\n\n行動任務\n• 列出可能性與優先順序，並設定成果指標\n• 了解自己的成長節奏",
    instructorNames: ["講師確認中"],
  },
  {
    id: 5,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 5",
    type: "學院功能",
    track: "全體共同",
    title: "交流 / 成果發表（月末）",
    focusShort: "用一次月末交流，把「進度」變成「成果」：拿回饋、校準下月。",
    focusDetail:
      "核心內容\n• 以展示取代空想：你做了什麼、產出了什麼、下一步是什麼\n• 用同儕回饋快速找盲點（少走彎路）\n• 更新下個月的承諾清單與行動節奏\n\n行動任務\n• 準備 3 分鐘成果分享（本月做了什麼＋拿出 1 個具體產出）\n• 寫下「下月承諾清單」3 項（可被驗收）\n• 提出 1 個你最需要被解的問題（讓社群幫你）",
    instructorNames: ["校長哈利"],
  },
  {
    id: 6,
    phase: "Phase 1 起步打底",
    monthWeek: "5 月 · Week 1",
    type: "共同必修",
    track: "全體共同",
    title: "知識變現",
    focusShort: "把你的專業變成可販售的雛形：從「我會」到「別人願意買」。",
    focusDetail:
      "核心內容\n• 釐清你的專業能解決誰的什麼問題（避免做成「自嗨內容」）\n• 把知識整理成可交付的產品雛形（先小、先快、先可賣）\n• 建立一個「價值說法」：讓別人聽懂、信任、願意採取下一步\n\n行動任務\n• 使用市場驗證過的知識產品框架，產出你的知識產品雛形",
    instructorNames: ["講師確認中"],
  },
  {
    id: 7,
    phase: "Phase 1 起步打底",
    monthWeek: "5 月 · Week 2",
    type: "路線必修 – 自媒線",
    track: "自媒體接案線",
    title: "接案作品集 & 市場調查",
    focusShort: "做出能成交的作品集骨架：讓陌生客戶快速理解並信任你的價值。",
    focusDetail:
      "核心內容\n• 作品集不只是展示：要能讓人「看懂你能帶來的結果」\n• 用輕量市場調查校準定位與價格想像（避免憑感覺）\n• 讓你的服務變得可被選擇：清楚、可比較、可下一步\n\n行動任務\n• 完善你的作品集架構\n• 完成一次市場觀察與調查",
    instructorNames: ["講師確認中"],
  },
  {
    id: 8,
    phase: "Phase 1 起步打底",
    monthWeek: "5 月 · Week 3",
    type: "路線必修 – 上班線",
    track: "遠端上班線",
    title: "LinkedIn 經營全攻略",
    focusShort: "把 LinkedIn 變成你的機會入口：被看見、被信任、被邀請。",
    focusDetail:
      "核心內容\n• 重新定位 LinkedIn：不只是履歷，而是你的專業曝光面\n• 讓你的頁面能清楚回答：你是誰、擅長什麼、能帶來什麼成果\n• 建立「可持續」的互動與曝光節奏\n\n行動任務\n• 加入學院專屬校友 LinkedIn 群\n• 更新你的 Headline / About（以職能＋成果導向描述）\n• 透過專業框架，讓人一眼理解你的價值，並制定行動節奏",
    instructorNames: ["謝雅筑 Ally"],
  },
  {
    id: 9,
    phase: "Phase 1 起步打底",
    monthWeek: "5 月 · Week 4",
    type: "學院功能",
    track: "全體共同",
    title: "交流 / 成果發表（月末）＋團體 QA",
    focusShort: "用月末展示＋QA，把卡點一次清掉：帶著清晰下一步進入下月。",
    focusDetail:
      "核心內容\n• 成果展示：把「做了很多」整理成「看得見的成果」\n• 團體 QA：集中解決共通問題（方向、節奏、策略取捨）\n• 更新目標與節奏，避免原地打轉\n\n行動任務\n• 準備 3 分鐘成果分享（本月做了什麼＋拿出 1 個具體產出）\n• 寫下「下月承諾清單」3 項（可被驗收）\n• 提出 1 個你最需要被解的問題（讓社群幫你）",
    instructorNames: ["校長哈利"],
  },
  {
    id: 10,
    phase: "Phase 2 出擊試水",
    monthWeek: "6 月 · Week 1",
    type: "學院功能（中期復盤）",
    track: "全體共同",
    title: "學習復盤 & 目標調整",
    focusShort: "把努力變成有效：復盤前兩個月，調整目標與每週節奏。",
    focusDetail:
      "核心內容\n• 檢視：你做了哪些行動？哪些真正帶來進度？\n• 找出：目前最大的行動瓶頸\n• 調整：把下月行動縮小到能穩定做到的節奏\n\n行動任務\n• 填寫你的復盤清單\n• 更新 90 天指標\n• 設定新的成長節奏",
    instructorNames: ["校長哈利"],
  },
  {
    id: 11,
    phase: "Phase 2 出擊試水",
    monthWeek: "6 月 · Week 2",
    type: "路線必修 – 自媒線",
    track: "自媒體接案線",
    title: "定位 & 內容企劃 & 內容變現框架",
    focusShort: "把定位變清楚、內容變可持續：做出你的 2 週內容企劃與變現方向。",
    focusDetail:
      "核心內容\n• 把「我想做很多」收斂成「我現在先做這一塊」\n• 不靠靈感硬撐，把內容產出變成可持續流程\n• 讓內容與變現接得起來：每篇內容都朝同一個目標前進\n\n行動任務\n• 產出具體策略與第一步產出",
    instructorNames: ["講師確認中"],
  },
  {
    id: 12,
    phase: "Phase 2 出擊試水",
    monthWeek: "6 月 · Week 3",
    type: "路線必修 – 上班線",
    track: "遠端上班線",
    title: "履歷、求職信修改",
    focusShort: "讓履歷「更像你」也「更像職缺要的人」：完成一版可投遞的文件。",
    focusDetail:
      "核心內容\n• 用專業流程校準你的履歷呈現\n• 讓經驗描述更有說服力：從「做過」變成「帶來過影響」\n• 建立可複用的求職信版本\n\n行動任務\n• 完成 1 版履歷更新\n• 完成 1 版求職信骨架\n• 獲得同儕回饋／社群檢視",
    instructorNames: ["講師確認中"],
  },
  {
    id: 13,
    phase: "Phase 2 出擊試水",
    monthWeek: "6 月 · Week 4",
    type: "學院功能",
    track: "全體共同",
    title: "交流 / 成果發表（月末）",
    focusShort: "用一次展示把成果定型：把作品／文件／內容帶出來，換到關鍵回饋。",
    focusDetail:
      "核心內容\n• 展示你的「可交付成果」（比講進度更有力量）\n• 找到下一個最值得做的 20%（最能推進成果的關鍵）\n• 校準節奏：讓下月行動更聚焦、更可持續\n\n行動任務\n• 準備 3 分鐘成果分享（本月做了什麼＋拿出 1 個具體產出）\n• 寫下「下月承諾清單」3 項（可被驗收）\n• 提出 1 個你最需要被解的問題（讓社群幫你）",
    instructorNames: ["校長哈利"],
  },
  {
    id: 14,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 1",
    type: "共同必修",
    track: "全體共同",
    title: "財務課程",
    focusShort: "把自由變「可負擔」：建立你的旅居財務規劃與風險底線。",
    focusDetail:
      "核心內容\n• 旅居與遠距生活的財務視角：收入、支出、現金流、風險底線\n• 設定你的「可持續」財務目標（不追求完美，追求能長跑）\n• 建立基本風險意識：遇到變動也不會一夜歸零\n\n行動任務\n• 盤點你目前的月固定支出＋最低生活底線\n• 設定 1 個 90 天財務目標（例：存到旅居預備金／建立緊急預備金）\n• 寫下你的風險規則 3 條（什麼情況要停止、要調整、要求援）",
    instructorNames: ["講師確認中"],
  },
  {
    id: 15,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 2",
    type: "路線必修 – 自媒線",
    track: "自媒體接案線",
    title: "短影音腳本 & 流量攻略",
    focusShort: "做出可量產的短影音節奏：完成腳本、拍攝到發佈的最小流程。",
    focusDetail:
      "核心內容\n• 讓短影音不只是「拍了」：而是朝你的定位與目標前進\n• 把製作流程簡化成你做得久的版本（可持續比完美重要）\n• 建立你的內容產出節奏：幫助完成「可上線」的作品\n\n行動任務\n• 透過有效框架，寫出特定主題不同的爆款邏輯\n• 完成短影音腳本大綱、一隻短影片並發布",
    instructorNames: ["講師確認中"],
  },
  {
    id: 16,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 3",
    type: "路線必修 – 上班線",
    track: "遠端上班線",
    title: "獵頭不告訴你的祕密：談薪與職涯跳躍策略",
    focusShort: "用市場視角升級你的求職策略：履歷、面試與談薪更有底氣。",
    focusDetail:
      "核心內容\n• 用企業／獵才角度理解：他們怎麼看「價值」與「風險」\n• 把你的經驗整理成更能說服人的敘事（面試更好講）\n• 談薪與職涯跳躍：建立你自己的區間與原則（不再憑感覺）\n\n行動任務\n• 整理 3 則可用的成果故事（可用於面試回答）\n• 寫下你的薪資期待區間＋3 個你最在意的條件\n• 更新履歷中 1 段最關鍵經歷（讓它更能支撐你的價值主張）",
    instructorNames: ["講師確認中"],
  },
  {
    id: 17,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 4",
    type: "學院活動",
    track: "全體共同",
    title: "共創專案說明會 & 成員募集",
    focusShort: "把學習帶進實戰：加入共創專案，和同伴一起做出可展示成果。",
    focusDetail:
      "核心內容\n• 共創專案的目標：用「協作」換到更快的成長與更深的連結\n• 專案如何運作：角色分工、節奏、交付方式（以可完成為原則）\n• 如何選題：選你能做、做得完、做完有用的題目\n\n行動任務\n• 選 1 個你想投入的方向（內容／產品／社群／求職／工具等皆可）\n• 填寫加入意願＋你能提供的技能／時間\n• 選定你在團隊的角色（例：PM／內容／設計／研究／BD／執行）",
    instructorNames: ["校長哈利"],
  },
  {
    id: 18,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 5",
    type: "學院功能",
    track: "全體共同",
    title: "交流 / 成果發表（月末）＋團體 QA",
    focusShort: "月末總整理：展示成果、解卡點、把共創與下月節奏定下來。",
    focusDetail:
      "核心內容\n• 成果展示：個人路線進度＋共創專案進度（讓努力可見）\n• 團體 QA：集中解決「下一步最關鍵」的問題\n• 更新承諾：把目標落到下月每週行動\n\n行動任務\n• 準備 3 分鐘成果分享（本月做了什麼＋拿出 1 個具體產出）\n• 寫下「下月承諾清單」3 項（可被驗收）\n• 提出 1 個你最需要被解的問題（讓社群幫你）",
    instructorNames: ["校長哈利"],
  },
  {
    id: 19,
    phase: "Phase 3 累積整合",
    monthWeek: "8 月 · Week 1",
    type: "學院功能",
    track: "全體共同",
    title: "學習復盤 & 目標調整",
    focusShort: "把後半段走穩：復盤到現在的成果，調整目標與共創投入方式。",
    focusDetail:
      "核心內容\n• 檢視你目前離目標差哪一段（不是更努力，是更對焦）\n• 調整每週節奏：保留有效行動、砍掉消耗行動\n• 共創專案校準：確保團隊能交付、能展示、能完成\n\n行動任務\n• 更新你的 90 天指標（保留／調整皆可，但要更可驗收）\n• 寫下「我接下來 4 週只做的 3 件事」\n• 共創專案確認：本月要交付的成果與你負責的部分",
    instructorNames: ["校長哈利"],
  },
  {
    id: 20,
    phase: "Phase 3 累積整合",
    monthWeek: "8 月 · Week 2",
    type: "學院功能",
    track: "共創專案",
    title: "共創專案週",
    focusShort: "進入實作衝刺：用團隊節奏完成一個可交付、可展示的成果版本。",
    focusDetail:
      "核心內容\n• 團隊協作節奏：討論 → 分工 → 交付 → 合併（以完成為優先）\n• 把成果做「可展示」：不追求大而全，追求能被看懂\n• 讓你在協作中累積：作品、案例、與可信任的人脈\n\n行動任務\n• 完成你負責的交付項目（文件／內容／頁面／研究／素材等）\n• 在團隊內更新一次進度（讓協作不中斷）\n• 產出「可展示版本」的必要素材（1 份也算）",
    instructorNames: ["校長哈利"],
  },
  {
    id: 21,
    phase: "Phase 3 累積整合",
    monthWeek: "8 月 · Week 3",
    type: "共同必修",
    track: "全體共同",
    title: "自我理解溝通 & 人生 SOP",
    focusShort: "把自由生活做成系統：建立你的個人 SOP，讓節奏可持續、不靠意志力。",
    focusDetail:
      "核心內容\n• 了解自己的運作方式：你在什麼情況下能穩定產出與保持狀態\n• 建立可複製的生活／工作節奏（週／月／季）\n• 為學院之後做準備：讓你的遠距人生能自己繼續跑\n\n行動任務\n• 寫出你的「人生系統說明書」簡版\n• 設計 1 份你的每週 SOP（固定做的 3 件事）\n• 設定「下一個 90 天」的可持續行動計畫（不用多，但要做得到）",
    instructorNames: ["講師確認中"],
  },
  {
    id: 22,
    phase: "Phase 3 累積整合",
    monthWeek: "8 月 · Week 4",
    type: "彈性週",
    track: "全體共同",
    title: "彈性週：補課 / 補作業 / 個人衝刺",
    focusShort: "給你一週把進度補齊：把欠的交付物做完，讓後段成果更完整。",
    focusDetail:
      "核心內容\n• 補齊未完成交付物（作品／履歷／頁面／內容／共創任務）\n• 一對一同儕互助（交換回饋、交換資源）\n• 把成果整理成「可展示」版本\n\n行動任務\n• 從清單中選 1–2 個最重要的未完成項目完成\n• 安排 1 次同儕互助（互改作品／互改履歷／互看內容）\n• 整理 1 份可展示成果（最小版本即可）",
    instructorNames: ["校長哈利"],
  },
  {
    id: 23,
    phase: "Phase 3 累積整合",
    monthWeek: "9 月 · Week 1",
    type: "學院功能",
    track: "全體共同",
    title: "全體期末成果發表會＋學員分享＋未來機會",
    focusShort: "把你這 6 個月的改變做成成果舞台：展示、分享，並銜接下一步機會。",
    focusDetail:
      "核心內容\n• 成果發表：讓外部也看得懂你做到了什麼（不是只有你自己懂）\n• 學員分享：把路徑與方法說成可複製的啟發（不曝露細節）\n• 銜接資源：把你導向後續實戰與機會入口（社群／活動／合作）\n\n行動任務\n• 準備 1 份期末成果展示（作品／履歷＋投遞成果／內容成果／共創成果）\n• 寫一段 60 秒自我介紹：你是誰＋你做出什麼成果＋你想往哪走\n• 列出你下一步要銜接的資源（至少 1 項）",
    instructorNames: ["校長哈利"],
  },
  {
    id: 24,
    phase: "Phase 3 累積整合",
    monthWeek: "9 月 · Week 2-3",
    type: "學院功能",
    track: "全體共同",
    title: "結業收束週 ＆ 結業典禮",
    focusShort: "把收穫帶走、把節奏留下：完成結業回顧，設定學院後的 90 天計畫。",
    focusDetail:
      "核心內容\n• 收束學習：整理你最有效的做法與最該避免的坑\n• 社群收束：把你要留下的連結留下（人比方法更重要）\n• 下一段計畫：讓學院結束後仍能持續推進\n• 結業儀式：確認你完成的里程碑與變化\n• 校友銜接：把你接到後續活動與實戰機會\n• 讓承諾延續：把「想做」變成「我會繼續做」\n\n行動任務\n• 完成結業回顧（3 個收穫＋3 個改進＋1 個下一步承諾）\n• 寫下你「學院後 90 天」的最小行動節奏（每週固定 2–3 件事）\n• 選 1 位同學建立「互相追蹤」機制（定期 check-in）\n• 寫下你的結業宣言（我接下來 90 天要做到什麼）\n• 整理你最想持續投入的方向（上班線／自媒線／雙軌其一）\n• 確認你要參與的校友節奏（以你做得到為準）",
    instructorNames: ["校長哈利"],
  },
]

// Helper functions for calendar filtering
export const getPhaseColor = (phase: string) => {
  if (phase.includes("Phase 1")) return { bg: "bg-[#D4B483]/20", text: "text-[#D4B483]", border: "border-[#D4B483]" }
  if (phase.includes("Phase 2")) return { bg: "bg-[#17464F]/20", text: "text-[#17464F]", border: "border-[#17464F]" }
  if (phase.includes("Phase 3")) return { bg: "bg-[#A06E56]/20", text: "text-[#A06E56]", border: "border-[#A06E56]" }
  return { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" }
}

export const getTrackColor = (track: string) => {
  if (track === "遠端上班線") return { bg: "bg-[#17464F]", text: "text-white" }
  if (track === "自媒體接案線") return { bg: "bg-[#D4B483]", text: "text-white" }
  return { bg: "bg-gray-500", text: "text-white" }
}

export const filterCalendarData = (data: CalendarWeek[], phaseFilter: string, trackFilter: string): CalendarWeek[] => {
  return data.filter((week) => {
    const phaseMatch = phaseFilter === "全部" || week.phase === phaseFilter
    const trackMatch =
      trackFilter === "雙軌" ||
      (trackFilter === "遠端上班" &&
        (week.track === "遠端上班線" || week.track === "全體共同" || week.track === "共創專案")) ||
      (trackFilter === "自媒體接案" &&
        (week.track === "自媒體接案線" || week.track === "全體共同" || week.track === "共創專案"))
    return phaseMatch && trackMatch
  })
}

export const getInstructorsByNames = (names: string[]): Instructor[] => {
  return names.map((name) => {
    const instructor = instructors.find((i) => i.name === name)
    if (!instructor) {
      // Return placeholder for instructors not in database
      return {
        name: name,
        title: "本梯次講師將陸續公布",
        image: "/images/academy-logo-placeholder.png",
        link: "",
        background: "",
        links: {},
      }
    }
    return instructor
  })
}
