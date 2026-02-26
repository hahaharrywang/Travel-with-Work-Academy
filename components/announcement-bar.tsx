"use client"

import type React from "react"

import { useState } from "react"
import { usePricing } from "@/contexts/pricing-context"

interface AnnouncementBarProps {
  scrollToPricing: () => void
  onEmailSubscribe?: () => void
}

export function AnnouncementBar({ scrollToPricing, onEmailSubscribe }: AnnouncementBarProps) {
  const { currentStageData, timeLeft } = usePricing()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (!currentStageData) return null

  const navItems = [
    { label: "學院介紹", href: "#key-features" },
    { label: "學習地圖", href: "#learning-map" },
    { label: "學員見證", href: "#student-results" },
    { label: "學習方案", href: "#pricing" },
    { label: "常見問題", href: "#faq" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    if (href === "#pricing") {
      scrollToPricing()
    } else {
      const targetId = href.replace("#", "")
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }

    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop: Full announcement bar */}
      <div className="hidden md:block sticky top-0 z-50 bg-[#17464F] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Pricing countdown */}
          <div className="flex items-center gap-2 text-sm">
            <span>🔥</span>
            <span className="text-[#D4B483] font-bold">{currentStageData.name}</span>
            <span className="text-[#D4B483] font-bold">{currentStageData.discountLabel}</span>
            <span className="mx-1">｜</span>
            {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
              <span>
                漲價倒數
                <span className="font-bold text-[#D4B483] ml-1">
                  {String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 時{" "}
                  {String(timeLeft.minutes).padStart(2, "0")} 分 {String(timeLeft.seconds).padStart(2, "0")} 秒
                </span>
              </span>
            ) : (
              <span className="text-white/80">本階段已結束</span>
            )}
          </div>

          {/* Right: Desktop nav */}
          <nav className="flex items-center gap-6 flex-shrink-0">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-white/90 hover:text-[#D4B483] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 bg-[#17464F] rounded-lg shadow-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
              mobileMenuOpen ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Mobile dropdown menu */}
        <div
          className={`absolute top-12 right-0 w-64 bg-[#17464F] rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col py-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="py-3 px-4 text-white/90 hover:text-[#D4B483] hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}

            {/* Email subscribe button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onEmailSubscribe?.()
              }}
              className="py-3 px-4 text-left text-white/90 hover:text-[#D4B483] hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span>Email 訂閱最新消息</span>
            </button>

            <div className="border-t border-white/10 mt-2 pt-2 px-4">
              <p className="text-xs text-white/60 mb-2 px-0">聯絡我們</p>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/travelwithwork_/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 text-white/90 hover:text-[#D4B483] hover:bg-white/5 transition-colors rounded-md px-0"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-sm">Instagram</span>
              </a>

              {/* Line */}
              <a
                href="https://lin.ee/r7kh3fX"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 text-white/90 hover:text-[#D4B483] hover:bg-white/5 transition-colors rounded-md px-0"
              >
                <div className="w-8 h-8 rounded-full bg-[#06C755] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                </div>
                <span className="text-sm">Line 官方</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
