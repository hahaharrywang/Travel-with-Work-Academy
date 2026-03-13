// Nomad Groups - Features Data (CIS Brand Colors Applied)
// 學院三大特色資料

export interface FeatureImage {
  src: string
  alt: string
}

export interface Feature {
  id: number
  title: string
  shortDesc: string
  details: string[]
  images: FeatureImage[]
}

export const featuresData: Feature[] = [
  {
    id: 0,
    title: "雙軌資源",
    shortDesc: "這裡不是要你馬上做對選擇，而是可以開始行動起來，讓行動告訴你答案。",
    details: [
      "<strong>接案線路：</strong>幫你釐清主題定位，做出接案作品集，學會基本市場調查、內容與流量思維。",
      "<strong>遠端上班線路：</strong>認識遠端求職市場，調整履歷與 LinkedIn，練習求職信、面試與獵頭溝通。",
      "你可以雙線並進，快速全面探索。也可以先選一條當主線，讓行動開始。",
    ],
    images: [
      {
        src: "/images/e8-87-aa-e5-aa-92-e9-ab-94-e6-8e-a5-e6-a1-88-e8-b7-af-e7-b7-9a-ef-bc-bfreels-e9-87-8d-e8-a6-81-e6-8c-87-e6-a8-99.png",
        alt: "接案路線：Reels演算法重要指標",
      },
      {
        src: "/images/e4-b8-8a-e7-8f-ad-e8-b7-af-e7-b7-9a-ef-bc-bf-e9-9b-87-e4-b8-bb-e7-84-a1-e5-8b-95-e6-96-bc-e8-a1-b7.png",
        alt: "上班路線：讓雇主無動於衷的答案",
      },
    ],
  },
  {
    id: 1,
    title: "行動導向設計",
    shortDesc: "每堂課都有做得到的行動任務，拆成模板和小步驟，不再只聽懂卻做不出來。",
    details: [
      "每堂課都對應到一個「做得到」的任務：目標設定、AI加速生產、策略定位、發一篇文、做一支影片、更新履歷、寫求職信……不是看完就結束，而是立刻動手。",
      "任務拆成學習單與模板：透過清楚的步驟與範例，帶你完成策略定位、影片腳本、JD拆解、面試 STAR 故事庫等關鍵輸出，讓行動不再只靠意志力。",
      "想走更快，可以加選實作工作坊：短影音剪輯、Coffee Chat、Vibe Coding、工作英語等選修，讓你在需要時針對性加強，把成長慾望落地成真實行動。",
      "讓你不再只是聽懂、記下來，而是 完成、留下、可以被看見。",
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
    shortDesc: "你不需要靠意志力一個人硬撐，這裡有一整套讓你比較走得下去的支持系統。",
    details: [
      "Skool 共學空間、Line 群、線上同學會、校友 LinkedIn 群與線下小聚，讓你一路上有人可以交流、回報進度、彼此提醒。",
      "真正難的通常不是開始，而是做幾週之後開始懷疑自己、忙起來就斷掉。",
      "所以我們把支持設計進節奏裡：固定交流、成果分享、AMA、QA、共創與復盤，不只是讓你比較有陪伴感，而是讓你比較有機會真的走完。",
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

// Feature icons as React components (to be used with the data)
export const featureIcons = {
  dualTrack: `<svg class="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7l4-4m0 0l4 4m-4-4v18M16 17l4 4m0 0l-4-4m4 4H4" />
  </svg>`,
  actionOriented: `<svg class="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>`,
  supportStructure: `<svg class="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>`,
}
