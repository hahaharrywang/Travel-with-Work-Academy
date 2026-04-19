import { writeFile, mkdir, stat } from "node:fs/promises"
import { dirname } from "node:path"

const BLOB_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0419%20accupass-NyrC4LKHKkduthqCBs6mYMJptuqEi3.jpg"
const OUT_PATH = "public/lectures/0419-banner.jpg"

console.log("[v0] Downloading lecture banner from:", BLOB_URL)

// 先印出目前檔案狀態（若存在）
try {
  const s = await stat(OUT_PATH)
  console.log("[v0] Existing file found. size =", s.size, "bytes")
} catch {
  console.log("[v0] No existing file at:", OUT_PATH)
}

const res = await fetch(BLOB_URL)
if (!res.ok) {
  console.log("[v0] Fetch failed with status:", res.status)
  process.exit(1)
}

const contentType = res.headers.get("content-type")
const contentLength = res.headers.get("content-length")
console.log("[v0] Response OK. content-type =", contentType, "content-length =", contentLength)

const buf = Buffer.from(await res.arrayBuffer())
console.log("[v0] Downloaded bytes =", buf.length)

// 基本驗證：JPEG magic header
const isJpeg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff
console.log("[v0] JPEG magic header check =", isJpeg)

await mkdir(dirname(OUT_PATH), { recursive: true })
await writeFile(OUT_PATH, buf)

const finalStat = await stat(OUT_PATH)
console.log("[v0] File written. final size =", finalStat.size, "bytes → ", OUT_PATH)
console.log("[v0] Done.")
