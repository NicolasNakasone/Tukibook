import { usePosts } from 'src/hooks/usePosts.hook'
import { Post } from 'src/types'

export const DeletePostButton = ({ post }: { post: Post }): JSX.Element => {
  const { deletePost } = usePosts()

  const handleDeletePost = async () => {
    await deletePost(post.id)
  }

  return (
    <button
      style={{ width: 'max-content', padding: '0.25rem', margin: '0 0 0 auto' }}
      onClick={handleDeletePost}
    >
      ❌
    </button>
  )
}
