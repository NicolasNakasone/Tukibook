import { RequestHandler } from 'express'
import { IPost, Post } from 'src/models/Post'
import { IUser, User } from 'src/models/User'

export const searchAll: RequestHandler = async (req, res, next) => {
  const query = (req.query.q as string)?.trim()
  const type = (req.query.type as string) || 'all'
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  if (!query) return res.status(400).json({ message: 'Se debe ingresar una consulta de búsqueda' })

  try {
    const response: { users?: IUser[]; posts?: IPost[]; totalItems: number } = { totalItems: 0 }

    if (type === 'all' || type === 'users') {
      const [users, totalUsers] = await Promise.all([
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

      if (type === 'users') return res.json({ users, totalItems: totalUsers })
      response.users = users
      response.totalItems += totalUsers
    }

    if (type === 'all' || type === 'posts') {
      const [posts, totalPosts] = await Promise.all([
        Post.find({ content: { $regex: query, $options: 'i' } })
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip),
        Post.countDocuments({ content: { $regex: query, $options: 'i' } }),
      ])

      if (type === 'posts') return res.json({ posts, totalItems: totalPosts })
      response.posts = posts
      response.totalItems += totalPosts
    }

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
