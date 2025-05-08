import express from 'express'
import { addLikeToPost } from 'src/controllers/likes'
import { authenticateToken } from 'src/middlewares/authenticateToken'

export const likesRouter = express.Router()

likesRouter.use(authenticateToken)

likesRouter.patch('/:id', addLikeToPost)
