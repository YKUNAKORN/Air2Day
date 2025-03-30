import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAirQualityForProvinces } from './services/airQualityService';
import Contact from './Contact';
import About from './About'; // Import the new About page
import More from './More'; // Import the More component
import './App.css';

const provinces = [
  { name: 'Bangkok', lat: 13.7563, lon: 100.5018 },
  { name: 'Chiang Mai', lat: 18.7883, lon: 98.9853 },
  { name: 'Phuket', lat: 7.8804, lon: 98.3923 },
  { name: 'Chonburi', lat: 13.3611, lon: 100.9847 },
  { name: 'Nakhon Ratchasima', lat: 14.9799, lon: 102.0977 },
  { name: 'Khon Kaen', lat: 16.4467, lon: 102.833 },
  { name: 'Udon Thani', lat: 17.4138, lon: 102.787 },
  { name: 'Nakhon Si Thammarat', lat: 8.4324, lon: 99.9631 },
  { name: 'Songkhla', lat: 7.1897, lon: 100.5954 },
  { name: 'Surat Thani', lat: 9.1402, lon: 99.3331 },
  { name: 'Rayong', lat: 12.7074, lon: 101.147 },
  { name: 'Chiang Rai', lat: 19.9105, lon: 99.8406 },
  { name: 'Ayutthaya', lat: 14.3532, lon: 100.5689 },
  { name: 'Pattani', lat: 6.8698, lon: 101.2501 },
  { name: 'Narathiwat', lat: 6.4264, lon: 101.823 },
  { name: 'Yala', lat: 6.5416, lon: 101.2806 },
  { name: 'Krabi', lat: 8.0863, lon: 98.9063 },
  { name: 'Trang', lat: 7.5563, lon: 99.6114 },
  { name: 'Phetchaburi', lat: 13.1111, lon: 99.939 },
  { name: 'Prachuap Khiri Khan', lat: 11.8037, lon: 99.7986 },
  { name: 'Lampang', lat: 18.2923, lon: 99.4928 },
  { name: 'Lamphun', lat: 18.574, lon: 99.0087 },
  { name: 'Mae Hong Son', lat: 19.3013, lon: 97.9685 },
  { name: 'Nan', lat: 18.783, lon: 100.7773 },
  { name: 'Phayao', lat: 19.1698, lon: 99.9011 },
  { name: 'Phrae', lat: 18.1446, lon: 100.1406 },
  { name: 'Uttaradit', lat: 17.625, lon: 100.0993 },
  { name: 'Sukhothai', lat: 17.0078, lon: 99.823 },
  { name: 'Tak', lat: 16.869, lon: 99.124 },
  { name: 'Kamphaeng Phet', lat: 16.4828, lon: 99.522 },
  { name: 'Phitsanulok', lat: 16.8211, lon: 100.2659 },
  { name: 'Phetchabun', lat: 16.418, lon: 101.1606 },
  { name: 'Nakhon Sawan', lat: 15.7047, lon: 100.1372 },
  { name: 'Uthai Thani', lat: 15.3795, lon: 100.0248 },
  { name: 'Chai Nat', lat: 15.185, lon: 100.125 },
  { name: 'Sing Buri', lat: 14.887, lon: 100.401 },
  { name: 'Ang Thong', lat: 14.5896, lon: 100.455 },
  { name: 'Lopburi', lat: 14.7995, lon: 100.6534 },
  { name: 'Saraburi', lat: 14.5289, lon: 100.9108 },
  { name: 'Nonthaburi', lat: 13.8621, lon: 100.5144 },
  { name: 'Pathum Thani', lat: 14.0208, lon: 100.525 },
  { name: 'Samut Prakan', lat: 13.5991, lon: 100.5992 },
  { name: 'Samut Sakhon', lat: 13.5472, lon: 100.2744 },
  { name: 'Samut Songkhram', lat: 13.4142, lon: 100.002 },
  { name: 'Ratchaburi', lat: 13.5367, lon: 99.817 },
  { name: 'Kanchanaburi', lat: 14.0041, lon: 99.5483 },
  { name: 'Suphan Buri', lat: 14.4745, lon: 100.1226 },
  { name: 'Nakhon Pathom', lat: 13.8199, lon: 100.0443 },
  { name: 'Chachoengsao', lat: 13.6904, lon: 101.0779 },
  { name: 'Prachinburi', lat: 14.048, lon: 101.368 },
  { name: 'Sa Kaeo', lat: 13.814, lon: 102.072 },
  { name: 'Nakhon Nayok', lat: 14.206, lon: 101.213 },
  { name: 'Buriram', lat: 14.993, lon: 103.103 },
  { name: 'Surin', lat: 14.882, lon: 103.493 },
  { name: 'Sisaket', lat: 15.118, lon: 104.329 },
  { name: 'Amnat Charoen', lat: 15.858, lon: 104.628 },
  { name: 'Ubon Ratchathani', lat: 15.244, lon: 104.848 },
  { name: 'Mukdahan', lat: 16.545, lon: 104.723 },
  { name: 'Nakhon Phanom', lat: 17.392, lon: 104.769 },
  { name: 'Sakon Nakhon', lat: 17.161, lon: 104.147 },
  { name: 'Kalasin', lat: 16.432, lon: 103.506 },
  { name: 'Maha Sarakham', lat: 16.184, lon: 103.303 },
  { name: 'Roi Et', lat: 16.056, lon: 103.653 },
  { name: 'Yasothon', lat: 15.794, lon: 104.145 },
  { name: 'Chaiyaphum', lat: 15.806, lon: 102.031 },
  { name: 'Loei', lat: 17.487, lon: 101.722 },
  { name: 'Nong Bua Lamphu', lat: 17.204, lon: 102.426 },
  { name: 'Nong Khai', lat: 17.878, lon: 102.742 },
  { name: 'Bueng Kan', lat: 18.360, lon: 103.648 },
  { name: 'Phang Nga', lat: 8.451, lon: 98.526 },
  { name: 'Ranong', lat: 9.952, lon: 98.608 },
  { name: 'Satun', lat: 6.623, lon: 100.067 },
  { name: 'Trat', lat: 12.242, lon: 102.517 },
  { name: 'Chanthaburi', lat: 12.611, lon: 102.103 },
  { name: 'Phatthalung', lat: 7.616, lon: 100.074 },
];

