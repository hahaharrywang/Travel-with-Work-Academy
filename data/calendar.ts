// Calendar data types and constants for the course schedule
// Updated to 4-phase structure: 藍圖與目標 → 定位與門面 → 機會與轉化 → 永續

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
  phaseShort: string // 短版階段名，用於 UI 顯示
  monthWeek: string
  type: string
  track: string
  title: string
  focusShort: string
  focusDetail: string
  instructorNames: string[]
  layerTag?: string // 層級標籤
}

// 四階段定義
export const fourPhases = [
  {
    id: 1,
    name: "藍圖與目標",
    shortTagline: "先知道你要往哪裡走",
    description: "先搞清楚你想往哪裡去。不是空想自由，而是把你接下來幾個月要走的主線、目標與節奏定出來。",
    color: { bg: "bg-brand-gold/20", text: "text-brand-gold", border: "border-brand-gold", solid: "bg-brand-gold" },
    months: "5 月",
  },
  {
    id: 2,
    name: "定位與門面",
    shortTagline: "把你整理成別人看得懂的樣子",
    description: "把你整理成別人看得懂、也願意相信的樣子。你的經驗、能力、價值主張，不再只是你自己知道。",
    color: { bg: "bg-brand-teal/20", text: "text-brand-teal", border: "border-brand-teal", solid: "bg-brand-teal" },
    months: "6 月",
  },
  {
    id: 3,
    name: "機會與轉化",
    shortTagline: "開始讓曝光、投遞與合作變成機會",
    description: "開始讓機會真的發生。不管是投遞、曝光、內容、獲客、面試還是成交，這一階段會讓你開始對外出擊。",
    color: { bg: "bg-brand-clay/20", text: "text-brand-clay", border: "border-brand-clay", solid: "bg-brand-clay" },
    months: "7 月",
  },
  {
    id: 4,
    name: "永續",
    shortTagline: "把一次嘗試走成長期節奏",
    description: "把一次嘗試，變成能走下去的節奏。不是短暫熱血，而是學會留任、合作、溝通、財務與長期累積。",
    color: { bg: "bg-brand-teal/10", text: "text-brand-teal", border: "border-brand-mist", solid: "bg-brand-teal" },
    months: "8–9 月",
  },
]

// 遠端上班線 - 四階段內容
export const remoteJobPhaseContent = [
  {
    phase: "藍圖與目標",
    headline: "先看懂遠端上班這條路到底長什麼樣",
    description: "你會釐清自己想要的工作型態、適合的職缺方向，以及接下來幾個月要集中火力的目標。",
    outcomes: [
      "更清楚的目標職缺方向",
      "對遠端工作市場更具體的理解",
      "一個不是亂投履歷的起跑點",
    ],
    courses: ["開學典禮＆遠距遊牧概論", "遠端上班職涯藍圖＆目標設定"],
  },
  {
    phase: "定位與門面",
    headline: "把價值變成「更容易被看懂」",
    description: "你會重新整理自己的經歷、優勢與故事，並把它們放進 LinkedIn 與對外呈現裡。",
    outcomes: [
      "更清楚的個人定位",
      "一版更能代表你的 LinkedIn / 對外門面",
      "對自己可以怎麼被看見，有更具體的方向",
    ],
    courses: ["自我理解溝通＆人生 SOP", "Linkedin 經營全攻略"],
  },
  {
    phase: "機會與轉化",
    headline: "真正開始出擊",
    description: "這一階段會進入 AI 工具應用、履歷、求職信、面試與談薪，把「我想投」變成「我真的可以去爭取」。",
    outcomes: [
      "更有競爭力的履歷與求職信",
      "更能說服人的面試故事",
      "更敢投遞、也更懂怎麼和機會互動",
    ],
    courses: ["AI ＆ 自動化工具學習思維", "履歷、求職信秘笈、面試談薪", "自媒體收入藍圖"],
  },
  {
    phase: "永續",
    headline: "找到工作不是終點，走得久才是",
    description: "這一階段會帶你思考留任、溝通、旅居財務、節奏管理與成果整合，讓遠端工作不是短期幻想，而是更能持續的生活方式。",
    outcomes: [
      "更成熟的遠端合作與留任思維",
      "更穩的溝通與節奏感",
      "一套能延續到學院之後的個人運作方式",
    ],
    courses: ["學習復盤＆目標調整", "留任策略＆溝通", "旅居財務課程", "共創專案／期末成果發表／結業典禮"],
  },
]

