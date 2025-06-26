import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { ListPostResults } from 'src/features/search/ListPostResults'
import { ListUserResults } from 'src/features/search/ListUserResults'
import { PAGE_LIMIT, SearchAllResponse } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const FirstResults = (): JSX.Element => {
  const [params] = useSearchParams()

  const [results, setResults] = useState<SearchAllResponse>({
    posts: [],
    totalPosts: 0,
    users: [],
    totalUsers: 0,
  })

  useEffect(() => {
    handleSearchAll()
  }, [])

  const query = params.get('q') || ''

  const handleSearchAll = async () => {
    const { data } = await handleFetch<SearchAllResponse>(
      `${VITE_API_URL}${routes.search}?q=${query}&type=all&page=1&limit=${PAGE_LIMIT}`
    )

    if (data) setResults(data)
  }

  return (
    <>
      <ListPostResults
        results={results.posts}
        showMore={(results.posts?.length || 0) < results.totalPosts}
      />
      <ListUserResults
        results={results.users}
        showMore={(results.users?.length || 0) < results.totalUsers}
      />
    </>
  )
}