function Home() {
  const [airQualityData, setAirQualityData] = useState([]);
  const [error, setError] = useState(null);

  const formatDateTime = () => {
    const now = new Date();
    const day = now.getDate();
    const weekday = now.toLocaleDateString('en-GB', { weekday: 'long' });
    const month = now.toLocaleDateString('en-GB', { month: 'short' });
    const year = now.getFullYear();
    const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `Data updated : ${day} ${weekday} ${month} ${year} ${time}`;
  };

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        const data = await getAirQualityForProvinces(provinces);
        setAirQualityData(data);
      } catch (err) {
        console.error('Error in App:', err);
        setError('Failed to fetch air quality data. Please try again later.');
      }
    };

    fetchAirQuality();
  }, []);

  return (
    <main>
      <h2>AQI Report</h2>
      <p className='DateTime'>{formatDateTime()}</p>
      {error && <p className="error">{error}</p>}
      <table className="air-quality-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Province</th>
            <th>PM2.5</th>
            <th>PM10</th>
          </tr>
        </thead>
        <tbody>
          {airQualityData.map((item, index) => (
            <tr key={item.province}>
              <td>{index + 1}</td>
              <td>{item.province}</td>
              <td>
                {item.data
                  ? `${item.data.list[0].components.pm2_5} µg/m³`
                  : item.error || 'N/A'}
              </td>
              <td>
                {item.data
                  ? `${item.data.list[0].components.pm10} µg/m³`
                  : item.error || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        © 2025 Air2Day Air Quality, ALL RIGHT RESERVED
      </footer>
    </main>
  );
}

function App() {
  return (
    <Router>
      <header className="top-menu">
        <h1>Air2Day</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
          <Link to="/more">More</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/more" element={<More />} /> 
      </Routes>
    </Router>
  );
}

export default App;
