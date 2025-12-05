"use client"

import type React from "react"
import { useParams } from "next/navigation"
import { PricingProvider } from "@/contexts/pricing-context"

export default function CouponLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const couponCode = params.coupon ? (Array.isArray(params.coupon) ? params.coupon[0] : params.coupon) : undefined

  return <PricingProvider couponCode={couponCode}>{children}</PricingProvider>
}
