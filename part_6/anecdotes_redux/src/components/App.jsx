import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import FilterControl from './FilterControl'

const App = () => {
  return (
    <div>
      <h1>Ancedotes</h1>
      <FilterControl />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App