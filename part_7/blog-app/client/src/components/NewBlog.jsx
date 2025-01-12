import { useState } from 'react'

const NewBlog = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title: </label>
          <input
            type='text'
            data-testid='title'
            id='title'
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <input
            type='text'
            data-testid='author'
            id='author'
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='url'>Url: </label>
          <input
            type='url'
            data-testid='url'
            id='url'
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default NewBlog
