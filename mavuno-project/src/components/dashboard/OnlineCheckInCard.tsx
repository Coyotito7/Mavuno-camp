import { useState, type FormEvent } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { checkIn, fetchRoster } from "@/lib/api/portal"
import type { RosterRow } from "@/lib/api/types"

/* Type a name, phone number or M-Pesa code. One match is checked in straight away. */
export function OnlineCheckInCard({ campId, onChecked }: { campId: string; onChecked: () => void }) {
  const [query, setQuery] = useState("")
  const [matches, setMatches] = useState<RosterRow[] | null>(null)
  const [busy, setBusy] = useState(false)

  async function checkInRow(row: RosterRow) {
    await checkIn(row.registration_id)
    toast.success(`${row.first_name} ${row.last_name} checked in`)
    setQuery("")
    setMatches(null)
    onChecked()
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (query.trim() === "") return
    setBusy(true)
    try {
      const { rows } = await fetchRoster({
        campId: campId === "all" ? undefined : campId,
        search: query,
        status: "registered",
        pageSize: 5,
      })
      if (rows.length === 1) {
        await checkInRow(rows[0])
      } else {
        setMatches(rows)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setBusy(false)
    }
  }

  async function handlePick(row: RosterRow) {
    setBusy(true)
    try {
      await checkInRow(row)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setBusy(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check-in online registrant</CardTitle>
        <CardDescription>
          Lookup camper's name, M-Pesa code or phone number to instantly check them in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone, M-Pesa code"
            className="flex-1"
          />
          <Button type="submit" disabled={busy || query.trim() === ""}>
            Check in
          </Button>
        </form>

        {matches !== null && matches.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No registered camper found. They may already be checked in, or the details may not match.
          </p>
        )}

        {matches !== null && matches.length > 1 && (
          <ul className="divide-y rounded-md border text-sm">
            {matches.map((row) => (
              <li key={row.registration_id} className="flex items-center justify-between gap-3 p-2">
                <span>
                  {row.first_name} {row.last_name}
                  <span className="text-muted-foreground"> (age {row.age}, {row.campus ?? "no campus"})</span>
                </span>
                <Button size="sm" disabled={busy} onClick={() => handlePick(row)}>
                  Check in
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}