import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import contactService from '../services/countries';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    contactService.getAll().then((countriesData) => {
      setCountries(countriesData);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );

  const renderCountryData = (country) => {
    const name = country.name.common;
    const capital = country.capital[0];
    const area = country.area;
    const languages = Object.values(country.languages);
    const flag = country.flags.png;

    return (
      <div>
        <h1>{name}</h1>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <p>
          <strong>languages</strong>
        </p>
        <ul>
          {languages.map((language, i) => (
            <li key={i}>{language}</li>
          ))}
        </ul>
        <img src={flag} alt={`Flag of ${name}`} />
      </div>
    );
  };

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div>
        {filteredCountries.length == 1 &&
          renderCountryData(filteredCountries[0])}
        {filteredCountries.length > 1 && filteredCountries.length < 10 && (
          <SearchResults
            searchTerm={searchTerm}
            countries={filteredCountries}
          />
        )}
        {filteredCountries.length > 10 && searchTerm !== '' && (
          <p>Too many matches, specify another filter</p>
        )}
      </div>
    </div>
  );
};

export default App;
