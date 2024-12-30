import axios from 'axios'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/name'

export async function getCountryByName(searchTerm) {
  const response = await axios.get(`${BASE_URL}/${searchTerm}`)
  return response.data
}