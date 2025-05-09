import { RequestHandler } from 'express'
import mongoose from 'mongoose'
import { Post } from 'src/models/Post'
import { isValidObjectId } from 'src/utils'

export const addLikeToPost: RequestHandler = async (req, res, next) => {
  const { id: postId } = req.params
  const userId = req.user?.id || ''

  if (!isValidObjectId(postId) || !isValidObjectId(userId)) {
    return res.status(400).send({ message: 'Datos inválidos' })
  }

  try {
    const foundPost = await Post.findById(postId)
    if (!foundPost) return res.status(404).send({ message: 'Post no encontrado' })

    const userObjectId = new mongoose.Types.ObjectId(userId)

    const alreadyLiked = foundPost.likes.some(like => like.equals(userObjectId))

    if (alreadyLiked) {
      foundPost.likes = foundPost.likes.filter(like => !like.equals(userObjectId))
    } else {
      foundPost.likes.push(userObjectId)
    }

    await foundPost.save()

    res.send(foundPost)
  } catch (error) {
    next(error)
  }
}
