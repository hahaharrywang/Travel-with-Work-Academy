"use client"

import Image from "next/image"

export interface Instructor {
  name: string
  title: string
  image: string
  link: string
  background: string
  links?: {
    website?: string
    linkedin?: string
    instagram?: string
    facebook?: string
  }
}

interface InstructorsSectionProps {
  instructors: Instructor[]
}

const selfMediaInstructors = ["工具王阿璋", "林佳 Zoe", "三分鐘", "西打藍"]
const remoteJobInstructors = ["許詮", "Shelley", "讀者太太", "Emilia"]
const coreInstructors = ["林上哲", "鮪魚", "Joyce Weng", "Angela Feng"]

export function InstructorsSection({ instructors }: InstructorsSectionProps) {
  const renderInstructorCard = (instructor: Instructor, ringColor = "ring-[#17464F]/20") => (
    <div className="group text-center">
      <div className="relative mb-4">
        {instructor.name === "工具王阿璋" && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#D4B483] text-white text-xs font-semibold rounded-full shadow-md">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              Week 3 講師
            </span>
          </div>
        )}
        <a
          href={instructor.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 cursor-pointer ring-4 ${ringColor}`}
        >
          <Image
            src={instructor.image || "/placeholder.svg"}
            alt={instructor.name}
            width={128}
            height={128}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </a>
      </div>
      <h4 className="text-base sm:text-lg font-bold text-[#17464F] mb-1">{instructor.name}</h4>
      <p className="text-[#33393C] text-xs sm:text-sm leading-relaxed line-clamp-2 px-2">
        {instructor.title.split("，")[0]}
      </p>
      {/* Added social media links */}
      {instructor.links && (
        <div className="flex justify-center gap-4 mt-4">
          {instructor.links.website && (
            <a href={instructor.links.website} target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 text-[#17464F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9 9m9-9v1a2 2 0 01-2 2h-1m-1 8a2 2 0 002-2v-1m0 4h1m-1 8a2 2 0 01-2-2v-1m-1 4a2 2 0 002 2m0-4V9a2 2 0 00-2-2m0-4h1m1 4a2 2 0 002 2m0-4V5a2 2 0 012 2"
                />
              </svg>
            </a>
          )}
          {instructor.links.linkedin && (
            <a href={instructor.links.linkedin} target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 text-[#0077B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 8s6 0 6 6a6 6 0 01-6 6M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6m6 6v4m0 0h.01M6 16h.01"
                />
              </svg>
            </a>
          )}
          {instructor.links.instagram && (
            <a href={instructor.links.instagram} target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 text-[#E4405F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.5 19.5a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25v-4.5a2.25 2.25 0 014.5 0v4.5a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25v-4.5a2.25 2.25 0 014.5 0v4.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v18m-6-6h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v18a2 2 0 002 2h6a2 2 0 002-2zm0 0V12a2 2 0 01-2-2H6a2 2 0 01-2-2V3zm0 0h6a2 2 0 012 2v6a2 2 0 01-2 2H6zm0 0h6a2 2 0 012 2v6a2 2 0 01-2 2H6z"
                />
              </svg>
            </a>
          )}
          {instructor.links.facebook && (
            <a href={instructor.links.facebook} target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5 text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V5zm10 10a4 4 0 10-4-4 4 4 0 004 4zm2-8a2 2 0 11-4 0 2 2 0 014 0zm7 9a7 7 0 01-7 7h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v4a2 2 0 01-2 2H5a7 7 0 017 7h4a2 2 0 002-2z"
                />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  )

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
            <span className="w-2 h-2 rounded-full bg-[#17464F]" />
            <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17464F] mb-6">
            你的路線，不會只有一位老師在陪你走
          </h2>
          <p className="text-[#33393C] text-lg leading-relaxed max-w-2xl mx-auto">
            這堂學院不是把所有主題塞給同一個講師，
            <br className="hidden sm:block" />
            而是找了一群真的在路上走的人，一起陪你打底、選方向、走路線。
          </p>
        </div>

        {/* A Line: Self Media */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-[#17464F]" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#17464F]">
              <span className="text-[#D4B483]">A 線｜</span>接案線路導師
            </h3>
            <div className="h-px w-12 bg-[#17464F]" />
          </div>
          <p className="text-center text-[#33393C] mb-8 max-w-xl mx-auto">
            帶你建立個人品牌、經營內容、從零開始接案變現
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {instructors
              .filter((i) => selfMediaInstructors.includes(i.name))
              .map((instructor, index) => (
                <div key={index}>{renderInstructorCard(instructor)}</div>
              ))}
          </div>
        </div>

        {/* B Line: Remote Job */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-[#17464F]" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#17464F]">
              <span className="text-[#D4B483]">B 線｜</span>遠端上班線路導師
            </h3>
            <div className="h-px w-12 bg-[#17464F]" />
          </div>
          <p className="text-center text-[#33393C] mb-8 max-w-xl mx-auto">
            帶你建立國際職涯視野、遠端求職策略、跨國人脈經營
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {instructors
              .filter((i) => remoteJobInstructors.includes(i.name))
              .map((instructor, index) => (
                <div key={index}>{renderInstructorCard(instructor)}</div>
              ))}
          </div>
        </div>

        {/* Core Instructors */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-[#D4B483]" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#17464F]">共同必修</h3>
            <div className="h-px w-12 bg-[#D4B483]" />
          </div>
          <p className="text-center text-[#33393C] mb-8 max-w-xl mx-auto">
            打底知識變現、AI 工具、財務思維、人生 SOP 的核心講師
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {instructors
              .filter((i) => coreInstructors.includes(i.name))
              .map((instructor, index) => (
                <div key={index}>{renderInstructorCard(instructor, "ring-[#D4B483]/30")}</div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
