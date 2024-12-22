import { useDispatch } from 'react-redux'
import { setFilter } from '../features/filterSlice'

const FilterControl = () => {
  const dispatch = useDispatch()

  const handleFilter = event => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div className='filter-control'>
      <label htmlFor='search'>Search</label>
      <input type='text' name='search' id='search' onChange={handleFilter} />
    </div>
  )
}

export default FilterControl