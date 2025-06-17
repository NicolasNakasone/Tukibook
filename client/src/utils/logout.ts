import { NavigateFunction } from 'react-router-dom'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { LogoutResponse, User } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const handleLogout = async (
  setUser: (user: User | null) => void,
  navigate: NavigateFunction
) => {
  const { error } = await handleFetch<LogoutResponse>(`${VITE_API_URL}${routes.logout}`, {
    method: 'POST',
    credentials: 'include',
  })
  if (error) return

  localStorage.removeItem('accessToken')
  setUser(null)
  navigate(routes.login)
}
