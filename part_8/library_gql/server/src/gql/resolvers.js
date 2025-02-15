import jwt from 'jsonwebtoken'
import DataLoader from 'dataloader'
import { GraphQLError } from 'graphql'
import { PubSub } from 'graphql-subscriptions'
import Author from '../models/author.js'
import Book from '../models/book.js'
import User from '../models/user.js'

const pubsub = new PubSub()

const getAuthorIds = async () => {
  const authorIds = await Author.find()
  return authorIds
}

const getAuthorById = async (id) => {
  const author = await Author.findById(id)
  return author
}

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

const authorLoader = new DataLoader(getAuthorIds)

export const resolvers = {
  Query: {
    authorsCount: async () => Author.collection.countDocuments(),
    booksCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args
      const query = Book.find({}).populate('author')
      const bookAuthor = await Author.findOne({ name: author })

      if (genre && genre !== 'all-genres') {
        query.where('genres').in([genre])
      }

      if (author && bookAuthor) {
        query.where('author').equals(bookAuthor._id)
      }

      const books = query.exec()
      return books
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: async (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async root => {
      const { books } = await authorLoader.load(getAuthorById(root._id))
      return books.length
    },
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
      } else {
        author = existingAuthor
      }

      const newBook = new Book({
        ...args,
        author: author._id
      })

      try {
        await newBook.save()
        author.books.push(newBook._id)
        await author.save()
      } catch (error) {
        throw new GraphQLError('saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook.populate('author') })
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

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET, {
          expiresIn: 60 * 60,
        }),
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
    },
  },
}
