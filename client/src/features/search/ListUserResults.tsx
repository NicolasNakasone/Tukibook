import styles from 'src/features/search/ListResults.module.css'
import { SearchAllResponse } from 'tukibook-helper'

interface ListUserResultsProps {
  results: SearchAllResponse['users']
}

export const ListUserResults = ({ results }: ListUserResultsProps): JSX.Element => {
  return (
    <div className={styles.listResultsContainer}>
      {results?.map(user => {
        return (
          <div key={user.id} style={{ height: '20rem', border: '1px solid CanvasText' }}>
            <p>Nombre: {user.username}</p>
            <p>Correo: {user.email}</p>
          </div>
        )
      })}
    </div>
  )
}
