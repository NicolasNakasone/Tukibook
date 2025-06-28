import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { Comment } from 'src/models/Comment'
import { Post } from 'src/models/Post'
import { User } from 'src/models/User'
import { isValidObjectId } from 'src/utils'

export const getUserById: RequestHandler = async (req, res, next) => {
  const { id: userId } = req.params

  if (!isValidObjectId(userId)) {
    return res.status(400).send({ message: 'Id del usuario inválido' })
  }

  try {
    const foundUser = await User.findById(userId)
    if (!foundUser) return res.status(404).send({ message: 'Usuario no encontrado' })

    res.send(foundUser)
  } catch (error) {
    next(error)
  }
}

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const userIdFromToken = req.user?.id
    const userIdFromParams = req.params.id
    const { password } = req.body

    if (!password) {
      return res.status(400).json({ message: 'La contraseña es requerida' })
    }

    if (userIdFromToken !== userIdFromParams) {
      return res.status(403).json({ message: 'No autorizado para eliminar este usuario' })
    }

    const user = await User.findById(userIdFromToken)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' })
    }

    await Comment.deleteMany({ user: userIdFromToken })
    await Post.deleteMany({ user: userIdFromToken })

    await Post.updateMany({}, { $pull: { likes: userIdFromToken } })
    await Comment.updateMany({}, { $pull: { likes: userIdFromToken } })

    await User.findByIdAndDelete(userIdFromToken)

    res.clearCookie('refreshToken')

    res.status(200).json({ user, message: 'Cuenta eliminada exitosamente' })
  } catch (error) {
    next(error)
  }
}
