const SearchResults = ({ searchTerm, countries }) => {
  return (
    <div>
      {searchTerm !== '' &&
        countries.map((country) => (
          <p key={country.cca2}>{country.name.common}</p>
        ))}
    </div>
  );
};

export default SearchResults;
