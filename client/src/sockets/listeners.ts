import { socket } from 'src/sockets'
import { AppDispatch } from 'src/states/store'
import { CommentsActionTypes, PostsActionTypes } from 'src/types/reducer'
import { CommentResponse, PostResponse, SocketEvents } from 'tukibook-helper'

export const registerPostListeners = (dispatch: AppDispatch) => {
  /* // Eventos de posts */
  socket.on(SocketEvents.NEW_POST, (createdPost: PostResponse) => {
    dispatch({ type: `${PostsActionTypes.ADD_POST}/fulfilled`, payload: createdPost })
  })

  socket.on(SocketEvents.DELETE_POST, (deletedPost: PostResponse) => {
    dispatch({ type: `${PostsActionTypes.DELETE_POST}/fulfilled`, payload: deletedPost })
  })

  socket.on(SocketEvents.LIKE_POST, (updatedPost: PostResponse) => {
    dispatch({ type: `${PostsActionTypes.LIKE_POST}/fulfilled`, payload: updatedPost })
  })

  socket.on(SocketEvents.EDIT_POST, (editedPost: PostResponse) => {
    dispatch({ type: `${PostsActionTypes.EDIT_POST}/fulfilled`, payload: editedPost })
  })

  /* // Eventos de comentarios */
  socket.on(SocketEvents.ADD_COMMENT, (updatedComment: CommentResponse) => {
    dispatch({ type: `${CommentsActionTypes.ADD_COMMENT}/fulfilled`, payload: updatedComment })
  })

  socket.on(SocketEvents.EDIT_COMMENT, (updatedComment: CommentResponse) => {
    dispatch({ type: `${CommentsActionTypes.EDIT_COMMENT}/fulfilled`, payload: updatedComment })
  })

  socket.on(SocketEvents.DELETE_COMMENT, (updatedComment: CommentResponse) => {
    dispatch({ type: `${CommentsActionTypes.DELETE_COMMENT}/fulfilled`, payload: updatedComment })
  })

  socket.on(SocketEvents.LIKE_COMMENT, (updatedComment: CommentResponse) => {
    dispatch({ type: `${CommentsActionTypes.LIKE_COMMENT}/fulfilled`, payload: updatedComment })
  })
}
