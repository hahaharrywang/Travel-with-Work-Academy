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
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB%20Metadata%20-%20Square.jpg-nw2lh41iL0uXsDncOotln0XjzQUnZA.jpeg",
        width: 1080,
        height: 1080,
        alt: "遠距遊牧學院 - 告別朝九晚五，解鎖全球遠距自由人生",
      },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB%20Metadata.jpg-ME1NIL8bJeMlpv4o0BCk7jSUp3P5xe.jpeg",
        width: 1200,
        height: 630,
        alt: "遠距遊牧學院 - 告別朝九晚五，解鎖全球遠距自由人生",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "遠距遊牧學院 - 告別朝九晚五，解鎖全球遠距自由人生",
    description:
      "台灣首個系統性『遠距遊牧實戰學院』助你邊旅行邊實現人生價值。10個月學習與累積，讓你獲得開啟副業、遠距職涯的基礎能力。",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB%20Metadata%20-%20Square.jpg-nw2lh41iL0uXsDncOotln0XjzQUnZA.jpeg",
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
        <meta
          property="og:image"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB%20Metadata%20-%20Square.jpg-nw2lh41iL0uXsDncOotln0XjzQUnZA.jpeg"
        />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:image:alt" content="遠距遊牧學院 - 告別朝九晚五，解鎖全球遠距自由人生" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta
          name="twitter:image"
          content="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB%20Metadata%20-%20Square.jpg-nw2lh41iL0uXsDncOotln0XjzQUnZA.jpeg"
        />
        <meta name="twitter:image:width" content="1080" />
        <meta name="twitter:image:height" content="1080" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
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
