import express from 'express'
import {
  addComment,
  addLikeToComment,
  deleteComment,
  editComment,
  getCommentsByPostId,
} from 'src/controllers/comments'
import { authenticateToken } from 'src/middlewares/authenticateToken'

export const commentsRouter = express.Router()

commentsRouter.use(authenticateToken)

commentsRouter.get('/:postId', getCommentsByPostId)
commentsRouter.post('/', addComment)
commentsRouter.put('/:id', editComment)
commentsRouter.delete('/:id', deleteComment)
commentsRouter.patch('/:id/like', addLikeToComment)
