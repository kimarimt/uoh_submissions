import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql'
import Author from './models/author.js'
import Book from './models/book.js'

dotenv.config()

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connectint to MongoDB:', error.message))

const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: Author!
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
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const addAuthor = async (root, args) => {
  const newAuthor = new Author({ name: args.name })

  try {
    await newAuthor.save()
  } catch (error) {
    throw new GraphQLError('saving author failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: args.name,
        error,
      },
    })
  }

  return newAuthor
}

const resolvers = {
  Query: {
    authorsCount: async () => Author.collection.countDocuments(),
    booksCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args
      const query = Book.find({}).populate('author')
      const bookAuthor = await Author.findOne({ name: author })

      if (genre) {
        query.where('genres').in([genre])
      }

      if (author && bookAuthor) {
        query.where('author').equals(bookAuthor._id)
      }

      const books = query.exec()
      return books
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async root => Book.countDocuments({ author: root.id }),
  },
  Mutation: {
    addBook: async (root, args) => {
      const existingAuthor = await Author.findOne({ name: args.author })
      let author = null

      if (!existingAuthor) {
        author = await addAuthor(null, { name: args.author })
      }

      const newBook = new Book({
        ...args,
        author: author ? author._id : existingAuthor._id,
      })

      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }

      return newBook.populate('author')
    },
    addAuthor,
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        throw new GraphQLError('author not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        })
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('saving birth year failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      return author
    },
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
