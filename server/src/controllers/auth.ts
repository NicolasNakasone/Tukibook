import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { passwordPattern } from 'src/constants/regexps'
import { routes } from 'src/constants/routes'
import { User } from 'src/models/User'
import { generateRefreshToken, generateToken, validateRequiredFields } from 'src/utils'

const { JWT_REFRESH_SECRET } = process.env

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    if (!validateRequiredFields(username, email, password))
      return res.status(400).send({ message: 'Faltan datos para registrarse' })

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    })

    if (existingUser) return res.status(400).send({ message: 'Email o username ya están en uso' })

    if (!passwordPattern.test(password))
      return res.status(400).send({
        message:
          'La contraseña debe tener mínimo 8 caracteres, incluyendo mayúsculas, minúsculas, un número y un símbolo',
      })

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()

    res.status(201).send(savedUser)
  } catch (error) {
    next(error)
  }
}

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!validateRequiredFields(email, password))
      return res.status(400).send({ message: 'Faltan datos para iniciar sesión' })

    const existingUser = await User.findOne({ email })
    if (!existingUser) return res.status(401).send({ message: 'Usuario no registrado' })

    const isSamePassword = await bcrypt.compare(password, existingUser.password)
    if (!isSamePassword) return res.status(401).send({ message: 'La contraseña es incorrecta' })

    const userPayload = {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
    }

    const accessToken = generateToken(userPayload)
    const refreshToken = generateRefreshToken(userPayload)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: routes.refreshToken,
      maxAge: 1000 * 60 * 60 * 24,
    })

    res.send({
      user: userPayload,
      token: accessToken,
    })
  } catch (error) {
    next(error)
  }
}

export const getMe: RequestHandler = async (req, res) => {
  if (!req.user) return res.status(401).send({ message: 'No autorizado' })
  res.send(req.user)
}

export const refreshToken: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.refreshToken
    if (!token || !JWT_REFRESH_SECRET) return res.status(401).send({ message: 'No autorizado' })

    const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as { id: string }

    const user = await User.findById(decoded.id)
    if (!user) return res.status(401).send({ message: 'Usuario no encontrado' })

    const newAccessToken = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
    })

    res.send({ accessToken: newAccessToken })
  } catch (error) {
    return res.status(403).send({ message: 'Token inválido o expirado' })
  }
}

export const logoutUser: RequestHandler = (req, res, next) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: routes.refreshToken,
    })
    res.send({ message: 'Sesión cerrada correctamente' })
  } catch (error) {
    next(error)
  }
}
