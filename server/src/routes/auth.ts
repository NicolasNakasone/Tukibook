import express from 'express'
import { registerUser } from 'src/controllers/auth'

export const authRouter = express.Router()

authRouter.post('/register', registerUser)
