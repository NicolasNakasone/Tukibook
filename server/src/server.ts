import { createServer } from 'http'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import logger from 'morgan'
import { connectDB } from 'src/database'
import { router } from 'src/routes'
import { initializeSocket } from 'src/sockets'

configDotenv()

const { API_PORT, CLIENT_URL } = process.env

connectDB()

export const server = express()
export const httpServer = createServer(server)

server.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
)

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CLIENT_URL || '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Authorization, Accept'
  )
  next()
})

server.set('port', API_PORT || 4000)

server.use(logger('dev'))
server.use(express.json({ limit: '50mb' }))
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())

server.use('/', router)

initializeSocket(httpServer)

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500
  const message = err.message /* || err */ || 'Internal Server Error'
  console.error(err)
  res.status(status).send(message)
  next()
})
