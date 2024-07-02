import { FormEvent } from 'react'

import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/home/Home.module.css'
import { Post } from 'src/types'

export const AddCommentForm = ({ post }: { post: Post }): JSX.Element => {
  const { commentPost } = usePosts()

  const handleCommentPost = async (event: FormEvent<HTMLFormElement>, postId: string) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const content = target[0] as HTMLInputElement

    await commentPost({ postId, username: 'otro user', content: content.value })

    content.value = ''
  }

  return (
    <form style={{ width: '100%' }} onSubmit={e => handleCommentPost(e, post.id)}>
      <input type="text" placeholder="Comentar..." className={styles.commentInput} />
    </form>
  )
}