// 接案線 - 四階段內容
export const freelancePhaseContent = [
  {
    phase: "藍圖與目標",
    headline: "先不要急著發內容或開服務",
    description: "這一階段會先幫你看懂接案與變現的幾種可能，找到適合自己的起跑方式。",
    outcomes: [
      "更清楚的接案方向與目標",
      "對自己想做的主題、服務與變現路徑有初步輪廓",
      "不再只是模糊地說「我也想接案」",
    ],
    courses: ["開學典禮＆遠距遊牧概論", "接案變現地圖＆目標設定"],
  },
  {
    phase: "定位與門面",
    headline: "讓你的價值開始有形",
    description: "你會整理自己的定位、服務、方案與對外說法，讓別人開始看得懂你可以幫他解決什麼問題。",
    outcomes: [
      "更清楚的定位與受眾輪廓",
      "第一版 offer / 方案定價想法",
      "比較像「可以接案的人」的對外門面",
    ],
    courses: ["自我理解溝通＆人生 SOP", "定位、方案定價 Offer"],
  },
  {
    phase: "機會與轉化",
    headline: "開始對外被看見，也開始學會讓曝光變成機會",
    description: "這一階段會進入 AI 工具、內容策略、社群獲客、收入藍圖，讓你不只是產出內容，而是更知道怎麼靠近合作與收入。",
    outcomes: [
      "更完整的內容方向與獲客思路",
      "一套更有策略的對外曝光方式",
      "從「有內容」走向「有機會成交」",
    ],
    courses: ["AI ＆ 自動化工具學習思維", "社群獲客漏斗＆內容", "自媒體收入藍圖"],
  },
  {
    phase: "永續",
    headline: "接到案，不代表能長久；能合作下去，才會真的穩",
    description: "這一階段會帶你思考合作關係、交付節奏、財務安排與長期累積，讓接案不是偶發，而是能延續。",
    outcomes: [
      "更成熟的合作與溝通思維",
      "對長期接案節奏更清楚的想像",
      "一套可以走出學院、繼續使用的個人運作方式",
    ],
    courses: ["學習復盤＆目標調整", "接案的永續與合作", "旅居財務課程", "共創專案／期末成果發表／結業典禮"],
  },
]

// 「我還不確定」Tab 內容
export const undecidedTabContent = {
  headline: "先開始，比一直想更快靠近答案",
  intro: `很多人一開始不是沒興趣，而是卡在：

• 我到底比較適合遠端上班，還是接案？
• 如果選錯了怎麼辦？
• 我現在還沒很確定，現在加入會不會太早？

這很正常。因為你缺的不是再想一輪，而是一個可以安全試過一輪的環境。`,
  flexibility: {
    headline: "這裡給你的，不是壓力，而是決策彈性",
    points: [
      "你可以先選一條主線開始",
      "單線的正式學員，第 2、3 週會有試上另一條路起步課的機會",
      "在第一個月內，仍保有換線 / 升級雙軌的彈性",
    ],
  },
  trialInfo: {
    headline: "試上資訊",
    week2: "接案變現地圖 ＆ 目標設定",
    week3: "遠端上班職涯藍圖 ＆ 目標設定",
  },
  closing: "你不需要現在就把人生選到最精準。你只需要先進到一個，能幫你更快看見答案的節奏裡。\n\n猶豫不決的時間，才是你最大的成本。",
}

