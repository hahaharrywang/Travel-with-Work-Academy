"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { featuresData } from "@/data/features"

// Section 2.1: 學院三大特色
// Nomad Groups CIS Brand Colors Applied

interface KeyFeaturesSectionProps {
  onFeatureClick: (id: number) => void
}

// Feature icons as React components
const featureIcons = [
  // Dual Track
  <svg key="dual" className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 7l4-4m0 0l4 4m-4-4v18M16 17l4 4m0 0l-4-4m4 4H4"
    />
  </svg>,
  // Action Oriented
  <svg key="action" className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>,
  // Support Structure
  <svg key="support" className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>,
]

export function KeyFeaturesSection({ onFeatureClick }: KeyFeaturesSectionProps) {
  return (
    <section id="key-features" className="py-16 sm:py-24 bg-brand-offwhite">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-teal mb-4 text-balance">
            學院三大特色，讓行動成為習慣
          </h2>
          <p className="text-brand-text max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {'不只是學習新知'}
            <br />
            {'雙軌資源、行動任務節奏，和一套幫你持續走下去的支持結構。'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresData.map((feature, index) => (
            <div
              key={feature.id}
              onClick={() => onFeatureClick(feature.id)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* Header row: icon + title + 了解更多(mobile right) */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                  {featureIcons[index]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-brand-teal">{feature.title}</h3>
                </div>
                {/* Mobile only: 了解更多 in header */}
                <div className="flex md:hidden items-center gap-1 text-brand-gold font-medium text-sm flex-shrink-0">
                  了解更多
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              <div className="hidden md:block mb-4 rounded-xl overflow-hidden">
                <Image
                  src={feature.images[0].src || "/placeholder.svg"}
                  alt={feature.images[0].alt}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>

              <p className="text-brand-text text-sm leading-relaxed mb-4">{feature.shortDesc}</p>

              {/* Desktop only: 了解更多 at bottom */}
              <div className="hidden md:flex w-full mt-4 items-center justify-center gap-2 text-brand-gold font-medium text-sm">
                了解更多
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
