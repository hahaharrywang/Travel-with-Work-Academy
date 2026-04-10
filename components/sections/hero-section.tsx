"use client"

import Image from "next/image"
import { Layers, FileCheck, Globe } from "lucide-react"

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
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight lg:leading-[1.2] tracking-wide">
              今年五月，
              <br />
              一起把「也許有一天」
              <br />
              變成「<span className="text-brand-gold">我也正在路上</span>」
            </h1>

            <p className="text-sm sm:text-base text-brand-gold font-medium tracking-wide leading-relaxed">
              {'用 5 個月有節奏的行動系統，讓你不停薪、不斷收入踏出遠距職涯的下一步。'}
            </p>

            {/* 適合誰 */}
            <p className="text-white/70 text-sm leading-relaxed">
              適合正在考慮遠端工作、想接案但不知從何開始、或已經在職但想為自己多創造一條路的人。
            </p>

            {/* 膠囊標籤 */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm border border-white/20">
                遠端上班 × 自由接案
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm border border-white/20">
                不停薪開始
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm border border-white/20">
                5 個月有節奏
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm border border-white/20">
                可展示成果
              </span>
            </div>

            {/* 3 個精簡賣點 */}
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Layers className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                <p className="text-white/90 text-sm">遠端上班 × 接案雙軌並行，可雙修、也可單線</p>
              </div>
              <div className="flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                <p className="text-white/90 text-sm">履歷、作品集、個人頁面，不再只是想過，可展示</p>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                <p className="text-white/90 text-sm">整合線下小聚、國內外遊牧之旅、國際生態系入口</p>
              </div>
            </div>

            {/* CTA Buttons - side by side */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#learning-map"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("learning-map")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-teal font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#c9a673] transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                查看課程介紹
              </a>
              <a
                href="#free-lecture-section"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("free-lecture-section")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="inline-flex items-center gap-2 border border-white/30 text-white/80 hover:text-brand-gold hover:border-brand-gold/50 font-medium text-sm px-5 py-2.5 rounded-full transition-colors duration-200"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                報名線上講座
              </a>
            </div>

            {/* Micro Proof */}
            <p className="text-white/60 text-sm">
              至今已累積 <span className="text-white font-medium">300+</span> 學員、<span className="text-white font-medium">1,800+</span> 線下社群參與人次
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
            {'用 5 個月有節奏的行動系統，'}
            <br />
            {'讓你不停薪、不斷收入踏出遠距職涯的下一步。'}
          </p>

          {/* 適合誰 */}
          <p className="text-white/70 text-sm leading-relaxed">
            適合正在考慮遠端工作、想接案但不知從何開始、或已經在職但想為自己多創造一條路的人。
          </p>

          {/* 膠囊標籤 */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm border border-white/20">
              遠端上班 × 自由接案
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm border border-white/20">
              不停薪開始
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm border border-white/20">
              5 個月有節奏
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm border border-white/20">
              可展示成果
            </span>
          </div>

          {/* 3 個精簡賣點 */}
          <div className="space-y-2 text-left max-w-sm mx-auto">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
              <p className="text-white/90 text-sm">遠端上班 × 接案雙軌並行，可雙修、也可單線</p>
            </div>
            <div className="flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
              <p className="text-white/90 text-sm">履歷、作品集、個人頁面，不再只是想過，可展示</p>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
              <p className="text-white/90 text-sm">整合線下小聚、國內外遊牧之旅、國際生態系入口</p>
            </div>
          </div>

          {/* CTA Buttons - 水平並排 */}
          <div className="flex flex-row flex-wrap justify-center gap-3 items-center">
            <a
              href="#learning-map"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("learning-map")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-teal font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#c9a673] transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              查看課程介紹
            </a>
            <a
              href="#free-lecture-section"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("free-lecture-section")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="inline-flex items-center gap-2 border border-white/30 text-white/80 hover:text-brand-gold hover:border-brand-gold/50 font-medium text-sm px-4 py-2.5 rounded-full transition-colors duration-200"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              報名線上講座
            </a>
          </div>

          {/* Micro Proof */}
          <p className="text-white/60 text-sm text-center">
            至今已累積 <span className="text-white font-medium">300+</span> 學員、<span className="text-white font-medium">1,800+</span> 線下社群參與人次
          </p>

          {/* 引導文案 */}
          <div className="pt-4 space-y-3 text-center">
            <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto">
              AI時代下已經不缺資訊，你需要的是一個驗證過的決策指引＆環境，在未來五個月裡，有人陪你一起試、一起走、一起調整方向。
            </p>
            <button
              onClick={() => {
                document.getElementById("pain-points")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="text-brand-gold hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 mx-auto font-medium"
            >
              了解為什麼學院可以幫你
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
