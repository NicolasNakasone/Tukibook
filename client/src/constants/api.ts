import { routes } from 'src/constants/routes'

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

  const response = await fetch(url, {
    ...options,
    headers: finalHeaders,
  })

  if (response.status === 401) {
    localStorage.removeItem('accessToken')

    if (window.location.pathname !== routes.login) {
      window.location.replace(routes.login)
    }
  }

  return response
}
