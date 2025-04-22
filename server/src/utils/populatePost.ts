import { Post } from 'src/models/Post'

export const populateFullPost = (postQuery: ReturnType<typeof Post.findById>) => {
  return postQuery.populate({
    path: 'comments',
    options: { sort: { createdAt: -1 } }, // Del más nuevo al más viejo
  })
}
