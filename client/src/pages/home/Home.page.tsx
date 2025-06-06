import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { AddPostForm } from 'src/features/posts/AddPostForm'
import { PostFeed } from 'src/features/posts/PostFeed'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/home/Home.module.css'

export const HomePage = (): JSX.Element => {
  const { posts, status, setPartialState, currentPage, getPosts, resetPostsState } = usePosts()

  const { pathname } = useLocation()

  // Carga inicial
  useEffect(() => {
    if (currentPage !== pathname) {
      resetPostsState()
      setPartialState({ filters: {}, currentPage: pathname as '' | '/' | '/profile' | undefined })
      getPosts({ page: 1, filters: {} })
    }
  }, [pathname])

  return (
    <main className={styles.homeMainContainer}>
      {!(status === 'loading' && posts.length === 0) && <AddPostForm />}
      <form
        style={{ width: '80%', display: 'flex', justifyContent: 'space-between', gap: '2rem' }}
        onSubmit={e => {
          e.preventDefault()
          const target = e.target as HTMLFormElement

          const search = target[0] as HTMLInputElement

          console.log({ search: search.value })

          const filteredPosts = posts.filter(post =>
            post.content.toLowerCase().includes(search.value.toLowerCase())
          )
          // console.log(filteredPosts.map(post => ({ id: post.id, content: post.content })))
          console.log(filteredPosts)
          setPartialState({ posts: filteredPosts })
          target.reset()
        }}
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
