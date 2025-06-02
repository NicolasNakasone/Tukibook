import { Button } from 'src/components/common/Button'
import styles from 'src/features/posts/DeletePostButton.module.css'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitDeletePost } from 'src/sockets'
import { Post } from 'tukibook-helper'

interface DeletePostButtonProps {
  post: Post
}

export const DeletePostButton = ({ post }: DeletePostButtonProps): JSX.Element => {
  const { deletePost } = usePosts()

  const handleDeletePost = async () => {
    const response = await deletePost(post.id)

    if (response.payload) emitDeletePost(response.payload as Post)
  }

  return (
    <Button className={styles.deletePostButton} onClick={handleDeletePost}>
      ❌
    </Button>
  )
}
