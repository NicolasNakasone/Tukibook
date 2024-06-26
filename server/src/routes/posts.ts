import express from 'express'
import mongoose from 'mongoose'
import { Post } from 'src/models/Post'
import { validateRequiredFields } from 'src/utils'

export const postsRouter = express.Router()

postsRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find({})
    const mappedPosts = posts.map(
      ({ createdAt, comments, content, id, likes, updatedAt, username }) => ({
        id,
        username,
        content,
        likes,
        comments,
        createdAt,
        updatedAt,
      })
    )

    res.send(mappedPosts)
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
    const foundPost = await Post.findById(postId)
    if (!foundPost) return res.status(404).send({ message: 'Post no encontrado' })

    const { id, username, content, likes, comments, createdAt, updatedAt } = foundPost

    res.send({ id, username, content, likes, comments, createdAt, updatedAt })
  } catch (error) {
    next(error)
  }
})

postsRouter.post('/', async (req, res, next) => {
  try {
    const { username, content, likes, comments } = req.body

    if (!validateRequiredFields(username, content))
      return res.status(400).send({ message: 'Faltan datos para crear el post' })

    const newPost = new Post({ username, content, likes, comments })
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
