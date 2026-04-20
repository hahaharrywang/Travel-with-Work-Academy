"use client"

import AutoScroll from "embla-carousel-auto-scroll"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { featuredCases } from "@/data/student-cases"

export function TestimonialsStrip() {
  const scrollToFull = () => {
    document.getElementById("student-results")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="testimonials-strip"
      aria-label="學員成果速覽"
      className="bg-brand-offwhite py-12 sm:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with decorative line */}
        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
          <span className="h-px w-8 sm:w-12 bg-brand-gold/60" aria-hidden />
          <p className="text-xs sm:text-sm font-medium text-brand-teal tracking-wide">
            第一屆 <span className="font-bold">300+</span> 學員已在路上
          </p>
          <span className="h-px w-8 sm:w-12 bg-brand-gold/60" aria-hidden />
        </div>

        {/* Auto-scrolling carousel - slow drift; touch/hover pauses; drag to scrub */}
        <Carousel
          opts={{
            loop: true,
            dragFree: true,
            align: "start",
            containScroll: false,
          }}
          plugins={[
            AutoScroll({
              speed: 0.9,
              startDelay: 400,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              stopOnFocusIn: true,
            }),
          ]}
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {featuredCases.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-3 sm:pl-4 basis-[82%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="h-full bg-white rounded-2xl p-5 sm:p-6 border border-brand-mist flex flex-col select-none">
                  {/* Outcome tag */}
                  <span className="inline-flex items-center self-start gap-1.5 bg-brand-gold/15 text-brand-teal text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item.pill}
                  </span>

                  {/* Quote */}
                  <p className="text-sm sm:text-[15px] leading-relaxed text-brand-teal font-medium text-pretty mb-4 flex-1">
                    <span className="text-brand-gold text-lg leading-none mr-0.5" aria-hidden>
                      &ldquo;
                    </span>
                    {item.quote}
                    <span className="text-brand-gold text-lg leading-none ml-0.5" aria-hidden>
                      &rdquo;
                    </span>
                  </p>

                  {/* Identity */}
                  <p className="text-xs text-brand-text/70 pt-3 border-t border-brand-mist line-clamp-2">
                    {item.identity}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* CTA button */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <button
            type="button"
            onClick={scrollToFull}
            className="inline-flex items-center gap-2 border border-brand-teal/40 text-brand-teal font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-colors duration-200"
          >
            下方看完整學員案例故事
            <span aria-hidden>{'↓'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
