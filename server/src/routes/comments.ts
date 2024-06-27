import express from 'express'
import { Comment } from 'src/models/Comment'
import { Post } from 'src/models/Post'
import { validateRequiredFields } from 'src/utils'

export const commentsRouter = express.Router()

commentsRouter.post('/', async (req, res, next) => {
  try {
    const { postId, username, content } = req.body

    // Primero se valida que el post exista antes de crear el comentario
    const foundPost = await Post.findById(postId)
    if (!foundPost) return res.status(404).send({ message: 'Post no encontrado' })

    if (!validateRequiredFields(postId, username, content))
      return res.status(400).send({ message: 'Faltan datos para crear el comentario' })

    const newComment = new Comment({ postId, username, content })
    const savedComment = await newComment.save()

    // Solo se guarda el id del comentario, por mas que savedComment sea un IComment
    foundPost.comments.push(savedComment)
    await foundPost.save()

    res.status(201).send(savedComment)
  } catch (error) {
    next(error)
  }
})
