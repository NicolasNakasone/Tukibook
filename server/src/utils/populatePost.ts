import mongoose, { HydratedDocument } from 'mongoose'
import { IPost, Post } from 'src/models/Post'

export const populatePost = async (postDoc: HydratedDocument<IPost>) => {
  await postDoc.populate({
    path: 'comments',
    populate: { path: 'user', select: 'username id email' },
  })
  await postDoc.populate({ path: 'user', select: 'username id email' })
  return postDoc
}

export const populatePostQuery = (query: mongoose.Query<any, typeof Post>) => {
  return query
    .populate({ path: 'comments', populate: { path: 'user', select: 'username id email' } })
    .populate({ path: 'user', select: 'username id email' })
}
