import { UploadApiResponse } from 'cloudinary'
import { RequestHandler } from 'express'
import mongoose, { SortOrder } from 'mongoose'
import { cloudinary } from 'src/cloudinary'
import { Comment } from 'src/models/Comment'
import { Post } from 'src/models/Post'
import { isValidObjectId, parseFilters, validateRequiredFields } from 'src/utils'
import { populateDocument, populateDocumentQuery } from 'src/utils/populateDocument'
import {
  GetPostsParams,
  GetPostsResponse,
  Post as IPost,
  PAGE_LIMIT,
  PostList,
  SortType,
} from 'tukibook-helper'

export const getPosts: RequestHandler = async (req, res) => {
  const { page = 1, limit = PAGE_LIMIT, filters } = req.query

  const offset = (Number(page) - 1) * Number(limit)

  const queryFilters =
    typeof filters === 'string' ? parseFilters<GetPostsParams['filters']>(filters) : {}

  // if (typeof filters === 'string') {
  //   try {
  //     queryFilters = JSON.parse(filters) || {}
  //   } catch (error) {
  //     return res.status(400).send({ message: 'Parámetros de filtro inválidos' })
  //   }
  // }

  const { sort, ...restOfFilters } = queryFilters || {}

  const sortOptions:
    | string
    | { [key: string]: SortOrder | { $meta: any } }
    | [string, SortOrder][]
    | null
    | undefined = sort === SortType.OLDEST ? { createdAt: 1 } : { createdAt: -1 }

  const posts = await Post.find(restOfFilters)
    .sort(sortOptions)
    .limit(Number(limit))
    .skip(Number(offset))

  const totalItems = await Post.countDocuments(restOfFilters)

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

    let newImage: IPost['image'] = { url: '', publicId: '' }

    if (req.file) {
      const buffer = req.file.buffer

      const uploadResult: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'Tukibook/posts', resource_type: 'image', format: 'webp' },
            (err, result) => {
              if (err) reject(err)
              else resolve(result)
            }
          )
          .end(buffer)
      })

      newImage = { url: uploadResult?.secure_url || '', publicId: uploadResult?.public_id || '' }
    }

    const newPost = new Post({ user: req.user?.id, content, image: newImage })
    const savedPost = await newPost.save()

    await populateDocument(savedPost)

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
    const updatedPost = await populateDocumentQuery(
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

    if (deletedPost.image?.publicId) {
      await cloudinary.uploader.destroy(deletedPost.image.publicId)
    }

    res.send(deletedPost)
  } catch (error) {
    next(error)
  }
}

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
