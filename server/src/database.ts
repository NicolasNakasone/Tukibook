import { configDotenv } from 'dotenv'
import mongoose from 'mongoose'

configDotenv()

const { MONGO_URI } = process.env

if (!MONGO_URI) {
  throw new Error('Por favor define la variable MONGO_URI en el archivo .env')
}

enum ApiVersion {
  One = '1',
}

const clientOptions = {
  serverApi: { version: ApiVersion.One, strict: true, deprecationErrors: true },
}

export const connectDB = async () => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(MONGO_URI, clientOptions)
    await mongoose.connection.db.admin().command({ ping: 1 })
    // eslint-disable-next-line no-console
    console.log('Base de datos conectada!')
  } catch (error) {
    console.error(error)
  }
}
