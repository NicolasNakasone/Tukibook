import { Server, Socket } from 'socket.io'
import { Comment, Post, SocketEvents } from 'tukibook-helper'

export const handleSocketEvents = (io: Server, socket: Socket): void => {
  socket.on(SocketEvents.NEW_POST, (post: Post) => {
    io.emit(SocketEvents.NEW_POST, post) // Emite el post a todos los clientes conectados
  })

  socket.on(SocketEvents.DELETE_POST, (post: Post) => {
    io.emit(SocketEvents.DELETE_POST, post) // Emite el post que se borro a todos los clientes conectados
  })

  socket.on(SocketEvents.LIKE_POST, (post: Post) => {
    io.emit(SocketEvents.LIKE_POST, post) // Emite el post que se 'likeo' a todos los clientes conectados
  })

  socket.on(SocketEvents.EDIT_POST, (post: Post) => {
    io.emit(SocketEvents.EDIT_POST, post) // Emite el post que se edito a todos los clientes conectados
  })

  socket.on(SocketEvents.COMMENT_POST, (comment: Comment) => {
    io.emit(SocketEvents.COMMENT_POST, comment) // Emite el comentario que se creo a todos los clientes conectados
  })

  socket.on(SocketEvents.EDIT_COMMENT, (updatedComment: Comment) => {
    io.emit(SocketEvents.EDIT_COMMENT, updatedComment) // Emite el comentario que se edito a todos los clientes conectados
  })

  socket.on(SocketEvents.DELETE_COMMENT, (comment: Comment) => {
    io.emit(SocketEvents.DELETE_COMMENT, comment) // Emite el comentario que se borro a todos los clientes conectados
  })
}
