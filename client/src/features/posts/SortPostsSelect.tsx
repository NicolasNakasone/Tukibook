import { Button } from 'src/components/common/Button'
import { usePosts } from 'src/hooks/usePosts.hook'
import { SortType } from 'tukibook-helper'

export const SortPostsSelect = (): JSX.Element => {
  const { setFilters, filters } = usePosts()

  const handleSetSort = (sort: SortType) => setFilters({ ...filters, sort })

  return (
    <div
      style={{ margin: '0 0 0 auto', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
    >
      <p>Ordenar posts</p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button onClick={() => handleSetSort(SortType.NEWEST)}>Mas recientes</Button>
        <Button onClick={() => handleSetSort(SortType.OLDEST)}>Mas antiguos</Button>
      </div>
    </div>
  )
}
