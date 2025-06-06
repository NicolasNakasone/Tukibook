import express from 'express'
import { searchAll } from 'src/controllers/search'
import { authenticateToken } from 'src/middlewares/authenticateToken'

export const searchRouter = express.Router()

searchRouter.use(authenticateToken)

searchRouter.get('/', searchAll)
