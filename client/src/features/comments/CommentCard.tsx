import { useMemo, useState } from 'react'

import tukibookLogo from 'public/tuki.webp'
import { Button } from 'src/components/common/Button'
import { SeeMoreButton } from 'src/components/common/SeeMoreButton'
import styles from 'src/features/comments/CommentCard.module.css'
import { CommentCardButtons } from 'src/features/comments/CommentCardButtons'
import { EditCommentInput } from 'src/features/comments/EditCommentInput'
import { ReplyCommentInput } from 'src/features/comments/ReplyCommentInput'
import { Comment, Post } from 'tukibook-helper'

export const CommentCard = ({ comment, post }: { comment: Comment; post: Post }): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [isReplying, setIsReplying] = useState(false)

  const commentReplies = useMemo(() => {
    return post.comments.filter(postComments => postComments.parentCommentId === comment.id)
  }, [post.comments, comment.id])

  return (
    <div className={styles.commentCardMainContainer}>
      <div key={comment.id} className={styles.commentCardContainer}>
        <img
          src={comment.user.avatar?.url || tukibookLogo}
          alt={`Foto de perfil de ${comment.user.username}`}
          className={styles.commentUsername}
        />
        {!isEditing && (
          <>
            <p className={styles.commentContent}>
              <span>{comment.user.username}</span>
              <span className={styles.commentContentSpan}>
                <CommentCardContent {...{ comment }} />
              </span>
              <Button disabled={isReplying} onClick={() => setIsReplying(true)}>
                Responder
              </Button>
              {isReplying && (
                <ReplyCommentInput
                  postId={post.id}
                  parentCommentId={comment.parentCommentId || comment.id}
                  cancelIsReplying={() => setIsReplying(false)}
                />
              )}
              {!!commentReplies.length && (
                <Button onClick={() => setShowReplies(prevState => !prevState)}>
                  {showReplies ? 'Ocultar respuestas' : 'Ver respuestas'}
                </Button>
              )}
            </p>
            <CommentCardButtons
              {...{ comment, isReplying }}
              handleIsEditing={() => setIsEditing(true)}
            />
          </>
        )}
        {isEditing && (
          <EditCommentInput {...{ comment }} cancelIsEditing={() => setIsEditing(false)} />
        )}
      </div>
      {showReplies && (
        <div className={styles.repliesContainer}>
          {commentReplies.map(reply => (
            <CommentCard key={reply.id} comment={reply} post={post} />
          ))}
        </div>
      )}
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
