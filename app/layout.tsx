import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { StructuredData } from "@/components/structured-data"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "遠距遊牧學院 - 告別朝九晚五，解鎖遠距自由人生",
  description:
    "台灣首個系統化『遠距遊牧實戰學院』，助你邊旅行邊實現人生價值。10個月學習與累積，讓你獲得開啟副業、遠距職涯的基礎能力。",
  generator: "Travel With Work Academy",
  keywords: "遠距工作,數位遊牧,副業,遠距職涯,遠端工作,線上課程,個人品牌,自由工作",
  authors: [{ name: "Travel With Work Academy" }],
  openGraph: {
    title: "遠距遊牧學院 - 告別朝九晚五，解鎖遠距自由人生",
    description:
      "台灣首個系統化『遠距遊牧實戰學院』，助你邊旅行邊實現人生價值。10個月學習與累積，讓你獲得開啟副業、遠距職涯的基礎能力。",
    url: "https://www.travelwithwork.life",
    siteName: "遠距遊牧學院 Travel With Work Academy",
    images: [
      {
        url: "/images/fb-20metadata-20-20square.jpeg",
        width: 1080,
        height: 1080,
        alt: "遠距遊牧學院 - 告別朝九晚五，解鎖遠距自由人生",
      },
      {
        url: "/images/fb-20metadata.jpeg",
        width: 1200,
        height: 630,
        alt: "遠距遊牧學院 - 告別朝九晚五，解鎖遠距自由人生",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "遠距遊牧學院 - 告別朝九晚五，解鎖遠距自由人生",
    description:
      "台灣首個系統化『遠距遊牧實戰學院』助你邊旅行邊實現人生價值。10個月學習與累積，讓你獲得開啟副業、遠距職涯的基礎能力。",
    images: ["/images/fb-20metadata-20-20square.jpeg"],
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
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html lang="zh-TW" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <head>
        <StructuredData />

        {gtmId && (
          <Script
            id="gtm-head"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        )}

        <meta property="og:image" content="/images/fb-20metadata-20-20square.jpeg" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:image:alt" content="遠距遊牧學院 - 告別朝九晚五，解鎖遠距自由人生" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:image" content="/images/fb-20metadata-20-20square.jpeg" />
        <meta name="twitter:image:width" content="1080" />
        <meta name="twitter:image:height" content="1080" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body>
        {metaPixelId && (
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
                fbq('track', 'PageView');
                
                window.fbqTrack = function(eventName, parameters = {}) {
                  if (typeof fbq !== 'undefined') {
                    fbq('track', eventName, parameters);
                    console.log('[v0] Meta Pixel event tracked:', eventName, parameters);
                  }
                };
              `,
            }}
          />
        )}

        <Script
          id="tracking-functions"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.trackViewContent = function(contentName, contentCategory = '課程') {
                const params = {
                  content_name: contentName,
                  content_category: contentCategory,
                  currency: 'TWD'
                };
                console.log('[v0] ViewContent event:', params);
                if (window.fbqTrack) {
                  window.fbqTrack('ViewContent', params);
                }
              };
              
              window.trackInitiateCheckout = function(value, courseName = '遠距遊牧學院') {
                const params = {
                  content_name: courseName,
                  value: value,
                  currency: 'TWD'
                };
                console.log('[v0] InitiateCheckout event:', params);
                if (window.fbqTrack) {
                  window.fbqTrack('InitiateCheckout', params);
                }
              };
              
              window.trackLead = function(leadType = '課程諮詢') {
                const params = {
                  content_name: leadType,
                  content_category: '潛在客戶'
                };
                console.log('[v0] Lead event:', params);
                if (window.fbqTrack) {
                  window.fbqTrack('Lead', params);
                }
              };
              
              window.trackPurchase = function(value, courseName = '遠距遊牧學院') {
                const params = {
                  content_name: courseName,
                  value: value,
                  currency: 'TWD'
                };
                console.log('[v0] Purchase event:', params);
                if (window.fbqTrack) {
                  window.fbqTrack('Purchase', params);
                }
              };

              window.trackTimeOnPage = function(seconds) {
                const params = {
                  content_name: '遠距遊牧學院',
                  content_category: '時間停留',
                  custom_parameter_1: seconds + 's'
                };
                console.log('[v0] TimeOnPage_' + seconds + 's event:', params);
                if (window.fbqTrack) {
                  window.fbqTrack('TimeOnPage_' + seconds + 's', params);
                }
              };

              window.trackScrollDepth = function(percentage) {
                const params = {
                  content_name: '遠距遊牧學院',
                  content_category: '滾動深度',
                  custom_parameter_1: percentage + '%'
                };
                console.log('[v0] ScrollDepth_' + percentage + '% event:', params);
                if (window.fbqTrack) {
                  window.fbqTrack('ScrollDepth_' + percentage, params);
                }
              };

              let timeTrackers = {
                '3s': false,
                '5s': false,
                '10s': false
              };

              // 3秒追蹤
              setTimeout(function() {
                if (!timeTrackers['3s']) {
                  timeTrackers['3s'] = true;
                  window.trackTimeOnPage(3);
                }
              }, 3000);

              // 5秒追蹤
              setTimeout(function() {
                if (!timeTrackers['5s']) {
                  timeTrackers['5s'] = true;
                  window.trackTimeOnPage(5);
                }
              }, 5000);

              // 10秒追蹤
              setTimeout(function() {
                if (!timeTrackers['10s']) {
                  timeTrackers['10s'] = true;
                  window.trackTimeOnPage(10);
                }
              }, 10000);

              let scrollTrackers = {
                '10': false,
                '20': false,
                '30': false,
                '40': false,
                '50': false,
                '60': false,
                '70': false,
                '80': false,
                '90': false,
                '100': false
              };

              window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);
                
                // 檢查所有滾動深度里程碑
                const milestones = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                
                milestones.forEach(function(milestone) {
                  if (scrollPercentage >= milestone && !scrollTrackers[milestone.toString()]) {
                    scrollTrackers[milestone.toString()] = true;
                    window.trackScrollDepth(milestone);
                  }
                });
              });
            `,
          }}
        />

        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {metaPixelId && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  )
}
