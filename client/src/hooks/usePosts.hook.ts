import { useContext, useEffect } from 'react'

import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { PostsContext } from 'src/contexts/PostsContext'
import { CommentInput, PostInput } from 'src/types'

const { VITE_API_URL } = import.meta.env

export const usePosts = () => {
  const { state, dispatch } = useContext(PostsContext)

  const getPosts = async () => {
    const response = await handleFetch(`${VITE_API_URL}${routes.posts}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then(res => res?.json())

    if (response) {
      dispatch({ type: 'SET_POSTS', payload: response })
    }
    return response
  }

  const addPosts = async (newPost: PostInput) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.posts}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(newPost),
    }).then(res => res?.json())

    if (response) {
      dispatch({ type: 'ADD_POST', payload: response })
    }
    return response
  }

  const deletePost = async (postId: string) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.posts}/${postId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    }).then(res => res?.json())

    if (response) {
      dispatch({ type: 'DELETE_POST', payload: postId })
    }
    return response
  }

  const likePost = async (postId: string) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.likes}/${postId}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    }).then(res => res?.json())

    if (response) {
      dispatch({ type: 'LIKE_POST', payload: postId })
    }
    return response
  }

  const commentPost = async (newComment: CommentInput) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.comments}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(newComment),
    }).then(res => res?.json())

    if (response) {
      dispatch({
        type: 'COMMENT_POST',
        payload: { postId: newComment.postId, newComment: response },
      })
    }
    return response
  }

  useEffect(() => {
    getPosts()
  }, [])

  return {
    state,
    dispatch,
    getPosts,
    addPosts,
    deletePost,
    likePost,
    commentPost,
  }
}
