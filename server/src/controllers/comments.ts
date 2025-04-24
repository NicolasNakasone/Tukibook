import { RequestHandler } from 'express'
import { Comment } from 'src/models/Comment'
import { Post } from 'src/models/Post'
import { isValidObjectId, validateRequiredFields } from 'src/utils'
import { populateFullPost } from 'src/utils/populatePost'

export const addCommentToPost: RequestHandler = async (req, res, next) => {
  try {
    const { postId, username, content } = req.body

    if (!validateRequiredFields(postId, username, content)) {
      return res.status(400).send({ message: 'Faltan datos para crear el comentario' })
    }

    if (!isValidObjectId(postId)) {
      return res.status(400).send({ message: 'ID del post inválido' })
    }

    const foundPost = await Post.findById(postId)
    if (!foundPost) {
      return res.status(404).send({ message: 'Post no encontrado' })
    }

    const newComment = new Comment({ postId, username, content })
    const savedComment = await newComment.save()

    foundPost.comments.unshift(savedComment)
    await foundPost.save()

    const updatedPost = await populateFullPost(Post.findById(postId))
    if (!updatedPost) {
      return res.status(404).send({ message: 'Post no encontrado luego de actualizar' })
    }

    res.status(201).send(updatedPost)
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

    const updatedPost = await populateFullPost(Post.findById(updatedComment.postId))
    if (!updatedPost) {
      return res.status(404).send({ message: 'Post no encontrado luego de actualizar' })
    }
    res.send(updatedPost)
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

    const updatedPost = await populateFullPost(Post.findById(deletedComment.postId))
    if (!updatedPost) {
      return res.status(404).send({ message: 'Post no encontrado luego de actualizar' })
    }
    res.send(updatedPost)
  } catch (error) {
    next(error)
  }
}
