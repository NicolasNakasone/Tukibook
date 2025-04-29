import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { passwordPattern } from 'src/constants/regexps'
import { User } from 'src/models/User'
import { generateToken, validateRequiredFields } from 'src/utils'

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

    const token = generateToken({
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
    })

    res.send({
      user: {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      },
      token,
    })
  } catch (error) {
    next(error)
  }
}
