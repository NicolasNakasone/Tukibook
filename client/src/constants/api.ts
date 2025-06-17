import { routes } from 'src/constants/routes'
import { ApiResponse } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

// Usar para evitar hacer un refetch en cualquier status 401
// const responseErrors = ['Usuario no encontrado', 'No autorizado']

interface HandleFetchProps {
  <T = any>(
    url: RequestInfo,
    options?: RequestInit,
    filters?: Record<string, any> | null,
    throwOnError?: boolean
  ): Promise<ApiResponse<T>>
}

export const handleFetch: HandleFetchProps = async (
  url,
  options = {},
  filters = null,
  throwOnError = false
) => {
  const token = localStorage.getItem('accessToken')

  const isFormData = options.body instanceof FormData

  const finalHeaders = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
  }

  const fullURL = filters ? `${url}${buildQueryString({}, filters)}` : url

  let response = await fetch(fullURL, { ...options, headers: finalHeaders })

  if (response.status === 401) {
    const refreshRes = await fetch(`${VITE_API_URL}${routes.refreshToken}`, {
      method: 'POST',
      credentials: 'include',
    })

    if (refreshRes.ok) {
      const data = await refreshRes.json()
      const newAccessToken = data.token
      localStorage.setItem('accessToken', newAccessToken)

      finalHeaders.Authorization = `Bearer ${newAccessToken}`

      response = await fetch(fullURL, { ...options, headers: finalHeaders })
    } else {
      localStorage.removeItem('accessToken')
      if (window.location.pathname !== routes.login) {
        window.location.replace(routes.login)
      }
    }
  }

  let parsedResponse
  try {
    parsedResponse = await response.json()
  } catch (err) {
    // Por si el backend devuelve algo no JSON
    return {
      error: { message: 'Respuesta no válida del servidor' },
    }
  }

  if (response.ok) return { data: parsedResponse }

  const message = parsedResponse?.message || 'Error en la solicitud'

  if (throwOnError) throw new Error(message)
  return { error: { message } }
}

type QueryParams = {
  page?: number
  limit?: number
  [key: string]: any // Para permitir filtros como userId, search, etc.
}

export const buildQueryString = (params: QueryParams = {}, filters?: Record<string, any>) => {
  const query = new URLSearchParams()

  // Agregar params simples (como page, limit)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value))
    }
  })

  // Agregar filtros como stringificado si existen
  if (filters && Object.keys(filters).length > 0) {
    query.append('filters', JSON.stringify(filters))
  }

  const queryString = query.toString()
  // No retorno el string comenzando con ? porque ya forman parte de filtros
  // return queryString ? `?${queryString}` : ''
  return queryString ? `&${queryString}` : ''
}
