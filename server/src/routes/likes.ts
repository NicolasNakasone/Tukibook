import express from 'express'
import { addLikeToPost } from 'src/controllers/likes'

export const likesRouter = express.Router()

likesRouter.patch('/:id', addLikeToPost)
