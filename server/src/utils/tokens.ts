import jwt from 'jsonwebtoken'
import { UserPayload } from 'tukibook-helper'

const { JWT_SECRET } = process.env

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no definido en las variables de entorno')
}

export const generateToken = (payload: UserPayload, expiresIn = '15m') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}
