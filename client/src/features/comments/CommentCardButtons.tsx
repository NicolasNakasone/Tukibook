import { Button } from 'src/components/common/Button'
import styles from 'src/features/comments/CommentCardButtons.module.css'
import { useAuth } from 'src/hooks/useAuth.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitLikeComment, emitDeleteComment } from 'src/sockets'
import { Comment, Post } from 'tukibook-helper'

interface CommentCardButtonsProps {
  comment: Comment
  isReplying: boolean
  handleIsEditing: () => void
}

export const CommentCardButtons = ({
  comment,
  handleIsEditing,
  isReplying,
}: CommentCardButtonsProps): JSX.Element => {
  const { deleteComment, likeComment } = usePosts()

  const { user } = useAuth()

  const hasLiked = comment.likes.includes(user?.id || '')

  const handleLikeComment = async () => {
    const response = await likeComment(comment.id)

    if (response.payload) emitLikeComment(response.payload as Post)
  }

  const handleDeleteComment = async () => {
    const response = await deleteComment(comment.id)

    if (response.payload) emitDeleteComment(response.payload as Post)
  }

  return (
    <div className={styles.commentCardButtons}>
      <Button
        disabled={isReplying}
        className={hasLiked ? styles.liked : ''}
        onClick={handleLikeComment}
      >{`👍 ${comment.likes.length || ''}`}</Button>
      {user?.id === comment.user.id && (
        <>
          <Button disabled={isReplying} onClick={handleIsEditing}>
            ✏️
          </Button>
          <Button disabled={isReplying} onClick={handleDeleteComment}>
            ❌
          </Button>
        </>
      )}
    </div>
  )
}
