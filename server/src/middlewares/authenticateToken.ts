import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { UserPayload } from 'tukibook-helper'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}

const { JWT_SECRET } = process.env

export const authenticateToken: RequestHandler = (req, res, next) => {
  if (!JWT_SECRET) {
    throw new Error('Falta la variable JWT_SECRET en el entorno')
  }

  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Token no provisto' })

  const token = authHeader.split(' ')[1]

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      const msg = err.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido o corrupto'

      return res.status(401).json({ message: msg })
    }

    req.user = decoded as UserPayload
    next()
  })
}
