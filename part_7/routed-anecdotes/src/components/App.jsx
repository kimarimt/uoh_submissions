import { useEffect, useState } from 'react'
import { Link, Routes, Route, useMatch } from 'react-router-dom'
import { createAnecdote, getAllAnecdotes } from '../services/anecdotes'
import Anecdotes from './Anecdotes'
import Anecdote from './Anecdote'
import AnecdoteForm from './AnecdoteForm'
import Notification from './Notification'
import About from './About'

const App = () => {
  const [anecdotes, setAnecdotes] = useState(null)
  const [message, setMessage] = useState(null)
  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => a.id === match.params.id)
    : null

  useEffect(() => {
    getAllAnecdotes()
      .then(data => {
        setAnecdotes(data)
      })
  })

  const addAnecdote = newAnecdote => {
    createAnecdote(newAnecdote)
      .then(data => {
        setAnecdotes([...anecdotes, data])
        toggleNotification(data.content)
      })
  }

  const toggleNotification = content => {
    const notification = `a new anecdote '${content}' was added`

    setMessage(notification)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  return (
    anecdotes && (
      <div>
        <h1>Software Anecdotes</h1>
        <div>
          <Link className='link' to='/'>anecdotes</Link>
          <Link className='link' to='/create'>create new</Link>
          <Link className='link' to='/about'>about</Link>
        </div>
        { message && <Notification message={message} /> }
        <Routes>
          <Route path='/' element={<Anecdotes anecdotes={anecdotes} />} />
          <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
          <Route path='/create' element={<AnecdoteForm onAdd={addAnecdote} />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <footer>
          <p>Ancedote app for <a href="https://fullstackopen.com/en/" target='_blank'>Full Stack</a>. See <a href='https://github.com/kimarimt/uoh_submissions' target='_blank'>routed-anecdotes</a> for the source code.</p>
        </footer>
      </div>
    )
  )
}

export default App
