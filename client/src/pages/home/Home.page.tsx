import { FormEvent, useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { routes } from 'src/constants/routes'
import { AddPostForm } from 'src/features/posts/AddPostForm'
import { PostFeed } from 'src/features/posts/PostFeed'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/home/Home.module.css'

export const HomePage = (): JSX.Element => {
  const { posts, status, setPartialState, currentPage, getPosts, resetPostsState } = usePosts()

  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Carga inicial
  useEffect(() => {
    if (currentPage !== pathname) {
      resetPostsState()
      setPartialState({ filters: {}, currentPage: pathname })
      getPosts({ page: 1, filters: {} })
    }
  }, [pathname])

  const handleNavigateToSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const search = target[0] as HTMLInputElement

    navigate(`${routes.search}?q=${search.value}`)
    target.reset()
  }

  return (
    <main className={styles.homeMainContainer}>
      {!(status === 'loading' && posts.length === 0) && <AddPostForm />}
      <form
        style={{ width: '80%', display: 'flex', justifyContent: 'space-between', gap: '2rem' }}
        onSubmit={handleNavigateToSearch}
      >
        <input type="text" placeholder="Buscá un post..." style={{ width: '100%' }} />
        <Button variant="outline" size="md" type="submit" style={{ textWrap: 'nowrap' }}>
          🔍 Buscar
        </Button>
      </form>
      <PostFeed />
    </main>
  )
}
