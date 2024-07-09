/* eslint-disable no-console */
import { Server as HttpServer } from 'http'

import { Server } from 'socket.io'
import { handleSocketEvents } from 'src/sockets/events'

const { CLIENT_URL } = process.env

export const initializeSocket = (server: HttpServer): void => {
  const io = new Server(server, {
    cors: {
      origin: CLIENT_URL, // Cambia esto a la IP y puerto de tu frontend
      methods: ['GET', 'POST'],
    },
  })
  console.log('Socket iniciado en el servidor!')
  io.on('connection', socket => {
    handleSocketEvents(io, socket)

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}
