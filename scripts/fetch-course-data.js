// Fetch the CSV data from the provided URL
const csvUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%AA%B2%E7%B6%B1%20%28For%20Lecturer%29%20-%20%E8%AC%9B%E5%B8%AB%E3%80%81%E8%AC%9B%E9%A1%8C-lMoh1p3mXMCpA3uV7LYKUYxwqJxrmH.csv"

try {
  console.log("[v0] Fetching CSV data from:", csvUrl)

  const response = await fetch(csvUrl)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const csvText = await response.text()
  console.log("[v0] CSV data fetched successfully")
  console.log("[v0] CSV content preview:", csvText.substring(0, 500) + "...")

  // Parse CSV data (simple parsing for demonstration)
  const lines = csvText.split("\n")
  const headers = lines[0].split(",")

  console.log("[v0] CSV headers:", headers)
  console.log("[v0] Total rows:", lines.length - 1)

  // Parse each row
  const courseData = []
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(",")
      const rowData = {}
      headers.forEach((header, index) => {
        rowData[header.trim()] = values[index] ? values[index].trim() : ""
      })
      courseData.push(rowData)
    }
  }

  console.log("[v0] Parsed course data:", JSON.stringify(courseData, null, 2))
} catch (error) {
  console.error("[v0] Error fetching CSV:", error)
}
