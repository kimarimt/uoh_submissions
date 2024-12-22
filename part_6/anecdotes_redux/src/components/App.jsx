import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import FilterControl from './FilterControl'
import Notification from './Notification'

const App = () => {
  return (
    <div>
      <h1>Ancedotes</h1>
      <FilterControl />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App