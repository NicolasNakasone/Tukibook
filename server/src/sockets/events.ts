import { Server, Socket } from 'socket.io'

export const handleSocketEvents = (io: Server, socket: Socket): void => {
  socket.on('newPost', (post /* : Post // TODO: Crear tipo Post */) => {
    io.emit('newPost', post) // Emite el post a todos los clientes conectados
  })

  socket.on('deletedPost', (post /* : Post // TODO: Crear tipo Post */) => {
    io.emit('deletedPost', post) // Emite el post que se borro a todos los clientes conectados
  })
}
