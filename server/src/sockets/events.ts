import { Server, Socket } from 'socket.io'
import { CommentResponse, PostResponse, SocketEvents } from 'tukibook-helper'

export const handleSocketEvents = (io: Server, socket: Socket): void => {
  /* // Eventos de posts */
  socket.on(SocketEvents.NEW_POST, (post: PostResponse) => {
    socket.broadcast.emit(SocketEvents.NEW_POST, post)
  })

  socket.on(SocketEvents.DELETE_POST, (post: PostResponse) => {
    socket.broadcast.emit(SocketEvents.DELETE_POST, post)
  })

  socket.on(SocketEvents.LIKE_POST, (post: PostResponse) => {
    socket.broadcast.emit(SocketEvents.LIKE_POST, post)
  })

  socket.on(SocketEvents.EDIT_POST, (post: PostResponse) => {
    socket.broadcast.emit(SocketEvents.EDIT_POST, post)
  })

  /* // Eventos de comentarios */
  socket.on(SocketEvents.ADD_COMMENT, (comment: CommentResponse) => {
    socket.broadcast.emit(SocketEvents.ADD_COMMENT, comment)
  })

  socket.on(SocketEvents.EDIT_COMMENT, (comment: CommentResponse) => {
    socket.broadcast.emit(SocketEvents.EDIT_COMMENT, comment)
  })

  socket.on(SocketEvents.DELETE_COMMENT, (comment: CommentResponse) => {
    socket.broadcast.emit(SocketEvents.DELETE_COMMENT, comment)
  })

  socket.on(SocketEvents.LIKE_COMMENT, (comment: CommentResponse) => {
    socket.broadcast.emit(SocketEvents.LIKE_COMMENT, comment)
  })
}
