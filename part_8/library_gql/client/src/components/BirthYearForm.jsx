import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_BIRTH_YEAR } from '../gql/mutations'
import { ALL_AUTHORS } from '../gql/queries'

const BirthYearForm = ({ setError }) => {
  const { data, loading } = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('Robert Martin')
  const [born, setBorn] = useState('')
  const [editBirthYear, result] = useMutation(EDIT_BIRTH_YEAR)

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('person not found')
    }
  }, [result.data])

  const submit = event => {
    event.preventDefault()
    editBirthYear({ variables: { name, setBornTo: parseInt(born) } })
    setName(data.allAuthors[0].name)
    setBorn('')
  }

  if (loading) {
    return <div>loading authors...</div>
  }

  return (
    <>
      <h3>Set Birth Year</h3>
      <form onSubmit={submit}>
        <div>
          <label htmlFor='name'>Name </label>
          <select
            id='name'
            value={name}
            onChange={({ target }) => setName(target.value)}>
            {data.allAuthors.map(author => (
              <option
                key={author.id}
                value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='born'>Born </label>
          <input
            id='born'
            type='text'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </>
  )
}

export default BirthYearForm
