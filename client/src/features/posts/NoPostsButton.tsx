import { Button } from 'src/components/common/Button'
import { routes } from 'src/constants/routes'

export const NoPostsButton = (): JSX.Element => {
  return (
    <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      Sin posts para mostrar 😓.{' '}
      <Button variant="link" to={routes.home}>
        Volver al inicio
      </Button>
    </p>
  )
}
