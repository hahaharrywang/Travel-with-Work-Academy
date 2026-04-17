/**
 * Lectures / Events data
 *
 * - Weekly 類型是遠距遊牧學院的每週日固定說明會（台灣時間 21:00）
 *   - 日期自動計算為下一個週日 21:00，不需要每週手動更新
 * - Collab / Workshop 類型為不定期加開場次，須手動維護
 * - 加新場次時只要在 upcomingLectures 陣列中新增物件即可
 */

export type LectureType = "weekly" | "collab" | "workshop"

export type LectureHighlight = {
  text: string
  /** 要用金色高亮的關鍵詞（text 會被 split，匹配到的部分套用 emphasis 樣式） */
  emphasis?: string[]
}

export type Lecture = {
  id: string
  type: LectureType
  /** 活動主標題 */
  title: string
  /** tag 徽章文字，例如「每週日固定場」「講師合作」 */
  tag: string
  /** 主講者 */
  speaker: string
  /** 活動重點，featured 場次會完整展開；非 featured 則僅顯示部分 */
  highlights?: LectureHighlight[]
  /** 報名連結 */
  registerUrl: string
  /**
   * 特定日期時間（ISO string with timezone, e.g. "2026-05-10T20:00:00+08:00"）
   * weekly 類型可留空，會自動計算下個週日 21:00
   */
  startAt?: string
}

/**
 * 每週日說明會（featured 大卡內容）
 */
export const weeklyLecture: Lecture = {
  id: "weekly-default",
  type: "weekly",
  tag: "每週日固定場",
  title: "遠距遊牧學院說明會",
  speaker: "校長 Harry",
  registerUrl: "https://www.accupass.com/organizer/detail/2509180637491342778166",
  highlights: [
    {
      text: "屬於每個人的自由，你需要能夠清楚講出來",
      emphasis: ["每個人的自由"],
    },
    {
      text: "AI 時代環境超快速改變，你最該專注的一件事情",
      emphasis: ["該專注的一件事情"],
    },
    {
      text: "2026 遠距兩大熱門路徑全景圖，哪條更適合你",
      emphasis: ["遠距兩大熱門路徑"],
    },
    {
      text: "90% 人遠距路上的 3 種卡點解析 + 一套「一般人都能推進」的成長結構",
      emphasis: ["3 種卡點", "一般人都能推進"],
    },
  ],
}

/**
 * 近期加開場次（合作講座、主題工作坊）
 *
 * 沒有場次時可留空陣列，UI 會自動隱藏「近期加開場次」區塊。
 * 新增範例：
 * {
 *   id: "collab-2026-05-10",
 *   type: "collab",
 *   tag: "講師合作",
 *   title: "AI 時代的接案者：和 XXX 聊聊",
 *   speaker: "校長 × XXX",
 *   registerUrl: "https://...",
 *   startAt: "2026-05-10T20:00:00+08:00",
 * }
 */
export const upcomingLectures: Lecture[] = []

/**
 * 計算「下個週日 21:00（台灣時間）」並回傳顯示用字串
 * - 如果今天就是週日且 < 21:00，回傳今天 21:00
 * - 否則回傳下一個週日 21:00
 *
 * 回傳格式：{ dateLabel, timeLabel, iso }
 * 例：{ dateLabel: "4/20（週日）", timeLabel: "21:00", iso: "..." }
 */
export function getNextSundayNineTaipei(now: Date = new Date()): {
  dateLabel: string
  timeLabel: string
  iso: string
} {
  // 取得台灣當下的 yyyy-mm-dd hh:mm
  const taipeiFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  })
  const parts = taipeiFormatter.formatToParts(now)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ""
  const year = Number(get("year"))
  const month = Number(get("month"))
  const day = Number(get("day"))
  const hour = Number(get("hour"))
  const minute = Number(get("minute"))
  const weekdayStr = get("weekday") // e.g. "Sun"
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  }
  const taipeiWeekday = weekdayMap[weekdayStr] ?? 0

  // 決定目標日期（今天 or 下週日）
  let daysToAdd: number
  if (taipeiWeekday === 0 && (hour < 21 || (hour === 21 && minute === 0))) {
    daysToAdd = 0
  } else {
    daysToAdd = (7 - taipeiWeekday) % 7
    if (daysToAdd === 0) daysToAdd = 7
  }

  // 以 Taipei 的 (year, month, day) + daysToAdd 建 Date
  // 用 UTC epoch 的方式避免本地時區干擾
  const baseUtc = Date.UTC(year, month - 1, day)
  const targetUtc = baseUtc + daysToAdd * 24 * 60 * 60 * 1000
  const target = new Date(targetUtc)
  const tMonth = target.getUTCMonth() + 1
  const tDay = target.getUTCDate()

  const dateLabel = `${tMonth}/${tDay}（週日）`
  const timeLabel = "21:00"
  // ISO with +08:00
  const pad = (n: number) => String(n).padStart(2, "0")
  const iso = `${target.getUTCFullYear()}-${pad(tMonth)}-${pad(tDay)}T21:00:00+08:00`

  return { dateLabel, timeLabel, iso }
}

/**
 * 將 ISO 字串格式化為「M/D（週X）HH:MM」顯示用字串（台灣時區）
 */
export function formatLectureDateTime(iso: string): {
  dateLabel: string
  timeLabel: string
} {
  const d = new Date(iso)
  const formatter = new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  const parts = formatter.formatToParts(d)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ""
  const month = get("month")
  const day = get("day")
  const weekday = get("weekday") // "週日" etc.
  const hour = get("hour")
  const minute = get("minute")
  return {
    dateLabel: `${month}/${day}（${weekday}）`,
    timeLabel: `${hour}:${minute}`,
  }
}
