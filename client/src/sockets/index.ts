import { io } from 'socket.io-client'
import { Post } from 'src/types'

const { VITE_API_URL } = import.meta.env

export const socket = io(VITE_API_URL)

export const emitNewPost = (newPost: Post) => {
  socket.emit('newPost', newPost)
}
