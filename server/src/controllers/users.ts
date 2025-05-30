import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { Comment } from 'src/models/Comment'
import { Post } from 'src/models/Post'
import { User } from 'src/models/User'
import { UserPayload } from 'tukibook-helper/index'

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

    const { email, id, username } = user

    const deletedUser: UserPayload = { email, id, username }

    res.status(200).json({ user: deletedUser, message: 'Cuenta eliminada exitosamente' })
  } catch (error) {
    next(error)
  }
}
