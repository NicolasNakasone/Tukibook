import mongoose from 'mongoose'
import { Post } from 'src/models/Post'

export const populateFullPost = (query: mongoose.Query<any, typeof Post>) => {
  return query
    .populate({ path: 'comments', populate: { path: 'user', select: 'username id' } })
    .populate({ path: 'user', select: 'username id' })
}
