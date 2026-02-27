"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Globe,
  Instagram,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

interface EventRow {
  date: string          // 活動日期
  startTime: string     // 開始時間
  endTime: string       // 結束時間
  location: string      // 形式/地點
  title: string         // 活動標題
  tags: string          // 標籤
  speakerName: string   // 講者名
  speakerBio: string    // 講者介紹
  speakerSocial1: string // 講者社群 1
  speakerSocial2: string // 講者社群 2
  speakerWebsite: string // 講者網站
  speakerPhoto: string  // 講者照片
  description: string   // 活動介紹
  registrationUrl: string // 報名連結
  notes: string         // 備註
}

type EventStatus = "upcoming" | "ongoing" | "past"
type TabFilter = "all" | "upcoming" | "past"

interface ParsedEvent extends EventRow {
  status: EventStatus
  dateObj: Date | null
}

// ─── CSV Parser ───────────────────────────────────────────────────────────────

function parseCSV(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        field += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ',') {
        row.push(field.trim())
        field = ""
      } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
        if (ch === '\r') i++
        row.push(field.trim())
        rows.push(row)
        row = []
        field = ""
      } else if (ch === '\r') {
        row.push(field.trim())
        rows.push(row)
        row = []
        field = ""
      } else {
        field += ch
      }
    }
  }
  if (field || row.length > 0) {
    row.push(field.trim())
    rows.push(row)
  }
  return rows
}

function mapRowToEvent(headers: string[], values: string[]): EventRow {
  const get = (key: string) => {
    const idx = headers.indexOf(key)
    return idx >= 0 ? (values[idx] ?? "").trim() : ""
  }
  return {
    date: get("活動日期"),
    startTime: get("開始時間"),
    endTime: get("結束時間"),
    location: get("形式/地點"),
    title: get("活動標題"),
    tags: get("標籤"),
    speakerName: get("講者名"),
    speakerBio: get("講者介紹"),
    speakerSocial1: get("講者社群 1"),
    speakerSocial2: get("講者社群 2"),
    speakerWebsite: get("講者網站"),
    speakerPhoto: get("講者照片"),
    description: get("活動介紹"),
    registrationUrl: get("報名連結"),
    notes: get("備註"),
  }
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null
  // Support formats: YYYY/MM/DD, YYYY-MM-DD, MM/DD/YYYY
  const cleaned = dateStr.replace(/\//g, "-")
  const d = new Date(cleaned)
  if (!isNaN(d.getTime())) return d
  return null
}

function getEventStatus(event: EventRow): { status: EventStatus; dateObj: Date | null } {
  const dateObj = parseDate(event.date)
  if (!dateObj) return { status: "upcoming", dateObj: null }

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const eventDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())

  if (eventDate < today) return { status: "past", dateObj }
  if (eventDate.getTime() === today.getTime()) return { status: "ongoing", dateObj }
  return { status: "upcoming", dateObj }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: EventStatus }) {
  const config = {
    upcoming: { label: "即將舉辦", bg: "bg-[#17464F]", text: "text-white" },
    ongoing:  { label: "今日舉辦", bg: "bg-[#D4B483]", text: "text-[#17464F]" },
    past:     { label: "已結束",   bg: "bg-[#C9D7D4]", text: "text-[#33393C]" },
  }
  const c = config[status]
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  )
}

function TagChip({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F5F3ED] text-[#A06E56] border border-[#D4B483]/40">
      {tag}
    </span>
  )
}

