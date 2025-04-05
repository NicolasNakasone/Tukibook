import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { socket } from 'src/sockets'
import {
  addPost,
  commentPost,
  deletePost,
  fetchPosts,
  likePost,
} from 'src/states/slices/postsSlice'
import { AppDispatch, RootState } from 'src/states/store'
import { GetPage, PostInput, Post, CommentInput, SocketEvents } from 'tukibook-helper'

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

  // Socket functions

  const handleAddPostToAllClients = () => {
    return socket.on(SocketEvents.NEW_POST, (createdPost: Post) => {
      dispatch({ type: 'posts/addPost/fulfilled', payload: createdPost })
    })
  }

  const handleDeletePostOnAllClients = () => {
    return socket.on(SocketEvents.DELETE_POST, (deletedPost: Post) => {
      dispatch({ type: 'posts/deletePost/fulfilled', payload: deletedPost })
    })
  }

  const handleCommentPostToAllClients = () => {
    return socket.on(SocketEvents.COMMENT_POST, (newComment: Comment) => {
      dispatch({ type: 'posts/commentPost/fulfilled', payload: newComment })
    })
  }

  const handleLikePostOnAllClients = () => {
    return socket.on(SocketEvents.LIKE_POST, (updatedPost: Post) => {
      dispatch({ type: 'posts/likePost/fulfilled', payload: updatedPost })
    })
  }

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
    // TODO: Pensar otro nombre
    addPostAfter: handleAddPostToAllClients,
    deletePostAfter: handleDeletePostOnAllClients,
    commentPostAfter: handleCommentPostToAllClients,
    likePostAfter: handleLikePostOnAllClients,
  }
}
