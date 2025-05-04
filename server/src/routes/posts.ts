import express from 'express'
import { addPost, deletePost, editPost, getPostById, getPosts } from 'src/controllers/posts'
import { authenticateToken } from 'src/middlewares/authenticateToken'

export const postsRouter = express.Router()

postsRouter.get('/', getPosts)

postsRouter.get('/:id', getPostById)

postsRouter.post('/', authenticateToken, addPost)

postsRouter.put('/:id', editPost)

postsRouter.delete('/:id', deletePost)
