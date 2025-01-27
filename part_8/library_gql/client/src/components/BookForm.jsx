import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../gql/mutations'
import { ALL_AUTHORS, ALL_GENRES } from '../gql/queries'

const BookForm = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const navigate = useNavigate()

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_GENRES }],
    onCompleted: () => {
      navigate('/books')
    },
    onError: error => {
      const message = error.message
      setError(message)
    }
  })

  const submit = (event, type) => {
    event.preventDefault()

    if (type === 'genre') {
      const listedGenres = genre.split(', ')
      setGenres(listedGenres)
      setGenre('')
    } else {
      addBook({
        variables: {
          title,
          author,
          published: published ? parseInt(published) : undefined,
          genres,
        },
      })
    }
  }

  return (
    <>
      <h2>Add Book</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor='title'>Title: </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <input
            id='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor='published'>Published: </label>
          <input
            id='published'
            type='text'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <label htmlFor='genre'>Genre: </label>
          <input
            id='genre'
            type='text'
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={event => submit(event, 'genre')}>add genre</button>
        </div>
        <div>Genres: {genres.join(', ')}</div>
        <button type='submit'>Add book</button>
      </form>
    </>
  )
}

export default BookForm
