import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { PostCard } from 'src/features/posts/PostCard'
import { Post, SearchType, User } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const SearchPage = (): JSX.Element => {
  const [params] = useSearchParams()

  const [type, setType] = useState<SearchType>('all')
  const [results, setResults] = useState<{ posts: Post[]; users: User[] }>({
    posts: [],
    users: [],
  })

  const query = params.get('q') || ''

  useEffect(() => {
    handleSearchAll(type)
  }, [type])

  const handleSearchAll = async (type: SearchType) => {
    const response = await handleFetch(
      `${VITE_API_URL}${routes.search}?q=${query}&type=${type}&page=1&limit=2`
    ).then(r => r.json())

    if (!response.message) {
      setResults(response)
    }
  }

  results
  return (
    <main>
      <h1>Resultados de busqueda: {query}</h1>
      <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Button onClick={() => setType('all')}>Todo</Button>
          <Button onClick={() => setType('posts')}>Posts</Button>
          <Button onClick={() => setType('users')}>Usuarios</Button>
        </div>
        <div>
          <div>
            {results.posts?.map(post => {
              return <PostCard key={post.id} {...{ post }} />
            })}
          </div>
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
      </div>
    </main>
  )
}
