import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  addPost,
  commentPost,
  deletePost,
  editPost,
  fetchPosts,
  likePost,
} from 'src/states/slices/postsSlice'
import { AppDispatch, RootState } from 'src/states/store'
import { GetPage, PostInput, Post, CommentInput, UpdatePostInput } from 'tukibook-helper'

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

  const handleCommentPost = (newComment: CommentInput) => dispatch(commentPost(newComment))

  const handleEditPost = (updatedPost: UpdatePostInput) => dispatch(editPost(updatedPost))

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
    commentPost: handleCommentPost,
    editPost: handleEditPost,
  }
}
