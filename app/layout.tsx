import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Remote Nomad Academy - Escape 9-to-5, Unlock Your Global Remote Freedom",
  description:
    "Taiwan's first systematic 'Remote Nomad Academy' helps you travel while achieving life value. 10 months of learning and growth to gain foundational skills for side business and remote career.",
  generator: "Travel With Work Academy",
  keywords: "remote work,digital nomad,side business,remote career,online courses,personal branding,freelance work",
  authors: [{ name: "Travel With Work Academy" }],
  openGraph: {
    title: "Remote Nomad Academy - Escape 9-to-5, Unlock Your Global Remote Freedom",
    description:
      "Taiwan's first systematic 'Remote Nomad Academy' helps you travel while achieving life value. 10 months of learning and growth to gain foundational skills for side business and remote career.",
    url: "https://www.travelwithwork.life",
    siteName: "Remote Nomad Academy Travel With Work Academy",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB%20Metadata%20-%20Square.jpg-nw2lh41iL0uXsDncOotln0XjzQUnZA.jpeg",
        width: 1080,
        height: 1080,
        alt: "Remote Nomad Academy - Escape 9-to-5, Unlock Your Global Remote Freedom",
      },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB%20Metadata.jpg-ME1NIL8bJeMlpv4o0BCk7jSUp3P5xe.jpeg",
        width: 1200,
        height: 630,
        alt: "Remote Nomad Academy - Escape 9-to-5, Unlock Your Global Remote Freedom",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Remote Nomad Academy - Escape 9-to-5, Unlock Your Global Remote Freedom",
    description:
      "Taiwan's first systematic 'Remote Nomad Academy' helps you travel while achieving life value. 10 months of learning and growth to gain foundational skills for side business and remote career.",
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
        <meta
          property="og:image:alt"
          content="Remote Nomad Academy - Escape 9-to-5, Unlock Your Global Remote Freedom"
        />
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
