import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

const getCurrentWeather = async (capital) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${capital}`;
  const response = await axios.get(url);
  return response.data;
};

export default {
  getCurrentWeather,
};
