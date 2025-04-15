import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  addPost,
  commentPost,
  deleteComment,
  deletePost,
  editPost,
  fetchPosts,
  likePost,
} from 'src/states/slices/postsSlice'
import { AppDispatch, RootState } from 'src/states/store'
import { GetPage, PostInput, Post, CommentInput, UpdatePostInput, Comment } from 'tukibook-helper'

export const usePosts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, status, error, page, hasMore } = useSelector(({ posts }: RootState) => posts)

  // console.log('usePosts')

  const handleGetPosts = useCallback(({ page }: GetPage) => {
    return dispatch(fetchPosts({ page }))
  }, [])

  const handleGetMorePosts = useCallback(() => {
    if (status !== 'loading' && hasMore) {
      dispatch(fetchPosts({ page }))
    }
  }, [page, hasMore, status, dispatch])

  const handleAddPost = (newPost: PostInput) => dispatch(addPost(newPost))

  const handleDeletePost = (postId: Post['id']) => dispatch(deletePost(postId))

  const handleLikePost = (postId: Post['id']) => dispatch(likePost(postId))

  const handleEditPost = (updatedPost: UpdatePostInput) => dispatch(editPost(updatedPost))

  const handleCommentPost = (newComment: CommentInput) => dispatch(commentPost(newComment))

  const handleDeleteComment = (commentId: Comment['id']) => dispatch(deleteComment(commentId))

  return {
    posts,
    status,
    error,
    page,
    hasMore,
    getPosts: handleGetPosts,
    getMorePosts: handleGetMorePosts,
    addPost: handleAddPost,
    deletePost: handleDeletePost,
    likePost: handleLikePost,
    editPost: handleEditPost,
    commentPost: handleCommentPost,
    deleteComment: handleDeleteComment,
  }
}
