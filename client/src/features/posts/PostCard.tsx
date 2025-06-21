import { SetStateAction, useEffect, useMemo, useState } from 'react'

import tukibookLogo from 'public/tuki.webp'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { SeeMoreButton } from 'src/components/common/SeeMoreButton'
import { routes } from 'src/constants/routes'
import { AddCommentForm } from 'src/features/comments/AddCommentForm'
import { CommentCard } from 'src/features/comments/CommentCard'
import { DeletePostButton } from 'src/features/posts/DeletePostButton'
import { LikePostButton } from 'src/features/posts/LikePostButton'
import styles from 'src/features/posts/PostCard.module.css'
import { useAuth } from 'src/hooks/useAuth.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitEditPost } from 'src/sockets'
import { Post, PostResponse } from 'tukibook-helper'

interface PostCardProps {
  post: Post
}

export const PostCard = ({ post }: PostCardProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false)
  const [newContent, setNewContent] = useState(post.content)

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { editPost } = usePosts()

  useEffect(() => {
    if (!isEditing) {
      setNewContent(post.content)
    }
  }, [post.content, isEditing])

  const handleCardClick = (e: React.MouseEvent) => {
    if (pathname === routes.postDetail.replace(':id', post.id)) return

    const target = e.target as HTMLElement

    if (target.closest('button') || target.closest('input')) return

    navigate(routes.postDetail.replace(':id', post.id))
  }

  const handleEditPost = async () => {
    const response = (await (
      await editPost({ id: post.id, content: newContent })
    ).payload) as PostResponse

    if (response.data) {
      emitEditPost(response)
      setIsEditing(false)
      setNewContent(response.data.content)
    }
  }

  return (
    <div key={post.id} className={styles.postCardContainer} onClick={handleCardClick}>
      {/* Cambiar mas adelante a un menu tipo tooltip con tres puntos
        para mostrar opciones como borrar el post o cosas asi
      */}
      <PostCardHeader
        {...{ post, isEditing }}
        toggleEdit={() => setIsEditing(prevState => !prevState)}
      />
      <PostCardContent {...{ post, isEditing, newContent, setNewContent }} />
      {!!post.image?.publicId && (
        <img
          src={post.image.url}
          alt={`Imagen del post de ${post.user.username}`}
          className={styles.postImage}
        />
      )}
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
  const { user } = useAuth()

  return (
    <div className={styles.postCardHeaderContainer}>
      <h2 className={styles.postCardUsername}>
        <img
          src={tukibookLogo}
          alt={`Foto de perfil de ${post.user?.username}`}
          className={styles.postCardAvatar}
        />
        {post.user?.username}
      </h2>
      {user?.id === post.user.id && (
        <div className={styles.postCardHeaderButtons}>
          <Button onClick={toggleEdit}>✏️</Button>
          <DeletePostButton {...{ post }} isDisabled={isEditing} />
        </div>
      )}
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

  return post.content?.length <= 200 ? (
    <p className={styles.postContent}>{post.content}</p>
  ) : (
    <SeeMoreButton content={post.content} />
  )
}

const PostCardComments = ({ post }: { post: Post }): JSX.Element | boolean => {
  const parentComments = useMemo(() => {
    return post.comments?.filter(comment => !comment.parentCommentId)
  }, [post.comments])

  return (
    Boolean(post.comments?.length) && (
      <div className={styles.commentsContainer}>
        {parentComments.map(comment => {
          return <CommentCard key={comment.id} {...{ comment, post }} />
        })}
      </div>
    )
  )
}
