import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardTotals } from "@/lib/api/types"

const ROWS: {
  label: string
  key: keyof DashboardTotals & string
}[] = [
  { label: "Campers departed early", key: "departed" },
  { label: "Total registered campers", key: "total_registered_campers" },
  { label: "Campers present on site", key: "present_on_site" },
  { label: "Walk-in registrations", key: "walk_in_registrations" },
  { label: "Facilitators registered", key: "total_registered_facilitators" },
  { label: "Pending arrivals", key: "pending_arrivals" },
]

export function QuickSummary({ totals, loading }: { totals: DashboardTotals | null; loading: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick summary</CardTitle>
        <CardDescription>A summary of campers data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{row.label}</span>
            <span className="font-semibold">
              {loading || !totals ? "..." : totals[row.key].toLocaleString()}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}