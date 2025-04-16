import { RequestHandler } from 'express'
import { Comment } from 'src/models/Comment'
import { Post } from 'src/models/Post'
import { isValidObjectId, validateRequiredFields } from 'src/utils'

export const addCommentToPost: RequestHandler = async (req, res, next) => {
  try {
    const { postId, username, content } = req.body

    // Primero se valida que todos los datos requeridos existan
    if (!validateRequiredFields(postId, username, content))
      return res.status(400).send({ message: 'Faltan datos para crear el comentario' })

    // Luego se valida que el post exista antes de crear el comentario
    const foundPost = await Post.findById(postId)
    if (!foundPost) return res.status(404).send({ message: 'Post no encontrado' })

    const newComment = new Comment({ postId, username, content })
    const savedComment = await newComment.save()

    // Solo se guarda el id del comentario, por mas que savedComment sea un IComment
    foundPost.comments.push(savedComment)
    await foundPost.save()

    res.status(201).send(savedComment)
  } catch (error) {
    next(error)
  }
}

export const editComment: RequestHandler = async (req, res, next) => {
  const { id: commentId } = req.params
  const { content } = req.body

  if (!isValidObjectId(commentId)) {
    return res.status(400).send({ message: 'Id del comentario inválido' })
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true })
    if (!updatedComment) {
      return res.status(404).send({ message: 'Comentario no encontrado' })
    }

    res.send(updatedComment)
  } catch (error) {
    next(error)
  }
}

export const deleteComment: RequestHandler = async (req, res, next) => {
  const { id: commentId } = req.params

  // TODO: Revisar que al parecer existe la misma funcion de mongoose
  if (!isValidObjectId(commentId)) {
    return res.status(400).send({ message: 'Id del comentario inválido' })
  }
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId)
    if (!deletedComment) {
      return res.status(404).send({ message: 'Comentario no encontrado' })
    }

    res.send(deletedComment)
  } catch (error) {
    next(error)
  }
}
