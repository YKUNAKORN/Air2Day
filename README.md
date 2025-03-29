# Air2Day - PM2.5 Report

This project displays PM2.5 and PM10 air quality data for locations in Thailand using React.js and the OpenWeatherMap API.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your OpenWeatherMap API key in `/src/services/airQualityService.js`:
   ```javascript
   const API_KEY = 'YOUR_API_KEY';
   ```
3. Run the development server:
   ```bash
   npm start
   ```

## Features
- Displays PM2.5 and PM10 data for all provinces in Thailand.
- Fetches data from OpenWeatherMap Air Pollution API.
