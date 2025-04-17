import { socket } from 'src/sockets'
import { AppDispatch } from 'src/states/store'
import { PostsActionTypes } from 'src/types/reducer'
import { SocketEvents, Post, Comment } from 'tukibook-helper'

export const registerPostListeners = (dispatch: AppDispatch) => {
  socket.on(SocketEvents.NEW_POST, (createdPost: Post) => {
    dispatch({ type: `${PostsActionTypes.ADD_POST}/fulfilled`, payload: createdPost })
  })

  socket.on(SocketEvents.DELETE_POST, (deletedPost: Post) => {
    dispatch({ type: `${PostsActionTypes.DELETE_POST}/fulfilled`, payload: deletedPost })
  })

  socket.on(SocketEvents.LIKE_POST, (updatedPost: Post) => {
    dispatch({ type: `${PostsActionTypes.LIKE_POST}/fulfilled`, payload: updatedPost })
  })

  socket.on(SocketEvents.EDIT_POST, (editedPost: Post) => {
    dispatch({ type: `${PostsActionTypes.EDIT_POST}/fulfilled`, payload: editedPost })
  })

  socket.on(SocketEvents.COMMENT_POST, (newComment: Comment) => {
    dispatch({ type: `${PostsActionTypes.COMMENT_POST}/fulfilled`, payload: newComment })
  })

  socket.on(SocketEvents.EDIT_COMMENT, (updatedComment: Comment) => {
    dispatch({
      type: `${PostsActionTypes.EDIT_COMMENT}/fulfilled`,
      payload: updatedComment,
    })
  })

  socket.on(SocketEvents.DELETE_COMMENT, (deletedComment: Comment) => {
    dispatch({ type: `${PostsActionTypes.DELETE_COMMENT}/fulfilled`, payload: deletedComment })
  })
}
