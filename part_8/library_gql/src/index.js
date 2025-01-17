import { v1 as uuid } from 'uuid'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql'

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', 
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz',
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

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
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    addAuthor(
      name: String!
      born: Int
    ): Author
  }
`

const addAuthor = (root, args) => {
  if (authors.find(a => a.name === args.name)) {
    throw new GraphQLError('author already exists', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: args.name
      }
    })
  }

  const author = { ...args, id: uuid() }
  authors = authors.concat(author)
  return author
}

const resolvers = {
  Query: {
    authorsCount: () => authors.length,
    booksCount: () => books.length,
    allBooks: (root, args) => {
      const { author, genre } = args

      if (author && genre) {
        return books.filter(b => b.author === author && b.genres.includes(genre))
      } else if (author) {
        return books.filter(b => b.author === author)
      } else if (genre) {
        return books.filter(b => b.genres.includes(genre))
      } else {
        return books
      }
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: root => books.filter(b => b.author === root.name).length,
  },
  Mutation: {
    addBook: (root, args) => {
      if (books.find(a => a.title === args.title)) {
        throw new GraphQLError('book already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
        })
      }

      if (!authors.find(a => a.name === args.author)) {
        addAuthor(null, { name: args.author })
      }

      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
    },
    addAuthor,
  }
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
