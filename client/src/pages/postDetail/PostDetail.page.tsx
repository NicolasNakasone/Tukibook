import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { PostCard } from 'src/features/posts/PostCard'
import { usePosts } from 'src/hooks/usePosts.hook'

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
    <main
      style={{
        margin: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      <Button style={{ margin: '0 auto 0 0' }} onClick={() => navigate(-1)}>
        ⬅️ Atrás
      </Button>
      <PostCard post={postDetail} />
    </main>
  )
}
