import { RequestHandler } from 'express'
import mongoose from 'mongoose'
import { Comment } from 'src/models/Comment'
import { Post } from 'src/models/Post'
import { isValidObjectId, validateRequiredFields } from 'src/utils'
import { CommentList, CommentResponse, GetCommentsResponse, PAGE_LIMIT } from 'tukibook-helper'

export const getCommentsByPostId: RequestHandler = async (req, res, next) => {
  const { page = 1, limit = PAGE_LIMIT } = req.query
  const { postId } = req.params

  const offset = (Number(page) - 1) * Number(limit)

  if (!isValidObjectId(postId)) {
    return res.status(400).send({ message: 'Id del post inválido' })
  }
  try {
    const foundPost = await Post.findById(postId)
    if (!foundPost) return res.status(404).send({ message: 'Post no encontrado' })

    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(offset))

    const totalItems = await Comment.countDocuments({ postId })

    const response: GetCommentsResponse = {
      comments: comments as unknown as CommentList,
      totalItems,
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const addComment: RequestHandler = async (req, res, next) => {
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

    const commentResponse: CommentResponse = { comment: savedComment.toObject(), postId }

    res.status(201).send(commentResponse)
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

    const commentResponse: CommentResponse = {
      comment: updatedComment.toObject(),
      postId: updatedComment.postId.toString(),
    }

    res.send(commentResponse)
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

    const commentResponse: CommentResponse = {
      comment: deletedComment.toObject(),
      postId: deletedComment.postId.toString(),
    }

    res.send(commentResponse)
  } catch (error) {
    next(error)
  }
}

export const addLikeToComment: RequestHandler = async (req, res, next) => {
  const { id: commentId } = req.params
  const userId = req.user?.id || ''

  if (!isValidObjectId(commentId) || !isValidObjectId(userId)) {
    return res.status(400).send({ message: 'Datos inválidos' })
  }

  try {
    const foundComment = await Comment.findById(commentId)
    if (!foundComment) return res.status(404).send({ message: 'Comentario no encontrado' })

    const userObjectId = new mongoose.Types.ObjectId(userId)

    const alreadyLiked = foundComment.likes.some(like => like.equals(userObjectId))

    if (alreadyLiked) {
      foundComment.likes = foundComment.likes.filter(like => !like.equals(userObjectId))
    } else {
      foundComment.likes.push(userObjectId)
    }

    const savedComment = await foundComment.save()

    const updatedPost = await Post.findById(foundComment.postId)
    if (!updatedPost) {
      return res.status(404).send({ message: 'Post no encontrado luego de actualizar' })
    }

    const commentResponse: CommentResponse = {
      comment: savedComment.toObject(),
      postId: savedComment.postId.toString(),
    }

    res.send(commentResponse)
  } catch (error) {
    next(error)
  }
}
