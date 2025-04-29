import express from 'express'
import { loginUser, registerUser } from 'src/controllers/auth'

export const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
