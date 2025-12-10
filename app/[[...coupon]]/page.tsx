"use client"

import { useParams } from "next/navigation"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, X, Calendar, TrendingUp, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePricing } from "@/contexts/pricing-context"
import { AnnouncementBar } from "@/components/announcement-bar"
import { StickyBottomBar } from "@/components/sticky-bottom-bar"
import { PricingSection } from "@/components/sections/pricing-section" // Import PricingSection
import FAQSection from "@/components/sections/faq-section" // Import FAQSection

// Define PlanId type here or import it if it's defined elsewhere
type PlanId = "selfMedia" | "remoteJob" | "dualLine"

const planConfig: Record<PlanId, { name: string; checkoutPath: string }> = {
  selfMedia: { name: "自媒體線路方案", checkoutPath: "planId=selfmedia" },
  remoteJob: { name: "遠端上班線路方案", checkoutPath: "planId=remotejob" },
  dualLine: { name: "雙線整合方案", checkoutPath: "planId=be56b4ae-6f31-43be-8bfb-68fda4294a9a" },
}

const popularPlanId: PlanId = "dualLine"

// const formatPrice = (price: number): string => {
//   return price.toLocaleString("zh-TW")
// }

const getCheckoutURL = (planId: PlanId, couponCode?: string) => {
  const baseURL = `https://travelworkacademy.myteachify.com/checkout?${planConfig[planId].checkoutPath}`
  return couponCode ? `${baseURL}&coupon=${encodeURIComponent(couponCode)}` : baseURL
}

