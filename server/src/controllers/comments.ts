import { RequestHandler } from 'express'
import { Comment, IComment } from 'src/models/Comment'
import { Post } from 'src/models/Post'
import { isValidObjectId, validateRequiredFields } from 'src/utils'
import { populatePost } from 'src/utils/populatePost'

export const addCommentToPost: RequestHandler = async (req, res, next) => {
  try {
    const { postId, content, parentCommentId } = req.body

    if (!validateRequiredFields(postId, req.user?.id, content)) {
      return res.status(400).send({ message: 'Faltan datos para crear el comentario' })
    }

    if (!isValidObjectId(postId)) {
      return res.status(400).send({ message: 'Id del post inválido' })
    }

    if (parentCommentId && !isValidObjectId(parentCommentId)) {
      return res.status(400).send({ message: 'Id del comentario padre inválido' })
    }

    const foundPost = await Post.findById(postId)
    if (!foundPost) {
      return res.status(404).send({ message: 'Post no encontrado' })
    }

    const newComment = new Comment({
      postId,
      user: req.user?.id,
      content,
      parentCommentId: parentCommentId ?? null,
    })

    const savedComment = await newComment.save()

    foundPost.comments.unshift(savedComment._id)

    await foundPost.save()
    await populatePost(foundPost)

    res.status(201).send(foundPost)
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

    const updatedPost = await Post.findById(updatedComment.postId)
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

    const updatedPost = await Post.findById(deletedComment.postId)
    if (!updatedPost) {
      return res.status(404).send({ message: 'Post no encontrado luego de actualizar' })
    }
    res.send(updatedPost)
  } catch (error) {
    next(error)
  }
}
