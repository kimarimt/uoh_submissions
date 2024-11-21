import axios from 'axios';

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const getAll = async () => {
  const request = axios.get(BASE_URL);
  const response = await request;
  return response.data;
};

export default {
  getAll,
};
