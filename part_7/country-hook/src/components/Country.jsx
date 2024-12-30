export default function Country({ country }) {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Population: {country.population}</p>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}