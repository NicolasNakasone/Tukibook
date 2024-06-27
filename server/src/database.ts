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

const clientOptions: mongoose.ConnectOptions = {
  dbName: 'TukibookDB',
  serverApi: {
    version: ApiVersion.One,
    strict: true,
    deprecationErrors: true,
  },
}

export const connectDB = async () => {
  try {
    // Crea un cliente de Mongoose con un objeto MongoClientOptions para setear la version Stable API
    await mongoose.connect(MONGO_URI, clientOptions)
    await mongoose.connection.db.admin().command({ ping: 1 })
    // eslint-disable-next-line no-console
    console.log(`Base de datos ${mongoose.connection.name} conectada!`)
  } catch (error) {
    console.error(error)
  }
}
