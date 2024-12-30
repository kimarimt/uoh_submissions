import { useState, useEffect } from 'react'
import { getCountryByName } from '../services/country'

export function useField() {
  const [value, setValue] = useState('')

  function onChange(event) {
    setValue(event.target.value)
  }

  return {
    value,
    onChange
  }
}

export function useCountry(searchTerm) {
  const [country, setCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    setCountry(null)
    setIsError(null)

    getCountryByName(searchTerm)
      .then(countryData => {
        setIsLoading(false)
        setCountry(countryData)
      })
      .catch(() => {
        setIsLoading(false)
        setIsError('not found...')
      })
  }, [searchTerm])

  return {
    country,
    isLoading,
    isError
  }
}