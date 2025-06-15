import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { routes } from 'src/constants/routes'
import { SearchType } from 'tukibook-helper'

export const SearchSidebar = (): JSX.Element => {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Button onClick={() => handleChangeType(SearchType.ALL)}>Todo</Button>
      <Button onClick={() => handleChangeType(SearchType.POSTS)}>Posts</Button>
      <Button onClick={() => handleChangeType(SearchType.USERS)}>Usuarios</Button>
    </div>
  )
}
