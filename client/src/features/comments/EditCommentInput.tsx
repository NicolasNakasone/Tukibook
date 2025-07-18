import { useState } from 'react'

import { Button } from 'src/components/common/Button'
import styles from 'src/features/comments/EditCommentInput.module.css'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitEditComment } from 'src/sockets'
import { Comment, PostResponse } from 'tukibook-helper'

interface EditCommentInputProps {
  comment: Comment
  cancelIsEditing: () => void
}

export const EditCommentInput = ({
  comment,
  cancelIsEditing,
}: EditCommentInputProps): JSX.Element => {
  const [newContent, setNewContent] = useState(comment.content)
  const { isLoading, handleIsLoading } = useIsLoading()
  const { editComment } = usePosts()

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
    ).payload) as PostResponse
    handleIsLoading(false)

    if (response.data) {
      emitEditComment(response)
      cancelIsEditing()
      const foundNewContent = response.data.comments.find(c => c.id === comment.id)
      setNewContent(foundNewContent?.content || '')
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
