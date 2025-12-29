"use client"

import { useState } from "react"

export default function AdminDashboard() {
  const [curfew, setCurfew] = useState("18:30")
  const [exam, setExam] = useState("08:30")
  const [aiResult, setAiResult] = useState("")

  const getGeminiSuggestion = async () => {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        curfew,
        exam,
      }),
    })

    const data = await res.json()
    setAiResult(data.result)
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Control Panel</h1>

      <div>
        <label>Girls Hostel Curfew Time</label>
        <br />
        <input
          type="time"
          value={curfew}
          onChange={(e) => setCurfew(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Exam Time</label>
        <br />
        <input
          type="time"
          value={exam}
          onChange={(e) => setExam(e.target.value)}
        />
      </div>

      <br />

      <button onClick={getGeminiSuggestion}>
        Get AI Timing Suggestions
      </button>

      <br />
      <br />

      {aiResult && (
        <div>
          <h3>AI Suggestions</h3>
          <pre>{aiResult}</pre>
        </div>
      )}
    </div>
  )
}
