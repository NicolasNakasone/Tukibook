import { RequestHandler } from 'express'
import { Comment } from 'src/models/Comment'
import { Post } from 'src/models/Post'
import { isValidObjectId, validateRequiredFields } from 'src/utils'
import { populatePost, populatePostQuery } from 'src/utils/populatePost'
import { GetPostsResponse, PostList } from 'tukibook-helper'

export const getPosts: RequestHandler = async (req, res) => {
  const { page = 1, limit = 10 } = req.query

  const offset = (Number(page) - 1) * Number(limit)

  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip(Number(offset))

  const totalItems = await Post.countDocuments()

  const response: GetPostsResponse = {
    posts: posts as unknown as PostList,
    totalItems,
  }
  res.status(200).json(response)
}

export const getPostById: RequestHandler = async (req, res, next) => {
  const { id: postId } = req.params

  if (!isValidObjectId(postId)) {
    return res.status(400).send({ message: 'Id del post inválido' })
  }

  try {
    const foundPost = await Post.findById(postId)
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

    await populatePost(savedPost)

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
    const updatedPost = await populatePostQuery(
      Post.findByIdAndUpdate(postId, { content }, { new: true })
    )

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

    await Comment.deleteMany({ postId: deletedPost._id })

    res.send(deletedPost)
  } catch (error) {
    next(error)
  }
}
