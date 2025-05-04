import { RequestHandler } from 'express'
import { Post } from 'src/models/Post'
import { isValidObjectId, validateRequiredFields } from 'src/utils'
import { GetPostsResponse, PostList } from 'tukibook-helper'

export const getPosts: RequestHandler = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query

  const offset = (Number(page) - 1) * Number(limit)

  try {
    // Con populate se puede hacer un get a los comentarios, con los ids guardados en comments
    const posts = await Post.find({})
      .populate('comments')
      .populate('user', 'username')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(offset)

    const totalItems = await Post.countDocuments()

    const response: GetPostsResponse = {
      posts: posts as unknown as PostList,
      totalItems,
    }
    res.send(response)
  } catch (error) {
    next(error)
  }
}

export const getPostById: RequestHandler = async (req, res, next) => {
  const { id: postId } = req.params

  if (!isValidObjectId(postId)) {
    return res.status(400).send({ message: 'Id del post inválido' })
  }

  try {
    const foundPost = await Post.findById(postId).populate('comments')
    if (!foundPost) return res.status(404).send({ message: 'Post no encontrado' })

    res.send(foundPost)
  } catch (error) {
    next(error)
  }
}

export const addPost: RequestHandler = async (req, res, next) => {
  try {
    const { content } = req.body
    if (!validateRequiredFields(req.user?.id, content))
      return res.status(400).send({ message: 'Faltan datos para crear el post' })

    const newPost = new Post({ user: req.user?.id, content })
    const savedPost = await newPost.save()

    res.status(201).send(savedPost)
  } catch (error) {
    next(error)
  }
}

export const editPost: RequestHandler = async (req, res, next) => {
  const { id: postId } = req.params
  const { content } = req.body

  if (!isValidObjectId(postId)) {
    return res.status(400).send({ message: 'Id del post inválido' })
  }

  // if (typeof content !== 'string' || !content.trim()) {
  //   return res.status(400).send({ message: 'El contenido no puede estar vacío' })
  // }

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, { content }, { new: true }).populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } },
    })

    if (!updatedPost) {
      return res.status(404).send({ message: 'Post no encontrado' })
    }

    res.send(updatedPost)
  } catch (error) {
    next(error)
  }
}

export const deletePost: RequestHandler = async (req, res, next) => {
  const { id: postId } = req.params

  if (!isValidObjectId(postId)) {
    return res.status(400).send({ message: 'Id del post inválido' })
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(postId)
    if (!deletedPost) {
      return res.status(404).send({ message: 'Post no encontrado' })
    }

    res.send(deletedPost)
  } catch (error) {
    next(error)
  }
}
