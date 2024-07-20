import { io } from 'socket.io-client'
import { Comment, Post } from 'src/types'
import { SocketEvents } from 'src/types/socket'

const { VITE_API_URL } = import.meta.env

export const socket = io(VITE_API_URL)

export const emitNewPost = (newPost: Post) => {
  socket.emit(SocketEvents.NEW_POST, newPost)
}

export const emitDeletePost = (deletedPost: Post) => {
  socket.emit(SocketEvents.DELETE_POST, deletedPost)
}

export const emitCommentPost = (newComment: Comment) => {
  socket.emit(SocketEvents.COMMENT_POST, newComment)
}

export const emitLikePost = (updatedPost: Post) => {
  socket.emit(SocketEvents.LIKE_POST, updatedPost)
}
