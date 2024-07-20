import { RequestHandler } from 'express'
import { Post } from 'src/models/Post'
import { isValidObjectId } from 'src/utils'

export const addLikeToPost: RequestHandler = async (req, res, next) => {
  const { id: postId } = req.params

  if (!isValidObjectId(postId)) {
    return res.status(400).send({ message: 'Id del post inválido' })
  }

  try {
    const foundPost = await Post.findById(postId)
    if (!foundPost) return res.status(404).send({ message: 'Post no encontrado' })

    foundPost.likes += 1
    const updatedPost = await foundPost.save()

    res.send(updatedPost)
  } catch (error) {
    next(error)
  }
}
