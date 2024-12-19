import { useSelector, useDispatch } from 'react-redux'
import { incrementByType } from './features/reviews/reviewsSlice'

const App = () => {
  const { good, ok, bad } = useSelector((state) => state.reviews)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <p>Good {good}</p>
        <p>Ok {ok}</p>
        <p>Bad {bad}</p>
      </div>
      <div>
        <button
          onClick={() => dispatch(incrementByType('GOOD'))}
        >
            Good
        </button>
        <button
          onClick={() => dispatch(incrementByType('OK'))}
        >
            Ok
        </button>
        <button
          onClick={() => dispatch(incrementByType('BAD'))}
        >
            Bad
        </button>
        <button
          onClick={() => dispatch(incrementByType('RESET'))}
        >
            Reset Stats
        </button>
      </div>
    </div>
  )
}

export default App