import express from 'express'
import { addCommentToPost } from 'src/controllers/comments'

export const commentsRouter = express.Router()

commentsRouter.post('/', addCommentToPost)
