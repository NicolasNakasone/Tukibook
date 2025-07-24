import { useMemo, useState } from 'react'

import tukibookLogo from 'public/tuki.webp'
import { Button } from 'src/components/common/Button'
import { SeeMoreButton } from 'src/components/common/SeeMoreButton'
import styles from 'src/features/comments/CommentCard.module.css'
import { CommentCardButtons } from 'src/features/comments/CommentCardButtons'
import { EditCommentInput } from 'src/features/comments/EditCommentInput'
import { ReplyCommentInput } from 'src/features/comments/ReplyCommentInput'
import { useComments } from 'src/hooks/useComments.hook'
import { Comment, Post } from 'tukibook-helper'

interface CommentCardProps {
  comment: Comment
  postId: Post['id']
  isOrphan?: boolean
}

export const CommentCard = ({ comment, postId, isOrphan }: CommentCardProps): JSX.Element => {
  const { comments } = useComments({ postId })

  const [isEditing, setIsEditing] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [isReplying, setIsReplying] = useState(false)

  const commentReplies = useMemo(() => {
    return comments.filter(postComments => postComments.parentCommentId === comment.id)
  }, [comments, comment.id])

  if (isOrphan)
    return (
      // TODO: Mejorar UI
      <div className={styles.commentCardMainContainer}>
        <div className={styles.commentCardContainer}>
          <p className={styles.commentContent}>
            <span className={styles.orphanMessage}>Este comentario fue eliminado</span>
            <div className={styles.repliesContainer}>
              <CommentCard {...{ comment, postId }} />
            </div>
          </p>
        </div>
      </div>
    )

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
                  {...{ postId }}
                  parentCommentId={comment.parentCommentId || comment.id}
                  cancelIsReplying={() => setIsReplying(false)}
                />
              )}
              {!!commentReplies.length && (
                <Button variant="text" onClick={() => setShowReplies(prevState => !prevState)}>
                  {showReplies ? 'Ocultar respuestas' : 'Ver respuestas'}
                </Button>
              )}
            </p>
            <CommentCardButtons
              {...{ comment, postId, isReplying }}
              handleIsEditing={() => setIsEditing(true)}
            />
          </>
        )}
        {isEditing && (
          <EditCommentInput {...{ comment, postId }} cancelIsEditing={() => setIsEditing(false)} />
        )}
      </div>
      {showReplies && (
        <div className={styles.repliesContainer}>
          {commentReplies.map(reply => (
            <CommentCard key={reply.id} comment={reply} {...{ postId }} />
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
