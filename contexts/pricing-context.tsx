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
    discountLabel: "43 折",
    discountRate: 0.43,
    startAt: new Date("2025-12-26T00:00:00+08:00"),
    endAt: new Date("2026-01-08T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 8199, savingAmount: 10801 },
      remoteJob: { original: 19000, stagePrice: 8199, savingAmount: 10801 },
      dualLine: { original: 24500, stagePrice: 10599, savingAmount: 13901 },
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
    name: "夢想試飛價",
    tagLine: "還在偷偷觀望但願意先押注的人，文案可寫「願意先試飛的人，給你最輕的票價」。",
    discountLabel: "48 折",
    discountRate: 0.48,
    startAt: new Date("2026-01-09T00:00:00+08:00"),
    endAt: new Date("2026-01-22T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 9199, savingAmount: 9801 },
      remoteJob: { original: 19000, stagePrice: 9199, savingAmount: 9801 },
      dualLine: { original: 24500, stagePrice: 11799, savingAmount: 12701 },
    },
    checkoutUrls: {
      dualLine: "https://travelworkacademy.myteachify.com/checkout?planId=82dd71a8-d5c4-4c28-ac86-5d4dde335c81",
      remoteJob: "https://travelworkacademy.myteachify.com/checkout?planId=5fcc0e74-c700-447e-86c7-04ca9815d1e1",
      selfMedia: "https://travelworkacademy.myteachify.com/checkout?planId=72c4b49f-8758-4168-a306-aa70ad1a0fe9",
    },
  },
  {
    id: "stage_3",
    order: 3,
    name: "打包行李價",
    tagLine: "已經決定要上路、開始準備的人。",
    discountLabel: "53 折",
    discountRate: 0.53,
    startAt: new Date("2026-01-23T00:00:00+08:00"),
    endAt: new Date("2026-02-05T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 9999, savingAmount: 9001 },
      remoteJob: { original: 19000, stagePrice: 9999, savingAmount: 9001 },
      dualLine: { original: 24500, stagePrice: 12999, savingAmount: 11501 },
    },
    checkoutUrls: {
      dualLine: "https://travelworkacademy.myteachify.com/checkout?planId=3d17249a-df15-484a-88a0-861761b39672",
      remoteJob: "https://travelworkacademy.myteachify.com/checkout?planId=c30e4482-f5fd-40d0-8a10-cb6a9741f091",
      selfMedia: "https://travelworkacademy.myteachify.com/checkout?planId=92d4a080-f249-4686-9b94-e1bc3e6e5b60",
    },
  },
  {
    id: "stage_4",
    order: 4,
    name: "開票起飛價",
    tagLine: "對標「機票開票」的那一刻，提醒：再晚就要變貴了。",
    discountLabel: "58 折",
    discountRate: 0.58,
    startAt: new Date("2026-02-06T00:00:00+08:00"),
    endAt: new Date("2026-02-12T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 10999, savingAmount: 8001 },
      remoteJob: { original: 19000, stagePrice: 10999, savingAmount: 8001 },
      dualLine: { original: 24500, stagePrice: 14199, savingAmount: 10301 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_5",
    order: 5,
    name: "最後登機口價",
    tagLine: "強調「再不上機就要關門」，很好寫 FOMO 文案。",
    discountLabel: "61 折",
    discountRate: 0.61,
    startAt: new Date("2026-02-13T00:00:00+08:00"),
    endAt: new Date("2026-02-19T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 11599, savingAmount: 7401 },
      remoteJob: { original: 19000, stagePrice: 11599, savingAmount: 7401 },
      dualLine: { original: 24500, stagePrice: 14999, savingAmount: 9501 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_6",
    order: 6,
    name: "起飛早鳥價",
    tagLine: "進入中段，還是早鳥，但已經離最便宜一段距離。",
    discountLabel: "64 折",
    discountRate: 0.64,
    startAt: new Date("2026-02-20T00:00:00+08:00"),
    endAt: new Date("2026-02-26T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 12199, savingAmount: 6801 },
      remoteJob: { original: 19000, stagePrice: 12199, savingAmount: 6801 },
      dualLine: { original: 24500, stagePrice: 15699, savingAmount: 8801 },
    },
    checkoutUrls: {
      dualLine: "",
      remoteJob: "",
      selfMedia: "",
    },
  },
  {
    id: "stage_7",
    order: 7,
    name: "雲端巡航價",
    tagLine: "價格往中段靠，語氣變得比較穩定：「隊伍已經在路上」。",
    discountLabel: "67 折",
    discountRate: 0.67,
    startAt: new Date("2026-02-27T00:00:00+08:00"),
    endAt: new Date("2026-03-05T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 12699, savingAmount: 6301 },
      remoteJob: { original: 19000, stagePrice: 12699, savingAmount: 6301 },
      dualLine: { original: 24500, stagePrice: 16399, savingAmount: 8101 },
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
    name: "中途轉機價",
    tagLine: "給晚一點才發現的人：「你還趕得上這班機，但不是最早那批價」。",
    discountLabel: "71 折",
    discountRate: 0.71,
    startAt: new Date("2026-03-06T00:00:00+08:00"),
    endAt: new Date("2026-03-12T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 13499, savingAmount: 5501 },
      remoteJob: { original: 19000, stagePrice: 13499, savingAmount: 5501 },
      dualLine: { original: 24500, stagePrice: 17399, savingAmount: 7101 },
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
    name: "入境前夕價",
    tagLine: "倒數接近開課：「快要入境學院」，價格再往上。",
    discountLabel: "75 折",
    discountRate: 0.75,
    startAt: new Date("2026-03-13T00:00:00+08:00"),
    endAt: new Date("2026-03-19T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 14299, savingAmount: 4701 },
      remoteJob: { original: 19000, stagePrice: 14299, savingAmount: 4701 },
      dualLine: { original: 24500, stagePrice: 18399, savingAmount: 6101 },
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
    name: "落地衝刺價",
    tagLine: "很接近課程開始／招募截止，「最後加速衝進這一梯」。",
    discountLabel: "80 折",
    discountRate: 0.8,
    startAt: new Date("2026-03-20T00:00:00+08:00"),
    endAt: new Date("2026-03-26T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 15199, savingAmount: 3801 },
      remoteJob: { original: 19000, stagePrice: 15199, savingAmount: 3801 },
      dualLine: { original: 24500, stagePrice: 19599, savingAmount: 4901 },
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
    name: "壓線滑行價",
    tagLine: "真．最後幾天／小時，「給還在猶豫但真的想上的你」。",
    discountLabel: "85 折",
    discountRate: 0.85,
    startAt: new Date("2026-03-27T00:00:00+08:00"),
    endAt: new Date("2026-03-31T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 16199, savingAmount: 2801 },
      remoteJob: { original: 19000, stagePrice: 16199, savingAmount: 2801 },
      dualLine: { original: 24500, stagePrice: 20899, savingAmount: 3601 },
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
    name: "準時抵達價",
    tagLine: "開學後價格，給不小心晚接收到資訊的你。",
    discountLabel: "92 折",
    discountRate: 0.92,
    startAt: new Date("2026-04-01T00:00:00+08:00"),
    endAt: new Date("2026-04-29T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 17499, savingAmount: 1501 },
      remoteJob: { original: 19000, stagePrice: 17499, savingAmount: 1501 },
      dualLine: { original: 24500, stagePrice: 22499, savingAmount: 2001 },
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
    name: "晚點到 - 原價",
    tagLine: "正常標價，之後所有折扣都跟它比。",
    discountLabel: "原價",
    discountRate: 1.0,
    startAt: new Date("2026-04-30T00:00:00+08:00"),
    endAt: new Date("2099-12-31T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 19000, stagePrice: 19000, savingAmount: 0 },
      remoteJob: { original: 19000, stagePrice: 19000, savingAmount: 0 },
      dualLine: { original: 24500, stagePrice: 24500, savingAmount: 0 },
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
