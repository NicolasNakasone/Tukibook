import mongoose, { HydratedDocument } from 'mongoose'
import { IPost, Post } from 'src/models/Post'

// Refactorizar a populateModel y pasarle por parametro el tipo
export const populatePost = async (postDoc: HydratedDocument<IPost>) => {
  // Este populate ya no iria
  // await postDoc.populate({
  //   path: 'comments',
  //   populate: { path: 'user', select: 'username id email avatar' },
  // })
  await postDoc.populate({ path: 'user', select: 'username id email avatar' })
  return postDoc
}

// Refactorizar a populateModelQuery y pasarle por parametro el tipo
export const populatePostQuery = (query: mongoose.Query<any, typeof Post>) => {
  return (
    query
      // Este populate tampoco
      // .populate({
      //   path: 'comments',
      //   populate: { path: 'user', select: 'username id email avatar' },
      // })
      .populate({ path: 'user', select: 'username id email avatar' })
  )
}
