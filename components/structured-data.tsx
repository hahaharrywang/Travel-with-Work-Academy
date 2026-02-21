// SEO Structured Data Component for JSON-LD schemas
// Includes: Course, FAQPage, Organization schemas

export function StructuredData() {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nomad Groups 遠距遊牧學院",
    alternateName: "Travel with Work Academy",
    url: "https://travelwork.life",
    logo: "https://cdn.prod.website-files.com/65c1d05dd14c7dbd8fcdff5e/674bd29d93e15bd0a85a3b8a_nomad-group-logo-dark.png",
    sameAs: ["https://www.instagram.com/travelwithwork_/", "https://open.spotify.com/show/0bPxKFkLMJHOgcEBNvkq21"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "Academy@travelwork.life",
      contactType: "customer service",
      availableLanguage: ["zh-TW", "en"],
    },
    description: "遠距遊牧學院是一個為期 6 個月的行動學院，幫助你探索遠距工作、自媒體接案與遠端上班的可能性。",
  }

  // Course Schema
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "遠距遊牧學院 Travel with Work Academy",
    description:
      "3+3 個月的行動學院，透過系統化課程與社群陪伴，幫助你開啟遠距工作的人生新章節。前 3 個月共學探索期，後 3 個月延伸累積期。",
    provider: {
      "@type": "Organization",
      name: "Nomad Groups 遠距遊牧學院",
      url: "https://travelwork.life",
    },
    educationalLevel: "Beginner to Intermediate",
    coursePrerequisites: "適合有正職但想探索更多可能性的人，無需接案或遠距經驗",
    timeRequired: "P6M",
    numberOfCredits: "6 months",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT2H-PT4H per week",
      inLanguage: "zh-TW",
    },
    teaches: [
      "遠距職涯定位與目標設定",
      "自媒體經營與內容策略",
      "遠端求職與履歷優化",
      "個人品牌與作品集建立",
      "接案平台運用與報價策略",
      "客戶溝通與面試技巧",
    ],
    about: [
      {
        "@type": "Thing",
        name: "遠距工作",
      },
      {
        "@type": "Thing",
        name: "自媒體經營",
      },
      {
        "@type": "Thing",
        name: "數位遊牧",
      },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "自媒體接案線路方案",
        priceCurrency: "TWD",
        availability: "https://schema.org/InStock",
        url: "https://travelworkacademy.myteachify.com/checkout?planId=selfmedia",
      },
      {
        "@type": "Offer",
        name: "遠端上班線路方案",
        priceCurrency: "TWD",
        availability: "https://schema.org/InStock",
        url: "https://travelworkacademy.myteachify.com/checkout?planId=remotejob",
      },
      {
        "@type": "Offer",
        name: "雙線整合方案",
        priceCurrency: "TWD",
        availability: "https://schema.org/InStock",
        url: "https://travelworkacademy.myteachify.com/checkout?planId=be56b4ae-6f31-43be-8bfb-68fda4294a9a",
      },
    ],
  }

  // FAQ Schema - Plain text answers for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "這堂學院適合什麼樣的人？我現在只是在上班，可以報名嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "當然可以！這堂學院就是為了「有正職、但想探索更多可能」的人設計的。你不需要先離職，也不需要有任何接案或遠距經驗。只要你願意在未來六個月裡，每週騰出 2-4 小時來學習和行動，這裡就適合你。",
        },
      },
      {
        "@type": "Question",
        name: "英文不好、程式不會，可以嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "可以。我們的課程主要用中文進行，不會要求你一開始就具備流利英文或程式能力。選修課程中有「工作英文」和「AI 工具應用」，會幫助你從零建立這些技能。最重要的是「願意學」，而不是「已經會」。",
        },
      },
      {
        "@type": "Question",
        name: "3+3 個月的節奏大概是怎麼安排的？會不會太硬？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "前 3 個月是「共學探索期」，每週會有 1 堂主課（約 60-90 分鐘）+ 課後任務，預計每週投入 2-4 小時。這段時間會比較密集，但節奏是設計給有正職的人跟得上的。後 3 個月是「延伸累積期」，節奏放慢，以每月復盤工作坊、選修課程、社群任務為主，讓你有空間把學到的東西真的用出來。",
        },
      },
      {
        "@type": "Question",
        name: "我時間很不固定，有錄影可以回看嗎？作業一定要每週交嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "所有課程都會錄影，放在 Skool 社群讓你隨時回看。作業有建議繳交時間，但我們更鼓勵「完成比完美重要」——如果某週真的忙不過來，可以先跟上進度，之後再補。我們會有基本的及格門檻，但不會逼你每週都交滿。",
        },
      },
      {
        "@type": "Question",
        name: "如果這六個月中途真的發生變故（工作太忙、人生事件），怎麼辦？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "我們理解人生不會照劇本走。如果中途遇到重大變故，可以先私訊我們討論。錄影內容會保留讓你補課，部分情況也可以申請轉到下一梯次。詳細的退費與轉班規則會在報名後提供完整說明。",
        },
      },
      {
        "@type": "Question",
        name: "自媒體接案線路與遠端上班線路有什麼差別？我不知道要選哪一個。",
        acceptedAnswer: {
          "@type": "Answer",
          text: "自媒體接案線路適合想透過內容創作、個人品牌來獲得收入與自由的人，課程會教你怎麼從零開始經營自媒體、找到變現模式、接到第一個案子。遠端上班線路適合想找到一份可以遠距工作的正職或長期合作的人，課程會教你怎麼打造國際履歷、在哪裡找遠距職缺、如何通過面試。如果你還不確定，建議先選一條「現在比較有感覺」的線路走走看。",
        },
      },
      {
        "@type": "Question",
        name: "可以中途換線、改成雙線並進嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "可以。如果你在前 3 個月發現另一條線路更適合自己，可以申請換線或升級成雙線並進方案（需補差額）。我們希望你選到真正適合的路，而不是被綁在一開始的選擇。",
        },
      },
      {
        "@type": "Question",
        name: "有發票／公司報帳、分期付款的選項嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "我們可以開立電子發票（含統編），適合需要公司報帳的學員。分期付款部分，目前支援信用卡分期（視發卡銀行而定）。如果有特殊需求，歡迎私訊我們討論。",
        },
      },
      {
        "@type": "Question",
        name: "結業後還能看回放嗎？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "你會永久保留自己買過的課程回放與資源。同一個 Skool 社群也會持續保留，畢業後不用搬家，仍可在社群中交流（但「當屆專區」僅當屆可見）。",
        },
      },
      {
        "@type": "Question",
        name: "Premium 訂閱是什麼？跟學院差在哪？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "學院是 5 個月的系統課程＆行動節奏，帶你從定位到落地，完成可展示的成果。Premium 是訂閱制，主打公開社群的會員限定資源庫更新＋機會／曝光＋訂閱福利。學員在學期間可免費享有此資格；結業後可自由續訂。",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}
