import express from 'express'
import { routes } from 'src/constants/routes'
import { postsRouter } from 'src/routes/posts'

export const router = express.Router()

router.use(routes.posts, postsRouter)

router.get(routes.home, (req, res, next) => {
  try {
    res.send(`<h1>Tukibook API!<h1>`)
  } catch (error) {
    next(error)
  }
})
