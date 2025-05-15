import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { PostCard } from 'src/features/posts/PostCard'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/postDetail/PostDetail.module.css'

export const PostDetailPage = (): JSX.Element => {
  const { id } = useParams()
  const navigate = useNavigate()
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
      <Button className={styles.goBackButton} onClick={() => navigate(-1)}>
        ⬅️ Atrás
      </Button>
      <PostCard post={postDetail} />
    </main>
  )
}
