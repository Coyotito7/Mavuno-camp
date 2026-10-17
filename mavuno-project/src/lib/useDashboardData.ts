import { useCallback, useEffect, useState } from "react"
import { fetchAllDashboards, fetchRoster, sumDashboards } from "@/lib/api/portal"
import type { RosterFilters } from "@/lib/api/portal"
import type { DashboardTotals, RosterRow } from "@/lib/api/types"

/* Numbers for the cards and charts. Pass "all" for the All camps tab, or a camp id. */
export function useDashboardTotals(campId: string) {
  const [totals, setTotals] = useState<DashboardTotals | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchAllDashboards()
      .then((rows) => {
        if (cancelled) return
        const selected = campId === "all" ? rows : rows.filter((r) => r.camp_id === campId)
        setTotals(sumDashboards(selected))
        setLoading(false)
      })
      .catch((e: Error) => {
        if (cancelled) return
        setError(e.message)
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [campId, version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])
  return { totals, loading, error, reload }
}

/* The roster table: search, campus, status and page all feed in through filters */
export function useRoster(filters: RosterFilters) {
  const [rows, setRows] = useState<RosterRow[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [version, setVersion] = useState(0)
  const key = JSON.stringify(filters)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchRoster(JSON.parse(key) as RosterFilters)
      .then((result) => {
        if (cancelled) return
        setRows(result.rows)
        setTotal(result.total)
        setLoading(false)
      })
      .catch((e: Error) => {
        if (cancelled) return
        setError(e.message)
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [key, version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])
  return { rows, total, loading, error, reload }
}

/* Waits until the person stops typing, so the search does not hit the database on every key */
export function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(id)
  }, [value, delayMs])
  return debounced
}