"use client"

import { Mail, X } from "lucide-react"
import { useState, useEffect } from "react"

export function FreeLectureSection() {
  const [emailPopupOpen, setEmailPopupOpen] = useState(false)

  // Lock body scroll when email popup is open & load GHL embed script
  useEffect(() => {
    if (emailPopupOpen) {
      document.body.style.overflow = "hidden"
      // Load GHL form embed script if not already loaded
      if (!document.querySelector('script[src*="form_embed.js"]')) {
        const s = document.createElement("script")
        s.src = "https://link.digitalnomadstaiwan.com/js/form_embed.js"
        s.async = true
        document.body.appendChild(s)
      }
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [emailPopupOpen])

  return (
    <>
      <section id="free-lecture-section" className="bg-brand-offwhite py-10 sm:py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* Desktop: single line, Mobile: two lines */}
          <h3 className="text-2xl sm:text-3xl font-bold text-brand-teal mb-3">
            <span className="block sm:inline">{"還不確定要不要加入？"}</span>
            <span className="block sm:inline">{"先聽聽校長說明會分享"}</span>
          </h3>
          <p className="text-sm sm:text-base text-brand-text/70 leading-relaxed mb-6">
            {"先看懂：你適不適合、偏哪條路、這 5 個月會怎麼走。"}
          </p>
          
          {/* Embedded YouTube Video */}
          <div className="relative w-full aspect-video max-w-xl mx-auto mb-8 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/gZ37Pl9NdHU?rel=0"
              title="遠距遊牧學院介紹影片"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Upcoming Lectures Section */}
          <h4 className="text-lg sm:text-xl font-semibold text-brand-teal mb-4">
            {"近期講座場次"}
          </h4>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-xl mx-auto">
            <a
              href="https://www.accupass.com/organizer/detail/2509180637491342778166"
              target="_blank"
              rel="noopener noreferrer"
              className="block flex-1 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0419%20accupass-x4C0XvsCCDLq3Q7cMT4H6VQLJ9hzQu.jpg"
                alt="4/19 免費講座：遠距自由職涯下一步 2小時把「對自由職涯的嚮往」變成「我已經在路上」"
                className="w-full h-auto"
              />
            </a>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4">
            <a
              href="https://www.accupass.com/organizer/detail/2509180637491342778166"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-teal font-semibold text-sm sm:text-base px-6 lg:px-5 py-4 lg:py-3 rounded-full hover:bg-[#c9a673] transition-colors duration-200 shadow-sm w-full sm:w-auto whitespace-nowrap"
            >
              {"報名免費講座、認識講師"}
            </a>
            <a
              href="https://www.skool.com/twwgroup-3033/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal font-semibold text-sm sm:text-base px-6 lg:px-5 py-4 lg:py-3 rounded-full hover:bg-brand-teal hover:text-white transition-colors duration-200 w-full sm:w-auto whitespace-nowrap"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
              {"其他免費學習資源"}
            </a>
            <button
              onClick={() => setEmailPopupOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-semibold text-sm sm:text-base px-6 lg:px-5 py-4 lg:py-3 rounded-full hover:bg-[#1a5561] transition-colors duration-200 shadow-sm w-full sm:w-auto whitespace-nowrap"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              {"訂閱隨時收到最新活動提醒"}
            </button>
          </div>
        </div>
      </section>

      {/* GHL Email Subscription Modal */}
      {emailPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="訂閱電子報"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEmailPopupOpen(false)} />
          {/* Modal — full-width on mobile, max-w-lg on desktop */}
          <div
            className="relative z-10 w-full max-w-[calc(100vw-16px)] sm:max-w-lg bg-brand-teal rounded-2xl shadow-2xl"
            style={{ overflow: "hidden" }}
          >
            {/* Close button */}
            <button
              onClick={() => setEmailPopupOpen(false)}
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
              aria-label="關閉"
            >
              <X className="w-4 h-4" />
            </button>
            {/* GHL form embed container */}
            <div className="h-[430px] overflow-hidden rounded-[20px]">
              <iframe
                src="https://link.digitalnomadstaiwan.com/widget/form/MpJ0wDqzBLszazx5vVRy"
                style={{ width: "100%", height: "100%", border: "none", borderRadius: "20px" }}
                id="inline-MpJ0wDqzBLszazx5vVRy"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="遠距遊牧學院 - 表單"
                data-height="430"
                data-layout-iframe-id="inline-MpJ0wDqzBLszazx5vVRy"
                data-form-id="MpJ0wDqzBLszazx5vVRy"
                title="遠距遊牧學院 - 表單"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
