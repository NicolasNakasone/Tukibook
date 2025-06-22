import { Button } from 'src/components/common/Button'
import { ButtonLoader } from 'src/components/common/ButtonLoader'
import styles from 'src/features/posts/DeletePostButton.module.css'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitDeletePost } from 'src/sockets'
import { Post, PostResponse } from 'tukibook-helper'

interface DeletePostButtonProps {
  post: Post
  isDisabled: boolean
}

export const DeletePostButton = ({ post, isDisabled }: DeletePostButtonProps): JSX.Element => {
  const { isLoading, handleIsLoading } = useIsLoading()
  const { deletePost } = usePosts()

  const handleDeletePost = async () => {
    handleIsLoading(true)
    const response = (await (await deletePost(post.id)).payload) as PostResponse
    handleIsLoading(false)

    if (response.data) emitDeletePost(response)
  }

  return (
    <Button
      disabled={isDisabled || isLoading}
      className={styles.deletePostButton}
      onClick={handleDeletePost}
    >
      {isLoading ? <ButtonLoader /> : '❌'}
    </Button>
  )
}
