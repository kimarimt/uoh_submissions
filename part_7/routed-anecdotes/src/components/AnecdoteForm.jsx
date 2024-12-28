import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AnecdoteForm = ({ onAdd }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const onSubmit = event => {
    event.preventDefault()
    onAdd({ content, author, url, votes: 0 })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='content'>content: </label>
          <input
            type='text'
            name='content'
            id='content'
            onChange={({ target }) => setContent(target.value)} required
          />
        </div>
        <div>
          <label htmlFor='author'>author: </label>
          <input
            type='text'
            name='author'
            id='author'
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='url'>url for more info: </label>
          <input
            type='url'
            name='url'
            id='url'
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm