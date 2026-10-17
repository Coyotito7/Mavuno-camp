import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardTotals } from "@/lib/api/types"
import { DonutChart } from "./DonutChart"

/* Replace these with the exact hex codes from the Figma charts */
const MALE = "#2f5fa8"
const FEMALE = "#2dc5a9"

export function GenderChart({ totals }: { totals: DashboardTotals | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Checked-in campers by gender</CardTitle>
        <CardDescription>A summary of male and female campers on site.</CardDescription>
      </CardHeader>
      <CardContent>
        <DonutChart
          centerValue={totals?.present_on_site ?? 0}
          centerLabel="Present"
          slices={[
            { key: "male", label: "Male", value: totals?.present_male ?? 0, color: MALE },
            { key: "female", label: "Female", value: totals?.present_female ?? 0, color: FEMALE },
          ]}
        />
      </CardContent>
    </Card>
  )
}