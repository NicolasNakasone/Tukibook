import { Server as HttpServer } from 'http'

import { Server } from 'socket.io'
import { handleSocketEvents } from 'src/sockets/events'

export const initializeSocket = (server: HttpServer): void => {
  const io = new Server(server)
  console.log('Socket iniciado en el servidor!')
  io.on('connection', socket => {
    console.log('a user connected', socket.id)
    handleSocketEvents(io, socket)

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}
