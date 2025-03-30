import axios from 'axios';

const API_KEY = '6295c2b16c71580eaddd5e6aae809b3f'; // Updated with the provided API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';

export async function getAirQualityForProvinces(provinces) {
  const requests = provinces.map(({ lat, lon, name }) =>
    axios
      .get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((response) => {
        if (response.data && response.data.list && response.data.list[0]) {
          return {
            province: name,
            data: response.data,
          };
        } else {
          console.error(`Invalid data for ${name}:`, response.data);
          return { province: name, data: null, error: 'Invalid data format' };
        }
      })
      .catch((error) => {
        console.error(`Error fetching data for ${name}:`, error.message);
        return { province: name, data: null, error: error.message };
      })
  );

  return Promise.all(requests);
}
