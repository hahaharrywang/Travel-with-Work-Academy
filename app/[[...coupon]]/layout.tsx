import type React from "react"
import { PricingProvider } from "@/contexts/pricing-context"

export default function CouponLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { coupon?: string[] }
}) {
  const couponCode = params.coupon?.[0] || undefined

  return <PricingProvider couponCode={couponCode}>{children}</PricingProvider>
}
