import { SearchFilterButton } from 'src/features/search/SearchFilterButton'
import styles from 'src/features/search/SearchSidebar.module.css'
import { SearchType } from 'tukibook-helper'

export const SearchSidebar = (): JSX.Element => {
  return (
    <div className={styles.sidebarContainer}>
      <h2 className={styles.sidebarTitle}>Filtros</h2>
      <SearchFilterButton searchType={SearchType.ALL} />
      <SearchFilterButton searchType={SearchType.POSTS} />
      <SearchFilterButton searchType={SearchType.USERS} />
    </div>
  )
}
