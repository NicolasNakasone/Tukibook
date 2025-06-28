import express from 'express'
import { deleteUser, editUser, getUserById } from 'src/controllers/users'
import { authenticateToken } from 'src/middlewares/authenticateToken'

export const usersRouter = express.Router()

usersRouter.get('/:id', getUserById)

usersRouter.use(authenticateToken)

usersRouter.post('/:id/delete', deleteUser)
usersRouter.put('/:id', editUser)
