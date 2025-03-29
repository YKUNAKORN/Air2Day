import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';

export async function getAirQualityForProvinces(provinces) {
  const requests = provinces.map(({ lat, lon, name }) =>
    axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`).then((response) => ({
      province: name,
      data: response.data,
    }))
  );

  return Promise.all(requests);
}
