import { FormEvent } from 'react'

import { useDispatch } from 'react-redux'
import styles from 'src/pages/home/Home.module.css'
import { commentPost } from 'src/states/slices/postsSlice'
import { AppDispatch } from 'src/states/store'
import { Post } from 'src/types'

export const AddCommentForm = ({ post }: { post: Post }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>()

  const handleCommentPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const content = (target[0] as HTMLInputElement).value

    await dispatch(commentPost({ postId: post.id, username: 'otro user', content }))

    target.reset()
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleCommentPost}>
      <input type="text" placeholder="Comentar..." className={styles.commentInput} />
    </form>
  )
}
