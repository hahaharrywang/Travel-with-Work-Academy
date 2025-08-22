"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const CHECKOUT_URL = "https://travelworkacademy.myteachify.com/checkout?planId=83790f8d-386a-4855-b6be-9f9a9391562b"

export default function HomePage() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const stagePhotos = [
    [
      { src: "/online-learning-digital-skills.png", alt: "Online Learning Workshop" },
      { src: "/remote-work-home-office.png", alt: "Remote Work Environment Setup" },
      { src: "/digital-skills-training.png", alt: "Digital Skills Training Course" },
    ],
    [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2_2.jpg-sr1t7443ADzaGZCXce0k5aYt0RkoWp.jpeg",
        alt: "Digital Nomad Community Meetup",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2_3.jpg-0IyLFbeEHPFpShsNWLO9p3lk3vexg3.jpeg",
        alt: "Nomad Exchange Activity",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-1.jpg-i3ZYgL0BpiloCRvCQfM0HfPBqiTHsw.jpeg",
        alt: "Vietnam Da Nang Holi Festival Cultural Nomad Experience",
      },
    ],
    [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3_2.JPG-r7oPD2d4pX1zD3ySgEkOVMkmDZPHtI.jpeg",
        alt: "Vietnam Digital Nomad Carnival International Social Evening",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3_3.jpg-c8IsRAZMFubgTaABaR3LLfVRaaB5sY.jpeg",
        alt: "Vietnam Hoi An Beach, Meditation and Mind-Body Balance",
      },
      {
        src: "/online-workshop-session.png",
        alt: "Online Workshop",
      },
    ],
    [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_2-CyyyNGc5AMNLnbmY31T06rUaCfIBo8.png",
        alt: "Online Community Meeting",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4_3.jpg-n3tBn5cIN2JSRt3YGmq6mWLHRywN9f.jpeg",
        alt: "Digital Nomad Knowledge Sharing Presentation",
      },
      { src: "/digital-nomad-presentation.png", alt: "Successful Digital Nomad Presentation" },
    ],
    [
      { src: "/mentorship-success.png", alt: "Mentorship Success Story" },
      { src: "/community-leadership.png", alt: "Community Leadership" },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2_1.jpg-M9xnN0cObzxZFIjRmdkIGVNYU5AGoL.jpeg",
        alt: "Digital Nomad Community Meetup",
      },
    ],
  ]

  const openGallery = (stageIndex: number, photoIndex = 0) => {
    setCurrentStage(stageIndex)
    setCurrentPhotoIndex(photoIndex)
    setIsGalleryOpen(true)
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === stagePhotos[currentStage].length - 1 ? 0 : prev + 1))
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? stagePhotos[currentStage].length - 1 : prev - 1))
  }

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set target date to August 15, 2025 (Super Early Bird price ends)
    const targetDate = new Date("2025-08-15T23:59:59").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const instructors = [
    {
      name: "Tool King A-Zhang",
      title: "Founder of 'A-Zhang Nomad' Newsletter, Digital Nomad Coaching Program Founder, IP Business Owner",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%B7%A5%E5%85%B7%E7%8E%8B%E5%95%8A%E7%92%8B-LVeQPDeN0gNF0tBbw1KTugUs5Agdql.png",
      link: "https://www.johntool.com",
    },
    {
      name: "Three Minutes",
      title:
        "100K followers across IG+FB+Threads, Knowledge-based IP Business Owner, reveals how to amplify personal value through social influence",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E4%B8%89%E5%88%86%E9%90%98.jpg-uRO2bzeSUZ5RWwa1iYEvEPfNB9Mcjl.jpeg",
      link: "https://www.instagram.com/only3minute/",
    },
    {
      name: "Tuna",
      title:
        "Founder of Fresh Time Books, Renowned Knowledge Monetization Consultant, Knowledge Product MVP Mindset: Minimum Viable Product Testing",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%AE%AB%E9%AD%9A.jpg-VDNe0wRiY8em6DXNMgYTf5f3C7grun.jpeg",
      link: "https://www.instagram.com/newsvegtw/",
    },
    {
      name: "Soda Blue",
      title:
        "Founded a one-person company, IG followers nearly 10K, newsletter subscribers 2500+, five years of real experience taking you from zero to high-value freelancing",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%A5%BF%E6%89%93%E8%97%8D.jpg-WIgmlh9hxrDGJzHm4CRJsKCNsyldoX.jpeg",
      link: "https://siddharam.com",
    },
    {
      name: "Lin Shang-Zhe",
      title:
        "Non-IT background AI productivity tool educator, has helped 4200+ students from Taiwan, Japan and Hong Kong",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%9E%97%E4%B8%8A%E5%93%B2.jpg-VGF6swQbojP8d5BYEM8eHth9nQhWn6.jpeg",
      link: "https://www.instagram.com/p/DBlvouhSj5X/",
    },
    {
      name: "Xu Quan",
      title:
        "Former TikTok subsidiary GM, Former Alibaba subsidiary VP, XChange Founder, retired at 33 and living in Bali.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%A8%B1%E8%A9%AE.jpg-itDEjBXa0hB8ICG282sBZU9QpyFY6P.jpeg",
      link: "https://www.facebook.com/SnT.life",
    },
    {
      name: "Shelley",
      title: "ADPList 2025 Top 50 Global Mentor, LinkedIn Personal Branding, opportunities come knocking",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shelly.jpg-PyXkAhj2OxAkXAl9Sb17kH47TZpuFY.jpeg",
      link: "https://www.linkedin.com/in/yuhsuan-tien",
    },
    {
      name: "Moja",
      title:
        "UK Career Coach, 'Women's Academy' 'Networking Power' Instructor, breaking through international remote career ceiling",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%AE%80%E8%80%85%E5%A4%AA%E5%A4%AA.jpg-S6PC1XhLu0mpPoDfHEZowxDfv77RmP.jpeg",
      link: "https://www.facebook.com/duzhetaitai",
    },
    {
      name: "Emilia",
      title:
        "Senior International Headhunter, headhunter reveals salary negotiation tips and career advancement strategies",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Emilia.jpg-FpV0n9aFLdhY5GYrItCdLACYQsR1zU.jpeg",
      link: "https://www.linkedin.com/in/emchh/",
    },
    {
      name: "Joyce Weng",
      title:
        "Former journalist who broke traditional boundaries, successfully transitioned to full remote work overseas, she will analyze how to plan travel finances and budget wisely!",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joyce.jpg-kKQwCgv6ckQRZXeM1TkEavpB1UxKSt.jpeg",
      link: "https://www.facebook.com/storiesinmyworld",
    },
    {
      name: "Lin Jia Zoe",
      title:
        "90K followers social media creator, specializes in building social media and IG traffic, helps you create potential short videos and posts!",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%AF%8F%E6%97%A5E%E9%8C%A0.jpg-uUoyWQD7LwmMBYTszPZiaMDwYYf7Cj.jpeg",
      link: "https://www.daydayding.com",
    },
    {
      name: "Angela Feng",
      title:
        "Ness Wellness Co-founder, Venture Investment Manager, sustainable mind-body-spirit balance for remote living",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Angela.jpg-AQCGKocPMUR7UrNaGtZQ1YUjKcSM2t.jpeg",
      link: "https://www.nesswellness.com/",
    },
  ]

  const pricingTiers = [
    { stage: "🔥 Super Early Bird", deadline: "8/15", price: "$149", discount: "62.7% OFF", savings: "Save $251" },
    { stage: "Early Bird Wave 1", deadline: "8/29", price: "$179", discount: "55.2% OFF", savings: "Save $221" },
    { stage: "Early Bird Wave 2", deadline: "9/5", price: "$209", discount: "47.7% OFF", savings: "Save $191" },
    { stage: "Early Bird Wave 3", deadline: "9/12", price: "$249", discount: "37.7% OFF", savings: "Save $151" },
    { stage: "Pre-order Price", deadline: "9/26", price: "$349", discount: "12.7% OFF", savings: "Save $51" },
    { stage: "Regular Price", deadline: "From 10/1", price: "$400", discount: "--", savings: "--" },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.png"
            alt="Remote work scene"
            fill
            className="object-cover opacity-20"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1200%20X%20630_%E5%8E%BB%E8%83%8C-Kdt9BA7d8dcS493DQ68ttHn9t2JUBl.png"
              alt="Remote Nomad Academy Travel With Work Academy"
              width={400}
              height={120}
              className="mx-auto"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            Escape the 9-to-5
            <br />
            <span className="text-[#FF6B35]">Unlock Your Global Remote Freedom!</span>
          </h1>

          {/* Subtitle */}
          <div className="mb-8">
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Taiwan's First Systematic 'Remote Nomad Academy'
              <br className="sm:hidden" /> Helping You Travel While Achieving Life Value
            </p>
          </div>

          {/* Core Promise */}
          {/* Mobile Version */}
          <div className="block sm:hidden bg-black/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-200">
            <p className="text-lg text-gray-800 font-medium leading-relaxed">
              10 Months of Learning and Growth
              <br />
              Gain foundational skills for side business and remote career
              <br />
              More than just learning methods
              <br />
              We take action together and grow together
            </p>
          </div>

          {/* Desktop Version */}
          <div className="hidden sm:block bg-black/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-8 border border-gray-200">
            <p className="text-lg sm:text-xl text-gray-800 font-medium leading-relaxed">
              10 Months of Learning and Growth, Gain foundational skills for side business and remote career
              <br />
              More than just learning methods, We take action together and grow together
            </p>
          </div>

          {/* CTA Button */}
          <div className="space-y-4 relative z-30">
            <Button
              asChild
              size="lg"
              className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white font-semibold px-8 py-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative z-30"
            >
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                Start Your Freedom Journey
                <br />
                Early Bird Special - Enroll Now
              </a>
            </Button>
            <p className="text-sm text-gray-500"> </p>
          </div>
        </div>
      </section>

      {/* Course Super Highlights Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
              <span className="text-black">Course Super Highlights</span>
            </h2>
            <div className="w-24 h-1 bg-[#FF6B35] mx-auto rounded-full"></div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Highlight 1 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">Side Business + Remote Work</h3>
                <h4 className="text-lg font-semibold text-[#FF6B35] mb-2">Dual Track, Multiple Possibilities</h4>
                <p className="text-gray-600 leading-relaxed">
                  No need to quit your job. Master high-paying remote work skills while launching multiple side income
                  streams, advancing your career and finances!
                </p>
              </CardContent>
            </Card>

            {/* Highlight 2 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">Action-Oriented Design</h3>
                <h4 className="text-lg font-semibold text-[#FF6B35] mb-2">Practice First, Visible Results</h4>
                <p className="text-gray-600 leading-relaxed">
                  Exclusive 'Action-Oriented Learning Path' with post-class assignments, exclusive resource packs, and
                  final practical presentations to ensure you apply what you learn!
                </p>
              </CardContent>
            </Card>

            {/* Highlight 3 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20a3 3 0 01-3-3v-2a3 3 0 013-3m3-3a3 3 0 110-6 3 3 0 010 6m0 3a3 3 0 017.111 1.542M10 9a3 3 0 110-6 3 3 0 010 6zm7.111 1.542c.422.621.78 1.293 1.067 2M18 9v3m0 0v3m-3 0" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-black mb-4">Community Support</h3>
                <h4 className="text-lg font-semibold text-[#FF6B35] mb-2">Top Community, Accelerated Growth</h4>
                <p className="text-gray-600 leading-relaxed">
                  Join Taiwan's largest digital nomad community, travel with global elites, co-create projects, spark
                  creativity - your growth journey is no longer lonely!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ecosystem Integration & Partnership Section */}
          <section className="py-12 sm:py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Nomad Resource Ecosystem</h2>
                <h3 className="text-xl sm:text-2xl text-black mb-4">
                  Online Education | Offline Community | International Connections
                </h3>
              </div>

              <div className="p-4 sm:p-6">
                {/* Partners Grid */}
                <div className="grid grid-cols-3 gap-2 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-12 mb-8">
                  {/* Partner 1 - Taiwan Digital Nomad */}
                  <div className="text-center">
                    <a
                      href="https://www.instagram.com/digitalnomadstaiwan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:scale-105 transition-transform duration-200"
                    >
                      <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-lg p-2 sm:p-4">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%95%B8%E4%BD%8D%E9%81%8A%E7%89%A7%E5%8F%B0%E7%81%A3%20Logo-CktjpYvle8tI4IOT03r29miCGKO58R.png"
                          alt="Taiwan Digital Nomad"
                          width={96}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </a>
                    <p className="text-[#FF6B35] font-semibold text-xs sm:text-sm">
                      #Taiwan's Largest Digital Nomad Community
                    </p>
                  </div>

                  <div className="hidden lg:block text-[#FF6B35] text-9xl flex items-center justify-center h-32 -mt-12">
                    ×
                  </div>

                  {/* Partner 2 - t campus */}
                  <div className="text-center">
                    <a
                      href="https://www.instagram.com/elsacampus/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:scale-105 transition-transform duration-200"
                    >
                      <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-lg p-2 sm:p-4">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%88%90%E9%95%B7%E7%87%9FLogo.jpg-zuFCrnsLrBmoAlID64foDSlt4TNwYe.jpeg"
                          alt="Growth Camp"
                          width={96}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </a>
                    <p className="text-[#FF6B35] font-semibold text-xs sm:text-sm">
                      #Years of Academy Creation Experience
                    </p>
                  </div>

                  <div className="hidden lg:block text-[#FF6B35] text-9xl flex items-center justify-center h-32 -mt-12">
                    ×
                  </div>

                  {/* Partner 3 - Fresh Time Books */}
                  <div className="text-center">
                    <a
                      href="https://newsveg.tw/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:scale-105 transition-transform duration-200"
                    >
                      <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-2xl flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-lg p-2 sm:p-4">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%94%9F%E9%AE%AE%E6%99%82%E6%9B%B8%20Logo-tmulzAwGVPgRWnQAeoA9Jjr2CySR0G.png"
                          alt="Fresh Time Books NEWSVEG"
                          width={96}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </a>
                    <p className="text-[#FF6B35] font-semibold text-xs sm:text-sm">#Knowledge Extraction Experts</p>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-black">
                    Strong Partnership, Comprehensive Resource Integration
                  </h3>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-16 sm:py-6 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">Featured Instructor Lineup</h2>
            <p className="text-xl text-gray-600 mb-6">October - December / Weekly Wednesday Evening Live Courses</p>
            <div className="w-24 h-1 bg-[#FF6B35] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {instructors.map((instructor, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-4">
                  <a
                    href={instructor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <Image
                      src={instructor.image || "/placeholder.svg"}
                      alt={instructor.name}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-black mb-2">{instructor.name}</h3>
                <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed mb-1">{instructor.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Nomad Experts Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
              <span className="text-black">International Nomad Leaders Trend Sharing</span>
            </h2>
            <div className="w-24 h-1 bg-[#FF6B35] mx-auto rounded-full"></div>
          </div>

          {/* International Experts */}
          <div className="space-y-8">
            {/* Expert 1 - Osera Ryo */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg relative">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ryo-bFyW4xHw7vYoeiko6q1imn47K4niyb.png"
                        alt="Osera Ryo"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                      {/* Japan Flag */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-4 bg-white rounded-sm flex items-center justify-center border">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-black mb-2">
                        Colive Fukuoka Co-founder, Japan Digital Nomad Association Executive Director
                      </h3>
                      <p className="text-[#FF6B35] font-semibold text-lg">Osera Ryo</p>
                    </div>
                    <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                      <p>
                        Graduate of University of Tsukuba, former employee of Dentsu Japan, served as urban planning
                        consultant for Tsukuba City, appointed by the Japanese Prime Minister as community marketing
                        director. Co-founded travel subscription service HafH in 2019, promoting long-term travel and
                        remote living in Japan, serving as advisor to Japan Workcation Association since 2020.
                      </p>
                      <p>
                        Founded Japan's first nomad-focused marketing company yugyo inc. in 2022, and became Associate
                        Professor at Kanazawa University Tourism Frontier Research Institute in 2023. Long committed to
                        promoting nomad exchange and innovative projects between Japan and internationally.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Expert 2 - Johannes Voelkner */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg relative">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joheness-Mh5hKrdSQ1eDHmVyf6cAHpZIJJ8nDP.png"
                        alt="Johannes Voelkner"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                      {/* German Flag */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-4 bg-black rounded-sm flex">
                        <div className="w-2 bg-black"></div>
                        <div className="w-2 bg-red-600"></div>
                        <div className="w-2 bg-yellow-400"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-black mb-2">
                        Nomad Cruise Founder | Global Digital Nomad Offline Community Pioneer
                      </h3>
                      <p className="text-[#FF6B35] font-semibold text-lg">Johannes Völkner</p>
                    </div>
                    <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                      <p>
                        From Germany, started digital nomad life in 2010 and founded Global Digital Nomad Network, one
                        of the world's largest nomad communities.
                      </p>
                      <p>
                        Founded Nomad Cruise in 2015, combining cruise travel with remote work community. Has organized
                        over ten international voyages, attracting over 2,500 participants from more than 70 countries.
                      </p>
                      <p>
                        During the pandemic, transformed to launch Nomad Base, continuing to build global offline meetup
                        and hub networks. With the philosophy of "community before product," designed classic events
                        like FuckUp Nights, inspiring global nomad exchange and growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Expert 3 - Harry Wang */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg relative">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Harry%20DigitalNomadsTaiwan-vPP7yxJAQWVuhzufbeHLJBvmbDzDqF.png"
                        alt="Harry Wang"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                      {/* Taiwan Flag */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                        <div className="w-3 h-2 bg-red-600 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-black mb-2">DigitalNomadsTaiwan Founder</h3>
                      <p className="text-[#FF6B35] font-semibold text-lg">Harry Wang</p>
                    </div>
                    <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                      <p>
                        Graduated from Ritsumeikan Asia Pacific University International Business in 2021. Previously
                        worked in AI skincare startup operations, international remote HR company business development,
                        and Taiwan-Vietnam cross-border project PM, rapidly iterating experience through remote work
                        early in career.
                      </p>
                      <p>
                        Founded DigitalNomadsTaiwan in 2024, organizing over 50 digital nomad themed events with over
                        1,200 offline participants from over 70 nationalities, nearly half from word-of-mouth referrals.
                      </p>
                      <p>
                        As the initiator of Taiwan's nomad movement, invited as speaker at international forums
                        including Japan Colive Fukuoka, Japan Okinawa Kozarocks, Asian Nomad Alliance Summit, Vietnam
                        Nomad Fest, sharing Taiwan nomad community development and international exchange experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8A65] rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Follow International Leaders' Footsteps, Start Your Nomad Journey
            </h3>
            <p className="text-white/90 text-lg mb-6 leading-relaxed">
              Learn from top nomad leaders' practical experience, master global trends and opportunities
            </p>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#FF6B35] font-bold text-lg rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Join Now, Walk with Leaders
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points Section - moved from later in the page */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Do These Voices Also Echo in Your Heart?
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          {/* Pain Points Grid with Dialogue Bubbles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {[
              {
                /* Translated pain points to English */
                question: "🌍 Yearning for international remote work, but don't know where to start?",
                description:
                  "Every day staring at the office ceiling, wondering how big the world is. Excited about digital nomad life, but worried if you're suitable. Actually, this is a learnable skill.",
              },
              {
                question: "✈️ Want to travel while working, achieving your ideal lifestyle?",
                description:
                  "Who says work and life are mutually exclusive? Appearing on Bangkok streets after Thursday work to unwind is an achievable lifestyle. True work-life balance isn't just a slogan, it needs time and accumulation to become your reality.",
              },
              {
                question: "💰 Hope to create multiple income streams, but lack direction?",
                description:
                  "Savings numbers stagnant, but dream list keeps growing. You need more than just side hustles, but sustainable remote income portfolios.",
              },
              {
                question: "📚 Information overload, feeling more confused?",
                description:
                  "Googled for several nights with notes overflowing, but still don't know how to take the first step. You don't lack information, you lack systematic practical guides and frontline trends.",
              },
              {
                question: "🚀 Ready to change, just need that final push?",
                description:
                  "Seen countless success stories, understand all the theories, but action remains zero. You don't need more information, but clear paths and courage to take the first step with comrades.",
              },
            ].map((painPoint, index) => (
              <div key={index} className="relative">
                {/* Dialogue Bubble */}
                <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-lg border border-border relative">
                  {/* Speech Bubble Tail */}
                  <div className="absolute -bottom-3 left-8 w-6 h-6 bg-card border-r border-b border-border transform rotate-45"></div>

                  {/* Question */}
                  <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-4 leading-tight">
                    {painPoint.question}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">{painPoint.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Encouraging Message */}
          <div className="text-center bg-card rounded-2xl p-8 sm:p-12 shadow-lg border border-border">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-6">We understand.</h3>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 leading-relaxed">
                Because we've also wandered at the same crossroads.
              </p>
              {/* Mobile version */}
              <p className="block sm:hidden text-xl font-bold text-accent">
                Now we believe
                <br />
                Freedom deserves more choices
              </p>

              {/* Desktop version */}
              <p className="hidden sm:block text-2xl font-bold text-accent">
                Now we believe, freedom deserves more choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Five-Stage Learning Map */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">Five-Stage Learning Map</h2>
            <div className="w-24 h-1 bg-[#FF6B35] mx-auto rounded-full"></div>
          </div>

          {/* Learning Path Timeline */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Stage 1 */}
            <div className="relative">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-white p-6 sm:p-8 border-l-4 border-[#FF6B35]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold">
                          1
                        </div>
                        <h3 className="text-xl font-bold text-black">Stage One</h3>
                      </div>
                      <p className="text-[#FF6B35] font-semibold">Oct-Dec Online Skills Learning</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {stagePhotos[0].map((photo, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={photo.src || "/placeholder.svg"}
                            alt={photo.alt}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openGallery(0, index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-black mb-2">October - Launch Month</h4>
                      <p className="text-sm text-gray-600 mb-2">"Build Foundation, See Possibilities"</p>
                      <p className="text-sm text-gray-600">Start personal branding and side business from zero</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-black mb-2">November - Enhancement Month</h4>
                      <p className="text-sm text-gray-600 mb-2">"Professionalization and Internationalization"</p>
                      <p className="text-sm text-gray-600">
                        Enhance workplace competitiveness, open international remote and high-salary opportunities
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-black mb-2">December - Balance Month</h4>
                      <p className="text-sm text-gray-600 mb-2">"Awareness and Systematic Planning"</p>
                      <p className="text-sm text-gray-600">
                        Integrate learning, strengthen extra-professional knowledge and life planning
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stage 2 */}
            <div className="relative">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-white p-6 sm:p-8 border-l-4 border-[#FF6B35]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold">
                          2
                        </div>
                        <h3 className="text-xl font-bold text-black">Stage Two</h3>
                      </div>
                      <p className="text-[#FF6B35] font-semibold">Nomad Community Exchange, Inspiration, Co-creation</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {stagePhotos[1].map((photo, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={photo.src || "/placeholder.svg"}
                            alt={photo.alt}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openGallery(1, index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      Participate in monthly digital nomad community activities, exchange experiences with world nomads
                      or peers from different backgrounds and professions, get latest growth information, join
                      co-creation projects, accumulate experience and networks, practice free working life and remote
                      living dreams together
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stage 3 */}
            <div className="relative">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-white p-6 sm:p-8 border-l-4 border-[#FF6B35]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold">
                          3
                        </div>
                        <h3 className="text-xl font-bold text-black">Stage Three</h3>
                      </div>
                      <p className="text-[#FF6B35] font-semibold">2026 Jan-July Nomad Offline Inspiration Journey</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {stagePhotos[2].map((photo, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={photo.src || "/placeholder.svg"}
                            alt={photo.alt}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openGallery(2, index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      Digital nomad instructors lead trips to Chiang Mai, Bali, Fukuoka, Hengchun and other places.
                      While working nomadically, exchange, learn, exercise, socialize, actually experience the standard
                      life of digital nomad workers, and discover your heart's direction from it, finding motivation to
                      accelerate your dreams.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stage 4 */}
            <div className="relative">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-white p-6 sm:p-8 border-l-4 border-[#FF6B35]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold">
                          4
                        </div>
                        <h3 className="text-xl font-bold text-black">Stage Four</h3>
                      </div>
                      <p className="text-[#FF6B35] font-semibold">2026 Jan-July Review & Sprint Workshop</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {stagePhotos[3].map((photo, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={photo.src || "/placeholder.svg"}
                            alt={photo.alt}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openGallery(3, index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      Online workshops, improving yourself with peers, reviewing, continuous learning.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stage 5 */}
            <div className="relative">
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-white p-6 sm:p-8 border-l-4 border-[#FF6B35]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#1f2937] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-.181h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold">
                          5
                        </div>
                        <h3 className="text-xl font-bold text-black">Stage Five</h3>
                      </div>
                      <p className="text-[#FF6B35] font-semibold">Become a Nomad Star in the Community</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {stagePhotos[4].map((photo, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={photo.src || "/placeholder.svg"}
                            alt={photo.alt}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => openGallery(4, index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      Digital nomads' success often comes from "execution power". We provide reward mechanisms,
                      encouraging everyone to practice while learning
                      <br className="sm:hidden" />. Outstanding students will have opportunities to receive: future
                      course discounts, teaching assistant qualifications, nomad journey invitation spots, and
                      opportunities to share the stage with mentors.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-gray-300"
            >
              ✕
            </button>

            {/* Main Image */}
            <div className="relative">
              <img
                src={stagePhotos[currentStage][currentPhotoIndex].src || "/placeholder.svg"}
                alt={stagePhotos[currentStage][currentPhotoIndex].alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />

              {/* Navigation Buttons */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
              >
                ←
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
              >
                →
              </button>
            </div>

            {/* Photo Counter */}
            <div className="text-center text-white mt-4">
              <p className="text-lg font-semibold">第{currentStage + 1}階段</p>
              <p className="text-sm">
                {currentPhotoIndex + 1} / {stagePhotos[currentStage].length}
              </p>
              <p className="text-sm mt-2">{stagePhotos[currentStage][currentPhotoIndex].alt}</p>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-2 mt-4">
              {stagePhotos[currentStage].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-3 h-3 rounded-full ${index === currentPhotoIndex ? "bg-[#FF6B35]" : "bg-gray-400"}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Course Content & Pricing Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
              Complete Course Curriculum Content
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Help you escape the 9-to-5, location restrictions
              <br className="sm:hidden" />, let work take you to every corner of the world you want to visit!
            </p>
          </div>

          {/* Course Highlights */}
          <div className="mb-16">
            <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 border border-gray-200">
              <div className="text-center mb-8">
                <div className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg font-bold">
                  First Cohort Exclusive Content Package
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-black mb-2">12-Week Online Sprint Bootcamp</div>
                  <div className="text-xs text-gray-600">
                    12 instructors' weekly Wednesday evening live courses + Q&A, lifetime course replay access: Share
                    the most authentic remote work and side business experience, help you avoid detours. With post-class
                    assignments to improve execution.
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-black mb-2">Learning Resource Integration</div>
                  <div className="text-xs text-gray-600">
                    Exclusive toolkit for doubled efficiency: Exclusive 'Side Business Startup Pack', 'Career
                    Advancement Pack', 'System Balance Pack', helping you learn efficiently and get started quickly
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-black mb-2">Nomad Rising Stars Podcast</div>
                  <div className="text-xs text-gray-600">
                    Exclusive firsthand accounts, sustainable business paths for interests and passion careers
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-black mb-2">Boundary Breakers E-Newsletter 3 Issues</div>
                  <div className="text-xs text-gray-600">
                    Detailed interview content, get to know each month's instructors & guests' action visions and
                    stories
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-black mb-2">Course Period Skool Online Community Forum</div>
                  <div className="text-xs text-gray-600">
                    Message board experience sharing, monthly sharing meetups, final Demo Day
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                  <div className="text-xl font-bold text-black mb-2">LinkedIn Alumni Network</div>
                  <div className="text-xs text-gray-600">
                    Join groups to build long-term connections, business collaboration and career opportunity sharing
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-xl p-6 text-center text-white shadow-lg">
                <div className="text-lg font-bold mb-2">🏆 Exclusive Rewards for Outstanding Students</div>
                <div className="text-sm">
                  Students with outstanding growth performance during the course will have opportunities to receive{" "}
                  <span className="font-semibold">partial or full tuition refund</span>, and{" "}
                  <span className="font-semibold">2026 nomad inspiration journey invitation spots</span>!
                </div>
              </div>
            </div>
          </div>

          {/* Course Outcomes */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                After completing the full course, you will gain
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border-2 border-[#FF6B35] rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-[#FF6B35] mb-2">01.</div>
                <div className="border-b-2 border-[#FF6B35] mb-4"></div>
                <h4 className="font-bold text-black mb-2">Launch Side Business</h4>
                <p className="text-sm text-gray-600">
                  Open multiple income streams: Master personal positioning and action strategies, launch high-income
                  side businesses, move towards financial freedom!
                </p>
              </div>
              <div className="bg-white border-2 border-[#FF6B35] rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-[#FF6B35] mb-2">02.</div>
                <div className="border-b-2 border-[#FF6B35] mb-4"></div>
                <h4 className="font-bold text-black mb-2">International Remote Career</h4>
                <p className="text-sm text-gray-600">
                  Resume updates and job search strategies, help you successfully enter the international remote market
                  and get your dream position!
                </p>
              </div>
              <div className="bg-white border-2 border-[#FF6B35] rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-[#FF6B35] mb-2">03.</div>
                <div className="border-b-2 border-[#FF6B35] mb-4"></div>
                <h4 className="font-bold text-black mb-2">Comprehensive Planning</h4>
                <p className="text-sm text-gray-600">
                  Life blueprint, clearly visible: End-in-mind life and career comprehensive consideration, help you
                  create your exclusive life blueprint, achieve perfect work-life balance.
                </p>
              </div>
              <div className="bg-white border-2 border-[#FF6B35] rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-[#FF6B35] mb-2">04.</div>
                <div className="border-b-2 border-[#FF6B35] mb-4"></div>
                <h4 className="font-bold text-black mb-2">Growth Partners</h4>
                <p className="text-sm text-gray-600">
                  Lifelong comrades, running towards freedom together: Join top nomad community, grow together with
                  like-minded partners, your free life is no longer lonely!
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-12 bg-black rounded-2xl py-6 px-8 inline-block">
              Early Bird Special Pricing is Here!
            </h3>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="bg-black text-white rounded-2xl p-6 shadow-sm border-2 border-[#FF6B35]">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[#FF6B35] font-bold text-lg">Aug 1-8</div>
                    <div className="text-sm">Super Early Bird Pre-order</div>
                  </div>
                  <div className="text-3xl font-bold">$149</div>
                </div>
              </div>
              <div className="bg-gray-800 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[#FF6B35] font-bold text-lg">Aug 9-15</div>
                    <div className="text-sm">Early Bird Pre-order</div>
                  </div>
                  <div className="text-3xl font-bold">$179</div>
                </div>
              </div>
              <div className="bg-gray-700 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[#FF6B35] font-bold text-lg">Aug 16-31</div>
                    <div className="text-sm">Early Bird Special</div>
                  </div>
                  <div className="text-3xl font-bold">$209</div>
                </div>
              </div>
              <div className="bg-gray-600 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[#FF6B35] font-bold text-lg">Sep 1-15</div>
                    <div className="text-sm">Late Bird Pre-order</div>
                  </div>
                  <div className="text-3xl font-bold">$249</div>
                </div>
              </div>
              <div className="bg-gray-500 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[#FF6B35] font-bold text-lg">Sep 16-30</div>
                    <div className="text-sm">Final Pre-order</div>
                  </div>
                  <div className="text-3xl font-bold">$349</div>
                </div>
              </div>
              <div className="bg-gray-400 text-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[#FF6B35] font-bold text-lg">From Oct 1</div>
                    <div className="text-sm">Regular Price</div>
                  </div>
                  <div className="text-3xl font-bold">$400</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border-2 border-orange-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">🎁 Exclusive Bonus</h3>

            <div className="bg-orange-50 rounded-xl p-6 mb-6">
              <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-2">
                Enroll Now and Enjoy "Free"
                <br />
                Network Community Mutual Support
              </div>
              <div className="text-lg text-gray-600 line-through mb-2">Original Price $99/month × 7 months = $693</div>
            </div>

            {/* Mobile version */}
            <p className="block sm:hidden text-gray-600 mb-8 leading-relaxed">
              3 months of continuous live courses
              <br />
              Plus 7 months of online community to continue learning momentum
              <br />
              Make your remote nomad journey not lonely
              <br />
              Continue growing and progressing.
            </p>

            {/* Desktop version */}
            <p className="hidden sm:block text-gray-600 mb-8 leading-relaxed">
              3 months of continuous live courses, plus 7 months of online community to continue learning momentum
              <br /> Make your remote nomad journey not lonely, continue growing and progressing.
            </p>

            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Grab Limited Time Offer Now →
            </a>

            <div className="mt-4 text-sm text-gray-500">⏰ Limited spots, while supplies last!</div>
          </div>

          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-[#FF6B35] mx-auto rounded-full"></div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {/* FAQ 1 */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-black mb-3">
                  Q: What level can I reach after completing the course?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A: After completing the course, you will have the basic ability to start freelancing and international
                  remote work, and possess personal branding and international resume skills.
                </p>
              </CardContent>
            </Card>

            {/* FAQ 2 */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-black mb-3">
                  Q: Is the course content suitable for complete beginners with no experience?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A: The course is designed from scratch and suitable for beginners with no experience. We will provide
                  first-step guidance that even beginners can execute, making it easy to get started.
                </p>
              </CardContent>
            </Card>

            {/* FAQ 3 */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-black mb-3">Q: How is the course schedule arranged?</h3>
                <p className="text-gray-700 leading-relaxed">
                  A: The course lasts 12 weeks, with weekly online courses and post-class practical assignments. Live
                  courses will also be recorded for replay, so you can flexibly arrange your learning schedule according
                  to your time.
                </p>
              </CardContent>
            </Card>

            {/* FAQ 4 */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-black mb-3">Q: What does the course fee include?</h3>
                <p className="text-gray-700 leading-relaxed">
                  A: The course fee includes all online courses, practical exercises, and community resources.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p className="text-sm">
          &copy; 2025 Remote Nomad Academy Travel With Work Academy. All rights reserved.
          <br />
          For any questions, contact Instagram:{" "}
          <a
            href="https://www.instagram.com/travelwithwork_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 transition-colors"
          >
            Remote Nomad Academy
          </a>{" "}
          / Email: Academy@travelwithwork.life
        </p>
      </footer>
    </main>
  )
}
