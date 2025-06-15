import { useEffect, useState } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { FirstResults } from 'src/features/search/FirstResults'
import { SearchAllResponse, SearchType } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const SearchPage = (): JSX.Element => {
  const [params] = useSearchParams()

  const [type, setType] = useState<SearchType>('all')
  const [results, setResults] = useState<Omit<SearchAllResponse, 'totalItems'>>({
    posts: [],
    users: [],
  })
  const navigate = useNavigate()

  useEffect(() => {
    handleSearchAll(type)
  }, [type])

  const query = params.get('q') || ''

  const handleSearchAll = async (type: SearchType) => {
    const response = await handleFetch(
      `${VITE_API_URL}${routes.search}?q=${query}&type=${type}&page=1&limit=2`
    ).then(r => r.json())

    if (!response.message) {
      setResults(response)
    }
  }

  const handleChangeType = (type: SearchType) => {
    setType(type)
    if (type === 'all') {
      navigate(`${routes.search}?q=${query}`)
      return
    }
    navigate(`${routes.search}/${type}?q=${query}`)
  }

  return (
    <main>
      <h1>Resultados de busqueda: {query}</h1>
      <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Button onClick={() => handleChangeType('all')}>Todo</Button>
          <Button onClick={() => handleChangeType('posts')}>Posts</Button>
          <Button onClick={() => handleChangeType('users')}>Usuarios</Button>
        </div>
        <FirstResults {...{ results }} />
      </div>
    </main>
  )
}
