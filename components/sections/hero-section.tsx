"use client"

import Image from "next/image"
import {
  TrendingUp,
  FileText,
  Users,
  Globe,
  Layers,
} from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-teal">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] border border-[#E8C547]/30 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] border border-[#E8C547]/20 rounded-full" />
        <div className="absolute bottom-1/4 right-1/2 w-[300px] h-[300px] border border-[#E8C547]/10 rounded-full" />
        <div className="absolute bottom-0 left-0 right-0 h-40">
          <div className="absolute bottom-8 left-[10%] w-1 h-1 bg-[#E8C547] rounded-full animate-pulse" />
          <div className="absolute bottom-16 left-[20%] w-1.5 h-1.5 bg-[#E8C547]/80 rounded-full animate-pulse delay-100" />
          <div className="absolute bottom-12 left-[35%] w-1 h-1 bg-[#E8C547]/60 rounded-full animate-pulse delay-200" />
          <div className="absolute bottom-20 left-[45%] w-2 h-2 bg-[#E8C547]/70 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-6 left-[55%] w-1 h-1 bg-[#E8C547] rounded-full animate-pulse delay-150" />
          <div className="absolute bottom-14 left-[65%] w-1.5 h-1.5 bg-[#E8C547]/80 rounded-full animate-pulse delay-250" />
          <div className="absolute bottom-10 left-[75%] w-1 h-1 bg-[#E8C547]/60 rounded-full animate-pulse delay-100" />
          <div className="absolute bottom-18 left-[85%] w-1.5 h-1.5 bg-[#E8C547]/70 rounded-full animate-pulse delay-200" />
          <div className="absolute bottom-4 left-[90%] w-1 h-1 bg-[#E8C547] rounded-full animate-pulse delay-300" />
        </div>
      </div>

      {/* Header with Logo only */}
      <div className="absolute top-0 left-0 z-30 pt-3 sm:pt-4 px-4 sm:px-6 lg:px-8">
        <Image
          src="/images/academy-logo.png"
          alt="遠距遊牧學院 Travel with Work Academy"
          width={200}
          height={105}
          className="h-auto w-[140px] sm:w-[200px] lg:w-[240px] brightness-0 invert"
          priority
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-10 lg:pb-12">
        {/* Desktop: Left content + Right image - heights match */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: All text content */}
          <div className="flex flex-col space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight tracking-wide">
              今年五月，
              <br />
              一起把「也許有一天」
              <br />
              變成「<span className="text-brand-gold">我也正在路上</span>」
            </h1>

            <p className="text-sm sm:text-base text-brand-gold font-medium tracking-wide leading-relaxed">
              {'給想開始遠端上班、接案，或還在兩者之間猶豫的人。'}
              <br />
              {'這是一套 5 個月、可單線也可雙軌的行動系統，幫你在不停薪、不打亂原本生活的前提下，真的開始踏出下一步。'}
            </p>

            <div className="space-y-2 text-left">
              <div className="flex items-start gap-3">
                <Layers className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                <p className="text-white/90">雙軌起步：遠端上班 × 接案，不用一開始就選到死</p>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                <p className="text-white/90">不停薪開始：不必離職，也能先試出自己的下一步</p>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                <p className="text-white/90">五個月有節奏：不是被啟發而已，是真的一步步做出來</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                <p className="text-white/90">成果看得見：履歷、作品集、個人頁面，不再只是想過</p>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                <p className="text-white/90">從台灣接到世界：線下小聚、遊牧旅程、國際生態系入口</p>
              </div>
            </div>

            {/* CTA Buttons - side by side */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://www.accupass.com/organizer/detail/2509180637491342778166"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-teal font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#c9a673] transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                查看免費講座場次
              </a>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 text-white/80 hover:text-brand-gold hover:border-brand-gold/50 font-medium text-sm px-5 py-2.5 rounded-full transition-colors duration-200"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
                先看學院說明會回放
              </a>
            </div>

            <p className="text-white/50 text-xs">
              還不確定適不適合？先看免費講座或回放，再決定要不要加入。
            </p>

            {/* 錨點文字 */}
            <button
              onClick={() => {
                document.getElementById("learning-map")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="text-white/50 hover:text-white/80 text-sm transition-colors duration-200 flex items-center gap-1"
            >
              往下看 5 個月怎麼走
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Right: Image + Social Proof - flex to fill height */}
          <div className="flex flex-col">
            <div className="relative flex-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full">
                <Image
                  src="/images/hero-background.png"
                  alt="遠距工作場景 - 共同工作空間"
                  fill
                  className="object-cover"
                  priority
                  sizes="50vw"
                />
              </div>
              <div className="absolute -top-3 -right-3 w-full h-full border-2 border-[#D4AF37]/50 rounded-2xl pointer-events-none" />
              <div className="absolute -top-6 -right-6 w-full h-full border border-[#D4AF37]/25 rounded-2xl pointer-events-none" />
            </div>
            {/* Social Proof - below image */}
            <p className="text-sm text-white/70 text-center pt-4">
              <span className="text-brand-gold font-semibold">2025 第一屆</span>
              {' · '}已累積 <span className="text-white font-medium">300+</span> 學員
              {' · '}<span className="text-white font-medium">1,500+</span> 線下社群參與
            </p>
          </div>
        </div>

        {/* Mobile: Original stacked layout */}
        <div className="lg:hidden space-y-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-wide">
            今年五月，
            <br />
            一起把「也許有一天」
            <br />
            變成「<span className="text-brand-gold">我也正在路上</span>」
          </h1>

          <p className="text-sm sm:text-base text-brand-gold font-medium tracking-wide leading-relaxed">
            {'給想開始遠端上班、接案，或還在兩者之間猶豫的人。'}
            <br />
            {'這是一套 5 個月、可單線也可雙軌的行動系統，幫你在不停薪、不打亂原本生活的前提下，真的開始踏出下一步。'}
          </p>

          <div className="space-y-3 text-left max-w-xl mx-auto">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
              <p className="text-white/90">雙軌起步：遠端上班 × 接案，不用一開始就選到死</p>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
              <p className="text-white/90">不停薪開始：不必離職，也能先試出自己的下一步</p>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
              <p className="text-white/90">五個月有節奏：不是被啟發而已，是真的一步步做出來</p>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
              <p className="text-white/90">成果看得見：履歷、作品集、個人頁面，不再只是想過</p>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
              <p className="text-white/90">從台灣接到世界：線下小聚、遊牧旅程、國際生態系入口</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 items-center">
            <a
              href="https://www.accupass.com/organizer/detail/2509180637491342778166"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-teal font-semibold text-sm sm:text-base px-6 py-3 rounded-full hover:bg-[#c9a673] transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              查看免費講座場次
            </a>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 text-white/80 hover:text-brand-gold hover:border-brand-gold/50 font-medium text-sm sm:text-base px-5 py-2.5 rounded-full transition-colors duration-200"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              先看學院說明會回放
            </a>
            <p className="text-white/50 text-xs text-center">
              還不確定適不適合？先看免費講座或回放，再決定要不要加入。
            </p>
          </div>

          {/* 錨點文字 */}
          <div className="pt-4">
            <button
              onClick={() => {
                document.getElementById("learning-map")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="text-white/50 hover:text-white/80 text-sm transition-colors duration-200 flex items-center gap-1 mx-auto"
            >
              往下看 5 個月怎麼走
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
