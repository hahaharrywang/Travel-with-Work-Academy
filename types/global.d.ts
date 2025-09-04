declare global {
  interface Window {
    fbq: any
    fbqTrack: (eventName: string, parameters?: any) => void
    trackViewContent: (contentName: string, contentCategory?: string) => void
    trackInitiateCheckout: (value: number, courseName?: string) => void
    trackLead: (leadType?: string) => void
    trackPurchase: (value: number, courseName?: string) => void
  }
}

export {}
