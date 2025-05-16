import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  addPost,
  commentPost,
  deleteComment,
  deletePost,
  editComment,
  editPost,
  fetchPostById,
  fetchPosts,
  likeComment,
  likePost,
} from 'src/states/slices/postsSlice'
import { AppDispatch, RootState } from 'src/states/store'
import {
  GetPage,
  PostInput,
  Post,
  CommentInput,
  UpdatePostInput,
  Comment,
  UpdateCommentInput,
} from 'tukibook-helper'

export const usePosts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, status, error, page, hasMore, postDetail } = useSelector(
    ({ posts }: RootState) => posts
  )

  const handleGetPosts = useCallback(({ page }: GetPage) => {
    return dispatch(fetchPosts({ page }))
  }, [])

  const handleGetMorePosts = useCallback(() => {
    if (status !== 'loading' && hasMore) {
      dispatch(fetchPosts({ page }))
    }
  }, [page, hasMore, status, dispatch])

  const handleGetPostById = (postId: Post['id']) => dispatch(fetchPostById(postId))

  const handleAddPost = (newPost: PostInput) => dispatch(addPost(newPost))

  const handleDeletePost = (postId: Post['id']) => dispatch(deletePost(postId))

  const handleLikePost = (postId: Post['id']) => dispatch(likePost(postId))

  const handleEditPost = (updatedPost: UpdatePostInput) => dispatch(editPost(updatedPost))

  const handleCommentPost = (newComment: CommentInput) => dispatch(commentPost(newComment))

  const handleEditComment = (updatedComment: UpdateCommentInput) =>
    dispatch(editComment(updatedComment))

  const handleDeleteComment = (commentId: Comment['id']) => dispatch(deleteComment(commentId))

  const handleLikeComment = (commentId: Comment['id']) => dispatch(likeComment(commentId))

  return {
    posts,
    postDetail,
    status,
    error,
    page,
    hasMore,
    getPosts: handleGetPosts,
    getMorePosts: handleGetMorePosts,
    getPostById: handleGetPostById,
    addPost: handleAddPost,
    deletePost: handleDeletePost,
    likePost: handleLikePost,
    editPost: handleEditPost,
    commentPost: handleCommentPost,
    editComment: handleEditComment,
    deleteComment: handleDeleteComment,
    likeComment: handleLikeComment,
  }
}
