import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTH_YEAR } from '../gql/mutations'

const BirthYearForm = ({ setError }) => {
  const [name, setName] = useState('')
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
    setName('')
    setBorn('')
  }

  return (
    <>
      <h3>Set Birth Year</h3>
      <form onSubmit={submit}>
        <div>
          <label htmlFor='name'>Name </label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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
