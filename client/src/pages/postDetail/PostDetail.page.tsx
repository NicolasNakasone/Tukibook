import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { PostCard } from 'src/features/posts/PostCard'
import { Post } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const PostDetailPage = (): JSX.Element => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [currentPost, setCurrentPost] = useState<Post | null>(null)
  const [loadingPost, setLoadingPost] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await handleFetch(
          `${VITE_API_URL}${routes.postDetail.replace(':id', id || '')}`,
          {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
          }
        )
        const data = await res?.json()
        setCurrentPost(data)
      } catch (err) {
        setError('Ocurrió un error al cargar el post')
      } finally {
        setLoadingPost(false)
      }
    }

    fetchPost()
  }, [])

  if (loadingPost) return <p>Cargando post...</p>
  if (error) return <p>{error}</p>
  if (!currentPost) return <p>Post no encontrado</p>

  return (
    <main>
      <Button onClick={() => navigate(-1)}>⬅️ Atrás</Button>
      <PostCard post={currentPost} />
    </main>
  )
}
