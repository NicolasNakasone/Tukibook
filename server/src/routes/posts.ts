import express from 'express'
import { Post } from 'src/models/Post'

export const postsRouter = express.Router()

postsRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find({})
    const mappedPosts = posts.map(({ username, content, likes, comments }) => ({
      username,
      content,
      likes,
      comments,
    }))

    res.send(mappedPosts)
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
