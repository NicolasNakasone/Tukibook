/* eslint-disable no-console */
import { Server as HttpServer } from 'http'

import { Server } from 'socket.io'
import { handleSocketEvents } from 'src/sockets/events'

const { CLIENT_URL } = process.env

export const initializeSocket = (server: HttpServer): void => {
  const io = new Server(server, { cors: { origin: CLIENT_URL, methods: ['GET', 'POST'] } })
  console.log('Socket iniciado en el servidor!')
  io.on('connection', socket => {
    console.log('Usuario conectado: ', socket.id)
    handleSocketEvents(io, socket)

    socket.on('disconnect', () => {
      console.log('Usuario desconectado')
    })
  })
}
