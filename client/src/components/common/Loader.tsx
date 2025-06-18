import { ReactNode } from 'react'

interface LoaderProps {
  isLoading?: boolean
}

export const Loader = ({ isLoading = true }: LoaderProps): ReactNode => {
  if (!isLoading) return
  return <p>Cargando...</p>
}
