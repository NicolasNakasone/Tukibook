import { SetStateAction, useState } from 'react'

import tukibookLogo from 'public/tuki.webp'
import { Button } from 'src/components/common/Button'
import { SeeMoreButton } from 'src/components/common/SeeMoreButton'
import { AddCommentForm } from 'src/features/comments/AddCommentForm'
import { CommentCard } from 'src/features/comments/CommentCard'
import { DeletePostButton } from 'src/features/posts/DeletePostButton'
import { LikePostButton } from 'src/features/posts/LikePostButton'
import styles from 'src/features/posts/PostCard.module.css'
import { usePosts } from 'src/hooks/usePosts.hook'
import { Post } from 'tukibook-helper'

interface PostCardProps {
  post: Post
}

export const PostCard = ({ post }: PostCardProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false)
  const [newContent, setNewContent] = useState(post.content)

  const { editPost } = usePosts()

  const handleEditPost = async () => {
    const response = await editPost({ id: post.id, content: newContent })

    if (response.payload) {
      setIsEditing(false)
      setNewContent(post.content)
    }
  }

  return (
    <div key={post.id} className={styles.postCardContainer}>
      {/* Cambiar mas adelante a un menu tipo tooltip con tres puntos
        para mostrar opciones como borrar el post o cosas asi
      */}
      <PostCardHeader
        {...{ post, isEditing }}
        toggleEdit={() => setIsEditing(prevState => !prevState)}
      />
      <PostCardContent {...{ post, isEditing, newContent, setNewContent }} />
      {!isEditing && (
        <>
          <LikePostButton {...{ post }} />
          <PostCardComments {...{ post }} />
          <AddCommentForm {...{ post }} />
        </>
      )}
      {isEditing && (
        <Button disabled={newContent === post.content} onClick={handleEditPost}>
          Guardar
        </Button>
      )}
    </div>
  )
}

const PostCardHeader = ({
  post,
  isEditing,
  toggleEdit,
}: {
  post: Post
  isEditing: boolean
  toggleEdit: () => void
}): JSX.Element => {
  return (
    <div className={styles.postCardHeaderContainer}>
      <h2 className={styles.postCardUsername}>
        <img
          src={tukibookLogo}
          alt={`${post.username}'s profile picture`}
          className={styles.postCardAvatar}
        />
        {post.username}
      </h2>
      <div className={styles.postCardHeaderButtons}>
        <Button onClick={toggleEdit}>✏️</Button>
        <DeletePostButton {...{ post }} disabled={isEditing} />
      </div>
    </div>
  )
}

interface PostCardContentProps {
  post: Post
  isEditing: boolean
  newContent: string
  setNewContent: (value: SetStateAction<string>) => void
}

const PostCardContent = ({
  post,
  isEditing,
  newContent,
  setNewContent,
}: PostCardContentProps): JSX.Element => {
  if (isEditing)
    return <textarea value={newContent} onChange={e => setNewContent(e.target.value)} />

  return post.content.length <= 200 ? (
    <p className={styles.postContent}>{post.content}</p>
  ) : (
    <SeeMoreButton content={post.content} />
  )
}

const PostCardComments = ({ post }: { post: Post }): JSX.Element | boolean => {
  return (
    Boolean(post.comments.length) && (
      <div className={styles.commentsContainer}>
        {post.comments.map(comment => {
          return <CommentCard key={comment.id} {...{ comment, post }} />
        })}
      </div>
    )
  )
}
