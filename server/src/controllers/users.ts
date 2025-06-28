import bcrypt from 'bcrypt'
import { UploadApiResponse } from 'cloudinary'
import { RequestHandler } from 'express'
import { cloudinary } from 'src/cloudinary'
import { Comment } from 'src/models/Comment'
import { Post } from 'src/models/Post'
import { IUser, User } from 'src/models/User'
import { isValidObjectId } from 'src/utils'
import { UpdateUserInput } from 'tukibook-helper'

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

    const userPosts = await Post.find({ user: userIdFromToken })

    const destroyImagePromises = userPosts
      .filter(post => post.image?.publicId)
      .map(post => cloudinary.uploader.destroy(post.image!.publicId))

    await Promise.all(destroyImagePromises)

    if (user.avatar?.publicId) await cloudinary.uploader.destroy(user.avatar.publicId)

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

export const editUser: RequestHandler = async (req, res, next) => {
  try {
    const userIdFromToken = req.user?.id
    const userIdFromParams = req.params.id
    const { email, username }: UpdateUserInput = req.body

    if (userIdFromToken !== userIdFromParams) {
      return res.status(403).json({ message: 'No autorizado para editar este usuario' })
    }

    const user = await User.findById(userIdFromToken)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    if (!email && !username && !req.file) {
      return res.status(400).json({ message: 'No hay datos para actualizar' })
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
      _id: { $ne: userIdFromToken },
    })

    if (existingUser) return res.status(400).send({ message: 'Email o username ya están en uso' })

    let updatedAvatar: IUser['avatar'] = user.avatar

    if (req.file) {
      const buffer = req.file.buffer

      const uploadResult: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'Tukibook/users', resource_type: 'image', format: 'webp' },
            (err, result) => {
              if (err) reject(err)
              else resolve(result)
            }
          )
          .end(buffer)
      })

      updatedAvatar = {
        url: uploadResult?.secure_url || '',
        publicId: uploadResult?.public_id || '',
      }

      if (user.avatar?.publicId) await cloudinary.uploader.destroy(user.avatar.publicId)
    }

    const updatedUser = await User.findByIdAndUpdate(
      userIdFromToken,
      { email, username, avatar: updatedAvatar },
      { new: true }
    )
    if (!updatedUser) {
      return res.status(404).send({ message: 'Usuario no encontrado luego de actualizar' })
    }

    res.send(updatedUser)
  } catch (error) {
    next(error)
  }
}
