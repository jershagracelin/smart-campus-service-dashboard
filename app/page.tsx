"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Role = "admin" | "incharge" | "student"

export default function SmartCampusDashboard() {
  const [role, setRole] = useState<Role>("admin")

  // Shared data
  const [curfew, setCurfew] = useState("18:30")
  const [canteen, setCanteen] = useState("17:30 - 18:15")
  const [laundry, setLaundry] = useState("16:00 - 17:30")
  const [aiText, setAiText] = useState("")

  const runAISuggestion = () => {
    setAiText(`
AI Recommendation (Demo Mode):
• Advance dinner timing due to early hostel curfew
• Close canteen 15 minutes before curfew
• Stop laundry services 1 hour before curfew
`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Smart Campus Service Timing Dashboard
      </h1>

      {/* ROLE SWITCH */}
      <div className="flex gap-3">
        <Button onClick={() => setRole("admin")}>Admin</Button>
        <Button onClick={() => setRole("incharge")}>Incharge</Button>
        <Button onClick={() => setRole("student")}>Student</Button>
      </div>

      {/* ADMIN */}
      {role === "admin" && (
        <Card className="bg-slate-800/80 border border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Admin Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="text-sm font-semibold">
              Girls Hostel Curfew Time
            </label>
            <Input
              type="time"
              value={curfew}
              onChange={(e) => setCurfew(e.target.value)}
              className="bg-slate-900 border-slate-700"
            />
            <Button onClick={runAISuggestion}>
              Approve Curfew & Get AI Suggestion
            </Button>

            {aiText && (
              <pre className="bg-slate-900 p-4 rounded-md mt-3 whitespace-pre-wrap text-sm">
                {aiText}
              </pre>
            )}
          </CardContent>
        </Card>
      )}

      {/* INCHARGE */}
      {role === "incharge" && (
        <Card className="bg-slate-800/80 border border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Service Incharge Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              value={canteen}
              onChange={(e) => setCanteen(e.target.value)}
              placeholder="Canteen Timing"
              className="bg-slate-900 border-slate-700"
            />
            <Input
              value={laundry}
              onChange={(e) => setLaundry(e.target.value)}
              placeholder="Laundry Timing"
              className="bg-slate-900 border-slate-700"
            />
            <Alert className="bg-slate-900 border-slate-700">
              <AlertDescription>
                Timings will be optimized after admin approval.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* STUDENT */}
      {role === "student" && (
        <Card className="bg-slate-800/80 border border-slate-700 text-white">
          <CardHeader>
            <CardTitle>Student View</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>🏠 Hostel Curfew: {curfew}</div>
            <div>🍽 Canteen: {canteen}</div>
            <div>👕 Laundry: {laundry}</div>
            <Alert className="bg-slate-900 border-slate-700 mt-3">
              <AlertDescription>
                Timings optimized using AI recommendations.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
