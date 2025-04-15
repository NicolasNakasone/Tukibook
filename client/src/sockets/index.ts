import { io } from 'socket.io-client'
import { Comment, Post, SocketEvents } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const socket = io(VITE_API_URL)

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

export const emitCommentPost = (newComment: Comment) => {
  socket.emit(SocketEvents.COMMENT_POST, newComment)
}

export const emitDeleteComment = (deletedComment: Comment) => {
  socket.emit(SocketEvents.DELETE_COMMENT, deletedComment)
}
