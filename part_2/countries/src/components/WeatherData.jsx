import { useEffect, useState } from 'react';
import weatherService from '../services/weather';

const WeatherData = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getCurrentWeather(capital).then((weatherData) => {
      const data = weatherData.current;
      setWeather({
        temp: data.temp_c,
        icon: data.condition.icon,
        wind: (data.wind_mph / 2.237).toFixed(1),
      });
    });
  }, [capital]);

  return (
    <>
      {weather && (
        <div>
          <h2>Weather in {capital}</h2>
          <p>Temp: {weather.temp} °C</p>
          <img src={weather.icon} alt='Icon of current weather' />
          <p>Wind: {weather.wind} m/s</p>
        </div>
      )}
    </>
  );
};

export default WeatherData;
