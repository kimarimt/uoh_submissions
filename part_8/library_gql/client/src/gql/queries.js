import { gql } from '@apollo/client'

const BOOK_DETAILS = `
  fragment BookDetails on Book {
    id 
    title
    published
    author {
      name
      born
    }
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query fetchBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const ALL_GENRES = gql`
  query {
    allBooks {
      id
      genres
    }
  }
`

export const ME = gql `
  query {
    me {
      username,
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`