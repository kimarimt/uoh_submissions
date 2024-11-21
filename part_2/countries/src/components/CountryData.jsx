const CountryData = ({ country }) => {
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

export default CountryData;
