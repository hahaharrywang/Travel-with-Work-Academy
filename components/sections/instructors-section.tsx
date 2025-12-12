"use client"

import Image from "next/image"

export interface Instructor {
  name: string
  title: string
  image: string
  link: string
  background: string
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
              <span className="text-[#D4B483]">A 線｜</span>自媒體接案線路導師
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
