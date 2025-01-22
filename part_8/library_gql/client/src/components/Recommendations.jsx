import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../gql/queries'

const Recommendations = () => {
  const { data: currentUser, loading: userLoading } = useQuery(ME, {
    fetchPolicy: 'no-cache'
  })
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: currentUser ? currentUser.me.favoriteGenre : undefined }
  })

  if (userLoading || booksLoading) {
    return <p>loading data...</p>
  }

  return (
    <>
      <h2>Recommendations</h2>
      <p>
        {currentUser.me.username}'s favorite genre:{' '}
        <strong>{currentUser.me.favoriteGenre}</strong>
      </p>
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

export default Recommendations
