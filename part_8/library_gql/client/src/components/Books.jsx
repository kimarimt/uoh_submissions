import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../gql/queries'

const Books = () => {
  const { data, loading } = useQuery(ALL_BOOKS)

  return (
    <>
      <h2>Books</h2>
      {loading && <p>loading books...</p>}
      {data && (
        <table style={{ textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {data.allBooks.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Books
