import tukibookLogo from 'public/tuki.webp'
import { SeeMoreButton } from 'src/components/common/SeeMoreButton'
import { AddCommentForm } from 'src/features/comments/AddCommentForm'
import { CommentCard } from 'src/features/comments/CommentCard'
import { DeletePostButton } from 'src/features/posts/DeletePostButton'
import { LikePostButton } from 'src/features/posts/LikePostButton'
import styles from 'src/features/posts/PostCard.module.css'
import { Post } from 'tukibook-helper'

interface PostCardProps {
  post: Post
}

export const PostCard = ({ post }: PostCardProps): JSX.Element => {
  return (
    <div key={post.id} className={styles.postCardContainer}>
      {/* Cambiar mas adelante a un menu tipo tooltip con tres puntos
        para mostrar opciones como borrar el post o cosas asi
      */}
      <PostCardHeader {...{ post }} />
      <PostCardContent {...{ post }} />
      <LikePostButton {...{ post }} />
      <PostCardComments {...{ post }} />
      <AddCommentForm {...{ post }} />
    </div>
  )
}

const PostCardHeader = ({ post }: { post: Post }): JSX.Element => {
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
      <DeletePostButton {...{ post }} />
    </div>
  )
}

const PostCardContent = ({ post }: { post: Post }): JSX.Element => {
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
