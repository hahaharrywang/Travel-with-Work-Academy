"use client"

import { useEffect, useState } from "react"

interface StickyBottomBarProps {
  isHidden?: boolean
}

export function StickyBottomBar({ isHidden = false }: StickyBottomBarProps) {
  const [hasPassedSection8, setHasPassedSection8] = useState(false)

  useEffect(() => {
    const section8 = document.getElementById("pricing")
    if (!section8) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasPassedSection8(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    observer.observe(section8)
    return () => observer.disconnect()
  }, [])

  if (isHidden) return null

  const handleClick = () => {
    if (hasPassedSection8) {
      // Open replay link
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
    } else {
      // Scroll to Section 8
      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#C9D7D4] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="px-4 py-3">
        <button
          onClick={handleClick}
          className="w-full bg-[#17464F] text-white px-5 py-3.5 rounded-full text-base font-bold hover:bg-[#0f3339] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
        >
          {hasPassedSection8 ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              看說明會回放
            </>
          ) : (
            "免費看講座"
          )}
        </button>
      </div>
    </div>
  )
}
