import { useDispatch } from 'react-redux'
import { deletePost } from 'src/states/slices/postsSlice'
import { AppDispatch } from 'src/states/store'
import { Post } from 'src/types'

export const DeletePostButton = ({ post }: { post: Post }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDeletePost = async () => {
    await dispatch(deletePost(post.id))
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
