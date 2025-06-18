import { Loader } from 'src/components/common/Loader'
import styles from 'src/features/search/ListResults.module.css'
import { UserCard } from 'src/features/users/UserCard'
import { useSearch } from 'src/hooks/useSearch.hook'
import { SearchAllResponse } from 'tukibook-helper'

interface ListUserResultsProps {
  results: SearchAllResponse['users']
}

export const ListUserResults = ({ results }: ListUserResultsProps): JSX.Element => {
  const { status } = useSearch()

  return (
    <div className={styles.listResultsContainer}>
      {results?.map(user => {
        return <UserCard key={user.id} {...{ user }} />
      })}
      <Loader isLoading={status === 'loading'} />
    </div>
  )
}
