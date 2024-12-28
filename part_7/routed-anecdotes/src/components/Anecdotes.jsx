import { Link } from 'react-router-dom'

const Anecdotes = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {
        anecdotes
          ? (
            <ul>
              {anecdotes.map(anecdote => (
                <li key={anecdote.id}>
                  <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </li>
              ))}
            </ul>
          )
          : <p>No Anecdotes yet!</p>
      }
    </div>
  )
}

export default Anecdotes