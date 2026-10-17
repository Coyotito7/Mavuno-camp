import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function WalkInCard({ onOpen }: { onOpen: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Walk-in registration</CardTitle>
        <CardDescription>
          Capture full camper details. Walk-ins are auto-checked in on successful payment verification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={onOpen}>
          Open walk-in registration form
        </Button>
      </CardContent>
    </Card>
  )
}