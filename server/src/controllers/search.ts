import { RequestHandler } from 'express'
import { IPost, Post } from 'src/models/Post'
import { IUser, User } from 'src/models/User'
import { PAGE_LIMIT, SearchType } from 'tukibook-helper'

export const searchAll: RequestHandler = async (req, res, next) => {
  const query = (req.query.q as string)?.trim()
  const type = (req.query.type as string) || SearchType.ALL
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || PAGE_LIMIT
  const skip = (page - 1) * limit

  if (!query) {
    return res.status(400).json({ message: 'Se debe ingresar una consulta de búsqueda' })
  }

  try {
    let users: IUser[] = []
    let posts: IPost[] = []
    let totalUsers = 0
    let totalPosts = 0

    if (type === SearchType.ALL || type === SearchType.USERS) {
      const [foundUsers, countUsers] = await Promise.all([
        User.find({
          $or: [
            { username: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
          ],
        })
          .select('id username email')
          .limit(limit)
          .skip(skip),
        User.countDocuments({
          $or: [
            { username: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
          ],
        }),
      ])
      users = foundUsers
      totalUsers = countUsers

      if (type === SearchType.USERS) {
        return res.status(200).json({ users, totalUsers })
      }
    }

    if (type === SearchType.ALL || type === SearchType.POSTS) {
      const [foundPosts, countPosts] = await Promise.all([
        Post.find({ content: { $regex: query, $options: 'i' } })
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip),
        Post.countDocuments({ content: { $regex: query, $options: 'i' } }),
      ])
      posts = foundPosts
      totalPosts = countPosts

      if (type === SearchType.POSTS) {
        return res.status(200).json({ posts, totalPosts })
      }
    }

    res.status(200).json({
      posts,
      totalPosts,
      users,
      totalUsers,
    })
  } catch (error) {
    next(error)
  }
}
