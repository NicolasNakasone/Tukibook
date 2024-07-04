import { FormEvent } from 'react'

import { usePosts } from 'src/hooks/usePosts.hook'
import styles from 'src/pages/home/Home.module.css'
import { Post } from 'src/types'

export const AddCommentForm = ({ post }: { post: Post }): JSX.Element => {
  const { commentPost } = usePosts()
  console.log('AddCommentForm')
  const handleCommentPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const content = (target[0] as HTMLInputElement).value

    await commentPost({ postId: post.id, username: 'otro user', content })

    target.reset()
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleCommentPost}>
      <input type="text" placeholder="Comentar..." className={styles.commentInput} />
    </form>
  )
}
