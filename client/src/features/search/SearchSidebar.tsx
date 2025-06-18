import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { routes } from 'src/constants/routes'
import styles from 'src/features/search/SearchSidebar.module.css'
import { isActiveRoute } from 'src/utils/search'
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
    <div className={styles.sidebarContainer}>
      <h2>Filtros</h2>
      <Button
        size="md"
        width="full"
        className={`${styles.searchFilterButton}${isActiveRoute(SearchType.ALL) ? ` ${styles.activeButton}` : ''}`}
        onClick={() => handleChangeType(SearchType.ALL)}
      >
        Todo
      </Button>
      <Button
        size="md"
        width="full"
        className={`${styles.searchFilterButton} ${isActiveRoute(SearchType.POSTS) ? ` ${styles.activeButton}` : ''}`}
        onClick={() => handleChangeType(SearchType.POSTS)}
      >
        Posts
      </Button>
      <Button
        size="md"
        width="full"
        className={`${styles.searchFilterButton} ${isActiveRoute(SearchType.USERS) ? ` ${styles.activeButton}` : ''}`}
        onClick={() => handleChangeType(SearchType.USERS)}
      >
        Usuarios
      </Button>
    </div>
  )
}
