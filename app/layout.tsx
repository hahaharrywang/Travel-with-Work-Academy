import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "遠距遊牧學院 - 告別朝九晚五，解鎖全球遠距自由人生",
  description:
    "台灣首個系統性『遠距遊牧實戰學院』助你邊旅行邊實現人生價值。10個月學習與累積，讓你獲得開啟副業、遠距職涯的基礎能力。",
  generator: "Travel With Work Academy",
  keywords: "遠距工作,數位遊牧,副業,遠距職涯,線上課程,個人品牌,自由工作",
  authors: [{ name: "Travel With Work Academy" }],
  openGraph: {
    title: "遠距遊牧學院 - 告別朝九晚五，解鎖全球遠距自由人生",
    description:
      "台灣首個系統性『遠距遊牧實戰學院』助你邊旅行邊實現人生價值。10個月學習與累積，讓你獲得開啟副業、遠距職涯的基礎能力。",
    url: "https://www.travelwithwork.life",
    siteName: "遠距遊牧學院 Travel With Work Academy",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/youtube_banner_v2_0-9822ni8JxgwP90jJ9hDZY5mYroLI4I.png",
        width: 1200,
        height: 630,
        alt: "遠距遊牧學院 - 告別朝九晚五，解鎖全球遠距自由人生",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "遠距遊牧學院 - 告別朝九晚五，解鎖全球遠距自由人生",
    description:
      "台灣首個系統性『遠距遊牧實戰學院』助你邊旅行邊實現人生價值。10個月學習與累積，讓你獲得開啟副業、遠距職涯的基礎能力。",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/youtube_banner_v2_0-9822ni8JxgwP90jJ9hDZY5mYroLI4I.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
