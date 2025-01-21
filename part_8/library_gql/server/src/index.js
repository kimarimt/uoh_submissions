import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql'
import Author from './models/author.js'
import Book from './models/book.js'
import User from './models/user.js'

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
  
  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Query {
    authorsCount: Int!
    booksCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const addAuthor = async (root, args, context) => {
  const currentUser = context.currentUser

  if (!currentUser) {
    throw new GraphQLError('not authenticated', {
      extensions: {
        code: 'BAD_USER_INOT',
      },
    })
  }

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
    me: async (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async root => Book.countDocuments({ author: root.id }),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INOT',
          },
        })
      }

      const existingAuthor = await Author.findOne({ name: args.author })
      let author = null

      if (!existingAuthor) {
        author = await addAuthor(null, { name: args.author }, context)
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
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INOT',
          },
        })
      }
      
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
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch(error => {
        throw new GraphQLError('creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({
        username: args.username,
      })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET, {
        expiresIn: 60 * 60
      }) }
    },
  },
}

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
