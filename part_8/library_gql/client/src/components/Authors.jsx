import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../gql/queries'
import BirthYearForm from './BirthYearForm'

const Authors = ({ setError }) => {
  const { data, loading } = useQuery(ALL_AUTHORS)

  if (loading) {
    return <p>loading data...</p>
  }

  return (
    <>
      <h2>Authors</h2>
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
      <BirthYearForm setError={setError} />
    </>
  )
}

export default Authors
