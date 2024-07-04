import { usePosts } from 'src/hooks/usePosts.hook'
import { Post } from 'src/types'

export const LikePostButton = ({ post }: { post: Post }): JSX.Element => {
  const { likePost } = usePosts()

  const handleLikePost = async () => {
    await likePost(post.id)
  }

  return (
    <button
      style={{ width: 'max-content', padding: '0.25rem 0.5rem' }}
      onClick={handleLikePost}
    >{`👍 ${post.likes || ''} ${post.likes ? (post.likes > 1 ? 'tukis' : 'tuki') : 'Tuki'}`}</button>
  )
}
