import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `
  type Query {
    dummy: Int
  }
`

const resolvers = {
  Query: {
    dummy: () => 0,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`[server] listening at ${url}`)
})