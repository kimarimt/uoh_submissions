import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './gql/schema.js'
import { resolvers } from './gql/resolvers.js'

import User from './models/user.js'

dotenv.config()

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connectint to MongoDB:', error.message))

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)

      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`[server] listening at ${url}`)
})
