import http from 'http'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { WebSocketServer } from 'ws'
import { expressMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { useServer } from 'graphql-ws/use/ws'
import { typeDefs } from './gql/schema.js'
import { resolvers } from './gql/resolvers.js'
import User from './models/user.js'

dotenv.config()

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connectint to MongoDB:', error.message))

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          )

          const currentUser = await User.findById(decodedToken.id)

          return { 
            currentUser
          }
        }
      },
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`[server] listening at http://localhost:${PORT}`)
  )
}

start()
