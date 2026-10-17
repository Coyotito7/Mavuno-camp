import { Label, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

export interface Slice {
  key: string
  label: string
  value: number
  color: string
}

/* A donut with a number in the middle and a legend underneath. Used by both charts. */
export function DonutChart({
  slices,
  centerValue,
  centerLabel,
}: {
  slices: Slice[]
  centerValue: number
  centerLabel: string
}) {
  const config: ChartConfig = Object.fromEntries(
    slices.map((s) => [s.key, { label: s.label, color: s.color }]),
  )
  const sum = slices.reduce((total, s) => total + s.value, 0)

  /* With no data at all, draw a plain grey ring instead of an empty box */
  const data =
    sum === 0
      ? [{ key: "empty", label: "No data", value: 1, fill: "var(--muted)" }]
      : slices.map((s) => ({ key: s.key, label: s.label, value: s.value, fill: `var(--color-${s.key})` }))

  return (
    <div className="space-y-4">
      <ChartContainer config={config} className="mx-auto aspect-square max-h-[220px]">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie data={data} dataKey="value" nameKey="key" innerRadius={62} strokeWidth={4}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
                        {centerValue.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 20} className="fill-muted-foreground text-xs">
                        {centerLabel}
                      </tspan>
                    </text>
                  )
                }
                return null
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {slices.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}: <strong className="text-foreground">{s.value.toLocaleString()}</strong>
          </span>
        ))}
      </div>
    </div>
  )
}