import tukibookLogo from 'public/tuki.webp'
import { usePosts } from 'src/hooks/usePosts'
import { Post } from 'src/types'

export const PostCardHeader = ({ post }: { post: Post }): JSX.Element => {
  const { deletePost } = usePosts()

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <h2
        style={{
          margin: '1rem 0 0',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <img
          src={tukibookLogo}
          alt={`${post.username}'s profile picture`}
          style={{
            width: '2.5rem',
            height: '2.5rem',
            backgroundColor: 'CanvasText',
            borderRadius: '50%',
          }}
        />
        {post.username}
      </h2>
      <button
        style={{ width: 'max-content', padding: '0.25rem', margin: '0 0 0 auto' }}
        onClick={() => deletePost(post.id)}
      >
        ❌
      </button>
    </div>
  )
}
