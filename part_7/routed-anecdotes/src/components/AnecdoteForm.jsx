import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const AnecdoteForm = ({ onAdd }) => {
  const content = useField('text')
  const author = useField('text')
  const url = useField('url')
  const navigate = useNavigate()


  const onSubmit = event => {
    event.preventDefault()
    onAdd({
      content: content.value,
      author: author.value,
      url: url.value,
      votes: 0
    })
    navigate('/')
  }

  const onReset = () => {
    content.onReset()
    author.onReset()
    url.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={onSubmit} onReset={onReset}>
        <div>
          <label htmlFor='content'>content: </label>
          <input
            id='content'
            type={content.type}
            value={content.value}
            onChange={content.onChange}
            required
          />
        </div>
        <div>
          <label htmlFor='author'>author: </label>
          <input
            id='author'
            type={author.type}
            value={author.value}
            onChange={author.onChange}
            required
          />
        </div>
        <div>
          <label htmlFor='url'>url for more info: </label>
          <input
            id='url'
            type={url.type}
            value={url.value}
            onChange={url.onChange}
            required
          />
        </div>
        <button type='submit'>create</button>
        <button type='reset'>reset</button>
      </form>
    </div>
  )
}

export default AnecdoteForm