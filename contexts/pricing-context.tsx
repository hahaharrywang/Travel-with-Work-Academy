"use client"

import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from "react"

export type PlanId = "selfMedia" | "remoteJob" | "dualLine"

export interface StagePricing {
  original: number
  stagePrice: number
  savingAmount: number
}

export interface Stage {
  id: string
  order: number
  name: string
  tagLine: string
  discountLabel: string
  discountRate: number
  startAt: Date
  endAt: Date
  prices: {
    [key in PlanId]: StagePricing
  }
  checkoutUrls: {
    [key in PlanId]: string
  }
}

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface PricingContextValue {
  stages: Stage[]
  currentStageData: Stage
  currentStageIndex: number
  timeLeft: TimeLeft
  lowestPrice: number
  checkoutURL: string
  selectedPlanId: PlanId | null
  setSelectedPlanId: (id: PlanId | null) => void
  getTrackingParams: () => string
  getCheckoutURLWithTracking: (planId: PlanId) => string
}

export const stages: Stage[] = [
  {
    id: "stage_1",
    order: 1,
    name: "公開招生啟動價",
    tagLine: "最早的一批，只有少部分人知道的方案，有「一起開始學院」的感覺。",
    discountLabel: "33 折",
    discountRate: 0.33,
    startAt: new Date("2025-12-27T00:00:00+08:00"),
    endAt: new Date("2026-02-26T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 6299, savingAmount: 12701 },
      remoteJob: { original: 19000, stagePrice: 6299, savingAmount: 12701 },
      dualLine: { original: 26500, stagePrice: 8799, savingAmount: 17701 },
    },
    checkoutUrls: {
      dualLine: "https://travelworkacademy.myteachify.com/checkout?planId=09b36f1b-e7ab-456c-9cac-d420110dd436",
      remoteJob: "https://travelworkacademy.myteachify.com/checkout?planId=b9efa332-5c16-4e54-9398-c3c600a12162",
      selfMedia: "https://travelworkacademy.myteachify.com/checkout?planId=852c37ff-4a5c-454e-8a7f-4a1081041660",
    },
  },
  {
    id: "stage_2",
    order: 2,
    name: "正式招生起跑價",
    tagLine: "",
    discountLabel: "37 折",
    discountRate: 0.37,
    startAt: new Date("2026-02-27T00:00:00+08:00"),
    endAt: new Date("2026-03-05T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 6999, savingAmount: 12001 },
      remoteJob: { original: 19000, stagePrice: 6999, savingAmount: 12001 },
      dualLine: { original: 26500, stagePrice: 9799, savingAmount: 16701 },
    },
    checkoutUrls: {
      dualLine: "https://travelworkacademy.myteachify.com/checkout?planId=fd56914e-2737-4703-90b1-4812d27300d7",
      remoteJob: "https://travelworkacademy.myteachify.com/checkout?planId=37610571-dcfe-4e98-86b3-15b16c6cbbcf",
      selfMedia: "https://travelworkacademy.myteachify.com/checkout?planId=7537ce4d-1e8f-48ac-b603-4c514711fcb6",
    },
  },
  {
    id: "stage_3",
    order: 3,
    name: "查看地圖價",
    tagLine: "",
    discountLabel: "41 折",
    discountRate: 0.41,
    startAt: new Date("2026-03-06T00:00:00+08:00"),
    endAt: new Date("2026-03-19T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 7799, savingAmount: 11201 },
      remoteJob: { original: 19000, stagePrice: 7799, savingAmount: 11201 },
      dualLine: { original: 26500, stagePrice: 10899, savingAmount: 15601 },
    },
    checkoutUrls: {
      dualLine: "https://travelworkacademy.myteachify.com/checkout?planId=49bc284e-1add-4f09-b91a-2d3ecebd6d35",
      remoteJob: "https://travelworkacademy.myteachify.com/checkout?planId=5c1aa647-8913-404b-af71-026568fa2502",
      selfMedia: "https://travelworkacademy.myteachify.com/checkout?planId=e1cbfb03-a773-4d3e-af62-5099b630d85d",
    },
  },
  {
    id: "stage_4",
    order: 4,
    name: "夢想試飛價",
    tagLine: "還在偷偷觀望但願意先押注的人，文案可寫「願意先試飛的人，給你最輕的票價」。",
    discountLabel: "44 折",
    discountRate: 0.44,
    startAt: new Date("2026-03-20T00:00:00+08:00"),
    endAt: new Date("2026-03-26T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 8399, savingAmount: 10601 },
      remoteJob: { original: 19000, stagePrice: 8399, savingAmount: 10601 },
      dualLine: { original: 26500, stagePrice: 11699, savingAmount: 14801 },
    },
    checkoutUrls: {
      dualLine: "https://travelworkacademy.myteachify.com/checkout?planId=c6b232d8-54ee-40d5-816b-94c2a1ce0fa3",
      remoteJob: "https://travelworkacademy.myteachify.com/checkout?planId=5fcc0e74-c700-447e-86c7-04ca9815d1e1",
      selfMedia: "https://travelworkacademy.myteachify.com/checkout?planId=7c2ec115-0588-4910-a054-e2c74193bae2",
    },
  },
  {
    id: "stage_5",
    order: 5,
    name: "打包行李價",
    tagLine: "已經決定要上路、開始準備的人。",
    discountLabel: "47 折",
    discountRate: 0.47,
    startAt: new Date("2026-03-27T00:00:00+08:00"),
    endAt: new Date("2026-04-02T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 8999, savingAmount: 10001 },
      remoteJob: { original: 19000, stagePrice: 8999, savingAmount: 10001 },
      dualLine: { original: 26500, stagePrice: 12499, savingAmount: 14001 },
    },
    checkoutUrls: {
      dualLine: "https://travelworkacademy.myteachify.com/checkout?planId=3d17249a-df15-484a-88a0-861761b39672",
      remoteJob: "https://travelworkacademy.myteachify.com/checkout?planId=c30e4482-f5fd-40d0-8a10-cb6a9741f091",
      selfMedia: "https://travelworkacademy.myteachify.com/checkout?planId=92d4a080-f249-4686-9b94-e1bc3e6e5b60",
    },
  },
  {
    id: "stage_6",
    order: 6,
    name: "開票起飛價",
    tagLine: "對標「機票開票」的那一刻，提醒：再晚就要變貴了。",
    discountLabel: "51 折",
    discountRate: 0.51,
    startAt: new Date("2026-04-03T00:00:00+08:00"),
    endAt: new Date("2026-04-09T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 9699, savingAmount: 9301 },
      remoteJob: { original: 19000, stagePrice: 9699, savingAmount: 9301 },
      dualLine: { original: 26500, stagePrice: 13499, savingAmount: 13001 },
    },
    checkoutUrls: {
      dualLine: "https://travelworkacademy.myteachify.com/checkout?planId=0187110c-2658-40c5-a80d-cb0f08f425c4",
      remoteJob: "https://travelworkacademy.myteachify.com/checkout?planId=c9de109a-5e44-4cd6-9329-d3bcd9eb032a",
      selfMedia: "https://travelworkacademy.myteachify.com/checkout?planId=a3075368-fccd-4ac7-a42b-d085772f31dd",
    },
  },
  {
    id: "stage_7",
    order: 7,
    name: "最後登機口價",
    tagLine: "強調「再不上機就要關門」，很好寫 FOMO 文案。",
    discountLabel: "55 折",
    discountRate: 0.55,
    startAt: new Date("2026-04-10T00:00:00+08:00"),
    endAt: new Date("2026-04-16T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 10499, savingAmount: 8501 },
      remoteJob: { original: 19000, stagePrice: 10499, savingAmount: 8501 },
      dualLine: { original: 26500, stagePrice: 14599, savingAmount: 11901 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_8",
    order: 8,
    name: "起飛早鳥價",
    tagLine: "進入中段，還是早鳥，但已經離最便宜一段距離。",
    discountLabel: "59 折",
    discountRate: 0.59,
    startAt: new Date("2026-04-17T00:00:00+08:00"),
    endAt: new Date("2026-04-23T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 11199, savingAmount: 7801 },
      remoteJob: { original: 19000, stagePrice: 11199, savingAmount: 7801 },
      dualLine: { original: 26500, stagePrice: 15599, savingAmount: 10901 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_9",
    order: 9,
    name: "雲端巡航價",
    tagLine: "給晚一點才發現的人：「你還趕得上這班機，但不是最早那批價」。",
    discountLabel: "63 折",
    discountRate: 0.63,
    startAt: new Date("2026-04-24T00:00:00+08:00"),
    endAt: new Date("2026-04-30T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 11999, savingAmount: 7001 },
      remoteJob: { original: 19000, stagePrice: 11999, savingAmount: 7001 },
      dualLine: { original: 26500, stagePrice: 16699, savingAmount: 9801 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_10",
    order: 10,
    name: "中途轉機價",
    tagLine: "倒數接近開課：「快要入境學院」，價格再往上。",
    discountLabel: "67 折",
    discountRate: 0.67,
    startAt: new Date("2026-05-01T00:00:00+08:00"),
    endAt: new Date("2026-05-03T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 12699, savingAmount: 6301 },
      remoteJob: { original: 19000, stagePrice: 12699, savingAmount: 6301 },
      dualLine: { original: 26500, stagePrice: 17799, savingAmount: 8701 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_11",
    order: 11,
    name: "入境前夕價",
    tagLine: "很接近課程開始／招募截止，「最後加速衝進這一梯」。",
    discountLabel: "71 折",
    discountRate: 0.71,
    startAt: new Date("2026-05-04T00:00:00+08:00"),
    endAt: new Date("2026-05-06T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 13499, savingAmount: 5501 },
      remoteJob: { original: 19000, stagePrice: 13499, savingAmount: 5501 },
      dualLine: { original: 26500, stagePrice: 18799, savingAmount: 7701 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_12",
    order: 12,
    name: "落地衝刺價",
    tagLine: "真．最後一天／小時，「給還在猶豫但真的想上的你」。",
    discountLabel: "75 折",
    discountRate: 0.75,
    startAt: new Date("2026-05-07T00:00:00+08:00"),
    endAt: new Date("2026-05-07T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 14199, savingAmount: 4801 },
      remoteJob: { original: 19000, stagePrice: 14199, savingAmount: 4801 },
      dualLine: { original: 26500, stagePrice: 19899, savingAmount: 6601 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_13",
    order: 13,
    name: "壓線滑行價",
    tagLine: "開學價格，給不小心晚接收到資訊的你。",
    discountLabel: "79 折",
    discountRate: 0.79,
    startAt: new Date("2026-05-08T00:00:00+08:00"),
    endAt: new Date("2026-05-14T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 14999, savingAmount: 4001 },
      remoteJob: { original: 19000, stagePrice: 14999, savingAmount: 4001 },
      dualLine: { original: 26500, stagePrice: 20999, savingAmount: 5501 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_14",
    order: 14,
    name: "準時抵達價",
    tagLine: "開學價格，給不小心晚接收到資訊的你。",
    discountLabel: "83 折",
    discountRate: 0.83,
    startAt: new Date("2026-05-15T00:00:00+08:00"),
    endAt: new Date("2026-05-21T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 14999, savingAmount: 4001 },
      remoteJob: { original: 19000, stagePrice: 14999, savingAmount: 4001 },
      dualLine: { original: 26500, stagePrice: 21999, savingAmount: 4501 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_15",
    order: 15,
    name: "晚點到 - 相信自己",
    tagLine: "開學價格，給不小心晚接收到資訊的你。",
    discountLabel: "87 折",
    discountRate: 0.87,
    startAt: new Date("2026-05-22T00:00:00+08:00"),
    endAt: new Date("2026-05-28T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 15799, savingAmount: 3201 },
      remoteJob: { original: 19000, stagePrice: 15799, savingAmount: 3201 },
      dualLine: { original: 26500, stagePrice: 22999, savingAmount: 3501 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_16",
    order: 16,
    name: "晚點到 - 勇敢前行",
    tagLine: "開學價格，給不小心晚接收到資訊的你。",
    discountLabel: "91 折",
    discountRate: 0.91,
    startAt: new Date("2026-05-29T00:00:00+08:00"),
    endAt: new Date("2026-05-31T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 17299, savingAmount: 1701 },
      remoteJob: { original: 19000, stagePrice: 17299, savingAmount: 1701 },
      dualLine: { original: 26500, stagePrice: 24099, savingAmount: 2401 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_17",
    order: 17,
    name: "晚點到 - 原價",
    tagLine: "正常標價，之後所有折扣都跟它比。",
    discountLabel: "原價",
    discountRate: 1.0,
    startAt: new Date("2026-06-01T00:00:00+08:00"),
    endAt: new Date("2099-12-31T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 19000, savingAmount: 0 },
      remoteJob: { original: 19000, stagePrice: 19000, savingAmount: 0 },
      dualLine: { original: 26500, stagePrice: 26500, savingAmount: 0 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
]

export function getSingleLinePrice(stage: Stage): number {
  return stage.prices.selfMedia.stagePrice
}

export function formatPrice(price: number): string {
  return price.toLocaleString("zh-TW")
}

const PricingContext = createContext<PricingContextValue | null>(null)

export function PricingProvider({
  children,
  couponCode,
}: {
  children: ReactNode
  couponCode?: string
}) {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId | null>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [currentTime, setCurrentTime] = useState(new Date())

  const currentStageIndex = useMemo(() => {
    const now = currentTime
    const idx = stages.findIndex((stage) => now >= stage.startAt && now <= stage.endAt)
    return idx >= 0 ? idx : stages.length - 1
  }, [currentTime])

  const currentStageData = stages[currentStageIndex]

  const lowestPrice = getSingleLinePrice(currentStageData)

  const checkoutURL = useMemo(() => {
    const baseURL = currentStageData.checkoutUrls.dualLine
    return couponCode ? `${baseURL}&coupon=${couponCode}` : baseURL
  }, [couponCode, currentStageData])

  const getTrackingParams = () => {
    if (typeof window === "undefined") return ""
    const urlParams = new URLSearchParams(window.location.search)
    const params: string[] = []
    ;["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"].forEach((key) => {
      const value = urlParams.get(key)
      if (value) params.push(`${key}=${encodeURIComponent(value)}`)
    })
    return params.length > 0 ? `&${params.join("&")}` : ""
  }

  const getCheckoutURLWithTracking = (planId: PlanId) => {
    const baseURL = currentStageData.checkoutUrls[planId]
    const urlWithCoupon = couponCode ? `${baseURL}&coupon=${couponCode}` : baseURL
    return `${urlWithCoupon}${getTrackingParams()}`
  }

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      setCurrentTime(now) // Update current time to trigger stage check
      const endDate = currentStageData.endAt
      const difference = endDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [currentStageData])

  return (
    <PricingContext.Provider
      value={{
        stages,
        currentStageData,
        currentStageIndex,
        timeLeft,
        lowestPrice,
        checkoutURL,
        selectedPlanId,
        setSelectedPlanId,
        getTrackingParams,
        getCheckoutURLWithTracking,
      }}
    >
      {children}
    </PricingContext.Provider>
  )
}

export function usePricing() {
  const context = useContext(PricingContext)
  if (!context) {
    throw new Error("usePricing must be used within a PricingProvider")
  }
  return context
}
