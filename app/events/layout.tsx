import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "線上說明會＆講座場次 | 遠距遊牧學院",
  description: "查看遠距遊牧學院所有線上說明會與公開講座場次，包含即將舉辦、進行中及已完成的活動資訊。",
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
