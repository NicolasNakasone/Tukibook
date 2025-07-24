import mongoose, { Document, HydratedDocument } from 'mongoose'

export const populateDocument = async <T extends Document>(document: HydratedDocument<T>) => {
  await document.populate({ path: 'user', select: 'username id email avatar' })
  return document
}

export const populateDocumentQuery = <T>(query: mongoose.Query<any, T>) => {
  return query.populate({ path: 'user', select: 'username id email avatar' })
}
