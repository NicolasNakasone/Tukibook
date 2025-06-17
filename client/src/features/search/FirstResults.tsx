import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { ListPostResults } from 'src/features/search/ListPostResults'
import { ListUserResults } from 'src/features/search/ListUserResults'
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
    const { data } = await handleFetch<SearchAllResponse>(
      `${VITE_API_URL}${routes.search}?q=${query}&type=all&page=1&limit=2`
    )

    if (data) setResults(data)
  }

  return (
    <div>
      <ListPostResults results={results.posts} />
      <ListUserResults results={results.users} />
    </div>
  )
}
