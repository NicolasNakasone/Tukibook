import { io } from 'socket.io-client'
import { Post, SocketEvents } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const socket = io('https://tukibook-api.up.railway.app', { withCredentials: true })

export const emitNewPost = (newPost: Post) => {
  socket.emit(SocketEvents.NEW_POST, newPost)
}

export const emitDeletePost = (deletedPost: Post) => {
  socket.emit(SocketEvents.DELETE_POST, deletedPost)
}

export const emitLikePost = (updatedPost: Post) => {
  socket.emit(SocketEvents.LIKE_POST, updatedPost)
}

export const emitEditPost = (updatedPost: Post) => {
  socket.emit(SocketEvents.EDIT_POST, updatedPost)
}

export const emitCommentPost = (updatedPost: Post) => {
  socket.emit(SocketEvents.COMMENT_POST, updatedPost)
}

export const emitEditComment = (updatedPost: Post) => {
  socket.emit(SocketEvents.EDIT_COMMENT, updatedPost)
}

export const emitDeleteComment = (updatedPost: Post) => {
  socket.emit(SocketEvents.DELETE_COMMENT, updatedPost)
}
