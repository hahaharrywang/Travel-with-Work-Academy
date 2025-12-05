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
  plans?: {
    singleLine: {
      price: number
      originalPrice: number
    }
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
  getTrackingParams: () => string
}

export const stages: Stage[] = [
  {
    id: "stage_1",
    order: 1,
    name: "招生啟動價",
    tagLine: "最早的一批，只有少部分人知道的方案，有「一起開始學院」的感覺",
    discountLabel: "51 折",
    discountRate: 0.51,
    startAt: new Date("2025-12-04T00:00:00+08:00"),
    endAt: new Date("2025-12-10T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 8499, savingAmount: 8001 },
      remoteJob: { original: 16500, stagePrice: 8499, savingAmount: 8001 },
      dualLine: { original: 22500, stagePrice: 11500, savingAmount: 11000 },
    },
    plans: { singleLine: { price: 8499, originalPrice: 16500 } },
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
    plans: { singleLine: { price: 9499, originalPrice: 16500 } },
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
    plans: { singleLine: { price: 9999, originalPrice: 16500 } },
  },
  {
    id: "stage_4",
    order: 4,
    name: "開票起飛價",
    tagLine: "對標「機票開票」的那一刻，再晚就要變貴了",
    discountLabel: "64 折",
    discountRate: 0.64,
    startAt: new Date("2026-01-08T00:00:00+08:00"),
    endAt: new Date("2026-01-21T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 10499, savingAmount: 6001 },
      remoteJob: { original: 16500, stagePrice: 10499, savingAmount: 6001 },
      dualLine: { original: 22500, stagePrice: 14399, savingAmount: 8101 },
    },
    plans: { singleLine: { price: 10499, originalPrice: 16500 } },
  },
  {
    id: "stage_5",
    order: 5,
    name: "最後登機口價",
    tagLine: "登機門即將關閉，最後一刻的機會",
    discountLabel: "67 折",
    discountRate: 0.67,
    startAt: new Date("2026-01-22T00:00:00+08:00"),
    endAt: new Date("2026-02-04T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 10999, savingAmount: 5501 },
      remoteJob: { original: 16500, stagePrice: 10999, savingAmount: 5501 },
      dualLine: { original: 22500, stagePrice: 15099, savingAmount: 7401 },
    },
    plans: { singleLine: { price: 10999, originalPrice: 16500 } },
  },
  {
    id: "stage_6",
    order: 6,
    name: "起飛早鳥價",
    tagLine: "飛機已經起飛，歡迎登機",
    discountLabel: "70 折",
    discountRate: 0.7,
    startAt: new Date("2026-02-05T00:00:00+08:00"),
    endAt: new Date("2026-02-11T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 11499, savingAmount: 5001 },
      remoteJob: { original: 16500, stagePrice: 11499, savingAmount: 5001 },
      dualLine: { original: 22500, stagePrice: 15799, savingAmount: 6701 },
    },
    plans: { singleLine: { price: 11499, originalPrice: 16500 } },
  },
  {
    id: "stage_7",
    order: 7,
    name: "雲端巡航價",
    tagLine: "在雲端巡航，穩定飛行中",
    discountLabel: "73 折",
    discountRate: 0.73,
    startAt: new Date("2026-02-12T00:00:00+08:00"),
    endAt: new Date("2026-02-25T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 11999, savingAmount: 4501 },
      remoteJob: { original: 16500, stagePrice: 11999, savingAmount: 4501 },
      dualLine: { original: 22500, stagePrice: 16499, savingAmount: 6001 },
    },
    plans: { singleLine: { price: 11999, originalPrice: 16500 } },
  },
  {
    id: "stage_8",
    order: 8,
    name: "中途轉機價",
    tagLine: "轉機等待中，還有時間上機",
    discountLabel: "76 折",
    discountRate: 0.76,
    startAt: new Date("2026-02-26T00:00:00+08:00"),
    endAt: new Date("2026-03-11T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 12499, savingAmount: 4001 },
      remoteJob: { original: 16500, stagePrice: 12499, savingAmount: 4001 },
      dualLine: { original: 22500, stagePrice: 17199, savingAmount: 5301 },
    },
    plans: { singleLine: { price: 12499, originalPrice: 16500 } },
  },
  {
    id: "stage_9",
    order: 9,
    name: "入境前夕價",
    tagLine: "即將抵達目的地，倒數計時",
    discountLabel: "79 折",
    discountRate: 0.79,
    startAt: new Date("2026-03-12T00:00:00+08:00"),
    endAt: new Date("2026-03-18T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 12999, savingAmount: 3501 },
      remoteJob: { original: 16500, stagePrice: 12999, savingAmount: 3501 },
      dualLine: { original: 22500, stagePrice: 17899, savingAmount: 4601 },
    },
    plans: { singleLine: { price: 12999, originalPrice: 16500 } },
  },
  {
    id: "stage_10",
    order: 10,
    name: "落地衝刺價",
    tagLine: "飛機已經落地，最後衝刺",
    discountLabel: "82 折",
    discountRate: 0.82,
    startAt: new Date("2026-03-19T00:00:00+08:00"),
    endAt: new Date("2026-03-25T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 13499, savingAmount: 3001 },
      remoteJob: { original: 16500, stagePrice: 13499, savingAmount: 3001 },
      dualLine: { original: 22500, stagePrice: 18599, savingAmount: 3901 },
    },
    plans: { singleLine: { price: 13499, originalPrice: 16500 } },
  },
  {
    id: "stage_11",
    order: 11,
    name: "壓線報名價",
    tagLine: "最後一刻，壓線報名",
    discountLabel: "85 折",
    discountRate: 0.85,
    startAt: new Date("2026-03-26T00:00:00+08:00"),
    endAt: new Date("2026-03-30T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 13999, savingAmount: 2501 },
      remoteJob: { original: 16500, stagePrice: 13999, savingAmount: 2501 },
      dualLine: { original: 22500, stagePrice: 19299, savingAmount: 3201 },
    },
    plans: { singleLine: { price: 13999, originalPrice: 16500 } },
  },
  {
    id: "stage_final",
    order: 12,
    name: "原價",
    tagLine: "正式售價",
    discountLabel: "原價",
    discountRate: 1.0,
    startAt: new Date("2026-03-31T00:00:00+08:00"),
    endAt: new Date("2026-04-30T23:59:59+08:00"),
    prices: {
      selfMedia: { original: 16500, stagePrice: 16500, savingAmount: 0 },
      remoteJob: { original: 16500, stagePrice: 16500, savingAmount: 0 },
      dualLine: { original: 22500, stagePrice: 22500, savingAmount: 0 },
    },
    plans: { singleLine: { price: 16500, originalPrice: 16500 } },
  },
]

