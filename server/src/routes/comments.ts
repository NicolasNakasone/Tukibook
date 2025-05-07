import express from 'express'
import { addCommentToPost, deleteComment, editComment } from 'src/controllers/comments'
import { authenticateToken } from 'src/middlewares/authenticateToken'

export const commentsRouter = express.Router()

commentsRouter.post('/', authenticateToken, addCommentToPost)

commentsRouter.put('/:id', editComment)

commentsRouter.delete('/:id', deleteComment)
