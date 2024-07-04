import { useDispatch } from 'react-redux'
import { likePost } from 'src/states/slices/postsSlice'
import { AppDispatch } from 'src/states/store'
import { Post } from 'src/types'

export const LikePostButton = ({ post }: { post: Post }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>()

  const handleLikePost = async () => {
    await dispatch(likePost(post.id))
  }

  return (
    <button
      style={{ width: 'max-content', padding: '0.25rem 0.5rem' }}
      onClick={handleLikePost}
    >{`👍 ${post.likes || ''} ${post.likes ? (post.likes > 1 ? 'tukis' : 'tuki') : 'Tuki'}`}</button>
  )
}
