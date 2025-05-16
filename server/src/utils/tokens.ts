import jwt from 'jsonwebtoken'
import { UserPayload } from 'tukibook-helper'

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no definido en las variables de entorno')
}

if (!JWT_REFRESH_SECRET) {
  throw new Error('JWT_REFRESH_SECRET no definido en las variables de entorno')
}

type TimeSpan = number | `${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'y'}`

export const generateToken = (payload: UserPayload, expiresIn: TimeSpan = '15m') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export const generateRefreshToken = (payload: UserPayload, expiresIn: TimeSpan = '1d') => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn })
}
