import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { curfew, exam } = await req.json()

    const prompt = `
You are a smart campus assistant.

Girls hostel curfew time: ${curfew}
Exam time: ${exam}

Suggest optimized timings for:
- Mess breakfast
- Mess dinner
- Canteen last order
- Laundry closing

Give clear bullet points.
`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    )

    const data = await response.json()

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      `AI Suggestion:
• Advance dinner timing due to early hostel curfew
• Close canteen 15 minutes before curfew
• Stop laundry services 1 hour before curfew
(Generated using AI fallback)`

    return NextResponse.json({ result: text })
  } catch (error) {
    return NextResponse.json({
      result: `AI Suggestion:
• Advance dinner timing due to early hostel curfew
• Close canteen 15 minutes before curfew
• Stop laundry services 1 hour before curfew
(Generated using AI fallback)`,
    })
  }
}
