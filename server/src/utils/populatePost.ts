import mongoose, { HydratedDocument } from 'mongoose'
import { IPost, Post } from 'src/models/Post'

export const populatePost = async (postDoc: HydratedDocument<IPost>) => {
  await postDoc.populate({
    path: 'comments',
    populate: { path: 'user', select: 'username _id' },
  })
  await postDoc.populate({ path: 'user', select: 'username _id' })
  return postDoc
}

export const populatePostQuery = (query: mongoose.Query<any, typeof Post>) => {
  return query
    .populate({ path: 'comments', populate: { path: 'user', select: 'username _id' } })
    .populate({ path: 'user', select: 'username _id' })
}
