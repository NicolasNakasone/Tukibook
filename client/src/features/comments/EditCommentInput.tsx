import { useState } from 'react'

import { Button } from 'src/components/common/Button'
import styles from 'src/features/comments/EditCommentInput.module.css'
import { useComments } from 'src/hooks/useComments.hook'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { emitEditComment } from 'src/sockets'
import { Comment, CommentResponse, Post } from 'tukibook-helper'

interface EditCommentInputProps {
  comment: Comment
  postId: Post['id']
  cancelIsEditing: () => void
}

export const EditCommentInput = ({
  comment,
  postId,
  cancelIsEditing,
}: EditCommentInputProps): JSX.Element => {
  const [newContent, setNewContent] = useState(comment.content)
  const { isLoading, handleIsLoading } = useIsLoading()
  const { editComment } = useComments({ postId })

  // Creo que ya no es necesario esto que hacia para mantener el contenido entre clientes
  // useEffect(() => {
  //   if (!isEditing) {
  //     setNewContent(comment.content)
  //   }
  // }, [comment.content, isEditing])

  const handleEditComment = async () => {
    handleIsLoading(true)
    const response = (await (
      await editComment({ id: comment.id, content: newContent })
    ).payload) as CommentResponse
    handleIsLoading(false)

    if (response.data) {
      emitEditComment(response)
      cancelIsEditing()
      setNewContent(response.data.comment.content)
    }
  }

  return (
    <>
      <textarea
        className={styles.editCommentInput}
        value={newContent}
        onChange={e => setNewContent(e.target.value)}
      />
      <Button
        isLoading={isLoading}
        disabled={newContent === comment.content || isLoading}
        onClick={handleEditComment}
      >
        Guardar
      </Button>
      <Button disabled={isLoading} onClick={cancelIsEditing}>
        Cancelar
      </Button>
    </>
  )
}
