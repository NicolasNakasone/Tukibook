import { useSearchParams } from 'react-router-dom'
import { Button } from 'src/components/common/Button'

interface MoreResultsButtonProps {
  routeToNavigate: string
}

export const MoreResultsButton = ({ routeToNavigate }: MoreResultsButtonProps): JSX.Element => {
  const [params] = useSearchParams()

  const query = params.get('q') || ''

  return (
    <Button variant="link" to={`${routeToNavigate}?q=${query}`} size="md" color="info">
      Ver más
    </Button>
  )
}
