import { useState, useEffect } from 'react';
import CountryData from './CountryData';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import contactService from '../services/countries';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
    contactService.getAll().then((countriesData) => {
      setCountries(countriesData);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );

  const handleSearch = (event) => {
    setCountry(null);
    setSearchTerm(event.target.value);
  };

  const handleCountry = (country) => {
    setCountry(country);
  };

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onChange={handleSearch} />
      <div>
        {filteredCountries.length == 1 && (
          <CountryData country={filteredCountries[0]} />
        )}
        {filteredCountries.length > 1 && filteredCountries.length < 10 && (
          <>
            {country && <CountryData country={country} />}
            {!country && (
              <SearchResults
                searchTerm={searchTerm}
                countries={filteredCountries}
                onClick={handleCountry}
              />
            )}
          </>
        )}
        {filteredCountries.length > 10 && searchTerm !== '' && (
          <p>Too many matches, specify another filter</p>
        )}
      </div>
    </div>
  );
};

export default App;