const PricingContext = createContext<PricingContextValue | null>(null)

export function PricingProvider({
  children,
  couponCode,
}: {
  children: ReactNode
  couponCode?: string
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const { currentStageData, currentStageIndex } = useMemo(() => {
    const now = new Date()
    const index = stages.findIndex((stage) => now >= stage.startAt && now <= stage.endAt)
    if (index !== -1) {
      return { currentStageData: stages[index], currentStageIndex: index }
    }
    return { currentStageData: stages[stages.length - 1], currentStageIndex: stages.length - 1 }
  }, [])

  const lowestPrice = useMemo(() => {
    return Math.min(
      currentStageData.prices.selfMedia.stagePrice,
      currentStageData.prices.remoteJob.stagePrice,
      currentStageData.prices.dualLine.stagePrice,
    )
  }, [currentStageData])

  const checkoutURL = useMemo(() => {
    const baseURL = "https://theremoteworkacademy.teachify.tw/checkout"
    return couponCode ? `${baseURL}?coupon=${couponCode}` : baseURL
  }, [couponCode])

  const getTrackingParams = () => {
    if (typeof window === "undefined") return ""
    const urlParams = new URLSearchParams(window.location.search)
    const trackingParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"]
    const params = trackingParams
      .filter((param) => urlParams.has(param))
      .map((param) => `${param}=${urlParams.get(param)}`)
      .join("&")
    return params ? `&${params}` : ""
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
          minutes: Math.floor((difference / 1000 / 60) % 60),
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

  const value: PricingContextValue = {
    stages,
    currentStageData,
    currentStageIndex,
    timeLeft,
    lowestPrice,
    checkoutURL,
    getTrackingParams,
  }

  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
}

export function usePricing() {
  const context = useContext(PricingContext)
  if (!context) {
    throw new Error("usePricing must be used within a PricingProvider")
  }
  return context
}
