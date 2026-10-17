import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { issueExitPermit } from "@/lib/api/portal"
import type { Lookup, RosterRow } from "@/lib/api/types"

/* Heads only. The database refuses anyone else, even if this dialog were opened by mistake. */
export function ExitPermitDialog({
  row,
  reasons,
  onClose,
  onDone,
}: {
  row: RosterRow | null
  reasons: Lookup[]
  onClose: () => void
  onDone: () => void
}) {
  const [reasonId, setReasonId] = useState("")
  const [notes, setNotes] = useState("")
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setReasonId("")
    setNotes("")
  }, [row?.registration_id])

  const reasonName = reasons.find((r) => r.id === reasonId)?.name ?? ""
  const needsNotes = reasonName === "Other approved reason"
  const canSubmit = reasonId !== "" && (!needsNotes || notes.trim() !== "") && !busy

  async function handleSubmit() {
    if (!row || !canSubmit) return
    setBusy(true)
    try {
      await issueExitPermit(row.registration_id, reasonId, notes)
      toast.success(`Exit permit issued for ${row.first_name} ${row.last_name}`)
      onDone()
      onClose()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog
      open={row !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Issue exit permit</DialogTitle>
          <DialogDescription>
            {row ? `${row.first_name} ${row.last_name} will be marked as checked out.` : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exit-reason">Reason for departure</Label>
            <select
              id="exit-reason"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              value={reasonId}
              onChange={(e) => setReasonId(e.target.value)}
            >
              <option value="">Select a reason</option>
              {reasons.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="exit-notes">Notes{needsNotes ? " (required)" : " (optional)"}</Label>
            <Textarea id="exit-notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!canSubmit} onClick={handleSubmit}>
            Authorize departure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}