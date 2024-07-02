import { usePosts } from 'src/hooks/usePosts.hook'
import { Post } from 'src/types'

export const LikePostButton = ({ post }: { post: Post }): JSX.Element => {
  const { likePost } = usePosts()

  return (
    <button
      style={{ width: 'max-content', padding: '0.25rem 0.5rem' }}
      onClick={() => likePost(post.id)}
    >{`👍 ${post.likes || ''} ${post.likes ? (post.likes > 1 ? 'tukis' : 'tuki') : 'Tuki'}`}</button>
  )
}
