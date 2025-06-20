import { useState } from 'react'

import { Button } from 'src/components/common/Button'
import styles from 'src/features/comments/EditCommentInput.module.css'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitEditComment } from 'src/sockets'
import { Comment, Post } from 'tukibook-helper'

interface EditCommentInputProps {
  comment: Comment
  cancelIsEditing: () => void
}

export const EditCommentInput = ({
  comment,
  cancelIsEditing,
}: EditCommentInputProps): JSX.Element => {
  const [newContent, setNewContent] = useState(comment.content)

  const { editComment } = usePosts()

  // Creo que ya no es necesario esto que hacia para mantener el contenido entre clientes
  // useEffect(() => {
  //   if (!isEditing) {
  //     setNewContent(comment.content)
  //   }
  // }, [comment.content, isEditing])

  const handleEditComment = async () => {
    const response = await editComment({ id: comment.id, content: newContent })

    if (response.payload) {
      emitEditComment(response.payload as Post)
      cancelIsEditing()
      const foundNewContent = (response.payload as Post).comments.find(c => c.id === comment.id)
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
      <Button disabled={newContent === comment.content} onClick={handleEditComment}>
        Guardar
      </Button>
      <Button onClick={cancelIsEditing}>Cancelar</Button>
    </>
  )
}
