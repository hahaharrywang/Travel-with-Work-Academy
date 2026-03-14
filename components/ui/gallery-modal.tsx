"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"

interface GalleryPhoto {
  src: string
  alt: string
}

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  photos: GalleryPhoto[]
  currentIndex: number
  onPrev: () => void
  onNext: () => void
}

export function GalleryModal({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onPrev,
  onNext,
}: GalleryModalProps) {
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen || photos.length === 0) return null

  const currentPhoto = photos[currentIndex]

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 z-10 text-xl font-bold"
          aria-label="關閉圖片瀏覽"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Previous button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-xl flex items-center justify-center text-gray-800 hover:text-brand-gold transition-all duration-200 z-10 group"
          aria-label="上一張圖片"
        >
          <svg
            className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-xl flex items-center justify-center text-gray-800 hover:text-brand-gold transition-all duration-200 z-10 group"
          aria-label="下一張圖片"
        >
          <svg
            className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative max-w-full max-h-full">
            <Image
              src={currentPhoto?.src || "/placeholder.svg"}
              alt={currentPhoto?.alt || ""}
              width={800}
              height={600}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent text-white p-6 rounded-b-lg">
              <p className="text-center text-sm sm:text-base font-medium leading-relaxed">
                {currentPhoto?.alt}
              </p>
            </div>
          </div>
        </div>

        {/* Counter */}
        {photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
            <span className="text-brand-gold">{currentIndex + 1}</span>
            <span className="mx-2 text-gray-300">/</span>
            <span>{photos.length}</span>
          </div>
        )}

        {/* Help text */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg text-xs opacity-70">
          使用 ← → 鍵或點擊按鈕切換圖片
        </div>
      </div>
    </div>
  )
}
