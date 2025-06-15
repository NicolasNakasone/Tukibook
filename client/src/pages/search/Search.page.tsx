import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { routes } from 'src/constants/routes'
import { SearchType } from 'tukibook-helper'

export const SearchPage = (): JSX.Element => {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const query = params.get('q') || ''

  const handleChangeType = (type: SearchType) => {
    if (type === 'all') {
      navigate(`${routes.search}?q=${query}`)
      return
    }
    navigate(`${routes.search}/${type}?q=${query}`)
  }

  return (
    <main>
      <h1>Resultados de busqueda: {query}</h1>
      <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Button onClick={() => handleChangeType('all')}>Todo</Button>
          <Button onClick={() => handleChangeType('posts')}>Posts</Button>
          <Button onClick={() => handleChangeType('users')}>Usuarios</Button>
        </div>
        <Outlet />
      </div>
    </main>
  )
}
