"use client"

import { useState, Suspense } from "react"
import Image from "next/image"
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react"
import { featuresData } from "@/data/features"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"

// Section 2.1: 學院三大特色
// Nomad Groups CIS Brand Colors Applied - Self-contained component with modals

export function KeyFeaturesSection() {
  const [openDialog, setOpenDialog] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string }[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const toggleFeatureDialog = (id: number) => {
    setOpenDialog(openDialog === id ? null : id)
  }

  const openLightbox = (images: { src: string; alt: string }[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }
  return (
    <>
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
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              onClick={() => toggleFeatureDialog(feature.id)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* Header row: icon + title + 了解更多(mobile right) */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                  {feature.icon}
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

      {/* MODAL FOR FEATURES */}
      <Suspense fallback={<div>Loading...</div>}>
        {featuresData.map((feature) => (
          <Dialog
            key={feature.id}
            open={openDialog === feature.id}
            onOpenChange={(open) => !open && setOpenDialog(null)}
          >
            <DialogPortal>
              <DialogOverlay />
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-brand-offwhite p-0" showCloseButton={true}>
                <div className="max-h-[90vh] overflow-y-auto px-6 pt-6 pb-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-brand-teal flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                        {feature.icon}
                      </div>
                      {feature.title}
                    </DialogTitle>
                    <DialogDescription className="text-brand-text text-base leading-relaxed pt-4">
                      <div className="space-y-4">
                        {feature.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-brand-gold mt-1">–</span>
                            <span dangerouslySetInnerHTML={{ __html: detail }} />
                          </div>
                        ))}
                      </div>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-6">
                    <div className="space-y-4">
                      {feature.images.map((image, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => openLightbox(feature.images, idx)}
                        >
                          <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                          {image.label && (
                            <span className="pointer-events-none absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full bg-brand-teal text-white text-xs sm:text-sm font-semibold shadow-md">
                              {image.label}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        ))}

        {lightboxOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-[101] text-white hover:text-brand-gold transition-colors p-2"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1))
              }}
              className="absolute left-4 z-[101] text-white hover:text-brand-gold transition-colors p-2 bg-black/50 rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImages[lightboxIndex]?.src || "/placeholder.svg"}
                alt={lightboxImages[lightboxIndex]?.alt || ""}
                width={1920}
                height={1080}
                className="object-contain max-w-full max-h-full"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0))
              }}
              className="absolute right-4 z-[101] text-white hover:text-brand-gold transition-colors p-2 bg-black/50 rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[101] text-white text-sm bg-black/50 px-4 py-2 rounded-full">
              {lightboxIndex + 1} / {lightboxImages.length}
            </div>
          </div>
        )}
      </Suspense>
    </>
  )
}
