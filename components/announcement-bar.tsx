"use client"

import type React from "react"

import { useState } from "react"
import { usePricing } from "@/contexts/pricing-context"

interface AnnouncementBarProps {
  scrollToPricing: () => void
}

export function AnnouncementBar({ scrollToPricing }: AnnouncementBarProps) {
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
    <div className="sticky top-0 z-50 bg-[#17464F] text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Pricing countdown */}
        <div className="flex items-center gap-2 text-sm">
          <span>🔥</span>
          <span className="text-[#D4B483] font-bold">{currentStageData.name}</span>
          <span className="text-[#D4B483] font-bold">{currentStageData.discountLabel}</span>
          <span className="mx-1 hidden sm:inline">｜</span>
          {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
            <span className="hidden sm:inline">
              漲價倒數
              <span className="font-bold text-[#D4B483] ml-1">
                {String(timeLeft.days).padStart(2, "0")} 天 {String(timeLeft.hours).padStart(2, "0")} 時{" "}
                {String(timeLeft.minutes).padStart(2, "0")} 分 {String(timeLeft.seconds).padStart(2, "0")} 秒
              </span>
            </span>
          ) : (
            <span className="text-white/80 hidden sm:inline">本階段已結束</span>
          )}
        </div>

        {/* Right: Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 flex-shrink-0">
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

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 relative z-50"
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
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col py-4 border-t border-white/20 mt-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="py-3 px-2 text-white/90 hover:text-[#D4B483] hover:bg-white/5 transition-colors text-center"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
