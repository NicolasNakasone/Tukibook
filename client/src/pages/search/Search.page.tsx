import { Outlet, useSearchParams } from 'react-router-dom'
import { SearchSidebar } from 'src/features/search/SearchSidebar'

export const SearchPage = (): JSX.Element => {
  const [params] = useSearchParams()

  const query = params.get('q') || ''

  return (
    <main>
      <h1>{`Resultados de búsqueda: "${query}"`}</h1>
      <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <SearchSidebar />
        <Outlet />
      </div>
    </main>
  )
}
