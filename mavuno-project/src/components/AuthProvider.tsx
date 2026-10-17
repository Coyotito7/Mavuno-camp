import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { supabase } from '@/lib/supabase'
import { fetchMyProfile } from '@/lib/api/auth'
import type { StaffProfile } from '@/lib/api/types'

interface AuthState {
  loading: boolean
  profile: StaffProfile | null
  isHead: boolean
}

const AuthContext = createContext<AuthState>({ loading: true, profile: null, isHead: false })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null)
  const [profile, setProfile] = useState<StaffProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null)
      if (!data.session) setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    let cancelled = false
    if (!userId) {
      setProfile(null)
      setLoading(false)
      return
    }
    setLoading(true)
    fetchMyProfile()
      .then((p) => {
        if (!cancelled) {
          setProfile(p)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProfile(null)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [userId])

  const isHead = profile?.access_level === 'head' || profile?.access_level === 'admin'

  return <AuthContext.Provider value={{ loading, profile, isHead }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
  return useContext(AuthContext)
}

/*
  Wrap portal pages with this. It only controls what people SEE.
  The real protection is in the database, which refuses anything a person is not allowed to do.
*/
export function RequireStaff({ children, headOnly = false }: { children: ReactNode; headOnly?: boolean }) {
  const { loading, profile, isHead } = useAuth()
  const location = useLocation()

  if (loading) return <p style={{ padding: 24 }}>Loading...</p>
  if (!profile) return <Navigate to="/login" state={{ from: location }} replace />
  if (headOnly && !isHead) return <p style={{ padding: 24 }}>Only facilitator heads can open this page.</p>
  return <>{children}</>
}