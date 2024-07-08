import { io } from 'socket.io-client'
import { Post } from 'src/types'

const { VITE_API_URL } = import.meta.env

const socket = io(VITE_API_URL)

socket.on('newPost', (post: Post) => {
  // Lógica para agregar el nuevo post al feed
  console.log('New post received:', post)
})

export const emitNewPost = (newPost: Post) => {
  socket.emit('newPost', newPost)
}

export default socket
