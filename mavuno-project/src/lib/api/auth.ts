import { supabase } from '../supabase'
import { friendlyError } from '../errors'
import type { StaffProfile } from './types'

/* Returns the signed in person's staff record, or null if they are not active staff */
export async function fetchMyProfile(): Promise<StaffProfile | null> {
  const { data: userData } = await supabase.auth.getUser()
  const user = userData.user
  if (!user) return null

  const { data, error } = await supabase
    .from('staff_profiles')
    .select('id, full_name, access_level, is_active')
    .eq('id', user.id)
    .maybeSingle()

  if (error) throw new Error(friendlyError(error))
  if (!data || !data.is_active) return null
  return data as StaffProfile
}

export async function signIn(email: string, password: string): Promise<StaffProfile> {
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
  if (error) throw new Error(friendlyError(error))

  const profile = await fetchMyProfile()
  if (!profile) {
    await supabase.auth.signOut()
    throw new Error('This account does not have staff access. Please contact an admin.')
  }
  return profile
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut()
}

/* Sends the reset email. Add your site address to Authentication, URL Configuration first. */
export async function requestPasswordReset(email: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  if (error) throw new Error(friendlyError(error))
}

/* Used on the reset password page after the person opens the email link */
export async function setNewPassword(password: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw new Error(friendlyError(error))
}