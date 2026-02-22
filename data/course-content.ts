export interface CourseItem {
  title: string
  tag?: string
  tagColor?: string
}

export interface MonthData {
  month: number
  title: string
  courses: CourseItem[]
}

export const monthlySchedule: MonthData[] = [
  {
    month: 1,
    title: "定位與規劃",
    courses: [
      { title: "第1週：開學週 - 遠距職涯定位", tag: "共同必修", tagColor: "bg-[#17464F]" },
      { title: "第2週：目標設定與時間規劃", tag: "共同必修", tagColor: "bg-[#17464F]" },
      { title: "第3週：接案定位與內容策略", tag: "A線", tagColor: "bg-[#D4B483]" },
      { title: "第4週：遠端求職市場分析", tag: "B線", tagColor: "bg-[#A06E56]" },
    ],
  },
  {
    month: 2,
    title: "技能建立",
    courses: [
      { title: "第5週：個人品牌與作品集", tag: "共同必修", tagColor: "bg-[#17464F]" },
      { title: "第6週：接案平台與報價策略", tag: "A線", tagColor: "bg-[#D4B483]" },
      { title: "第7週：履歷優化與LinkedIn", tag: "B線", tagColor: "bg-[#A06E56]" },
      { title: "第8週：客戶溝通與面試技巧", tag: "共同必修", tagColor: "bg-[#17464F]" },
    ],
  },
  {
    month: 3,
    title: "實戰演練",
    courses: [
      { title: "第9週：第一個案子/面試", tag: "共同必修", tagColor: "bg-[#17464F]" },
      { title: "第10週：接案實戰工作坊", tag: "A線", tagColor: "bg-[#D4B483]" },
      { title: "第11週：遠端面試模擬", tag: "B線", tagColor: "bg-[#A06E56]" },
      { title: "第12週：成果發表與下一步規劃", tag: "共同必修", tagColor: "bg-[#17464F]" },
    ],
  },
]

export const secondPhaseFeatures = [
  {
    title: "每月復盤工作坊",
    description: "導師帶領的月度檢視，調整方向與策略",
  },
  {
    title: "選修課程與延伸工作坊",
    description: "AI 工具、影音剪輯、工作英文等實作課程",
  },
  {
    title: "講師 QA + 線上線下聚會",
    description: "持續的社群支持與人脈連結機會",
  },
]
