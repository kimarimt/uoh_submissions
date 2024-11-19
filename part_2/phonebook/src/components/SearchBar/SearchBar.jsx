const SearchBar = ({ term, onChange }) => (
  <div>
    <label htmlFor='search'>Search: </label>
    <input
      type='text'
      name='search'
      id='search'
      value={term}
      onChange={onChange}
    />
  </div>
);

export default SearchBar;