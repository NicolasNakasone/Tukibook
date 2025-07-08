import { createContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import {
  ApiResponse,
  ChangePasswordParams,
  ChangePasswordResponse,
  LoginParams,
  LoginResponse,
  LogoutResponse,
  ResponseError,
  User,
} from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

interface AuthContextValue {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  registerUser: (newUser: FormData) => Promise<ResponseError | undefined>
  loginUser: (loginParams: LoginParams) => Promise<ResponseError | undefined>
  logoutUser: () => Promise<ApiResponse<LogoutResponse>>
  changePassword: (
    changePasswordParams: ChangePasswordParams
  ) => Promise<ApiResponse<ChangePasswordResponse>>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setLoading(false)
      return
    }

    const fetchUser = async () => {
      try {
        const { data, error } = await handleFetch<User>(`${VITE_API_URL}${routes.me}`)

        if (error) {
          localStorage.removeItem('accessToken')
          setUser(null)
          return
        }
        setUser(data)
      } catch {
        localStorage.removeItem('accessToken')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const registerUser = async (newUser: FormData) => {
    const { error } = await handleFetch<User>(`${VITE_API_URL}${routes.register}`, {
      method: 'POST',
      body: newUser,
    })
    if (error) return error

    navigate(routes.login)
  }

  const loginUser = async (loginParams: LoginParams) => {
    const { data, error } = await handleFetch<LoginResponse>(`${VITE_API_URL}${routes.login}`, {
      method: 'POST',
      body: JSON.stringify(loginParams),
      credentials: 'include',
    })
    if (error) return error

    localStorage.setItem('accessToken', data.token)
    setUser(data.user)
    navigate(routes.home)
  }

  const logoutUser = async () => {
    const response = await handleFetch<LogoutResponse>(`${VITE_API_URL}${routes.logout}`, {
      method: 'POST',
      credentials: 'include',
    })

    if (response.data?.message) {
      localStorage.removeItem('accessToken')
      setUser(null)
      navigate(routes.login)
    }
    return response
  }

  const changePassword = async (changePasswordParams: ChangePasswordParams) => {
    return await handleFetch<ChangePasswordResponse>(`${VITE_API_URL}${routes.changePassword}`, {
      method: 'PUT',
      body: JSON.stringify(changePasswordParams),
    })
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, registerUser, loginUser, logoutUser, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  )
}
