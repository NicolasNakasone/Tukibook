import express from 'express'
import { routes } from 'src/constants/routes'
import { commentsRouter } from 'src/routes/comments'
import { postsRouter } from 'src/routes/posts'

export const router = express.Router()

router.use(routes.posts, postsRouter)
router.use(routes.comments, commentsRouter)

router.get(routes.home, (req, res, next) => {
  try {
    res.send(`<h1>Tukibook API!<h1>`)
  } catch (error) {
    next(error)
  }
})
