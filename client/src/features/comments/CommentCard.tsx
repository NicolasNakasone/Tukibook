import tukibookLogo from 'public/tuki.webp'
import { SeeMoreButton } from 'src/components/common/SeeMoreButton'
import { Comment, Post } from 'src/types'

export const CommentCard = ({ comment, post }: { comment: Comment; post: Post }): JSX.Element => {
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
          <CommentCardContent {...{ comment }} />
        </span>
      </p>
    </div>
  )
}

export const CommentCardContent = ({ comment }: { comment: Comment }): JSX.Element | string => {
  return comment.content.length <= 100 ? (
    comment.content
  ) : (
    <SeeMoreButton content={comment.content} />
  )
}
