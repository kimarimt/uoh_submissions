import AnecdotesForm from './AnecdotesForm'
import AnecdotesList from './AnecdotesList'

const App = () => {
  return (
    <div>
      <h1>Anecdote</h1>
      <AnecdotesForm />
      <AnecdotesList />
    </div>
  )
}

export default App