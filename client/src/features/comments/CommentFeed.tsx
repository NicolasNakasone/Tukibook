import { ReactNode } from 'react'

import { Button } from 'src/components/common/Button'
import { Loader } from 'src/components/common/Loader'
import { CommentCard } from 'src/features/comments/CommentCard'
import styles from 'src/features/comments/CommentFeed.module.css'
import { useComments } from 'src/hooks/useComments.hook'
import { Post } from 'tukibook-helper'

export const CommentFeed = ({ post }: { post: Post }): ReactNode => {
  // Probablemente aca haya que agregar logica para obtener comentarios
  const { comments, getComments, page, hasMore, isLoading, isSlotCreated, remainingComments } =
    useComments({
      postId: post.id,
    })

  const handleGetComments = async () => {
    if (!comments.length || hasMore) {
      getComments({ page, postId: post.id })
      return
    }
  }

  const isDisabled = !hasMore && isSlotCreated

  return (
    <div className={styles.commentsContainer}>
      {comments.map(comment => {
        if (!comment.parentCommentId)
          return <CommentCard key={comment.id} {...{ comment, post }} />

        const isOrphan =
          !!comment.parentCommentId &&
          !comments.map(({ id }) => ({ id })).find(c => c.id === comment.parentCommentId)

        if (isOrphan) return <CommentCard key={comment.id} {...{ comment, post, isOrphan }} />
      })}
      <Loader {...{ isLoading }} />
      <Button
        isLoading={isLoading}
        disabled={isLoading || isDisabled}
        onClick={handleGetComments}
      >{`Ver${hasMore ? ' mas' : ''} comentarios ${hasMore ? `(${remainingComments})` : ''}`}</Button>
    </div>
  )
}
