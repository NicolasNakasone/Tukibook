import { createContext, useEffect, useState } from 'react'

import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { User } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

interface AuthContextValue {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setLoading(false)
      return
    }

    const fetchUser = async () => {
      try {
        const res = await handleFetch(`${VITE_API_URL}${routes.me}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const data = await res?.json()

        if (!data.id) {
          localStorage.removeItem('accessToken')
          setUser(null)
        } else {
          setUser(data)
        }
      } catch {
        localStorage.removeItem('accessToken')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return <AuthContext.Provider value={{ user, loading, setUser }}>{children}</AuthContext.Provider>
}
