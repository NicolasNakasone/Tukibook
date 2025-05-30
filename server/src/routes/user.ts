import express from 'express'
import { deleteUser } from 'src/controllers/users'
import { authenticateToken } from 'src/middlewares/authenticateToken'

export const usersRouter = express.Router()

usersRouter.use(authenticateToken)

usersRouter.post('/:id/delete', deleteUser)
