import { Button } from 'src/components/common/Button'
import styles from 'src/features/posts/DeletePostButton.module.css'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitDeletePost } from 'src/sockets'
import { Post, PostResponse } from 'tukibook-helper'

interface DeletePostButtonProps {
  post: Post
  isDisabled: boolean
}

export const DeletePostButton = ({ post, isDisabled }: DeletePostButtonProps): JSX.Element => {
  const { deletePost } = usePosts()

  const handleDeletePost = async () => {
    const response = (await (await deletePost(post.id)).payload) as PostResponse

    if (response.data) emitDeletePost(response)
  }

  return (
    <Button disabled={isDisabled} className={styles.deletePostButton} onClick={handleDeletePost}>
      ❌
    </Button>
  )
}
