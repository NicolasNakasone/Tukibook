import express from 'express'

export const postsRouter = express.Router()

postsRouter.get('/', (req, res, next) => {
  try {
    res.send('posts')
  } catch (error) {
    next(error)
  }
})
