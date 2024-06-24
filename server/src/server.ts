import cors from 'cors'
import { configDotenv } from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import logger from 'morgan'
import { connectDB } from 'src/database'

configDotenv()

const { API_PORT, CLIENT_URL } = process.env

connectDB()

export const server = express()

server.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
)

server.set('port', API_PORT || 4000)

server.use(logger('dev'))
server.use(express.json({ limit: '50mb' }))

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // @ts-expect-error Type Error does not include status
  const status = err.status || 500
  const message = err.message /* || err */ || 'Internal Server Error'
  console.error(err)
  res.status(status).send(message)
  next()
})
