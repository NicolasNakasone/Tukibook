import { useDispatch, useSelector } from 'react-redux'
import {
  addPost,
  commentPost,
  deletePost,
  fetchPosts,
  likePost,
} from 'src/states/slices/postsSlice'
import { AppDispatch, RootState } from 'src/states/store'
import { CommentInput, Post, PostInput } from 'src/types'

export const usePosts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, status, error } = useSelector(({ posts }: RootState) => posts)
  console.log('usePosts')
  const handleGetPosts = () => dispatch(fetchPosts())

  const handleAddPost = (newPost: PostInput) => dispatch(addPost(newPost))

  const handleDeletePost = (postId: Post['id']) => dispatch(deletePost(postId))

  const handleLikePost = (postId: Post['id']) => dispatch(likePost(postId))

  const handleCommentPost = (newComment: CommentInput) => dispatch(commentPost(newComment))

  return {
    posts,
    status,
    error,
    getPosts: handleGetPosts,
    addPost: handleAddPost,
    deletePost: handleDeletePost,
    likePost: handleLikePost,
    commentPost: handleCommentPost,
  }
}
