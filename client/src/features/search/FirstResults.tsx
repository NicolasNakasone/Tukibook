import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { ListPostResults } from 'src/features/search/ListPostResults'
import { SearchAllResponse } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const FirstResults = (): JSX.Element => {
  const [params] = useSearchParams()

  const [results, setResults] = useState<Omit<SearchAllResponse, 'totalItems'>>({
    posts: [],
    users: [],
  })

  useEffect(() => {
    handleSearchAll()
  }, [])

  const query = params.get('q') || ''

  const handleSearchAll = async () => {
    const response = await handleFetch(
      `${VITE_API_URL}${routes.search}?q=${query}&type=all&page=1&limit=2`
    ).then(r => r.json())

    if (!response.message) {
      setResults(response)
    }
  }

  return (
    <div>
      <ListPostResults results={results.posts} />
      <div>
        {results.users?.map(user => {
          return (
            <div key={user.id}>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
