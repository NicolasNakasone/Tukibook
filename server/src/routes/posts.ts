import express from 'express'
import mongoose from 'mongoose'
import { Post } from 'src/models/Post'
import { validateRequiredFields } from 'src/utils'

export const postsRouter = express.Router()

postsRouter.get('/', async (req, res, next) => {
  try {
    // Con populate se puede hacer un get a los comentarios, con los ids guardados en comments
    const posts = await Post.find({}).populate('comments')

    res.send(posts)
  } catch (error) {
    next(error)
  }
})

postsRouter.get('/:id', async (req, res, next) => {
  const { id: postId } = req.params

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).send({ message: 'Id del post inválido' })
  }

  try {
    const foundPost = await Post.findById(postId).populate('comments')
    if (!foundPost) return res.status(404).send({ message: 'Post no encontrado' })

    res.send(foundPost)
  } catch (error) {
    next(error)
  }
})

postsRouter.post('/', async (req, res, next) => {
  try {
    // No tiene sentido que un post antes de crearse ya tenga likes o comentarios
    const { username, content } = req.body

    if (!validateRequiredFields(username, content))
      return res.status(400).send({ message: 'Faltan datos para crear el post' })

    const newPost = new Post({ username, content })
    const savedPost = await newPost.save()

    res.status(201).send(savedPost)
  } catch (error) {
    next(error)
  }
})

postsRouter.delete('/:id', async (req, res, next) => {
  const { id: postId } = req.params

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).send({ message: 'Id del post inválido' })
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(postId)
    if (!deletedPost) {
      return res.status(404).send({ message: 'Post no encontrado' })
    }

    res.send(deletedPost)
  } catch (error) {
    next(error)
  }
})
