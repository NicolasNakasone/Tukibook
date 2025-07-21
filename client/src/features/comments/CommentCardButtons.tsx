import { Button } from 'src/components/common/Button'
import { ButtonLoader } from 'src/components/common/ButtonLoader'
import styles from 'src/features/comments/CommentCardButtons.module.css'
import { useAuth } from 'src/hooks/useAuth.hook'
import { useComments } from 'src/hooks/useComments.hook'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { emitLikeComment, emitDeleteComment } from 'src/sockets'
import { Comment, CommentResponse, Post } from 'tukibook-helper'

interface CommentCardButtonsProps {
  comment: Comment
  postId: Post['id']
  isReplying: boolean
  handleIsEditing: () => void
}

export const CommentCardButtons = ({
  comment,
  postId,
  handleIsEditing,
  isReplying,
}: CommentCardButtonsProps): JSX.Element => {
  const { deleteComment, likeComment } = useComments({ postId })
  const { isLoading: isLoadingLike, handleIsLoading: handleIsLoadingLike } = useIsLoading()
  const { isLoading: isLoadingDelete, handleIsLoading: handleIsLoadingDelete } = useIsLoading()

  const { user } = useAuth()

  const hasLiked = comment.likes.includes(user?.id || '')

  const isDisabled = isReplying || isLoadingLike || isLoadingDelete

  const handleLikeComment = async () => {
    handleIsLoadingLike(true)
    const response = (await (await likeComment(comment.id)).payload) as CommentResponse
    handleIsLoadingLike(false)

    if (response.data) emitLikeComment(response)
  }

  const handleDeleteComment = async () => {
    handleIsLoadingDelete(true)
    const response = (await (await deleteComment(comment.id)).payload) as CommentResponse
    handleIsLoadingDelete(false)

    if (response.data) emitDeleteComment(response)
  }

  return (
    <div className={styles.commentCardButtons}>
      <Button
        isLoading={isLoadingLike}
        disabled={isDisabled}
        className={hasLiked ? styles.liked : ''}
        onClick={handleLikeComment}
      >{`👍 ${comment.likes.length || ''}`}</Button>
      {user?.id === comment.user.id && (
        <>
          <Button disabled={isDisabled} onClick={handleIsEditing}>
            ✏️
          </Button>
          <Button disabled={isDisabled} onClick={handleDeleteComment}>
            {isLoadingDelete ? <ButtonLoader /> : '❌'}
          </Button>
        </>
      )}
    </div>
  )
}
