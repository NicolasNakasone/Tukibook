import { Outlet, useSearchParams } from 'react-router-dom'
import { SearchSidebar } from 'src/features/search/SearchSidebar'
import styles from 'src/pages/search/Search.module.css'

export const SearchPage = (): JSX.Element => {
  const [params] = useSearchParams()

  const query = params.get('q') || ''

  return (
    <main className={styles.searchMainContainer}>
      <h2>{`Resultados de búsqueda: "${query}"`}</h2>
      <div className={styles.searchContainer}>
        <SearchSidebar />
        <div className={styles.resultsContainer}>
          <Outlet />
        </div>
      </div>
    </main>
  )
}
