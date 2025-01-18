import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../gql/queries'

const Authors = () => {
  const { data, loading } = useQuery(ALL_AUTHORS)

  return (
    <>
      <h2>Authors</h2>
      { loading && <p>loading authors...</p> }
      { data && (
        <table style={{ textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Born</th>
              <th>Books</th>
            </tr>
          </thead>
          <tbody>
            {data.allAuthors.map(author => (
              <tr key={author.id}>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) }
    </>
  )
}

export default Authors
