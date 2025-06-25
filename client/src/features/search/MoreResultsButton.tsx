import { ReactNode } from 'react'

import { useSearchParams } from 'react-router-dom'
import { Button } from 'src/components/common/Button'

interface MoreResultsButtonProps {
  routeTo: string
  showMore: boolean
}

export const MoreResultsButton = ({ routeTo, showMore }: MoreResultsButtonProps): ReactNode => {
  if (!showMore) return null

  const [params] = useSearchParams()

  const query = params.get('q') || ''

  return (
    <Button variant="link" to={`${routeTo}?q=${query}`} size="md" color="info">
      Ver más
    </Button>
  )
}
