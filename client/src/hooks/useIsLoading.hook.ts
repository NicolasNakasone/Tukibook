import { useState } from 'react'

export const useIsLoading = (initialValue: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialValue)

  const handleIsLoading = (value: boolean) => setIsLoading(value)

  return { isLoading, handleIsLoading }
}
