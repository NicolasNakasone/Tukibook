import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { routes } from 'src/constants/routes'
import styles from 'src/features/search/SearchFilterButton.module.css'
import { isActiveRoute } from 'src/utils/search'
import { SearchType } from 'tukibook-helper'

interface SearchFilterButtonProps {
  searchType: SearchType
}

type TypeKeys = {
  [type in SearchType]: {
    title: string
    routeTo: string
  }
}

const typeKeys: TypeKeys = {
  all: { title: 'Todo', routeTo: routes.search },
  posts: { title: 'Posts', routeTo: routes.searchPosts },
  users: { title: 'Usuarios', routeTo: routes.searchUsers },
}

export const SearchFilterButton = ({ searchType }: SearchFilterButtonProps): JSX.Element => {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const query = params.get('q') || ''

  const currentType = typeKeys[searchType]

  const handleChangeType = () => navigate(`${currentType.routeTo}?q=${query}`)

  return (
    <Button
      size="md"
      width="full"
      className={`${styles.searchFilterButton}${isActiveRoute(searchType) ? ` ${styles.activeButton}` : ''}`}
      onClick={() => handleChangeType()}
    >
      {currentType.title}
    </Button>
  )
}
