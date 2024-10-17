import { Server, Socket } from 'socket.io'
import { SocketEvents } from 'tukibook-helper'

export const handleSocketEvents = (io: Server, socket: Socket): void => {
  socket.on(SocketEvents.NEW_POST, (post /* : Post // TODO: Crear tipo Post */) => {
    io.emit(SocketEvents.NEW_POST, post) // Emite el post a todos los clientes conectados
  })

  socket.on(SocketEvents.DELETE_POST, (post /* : Post // TODO: Crear tipo Post */) => {
    io.emit(SocketEvents.DELETE_POST, post) // Emite el post que se borro a todos los clientes conectados
  })

  socket.on(SocketEvents.COMMENT_POST, (comment /* : Comment // TODO: Crear tipo Comment */) => {
    io.emit(SocketEvents.COMMENT_POST, comment) // Emite el comentario que se creo a todos los clientes conectados
  })

  socket.on(SocketEvents.LIKE_POST, post => {
    io.emit(SocketEvents.LIKE_POST, post) // Emite el post que se 'likeo' a todos los clientes conectados
  })
}
