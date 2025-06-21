import { io } from 'socket.io-client'
import { PostResponse, SocketEvents } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const socket = io(VITE_API_URL, { withCredentials: true, transports: ['websocket'] })

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

export const emitCommentPost = (updatedPost: PostResponse) => {
  socket.emit(SocketEvents.COMMENT_POST, updatedPost)
}

export const emitEditComment = (updatedPost: PostResponse) => {
  socket.emit(SocketEvents.EDIT_COMMENT, updatedPost)
}

export const emitDeleteComment = (updatedPost: PostResponse) => {
  socket.emit(SocketEvents.DELETE_COMMENT, updatedPost)
}

export const emitLikeComment = (updatedPost: PostResponse) => {
  socket.emit(SocketEvents.LIKE_COMMENT, updatedPost)
}
