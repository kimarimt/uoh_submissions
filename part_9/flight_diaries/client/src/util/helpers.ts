import { Visibility, Weather } from '../types';

export const getVisibility = (type: string): Visibility => {
  switch (type) {
  case 'great':
    return Visibility.Great;
  case 'good':
    return Visibility.Good;
  case 'ok':
    return Visibility.Ok;
  case 'poor':
    return Visibility.Poor;
  default:
    throw new Error('invalid visibility type');
  }
};

export const getWeather = (type: string): Weather => {
  switch (type) {
  case 'sunny':
    return Weather.Sunny;
  case 'rainy':
    return Weather.Rainy;
  case 'cloudy':
    return Weather.Cloudy;
  case 'stormy':
    return Weather.Stormy;
  case 'windy':
    return Weather.Windy;
  default:
    throw new Error('invalid weather type');
  }
};