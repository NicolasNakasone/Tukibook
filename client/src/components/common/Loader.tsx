import { ReactNode } from 'react'

import { ButtonLoader } from 'src/components/common/ButtonLoader'

interface LoaderProps {
  isLoading?: boolean
}

export const Loader = ({ isLoading = true }: LoaderProps): ReactNode => {
  if (!isLoading) return
  return (
    <p>
      Cargando
      <ButtonLoader />
    </p>
  )
}
