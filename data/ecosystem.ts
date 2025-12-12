export interface Partner {
  name: string
  logo?: string
  description?: string
}

export interface EcosystemCategory {
  title: string
  partners: Partner[]
}

export const ecosystemCategories: EcosystemCategory[] = [
  {
    title: "線上教育",
    partners: [{ name: "Teachify 開課快手" }, { name: "Skool" }, { name: "Notion" }],
  },
  {
    title: "線下社群",
    partners: [{ name: "Journey 數位遊牧旅居活動" }, { name: "Nomad Meetup 各城市聚會" }],
  },
  {
    title: "國際鏈結",
    partners: [{ name: "Nomad Leaders Podcast" }, { name: "全球遠距工作者社群" }],
  },
]
