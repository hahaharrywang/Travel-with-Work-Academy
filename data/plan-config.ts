// Plan configuration for checkout URLs

export type PlanId = "selfMedia" | "remoteJob" | "dualLine"

export interface PlanConfig {
  name: string
  checkoutPath: string
}

export const planConfig: Record<PlanId, PlanConfig> = {
  selfMedia: { name: "自媒體線路方案", checkoutPath: "planId=selfmedia" },
  remoteJob: { name: "遠端上班線路方案", checkoutPath: "planId=remotejob" },
  dualLine: { name: "雙線整合方案", checkoutPath: "planId=be56b4ae-6f31-43be-8bfb-68fda4294a9a" },
}

export const popularPlanId: PlanId = "dualLine"

export const getCheckoutURL = (planId: PlanId, couponCode?: string): string => {
  const baseURL = `https://travelworkacademy.myteachify.com/checkout?${planConfig[planId].checkoutPath}`
  return couponCode ? `${baseURL}&coupon=${encodeURIComponent(couponCode)}` : baseURL
}
