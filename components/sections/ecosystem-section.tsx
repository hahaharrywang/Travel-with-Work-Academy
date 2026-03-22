"use client"

import { useState } from "react"
import Image from "next/image"

interface EcosystemSectionProps {
  onOpenLightbox?: (images: { src: string; alt: string }[], index: number) => void
}

export function EcosystemSection({ onOpenLightbox }: EcosystemSectionProps) {
  const lifestylePhotos = [
    { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e9-81-8a-e7-89-a7-e5-b0-8f-e8-81-9a.jpg", alt: "遊牧小聚" },
    { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e8-b6-8a-e5-8d-97-e9-81-8a-e7-89-a7-e4-b9-8b-e6-97-85.jpg", alt: "越南遊牧之旅" },
    { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e5-90-8c-e5-ad-b8-e6-9c-83.png", alt: "同學會" },
    { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e4-ba-a4-e6-b5-81.png", alt: "交流活動" },
  ]

  const careerPhotos = [
    { src: "/images/e8-a1-8c-e5-8b-95-e5-b0-8e-e5-90-91-ef-bc-bfvibe-20coding-20-e5-b7-a5-e4-bd-9c-e5-9d-8a-20.png", alt: "Vibe Coding 工作坊" },
    { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e7-95-99-e8-a8-80.png", alt: "社群留言互動" },
    { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e4-bd-9c-e6-a5-ad-e4-ba-a4-e6-b5-81.png", alt: "作業交流" },
    { src: "/images/e7-a4-be-e7-be-a4-e6-94-af-e6-8c-81-ef-bc-bf-e9-a0-98-e8-8b-b1.png", alt: "LinkedIn 社群" },
  ]

  const handleOpenLightbox = (images: { src: string; alt: string }[], index: number) => {
    if (onOpenLightbox) {
      onOpenLightbox(images, index)
    }
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
            <span className="w-2 h-2 rounded-full bg-brand-teal"></span>
            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-teal mb-1">你踏入的，不只是這五個月的課程</h2>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-teal mb-3">而是一整個遊牧生態系的入口</h2>
          <p className="text-sm sm:text-base text-brand-text/70 mt-2 max-w-xl mx-auto">
            從線上到線下｜從台灣到國際｜從知識到行動
            <br className="hidden sm:block" />
            讓學習不只停在教室裡，而是延伸到更多真實的人、場域與機會。
          </p>
        </div>

        {/* Value proposition — three extension resources */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-center text-sm sm:text-base text-brand-gold font-semibold tracking-wide mb-6">三大延伸資源</p>
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-start gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-gold flex-shrink-0 mt-1.5"></span>
              <p className="text-base sm:text-lg text-brand-text leading-relaxed">
                <span className="font-bold text-brand-teal text-base sm:text-lg">國際鏈結</span>
                <span className="mx-2 text-brand-mist">|</span>
                接軌海外遊牧社群與活動資訊，持續看見國際趨勢、海外案例與遊牧者／領袖訪談。
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-gold flex-shrink-0 mt-1.5"></span>
              <p className="text-base sm:text-lg text-brand-text leading-relaxed">
                <span className="font-bold text-brand-teal text-base sm:text-lg">線下場域</span>
                <span className="mx-2 text-brand-mist">|</span>
                從定期小聚到遊牧啟發旅程，讓你有機會在真實場域裡認識同路人、潛在合作夥伴與更多生活方式的可能。
              </p>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-gold flex-shrink-0 mt-1.5"></span>
              <p className="text-base sm:text-lg text-brand-text leading-relaxed">
                <span className="font-bold text-brand-teal text-base sm:text-lg">工作坊</span>
                <span className="mx-2 text-brand-mist">|</span>
                除了正課之外，還能透過主題工作坊與實作型活動，把知識更快轉成行動與產出。
              </p>
            </div>
          </div>
        </div>

        {/* Two portals label */}
        <p className="text-center text-sm sm:text-base text-brand-text/80 font-semibold tracking-wide mb-6">兩個入口</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Lifestyle */}
          <div className="rounded-2xl border border-brand-mist bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Top Header Strip */}
            <a
              href="https://www.instagram.com/digitalnomadstaiwan/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-brand-teal px-4 py-3 sm:px-6 sm:py-4 hover:bg-[#1a5260] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white p-1.5 flex-shrink-0">
                  <Image
                    src="/images/design-mode/%E6%95%B8%E4%BD%8D%E9%81%8A%E7%89%A7%E5%8F%B0%E7%81%A3%20Logo%281%29%281%29%281%29%281%29.png"
                    alt="Taiwan Digital Nomad"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-base sm:text-lg leading-tight truncate">
                    {"Lifestyle 社群入口"}
                  </h3>
                  <span className="text-brand-gold text-xs sm:text-sm">@digitalnomadstaiwan</span>
                </div>
              </div>
            </a>

            {/* Main Image */}
            <div
              className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden cursor-pointer"
              onClick={() => handleOpenLightbox(lifestylePhotos, 0)}
            >
              <Image
                src={lifestylePhotos[0].src || "/placeholder.svg"}
                alt="數位遊牧 Lifestyle 社群"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-brand-teal text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                  />
                </svg>
                {lifestylePhotos.length} 張照片
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <p className="text-sm text-brand-text/80 mb-4 leading-relaxed">看見遊牧生活方式、每月聚會與啟發旅程</p>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-2">
                {lifestylePhotos.map((photo, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleOpenLightbox(lifestylePhotos, i)}
                  >
                    <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" loading="lazy" />
                    {i === 0 && <div className="absolute inset-0 ring-2 ring-brand-gold ring-inset rounded-lg" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Career Growth */}
          <div className="rounded-2xl border border-brand-mist bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Top Header Strip */}
            <a
              href="https://www.instagram.com/twnomadacademy/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-brand-teal px-4 py-3 sm:px-6 sm:py-4 hover:bg-[#1a5260] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white p-1.5 flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="遠距遊牧學院"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-base sm:text-lg leading-tight truncate">{"職涯成長入口"}</h3>
                  <span className="text-brand-gold text-xs sm:text-sm">@twnomadacademy</span>
                </div>
              </div>
            </a>

            {/* Main Image */}
            <div
              className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden cursor-pointer"
              onClick={() => handleOpenLightbox(careerPhotos, 0)}
            >
              <Image
                src={careerPhotos[0].src || "/placeholder.svg"}
                alt="數位遊牧線上職涯成長社群"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-brand-teal text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                  />
                </svg>
                {careerPhotos.length} 張照片
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <p className="text-sm text-brand-text/80 mb-4 leading-relaxed">追蹤講座、工作坊、訪談與更多職涯成長內容</p>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-2">
                {careerPhotos.map((photo, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleOpenLightbox(careerPhotos, i)}
                  >
                    <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" loading="lazy" />
                    {i === 0 && <div className="absolute inset-0 ring-2 ring-brand-gold ring-inset rounded-lg" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section bottom CTA */}
        <div className="mt-10 text-center border-t border-brand-mist/40 pt-8">
          <p className="text-brand-teal font-semibold text-base sm:text-lg mb-2">還不確定適不適合？</p>
          <p className="text-brand-text/70 text-sm mb-4">先看免費講座／回放，再決定要不要加入。</p>
          <a
            href="#pricing-section"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-teal/30 bg-brand-teal/5 text-brand-teal text-sm font-medium hover:bg-brand-teal/10 transition-colors"
          >
            查看免費講座資訊
          </a>
        </div>
      </div>
    </section>
  )
}
