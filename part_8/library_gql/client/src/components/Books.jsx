import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../gql/queries'
import { useEffect, useState } from 'react'

const Books = () => {
  const [genre, setGenre] = useState('all-genres')
  const [genres, setGenres] = useState(null)

  const { data: genresData, loading: genresLoading } = useQuery(ALL_GENRES)
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    fetchPolicy: 'cache-and-network',
    variables: { genre },
  })

  useEffect(() => {
    if (genresData) {
      const genresList = [
        ...new Set([].concat(...genresData.allBooks.map(obj => obj.genres))),
      ]
      setGenres(genresList)
    }
  }, [genresData])

  if (genresLoading || booksLoading || !genres) {
    return <p>loading data...</p>
  }

  return (
    <>
      <h2>Books</h2>
      <h3>Filters</h3>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor='genres'>Genres: </label>
        <select
          id='genres'
          value={genre}
          onChange={({ target }) => setGenre(target.value)}>
          <option value='all-genres'>All</option>
          {genres.map(genre => (
            <option
              key={genre}
              value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <table style={{ textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {booksData.allBooks.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Books
