import express from 'express'
import {
  addLikeToPost,
  addPost,
  deletePost,
  editPost,
  getPostById,
  getPosts,
} from 'src/controllers/posts'
import { authenticateToken } from 'src/middlewares/authenticateToken'
import { upload } from 'src/middlewares/multer'

export const postsRouter = express.Router()

postsRouter.get('/', getPosts)
postsRouter.get('/:id', getPostById)

postsRouter.use(authenticateToken)

postsRouter.post('/', upload.single('image'), addPost)
postsRouter.put('/:id', editPost)
postsRouter.delete('/:id', deletePost)
postsRouter.patch('/:id/like', addLikeToPost)
