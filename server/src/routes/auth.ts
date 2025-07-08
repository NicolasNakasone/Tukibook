import express from 'express'
import {
  changePassword,
  getMe,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from 'src/controllers/auth'
import { authenticateToken } from 'src/middlewares/authenticateToken'

export const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/me', authenticateToken, getMe)
authRouter.post('/refreshToken', refreshToken)
authRouter.post('/logout', logoutUser)
authRouter.put('/changePassword', changePassword)
