import express from 'express'
import { addCommentToPost, deleteComment } from 'src/controllers/comments'

export const commentsRouter = express.Router()

commentsRouter.post('/', addCommentToPost)

commentsRouter.delete('/:id', deleteComment)
