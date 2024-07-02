import tukibookLogo from 'public/tuki.webp'
import { SeeMoreButton } from 'src/components/common/SeeMoreButton'
import { AddCommentForm } from 'src/features/comments/AddCommentForm'
import { CommentCard } from 'src/features/comments/CommentCard'
import { DeletePostButton } from 'src/features/posts/DeletePostButton'
import { LikePostButton } from 'src/features/posts/LikePostButton'
import { Post } from 'src/types'

interface PostCardProps {
  post: Post
}

export const PostCard = ({ post }: PostCardProps): JSX.Element => {
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
      <PostCardHeader {...{ post }} />
      <PostCardContent {...{ post }} />
      <LikePostButton {...{ post }} />
      <PostCardComments {...{ post }} />
      <AddCommentForm {...{ post }} />
    </div>
  )
}

const PostCardHeader = ({ post }: { post: Post }): JSX.Element => {
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
      <DeletePostButton {...{ post }} />
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

const PostCardComments = ({ post }: { post: Post }): JSX.Element | boolean => {
  return (
    Boolean(post.comments.length) && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {post.comments.map(comment => {
          return <CommentCard key={comment.id} {...{ comment, post }} />
        })}
      </div>
    )
  )
}
