// Calendar data types and constants for the course schedule

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
  instructors: CalendarInstructor[]
}

export const calendarData: CalendarWeek[] = [
  {
    id: 1,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 1",
    type: "學院功能｜開學典禮",
    track: "全體共同",
    title: "開學典禮 ＆ 遠距遊牧概論",
    focusShort: "對齊這 6 個月的節奏與期待，認識兩條路線和雙軌選項，寫下為什麼現在要開始。",
    focusDetail:
      "認真聽完遠距遊牧概論與路線說明後，寫下：① 你此刻選擇這個學院的 3 個原因、② 暫時傾向的路線（上班／自媒／雙軌）、③ 這 6 個月你最想看見的一個改變，並在 Skool 或共學空間發一篇自我介紹＋行動宣言。",
    instructors: [
      {
        name: "工具王阿璋",
        image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b-e5-95-8a-e7-8e-8b.png",
        title: "遠距遊牧學院創辦人",
      },
    ],
  },
  {
    id: 2,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 2",
    type: "共同必修",
    track: "全體共同",
    title: "AI ＆ 自動化工具",
    focusShort: "建立一套「AI 幫你做苦工」的基礎工作流，為後面履歷、作品集與內容實作鋪路。",
    focusDetail:
      "完成課堂示範的至少一組 AI 工作流：例如「輸入 JD → 拆關鍵字 → 生成履歷要點」，或「輸入主題 → 產生貼文大綱」。最低行動：設定 1 個你打算在接下來 1–2 個月持續使用的 AI 工作流，並實際跑完一次。",
    instructors: [{ name: "林上哲", image: "/images/e6-9e-97-e4-b8-8a-e5-93-b2-2.jpeg", title: "AI 生產力工具教育者" }],
  },
  {
    id: 3,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 3",
    type: "路線必修 – 自媒線",
    track: "自媒體接案線",
    title: "自媒體接案變現地圖 & 目標設定",
    focusShort: "看懂自媒＋接案市場，釐清你能賣什麼、賣給誰，畫出第一版變現地圖。",
    focusDetail:
      "列出你擅長或有興趣的 3–5 個主題，搭配 3 類可能的付費形式（顧問、課程、內容製作等），完成一張屬於你的「自媒體接案變現地圖」。最低行動：選出未來 3 個月優先要實驗的 1–2 個服務方向，寫成一句清楚的服務描述。",
    instructors: [{ name: "西打藍", image: "/images/e8-a5-bf-e6-89-93-e8-97-8d.jpeg", title: "一人公司創辦人" }],
  },
  {
    id: 4,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 4",
    type: "路線必修 – 上班線",
    track: "遠端上班線",
    title: "遠端自由職涯地圖 & 目標設定",
    focusShort: "認識不同類型的遠端公司與職缺，畫出未來 2–3 年的遠端職涯地圖。",
    focusDetail:
      "搜尋並蒐集至少 3 則你有興趣的遠端／hybrid／外商職缺，根據課程框架寫下：為什麼有興趣、目前差距是什麼。最低行動：用「職涯地圖」模板，畫出你未來 2–3 年想經過的幾個關鍵站點，並選出這 6 個月要先攻的目標職缺類型。",
    instructors: [{ name: "許詮", image: "/images/e8-a8-b1-e8-a9-ae.jpeg", title: "XChange 創辦人" }],
  },
  {
    id: 5,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 5",
    type: "學院功能",
    track: "全體共同",
    title: "交流／成果發表（月末）",
    focusShort: "把前幾週的思考與小產出拿出來分享，練習在安全場域說出自己的方向。",
    focusDetail:
      "準備一段 3 分鐘內的分享：① 你目前選擇的路線與理由、② 你的 AI 工作流或職涯／變現地圖截圖、③ 接下來一個月要完成的 1–2 個具體行動。最低行動：在交流會中分享一次，並針對至少 1 位同學給出回饋。",
    instructors: [
      {
        name: "工具王阿璋",
        image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b-e5-95-8a-e7-8e-8b.png",
        title: "遠距遊牧學院創辦人",
      },
    ],
  },
  {
    id: 6,
    phase: "Phase 1 起步打底",
    monthWeek: "5 月 · Week 1",
    type: "共同必修",
    track: "全體共同",
    title: "知識變現",
    focusShort: "學會把你的經驗與專業包成「別人聽得懂、願意付費」的知識產品雛形。",
    focusDetail:
      "寫出一個「你可以教的主題」的一頁簡報草稿：包含 TA 是誰、他們的痛點是什麼、你能提供什麼解法（服務或產品）。最低行動：在 Skool 上發一篇貼文，簡單介紹這個知識產品構想，作為之後履歷／作品集或自媒路線的素材。",
    instructors: [{ name: "鮪魚", image: "/images/e9-ae-aa-e9-ad-9a.jpeg", title: "知識變現專家" }],
  },
  {
    id: 7,
    phase: "Phase 1 起步打底",
    monthWeek: "5 月 · Week 2",
    type: "路線必修 – 自媒線",
    track: "自媒體接案線",
    title: "接案作品集、市場調查",
    focusShort: "把你能做的事，整理成對接案有用的作品集與市場觀察。",
    focusDetail:
      "完成至少 1 份作品集雛形（可以是 Notion／PDF／個人頁），包含 2–3 個代表性案例或 Demo，並針對目標市場找出 3 個競品或同類創作者。最低行動：寫下「與他們相比，我現在可以先提供什麼不一樣的價值？」的三點答案。",
    instructors: [{ name: "西打藍", image: "/images/e8-a5-bf-e6-89-93-e8-97-8d.jpeg", title: "一人公司創辦人" }],
  },
  {
    id: 8,
    phase: "Phase 1 起步打底",
    monthWeek: "5 月 · Week 3",
    type: "路線必修 – 上班線",
    track: "遠端上班線",
    title: "LinkedIn 經營全攻略",
    focusShort: "把 LinkedIn 改成「會替你說話」的國際職涯門面。",
    focusDetail:
      "根據課程提供的架構，完成一次 LinkedIn 大翻修：更新 headline、About、Experience 三大區塊。最低行動：完成修改後，至少新增 10 位你目標產業／公司的人脈連結，並發出 1 則英文或中英貼文，練習對外說話。",
    instructors: [{ name: "Shelley", image: "/images/shelly.jpeg", title: "LinkedIn 個人品牌專家" }],
  },
  {
    id: 9,
    phase: "Phase 1 起步打底",
    monthWeek: "5 月 · Week 4",
    type: "學院功能",
    track: "全體共同",
    title: "交流／成果發表（月末）＋講師團體 QA",
    focusShort: "將起步階段的作品集、LinkedIn 或變現構想拿出來，接受講師與同學的 QA。",
    focusDetail:
      "從這一個月的產出中選 1 項（作品集、LinkedIn 截圖、知識產品構想…），準備 1–2 個你最想得到回饋的問題。最低行動：在 QA 會議中至少發問一次，並根據回饋寫下「下一輪要再調整的 3 件事」。",
    instructors: [
      {
        name: "工具王阿璋",
        image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b-e5-95-8a-e7-8e-8b.png",
        title: "遠距遊牧學院創辦人",
      },
    ],
  },
  {
    id: 10,
    phase: "Phase 2 出擊試水",
    monthWeek: "6 月 · Week 1",
    type: "學院功能（中期復盤）",
    track: "全體共同",
    title: "學習復盤＆目標調整",
    focusShort: "為 Phase 2 開局，檢查你的投遞、內容與收入嘗試，調整接下來出擊試水的節奏與策略。",
    focusDetail:
      "整理你目前的產出與行動紀錄（作品集、LinkedIn、AI 工作流、已投遞／已發佈內容），回答三個問題：① 目前最有進展的是哪一塊？② 最卡的是哪一塊？③ 接下來 4–8 週，你最想衝哪個指標？最低行動：寫一份「Phase 2 行動計畫」，包含一個可量化的目標（如：投 10 則 JD、發 6 則內容）。",
    instructors: [
      {
        name: "工具王阿璋",
        image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b-e5-95-8a-e7-8e-8b.png",
        title: "遠距遊牧學院創辦人",
      },
    ],
  },
  {
    id: 11,
    phase: "Phase 2 出擊試水",
    monthWeek: "6 月 · Week 2",
    type: "路線必修 – 自媒線",
    track: "自媒體接案線",
    title: "定位＆內容企劃 & 內容撰寫框架",
    focusShort: "把主題與 TA 說清楚，設計一輪有策略的內容規劃，而不是想到才發。",
    focusDetail:
      "使用課程提供的企劃模板，規劃至少 2 週的內容排程：包含主題、目的、平台、形式（貼文／短影音）、CTA。最低行動：完成 1 則內容稿（含標題、開頭 hook、主體架構），並用 AI 協助優化語氣與清晰度。",
    instructors: [{ name: "三分鐘", image: "/images/e4-b8-89-e5-88-86-e9-90-98.jpeg", title: "知識型 IP 經營者" }],
  },
  {
    id: 12,
    phase: "Phase 2 出擊試水",
    monthWeek: "6 月 · Week 3",
    type: "路線必修 – 上班線",
    track: "遠端上班線",
    title: "履歷、求職信秘笈",
    focusShort: "用 AI 帶著你改寫履歷與求職信，做出可以正式投遞的版本。",
    focusDetail:
      "選一則真實 JD，依照課程架構改寫你的履歷與求職信，並善用 AI 幫忙調整語氣與關鍵字。最低行動：完成「1 份履歷＋1 封 Cover Letter」組合，並在同學會或作業交流中實際拿出來獲得一次回饋。",
    instructors: [
      { name: "讀者太太", image: "/images/e8-ae-80-e8-80-85-e5-a4-aa-e5-a4-aa.jpeg", title: "英國職涯教練" },
    ],
  },
  {
    id: 13,
    phase: "Phase 2 出擊試水",
    monthWeek: "6 月 · Week 4",
    type: "學院功能",
    track: "全體共同",
    title: "交流／成果發表（月末）",
    focusShort: "把第一輪內容企劃或履歷／求職信成果拿出來，對照目標做小結。",
    focusDetail:
      "選擇一條你在 Phase 2 正在出擊的主線（投遞／內容），整理目前「已完成 vs 還沒完成」的清單。最低行動：在交流會上分享你這個月最關鍵的 1 個行動與 1 個學到的教訓，並寫下下個月的微調方向。",
    instructors: [
      {
        name: "工具王阿璋",
        image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b-e5-95-8a-e7-8e-8b.png",
        title: "遠距遊牧學院創辦人",
      },
    ],
  },
  {
    id: 14,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 1",
    type: "共同必修",
    track: "全體共同",
    title: "財務課程",
    focusShort: "用數字把「遠端工作／接案／旅居」放在同一張財務藍圖裡。",
    focusDetail:
      "填寫一份個人財務現況表：收入來源、固定支出、投資與現金流。最低行動：根據課程提供的模板，設計一個「未來 6–12 個月」的財務情境（最佳／保守版本），並標記你需要多少收入來支撐你想要的生活實驗。",
    instructors: [{ name: "許詮", image: "/images/e8-a8-b1-e8-a9-ae.jpeg", title: "財務自由實踐者" }],
  },
  {
    id: 15,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 2",
    type: "路線必修 – 自媒線",
    track: "自媒體接案線",
    title: "短影音腳本 & 拍攝／剪輯",
    focusShort: "練習從腳本到剪輯做完一支短影音，真正發佈出去。",
    focusDetail:
      "寫出 1 支短影音腳本（含開頭 3 秒 hook、故事線、CTA），完成拍攝與剪輯，發佈到你選定的平台（IG Reels／YouTube Shorts／TikTok 其一）。最低行動：紀錄這支影片的基本數據（曝光、觀看、互動），並在社群中貼出連結＋一段自我復盤。",
    instructors: [{ name: "林佳 Zoe", image: "/images/e6-af-8f-e6-97-a5e-e9-8c-a0.jpeg", title: "自媒體創作者" }],
  },
  {
    id: 16,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 3",
    type: "路線必修 – 上班線",
    track: "遠端上班線",
    title: "獵頭與面試談薪策略",
    focusShort: "用獵頭視角看待自己，模擬一輪完整的面試與談薪流程。",
    focusDetail:
      "選定 1–3 則你認真考慮投遞的 JD，整理出你對應的 3–5 個關鍵戰績與故事，寫成「面試問答提綱」。最低行動：完成 1 次模擬面試（跟同學互練或錄影自評），並寫下你在自我介紹、STAR 敘事與談薪時最想加強的地方。",
    instructors: [{ name: "Emilia", image: "/images/emilia.jpeg", title: "高階跨國獵頭" }],
  },
  {
    id: 17,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 4",
    type: "學院功能",
    track: "全體共同",
    title: "共創專案說明會＆成員募集",
    focusShort: "認識共創專案的方向與玩法，決定要不要加入一個真實協作場域。",
    focusDetail:
      "了解目前開放的共創專案主題與角色需求，選出 1 個你有興趣且願意投入 4–8 週的專案。最低行動：提交共創專案報名表（或意向表），寫下你可以帶來的貢獻與希望練習的能力。",
    instructors: [
      {
        name: "工具王阿璋",
        image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b-e5-95-8a-e7-8e-8b.png",
        title: "遠距遊牧學院創辦人",
      },
    ],
  },
  {
    id: 18,
    phase: "Phase 2 出擊試水",
    monthWeek: "7 月 · Week 5",
    type: "學院功能",
    track: "全體共同",
    title: "交流／成果發表（月末）＋共創成員募集",
    focusShort: "用一個月的尾聲，把出擊成果與共創意向說清楚。",
    focusDetail:
      "準備一個小 recap：① 這一個月你投了多少 JD、發了多少內容、② 最有成就感的一件事、③ 想參與或已加入的共創專案。最低行動：在交流會上分享你的數字與故事，並針對共創專案提出至少 1 個你想參與的角色或任務。",
    instructors: [
      {
        name: "工具王阿璋",
        image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b-e5-95-8a-e7-8e-8b.png",
        title: "遠距遊牧學院創辦人",
      },
    ],
  },
  {
    id: 19,
    phase: "Phase 3 累積整合",
    monthWeek: "8 月 · Week 1",
    type: "學院功能",
    track: "全體共同",
    title: "學習復盤＆目標調整（＋共創專案大會議）",
    focusShort: "為 Phase 3 開局，檢查你的投遞、內容與收入嘗試，調整最後一段衝刺。",
    focusDetail:
      "統整這 3 個月來的量化紀錄：投遞 JD 數、收到的回覆、發佈的內容篇數與表現、共創專案參與狀況。最低行動：寫一份「Phase 3 目標清單」，例如：完成第 2 輪投遞、維持每週 1 支內容、在共創專案中交付一個具體成果。",
    instructors: [
      {
        name: "工具王阿璋",
        image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b-e5-95-8a-e7-8e-8b.png",
        title: "遠距遊牧學院創辦人",
      },
    ],
  },
  {
    id: 20,
    phase: "Phase 3 累積整合",
    monthWeek: "8 月 · Week 2",
    type: "學院功能",
    track: "共創專案",
    title: "共創專案大會議",
    focusShort: "讓共創專案進入實戰期，確認分工、時程與交付成果。",
    focusDetail:
      "與共創成員一起釐清專案目標、分工與時間表，決定要產出的具體成果（活動、內容、產品…）。最低行動：寫下你在共創專案中的角色與至少 1 個要在本月完成的 deliverable，並在群組或 Skool 上公開你的承諾。",
    instructors: [
      {
        name: "工具王阿璋",
        image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b-e5-95-8a-e7-8e-8b.png",
        title: "遠距遊牧學院創辦人",
      },
    ],
  },
  {
    id: 21,
    phase: "Phase 3 累積整合",
    monthWeek: "8 月 · Week 3",
    type: "共同必修",
    track: "全體共同",
    title: "自我理解溝通＆人生 SOP",
    focusShort: "把這 6 個月的所有行動，整理成可以週／月／季重複運作的生活系統。",
    focusDetail:
      "回顧從 4 月到現在的學習紀錄、情緒變化與關係變化，寫下你真正在乎的生活優先順序。最低行動：用課程提供的「人生 SOP」模板設計一份你的週／月／季節奏，包含：工作、學習、內容／人脈經營、休息與探索，並標出學院結束後要維持的 3 個關鍵習慣。",
    instructors: [{ name: "Angela Feng", image: "/images/angela.jpeg", title: "身心靈平衡教練" }],
  },
  {
    id: 22,
    phase: "Phase 3 累積整合",
    monthWeek: "8 月 · Week 4",
    type: "學院功能",
    track: "全體共同",
    title: "全體期末成果發表會＋學員分享＋未來機會",
    focusShort: "把這 6 個月最代表你的成果帶上台，讓 Journey、Job Board、城市夥伴等未來機會有機會看見你。",
    focusDetail:
      "從你的履歷、作品集、內容、共創專案中選出 1–2 個最代表你的成果，準備一段 3–5 分鐘的分享：你從哪裡開始、中間做了哪些行動、現在走到哪裡。最低行動：完成發表會分享，並在會後寫下一份「下一步行動清單」，包含你想銜接的實際機會（旅居、工作、專案）。",
    instructors: [
      {
        name: "工具王阿璋",
        image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b-e5-95-8a-e7-8e-8b.png",
        title: "遠距遊牧學院創辦人",
      },
    ],
  },
  {
    id: 23,
    phase: "Phase 3 累積整合",
    monthWeek: "9 月 · Week 2",
    type: "學院功能",
    track: "全體共同",
    title: "結業典禮",
    focusShort: "正式為這一屆畫下一個句點，也為未來的遠距旅程畫下一個逗號。",
    focusDetail:
      "回顧整個 Phase 1–3 的紀錄，整理出你最重要的 3 個成長點、3 個還想持續調整的地方。最低行動：寫一封給「一年後的自己」的信，描述你希望在遠端工作／接案／生活上達成的目標，並在典禮中與一位同學互相交換、見證彼此的承諾。",
    instructors: [
      {
        name: "工具王阿璋",
        image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b-e5-95-8a-e7-8e-8b.png",
        title: "遠距遊牧學院創辦人",
      },
    ],
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
