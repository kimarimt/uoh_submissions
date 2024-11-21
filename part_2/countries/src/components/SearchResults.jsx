const SearchResults = ({ searchTerm, countries, onClick }) => {
  return (
    <div>
      {searchTerm !== '' &&
        countries.map((country) => (
          <p key={country.cca2}>
            {country.name.common}{' '}
            <button onClick={() => onClick(country)}>show</button>
          </p>
        ))}
    </div>
  );
};

export default SearchResults;
