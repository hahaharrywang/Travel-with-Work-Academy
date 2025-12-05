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
  getCheckoutURLWithTracking: () => string
}

export const stages: Stage[] = [
  {
    id: "stage_1",
    order: 1,
    name: "招生啟動價",
    tagLine: "最早的一批，只有少部分人知道的方案",
    discountLabel: "51 折",
    discountRate: 0.51,
    startAt: new Date("2025-12-04T00:00:00+08:00"),
    endAt: new Date("2025-12-10T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 8499, savingAmount: 8001 },
      remoteJob: { original: 16500, stagePrice: 8499, savingAmount: 8001 },
      dualLine: { original: 22500, stagePrice: 11500, savingAmount: 11000 },
    },
  },
  {
    id: "stage_2",
    order: 2,
    name: "夢想試飛價",
    tagLine: "願意先試飛的人，給你最輕的票價",
    discountLabel: "58 折",
    discountRate: 0.58,
    startAt: new Date("2025-12-11T00:00:00+08:00"),
    endAt: new Date("2025-12-24T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 9499, savingAmount: 7001 },
      remoteJob: { original: 16500, stagePrice: 9499, savingAmount: 7001 },
      dualLine: { original: 22500, stagePrice: 12999, savingAmount: 9501 },
    },
  },
  {
    id: "stage_3",
    order: 3,
    name: "打包行李價",
    tagLine: "已經決定要上路、開始準備的人",
    discountLabel: "61 折",
    discountRate: 0.61,
    startAt: new Date("2025-12-25T00:00:00+08:00"),
    endAt: new Date("2026-01-07T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 9999, savingAmount: 6501 },
      remoteJob: { original: 16500, stagePrice: 9999, savingAmount: 6501 },
      dualLine: { original: 22500, stagePrice: 13699, savingAmount: 8801 },
    },
  },
  {
    id: "stage_4",
    order: 4,
    name: "開票起飛價",
    tagLine: "已確認機票、準備起飛",
    discountLabel: "64 折",
    discountRate: 0.64,
    startAt: new Date("2026-01-08T00:00:00+08:00"),
    endAt: new Date("2026-01-21T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 10499, savingAmount: 6001 },
      remoteJob: { original: 16500, stagePrice: 10499, savingAmount: 6001 },
      dualLine: { original: 22500, stagePrice: 14399, savingAmount: 8101 },
    },
  },
  {
    id: "stage_5",
    order: 5,
    name: "最後登機口價",
    tagLine: "倒數中的壓力，讓人行動",
    discountLabel: "67 折",
    discountRate: 0.67,
    startAt: new Date("2026-01-22T00:00:00+08:00"),
    endAt: new Date("2026-02-04T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 10999, savingAmount: 5501 },
      remoteJob: { original: 16500, stagePrice: 10999, savingAmount: 5501 },
      dualLine: { original: 22500, stagePrice: 15099, savingAmount: 7401 },
    },
  },
  {
    id: "stage_6",
    order: 6,
    name: "起飛早鳥價",
    tagLine: "起飛前還想趕上的人",
    discountLabel: "70 折",
    discountRate: 0.7,
    startAt: new Date("2026-02-05T00:00:00+08:00"),
    endAt: new Date("2026-02-18T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 11499, savingAmount: 5001 },
      remoteJob: { original: 16500, stagePrice: 11499, savingAmount: 5001 },
      dualLine: { original: 22500, stagePrice: 15799, savingAmount: 6701 },
    },
  },
  {
    id: "stage_7",
    order: 7,
    name: "雲端巡航價",
    tagLine: "已在空中，穩定前進",
    discountLabel: "73 折",
    discountRate: 0.73,
    startAt: new Date("2026-02-19T00:00:00+08:00"),
    endAt: new Date("2026-03-04T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 11999, savingAmount: 4501 },
      remoteJob: { original: 16500, stagePrice: 11999, savingAmount: 4501 },
      dualLine: { original: 22500, stagePrice: 16499, savingAmount: 6001 },
    },
  },
  {
    id: "stage_8",
    order: 8,
    name: "中途轉機價",
    tagLine: "還在猶豫要不要換航班的人",
    discountLabel: "76 折",
    discountRate: 0.76,
    startAt: new Date("2026-03-05T00:00:00+08:00"),
    endAt: new Date("2026-03-18T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 12499, savingAmount: 4001 },
      remoteJob: { original: 16500, stagePrice: 12499, savingAmount: 4001 },
      dualLine: { original: 22500, stagePrice: 17199, savingAmount: 5301 },
    },
  },
  {
    id: "stage_9",
    order: 9,
    name: "入境前夕價",
    tagLine: "快要落地了，把握最後機會",
    discountLabel: "79 折",
    discountRate: 0.79,
    startAt: new Date("2026-03-19T00:00:00+08:00"),
    endAt: new Date("2026-04-01T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 12999, savingAmount: 3501 },
      remoteJob: { original: 16500, stagePrice: 12999, savingAmount: 3501 },
      dualLine: { original: 22500, stagePrice: 17899, savingAmount: 4601 },
    },
  },
  {
    id: "stage_10",
    order: 10,
    name: "落地衝刺價",
    tagLine: "已經落地，最後衝刺",
    discountLabel: "82 折",
    discountRate: 0.82,
    startAt: new Date("2026-04-02T00:00:00+08:00"),
    endAt: new Date("2026-04-15T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 13499, savingAmount: 3001 },
      remoteJob: { original: 16500, stagePrice: 13499, savingAmount: 3001 },
      dualLine: { original: 22500, stagePrice: 18599, savingAmount: 3901 },
    },
  },
  {
    id: "stage_11",
    order: 11,
    name: "壓線報名價",
    tagLine: "最後一刻的決定",
    discountLabel: "88 折",
    discountRate: 0.88,
    startAt: new Date("2026-04-16T00:00:00+08:00"),
    endAt: new Date("2026-04-29T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 14499, savingAmount: 2001 },
      remoteJob: { original: 16500, stagePrice: 14499, savingAmount: 2001 },
      dualLine: { original: 22500, stagePrice: 19899, savingAmount: 2601 },
    },
  },
  {
    id: "stage_final",
    order: 12,
    name: "原價",
    tagLine: "正式售價",
    discountLabel: "原價",
    discountRate: 1.0,
    startAt: new Date("2026-04-30T00:00:00+08:00"),
    endAt: new Date("2026-06-30T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 16500, savingAmount: 0 },
      remoteJob: { original: 16500, stagePrice: 16500, savingAmount: 0 },
      dualLine: { original: 22500, stagePrice: 22500, savingAmount: 0 },
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

  const currentStageIndex = useMemo(() => {
    const now = new Date()
    const idx = stages.findIndex((stage) => now >= stage.startAt && now <= stage.endAt)
    return idx >= 0 ? idx : stages.length - 1
  }, [])

  const currentStageData = stages[currentStageIndex]

  const lowestPrice = getSingleLinePrice(currentStageData)

  const checkoutURL = useMemo(() => {
    const baseURL = "https://travelwithwork.teachify.tw/checkout"
    return couponCode ? `${baseURL}?coupon=${couponCode}` : baseURL
  }, [couponCode])

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

  const getCheckoutURLWithTracking = () => {
    return `${checkoutURL}${getTrackingParams()}`
  }

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
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
