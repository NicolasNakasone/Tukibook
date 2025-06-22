import { Button } from 'src/components/common/Button'
import { ButtonLoader } from 'src/components/common/ButtonLoader'
import styles from 'src/features/comments/CommentCardButtons.module.css'
import { useAuth } from 'src/hooks/useAuth.hook'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitLikeComment, emitDeleteComment } from 'src/sockets'
import { Comment, PostResponse } from 'tukibook-helper'

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
  const { isLoading: isLoadingLike, handleIsLoading: handleIsLoadingLike } = useIsLoading()
  const { isLoading: isLoadingDelete, handleIsLoading: handleIsLoadingDelete } = useIsLoading()

  const { user } = useAuth()

  const hasLiked = comment.likes.includes(user?.id || '')

  const isDisabled = isReplying || isLoadingLike || isLoadingDelete

  const handleLikeComment = async () => {
    handleIsLoadingLike(true)
    const response = (await (await likeComment(comment.id)).payload) as PostResponse
    handleIsLoadingLike(false)

    if (response.data) emitLikeComment(response)
  }

  const handleDeleteComment = async () => {
    handleIsLoadingDelete(true)
    const response = (await (await deleteComment(comment.id)).payload) as PostResponse
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
