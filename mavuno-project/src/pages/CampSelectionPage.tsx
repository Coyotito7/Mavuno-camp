import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CampCard } from "@/components/CampCard"
import type { Camp } from "@/lib/api/types"

// TEMPORARY: hardcoded fake data so we can see the page render.
// We will replace this with a Supabase call once the DB is connected.
const FAKE_CAMPS: Camp[] = [
  {
    id: "1",
    name: "MYF: Mavuno Young & Fearless",
    category: "myf",
    start_date: "2026-12-02",
    end_date: "2026-12-05",
    min_age: 14,
    max_age: 17,
    fee_online: 1000,
    fee_walk_in: 2000,
    registration_open: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "MYA: Mavuno Young Adults",
    category: "mya",
    start_date: "2026-11-26",
    end_date: "2026-11-29",
    min_age: 18,
    max_age: null,
    fee_online: 1000,
    fee_walk_in: 2000,
    registration_open: true,
    created_at: new Date().toISOString(),
  },
]

export default function CampSelectionPage() {
  const sorted = [...FAKE_CAMPS].sort(
    (a, b) =>
      (a.category === "myf" ? 0 : 1) - (b.category === "myf" ? 0 : 1)
  )

  return (
    <div className="flex min-h-svh flex-col items-center px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 w-full max-w-3xl space-y-6 text-center">
        <img
          src="/assets/camp-fearless-logo.png"
          alt="Camp Fearless"
          className="mx-auto h-20 w-auto"
        />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome to Mavuno Camp Fearless
        </h1>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Please select the appropriate camp based on the attendee's age group
          to begin registration. Camps are tailored for specific life stages.
        </p>
      </header>

      <div className="mb-12 grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {sorted.map((camp) => (
          <CampCard key={camp.id} camp={camp} />
        ))}
      </div>

      <footer className="flex flex-col items-center space-y-4 text-center">
        <Button variant="outline">
          <FileText className="size-4" />
          View camp requirements
          <ArrowRight className="size-4" />
        </Button>
        <p className="text-sm text-muted-foreground">
          Learn about what to bring, what to expect, and other important
          details.
        </p>
      </footer>
    </div>
  )
}