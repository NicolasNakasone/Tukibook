import express from 'express'
import { addPost, deletePost, editPost, getPostById, getPosts } from 'src/controllers/posts'

export const postsRouter = express.Router()

postsRouter.get('/', getPosts)

postsRouter.get('/:id', getPostById)

postsRouter.post('/', addPost)

postsRouter.put('/:id', editPost)

postsRouter.delete('/:id', deletePost)
