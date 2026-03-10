import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const AuthCtx = createContext(null)

/* Demo users mapping: email → role */
const ROLE_MAP = {
  'colaborador@humand.demo': 'colaborador',
  'manager@humand.demo':     'manager',
  'hr@humand.demo':          'hr',
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [role, setRole]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session?.user?.email) {
        setRole(ROLE_MAP[data.session.user.email] || 'colaborador')
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user?.email) {
        setRole(ROLE_MAP[session.user.email] || 'colaborador')
      } else {
        setRole(null)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setRole(null)
  }

  // Allow switching role without re-login (for demo / hackathon purposes)
  const switchRole = (newRole) => setRole(newRole)

  return (
    <AuthCtx.Provider value={{ session, role, loading, signIn, signOut, switchRole }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)
