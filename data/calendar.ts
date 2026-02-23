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
  // ===== 5 月 =====
  {
    id: 1,
    phase: "Phase 1 起步打底",
    monthWeek: "5 月 · Week 1",
    type: "成長節奏",
    track: "全體共同",
    title: "開學典禮 & 遠距遊牧概論",
    focusShort: "月初第一堂，大家對齊期待；釐清「上班線／接案線／雙軌」差異，畫出你的起跑線。",
    focusDetail:
      "核心內容\n• 認識遠距／接案／自媒體／雙軌的差異與常見路徑\n• 釐清你現在的限制條件、可用資源與可行策略\n• 設定本梯的學習節奏與社群參與方式（怎麼學、怎麼做、怎麼被支持）\n\n行動任務\n• 寫下你的「遠距目標一句話」＋目前最大卡點（1 句）",
    instructorNames: ["校長哈利"],
  },
  {
    id: 2,
    phase: "Phase 1 起步打底",
    monthWeek: "5 月 · Week 2",
    type: "路線必修 – 接案線 1",
    track: "接案線",
    title: "接案變現地圖 & 目標設定",
    focusShort: "把「想接案／想做內容」變成可走的變現地圖與 90 天目標。",
    focusDetail:
      "核心內容\n• 盤點你可行的收入來源（不只接案：也包含多種商業可能）\n• 定義你「提供什麼價值」與「適合誰」的清晰版本\n• 把目標拆成可追蹤的指標＋每週固定節奏（讓努力不再散）\n\n行動任務\n• 列出可能性與優先順序，並設定成果指標\n• 了解自己的成長節奏",
    instructorNames: ["講師確認中"],
  },
  {
    id: 3,
    phase: "Phase 1 起步打底",
    monthWeek: "5 月 · Week 3",
    type: "路線必修 – 上班線 1",
    track: "遠端上班線",
    title: "遠端上班職涯藍圖 & 目標設定",
    focusShort: "把「想找遠端工作」變成職涯藍圖：目標職位＋90 天可落地計畫。",
    focusDetail:
      "核心內容\n• 釐清你適合的遠端職位方向與工作型態（不是越多越好）\n• 把求職變成一套「可持續的行動系統」：每週做什麼才會前進\n• 設定可追蹤的求職成果指標（讓焦慮變成可管理）\n\n行動任務\n• 列出可能性與優先順序，並設定成果指標\n• 了解自己的成長節奏",
    instructorNames: ["講師確認中"],
  },
  {
    id: 4,
    phase: "Phase 1 起步打底",
    monthWeek: "5 月 · Week 4",
    type: "成長節奏",
    track: "全體共同",
    title: "交流／成果發表（月末）",
    focusShort: "用一次月末交流，把「進度」變成「成果」：拿回饋、校準下月。",
    focusDetail:
      "核心內容\n• 官方交流作業分享會\n• 同學會\n• 校長 AMA\n\n行動任務\n• 準備 3 分鐘成果分享（本月做了什麼＋拿出 1 個具體產出）\n• 寫下「下月承諾清單」3 項（可被驗收）\n• 提出 1 個你最需要被解的問題（讓社群幫你）",
    instructorNames: ["校長哈利"],
  },
  // ===== 6 月 =====
  {
    id: 5,
    phase: "Phase 1 起步打底",
    monthWeek: "6 月 · Week 1",
    type: "共同必修 1",
    track: "全體共同",
    title: "AI & 自動化工具學習思維",
    focusShort: "用 AI + 自動化把日常工作變輕：做出你的第一個可運作流程。",
    focusDetail:
      "核心內容\n• 什麼工作適合交給 AI／什麼仍要自己做（避免用錯力）\n• 把「想法」變成「可執行流程」：從對話到跨工具串接\n• 以最小可用成果（MVP）為導向：先跑起來，再逐步優化\n\n行動任務\n• 以每週會重複做的情境做出 1 個「能實際跑起來」的自動化流程\n• 寫下你的「AI 使用規則」：哪些事交給 AI、哪些事一定自己確認",
    instructorNames: ["林上哲"],
  },
  {
    id: 6,
    phase: "Phase 1 起步打底",
    monthWeek: "6 月 · Week 2",
    type: "路線必修 – 接案線 2",
    track: "接案線",
    title: "定位、接案 Offer",
    focusShort: "把定位收斂、Offer 做清楚：讓陌生客戶快速理解並信任你的價值。",
    focusDetail:
      "核心內容\n• 把「我想做很多」收斂成「我現在先做這一塊」\n• 用輕量市場調查校準定位與價格想像（避免憑感覺）\n• 讓你的服務變得可被選擇：清楚、可比較、可下一步\n\n行動任務\n• 完善你的接案 Offer 架構\n• 完成一次市場觀察與調查",
    instructorNames: ["西打藍"],
  },
  {
    id: 7,
    phase: "Phase 1 起步打底",
    monthWeek: "6 月 · Week 3",
    type: "路線必修 – 上班線 2",
    track: "遠端上班線",
    title: "LinkedIn 經營全攻略",
    focusShort: "把 LinkedIn 變成你的機會入口：被看見、被信任、被邀請。",
    focusDetail:
      "核心內容\n• 重新定位 LinkedIn：不只是履歷，而是你的專業曝光面\n• 讓你的頁面能清楚回答：你是誰、擅長什麼、能帶來什麼成果\n• 建立「可持續」的互動與曝光節奏\n\n行動任務\n• 加入學院專屬校友 LinkedIn 群\n• 更新你的 Headline / About（以職能＋成果導向描述）\n• 透過專業框架，讓人一眼理解你的價值，並制定行動節奏",
    instructorNames: ["講師確認中"],
  },
  {
    id: 8,
    phase: "Phase 1 起步打底",
    monthWeek: "6 月 · Week 4",
    type: "成長節奏",
    track: "全體共同",
    title: "交流／成果發表（月末）＋團體 QA",
    focusShort: "用月末展示＋QA，把卡點一次清掉：帶著清晰下一步進入下月。",
    focusDetail:
      "核心內容\n• 官方交流作業分享會\n• 同學會\n• 校長 AMA\n• 晚上講師團體 QA\n\n行動任務\n• 準備 3 分鐘成果分享（本月做了什麼＋拿出 1 個具體產出）\n• 寫下「下月承諾清單」3 項（可被驗收）\n• 提出 1 個你最需要被解的問題（讓社群幫你）",
    instructorNames: ["校長哈利"],
  },
  // ===== 7 月 =====
  {
    id: 9,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 1",
    type: "共同必修 2",
    track: "全體共同",
    title: "自我理解溝通 & 人生 SOP",
    focusShort: "把行動變成固定節奏：週／月／季，整理「學院結束後，我的生活怎麼繼續跑」。",
    focusDetail:
      "核心內容\n• 了解自己的運作方式：你在什麼情況下能穩定產出與保持狀態\n• 建立可複製的生活／工作節奏（週／月／季）\n• 為學院之後做準備：讓你的遠距人生能自己繼續跑\n\n行動任務\n• 寫出你的「人生系統說明書」簡版\n• 設計 1 份你的每週 SOP（固定做的 3 件事）\n• 設定「下一個 90 天」的可持續行動計畫",
    instructorNames: ["講師確認中"],
  },
  {
    id: 10,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 2",
    type: "路線必修 – 接案線 3",
    track: "接案線",
    title: "社群 & 內容",
    focusShort: "不靠靈感硬撐，把內容產出變成可持續流程，用 AI 幫忙企劃、標題、開頭。",
    focusDetail:
      "核心內容\n• 讓內容與變現接得起來：每篇內容都朝同一個目標前進\n• 不靠靈感硬撐，把內容產出變成可持續流程\n• 用 AI 輔助內容企劃、標題、開頭等\n\n行動任務\n• 產出具體內容策略與第一步產出",
    instructorNames: ["講師確認中"],
  },
  {
    id: 11,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 2（週日）",
    type: "學院功能（中期復盤）",
    track: "全體共同",
    title: "學習復盤 & 目標調整 Workshop",
    focusShort: "把努力變成有效：復盤前兩個月，調整目標與每週節奏。",
    focusDetail:
      "核心內容\n• 檢視：你做了哪些行動？哪些真正帶來進度？\n• 找出：目前最大的行動瓶頸\n• 調整：把下月行動縮小到能穩定做到的節奏\n\n行動任務\n• 填寫你的復盤清單\n• 更新 90 天指標\n• 設定新的成長節奏",
    instructorNames: ["校長哈利"],
  },
  {
    id: 12,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 3",
    type: "路線必修 – 上班線 3",
    track: "遠端上班線",
    title: "履歷、求職信秘笈",
    focusShort: "讓履歷「更像你」也「更像職缺要的人」：延續 AI 課，馬上應用在履歷。",
    focusDetail:
      "核心內容\n• 用專業流程校準你的履歷呈現\n• 讓經驗描述更有說服力：從「做過」變成「帶來過影響」\n• 建立可複用的求職信版本\n• 延續 AI 課程所學，直接應用在履歷撰寫\n\n行動任務\n• 完成 1 版履歷更新\n• 完成 1 版求職信骨架\n• 獲得同儕回饋／社群檢視",
    instructorNames: ["謝雅筑 Ally"],
  },
  {
    id: 13,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 4",
    type: "共同必修 3",
    track: "全體共同",
    title: "自媒體收入藍圖",
    focusShort: "把專業變成可販售的雛形：適用上班線＋接案線的商業化／知識變現技能。",
    focusDetail:
      "核心內容\n• 釐清你的專業能解決誰的什麼問題（避免做成「自嗨內容」）\n• 把知識整理成可交付的產品雛形（先小、先快、先可賣）\n• 建立一個「價值說法」：讓別人聽懂、信任、願意採取下一步\n\n行動任務\n• 使用市場驗證過的知識產品框架，產出你的知識產品雛形",
    instructorNames: ["工具王阿璋"],
  },
  {
    id: 14,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 5",
    type: "成長節奏",
    track: "全體共同",
    title: "交流／成果發表（月末）",
    focusShort: "用一次展示把成果定型：把作品／文件／內容帶出來，換到關鍵回饋。",
    focusDetail:
      "核心內容\n• 官方交流作業分享會\n• 同學會\n• 校長 AMA\n\n行動任務\n• 準備 3 分鐘成果分享（本月做了什麼＋拿出 1 個具體產出）\n• 寫下「下月承諾清單」3 項（可被驗收）\n• 提出 1 個你最需要被解的問題（讓社群幫你）",
    instructorNames: ["校長哈利"],
  },
  // ===== 8 月 =====
  {
    id: 15,
    phase: "Phase 2 出擊試水",
    monthWeek: "8 月 · Week 1",
    type: "成長節奏",
    track: "全體共同",
    title: "學習復盤 & 目標調整",
    focusShort: "把後半段走穩：復盤到現在的成果，調整目標與投入方式。",
    focusDetail:
      "核心內容\n• 檢視你目前離目標差哪一段（不是更努力，是更對焦）\n• 調整每週節奏：保留有效行動、砍掉消耗行動\n• 共創專案週六啟動會議\n\n行動任務\n• 更新你的 90 天指標（保留／調整皆可，但要更可驗收）\n• 寫下「我接下來 4 週只做的 3 件事」",
    instructorNames: ["校長哈利"],
  },
  {
    id: 16,
    phase: "Phase 2 出擊試水",
    monthWeek: "8 月 · Week 2",
    type: "路線必修 – 接案線 4",
    track: "接案線",
    title: "接案的永續與擴大",
    focusShort: "讓接案不只是「有案做」而是「做得久」：可搭配短影音剪輯選修 Workshop。",
    focusDetail:
      "核心內容\n• 把接案從「等案」變「選案」：建立穩定的案源管道\n• 讓你的收入結構多元化（不只靠一種收入）\n• 可搭配短影音剪輯選修 Workshop\n\n行動任務\n• 檢視目前的案源結構，找出最有潛力的擴大方向\n• 建立可複用的接案流程 SOP",
    instructorNames: ["講師確認中"],
  },
  {
    id: 17,
    phase: "Phase 2 出擊試水",
    monthWeek: "8 月 · Week 3",
    type: "路線必修 – 上班線 4",
    track: "遠端上班線",
    title: "面試談薪 & 留任策略",
    focusShort: "用市場視角升級你的求職策略：可以繼續用 AI 課程教的 prompt 套用。",
    focusDetail:
      "核心內容\n• 用企業／獵才角度理解：他們怎麼看「價值」與「風險」\n• 把你的經驗整理成更能說服人的敘事（面試更好講）\n• 談薪與留任策略：建立你自己的區間與原則（不再憑感覺）\n\n行動任務\n• 整理 3 則可用的成果故事（可用於面試回答）\n• 寫下你的薪資期待區間＋3 個你最在意的條件\n• 更新履歷中 1 段最關鍵經歷",
    instructorNames: ["講師確認中"],
  },
  {
    id: 18,
    phase: "Phase 2 出擊試水",
    monthWeek: "8 月 · Week 4",
    type: "成長節奏",
    track: "全體共同",
    title: "交流／成果發表（月末）＋團體 QA",
    focusShort: "月末總整理：展示成果、解卡點，共創專案成員募集＋校長 AMA。",
    focusDetail:
      "核心內容\n• 官方交流作業分享會\n• 共創專案說明會 & 成員募集\n• 校長 AMA\n• 晚上講師團體 QA\n\n行動任務\n• 準備 3 分鐘成果分享（本月做了什麼＋拿出 1 個具體產出）\n• 寫下「下月承諾清單」3 項（可被驗收）\n• 提出 1 個你最需要被解的問題（讓社群幫你）",
    instructorNames: ["校長哈利"],
  },
  // ===== 9 月 =====
  {
    id: 19,
    phase: "Phase 3 累積整合",
    monthWeek: "9 月 · Week 1",
    type: "共同必修 4",
    track: "全體共同",
    title: "旅居財務課程",
    focusShort: "把自由變「可負擔」：建立你的旅居財務規劃與風險底線。",
    focusDetail:
      "核心內容\n• 旅居與遠距生活的財務視角：收入、支出、現金流、風險底線\n• 設定你的「可持續」財務目標（不追求完美，追求能長跑）\n• 建立基本風險意識：遇到變動也不會一夜歸零\n• 共創專案週六、週日同步進行\n\n行動任務\n• 盤點你目前的月固定支出＋最低生活底線\n• 設定 1 個 90 天財務目標\n• 寫下你的風險規則 3 條",
    instructorNames: ["講師確認中"],
  },
  {
    id: 20,
    phase: "Phase 3 累積整合",
    monthWeek: "9 月 · Week 2",
    type: "成長節奏",
    track: "全體共同",
    title: "共創專案大會議",
    focusShort: "進入實作衝刺：用團隊節奏完成一個可交付、可展示的成果版本。",
    focusDetail:
      "核心內容\n• 共創專案：讓同學有機會實際透過協作，認識彼此、加深連結\n• 團隊協作節奏：討論 → 分工 → 交付 → 合併（以完成為優先）\n• 把成果做「可展示」：不追求大而全，追求能被看懂\n\n行動任務\n• 完成你負責的交付項目\n• 在團隊內更新一次進度\n• 產出「可展示版本」的必要素材",
    instructorNames: ["校長哈利"],
  },
  {
    id: 21,
    phase: "Phase 3 累積整合",
    monthWeek: "9 月 · Week 3",
    type: "彈性週",
    track: "全體共同",
    title: "彈性課程",
    focusShort: "屆時根據學員需求彈性安排講師或活動。",
    focusDetail:
      "核心內容\n• 根據學員需求彈性安排講師或活動\n• 補齊未完成交付物（作品／履歷／頁面／內容／共創任務）\n• 一對一同儕互助（交換回饋、交換資源）\n\n行動任務\n• 從清單中選 1-2 個最重要的未完成項目完成\n• 安排 1 次同儕互助\n• 整理 1 份可展示成果",
    instructorNames: ["校長哈利"],
  },
  {
    id: 22,
    phase: "Phase 3 累積整合",
    monthWeek: "9 月 · Week 4",
    type: "學院功能",
    track: "全體共同",
    title: "全體期末成果發表會＋學員分享＋未來機會銜接",
    focusShort: "把你這 5 個月的改變做成成果舞台：展示、分享，並銜接 Journey／Job Board／城市夥伴等。",
    focusDetail:
      "核心內容\n• 成果發表：讓外部也看得懂你做到了什麼（不是只有你自己懂）\n• 學員分享：把路徑與方法說成可複製的啟發\n• 銜接資源：Journey／Job Board／城市夥伴等後續機會\n\n行動任務\n• 準備 1 份期末成果展示（作品／履歷＋投遞成果／內容成果／共創成果）\n• 寫一段 60 秒自我介紹：你是誰＋你做出什麼成果＋你想往哪走\n• 列出你下一步要銜接的資源（至少 1 項）",
    instructorNames: ["校長哈利"],
  },
  {
    id: 23,
    phase: "Phase 3 累積整合",
    monthWeek: "9 月 · Week 5",
    type: "學院功能",
    track: "全體共同",
    title: "結業典禮",
    focusShort: "把收穫帶走、把節奏留下：完成結業回顧，設定學院後的 90 天計畫。",
    focusDetail:
      "核心內容\n• 收束學習：整理你最有效的做法與最該避免的坑\n• 社群收束：把你要留下的連結留下（人比方法更重要）\n• 結業儀式：確認你完成的里程碑與變化\n• 校友銜接：把你接到後續活動與實戰機會\n\n行動任務\n• 完成結業回顧（3 個收穫＋3 個改進＋1 個下一步承諾）\n• 寫下你「學院後 90 天」的最小行動節奏（每週固定 2-3 件事）\n• 選 1 位同學建立「互相追蹤」機制（定期 check-in）\n• 寫下你的結業宣言",
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
  if (track === "接案線") return { bg: "bg-[#D4B483]", text: "text-white" }
  return { bg: "bg-gray-500", text: "text-white" }
}

export const filterCalendarData = (data: CalendarWeek[], phaseFilter: string, trackFilter: string): CalendarWeek[] => {
  return data.filter((week) => {
    const phaseMatch = phaseFilter === "全部" || week.phase === phaseFilter
    const trackMatch =
      trackFilter === "雙軌" ||
      (trackFilter === "遠端上班" &&
        (week.track === "遠端上班線" || week.track === "全體共同" || week.track === "共創專案")) ||
      (trackFilter === "接案" &&
        (week.track === "接案線" || week.track === "全體共同" || week.track === "共創專案"))
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
