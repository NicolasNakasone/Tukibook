import express from 'express'
import { getMe, loginUser, registerUser } from 'src/controllers/auth'
import { authenticateToken } from 'src/middlewares/authenticateToken'

export const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/me', authenticateToken, getMe)
