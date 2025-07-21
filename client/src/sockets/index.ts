import { io } from 'socket.io-client'
import { CommentResponse, PostResponse, SocketEvents } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const socket = io(VITE_API_URL, { withCredentials: true, transports: ['websocket'] })

/* // Eventos de posts */
export const emitNewPost = (newPost: PostResponse) => {
  socket.emit(SocketEvents.NEW_POST, newPost)
}

export const emitDeletePost = (deletedPost: PostResponse) => {
  socket.emit(SocketEvents.DELETE_POST, deletedPost)
}

export const emitLikePost = (updatedPost: PostResponse) => {
  socket.emit(SocketEvents.LIKE_POST, updatedPost)
}

export const emitEditPost = (updatedPost: PostResponse) => {
  socket.emit(SocketEvents.EDIT_POST, updatedPost)
}

/* // Eventos de comentarios */
export const emitAddComment = (updatedComment: CommentResponse) => {
  socket.emit(SocketEvents.ADD_COMMENT, updatedComment)
}

export const emitEditComment = (updatedComment: CommentResponse) => {
  socket.emit(SocketEvents.EDIT_COMMENT, updatedComment)
}

export const emitDeleteComment = (updatedComment: CommentResponse) => {
  socket.emit(SocketEvents.DELETE_COMMENT, updatedComment)
}

export const emitLikeComment = (updatedComment: CommentResponse) => {
  socket.emit(SocketEvents.LIKE_COMMENT, updatedComment)
}
