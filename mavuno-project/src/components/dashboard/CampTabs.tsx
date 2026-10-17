import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Camp } from "@/lib/api/types"

/* Same order as the Figma: All camps, MYA, MYF */
const ORDER: Camp["category"][] = ["mya", "myf"]

export function CampTabs({
  camps,
  value,
  onChange,
}: {
  camps: Camp[]
  value: string
  onChange: (campId: string) => void
}) {
  const sorted = [...camps].sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category))

  return (
    <Tabs value={value} onValueChange={(v) => onChange(String(v))}>
      <TabsList>
        <TabsTrigger value="all">All camps</TabsTrigger>
        {sorted.map((camp) => (
          <TabsTrigger key={camp.id} value={camp.id}>
            {camp.category.toUpperCase()}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}