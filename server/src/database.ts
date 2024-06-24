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
    console.log('MongoDB conectado')
  } catch (error) {
    console.error(error)
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect()
  }
}
