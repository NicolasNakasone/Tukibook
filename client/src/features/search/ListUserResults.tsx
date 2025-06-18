import styles from 'src/features/search/ListResults.module.css'
import { UserCard } from 'src/features/users/UserCard'
import { SearchAllResponse } from 'tukibook-helper'

interface ListUserResultsProps {
  results: SearchAllResponse['users']
}

export const ListUserResults = ({ results }: ListUserResultsProps): JSX.Element => {
  return (
    <div className={styles.listResultsContainer}>
      {results?.map(user => {
        return <UserCard key={user.id} {...{ user }} />
      })}
    </div>
  )
}
