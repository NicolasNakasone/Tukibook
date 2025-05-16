import express from 'express'
import {
  addCommentToPost,
  addLikeToComment,
  deleteComment,
  editComment,
} from 'src/controllers/comments'
import { authenticateToken } from 'src/middlewares/authenticateToken'

export const commentsRouter = express.Router()

commentsRouter.use(authenticateToken)

commentsRouter.post('/', addCommentToPost)
commentsRouter.put('/:id', editComment)
commentsRouter.delete('/:id', deleteComment)
commentsRouter.patch('/:id/like', addLikeToComment)
