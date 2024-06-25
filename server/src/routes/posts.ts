import express from 'express'
import mongoose from 'mongoose'
import { Post } from 'src/models/Post'

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
  const { id: paramId } = req.params

  if (!mongoose.Types.ObjectId.isValid(paramId)) {
    return res.status(400).send({ message: 'Id del post inválido' })
  }

  try {
    const foundPost = await Post.findById(paramId)
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

    const newPost = new Post({ username, content, likes, comments })
    const savedPost = await newPost.save()

    res.status(201).send(savedPost)
  } catch (error) {
    next(error)
  }
})
