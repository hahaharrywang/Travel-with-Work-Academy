// Nomad Groups - Features Data (CIS Brand Colors Applied)
// 學院三大特色資料
import type { ReactNode } from "react"

export interface FeatureImage {
  src: string
  alt: string
  /** 顯示在圖片左上角的小標籤（例如「接案路線」「上班路線」），讓使用者一眼看懂圖片內容 */
  label?: string
}

export interface Feature {
  id: number
  title: string
  icon: ReactNode
  shortDesc: string
  details: string[]
  images: FeatureImage[]
}

// Icon components
export const DualTrackIcon = () => (
  <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 7l4-4m0 0l4 4m-4-4v18M16 17l4 4m0 0l-4-4m4 4H4"
    />
  </svg>
)

export const ActionOrientedIcon = () => (
  <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>
)

export const SupportStructureIcon = () => (
  <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
)

export const featuresData: Feature[] = [
  {
    id: 0,
    title: "雙軌資源",
    icon: <DualTrackIcon />,
    shortDesc: "這裡不是要你馬上做對選擇，而是可以開始行動起來，讓行動告訴你答案。",
    details: [
      "<strong>接案線：</strong>幫你釐清主題定位，做出接案作品集，建立基本的市場研究、內容策略與變現思維。",
      "<strong>遠端上班線：</strong>帶你看懂遠端求職市場，整理履歷與 LinkedIn，練習求職信、面試與獵頭溝通。",
      "你可以雙線並進，更快探索兩種可能；也可以先選一條主線，保留之後調整的彈性。",
      "這裡不是要你現在就選到最完美，而是幫你在未來五個月裡，用更低風險的方式開始試出方向。",
    ],
    images: [
      {
        src: "/images/e8-87-aa-e5-aa-92-e9-ab-94-e6-8e-a5-e6-a1-88-e8-b7-af-e7-b7-9a-ef-bc-bfreels-e9-87-8d-e8-a6-81-e6-8c-87-e6-a8-99.png",
        alt: "接案路線：Reels演算法重要指標",
        label: "接案路線",
      },
      {
        src: "/images/e4-b8-8a-e7-8f-ad-e8-b7-af-e7-b7-9a-ef-bc-bf-e9-9b-87-e4-b8-bb-e7-84-a1-e5-8b-95-e6-96-bc-e8-a1-b7.png",
        alt: "上班路線：讓雇主無動於衷的答案",
        label: "遠端上班路線",
      },
    ],
  },
  {
    id: 1,
    title: "行動任務節奏",
    icon: <ActionOrientedIcon />,
    shortDesc: "每堂課都有做得到的行動任務，拆成模板和小步驟，不再只聽懂卻做不出來。",
    details: [
      "每堂課都會對應一個做得到的任務：目標設定、定位整理、AI 加速產出、履歷更新、求職信撰寫、內容企劃、作品集頁面等。",
      "任務不是丟給你自己想，而是會搭配學習單、模板、範例與拆解步驟，讓你知道今天到底該先做哪一步。",
      "想走更快，也可以搭配實作型工作坊，例如短影音剪輯、Coffee Chat、Vibe Coding、工作英語等，針對你當下最需要補強的地方加速前進。",
      "學院的重點不是讓你「學過」，而是讓你完成、留下、可以被看見。",
    ],
    images: [
      {
        src: "/images/e8-a1-8c-e5-8b-95-e5-b0-8e-e5-90-91-ef-bc-bf-e4-bb-bb-e5-8b-99-e6-8b-86-e8-a7-a3.png",
        alt: "任務拆解",
      },
      {
        src: "/images/e8-a1-8c-e5-8b-95-e5-b0-8e-e5-90-91-ef-bc-bf-e4-bd-9c-e6-a5-ad-e5-b9-b3-e5-8f-b0.png",
        alt: "作業平台",
      },
      {
        src: "/images/e8-a1-8c-e5-8b-95-e5-b0-8e-e5-90-91-ef-bc-bfvibe-20coding-20-e5-b7-a5-e4-bd-9c-e5-9d-8a-20.png",
        alt: "Vibe Coding 工作坊",
      },
    ],
  },
  {
    id: 2,
    title: "支持結構",
    icon: <SupportStructureIcon />,
    shortDesc: "你不需要靠意志力一個人硬撐，這裡有一整套比較走得下去的支持系統。",
    details: [
      "從 Skool 共學空間、Line 群、線上同學會、校友 LinkedIn 群，到不定期線下小聚，一路上都有人可以交流、回報進度、彼此提醒。",
      "真正難的通常不是開始，而是做幾週之後開始懷疑自己、忙起來就斷掉。",
      "所以我們把支持設計進節奏裡：固定交流、成果分享、校長 AMA、講師 QA、共創與復盤，不是只提供陪伴感，而是幫你提高真的走完的機率。",
      "這也是為什麼很多人不是因為「更有天份」才做到，而是因為在卡住時，還有人和結構把他拉回來。",
    ],
    images: [
      {
        src: "/images/2-1.jpeg",
        alt: "遊牧小聚",
      },
      { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e7-95-99-e8-a8-80.png", alt: "留言" },
      { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e4-ba-a4-e6-b5-81.png", alt: "交流" },
      {
        src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e4-bd-9c-e6-a5-ad-e4-ba-a4-e6-b5-81.png",
        alt: "作業交流",
      },
      { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e5-90-8c-e5-ad-b8-e6-9c-83.png", alt: "同學會" },
      {
        src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e5-90-8c-e5-ad-b8-e6-9c-83-e4-bd-9c-e6-a5-ad.png",
        alt: "同學會作業",
      },
      { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bfline-20group.png", alt: "Line Group" },
      {
        src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e8-b6-8a-e5-8d-97-e9-81-8a-e7-89-a7-e4-b9-8b-e6-97-85.jpg",
        alt: "越南遊牧之旅",
      },
    ],
  },
]
