import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Build form data matching GHL's expected format
    const formData = new URLSearchParams()
    formData.append("formId", "MpJ0wDqzBLszazx5vVRy")
    formData.append("location_id", "digitalnomadstaiwan")
    if (name) formData.append("name", name)
    formData.append("email", email)

    const ghlRes = await fetch(
      "https://link.digitalnomadstaiwan.com/widget/form/MpJ0wDqzBLszazx5vVRy",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        redirect: "follow",
      }
    )

    // GHL typically redirects on success (302/301) or returns 200
    // Any non-5xx response means the form was accepted
    if (ghlRes.status < 500) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: "GHL returned an error" },
      { status: 502 }
    )
  } catch (error) {
    console.error("[subscribe] Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
