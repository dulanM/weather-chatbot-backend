const express = require('express');
const axios = require('axios');

const router = express.Router();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_HOST = process.env.WEATHER_API_HOST;

router.get('/', async (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.status(400).send({ message: 'Location is required!' });
  }

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=14`;
  try {
    const response = await axios.request(url);
    const forecast = response.data.forecast.forecastday.map(day => ({
      date: day.date,
      condition: day.day.condition.text,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c
    }));
    res.send(forecast);
  } catch (error) {
    res.status(500).send({ message: 'Getting error while fetching weather data!' });
  }
});

module.exports = router;