export default function HomePage() {
  const params = useParams()
  const [couponCode, setCouponCode] = useState<string | null>(null)
  const [activeMapTab, setActiveMapTab] = useState<string>("遠端上班") // State for Learning Map tabs

  const [selectedWeek, setSelectedWeek] = useState<{
    week: number
    title: string
    instructor: string
    instructorData: any
    month: number
  } | null>(null)

  const { currentStageData, timeLeft, lowestPrice, selectedPlanId, setSelectedPlanId, getTrackingParams } = usePricing()

  // State for the highlight popup
  const [highlightPopup, setHighlightPopup] = useState<{
    isOpen: boolean
    title: string
    subtitle: string
    content: string
  }>({
    isOpen: false,
    title: "",
    subtitle: "",
    content: "",
  })

  useEffect(() => {
    if (params.coupon && Array.isArray(params.coupon) && params.coupon.length > 0) {
      setCouponCode(params.coupon[0])
    } else if (typeof params.coupon === "string") {
      setCouponCode(params.coupon)
    }
  }, [params])

  const getCheckoutURLWithTracking = (planId: PlanId = "dualLine") => {
    const effectivePlanId = selectedPlanId || planId
    const baseURL = getCheckoutURL(effectivePlanId, couponCode || undefined)
    const trackingParams = getTrackingParams()
    return `${baseURL}${trackingParams}`
  }

  const scrollToPricing = useCallback(() => {
    document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showFullSchedule, setShowFullSchedule] = useState(false)
  const [showAllStages, setShowAllStages] = useState(false) // New state for showing all stages in pricing timeline
  const [timelineExpanded, setTimelineExpanded] = useState(false) // State for timeline expansion

  const stagePhotos = [
    [
      {
        src: "/images/e6-88-90-e9-95-b7-e7-87-9flogo.jpg",
        alt: "艾兒莎成長營 Logo",
      },
      {
        src: "/images/e6-88-90-e9-95-b7-e7-87-9flogo.jpg",
        alt: "艾兒莎成長營 Logo",
      },
      { src: "/remote-work-home-office.png", alt: "遠距工作環境設置" },
    ],
    [
      {
        src: "/images/2-2.jpeg",
        alt: "一日同事 Coworking",
      },
      {
        src: "/images/2-3.jpeg",
        alt: "遊牧者交流活動",
      },
      {
        src: "/images/2-1.jpeg",
        alt: "每月數位遊牧小聚",
      },
    ],
    [
      {
        src: "/images/3-1.webp",
        alt: "越南峴港Holi節慶文化體驗",
      },
      {
        src: "/images/3-3.webp",
        alt: "海邊冥想身心平衡",
      },
      {
        src: "/images/3-2.webp",
        alt: "台灣數位遊牧社群聚會",
      },
    ],
    [
      {
        src: "/images/4-2.png",
        alt: "線上會議討論",
      },
      {
        src: "/images/4-3.jpeg",
        alt: "專業演講分享",
      },
      {
        src: "/images/digital-learning-technology-application-with-lapto.jpg",
        alt: "數位學習科技應用",
      },
    ],
    [
      {
        src: "/images/20231216.jpeg",
        alt: "社群網絡建立慶祝活動",
      },
      {
        src: "/images/20250329.jpeg",
        alt: "學習成果展示與認證儀式",
      },
      {
        src: "/images/227a8906.jpeg",
        alt: "線上復盤工作坊知識分享",
      },
    ],
  ]

  const openGallery = (stageIndex: number, photoIndex = 0) => {
    setCurrentStage(stageIndex)
    setCurrentPhotoIndex(photoIndex)
    setIsGalleryOpen(true)
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === stagePhotos[currentStage].length - 1 ? 0 : prev + 1))
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? stagePhotos[currentStage].length - 1 : prev - 1))
  }

  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set())
  const [calendarPhaseFilter, setCalendarPhaseFilter] = useState<string>("全部")
  const [calendarTrackFilter, setCalendarTrackFilter] = useState<string>("雙軌")

  const calendarData = [
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
      instructors: [
        { name: "林上哲", image: "/images/e6-9e-97-e4-b8-8a-e5-93-b2-2.jpeg", title: "AI 生產力工具教育者" },
      ],
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

  const filteredCalendarData = useMemo(() => {
    return calendarData.filter((week) => {
      const phaseMatch = calendarPhaseFilter === "全部" || week.phase === calendarPhaseFilter
      // 雙軌 = 顯示全部；遠端上班 = 只顯示遠端上班線；自媒體接案 = 只顯示自媒體接案線
      const trackMatch =
        calendarTrackFilter === "雙軌" ||
        (calendarTrackFilter === "遠端上班" &&
          (week.track === "遠端上班線" || week.track === "全體共同" || week.track === "共創專案")) ||
        (calendarTrackFilter === "自媒體接案" &&
          (week.track === "自媒體接案線" || week.track === "全體共同" || week.track === "共創專案"))
      return phaseMatch && trackMatch
    })
  }, [calendarPhaseFilter, calendarTrackFilter])

  const toggleWeekExpansion = (weekId: number) => {
    setExpandedWeeks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(weekId)) {
        newSet.delete(weekId)
      } else {
        newSet.add(weekId)
      }
      return newSet
    })
  }

  const getPhaseColor = (phase: string) => {
    if (phase.includes("Phase 1")) return { bg: "bg-[#D4B483]/20", text: "text-[#D4B483]", border: "border-[#D4B483]" }
    if (phase.includes("Phase 2")) return { bg: "bg-[#17464F]/20", text: "text-[#17464F]", border: "border-[#17464F]" }
    if (phase.includes("Phase 3")) return { bg: "bg-[#A06E56]/20", text: "text-[#A06E56]", border: "border-[#A06E56]" }
    return { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" }
  }

  const getTrackColor = (track: string) => {
    if (track === "遠端上班線") return { bg: "bg-[#17464F]", text: "text-white" }
    if (track === "自媒體接案線") return { bg: "bg-[#D4B483]", text: "text-white" }
    return { bg: "bg-gray-500", text: "text-white" }
  }

  const instructors = [
    {
      name: "工具王阿璋",
      title: "『阿璋遊牧』電子報創辦人、數位遊牧陪跑計劃創辦人、IP 經營者",
      image: "/images/e5-b7-a5-e5-85-b7-e7-8e-8b.png",
      link: "https://www.johntool.com",
      background:
        "工具王阿璋是『阿璋遊牧』電子報創辦人、數位遊牧陪跑計劃創辦人、IP 經營者，擁有豐富的數位遊牧經驗與社群經營知識。",
    },
    {
      name: "三分鐘",
      title: "IG+FB+Threads 共 10萬粉絲、知識型 IP 經營者，揭秘如何透過社群影響力，放大個人價值",
      image: "/images/e4-b8-89-e5-88-86-e9-90-98.jpeg",
      link: "https://www.instagram.com/only3minute/",
      background:
        "三分鐘是擁有超過10萬粉絲的知識型 IP 經營者，擅長透過社群媒體放大個人價值，並分享實用的內容創作與經營策略。",
    },
    {
      name: "鮪魚",
      title: "專注於知識變現與內容創新，協助超過百位講師完成課程開發，累積銷售額突破 3 億。",
      image: "/images/e9-ae-aa-e9-ad-9a.jpeg",
      link: "https://www.instagram.com/newsvegtw/",
      background: "專注於知識變現與內容創新，協助超過百位講師完成課程開發，累積銷售額突破 3 億。",
    },
    {
      name: "西打藍",
      title: "創立一人公司、IG 粉絲近 1 萬、電子報訂閱 2500+，五年真實經驗帶你從零開始到高價接案的完整路徑",
      image: "/images/e8-a5-bf-e6-89-93-e8-97-8d.jpeg",
      link: "https://siddharam.com",
      background:
        "西打藍是一位成功的獨立工作者，創立一人公司並累積豐富的接案經驗，將分享從零開始到高價接案的完整路徑。",
    },
    {
      name: "林上哲",
      title: "非資訊背景 AI生產力工具教育者，已幫助4200+ 台灣、日本和香港的學員",
      image: "/images/e6-9e-97-e4-b8-8a-e5-93-b2-2.jpeg",
      link: "https://www.instagram.com/nuva.now/",
      background:
        "林上哲是一位非資訊背景的 AI 生產力工具教育者，擅長將複雜的 AI 工具轉化為易於理解的教學內容，幫助學員提升工作效率。",
    },
    {
      name: "許詮",
      title: "前 TikTok 子公司總經理、前阿里巴巴子公司副總、XChange創辦人、33 歲退休旅居峇里島。",
      image: "/images/e8-a8-b1-e8-a9-ae.jpeg",
      link: "https://www.facebook.com/SnT.life",
      background:
        "許詮曾任職於 TikTok 和阿里巴巴等知名企業，現為 XChange 創辦人，並已實現33歲退休旅居峇里島的目標，是實現財務自由的典範。",
    },
    {
      name: "Shelley",
      title: "ADPList 2025 Top 50 Global Mentor，LinkedIn 個人品牌術，機會自己來敲門",
      image: "/images/shelly.jpeg",
      link: "https://www.linkedin.com/in/yuhsuan-tien",
      background:
        "Shelley 是 ADPList 2025 Top 50 Global Mentor，專精於 LinkedIn 個人品牌建立，協助個人發掘機會並拓展職涯。",
    },
    {
      name: "讀者太太",
      title: "英國職涯教練、「女力學院」《人脈力》講師，突破跨國遠距職涯天花板",
      image: "/images/e8-ae-80-e8-80-85-e5-a4-aa-e5-a4-aa.jpeg",
      link: "https://www.facebook.com/duzhetaitai",
      background: "讀者太太是英國職涯教練，也是「女力學院」《人脈力》講師，擅長協助專業人士突破跨國遠距職涯的限制。",
    },
    {
      name: "Emilia",
      title: "高階跨國獵頭，獵頭揭密談薪技巧與職涯躍升策略",
      image: "/images/emilia.jpeg",
      link: "https://www.linkedin.com/in/emchh/",
      background: "Emilia 是一位經驗豐富的高階跨國獵頭，將分享獵頭行業的秘辛、談薪技巧以及職涯躍升的策略。",
    },
    {
      name: "Joyce Weng",
      title: "過去為記者的她，跳脫傳統、成功於海外轉型遠全遠距工作，她將剖析如何規劃旅居財務、精打細算開銷！",
      image: "/images/joyce.jpeg",
      link: "https://www.facebook.com/storiesinmyworld",
      background:
        "Joyce Weng 是一位成功從記者轉型為遠距工作者的前輩，將分享她在海外的經驗，以及如何規劃旅居財務與開銷。",
    },
    {
      name: "林佳 Zoe",
      title: "9萬粉絲自媒體創作者，專長於打造自媒體與 IG 流量，協助你產出具潛力的短影片與貼文！",
      image: "/images/e6-af-8f-e6-97-a5e-e9-8c-a0.jpeg",
      link: "https://www.daydayding.com",
      background:
        "林佳 Zoe 是一位擁有9萬粉絲的自媒體創作者，專長於 IG 流量經營與短影片製作，將分享如何打造吸引人的內容。",
    },
    {
      name: "Angela Feng",
      title: "Ness Wellness 共同創辦人、創業投資管理者，遠距生活可持續的身心靈平衡",
      image: "/images/angela.jpeg",
      link: "https://www.nesswellness.com/",
      background:
        "Angela Feng 是 Ness Wellness 的共同創辦人，也是創業投資管理者，將分享如何實現遠距生活中的身心靈平衡。",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <AnnouncementBar scrollToPricing={scrollToPricing} />
      {/* ANNOUNCEMENT BAR - Desktop Only */}
      {/* {currentStageData && (
        <div className="sticky top-0 z-50 bg-[#17464F] text-white py-3 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span>🔥</span>
              <span>
                <span className="text-[#D4B483] font-bold">{currentStageData.name}</span>
                <span className="text-[#D4B483] font-bold">{currentStageData.discountLabel}</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
                <span>
                  距離下次價格調整還有：
                  <span className="font-bold text-[#D4B483] ml-1">
                    {String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 小時{" "}
                    {String(timeLeft.minutes).padStart(2, "0")} 分 {String(timeLeft.seconds).padStart(2, "0")} 秒
                  </span>
                </span>
              ) : (
                <span className="text-white/80">本階段已結束，價格即將切換至下一階段</span>
              )}
              <span className="mx-1">|</span>
              <span>
                單線方案本階段最低{" "}
                <span className="font-bold text-[#D4B483]">NT$ {lowestPrice ? formatPrice(lowestPrice) : "--"}</span> 起
              </span>
            </div>

            <button
              onClick={scrollToPricing}
              className="bg-[#D4B483] text-[#17464F] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#c9a673] transition-colors flex-shrink-0"
            >
              查看方案
            </button>
          </div>
        </div>
      )} */}
      {/* SECTION 1 HERO START */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#17464F]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] border border-[#E8C547]/30 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] border border-[#E8C547]/20 rounded-full" />
          <div className="absolute bottom-1/4 right-1/2 w-[300px] h-[300px] border border-[#E8C547]/10 rounded-full" />
          <div className="absolute bottom-0 left-0 right-0 h-40">
            <div className="absolute bottom-8 left-[10%] w-1 h-1 bg-[#E8C547] rounded-full animate-pulse" />
            <div className="absolute bottom-16 left-[20%] w-1.5 h-1.5 bg-[#E8C547]/80 rounded-full animate-pulse delay-100" />
            <div className="absolute bottom-12 left-[35%] w-1 h-1 bg-[#E8C547]/60 rounded-full animate-pulse delay-200" />
            <div className="absolute bottom-20 left-[45%] w-2 h-2 bg-[#E8C547]/70 rounded-full animate-pulse delay-300" />
            <div className="absolute bottom-6 left-[55%] w-1 h-1 bg-[#E8C547] rounded-full animate-pulse delay-150" />
            <div className="absolute bottom-14 left-[65%] w-1.5 h-1.5 bg-[#E8C547]/80 rounded-full animate-pulse delay-250" />
            <div className="absolute bottom-10 left-[75%] w-1 h-1 bg-[#E8C547]/60 rounded-full animate-pulse delay-100" />
            <div className="absolute bottom-18 left-[85%] w-1.5 h-1.5 bg-[#E8C547]/70 rounded-full animate-pulse delay-200" />
            <div className="absolute bottom-4 left-[90%] w-1 h-1 bg-[#E8C547] rounded-full animate-pulse delay-300" />
          </div>
        </div>

        <div className="absolute top-0 left-0 z-30 py-4 px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Image
              src="/images/academy-logo.png"
              alt="遠距遊牧學院 Travel with Work Academy"
              width={200}
              height={105}
              className="h-auto w-[140px] sm:w-[180px] brightness-0 invert"
              priority
            />
            {/* Airplane trajectory dotted line */}
            <svg
              className="absolute -bottom-20 left-4 w-16 h-24 text-white/40"
              viewBox="0 0 60 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            >
              <path d="M30 0 Q 10 30, 20 50 Q 30 70, 15 100" />
            </svg>
          </div>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left content */}
            <div className="space-y-6 text-center lg:text-left">
              <p className="text-sm sm:text-base text-[#D4B483] font-medium tracking-wide">
                華語世界第一個以「行動」設計的遠距遊牧學院
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-wide">
                用六個月，
                <br />
                把「也許有一天」
                <br />
                變成「<span className="text-[#D4B483]">我正在路上</span>」
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                遠距遊牧學院結合線上課程、行動任務、共學社群與旅居體驗，
                幫助已經準備行動的上班族，在不辭職、不斷線收入的前提下，
                驗證自己適合的遠距路線：遠端上班、自媒體接案，或雙線並行。
              </p>

              {/* Route tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                <span className="px-4 py-2 rounded-full border border-white/40 text-white text-sm font-medium">
                  自媒體接案線路
                </span>
                <span className="px-4 py-2 rounded-full border border-white/40 text-white text-sm font-medium">
                  遠端上班線路
                </span>
                <span className="px-4 py-2 rounded-full border border-white/40 text-white text-sm font-medium">
                  雙線整合線路
                </span>
              </div>

              <div className="space-y-3 text-left max-w-xl mx-auto lg:mx-0">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#D4B483] mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">梳理你的遠距職涯藍圖與下一步行動</p>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#D4B483] mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">完成履歷、作品集、個人頁面等可見成果</p>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#D4B483] mt-0.5 flex-shrink-0" />
                  <p className="text-white/90">加入一群真的在為自由生活行動的夥伴</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col items-center lg:items-start gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#E8C547] hover:bg-[#D4B483] text-[#17464F] rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  <a
                    href={getCheckoutURLWithTracking()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (typeof window !== "undefined" && (window as any).trackInitiateCheckout) {
                        ;(window as any).trackInitiateCheckout(0)
                      }
                    }}
                  >
                    我要加入這一梯學員
                  </a>
                </Button>
                <button
                  onClick={() => {
                    document.getElementById("course-highlights")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-white/70 hover:text-[#D4B483] font-medium text-base transition-colors duration-200"
                >
                  還在觀望？先看六個月怎麼走 ↓
                </button>
              </div>

              {/* Social proof */}
              <div className="pt-4 text-center lg:text-left">
                <p className="text-sm text-white/60">
                  2024-2025 已累積 <span className="text-[#D4B483] font-semibold">400+</span> 付費學員與{" "}
                  <span className="text-[#D4B483] font-semibold">1,000+</span> 社群成員，
                  <br className="hidden sm:block" />
                  一起在台灣與世界各地行動中。
                </p>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] bg-[#C9D7D4] relative">
                  <Image
                    src="/images/hero-background.png"
                    alt="遠距工作場景 - 共同工作空間"
                    fill
                    className="object-cover"
                    priority
                    sizes="50vw"
                  />
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-full h-full border-2 border-[#D4AF37]/50 rounded-2xl pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-full h-full border border-[#D4AF37]/25 rounded-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-28 h-28 border-2 border-[#D4AF37]/40 rounded-full pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 border border-[#D4AF37]/20 rounded-full pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 2 COURSE HIGHLIGHTS START - 正在尋找「下一步」的你 */}
      <section id="course-highlights" className="py-16 sm:py-24 bg-[#17464F] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#D4B483]/20 rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-[#D4B483]/15 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-20 hidden lg:block">
          <svg className="w-8 h-8 text-[#D4B483]/30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 text-balance">
              正在尋找「下一步」的你
            </h2>
            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-4">
              不管你現在在哪個階段，你都有機會在這裡找到開始的位置。
              <br className="hidden sm:block" />你 ندار一定已經想好要不要辭職、要不要成為全職 Nomad。但你心裡大概知道——
              <br className="hidden sm:block" />
              接下來的人生，應該不只有「每天通勤、等著放假」這一種選項。
            </p>
            <p className="text-[#D4B483] font-medium mt-6">在這裡，你可能會在這幾種狀態裡，看到自己的影子：</p>
          </div>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {/* Card 1 - 職涯主線 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#D4B483]/30 hover:border-[#D4B483]/50 transition-all duration-300 relative group">
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4B483]/60 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4B483]/60 rounded-br-2xl" />

              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                  <svg
                    className="w-14 h-14 text-[#D4B483]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 9l2 3-2 3-2-3 2-3z" fill="currentColor" />
                  </svg>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#D4B483] mb-4 leading-snug">
                  想要更有選擇權的職涯主線
                </h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  有穩定工作、不一定討厭現在公司，但看得到天花板；正在思考能否換到更彈性、可遠距的團隊，或讓履歷在未來更有選擇。
                </p>
              </div>
            </div>

            {/* Card 2: 安全感 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#D4B483]/30 hover:border-[#D4B483]/50 transition-all duration-300 relative group">
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4B483]/60 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4B483]/60 rounded-br-2xl" />

              <div className="flex flex-col items-center text-center">
                {/* Icon - Coins */}
                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                  <svg
                    className="w-14 h-14 text-[#D4B483]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <ellipse cx="12" cy="6" rx="8" ry="3" />
                    <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
                    <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" />
                    <path d="M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" />
                    <path d="M12 9v3M12 15v3" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 3l2 3h-4l2-3z" fill="currentColor" />
                  </svg>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#D4B483] mb-4 leading-snug">
                  想多一條安全感，不想只靠一份薪水
                </h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  想用內容、接案、知識服務慢慢累積第二條收入線；希望在不壓垮自己的前提下，踏出有感的一步，而不是一次
                  all-in。
                </p>
              </div>
            </div>

            {/* Card 3: 不確定 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#D4B483]/30 hover:border-[#D4B483]/50 transition-all duration-300 relative group">
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4B483]/60 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4B483]/60 rounded-br-2xl" />

              <div className="flex flex-col items-center text-center">
                {/* Icon - Map with pin */}
                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                  <svg
                    className="w-14 h-14 text-[#D4B483]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 10h18M8 5v14M16 5v14" />
                    <circle cx="18" cy="8" r="3" fill="currentColor" />
                    <path d="M18 11v3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#D4B483] mb-4 leading-snug">
                  答案還不確定，但不想再只是想想
                </h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  現在的路看起來還行，但常被旅居、遠距、遊牧故事勾起一點遺憾；想在未來六個月裡，用比較踏實的方法去體驗、去嘗試，而不是只滑過別人的人生。
                </p>
              </div>
            </div>
          </div>

          {/* Three dots separator */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            <span className="w-2 h-2 rounded-full bg-[#17464F] border border-[#D4B483]" />
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
          </div>

          {/* Closing statement */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-white/80 leading-relaxed mb-4">
              你缺的不是更多資訊，而是一個地方，
              <br className="sm:hidden" />
              <span className="block md:inline">讓你在未來六個月裡，有人陪你一起試、</span>
              <span className="block md:inline">一起走、一起調整方向。</span>
            </p>
          </div>
        </div>
      </section>
      {/* SECTION 3 PAIN POINTS START - 三大痛點 (重製版) */}
      <section className="bg-[#17464F] relative overflow-hidden">
        {/* 桌面版：顯示切圖 */}
        <div className="hidden lg:block">
          <Image
            src="/images/section3-painpoints-desktop.png"
            alt="不是你不努力，而是拼圖還有缺 - 方向斷裂、方法斷裂、同伴斷裂"
            width={1920}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* 手機版/平板版：保持原有程式碼佈局 */}
        <div className="lg:hidden py-16 sm:py-24">
          {/* 背景裝飾：金色弧線 (極細微) */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-[#D4B483]/10 rounded-full -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] border border-[#D4B483]/10 rounded-full translate-y-1/3 translate-x-1/3"></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            {/* 區塊標題 */}
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-balance">
                不是你不努力，而是拼圖還有缺
              </h2>
              {/* 裝飾用的三點 */}
              <div className="flex items-center justify-center gap-2 opacity-80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#17464F]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483]"></span>
              </div>
            </div>

            {/* 痛點路徑容器 */}
            <div className="relative">
              {/* 痛點 1: 方向斷裂 */}
              <div className="relative z-10 flex flex-col items-center gap-6 mb-8">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-[#D4B483]"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="32" cy="32" r="20" />
                    <circle cx="32" cy="32" r="4" fill="currentColor" />
                    <path d="M32 16V12M32 52V48M16 32H12M52 32H48" strokeWidth="2" />
                    <path d="M32 32L42 22" strokeWidth="2" />
                    <text x="48" y="16" fontSize="12" fill="currentColor">
                      ?
                    </text>
                    <text x="8" y="52" fontSize="10" fill="currentColor">
                      ?
                    </text>
                  </svg>
                </div>
                <div className="text-center max-w-sm">
                  <h3 className="text-xl font-bold text-[#D4B483] mb-3">方向斷裂</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    你是不是也想過很多種版本：有時想去外商、有時想接案當
                    freelancer，但每次看到別人的故事就改變主意，到最後，反而哪一條都沒真的走下去。
                  </p>
                </div>
              </div>

              {/* 連接線 1 */}
              <div className="w-0.5 h-10 bg-[#D4B483]/30 mx-auto my-2 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#D4B483] rounded-full"></div>
              </div>

              {/* 痛點 2: 方法斷裂 */}
              <div className="relative z-10 flex flex-col items-center gap-6 mb-8">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-[#D4B483]"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="8" y="28" width="20" height="16" rx="2" />
                    <rect x="36" y="28" width="20" height="16" rx="2" />
                    <rect x="22" y="12" width="20" height="16" rx="2" />
                    <path d="M52 20L56 16M56 16V24M56 16H48" strokeWidth="2" />
                  </svg>
                </div>
                <div className="text-center max-w-sm">
                  <h3 className="text-xl font-bold text-[#D4B483] mb-3">方法斷裂</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    你也不是沒學東西：買課、看影片、存下很多筆記，真正卡住的是——「那我今天到底要做哪一個小步驟？」所以日子一忙，又回到原本的節奏。
                  </p>
                </div>
              </div>

              {/* 連接線 2 */}
              <div className="w-0.5 h-10 bg-[#D4B483]/30 mx-auto my-2 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#D4B483] rounded-full"></div>
              </div>

              {/* 痛點 3: 同伴斷裂 */}
              <div className="relative z-10 flex flex-col items-center gap-6 mb-12">
                <div className="w-20 h-20 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-[#D4B483]"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="8" y="16" width="20" height="32" rx="2" />
                    <circle cx="18" cy="28" r="6" />
                    <path d="M12 40h12" />
                    <circle cx="44" cy="24" r="4" fill="currentColor" />
                    <circle cx="36" cy="32" r="4" fill="currentColor" />
                    <circle cx="52" cy="32" r="4" fill="currentColor" />
                    <circle cx="40" cy="40" r="4" fill="currentColor" />
                    <circle cx="48" cy="40" r="4" fill="currentColor" />
                  </svg>
                </div>
                <div className="text-center max-w-sm">
                  <h3 className="text-xl font-bold text-[#D4B483] mb-3">同伴斷裂</h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    身邊的人大多走很標準的路，你很難跟他們分享「我其實想過不一樣的生活」。不知道可以跟誰討論、問誰意見，久了就習慣把這些想法藏在心裡。
                  </p>
                </div>
              </div>
            </div>

            {/* 結語區塊 */}
            <div className="relative mt-8">
              <div className="w-0.5 h-6 bg-[#D4B483]/30 mx-auto mb-6"></div>

              <div className="max-w-2xl mx-auto px-6 py-8 rounded-2xl border-2 border-[#D4B483]/30 bg-[#17464F]/50 backdrop-blur-sm text-center relative">
                <p className="text-base sm:text-lg text-white font-bold leading-relaxed">
                  你缺的不是更多資訊，而是一個地方，
                  <span className="block mt-2 text-[#D4B483]">
                    讓你在未來六個月裡，有人陪你一起試、一起走、一起調整方向。
                  </span>
                </p>

                {/* 底部箭頭 */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <svg className="h-5 w-5 text-[#D4B483]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 2.1 COURSE HIGHLIGHTS CONTINUED (Part 2: 三大亮點) START */}
      <section className="py-16 sm:py-24 bg-[#F7F2EA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-4 text-balance">
              三大亮點，讓改變真的走起來
            </h2>
            <p className="text-base sm:text-lg text-[#33393C] max-w-2xl mx-auto leading-relaxed">
              不只是多上一門課，而是同時給你：
              <br />
              雙軌資源、行動任務和一群真的在實驗新生活的同伴。
            </p>
          </div>

          {/* Desktop: Stepper Layout (lg and above) */}
          <div className="hidden lg:flex gap-8">
            {/* Left: Step Nav (30%) */}
            <div className="w-[30%] pr-4">
              <div className="sticky top-32">
                <p className="text-sm text-[#D4B483] font-medium mb-6 tracking-wide">讓改變真的走起來</p>
                <div className="relative">
                  {/* Vertical line connecting steps */}
                  <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-[#17464F]/20"></div>

                  {/* Step 1 */}
                  <div className="relative flex items-start gap-4 mb-8 group">
                    <div className="w-8 h-8 rounded-full bg-[#D4B483] text-white flex items-center justify-center font-bold text-sm z-10 shadow-md">
                      1
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-[#17464F] text-lg">雙軌資源</p>
                      <p className="text-sm text-[#33393C]/70">副業增收 × 遠端上班</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex items-start gap-4 mb-8 group">
                    <div className="w-8 h-8 rounded-full bg-[#D4B483] text-white flex items-center justify-center font-bold text-sm z-10 shadow-md">
                      2
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-[#17464F] text-lg">行動導向設計</p>
                      <p className="text-sm text-[#33393C]/70">課後任務 × 實作工作坊</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-[#D4B483] text-white flex items-center justify-center font-bold text-sm z-10 shadow-md">
                      3
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-[#17464F] text-lg">社群支持</p>
                      <p className="text-sm text-[#33393C]/70">共學 × LinkedIn群 × 線下聚會</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content Cards (70%) */}
            <div className="w-[70%] space-y-6">
              {/* Card 1: 雙軌資源 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#17464F]/10 flex items-center justify-center flex-shrink-0">
                    {/* Icon: 雙箭頭/二分路線 */}
                    <svg className="w-6 h-6 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7l4-4m0 0l4 4m-4-4v18M16 17l4 4m0 0l-4-4m4 4H4"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#D4B483] tracking-wide">亮點一｜雙軌資源</span>
                    <h3 className="text-xl font-bold text-[#17464F] mt-1">副業增收 × 遠端上班</h3>
                  </div>
                </div>
                <div className="text-[#33393C] leading-relaxed space-y-3 pl-16">
                  <p className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-1">–</span>
                    <span>
                      <strong>自媒體接案線路：</strong>
                      幫你釐清主題定位，做出第一份接案作品集，學會基本市場調查、內容與流量思維。
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-1">–</span>
                    <span>
                      <strong>遠端上班線路：</strong>認識遠端求職市場，調整履歷與 LinkedIn，練習求職信、面試與獵頭溝通。
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-1">–</span>
                    <span>你可以先選一條當主線，另一條當選修；也可以雙線並進，在原本的工作之上慢慢開出第二條路。</span>
                  </p>
                </div>
              </div>

              {/* Card 2: 行動導向設計 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#17464F]/10 flex items-center justify-center flex-shrink-0">
                    {/* Icon: checklist */}
                    <svg className="w-6 h-6 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#D4B483] tracking-wide">亮點二｜行動導向設計</span>
                    <h3 className="text-xl font-bold text-[#17464F] mt-1">課後任務 × 實作工作坊</h3>
                  </div>
                </div>
                <div className="text-[#33393C] leading-relaxed space-y-3 pl-16">
                  <p className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-1">–</span>
                    <span>
                      每一堂課後，都會有一個做得到、但需要一點勇氣的行動任務：發一支影片、寫一封求職信、更新履歷、做一個小產品。
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-1">–</span>
                    <span>
                      大任務會被拆成學習單與模板，例如策略定位、影片腳本、JD 拆解，不會只丟一句「去做就對了」。
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-1">–</span>
                    <span>在實作工作坊裡，講師會陪你把想法落地成具體操作，不用在下班後還一個人猜下一步要幹嘛。</span>
                  </p>
                </div>
              </div>

              {/* Card 3: 社群支持 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#17464F]/10 flex items-center justify-center flex-shrink-0">
                    {/* Icon: 多人圓圈 */}
                    <svg className="w-6 h-6 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#D4B483] tracking-wide">亮點三｜社群支持</span>
                    <h3 className="text-xl font-bold text-[#17464F] mt-1">社群支持</h3>
                    <h3 className="text-xl font-bold text-[#17464F] mt-1">共學閒聊群 × LinkedIn群 × 線下聚會</h3>
                  </div>
                </div>
                <div className="text-[#33393C] leading-relaxed space-y-3 pl-16">
                  <p className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-1">–</span>
                    <span>
                      不再是一個人在房間裡看影片、被進度追著跑，而是固定出現在 Skool
                      線上共學空間，一起打開鏡頭工作、分享卡關與成果。
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-1">–</span>
                    <span>閒聊群和校友專屬 LinkedIn 群，讓你在通勤、午休也能和同路人交換資訊、互相打氣。</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#D4B483] mt-1">–</span>
                    <span>
                      每月線下遊牧小聚、不同城市 meetup，還有國內外 Nomad
                      旅程，讓你真的遇到那些已經在清邁、峴港、台北之間移動的人。
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Accordion Layout (below lg) */}
          <div className="lg:hidden space-y-4">
            {/* Accordion 1: 雙軌資源 */}
            <details className="group bg-white rounded-2xl shadow-sm overflow-hidden" open>
              <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
                <div className="w-10 h-10 rounded-xl bg-[#17464F]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7l4-4m0 0l4 4m-4-4v18M16 17l4 4m0 0l-4-4m4 4H4"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#17464F]">雙軌資源</p>
                  <p className="text-sm text-[#D4B483]">副業增收 × 遠端上班</p>
                </div>
                <svg
                  className="w-5 h-5 text-[#17464F] transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-sm text-[#33393C] leading-relaxed space-y-2">
                <p>
                  –<strong>自媒體接案線路：</strong>
                  幫你釐清主題定位，做出第一份接案作品集，學會基本市場調查、內容與流量思維。
                </p>
                <p>
                  –<strong>遠端上班線路：</strong>認識遠端求職市場，調整履歷與 LinkedIn，練習求職信、面試與獵頭溝通。
                </p>
                <p>– 你可以先選一條當主線，另一條當選修；也可以雙線並進，在原本的工作之上慢慢開出第二條路。</p>
              </div>
            </details>

            {/* Accordion 2: 行動導向設計 */}
            <details className="group bg-white rounded-2xl shadow-sm overflow-hidden">
              <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
                <div className="w-10 h-10 rounded-xl bg-[#17464F]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#17464F]">行動導向設計</p>
                  <p className="text-sm text-[#D4B483]">課後任務 × 實作工作坊</p>
                </div>
                <svg
                  className="w-5 h-5 text-[#17464F] transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-sm text-[#33393C] leading-relaxed space-y-2">
                <p>
                  –
                  每一堂課後，都會有一個做得到、但需要一點勇氣的行動任務：發一支影片、寫一封求職信、更新履歷、做一個小產品。
                </p>
                <p>– 大任務會被拆成學習單與模板，例如策略定位、影片腳本、JD 拆解，不會只丟一句「去做就對了」。</p>
                <p>– 在實作工作坊裡，講師會陪你把想法落地成具體操作，不用在下班後還一個人猜下一步要幹嘛。</p>
              </div>
            </details>

            {/* Accordion 3: 社群支持 */}
            <details className="group bg-white rounded-2xl shadow-sm overflow-hidden">
              <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
                <div className="w-10 h-10 rounded-xl bg-[#17464F]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#17464F]">社群支持</p>
                  <p className="text-sm text-[#D4B483]">共學閒聊群 × LinkedIn群 × 線下聚會</p>
                </div>
                <svg
                  className="w-5 h-5 text-[#17464F] transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-sm text-[#33393C] leading-relaxed space-y-2">
                <p>
                  – 不再是一個人在房間裡看影片、被進度追著跑，而是固定出現在 Skool
                  線上共學空間，一起打開鏡頭工作、分享卡關與成果。
                </p>
                <p>– 閒聊群和校友專屬 LinkedIn 群，讓你在通勤、午休也能和同路人交換資訊、互相打氣。</p>
                <p>
                  – 每月線下遊牧小聚、不同城市 meetup，還有國內外 Nomad
                  旅程，讓你真的遇到那些已經在清邁、峴港、台北之間移動的人。
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
      {/* SECTION 2.1 ECOSYSTEM PARTNERSHIP START - 生態系 */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17464F] mb-4">遊牧資源生態系</h2>
            <p className="text-lg text-[#33393C]">線上教育 | 線下社群 | 國際鏈結</p>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-2 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-12 mb-8">
              <div className="text-center">
                <a
                  href="https://www.instagram.com/digitalnomadstaiwan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-105 transition-transform duration-200"
                >
                  <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-lg p-2 sm:p-4 border border-[#C9D7D4]">
                    <Image
                      src="/images/design-mode/%E6%95%B8%E4%BD%8D%E9%81%8A%E7%89%A7%E5%8F%B0%E7%81%A3%20Logo%281%29%281%29%281%29%281%29.png"
                      alt="Taiwan Digital Nomad"
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </a>
                <p className="text-[#17464F] font-medium text-xs sm:text-sm">#台灣最大數位遊牧社群</p>
              </div>

              <div className="hidden lg:flex text-[#D4B483] text-7xl items-center justify-center h-32">×</div>

              <div className="text-center">
                <a
                  href="https://www.instagram.com/elsacampus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-105 transition-transform duration-200"
                >
                  <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-lg p-2 sm:p-4 border border-[#C9D7D4]">
                    <Image
                      src="/images/design-mode/%E6%88%90%E9%95%B7%E7%87%97Logo.jpg"
                      alt="艾兒莎成長營"
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </a>
                <p className="text-[#17464F] font-medium text-xs sm:text-sm">#多年不同學院創建經驗</p>
              </div>

              <div className="hidden lg:flex text-[#D4B483] text-7xl items-center justify-center h-32">×</div>

              <div className="text-center">
                <a
                  href="https://newsveg.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-105 transition-transform duration-200"
                >
                  <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-lg p-2 sm:p-4 border border-[#C9D7D4]">
                    <Image
                      src="/images/design-mode/%E7%94%9F%E9%AE%AE%E6%99%82%E6%9B%B8%20Logo%281%29%281%29%281%29%281%29.png"
                      alt="生鮮時書 NEWSVEG"
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </a>
                <p className="text-[#17464F] font-medium text-xs sm:text-sm">#知識萃取專家</p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-[#17464F]">強強聯手，全面資源整合</h3>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 5 INSTRUCTORS START - 師資 */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17464F] mb-6">
              你的路線，不會只有一位老師在陪你走
            </h2>
            <p className="text-[#33393C] text-lg leading-relaxed max-w-2xl mx-auto">
              這堂學院不是把所有主題塞給同一個講師，
              <br className="hidden sm:block" />
              而是找了一群真的在路上走的人，一起陪你打底、選方向、走路線。
            </p>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#17464F]"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17464F]">
                <span className="text-[#D4B483]">A 線｜</span>自媒體接案線路導師
              </h3>
              <div className="h-px w-12 bg-[#17464F]"></div>
            </div>
            <p className="text-center text-[#33393C] mb-8 max-w-xl mx-auto">
              帶你建立個人品牌、經營內容、從零開始接案變現
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {instructors
                .filter((i) => ["工具王阿璋", "林佳 Zoe", "三分鐘", "西打藍"].includes(i.name))
                .map((instructor, index) => (
                  <div key={index} className="group text-center">
                    <div className="relative mb-4">
                      <a
                        href={instructor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 cursor-pointer ring-4 ring-[#17464F]/20"
                      >
                        <Image
                          src={instructor.image || "/placeholder.svg"}
                          alt={instructor.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </a>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#17464F] mb-1">{instructor.name}</h4>
                    <p className="text-[#33393C] text-xs sm:text-sm leading-relaxed line-clamp-2 px-2">
                      {instructor.title.split("，")[0]}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#17464F]"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17464F]">
                <span className="text-[#D4B483]">B 線｜</span>遠端上班線路導師
              </h3>
              <div className="h-px w-12 bg-[#17464F]"></div>
            </div>
            <p className="text-center text-[#33393C] mb-8 max-w-xl mx-auto">
              帶你建立國際職涯視野、遠端求職策略、跨國人脈經營
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {instructors
                .filter((i) => ["許詮", "Shelley", "讀者太太", "Emilia"].includes(i.name))
                .map((instructor, index) => (
                  <div key={index} className="group text-center">
                    <div className="relative mb-4">
                      <a
                        href={instructor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 cursor-pointer ring-4 ring-[#17464F]/20"
                      >
                        <Image
                          src={instructor.image || "/placeholder.svg"}
                          alt={instructor.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </a>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#17464F] mb-1">{instructor.name}</h4>
                    <p className="text-[#33393C] text-xs sm:text-sm leading-relaxed line-clamp-2 px-2">
                      {instructor.title.split("，")[0]}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#D4B483]"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17464F]">共同必修</h3>
              <div className="h-px w-12 bg-[#D4B483]"></div>
            </div>
            <p className="text-center text-[#33393C] mb-8 max-w-xl mx-auto">
              打底知識變現、AI 工具、財務思維、人生 SOP 的核心講師
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {instructors
                .filter((i) => ["林上哲", "鮪魚", "Joyce Weng", "Angela Feng"].includes(i.name))
                .map((instructor, index) => (
                  <div key={index} className="group text-center">
                    <div className="relative mb-4">
                      <a
                        href={instructor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 cursor-pointer ring-4 ring-[#D4B483]/30"
                      >
                        <Image
                          src={instructor.image || "/placeholder.svg"}
                          alt={instructor.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </a>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-[#17464F] mb-1">{instructor.name}</h4>
                    <p className="text-[#33393C] text-xs sm:text-sm leading-relaxed line-clamp-2 px-2">
                      {instructor.title.split("，")[0]}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 6 COURSE OUTLINE START - 課程地圖 */}
      <section id="learning-map" className="py-16 sm:py-20 bg-[#F5F3ED]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-6 text-balance">
              學習地圖｜選一條路，6 個月一起走完
            </h2>
            <p className="text-[#33393C] max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
              這 6 個月會分成三個階段：<span className="font-semibold text-[#17464F]">Phase 1 起步打底</span>、
              <span className="font-semibold text-[#17464F]">Phase 2 出擊試水</span>、
              <span className="font-semibold text-[#17464F]">Phase 3 累積整合</span>。
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              前半約 3
              個月，用每週三線上課程＋行動任務完成起步打底與第一次出擊，做出履歷、作品集、內容與第一波投遞／發佈；後半約
              3 個月，用復盤、財務與人生 SOP、講師 QA 和共創專案，把這些行動整合成可以長期運作的生活與工作系統。
            </p>
          </div>

          {/* Tabs 前導文字 */}
          <p className="text-center text-[#33393C]/70 text-sm mb-4">先選一條你現在最想嘗試的路線：</p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {["遠端上班", "自媒體接案", "我還在觀望"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMapTab(tab)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 border-2 ${
                  activeMapTab === tab
                    ? "bg-[#17464F] text-white border-[#17464F]"
                    : "bg-white text-[#17464F] border-[#17464F]/30 hover:border-[#17464F]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content: 遠端上班 */}
          {activeMapTab === "遠端上班" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {/* 卡片 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#D4B483] bg-[#D4B483]/10 px-2 py-1 rounded">
                    上班線 × 三階段成果
                  </span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">這 3+3 個月，你會走到哪裡？</h3>
                <div className="space-y-3 text-[#33393C] leading-relaxed text-sm">
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <p>
                      <span className="font-semibold text-[#17464F]">Phase 1 起步打底：</span>
                      看懂遠端市場，釐清目標職缺與個人優勢，整理出之後要寫進履歷與 LinkedIn 的關鍵素材。
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <p>
                      <span className="font-semibold text-[#17464F]">Phase 2 出擊試水：</span>
                      做出一份「遠端友善」履歷與求職信模板，優化 LinkedIn，實際投遞至少 3 則 JD，練一次完整面試流程。
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <p>
                      <span className="font-semibold text-[#17464F]">Phase 3 累積整合：</span>
                      根據投遞與面試結果復盤，把 AI 工作流、投遞節奏與財務規劃整理成你自己的遠端求職 SOP。
                    </p>
                  </div>
                </div>
              </div>

              {/* 卡片 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">每週三，大概在做什麼？</h3>
                <div className="space-y-4">
                  {/* Phase 1 */}
                  <div className="border-l-3 border-[#D4B483] pl-3">
                    <span className="inline-block bg-[#D4B483]/20 text-[#A06E56] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                      P1 起步打底
                    </span>
                    <p className="text-xs text-[#33393C]/70 mb-1">第 1–8 週</p>
                    <p className="text-xs text-[#33393C] leading-relaxed">
                      遠端職涯地圖、目標設定、AI 工作流 demo；盤點經歷、改寫 LinkedIn 與履歷骨架。
                    </p>
                  </div>
                  {/* Phase 2 */}
                  <div className="border-l-3 border-[#17464F] pl-3">
                    <span className="inline-block bg-[#17464F]/10 text-[#17464F] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                      P2 出擊試水
                    </span>
                    <p className="text-xs text-[#33393C]/70 mb-1">第 9–16 週</p>
                    <p className="text-xs text-[#33393C] leading-relaxed">
                      LinkedIn 全攻略、履歷秘笈、面試策略；完成履歷、投出第一批 JD、安排面試。
                    </p>
                  </div>
                  {/* Phase 3 */}
                  <div className="border-l-3 border-[#C9D7D4] pl-3">
                    <span className="inline-block bg-[#C9D7D4]/30 text-[#17464F] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                      P3 累積整合
                    </span>
                    <p className="text-xs text-[#33393C]/70 mb-1">第 17–24 週</p>
                    <p className="text-xs text-[#33393C] leading-relaxed">
                      每月復盤工作坊、財務課與人生 SOP、講師團體 QA。
                    </p>
                  </div>
                </div>
              </div>

              {/* 共用卡片：共同必修 & 社群支持 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-[#C9D7D4] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#17464F]">共同必修 & 社群支持</h3>
                </div>
                <div className="text-[#33393C] text-xs leading-relaxed space-y-2">
                  <p>不管你選哪一條路線，都會一起上：</p>
                  <ul className="space-y-1">
                    <li>• 遠距遊牧概論＆目標設定</li>
                    <li>• AI ＆ 自動化工作流 demo</li>
                    <li>• 知識變現、財務規劃、人生 SOP</li>
                  </ul>
                  <p className="pt-1">每月有作業交流同學會與講師 QA；線下有數位遊牧小聚，讓你遇到正在路上的同伴。</p>
                  <p className="text-[#A06E56] font-medium pt-1">這些節奏貫穿 Phase 1–3，確保你不是孤單行動。</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: 自媒體接案 */}
          {activeMapTab === "自媒體接案" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {/* 卡片 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#D4B483] bg-[#D4B483]/10 px-2 py-1 rounded">
                    自媒線 × 三階段成果
                  </span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">這 3+3 個月，你會走到哪裡？</h3>
                <div className="space-y-3 text-[#33393C] leading-relaxed text-sm">
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <p>
                      <span className="font-semibold text-[#17464F]">Phase 1 起步打底：</span>
                      看懂自媒體與接案市場，釐清 TA、主題與價值，整理出第一版服務項目與作品集雛形。
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <p>
                      <span className="font-semibold text-[#17464F]">Phase 2 出擊試水：</span>
                      做出可接案的作品集，規劃一輪內容發佈，完成並公開至少 1 支短影音或內容作品。
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#17464F] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <p>
                      <span className="font-semibold text-[#17464F]">Phase 3 累積整合：</span>
                      用數據與回饋復盤，調整定位，把 AI 工作流、內容節奏與收入規劃整理成你自己的接案 SOP。
                    </p>
                  </div>
                </div>
              </div>

              {/* 卡片 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">每週三，大概在做什麼？</h3>
                <div className="space-y-4">
                  {/* Phase 1 */}
                  <div className="border-l-3 border-[#D4B483] pl-3">
                    <span className="inline-block bg-[#D4B483]/20 text-[#A06E56] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                      P1 起步打底
                    </span>
                    <p className="text-xs text-[#33393C]/70 mb-1">第 1–8 週</p>
                    <p className="text-xs text-[#33393C] leading-relaxed">
                      接案變現地圖、作品集調查、AI 工作流 demo；整理作品、設定主題與 TA、完成作品集框架。
                    </p>
                  </div>
                  {/* Phase 2 */}
                  <div className="border-l-3 border-[#17464F] pl-3">
                    <span className="inline-block bg-[#17464F]/10 text-[#17464F] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                      P2 出擊試水
                    </span>
                    <p className="text-xs text-[#33393C]/70 mb-1">第 9–16 週</p>
                    <p className="text-xs text-[#33393C] leading-relaxed">
                      自媒體定位與內容企劃、短影音製作；規劃內容排程，至少發佈一支短影音。
                    </p>
                  </div>
                  {/* Phase 3 */}
                  <div className="border-l-3 border-[#C9D7D4] pl-3">
                    <span className="inline-block bg-[#C9D7D4]/30 text-[#17464F] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                      P3 累積整合
                    </span>
                    <p className="text-xs text-[#33393C]/70 mb-1">第 17–24 週</p>
                    <p className="text-xs text-[#33393C] leading-relaxed">
                      每月復盤內容成績、財務與人生 SOP、共創專案（選擇參與）。
                    </p>
                  </div>
                </div>
              </div>

              {/* 共用卡片：共同必修 & 社群支持 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-[#C9D7D4] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#17464F]">共同必修 & 社群支持</h3>
                </div>
                <div className="text-[#33393C] text-xs leading-relaxed space-y-2">
                  <p>不管你選哪一條路線，都會一起上：</p>
                  <ul className="space-y-1">
                    <li>• 遠距遊牧概論＆目標設定</li>
                    <li>• AI ＆ 自動化工作流 demo</li>
                    <li>• 知識變現、財務規劃、人生 SOP</li>
                  </ul>
                  <p className="pt-1">每月有作業交流同學會與講師 QA；線下有數位遊牧小聚。</p>
                  <p className="text-[#A06E56] font-medium pt-1">
                    很多自媒線同學也在同學會和小聚裡找到合作對象、剪輯師，甚至是 beta 客戶。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: 我還在觀望 */}
          {activeMapTab === "我還在觀望" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {/* 卡片 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">還沒決定路線也沒關係</h3>
                <div className="text-[#33393C] text-sm leading-relaxed space-y-3">
                  <p>很多人加入學院時，也還在想：「我適合遠端上班，還是自媒接案？」</p>
                  <p>所以我們把 6 個月設計成三個階段：</p>
                  <ul className="space-y-2">
                    <li>
                      <span className="font-semibold text-[#17464F]">Phase 1 起步打底：</span>
                      先幫你釐清方向，盤點資源，了解兩條路線的差別。
                    </li>
                    <li>
                      <span className="font-semibold text-[#17464F]">Phase 2 出擊試水：</span>
                      選一條主線，真的做出履歷或作品集、內容與第一波投遞／發佈。
                    </li>
                    <li>
                      <span className="font-semibold text-[#17464F]">Phase 3 累積整合：</span>
                      用復盤、財務視角與人生 SOP，把這些行動整理成你自己的下一步。
                    </li>
                  </ul>
                  <p className="text-[#A06E56] font-medium pt-1">
                    若你選雙軌，6 個月內會上完兩條線的必修，從履歷、作品集到內容與投遞都走一輪。
                  </p>
                </div>
              </div>

              {/* 卡片 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg lg:text-xl font-bold text-[#17464F] mb-4">不管最後選哪條路，你至少會得到…</h3>
                <div className="text-[#33393C] text-sm leading-relaxed space-y-3">
                  <div>
                    <span className="font-semibold text-[#17464F]">Phase 1 起步打底：</span>
                    一份重新盤點過的職涯與能力地圖，知道自己手上有哪些可以被好好使用的資源。
                  </div>
                  <div>
                    <span className="font-semibold text-[#17464F]">Phase 2 出擊試水：</span>
                    一份更新過、可以拿去投遞的履歷，或可以拿去接案用的作品集；再加上一個對外可公開的作品，真的在市場上試一次水溫。
                  </div>
                  <div>
                    <span className="font-semibold text-[#17464F]">Phase 3 累積整合：</span>
                    一套適合自己的 AI＋自學工作流與人生 SOP，把你學到的東西變成可重複使用的習慣與流程。
                  </div>
                  <div>
                    <span className="font-semibold text-[#D4B483]">貫穿三個階段：</span>
                    一個可以討論工作與生活選擇的社群，以及一次完整的「從好奇到行動」的 6 個月紀錄。
                  </div>
                </div>
              </div>

              {/* 共用卡片：共同必修 & 社群支持 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-[#C9D7D4] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#17464F]">共同必修 & 社群支持</h3>
                </div>
                <div className="text-[#33393C] text-xs leading-relaxed space-y-2">
                  <p>不管你選哪一條路線，都會一起上：</p>
                  <ul className="space-y-1">
                    <li>• 遠距遊牧概論＆目標設定</li>
                    <li>• AI ＆ 自動化工作流 demo</li>
                    <li>• 知識變現、財務規劃、人生 SOP</li>
                  </ul>
                  <p className="pt-1">每月有作業交流同學會與講師 QA；線下有數位遊牧小聚，讓你遇到正在路上的同伴。</p>
                  <p className="text-[#A06E56] font-medium pt-1">這些節奏貫穿 Phase 1–3，確保你不是孤單行動。</p>
                </div>
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="text-center mt-10">
            <button
              onClick={() => setShowCalendarModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#17464F] text-white rounded-full font-medium hover:bg-[#17464F]/90 transition-all duration-300 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              打開完整 3+3 學習行事曆
            </button>
            <p className="text-sm text-[#33393C]/60 mt-2">看看 24 週每一週三，實際在做什麼</p>
          </div>
        </div>
      </section>
      {/* SECTION 6 COURSE OUTLINE END */}

      <section id="pricing-section" className="py-16 sm:py-24 bg-[#17464F] relative overflow-hidden">
        <PricingSection />
      </section>

      {/* SECTION LIMITED OFFER */}
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
                  ;(window as any).trackInitiateCheckout(0)
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
                href="https://www.instagram.com/travelwithwork_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#17464F] underline hover:text-[#D4B483] transition-colors"
              >
                Instagram
              </a>{" "}
              問清楚，再決定這六個月要不要一起走。
            </p>
          </div>
        </div>
      </section>
      {/* SECTION FAQ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
              <span className="w-2 h-2 rounded-full bg-[#17464F]"></span>
              <span className="w-2 h-2 rounded-full bg-[#D4B483]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#17464F] mb-4">常見問題</h2>
            <p className="text-[#33393C]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              看到這裡，你可能還有一些問題想問清楚。
              <br className="hidden sm:block" />
              以下整理了大家最常問的幾個問題，如果沒找到答案，歡迎私訊我們。
            </p>
          </div>
          <FAQSection />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-[#17464F] text-white text-center">
        <p className="text-sm text-white/80">
          &copy; 2025 遠距遊牧學院 Travel With Work Academy. All rights reserved.
          <br />
          任何疑問請洽 Instagram:{" "}
          <a
            href="https://www.instagram.com/travelwithwork_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4B483] hover:text-[#D4B483]/80 transition-colors"
          >
            遠距遊牧學院
          </a>{" "}
          / Email: Academy@travelwork.life
        </p>
      </footer>

      {/* GALLERY MODAL */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 z-10 text-xl font-bold"
            >
              ✕
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                prevPhoto()
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-xl flex items-center justify-center text-gray-800 hover:text-orange-500 transition-all duration-200 z-10 group"
            >
              <svg
                className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextPhoto()
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-xl flex items-center justify-center text-gray-800 hover:text-orange-500 transition-all duration-200 z-10 group"
            >
              <svg
                className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-w-full max-h-full">
                <Image
                  src={stagePhotos[currentStage][currentPhotoIndex]?.src || "/placeholder.svg"}
                  alt={stagePhotos[currentStage][currentPhotoIndex]?.alt || ""}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent text-white p-6 rounded-b-lg">
                  <p className="text-center text-sm sm:text-base font-medium leading-relaxed">
                    {stagePhotos[currentStage][currentPhotoIndex]?.alt}
                  </p>
                </div>
              </div>
            </div>

            {stagePhotos[currentStage].length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                <span className="text-orange-400">{currentPhotoIndex + 1}</span>
                <span className="mx-2 text-gray-300">/</span>
                <span>{stagePhotos[currentStage].length}</span>
              </div>
            )}

            <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg text-xs opacity-70">
              使用 ← → 鍵或點擊按鈕切換圖片
            </div>
          </div>
        </div>
      )}

      {/* HIGHLIGHT POPUP MODAL */}
      {highlightPopup.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setHighlightPopup({ ...highlightPopup, isOpen: false })}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setHighlightPopup({ ...highlightPopup, isOpen: false })}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 text-xl font-bold z-10"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-[#17464F] mb-2">{highlightPopup.title}</h3>
            <p className="text-sm font-medium text-[#D4B483] mb-6">{highlightPopup.subtitle}</p>
            <div className="text-sm text-[#33393C] leading-relaxed space-y-4">
              {highlightPopup.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SELECTED WEEK MODAL */}
      {selectedWeek && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedWeek(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedWeek(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 text-xl font-bold z-10"
            >
              ×
            </button>
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={selectedWeek.instructorData?.image || "/placeholder.svg"}
                alt={selectedWeek.instructor}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover shadow-md"
              />
              <div>
                <span className="bg-[#17464F] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  第 {selectedWeek.week} 週
                </span>
                <h3 className="text-xl font-bold text-[#17464F] mt-2">{selectedWeek.title}</h3>
                <p className="text-[#D4B483] font-medium">{selectedWeek.instructor}</p>
              </div>
            </div>
            <div className="text-sm text-[#33393C] leading-relaxed">
              <p>{selectedWeek.instructorData?.background}</p>
            </div>
          </div>
        </div>
      )}

      {showCalendarModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowCalendarModal(false)}
        >
          <div
            className="relative w-full max-w-[1040px] max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-5">
              <button
                onClick={() => setShowCalendarModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <h3 className="text-xl md:text-2xl font-bold text-[#17464F]">完整 3+3 學習行事曆</h3>
              <p className="text-sm text-gray-600 mt-1">
                24 週的課程與行動任務，分成三個階段：起步打底、出擊試水、累積整合。
              </p>

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                {/* Track Filter Only */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500 self-center mr-1">路線：</span>
                  {["雙軌", "遠端上班", "自媒體接案"].map((track) => (
                    <button
                      key={track}
                      onClick={() => setCalendarTrackFilter(track)}
                      className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                        calendarTrackFilter === track
                          ? "bg-[#17464F] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {track}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Content - Timeline */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {filteredCalendarData.map((week, index) => {
                  const isExpanded = expandedWeeks.has(week.id)
                  const phaseColor = getPhaseColor(week.phase)
                  const trackColor = getTrackColor(week.track)

                  return (
                    <div
                      key={week.id}
                      className={`relative border rounded-xl overflow-hidden transition-all ${
                        isExpanded ? "shadow-md" : "shadow-sm hover:shadow-md"
                      } ${phaseColor.border}`}
                    >
                      {/* Week Header (always visible) */}
                      <div className="p-4 cursor-pointer" onClick={() => toggleWeekExpansion(week.id)}>
                        {/* Phase & Month/Week */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded ${phaseColor.bg} ${phaseColor.text}`}
                          >
                            {week.phase.replace("Phase ", "P")}
                          </span>
                          <span className="text-sm text-gray-500">{week.monthWeek}</span>
                          <span className={`px-2 py-0.5 text-xs rounded ${trackColor.bg} ${trackColor.text}`}>
                            {week.track}
                          </span>
                        </div>

                        {/* Title & Type */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <h4 className="text-base md:text-lg font-semibold text-[#17464F]">{week.title}</h4>
                          <span className="text-xs text-gray-400 shrink-0">{week.type}</span>
                        </div>

                        {/* Focus Short */}
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{week.focusShort}</p>

                        {/* Instructors & Expand Button */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            {week.instructors.map((instructor, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-[#D4B483]/30">
                                  <Image
                                    src={instructor.image || "/placeholder.svg"}
                                    alt={instructor.name}
                                    width={28}
                                    height={28}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="text-xs text-gray-600">{instructor.name}</span>
                              </div>
                            ))}
                          </div>
                          <button className="flex items-center gap-1 text-xs text-[#17464F] hover:text-[#D4B483] transition-colors">
                            {isExpanded ? (
                              <>
                                收合 <ChevronUp className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                展開 <ChevronDown className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                          {/* Focus Detail */}
                          <div className="mt-4 p-4 bg-[#F7F2EA] rounded-lg">
                            <h5 className="text-sm font-semibold text-[#17464F] mb-2">本週行動任務</h5>
                            <p className="text-sm text-gray-700 leading-relaxed">{week.focusDetail}</p>
                          </div>

                          {/* Instructor Details */}
                          <div className="mt-4">
                            <h5 className="text-sm font-semibold text-[#17464F] mb-3">講師資訊</h5>
                            <div className="flex flex-wrap gap-4">
                              {week.instructors.map((instructor, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm"
                                >
                                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4B483]/50 shrink-0">
                                    <Image
                                      src={instructor.image || "/placeholder.svg"}
                                      alt={instructor.name}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium text-[#17464F]">{instructor.name}</p>
                                    <p className="text-xs text-gray-500">{instructor.title}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {filteredCalendarData.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>沒有符合篩選條件的週次</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
              <p className="text-xs text-gray-500 text-center">
                共 {filteredCalendarData.length} 週 · {calendarPhaseFilter !== "全部" && `${calendarPhaseFilter} · `}
                {calendarTrackFilter !== "全部" && `${calendarTrackFilter}`}
              </p>
            </div>
          </div>
        </div>
      )}

      <StickyBottomBar scrollToPricing={scrollToPricing} />
    </main>
  )
}
