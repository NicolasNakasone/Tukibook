import { useEffect, useState } from 'react'

import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { Post, PostInput } from 'src/types'

const { VITE_API_URL } = import.meta.env

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const getPosts = async () => {
    const response = await handleFetch(`${VITE_API_URL}${routes.posts}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then(res => res?.json())

    if (response) setPosts(response)
  }

  const addPosts = async (newPost: PostInput) => {
    const response = await handleFetch(`${VITE_API_URL}${routes.posts}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(newPost),
    }).then(res => res?.json())

    if (response) setPosts(prevPosts => [...prevPosts, response])
  }

  useEffect(() => {
    getPosts()
  }, [])

  return { posts, getPosts, addPosts }
}