export const calendarData: CalendarWeek[] = [
  // ===== 5 月 - 藍圖與目標 =====
  {
    id: 1,
    phase: "藍圖與目標",
    phaseShort: "階段一",
    monthWeek: "5 月 · Week 1",
    type: "成長節奏 1",
    track: "全體共同",
    title: "開學典禮 ＆ 遠距遊牧概論",
    focusShort: "月初第一堂，大家對齊期待；釐清「上班線／接案線／雙軌」差異。",
    focusDetail:
      "核心內容\n• 認識遠距／接案／自媒體／雙軌的差異與常見路徑\n• 釐清你現在的限制條件、可用資源與可行策略\n• 設定本梯的學習節奏與社群參與方式\n\n行動任務\n• 寫下你的「遠距目標一句話」＋目前最大卡點",
    instructorNames: ["校長哈利"],
    layerTag: "社群節奏 – 開學儀式／啟動, 核心心態／視野 – 遠距遊牧概論",
  },
  {
    id: 2,
    phase: "藍圖與目標",
    phaseShort: "階段一",
    monthWeek: "5 月 · Week 2",
    type: "路線必修 – 接案線 1",
    track: "接案線",
    title: "接案變現地圖 & 目標設定",
    focusShort: "把「想接案／想做內容」變成可走的變現地圖與 90 天目標。",
    focusDetail:
      "核心內容\n• 盤點你可行的收入來源（不只接案：也包含多種商業可能）\n• 定義你「提供什麼價值」與「適合誰」的清晰版本\n• 把目標拆成可追蹤的指標＋每週固定節奏\n\n行動任務\n• 列出可能性與優先順序，並設定成果指標",
    instructorNames: ["西打藍"],
    layerTag: "路線必修 – 接案線 / 起步與藍圖",
  },
  {
    id: 3,
    phase: "藍圖與目標",
    phaseShort: "階段一",
    monthWeek: "5 月 · Week 3",
    type: "路線必修 – 上班線 1",
    track: "遠端上班線",
    title: "遠端上班職涯藍圖 & 目標設定",
    focusShort: "把「想找遠端工作」變成職涯藍圖：目標職位＋90 天可落地計畫。",
    focusDetail:
      "核心內容\n• 釐清你適合的遠端職位方向與工作型態\n• 把求職變成「可持續的行動系統」\n• 設定可追蹤的求職成果指標\n\n行動任務\n• 列出可能性與優先順序，並設定成果指標",
    instructorNames: ["講師確認中"],
    layerTag: "路線必修 – 上班線 / 起步與藍圖",
  },
  {
    id: 4,
    phase: "藍圖與目標",
    phaseShort: "階段一",
    monthWeek: "5 月 · Week 4",
    type: "成長節奏 2",
    track: "全體共同",
    title: "交流／成果發表（月末）",
    focusShort: "用一次月末交流，把「進度」變成「成果」：拿回饋、校準下月。",
    focusDetail:
      "核心內容\n• 官方交流作業分享會\n• 同學會\n• 校長 AMA\n\n行動任務\n• 準備 3 分鐘成果分享\n• 寫下「下月承諾清單」3 項\n• 提出 1 個你最需要被解的問題",
    instructorNames: ["校長哈利"],
    layerTag: "社群節奏 – 交流＆成果展示",
  },
  // ===== 6 月 - 定位與門面 =====
  {
    id: 5,
    phase: "定位與門面",
    phaseShort: "階段二",
    monthWeek: "6 月 · Week 1",
    type: "共同必修 1",
    track: "全體共同",
    title: "自我理解溝通＆人生 SOP",
    focusShort: "把行動變成固定節奏：週／月／季，整理「學院結束後，我的生活怎麼繼續跑」。",
    focusDetail:
      "核心內容\n• 了解自己的運作方式：什麼情況下能穩定產出\n• 建立可複製的生活／工作節奏\n• 為學院之後做準備\n\n行動任務\n• 寫出你的「人生系統說明書」簡版\n• 設計每週 SOP",
    instructorNames: ["Angela Feng"],
    layerTag: "核心系統 – 人生設計／個人 SOP",
  },
  {
    id: 6,
    phase: "定位與門面",
    phaseShort: "階段二",
    monthWeek: "6 月 · Week 2",
    type: "路線必修 – 接案線 2",
    track: "接案線",
    title: "定位、方案定價 Offer",
    focusShort: "把定位收斂、Offer 做清楚：讓陌生客戶快速理解並信任你的價值。",
    focusDetail:
      "核心內容\n• 把「我想做很多」收斂成「我現在先做這一塊」\n• 用輕量市場調查校準定位與價格想像\n• 讓你的服務變得可被選擇\n\n行動任務\n• 完善你的接案 Offer 架構\n• 完成一次市場觀察與調查",
    instructorNames: ["講師確認中"],
    layerTag: "路線必修 – 接案線 / 作品集與市場研究",
  },
  {
    id: 7,
    phase: "定位與門面",
    phaseShort: "階段二",
    monthWeek: "6 月 · Week 3",
    type: "路線必修 – 上班線 2",
    track: "遠端上班線",
    title: "Linkedin 經營全攻略",
    focusShort: "把 LinkedIn 變成你的機會入口：被看見、被信任、被邀請。",
    focusDetail:
      "核心內容\n• 重新定位 LinkedIn：不只是履歷，而是專業曝光面\n• 讓你的頁面清楚回答：你是誰、擅長什麼、能帶來什麼成果\n• 建立可持續的互動與曝光節奏\n\n行動任務\n• 更新 Headline / About\n• 透過專業框架讓人一眼理解你的價值",
    instructorNames: ["謝雅筑 Ally"],
    layerTag: "路線必修 – 上班線 / 個人品牌與曝光",
  },
  {
    id: 8,
    phase: "定位與門面",
    phaseShort: "階段二",
    monthWeek: "6 月 · Week 4",
    type: "成長節奏 3",
    track: "全體共同",
    title: "交流／成果發表（月末）＋團體 QA",
    focusShort: "用月末展示＋QA，把卡點一次清掉：帶著清晰下一步進入下月。",
    focusDetail:
      "核心內容\n• 官方交流作業分享會\n• 同學會\n• 校長 AMA\n• 晚上講師團體 QA\n\n行動任務\n• 準備 3 分鐘成果分享\n• 寫下「下月承諾清單」3 項\n• 提出 1 個你最需要被解的問題",
    instructorNames: ["校長哈利"],
    layerTag: "社群節奏 – 交流＆成果展示, 社群節奏 – 深度 QA／Mentoring",
  },
  // ===== 7 月 - 機會與轉化 =====
  {
    id: 9,
    phase: "機會與轉化",
    phaseShort: "階段三",
    monthWeek: "7 月 · Week 1",
    type: "共同必修 2",
    track: "全體共同",
    title: "AI ＆ 自動化工具學習思維",
    focusShort: "用 AI + 自動化把日常工作變輕：做出你的第一個可運作流程。",
    focusDetail:
      "核心內容\n• 什麼工作適合交給 AI／什麼仍要自己做\n• 把「想法」變成「可執行流程」\n• 以最小可用成果（MVP）為導向\n\n行動任務\n• 做出 1 個「能實際跑起來」的自動化流程\n• 寫下你的「AI 使用規則」",
    instructorNames: ["林上哲"],
    layerTag: "核心技能 – AI 工作流／效率工具",
  },
  {
    id: 10,
    phase: "機會與轉化",
    phaseShort: "階段三",
    monthWeek: "7 月 · Week 2",
    type: "路線必修 – 接案線 3",
    track: "接案線",
    title: "社群獲客漏斗＆內容",
    focusShort: "不靠靈感硬撐，把內容產出變成可持續流程，用 AI 幫忙企劃、標題、開頭。",
    focusDetail:
      "核心內容\n• 讓內容與變現接得起來：每篇內容都朝同一個目標前進\n• 不靠靈感硬撐，把內容產出變成可持續流程\n• 用 AI 輔助內容企劃、標題、開頭等\n\n行動任務\n• 產出具體內容策略與第一步產出",
    instructorNames: ["三分鐘 Lynn"],
    layerTag: "路線必修 – 接案線 / 內容策略與企劃",
  },
  {
    id: 11,
    phase: "機會與轉化",
    phaseShort: "階段三",
    monthWeek: "7 月 · Week 3",
    type: "路線必修 – 上班線 3",
    track: "遠端上班線",
    title: "履歷、求職信秘笈、面試談薪",
    focusShort: "讓履歷「更像你」也「更像職缺要的人」：延續 AI 課，馬上應用在履歷。",
    focusDetail:
      "核心內容\n• 用專業流程校準你的履歷呈現\n• 讓經驗描述更有說服力\n• 建立可複用的求職信版本\n\n行動任務\n• 完成 1 版履歷更新\n• 完成 1 版求職信骨架\n• 獲得同儕回饋",
    instructorNames: ["講師確認中"],
    layerTag: "路線必修 – 上班線 / 信任載體（履歷＆信件）",
  },
  {
    id: 12,
    phase: "機會與轉化",
    phaseShort: "階段三",
    monthWeek: "7 月 · Week 4",
    type: "共同必修 3",
    track: "全體共同",
    title: "自媒體收入藍圖",
    focusShort: "把專業變成可販售的雛形：適用上班線＋接案線的商業化／知識變現技能。",
    focusDetail:
      "核心內容\n• 釐清你的專業能解決誰的什麼問題\n• 把知識整理成可交付的產品雛形\n• 建立一個「價值說法」\n\n行動任務\n• 產出你的知識產品雛形",
    instructorNames: ["工具王阿璋"],
    layerTag: "核心技能 – 商業化／知識變現",
  },
  {
    id: 13,
    phase: "機會與轉化",
    phaseShort: "階段三",
    monthWeek: "7 月 · Week 5",
    type: "成長節奏 4",
    track: "全體共同",
    title: "交流／成果發表（月末）",
    focusShort: "用一次展示把成果定型：把作品／文件／內容帶出來，換到關鍵回饋。",
    focusDetail:
      "核心內容\n• 官方交流作業分享會\n• 同學會\n• 校長 AMA\n\n行動任務\n• 準備 3 分鐘成果分享\n• 寫下「下月承諾清單」3 項\n• 提出 1 個你最需要被解的問題",
    instructorNames: ["校長哈利"],
    layerTag: "社群節奏 – 交流＆成果展示",
  },
  // ===== 8 月 - 永續 =====
  {
    id: 14,
    phase: "永續",
    phaseShort: "階段四",
    monthWeek: "8 月 · Week 1",
    type: "成長節奏 5",
    track: "全體共同",
    title: "學習復盤＆目標調整",
    focusShort: "把後半段走穩：復盤到現在的成果，調整目標與投入方式。",
    focusDetail:
      "核心內容\n• 檢視你目前離目標差哪一段\n• 調整每週節奏：保留有效行動、砍掉消耗行動\n• 共創專案週六啟動會議\n\n行動任務\n• 更新你的 90 天指標\n• 寫下「我接下來 4 週只做的 3 件事」",
    instructorNames: ["校長哈利"],
    layerTag: "社群節奏 – 復盤＆目標校準",
  },
  {
    id: 15,
    phase: "永續",
    phaseShort: "階段四",
    monthWeek: "8 月 · Week 2",
    type: "路線必修 – 接案線 4",
    track: "接案線",
    title: "接案的永續與合作",
    focusShort: "讓接案不只是「有案做」而是「做得久」：可搭配短影音剪輯選修 Workshop。",
    focusDetail:
      "核心內容\n• 把接案從「等案」變「選案」：建立穩定的案源管道\n• 讓你的收入結構多元化\n• 可搭配短影音剪輯選修 Workshop\n\n行動任務\n• 檢視目前的案源結構\n• 建立可複用的接案流程 SOP",
    instructorNames: ["林佳 Zoe"],
    layerTag: "路線必修 – 接案線 / 流量出擊（短影音）",
  },
  {
    id: 16,
    phase: "永續",
    phaseShort: "階段四",
    monthWeek: "8 月 · Week 3",
    type: "路線必修 – 上班線 4",
    track: "遠端上班線",
    title: "留任策略 ＆ 溝通",
    focusShort: "用市場視角升級你的求職策略：可以繼續用 AI 課程教的 prompt 套用。",
    focusDetail:
      "核心內容\n• 用企業／獵才角度理解「價值」與「風險」\n• 把你的經驗整理成更能說服人的敘事\n• 談薪與留任策略\n\n行動任務\n• 整理 3 則可用的成果故事\n• 寫下你的薪資期待區間＋3 個最在意的條件\n• 更新履歷中 1 段最關鍵經歷",
    instructorNames: ["講師確認中"],
    layerTag: "路線必修 – 上班線 / 試水溫（面試＆談薪）",
  },
  {
    id: 17,
    phase: "永續",
    phaseShort: "階段四",
    monthWeek: "8 月 · Week 4",
    type: "成長節奏 6",
    track: "全體共同",
    title: "交流／成果發表（月末）＋團體 QA",
    focusShort: "月末總整理：展示成果、解卡點，共創專案成員募集＋校長 AMA。",
    focusDetail:
      "核心內容\n• 官方交流作業分享會\n• 共創專案說明會 & 成員募集\n• 校長 AMA\n• 晚上講師團體 QA\n\n行動任務\n• 準備 3 分鐘成果分享\n• 寫下「下月承諾清單」3 項\n• 提出 1 個你最需要被解的問題",
    instructorNames: ["校長哈利"],
    layerTag: "社群節奏 – 交流＆成果展示, 社群節奏 – 深度 QA／Mentoring",
  },
  // ===== 9 月 - 永續（續） =====
  {
    id: 18,
    phase: "永續",
    phaseShort: "階段四",
    monthWeek: "9 月 · Week 1",
    type: "共同必修 4",
    track: "全體共同",
    title: "旅居財務課程",
    focusShort: "把自由變「可負擔」：建立你的旅居財務規劃與風險底線。",
    focusDetail:
      "核心內容\n• 旅居與遠距生活的財務視角\n• 設定你的「可持續」財務目標\n• 建立基本風險意識\n\n行動任務\n• 盤點你目前的月固定支出＋最低生活底線\n• 設定 1 個 90 天財務目標\n• 寫下你的風險規則 3 條",
    instructorNames: ["講師確認中"],
    layerTag: "核心技能 – 財務規劃／風險管理",
  },
  {
    id: 19,
    phase: "永續",
    phaseShort: "階段四",
    monthWeek: "9 月 · Week 2",
    type: "成長節奏 7",
    track: "全體共同",
    title: "共創專案大會議",
    focusShort: "進入實作衝刺：用團隊節奏完成一個可交付、可展示的成果版本。",
    focusDetail:
      "核心內容\n• 共創專案：讓同學有機會實際透過協作，認識彼此、加深連結\n• 團隊協作節奏\n• 把成果做「可展示」\n\n行動任務\n• 完成你負責的交付項目\n• 在團隊內更新一次進度\n• 產出「可展示版本」的必要素材",
    instructorNames: ["校長哈利"],
    layerTag: "社群節奏 – 共創＆實戰場域",
  },
  {
    id: 20,
    phase: "永續",
    phaseShort: "階段四",
    monthWeek: "9 月 · Week 3",
    type: "成長節奏 8",
    track: "全體共同",
    title: "彈性課程",
    focusShort: "屆時根據學員需求彈性安排講師或活動。",
    focusDetail:
      "核心內容\n• 根據學員需求彈性安排講師或活動\n• 補齊未完成交付物\n• 一對一同儕互助\n\n行動任務\n• 選 1-2 個最重要的未完成項目完成\n• 安排 1 次同儕互助\n• 整理 1 份可展示成果",
    instructorNames: ["校長哈利"],
    layerTag: "社群節奏 – 彈性",
  },
  {
    id: 21,
    phase: "永續",
    phaseShort: "階段四",
    monthWeek: "9 月 · Week 4",
    type: "成長節奏 9",
    track: "全體共同",
    title: "全體期末成果發表會＋學員分享＋未來機會銜接",
    focusShort: "把你這 5 個月的改變做成成果舞台：展示、分享，並銜接 Journey／Job Board／城市夥伴等。",
    focusDetail:
      "核心內容\n• 成果發表：讓外部也看得懂你做到了什麼\n• 學員分享：把路徑與方法說成可複製的啟發\n• 銜接資源：Journey／Job Board／城市夥伴等後續機會\n\n行動任務\n• 準備 1 份期末成果展示\n• 寫一段 60 秒自我介紹\n• 列出你下一步要銜接的資源",
    instructorNames: ["校長哈利"],
    layerTag: "社群節奏 – 全體亮相／對外舞台",
  },
  {
    id: 22,
    phase: "永續",
    phaseShort: "階段四",
    monthWeek: "9 月 · Week 5",
    type: "成長節奏 10",
    track: "全體共同",
    title: "結業典禮",
    focusShort: "把收穫帶走、把節奏留下：完成結業回顧，設定學院後的 90 天計畫。",
    focusDetail:
      "核心內容\n• 收束學習：整理你最有效的做法與最該避免的坑\n• 社群收束：把你要留下的連結留下\n• 結業儀式：確認你完成的里程碑與變化\n• 校友銜接：把你接到後續活動與實戰機會\n\n行動任務\n• 完成結業回顧\n• 寫下你「學院後 90 天」的最小行動節奏\n• 選 1 位同學建立「互相追蹤」機制\n• 寫下你的結業宣言",
    instructorNames: ["校長哈利"],
    layerTag: "社群節奏 – 結業儀式／社群收束",
  },
]

// Helper functions for calendar filtering
export const getPhaseColor = (phase: string) => {
  const phaseObj = fourPhases.find((p) => p.name === phase)
  if (phaseObj) return phaseObj.color
  return { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300", solid: "bg-gray-500" }
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
