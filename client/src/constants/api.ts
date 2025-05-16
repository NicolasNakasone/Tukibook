import { routes } from 'src/constants/routes'

const { VITE_API_URL } = import.meta.env

export const handleFetch = async (
  url: RequestInfo,
  options: RequestInit = {}
): Promise<Response> => {
  const token = localStorage.getItem('accessToken')

  const finalHeaders = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  }

  let response = await fetch(url, { ...options, headers: finalHeaders })

  if (response.status === 401) {
    const refreshRes = await fetch(`${VITE_API_URL}${routes.refreshToken}`, {
      method: 'POST',
      credentials: 'include',
    })

    if (refreshRes.ok) {
      const data = await refreshRes.json()
      const newAccessToken = data.token
      localStorage.setItem('accessToken', newAccessToken)

      const retryHeaders = {
        ...(options.headers || {}),
        Authorization: `Bearer ${newAccessToken}`,
        'Content-Type': 'application/json',
      }

      response = await fetch(url, { ...options, headers: retryHeaders })
    } else {
      localStorage.removeItem('accessToken')
      if (window.location.pathname !== routes.login) {
        window.location.replace(routes.login)
      }
    }
  }

  return response
}
