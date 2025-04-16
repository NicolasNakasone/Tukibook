import express from 'express'
import { addCommentToPost, deleteComment, editComment } from 'src/controllers/comments'

export const commentsRouter = express.Router()

commentsRouter.post('/', addCommentToPost)

commentsRouter.put('/:id', editComment)

commentsRouter.delete('/:id', deleteComment)
