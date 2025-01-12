import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.PORT

export const mongoUri =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

// export const mongoUri = process.env.TEST_MONGODB_URI
