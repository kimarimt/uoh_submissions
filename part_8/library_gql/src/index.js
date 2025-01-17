import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { authors, books } from './library_data.js'

const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    authorsCount: Int!
    booksCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    authorsCount: () => authors.length,
    booksCount: () => books.length,
    allBooks: () => books,
    allAuthors: () => authors,
  },
  Author: {
    bookCount: root => books.filter(b => b.author === root.name).length,
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
