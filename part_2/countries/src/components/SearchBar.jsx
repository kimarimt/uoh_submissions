const SearchBar = ({ searchTerm, onChange }) => (
  <div>
    <label htmlFor='search'>find countries: </label>
    <input
      type='text'
      name='search'
      id='search'
      value={searchTerm}
      onChange={onChange}
    />
  </div>
);

export default SearchBar;
