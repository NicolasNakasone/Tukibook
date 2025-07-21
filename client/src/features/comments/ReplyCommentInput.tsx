import { useState } from 'react'

import { Button } from 'src/components/common/Button'
import styles from 'src/features/comments/ReplyCommentInput.module.css'
import { useComments } from 'src/hooks/useComments.hook'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { emitAddComment } from 'src/sockets'
import { Comment, CommentResponse, Post } from 'tukibook-helper'

interface ReplyCommentInputProps {
  parentCommentId: Comment['parentCommentId'] | Comment['id']
  postId: Post['id']
  cancelIsReplying: () => void
}

export const ReplyCommentInput = ({
  parentCommentId,
  postId,
  cancelIsReplying,
}: ReplyCommentInputProps): JSX.Element => {
  const [newContent, setNewContent] = useState('')
  const { isLoading, handleIsLoading } = useIsLoading()
  const { addComment } = useComments({ postId })

  const handleReplyComment = async () => {
    handleIsLoading(true)
    const response = (await (
      await addComment({ content: newContent, parentCommentId, postId })
    ).payload) as CommentResponse
    handleIsLoading(false)

    if (response.data) {
      emitAddComment(response)
      setNewContent('')
      cancelIsReplying()
    }
  }

  return (
    <>
      <input
        value={newContent}
        className={styles.replyInput}
        placeholder="Escribi tu respuesta..."
        onChange={e => setNewContent(e.target.value)}
      />
      <div className={styles.replyButtons}>
        <Button
          isLoading={isLoading}
          disabled={!newContent || isLoading}
          onClick={handleReplyComment}
        >
          Guardar
        </Button>
        <Button disabled={isLoading} onClick={cancelIsReplying}>
          Cancelar
        </Button>
      </div>
    </>
  )
}