function SocialLink({ url, label }: { url: string; label?: string }) {
  if (!url) return null
  const isIG = url.includes("instagram")
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-[#17464F] hover:text-[#D4B483] transition-colors"
    >
      {isIG ? <Instagram className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
      <span className="underline underline-offset-2">{label || (isIG ? "Instagram" : "Website")}</span>
    </a>
  )
}

function EventCard({ event }: { event: ParsedEvent }) {
  const [expanded, setExpanded] = useState(false)
  const tags = event.tags ? event.tags.split(/[,、，]/).map(t => t.trim()).filter(Boolean) : []
  const isPast = event.status === "past"

  return (
    <article className={`bg-white rounded-2xl shadow-sm border border-[#C9D7D4]/50 overflow-hidden transition-all duration-200 hover:shadow-md ${isPast ? "opacity-75" : ""}`}>
      {/* Header strip */}
      <div className={`h-1.5 w-full ${event.status === "upcoming" ? "bg-[#17464F]" : event.status === "ongoing" ? "bg-[#D4B483]" : "bg-[#C9D7D4]"}`} />

      <div className="p-6">
        {/* Top row: status + tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <StatusBadge status={event.status} />
          {tags.map(t => <TagChip key={t} tag={t} />)}
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-[#17464F] leading-snug mb-4 text-pretty">{event.title || "（無標題）"}</h2>

        {/* Meta info */}
        <div className="flex flex-col gap-2 text-sm text-[#33393C]/70 mb-5">
          {event.date && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#17464F] flex-shrink-0" />
              <span>{event.date}</span>
            </div>
          )}
          {(event.startTime || event.endTime) && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#17464F] flex-shrink-0" />
              <span>{[event.startTime, event.endTime].filter(Boolean).join(" – ")}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#17464F] flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {/* Speaker */}
        {event.speakerName && (
          <div className="flex items-start gap-3 mb-5 p-4 bg-[#F5F3ED] rounded-xl">
            {event.speakerPhoto ? (
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#D4B483]/40">
                <Image
                  src={event.speakerPhoto}
                  alt={event.speakerName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#C9D7D4] flex items-center justify-center flex-shrink-0 text-[#17464F] text-lg font-bold border-2 border-[#D4B483]/40">
                {event.speakerName.charAt(0)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#17464F]">{event.speakerName}</p>
              {event.speakerBio && (
                <p className="text-xs text-[#33393C]/70 mt-0.5 leading-relaxed line-clamp-2">{event.speakerBio}</p>
              )}
              <div className="flex flex-wrap gap-3 mt-2">
                {event.speakerSocial1 && <SocialLink url={event.speakerSocial1} />}
                {event.speakerSocial2 && <SocialLink url={event.speakerSocial2} />}
                {event.speakerWebsite && <SocialLink url={event.speakerWebsite} label="網站" />}
              </div>
            </div>
          </div>
        )}

        {/* Description (collapsible) */}
        {event.description && (
          <div className="mb-5">
            <p className={`text-sm text-[#33393C]/80 leading-relaxed whitespace-pre-line ${!expanded ? "line-clamp-3" : ""}`}>
              {event.description}
            </p>
            <button
              onClick={() => setExpanded(v => !v)}
              className="mt-1.5 inline-flex items-center gap-1 text-xs text-[#17464F] hover:text-[#D4B483] transition-colors font-medium"
            >
              {expanded ? <><ChevronUp className="w-3.5 h-3.5" />收起</> : <><ChevronDown className="w-3.5 h-3.5" />展開介紹</>}
            </button>
          </div>
        )}

        {/* Notes */}
        {event.notes && (
          <p className="text-xs text-[#33393C]/50 italic mb-4">{event.notes}</p>
        )}

        {/* CTA */}
        {event.registrationUrl && !isPast && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 w-full justify-center bg-[#17464F] text-white text-sm font-semibold py-3 px-6 rounded-xl hover:bg-[#1a5561] transition-colors duration-200"
          >
            立即報名
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        {event.registrationUrl && isPast && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 w-full justify-center border border-[#C9D7D4] text-[#33393C]/60 text-sm font-medium py-3 px-6 rounded-xl hover:border-[#17464F]/40 transition-colors duration-200"
          >
            查看回放
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </article>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const SHEET_ID = "1JSuPtjVjmMTaDmH8KIyMCzBUUal61HjqZLntiRDCLpM"
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`

export default function EventsPage() {
  const [events, setEvents] = useState<ParsedEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabFilter>("all")

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(CSV_URL, { cache: "no-store" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const text = await res.text()
        const rows = parseCSV(text)
        if (rows.length < 2) {
          setEvents([])
          return
        }
        // Normalize headers (strip BOM, whitespace)
        const headers = rows[0].map(h => h.replace(/^\uFEFF/, "").trim())
        const parsed: ParsedEvent[] = rows
          .slice(1)
          .filter(row => row.some(cell => cell.trim()))
          .map(row => {
            const evt = mapRowToEvent(headers, row)
            const { status, dateObj } = getEventStatus(evt)
            return { ...evt, status, dateObj }
          })
          .filter(e => e.title)
          // Sort: ongoing first, then upcoming by date asc, then past by date desc
          .sort((a, b) => {
            const order: Record<EventStatus, number> = { ongoing: 0, upcoming: 1, past: 2 }
            if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status]
            if (!a.dateObj || !b.dateObj) return 0
            if (a.status === "past") return b.dateObj.getTime() - a.dateObj.getTime()
            return a.dateObj.getTime() - b.dateObj.getTime()
          })
        setEvents(parsed)
      } catch (err) {
        setError("無法載入場次資料，請稍後再試。請確認 Google Sheet 已設為「任何人可以用連結查看」。")
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const counts = useMemo(() => ({
    all: events.length,
    upcoming: events.filter(e => e.status === "upcoming" || e.status === "ongoing").length,
    past: events.filter(e => e.status === "past").length,
  }), [events])

  const filtered = useMemo(() => {
    if (activeTab === "upcoming") return events.filter(e => e.status === "upcoming" || e.status === "ongoing")
    if (activeTab === "past") return events.filter(e => e.status === "past")
    return events
  }, [events, activeTab])

  const tabs: { key: TabFilter; label: string }[] = [
    { key: "all",      label: `全部（${counts.all}）` },
    { key: "upcoming", label: `即將舉辦（${counts.upcoming}）` },
    { key: "past",     label: `已結束（${counts.past}）` },
  ]

  return (
    <div className="min-h-screen bg-[#F5F3ED] font-sans">
      {/* Header */}
      <header className="bg-[#17464F] text-white">
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            返回主頁
          </a>
          <div className="flex items-center gap-3 mb-2">
            {/* Three dot decoration */}
            <span className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
              <span className="w-2 h-2 rounded-full bg-[#D4B483]/60" />
              <span className="w-2 h-2 rounded-full bg-[#D4B483]/30" />
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-balance">
            線上說明會＆講座場次
          </h1>
          <p className="mt-2 text-white/70 text-sm md:text-base leading-relaxed">
            遠距遊牧學院公開講座、線上說明會活動總覽
          </p>
        </div>
      </header>

      {/* Gold divider line */}
      <div className="h-px bg-[#D4B483]/40" />

      {/* Sticky tab bar */}
      <div className="sticky top-0 z-20 bg-[#F5F3ED]/95 backdrop-blur-sm border-b border-[#C9D7D4]/60 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex gap-1 py-3 overflow-x-auto scrollbar-none">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-[#17464F] text-white shadow-sm"
                    : "text-[#33393C]/70 hover:text-[#17464F] hover:bg-[#C9D7D4]/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-8 h-8 text-[#17464F] animate-spin" />
            <p className="text-sm text-[#33393C]/60">載入場次資料中…</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#A06E56]/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-[#A06E56]" />
            </div>
            <p className="text-sm text-[#33393C]/70 leading-relaxed">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <Calendar className="w-10 h-10 text-[#C9D7D4]" />
            <p className="text-sm text-[#33393C]/50">目前此分類沒有場次</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((event, i) => (
              <EventCard key={`${event.date}-${event.title}-${i}`} event={event} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#C9D7D4]/50 bg-[#F5F3ED] mt-8">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-xs text-[#33393C]/40">
            © 遠距遊牧學院 Travel With Work Academy · 場次資訊即時更新自 Google Sheet
          </p>
        </div>
      </footer>
    </div>
  )
}
