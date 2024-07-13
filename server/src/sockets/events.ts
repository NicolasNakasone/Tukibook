import { Server, Socket } from 'socket.io'

export const handleSocketEvents = (io: Server, socket: Socket): void => {
  socket.on('newPost', (post /* : Post // TODO: Crear tipo Post */) => {
    io.emit('newPost', post) // Emite el post a todos los clientes conectados
  })

  socket.on('deletePost', (post /* : Post // TODO: Crear tipo Post */) => {
    io.emit('deletePost', post) // Emite el post que se borro a todos los clientes conectados
  })

  socket.on('commentPost', (comment /* : Comment // TODO: Crear tipo Comment */) => {
    io.emit('commentPost', comment) // Emite el comentario que se creo a todos los clientes conectados
  })
}
