import { Server, Socket } from 'socket.io'
import { Post, SocketEvents } from 'tukibook-helper'

export const handleSocketEvents = (io: Server, socket: Socket): void => {
  socket.on(SocketEvents.NEW_POST, (post: Post) => {
    socket.broadcast.emit(SocketEvents.NEW_POST, post)
  })

  socket.on(SocketEvents.DELETE_POST, (post: Post) => {
    socket.broadcast.emit(SocketEvents.DELETE_POST, post)
  })

  socket.on(SocketEvents.LIKE_POST, (post: Post) => {
    socket.broadcast.emit(SocketEvents.LIKE_POST, post)
  })

  socket.on(SocketEvents.EDIT_POST, (post: Post) => {
    socket.broadcast.emit(SocketEvents.EDIT_POST, post)
  })

  socket.on(SocketEvents.COMMENT_POST, (post: Post) => {
    socket.broadcast.emit(SocketEvents.COMMENT_POST, post)
  })

  socket.on(SocketEvents.EDIT_COMMENT, (post: Post) => {
    socket.broadcast.emit(SocketEvents.EDIT_COMMENT, post)
  })

  socket.on(SocketEvents.DELETE_COMMENT, (post: Post) => {
    socket.broadcast.emit(SocketEvents.DELETE_COMMENT, post)
  })

  socket.on(SocketEvents.LIKE_COMMENT, (post: Post) => {
    socket.broadcast.emit(SocketEvents.LIKE_COMMENT, post)
  })
}
