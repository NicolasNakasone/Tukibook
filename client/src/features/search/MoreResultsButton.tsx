import { useSearchParams } from 'react-router-dom'
import { Button } from 'src/components/common/Button'

interface MoreResultsButtonProps {
  routeTo: string
}

export const MoreResultsButton = ({ routeTo }: MoreResultsButtonProps): JSX.Element => {
  const [params] = useSearchParams()

  const query = params.get('q') || ''

  return (
    <Button variant="link" to={`${routeTo}?q=${query}`} size="md" color="info">
      Ver más
    </Button>
  )
}
