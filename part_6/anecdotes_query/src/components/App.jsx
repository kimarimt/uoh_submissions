import AnecdotesForm from './AnecdotesForm'
import AnecdotesList from './AnecdotesList'
import Notification from './Notification'

const App = () => {
  return (
    <div>
      <h1>Anecdote</h1>
      <AnecdotesForm />
      <Notification />
      <AnecdotesList />
    </div>
  )
}

export default App