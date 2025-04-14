import tukibookLogo from 'public/tuki.webp'
import { SeeMoreButton } from 'src/components/common/SeeMoreButton'
import styles from 'src/features/comments/CommentCard.module.css'
import { Comment, Post } from 'tukibook-helper'

export const CommentCard = ({ comment, post }: { comment: Comment; post: Post }): JSX.Element => {
  return (
    <div key={comment.id} className={styles.commentCardContainer}>
      <img
        src={tukibookLogo}
        alt={`${post.username}'s profile picture`}
        className={styles.commentUsername}
      />
      <p className={styles.commentContent}>
        <span>{comment.username}</span>
        <span className={styles.commentContentSpan}>
          <CommentCardContent {...{ comment }} />
        </span>
      </p>
    </div>
  )
}

export const CommentCardContent = ({ comment }: { comment: Comment }): JSX.Element | string => {
  if (!comment?.content) return ''

  return comment.content.length <= 100 ? (
    comment.content
  ) : (
    <SeeMoreButton content={comment.content} />
  )
}
