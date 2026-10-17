import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardTotals } from "@/lib/api/types"
import { DonutChart } from "./DonutChart"

/* Replace these with the exact hex codes from the Figma charts */
const ONLINE = "#2dc5a9"
const WALK_IN = "#facc15"
const PENDING = "#2f5fa8"

export function AttendanceChart({ totals }: { totals: DashboardTotals | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campers attendance</CardTitle>
        <CardDescription>A summary of campers' check in statuses.</CardDescription>
      </CardHeader>
      <CardContent>
        <DonutChart
          centerValue={totals?.total_registered_campers ?? 0}
          centerLabel="Registered"
          slices={[
            { key: "online", label: "Online checked in", value: totals?.online_checked_in ?? 0, color: ONLINE },
            { key: "walkIn", label: "Walk in", value: totals?.walk_in_checked_in ?? 0, color: WALK_IN },
            { key: "pending", label: "Pending arrivals", value: totals?.pending_arrivals ?? 0, color: PENDING },
          ]}
        />
      </CardContent>
    </Card>
  )
}