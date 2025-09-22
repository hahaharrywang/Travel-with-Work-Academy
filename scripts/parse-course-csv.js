// Parse the CSV data and update course outline information
const csvUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%AA%B2%E7%B6%B1%20%28For%20Lecturer%29%20-%20%E8%AC%9B%E5%B8%AB%E3%80%81%E8%AC%9B%E9%A1%8C-lMoh1p3mXMCpA3uV7LYKUYxwqJxrmH.csv"

async function parseCourseData() {
  try {
    console.log("[v0] Fetching course data from CSV...")

    const response = await fetch(csvUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const csvText = await response.text()
    console.log("[v0] CSV fetched successfully")

    // Simple CSV parsing (handling potential commas in quoted fields)
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    console.log("[v0] Headers found:", headers)

    const courseData = []
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        // Handle CSV parsing with potential quoted fields containing commas
        const row = []
        let current = ""
        let inQuotes = false

        for (let j = 0; j < lines[i].length; j++) {
          const char = lines[i][j]
          if (char === '"') {
            inQuotes = !inQuotes
          } else if (char === "," && !inQuotes) {
            row.push(current.trim())
            current = ""
          } else {
            current += char
          }
        }
        row.push(current.trim()) // Add the last field

        const rowData = {}
        headers.forEach((header, index) => {
          rowData[header] = row[index] || ""
        })

        courseData.push(rowData)
      }
    }

    console.log("[v0] Parsed course data:")
    courseData.forEach((week, index) => {
      console.log(`[v0] Week ${index + 1}:`, {
        month: week["月份"],
        week: week["週"],
        instructor: week["講者"],
        topic: week["講題"],
        objective: week["課堂目標"]?.substring(0, 100) + "...",
        coreContent: week["核心內容"]?.substring(0, 100) + "...",
      })
    })

    return courseData
  } catch (error) {
    console.error("[v0] Error parsing CSV:", error)
    return null
  }
}

// Execute the parsing
parseCourseData()
