import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export function useField(id, type) {
  const [value, setValue] = useState('')

  function onChange({ target }) {
    setValue(target.value)
  }

  return {
    id,
    type,
    value,
    onChange
  }
}

export function useResource(url) {
  const [resource, setResource] = useState(null)

  useEffect(() => {
    async function getAll() {
      const { data } = await axios.get(url)
      setResource(data)
    }

    getAll()
  }, [url])

  const resourceService = {
    async create(noteObj) {
      const { data } = await axios.post(url, noteObj)
      setResource([...resource, data])
    }
  }

  return [
    resource,
    resourceService
  ]
}