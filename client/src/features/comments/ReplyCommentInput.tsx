import { useState } from 'react'

import { Button } from 'src/components/common/Button'
import styles from 'src/features/comments/ReplyCommentInput.module.css'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitCommentPost } from 'src/sockets'
import { Comment, Post, PostResponse } from 'tukibook-helper'

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
  const [replyNewContent, setReplyNewContent] = useState('')

  const { commentPost } = usePosts()

  const handleReplyComment = async () => {
    const response = (await (
      await commentPost({ content: replyNewContent, parentCommentId, postId })
    ).payload) as PostResponse

    if (response.data) {
      emitCommentPost(response)
      setReplyNewContent('')
      cancelIsReplying()
    }
  }

  return (
    <>
      <input
        value={replyNewContent}
        className={styles.replyInput}
        placeholder="Escribi tu respuesta..."
        onChange={e => setReplyNewContent(e.target.value)}
      />
      <div className={styles.replyButtons}>
        <Button disabled={!replyNewContent} onClick={handleReplyComment}>
          Guardar
        </Button>
        <Button onClick={cancelIsReplying}>Cancelar</Button>
      </div>
    </>
  )
}
