import { useLocation, Navigate } from 'react-router-dom'
import { routes } from 'src/constants/routes'
import { useAuth } from 'src/hooks/useAuth.hook'

export const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth()
  const { pathname } = useLocation()

  const isAuthenticated = !!user

  if (loading) return <p>Cargando...</p>
  // console.log({ user, pathname })
  if (!isAuthenticated && pathname !== routes.login) {
    return <Navigate to={routes.login} replace />
  }

  if (isAuthenticated && pathname === routes.login) {
    return <Navigate to={routes.home} replace />
  }

  return children
}
