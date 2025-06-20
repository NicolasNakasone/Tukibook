import { ReactNode } from 'react'

import { useLoader, UseLoaderProps } from 'src/hooks/useLoader.hook'

interface ButtonLoaderProps {
  isLoading?: boolean
  loaderProps?: UseLoaderProps
}

export const ButtonLoader = ({ isLoading = true, loaderProps }: ButtonLoaderProps): ReactNode => {
  if (!isLoading) return

  const { loader } = useLoader({ loaderType: 'spin', ...loaderProps })

  return <span>{loader}</span>
}
