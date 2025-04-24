import { useEffect, useState } from 'react'

import tukibookLogo from 'public/tuki.webp'
import { Button } from 'src/components/common/Button'
import { SeeMoreButton } from 'src/components/common/SeeMoreButton'
import styles from 'src/features/comments/CommentCard.module.css'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitDeleteComment, emitEditComment } from 'src/sockets'
import { Comment, Post } from 'tukibook-helper'

export const CommentCard = ({ comment, post }: { comment: Comment; post: Post }): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false)
  const [newContent, setNewContent] = useState(comment.content)

  const { deleteComment, editComment } = usePosts()

  useEffect(() => {
    if (!isEditing) {
      setNewContent(comment.content)
    }
  }, [comment.content, isEditing])

  const handleEditComment = async () => {
    const response = await editComment({ id: comment.id, content: newContent })

    if (response.payload) {
      emitEditComment(response.payload as Post)
      setIsEditing(false)
      const foundNewContent = (response.payload as Post).comments.find(c => c.id === comment.id)
      setNewContent(foundNewContent?.content || '')
    }
  }

  const handleDeleteComment = async () => {
    const response = await deleteComment(comment.id)

    if (response.payload) emitDeleteComment(response.payload as Post)
  }

  return (
    <div key={comment.id} className={styles.commentCardContainer}>
      <img
        src={tukibookLogo}
        alt={`${post.username}'s profile picture`}
        className={styles.commentUsername}
      />
      {!isEditing && (
        <>
          <p className={styles.commentContent}>
            <span>{comment.username}</span>
            <span className={styles.commentContentSpan}>
              <CommentCardContent {...{ comment }} />
            </span>
          </p>
          <Button onClick={() => setIsEditing(true)}>✏️</Button>
          <Button onClick={handleDeleteComment}>❌</Button>
        </>
      )}
      {isEditing && (
        <>
          <textarea value={newContent} onChange={e => setNewContent(e.target.value)} />
          <Button disabled={newContent === comment.content} onClick={handleEditComment}>
            Guardar
          </Button>
          <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
        </>
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
