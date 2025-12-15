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
    focusShort: "把遠距遊牧目標寫成6個月路線圖，並定下第一個收入策略",
    focusDetail:
      "課程類型：學院功能｜全體共同\n本週核心目標：用「收入模式全景圖」把你想要的自由生活，變成可執行的目標與路線。\n\n你要完成的任務（建議 30–60 分鐘）：\n1) 起點盤點：你屬於「還沒賺到錢」或「已有收入但不穩」？（二選一）\n2) 收入策略：選 1 個最有機會的收入模式（上班/接案/內容/聯盟/產品…），寫下你為何選它\n3) 6 個月路線圖：寫出「6 個月後我想達成的生活狀態」＋「可量化里程碑（收入/作品/面試…）」\n4) 30 天微目標：把第一個里程碑拆成 4 週行動（每週至少 1 個行動）\n\n產出要求（交付物）：\n- 一張「6 個月路線圖」（可用文字/表格/心智圖）\n- 一段「30 天微目標」：每週 1 行動＋1 指標\n\n最低行動（底線）：\n- 寫下 3 句話：①我選的路線 ②6 個月後的具體樣子 ③本月第一個可量化目標",
    instructors: [
      {
        name: "校長哈利",
        image: "/images/harry-principal.png",
        title: "遠距遊牧學院校長",
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
    focusShort: "完成一個可跑的AI自動化MVP，讓表單→信件流程自動運作",
    focusDetail:
      "課程類型：共同必修｜全體共同\n本週核心目標：分清「跟 AI 溝通」與「把工具串起來」兩件事，做出一個能用的自動化流程。\n\n你要完成的任務（照做即可）：\n1) 選 1 個你每週都會做的重複任務（例：回覆詢問/整理報名/寫貼文草稿/寄應徵信）\n2) 寫 1 份可複用 Prompt（包含：任務、輸入、輸出格式、語氣、範例）\n3) 做 1 個自動化 MVP（最小可行）：表單/資料 → AI 生成 → 自動寄出 Email（或自動寫入表格）\n4) 跑一次測試：用 1 筆假資料測通，截圖保存流程與結果\n\n產出要求（交付物）：\n- 一份「Prompt 模板」\n- 一張「workflow 截圖」＋一次成功輸出結果（Email/文件/表格皆可）\n\n最低行動（底線）：\n- 完成工具註冊＋寫出 1 份可複用 Prompt（含輸入/輸出格式）",
    instructors: [
      {
        name: "講師確認中",
        image: "/images/academy-logo-placeholder.png",
        title: "本梯講師將於開課前公布",
      },
    ],
  },
  {
    id: 3,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 3",
    type: "路線必修 – 自媒線",
    track: "自媒體接案線",
    title: "自媒體接案變現地圖 & 目標設定",
    focusShort: "畫出自媒體變現地圖＋90天目標，明確你的接案/內容路徑",
    focusDetail:
      "課程類型：路線必修｜自媒線\n本週核心目標：把「我想做自媒體/接案」變成一張可走的變現地圖（從內容 → 信任 → 成交）。\n\n你要完成的任務：\n1) 變現地圖：寫下你的 3 種可能收入（例：接案/顧問/課程/聯盟/產品），先選 1 個當主線\n2) 受眾一句話：我幫誰解決什麼問題？（越具體越好）\n3) 90 天目標：設定 1 個「成果指標」（例：拿到 1 個付費案/累積 10 個名單/完成 3 個作品）\n4) 90 天行動：拆成每週固定節奏（內容產出/拓展/提案/作品）\n\n產出要求（交付物）：\n- 一張自媒接案變現地圖（主線＋支線）\n- 一段「90 天目標＋每週節奏」\n\n最低行動（底線）：\n- 寫出「我幫誰做什麼」＋選定 1 個 90 天成果指標",
    instructors: [
      {
        name: "講師確認中",
        image: "/images/academy-logo-placeholder.png",
        title: "本梯講師將於開課前公布",
      },
    ],
  },
  {
    id: 4,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 4",
    type: "路線必修 – 上班線",
    track: "遠端上班線",
    title: "遠端自由職涯藍圖 & 目標設定",
    focusShort: "完成遠端職涯藍圖＋90天計畫，定義目標職位與每週行動",
    focusDetail:
      "課程類型：路線必修｜上班線\n本週核心目標：把「想找遠端」變成清楚的職涯藍圖（目標職位×產業×策略×節奏）。\n\n你要完成的任務：\n1) 目標職位清單：列 3 個職稱（含關鍵技能/關鍵字）\n2) 目的地設定：選 1 個最想去的市場或公司類型（外商/新創/特定國家…）\n3) 求職飛輪：每週固定 3 件事（例：優化素材、投遞/內推、拓展人脈）\n4) 90 天計畫：把「每週行動」排進行事曆（固定時段）\n\n產出要求（交付物）：\n- 3 個目標職稱＋各自 5 個關鍵字\n- 一份「每週求職節奏」＋90 天里程碑\n\n最低行動（底線）：\n- 寫出 3 個目標職稱＋你本週要做的 1 個求職行動",
    instructors: [
      {
        name: "講師確認中",
        image: "/images/academy-logo-placeholder.png",
        title: "本梯講師將於開課前公布",
      },
    ],
  },
  {
    id: 5,
    phase: "Phase 1 起步打底",
    monthWeek: "4 月 · Week 5",
    type: "學院功能",
    track: "全體共同",
    title: "交流／成果發表（月末）",
    focusShort: "本月成果分享與交流，獲得同儕回饋並更新下月承諾清單",
    focusDetail:
      "課程類型：學院功能｜全體共同\n本週核心目標：把「做過的事」拿出來交換回饋，讓你下個月更聚焦、不卡關。\n\n你要完成的任務：\n1) 3 分鐘成果分享：展示 1 個本月交付（路線圖/Prompt/作品集骨架…）\n2) 1 個卡點提問：明確描述你的困難（不要只說「卡住」）\n3) 給出 2 份同儕回饋：用「我看到/我建議/我好奇」三句話\n\n產出要求（交付物）：\n- 一則成果貼文（附截圖/連結）＋一個提問\n- 2 則回饋留言\n\n最低行動（底線）：\n- 發一則成果貼文（哪怕只有一張截圖）＋寫下 1 個你最想解的卡點",
    instructors: [
      {
        name: "校長哈利",
        image: "/images/harry-principal.png",
        title: "遠距遊牧學院校長",
      },
    ],
  },
  {
    id: 6,
    phase: "Phase 2 出擊試水",
    monthWeek: "5 月 · Week 1",
    type: "共同必修",
    track: "全體共同",
    title: "知識變現",
    focusShort: "把專業打包成可賣的知識產品雛形，完成第一版受眾與offer",
    focusDetail:
      "課程類型：共同必修｜全體共同\n本週核心目標：用「市場驗證過的有效框架」把你的知識專業商品化（先做雛形，不求完美）。\n\n你要完成的任務：\n1) 選 1 個你能解的痛點：用一句話描述「受眾痛點 → 你提供的轉變」\n2) 產品雛形：選形式（模板/教學/陪跑/顧問/工具包…）＋交付內容（3–5 點）\n3) Offer 一頁紙：包含目標族群、交付物、預期成果、價格區間、購買門檻\n4) 驗證行動：本週做 1 次市場驗證（貼文/私訊/問卷/訪談擇一）\n\n產出要求（交付物）：\n- 一份「Offer 一頁紙」（可貼文或文件）\n- 一次「驗證紀錄」（截圖/回覆摘要）\n\n最低行動（底線）：\n- 寫出你的「一句話產品」：我幫【誰】用【方法】在【多久】達成【成果】",
    instructors: [
      {
        name: "講師確認中",
        image: "/images/academy-logo-placeholder.png",
        title: "本梯講師將於開課前公布",
      },
    ],
  },
  {
    id: 7,
    phase: "Phase 2 出擊試水",
    monthWeek: "5 月 · Week 2",
    type: "路線必修 – 自媒線",
    track: "自媒體接案線",
    title: "接案作品集、市場調查",
    focusShort: "完成作品集骨架＋市場調查，用一句話說清楚你賣什麼給誰",
    focusDetail:
      "課程類型：路線必修｜自媒線\n本週核心目標：從「個人優勢×市場痛點」出發，做出可成交的作品集與服務定位。\n\n你要完成的任務：\n1) 個人優勢×市場痛點：各列 5 點，圈出最有交集的 1 個主題\n2) 作品集骨架：至少放入 3 個案例欄位（即使是練習案例也可），每個包含：問題→做法→結果\n3) 市場研究：選 10 個同類型對手/案例，整理他們的：受眾、價格、交付物、主打點\n4) 服務方案雛形：定義「你賣什麼（交付物）」與「你解決什麼（成果）」各 1 句\n\n產出要求（交付物）：\n- 一份作品集連結/簡報（含 3 個案例欄位）\n- 一份市場研究摘要（至少 10 筆）\n\n最低行動（底線）：\n- 完成「一句話定位」：我幫【誰】解決【痛點】交付【成果/交付物】",
    instructors: [
      {
        name: "講師確認中",
        image: "/images/academy-logo-placeholder.png",
        title: "本梯講師將於開課前公布",
      },
    ],
  },
  {
    id: 8,
    phase: "Phase 2 出擊試水",
    monthWeek: "5 月 · Week 3",
    type: "路線必修 – 上班線",
    track: "遠端上班線",
    title: "LinkedIn 經營全攻略",
    focusShort: "優化LinkedIn關鍵欄位並完成拓展行動，讓機會主動看見你",
    focusDetail:
      "課程類型：路線必修｜上班線\n本週核心目標：把 LinkedIn 變成你的「信任載體」，讓你被搜尋、被理解、被邀請。\n\n你要完成的任務：\n1) 關鍵字定位：選 5–10 個你想被搜尋到的關鍵字（職稱/技能/產業）\n2) 三大欄位優化：Headline、About、Experience（至少更新其中 2 個）\n3) Featured/作品：放上 1 個可證明能力的作品（文章/簡報/專案/網站）\n4) 拓展行動：主動送出 10 個連結邀請（含一句話理由）\n\n產出要求（交付物）：\n- 更新後的 LinkedIn 截圖（或連結）\n- 一份拓展紀錄（邀請對象＋原因）\n\n最低行動（底線）：\n- 更新 Headline＋About（各至少 1 段）＋送出 3 個連結邀請",
    instructors: [
      {
        name: "講師確認中",
        image: "/images/academy-logo-placeholder.png",
        title: "本梯講師將於開課前公布",
      },
    ],
  },
  {
    id: 9,
    phase: "Phase 2 出擊試水",
    monthWeek: "5 月 · Week 4",
    type: "學院功能",
    track: "全體共同",
    title: "交流／成果發表（月末）＋講師團體 QA",
    focusShort: "本月成果展示＋深度QA，釐清卡點、拿到建議並落地改版",
    focusDetail:
      "課程類型：學院功能｜全體共同\n本週核心目標：把你正在做的「作品/Offer/LinkedIn」拿來做公開健檢，快速改到更可用。\n\n你要完成的任務：\n1) 準備 1 份作品展示：作品集/Offer 一頁紙/LinkedIn 任一\n2) 準備 1 個 QA 問題：用「背景→我試過什麼→我卡在哪→我希望你給什麼」描述\n3) 拿回饋後做 1 次改版：至少改 1 個區塊（標題/定位/交付物/案例…）\n\n產出要求（交付物）：\n- 一份 Sprint 復盤＋本週交付宣告\n\n最低行動（底線）：\n- 寫下你本週「要交付的最小成果」一句話",
    instructors: [
      {
        name: "校長哈利",
        image: "/images/harry-principal.png",
        title: "遠距遊牧學院校長",
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
    focusShort: "做一次學習復盤與目標校準，挑出下一個最小可行的成長實驗",
    focusDetail:
      "課程類型：學院功能｜全體共同\n本週核心目標：停止「做很多但沒變化」，用復盤把努力變成有效策略。\n\n你要完成的任務（用一頁完成）：\n1) 本月總結：我完成了什麼？（交付物/行動/數據）\n2) 三個洞察：什麼有效？什麼無效？下一步最大阻力是什麼？\n3) 目標校準：保留 1 個最重要目標，其餘降級或延後\n4) 最小實驗：選 1 個下週能驗證的行動（例如：投 3 份/發 2 篇/約 1 次訪談）\n\n產出要求（交付物）：\n- 一頁復盤（四段即可：成果/洞察/校準/實驗）\n\n最低行動（底線）：\n- 寫下「1 個本月成果＋1 個卡點＋1 個下週最小行動」",
    instructors: [
      {
        name: "校長哈利",
        image: "/images/harry-principal.png",
        title: "遠距遊牧學院校長",
      },
    ],
  },
  {
    id: 11,
    phase: "Phase 3 累積整合",
    monthWeek: "6 月 · Week 2",
    type: "路線必修 – 自媒線",
    track: "自媒體接案線",
    title: "定位＆內容企劃 & 內容撰寫框架",
    focusShort: "完成定位與內容企劃，用AI做標題/開頭，排出兩週內容節奏",
    focusDetail:
      "課程類型：路線必修｜自媒線\n本週核心目標：完成「定位→內容延展→商業變現」的最小閉環，建立可持續的內容節奏。\n\n你要完成的任務：\n1) 定位三步驟：個人盤點 → 受眾理解 → 市場調查（各寫 5 點）\n2) 同理心地圖：整理受眾的「想法/痛點/行動」（各至少 3 點）\n3) 兩週內容企劃：排出 6–8 則內容（主題＋一句話核心訊息＋CTA）\n4) 內容模板：用固定框架寫出 2 篇（可用 AI 協助：標題/開頭/段落）\n\n產出要求（交付物）：\n- 一張同理心地圖\n- 一份兩週內容表（6–8 則）\n- 2 篇內容初稿（貼文/長文皆可）\n\n最低行動（底線）：\n- 完成同理心地圖＋寫出 1 篇內容大綱（含 CTA）",
    instructors: [
      {
        name: "講師確認中",
        image: "/images/academy-logo-placeholder.png",
        title: "本梯講師將於開課前公布",
      },
    ],
  },
  {
    id: 12,
    phase: "Phase 3 累積整合",
    monthWeek: "6 月 · Week 3",
    type: "路線必修 – 上班線",
    track: "遠端上班線",
    title: "履歷、求職信秘笈",
    focusShort: "用JD拆解客製化CV與求職信，做出可直接投遞的英文/中文版本",
    focusDetail:
      "課程類型：路線必修｜上班線\n本週核心目標：用 JD 反推雇主在找的人，把 CV / Cover Letter / LinkedIn 做到「投其所好」。\n\n你要完成的任務：\n1) 選 1 份目標 JD：標出關鍵能力/關鍵字/責任（至少 10 個）\n2) CV 客製化：把你的經驗改寫成「成果×數據×影響」（至少改 5 個 bullet）\n3) 求職信：寫出「為何你/為何我/為何現在」三段式（可用 AI 先生成再人工校正）\n4) 面試回答準備：挑 3 題高頻題，寫出 STAR/CAR 回答草稿\n\n產出要求（交付物）：\n- 1 份客製化 CV（PDF/文件）\n- 1 封對應 JD 的求職信\n- 3 題面試回答草稿\n\n最低行動（底線）：\n- 選定 1 份 JD＋改寫你履歷上的 3 個 bullet（含具體成果）",
    instructors: [
      {
        name: "講師確認中",
        image: "/images/academy-logo-placeholder.png",
        title: "本梯講師將於開課前公布",
      },
    ],
  },
  {
    id: 13,
    phase: "Phase 3 累積整合",
    monthWeek: "6 月 · Week 4",
    type: "學院功能",
    track: "全體共同",
    title: "交流／成果發表（月末）",
    focusShort: "本月交流與成果發表，公開展示作品並把回饋轉成下週待辦",
    focusDetail:
      "課程類型：學院功能｜全體共同\n本週核心目標：把「內容/履歷/作品」拿出來公開校正，並把回饋轉成可執行待辦。\n\n你要完成的任務：\n1) 成果展示：自媒線（內容企劃/貼文）或上班線（CV/求職信/LinkedIn）擇一\n2) 指定回饋：你希望大家幫你看哪個點？（定位/可讀性/說服力/差異化…）\n3) 回饋落地：把收到的建議整理成「3 個修改項」＋「下週行動」\n\n產出要求（交付物）：\n- 一則成果展示貼文＋指定回饋問題\n- 一份「回饋→修改待辦」清單（至少 3 項）\n\n最低行動（底線）：\n- 貼出你的成果截圖/連結＋寫下 1 句你最想改進的地方",
    instructors: [
      {
        name: "校長哈利",
        image: "/images/harry-principal.png",
        title: "遠距遊牧學院校長",
      },
    ],
  },
  {
    id: 14,
    phase: "Phase 3 累積整合",
    monthWeek: "7 月 · Week 1",
    type: "共同必修",
    track: "全體共同",
    title: "財務課程",
    focusShort: "完成旅居財務盤點與風險管理，建立收支表＋緊急預備金目標",
    focusDetail:
      "課程類型：共同必修｜全體共同\n本週核心目標：把「想要自由」換算成可計算的財務步驟（生活方式自由＋風險管理）。\n\n你要完成的任務：\n1) 理想生活方式：寫下你想要的「旅居版本」與每月固定成本（食住行/保險/稅…）\n2) 收支盤點：列出目前收入來源、波動區間、必要支出（做出一張收支表）\n3) FIRE/財務里程碑：設定 1 個可達成的短期財務目標（緊急預備金/現金流/投資習慣）\n4) 風險清單：列出你最怕的 3 個情境（失業/案源斷/生病…）與對應備案\n\n產出要求（交付物）：\n- 一份收支盤點（表格即可）\n- 一個明確數字的「緊急預備金目標」＋完成日期\n\n最低行動（底線）：\n- 寫下你每月「必要支出」與「緊急預備金目標」兩個數字",
    instructors: [
      {
        name: "講師確認中",
        image: "/images/academy-logo-placeholder.png",
        title: "本梯講師將於開課前公布",
      },
    ],
  },
  {
    id: 15,
    phase: "Phase 3 累積整合",
    monthWeek: "7 月 · Week 2",
    type: "路線必修 – 自媒線",
    track: "自媒體接案線",
    title: "短影音腳本 & 拍攝／剪輯",
    focusShort: "寫出一支爆紅短影音腳本並拍出粗剪，建立可複製的製作流程",
    focusDetail:
      "課程類型：路線必修｜自媒線\n本週核心目標：把流量「做出來」：一支可發布的短影音（先求完成，再求完美）。\n\n你要完成的任務：\n1) 選題：從你的受眾痛點出發，選 1 個「一看就想停下來」的主題\n2) 腳本：寫出 15–45 秒腳本（Hook→重點→例子→CTA）\n3) 拍攝：至少完成 A-roll（口播/畫面）素材\n4) 粗剪：完成一版粗剪（字幕可先簡化），並準備上傳或社群回饋\n\n產出要求（交付物）：\n- 一份腳本（文字）\n- 一支粗剪影片（檔案/連結/截圖皆可）\n\n最低行動（底線）：\n- 完成「Hook + 3 個重點 + CTA」的腳本（不必拍）",
    instructors: [
      {
        name: "講師確認中",
        image: "/images/academy-logo-placeholder.png",
        title: "本梯講師將於開課前公布",
      },
    ],
  },
  {
    id: 16,
    phase: "Phase 3 累積整合",
    monthWeek: "7 月 · Week 3",
    type: "路線必修 – 上班線",
    track: "遠端上班線",
    title: "獵頭與面試談薪策略",
    focusShort: "用獵頭視角準備面試與談薪策略，設定薪資區間與回覆話術",
    focusDetail:
      "課程類型：路線必修｜上班線\n本週核心目標：把你從「投履歷的人」推進到「能被邀請/能談條件的人」。\n\n你要完成的任務：\n1) 面試敘事：整理 1 段 5–7 分鐘自我介紹（背景→成果→轉折→目標）\n2) 薪資策略：寫出你的「期望區間」與「底線」（含理由：市場/能力/成果）\n3) 回覆話術：準備 3 組常見情境的回覆（獵頭詢問/薪資探底/流程安排）\n4) 反詐騙檢核：列出你會檢查的 5 個點（公司資訊/流程/合約/付款…）\n\n產出要求（交付物）：\n- 一份面試敘事稿（可口說稿）\n- 一份薪資區間＋回覆話術清單\n\n最低行動（底線）：\n- 寫下你的「期望區間」＋3 句談薪回覆話術",
    instructors: [
      {
        name: "講師確認中",
        image: "/images/academy-logo-placeholder.png",
        title: "本梯講師將於開課前公布",
      },
    ],
  },
  {
    id: 17,
    phase: "Phase 3 累積整合",
    monthWeek: "7 月 · Week 4",
    type: "學院功能",
    track: "全體共同",
    title: "共創專案說明會＆成員募集",
    focusShort: "共創專案說明會：選題、分工、排程，加入一個實戰小隊開跑",
    focusDetail:
      "課程類型：學院功能｜全體共同\n本週核心目標：進入「實戰場域」：用協作做出可展示的成果，並讓連結變深。\n\n你要完成的任務：\n1) 選擇參與方式：你要當「產出者/協作者/推進者」哪一種？\n2) 選題：從（求職/內容/產品/活動/工具）中選 1 個你最想投入的方向\n3) 分工：認領 1 個角色（例：PM/內容/設計/剪輯/BD/研究…）\n4) 排程：確認每週固定共創時段＋本週交付\n\n產出要求（交付物）：\n- 一個「角色認領」＋「本週交付」宣告\n- 一份共創排程（簡單行事曆也可）\n\n最低行動（底線）：\n- 在共創貼文底下留言：我加入哪一隊＋我這週會交付什麼",
    instructors: [
      {
        name: "校長哈利",
        image: "/images/harry-principal.png",
        title: "遠距遊牧學院校長",
      },
    ],
  },
  {
    id: 18,
    phase: "Phase 3 累積整合",
    monthWeek: "7 月 · Week 5",
    type: "學院功能",
    track: "全體共同",
    title: "交流／成果發表（月末）＋共創成員募集",
    focusShort: "本月成果展示＋共創招募＋AMA，確認你下一階段的專注任務",
    focusDetail:
      "課程類型：學院功能｜全體共同\n本週核心目標：把「個人進度」和「共創進度」一次對齊，帶著清楚任務進入下個月。\n\n你要完成的任務：\n1) 成果展示：個人路線交付 1 份（內容/履歷/作品/投遞紀錄…）\n2) 共創更新：說明目前共創在做什麼、缺什麼角色/資源\n3) AMA 提問：準備 1 個你最想問的問題（越具體越好）\n4) 下月承諾：寫下你下月唯一最重要的目標＋每週固定節奏\n\n產出要求（交付物）：\n- 一則成果貼文（含「下月承諾」）\n- 一則 AMA 提問或回覆\n\n最低行動（底線）：\n- 貼出本月 1 個成果＋寫下下月 1 個最重要目標",
    instructors: [
      {
        name: "校長哈利",
        image: "/images/harry-principal.png",
        title: "遠距遊牧學院校長",
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
    focusShort: "共創進度復盤與目標調整，重新對齊本月衝刺重點與交付標準",
    focusDetail:
      "課程類型：學院功能｜全體共同\n本週核心目標：把共創從「很熱鬧」變成「有交付」，重新對齊本月衝刺節奏。\n\n你要完成的任務：\n1) 共創復盤：上次 Sprint 做了什麼？卡在哪？接下來要驗證什麼？\n2) 交付標準：本週交付要長什麼樣子（可展示/可測試/可被回饋）\n3) 角色與時間：確認你本週投入的時段（至少 1 個固定時段）\n4) 風險處理：列出 1 個最大風險與備案（缺人/缺素材/時間不夠…）\n\n產出要求（交付物）：\n- 一份 Sprint 復盤＋本週交付宣告\n\n最低行動（底線）：\n- 寫下你本週「要交付的最小成果」一句話",
    instructors: [
      {
        name: "校長哈利",
        image: "/images/harry-principal.png",
        title: "遠距遊牧學院校長",
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
    focusShort: "共創大會議：交付一個可驗證的Sprint成果，並完成下次迭代計畫",
    focusDetail:
      "課程類型：學院功能｜全體共同\n本週核心目標：交付一個「可驗證」成果（能被看到、被測試、被回饋）。\n\n你要完成的任務：\n1) 交付 Sprint 成果：Demo/頁面/影片/簡報/流程任一\n2) 收集回饋：至少拿到 3 份回饋（同學/外部朋友/目標受眾）\n3) 下次迭代：把回饋整理成「保留/修改/刪除」三類，選 1 個最重要改動\n\n產出要求（交付物）：\n- 一個可展示成果（附連結/截圖）\n- 一份回饋整理＋下一步迭代清單\n\n最低行動（底線）：\n- 交付一個「可被看到」的版本（哪怕是半成品截圖＋說明）",
    instructors: [
      {
        name: "校長哈利",
        image: "/images/harry-principal.png",
        title: "遠距遊牧學院校長",
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
    focusShort: "建立人生SOP與固定節奏，打造能長期運作的生活×工作系統",
    focusDetail:
      "課程類型：共同必修｜全體共同\n本週核心目標：把自由生活做成「能運作的系統」：清楚方向、穩定節奏、可持續行動。\n\n你要完成的任務：\n1) 週節奏：設計一份「理想週行程」（工作/運動/社交/休息）＋固定儀式\n2) 月主題：為下個月取 1 個主題（例：找工作衝刺月/作品集月/內容出擊月）\n3) 溝通SOP：寫下 3 句你的「界線/需求/拒絕」模板（對家人/同事/客戶皆可套用）\n4) 維持系統：選 1 個你會每天做的微習慣（10 分鐘內）\n\n產出要求（交付物）：\n- 一張理想週行程（表格即可）\n- 一段月主題宣告＋3 句溝通模板\n\n最低行動（底線）：\n- 選 1 個每天 10 分鐘的微習慣＋寫下固定時間（例：每天 08:30）",
    instructors: [
      {
        name: "講師確認中",
        image: "/images/academy-logo-placeholder.png",
        title: "本梯講師將於開課前公布",
      },
    ],
  },
  {
    id: 22,
    phase: "Phase 3 累積整合",
    monthWeek: "8 月 · Week 4",
    type: "彈性週",
    track: "全體共同",
    title: "彈性週",
    focusShort: "補課與作業清倉：把缺的交付補齊，並準備期末對外亮相素材",
    focusDetail:
      "課程類型：彈性週｜全體共同\n本週核心目標：把「未完成」一次清掉，並開始整理期末要對外展示的素材。\n\n你要完成的任務：\n1) 補課：挑 1 堂你最需要的回放，整理 3 個重點＋1 個立刻行動\n2) 作業清倉：把欠交的交付補齊（至少補 1 份）\n3) 亮相素材準備：整理你的「成果清單」（作品/履歷/內容/共創）＋數據（若有）\n4) 展示大綱：寫出 5 句「我的故事」：起點→卡點→行動→成果→下一步\n\n產出要求（交付物）：\n- 一份補課筆記（3 重點＋1 行動）\n- 一份成果清單＋展示大綱\n\n最低行動（底線）：\n- 補交 1 份作業或補課 1 堂並寫 3 個重點",
    instructors: [
      {
        name: "校長哈利",
        image: "/images/harry-principal.png",
        title: "遠距遊牧學院校長",
      },
    ],
  },
  {
    id: 23,
    phase: "Phase 3 累積整合",
    monthWeek: "9 月 · Week 1",
    type: "學院功能",
    track: "全體共同",
    title: "全體期末成果發表會＋學員分享＋未來機會",
    focusShort: "期末成果發表：把你的作品、數據與故事整理成可對外展示版本",
    focusDetail:
      "課程類型：學院功能｜全體共同\n本週核心目標：把你 6 個月的努力變成「可對外展示」的成果包（作品＋故事＋下一步）。\n\n你要完成的任務：\n1) 成果包整理（擇一路線為主）：\n- 自媒線：定位/作品集/內容代表作/成交或名單數據/下一步方案\n- 上班線：目標職位/JD對照/客製化CV與求職信/LinkedIn/投遞與面試進度\n2) 3 分鐘故事：起點→轉折→行動→成果→下一步（用數據或具體成果支撐）\n3) 對外版本：把成果包做成「一頁連結」或「5–8 張簡報」\n\n產出要求（交付物）：\n- 一份對外成果包（連結/簡報）\n- 一段 3 分鐘分享稿（文字即可）\n\n最低行動（底線）：\n- 列出 5 個你最想展示的成果項目＋寫出分享的 5 句大綱",
    instructors: [
      {
        name: "校長哈利",
        image: "/images/harry-principal.png",
        title: "遠距遊牧學院校長",
      },
    ],
  },
  {
    id: 24,
    phase: "Phase 3 累積整合",
    monthWeek: "9 月 · Week 2",
    type: "學院功能",
    track: "全體共同",
    title: "結業典禮",
    focusShort: "結業典禮：交付最終成果包與下一步路線，啟動畢業後行動計畫",
    focusDetail:
      "課程類型：學院功能｜全體共同\n本週核心目標：交付最終版成果包，並把你接下來 30 天的行動「排進生活」。\n\n你要完成的任務：\n1) 最終成果包：完成「最終版」（把回饋修進去）\n2) 下一步路線：選 1 條你要繼續走的主線（上班/接案/內容/共創延伸）\n3) 30 天行動：設定 1 個成果目標＋每週固定節奏（行事曆化）\n4) 支援系統：寫下你需要的 2 種支持（同伴/資源/回饋/環境）\n\n產出要求（交付物）：\n- 最終成果包連結（可被外部理解）\n- 30 天行動計畫（目標＋節奏＋時段）\n\n最低行動（底線）：\n- 寫下你畢業後「30 天唯一目標」＋每週 1 個固定行動時段",
    instructors: [
      {
        name: "校長哈利",
        image: "/images/harry-principal.png",
        title: "遠距遊牧學院校長",
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
