import { supabase } from "@/lib/supabase"
import type { Camp, Campus, FacilitatorRole, DepartureReason } from "./types"

export async function fetchCamps(): Promise<Camp[]> {
  const { data, error } = await supabase
    .from("camps")
    .select("*")
    .order("start_date", { ascending: true })

  if (error) throw new Error(error.message)
  return data as Camp[]
}

export async function fetchCampById(id: string): Promise<Camp | null> {
  const { data, error } = await supabase
    .from("camps")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data as Camp | null
}

export async function fetchCampByCategory(category: "myf" | "mya"): Promise<Camp | null> {
  const { data, error } = await supabase
    .from("camps")
    .select("*")
    .eq("category", category)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data as Camp | null
}

export async function fetchCampuses(): Promise<Campus[]> {
  const { data, error } = await supabase
    .from("campuses")
    .select("*")
    .order("name")

  if (error) throw new Error(error.message)
  return data as Campus[]
}

export async function fetchFacilitatorRoles(): Promise<FacilitatorRole[]> {
  const { data, error } = await supabase
    .from("facilitator_roles")
    .select("*")
    .order("name")

  if (error) throw new Error(error.message)
  return data as FacilitatorRole[]
}

export async function fetchDepartureReasons(): Promise<DepartureReason[]> {
  const { data, error } = await supabase
    .from("departure_reasons")
    .select("*")
    .order("name")

  if (error) throw new Error(error.message)
  return data as DepartureReason[]
}