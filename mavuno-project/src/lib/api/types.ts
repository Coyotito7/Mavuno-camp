export type Camp = {
  id: string
  name: string
  category: "myf" | "mya"
  start_date: string
  end_date: string
  min_age: number
  max_age: number | null
  fee_online: number
  fee_walk_in: number
  registration_open: boolean
  created_at: string
}

export type Campus = {
  id: string
  name: string
  created_at: string
}

export type FacilitatorRole = {
  id: string
  name: string
  created_at: string
}

export type DepartureReason = {
  id: string
  name: string
  created_at: string
}

export type Contact = {
  id: string
  first_name: string
  last_name: string
  phone: string
  contact_type: "guardian" | "emergency"
  created_at: string
}

export type StaffProfile = {
  id: string
  full_name: string
  phone: string | null
  access_level: "facilitator" | "head" | "admin"
  is_active: boolean
  created_at: string
}

export type RegistrationBatch = {
  id: string
  camp_id: string
  contact_id: string
  relationship_to_campers: string
  source: "online" | "walk_in"
  registered_by: string | null
  total_amount: number
  created_at: string
}

export type Registration = {
  id: string
  batch_id: string
  participant_type: "camper" | "facilitator"
  first_name: string
  last_name: string
  age: number
  gender: "male" | "female"
  phone: string | null
  email: string | null
  wants_baptism: boolean
  from_mavuno: boolean | null
  campus_id: string | null
  church_name: string | null
  facilitator_role_id: string | null
  has_medical_condition: boolean
  medical_details: string | null
  has_special_needs: boolean
  special_needs_details: string | null
  created_at: string
}

export type Payment = {
  id: string
  batch_id: string
  mpesa_receipt: string | null
  amount: number
  status: "pending" | "success" | "failed" | "waiver_requested" | "waiver_approved"
  waiver_approved_by: string | null
  recorded_by: string | null
  created_at: string
}

export type Attendance = {
  id: string
  registration_id: string
  checked_in_at: string
  checked_in_by: string
  checked_out_at: string | null
  departure_reason_id: string | null
  departure_authorized_by: string | null
  notes: string | null
}