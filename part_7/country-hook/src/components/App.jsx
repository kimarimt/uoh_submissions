import { useState } from 'react'
import { useCountry } from '../hooks'
import SearchBar from './SearchBar'
import Country from './Country'

export default function App() {
  const [query, setQuery] = useState('')
  const { country, isLoading, isError } = useCountry(query)

  function handleSubmit(q) {
    setQuery(q)
  }

  return (
    <div>
      <SearchBar handleSubmit={handleSubmit} />
      { isLoading && <p>loading...</p> }
      { isError && <p>{isError}</p> }
      { country && <Country country={country} /> }
    </div>
  )
}