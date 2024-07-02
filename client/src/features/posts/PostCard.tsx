import tukibookLogo from 'public/tuki.webp'
import { SeeMoreButton } from 'src/components/common/SeeMoreButton'
import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/home/Home.module.css'
import { Post } from 'src/types'

interface PostCardProps {
  post: Post
}

export const PostCard = ({ post }: PostCardProps): JSX.Element => {
  const { deletePost, likePost } = usePosts()

  return (
    <div
      key={post.id}
      style={{
        width: '40vw',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        border: '1px solid CanvasText',
        borderRadius: '0.25rem',
        padding: '2rem 1.5rem',
      }}
    >
      {/* Cambiar mas adelante a un menu tipo tooltip con tres puntos
    para mostrar opciones como borrar el post o cosas asi
  */}
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
      <PostCardContent {...{ post }} />
      <button
        style={{ width: 'max-content', padding: '0.25rem 0.5rem' }}
        onClick={() => likePost(post.id)}
      >{`👍 ${post.likes || ''} ${post.likes ? (post.likes > 1 ? 'tukis' : 'tuki') : 'Tuki'}`}</button>
      {Boolean(post.comments.length) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {post.comments.map(comment => {
            return (
              <div key={comment.id} style={{ display: 'flex', gap: '0.5rem' }}>
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
                <p
                  style={{
                    margin: '0.25rem 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  <span>{comment.username}</span>
                  <span style={{ fontWeight: 400 }}>
                    {comment.content.length <= 100 ? (
                      comment.content
                    ) : (
                      <SeeMoreButton content={comment.content} />
                    )}
                  </span>
                </p>
              </div>
            )
          })}
        </div>
      )}
      <input type="text" placeholder="Comentar..." className={styles.commentInput} />
    </div>
  )
}

const PostCardContent = ({ post }: { post: Post }): JSX.Element => {
  return post.content.length <= 200 ? (
    <p style={{ padding: '1rem 0', margin: '1rem 0' }}>{post.content}</p>
  ) : (
    <SeeMoreButton content={post.content} />
  )
}
