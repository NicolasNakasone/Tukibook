import { io } from 'socket.io-client'
import { Post } from 'src/types'
import { SocketEvents } from 'src/types/socket'

const { VITE_API_URL } = import.meta.env

export const socket = io(VITE_API_URL)

export const emitNewPost = (newPost: Post) => {
  socket.emit(SocketEvents.NEW_POST, newPost)
}

export const emitDeletedPost = (deletedPost: Post) => {
  socket.emit(SocketEvents.DELETED_POST, deletedPost)
}