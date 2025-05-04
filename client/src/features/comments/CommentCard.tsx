import { useEffect, useMemo, useState } from 'react'

import tukibookLogo from 'public/tuki.webp'
import { Button } from 'src/components/common/Button'
import { SeeMoreButton } from 'src/components/common/SeeMoreButton'
import styles from 'src/features/comments/CommentCard.module.css'
import { useAuth } from 'src/hooks/useAuth.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitCommentPost, emitDeleteComment, emitEditComment } from 'src/sockets'
import { Comment, Post } from 'tukibook-helper'

export const CommentCard = ({ comment, post }: { comment: Comment; post: Post }): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false)
  const [newContent, setNewContent] = useState(comment.content)
  const [showReplies, setShowReplies] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [replyNewContent, setReplyNewContent] = useState('')

  const { deleteComment, editComment, commentPost } = usePosts()
  const { user } = useAuth()

  useEffect(() => {
    if (!isEditing) {
      setNewContent(comment.content)
    }
  }, [comment.content, isEditing])

  const commentReplies = useMemo(() => {
    return post.comments.filter(postComments => postComments.parentCommentId === comment.id)
  }, [post])

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

  const handleReplyComment = async () => {
    const response = await commentPost({
      content: replyNewContent,
      parentCommentId: comment.parentCommentId || comment.id,
      postId: post.id,
      username: user?.username || 'otro user',
    })

    if (response.payload) {
      emitCommentPost(response.payload as Post)
      setReplyNewContent('')
      setIsReplying(false)
    }
  }

  return (
    <div className={styles.commentCardMainContainer}>
      <div key={comment.id} className={styles.commentCardContainer}>
        <img
          src={tukibookLogo}
          alt={`${post.user.username}'s profile picture`}
          className={styles.commentUsername}
        />
        {!isEditing && (
          <>
            <p className={styles.commentContent}>
              <span>{comment.username}</span>
              <span className={styles.commentContentSpan}>
                <CommentCardContent {...{ comment }} />
              </span>
              <Button disabled={isReplying} onClick={() => setIsReplying(true)}>
                Responder
              </Button>
              {isReplying && (
                <>
                  <input
                    style={{ width: '100%' }}
                    value={replyNewContent}
                    onChange={e => setReplyNewContent(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <Button disabled={!replyNewContent} onClick={handleReplyComment}>
                      Guardar
                    </Button>
                    <Button onClick={() => setIsReplying(false)}>Cancelar</Button>
                  </div>
                </>
              )}
              {!!commentReplies.length && (
                <Button onClick={() => setShowReplies(prevState => !prevState)}>
                  {showReplies ? 'Ocultar respuestas' : 'Ver respuestas'}
                </Button>
              )}
            </p>
            <div className={styles.commentCardButtons}>
              <Button disabled={isReplying} onClick={() => setIsEditing(true)}>
                ✏️
              </Button>
              <Button disabled={isReplying} onClick={handleDeleteComment}>
                ❌
              </Button>
            </div>
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
      {showReplies && (
        <div className={styles.repliesContainer}>
          {commentReplies.map(reply => (
            <CommentCard key={reply.id} comment={reply} post={post} />
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
