import { Loader } from 'src/components/common/Loader'
import { routes } from 'src/constants/routes'
import styles from 'src/features/search/ListResults.module.css'
import { MoreResultsButton } from 'src/features/search/MoreResultsButton'
import { UserCard } from 'src/features/users/UserCard'
import { useSearch } from 'src/hooks/useSearch.hook'
import { SearchAllResponse } from 'tukibook-helper'

interface ListUserResultsProps {
  results: SearchAllResponse['users']
  showMore?: boolean
}

export const ListUserResults = ({ results, showMore }: ListUserResultsProps): JSX.Element => {
  const { status } = useSearch()

  return (
    <div className={styles.listResultsContainer}>
      {results?.map(user => {
        return <UserCard key={user.id} {...{ user }} />
      })}
      {showMore && <MoreResultsButton routeTo={routes.searchUsers} />}
      <Loader isLoading={status === 'loading'} />
    </div>
  )
}
