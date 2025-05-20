import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { GoBackButton } from 'src/components/common/GoBackButton'
import { PostCard } from 'src/features/posts/PostCard'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/postDetail/PostDetail.module.css'

export const PostDetailPage = (): JSX.Element => {
  const { id } = useParams()
  const { postDetail, status, getPostById } = usePosts()

  useEffect(() => {
    if (id && (!postDetail || postDetail.id !== id)) {
      getPostById(id)
    }
  }, [id, postDetail])

  if (status === 'loading') return <p>Cargando post...</p>
  if (status === 'failed') return <p>Ocurrió un error</p>
  if (!postDetail) return <p>Post no encontrado</p>

  return (
    <main className={styles.postDetailMainContainer}>
      <GoBackButton />
      <PostCard post={postDetail} />
    </main>
  )
}
