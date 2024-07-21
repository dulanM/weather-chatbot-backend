const express = require('express');
const axios = require('axios');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

async function sendWeatherData(client) {
  try {
    const forecast = await getWeatherData(client.location);
    client.ws.send(JSON.stringify(forecast));
  } catch (error) {
    client.ws.send(JSON.stringify({ error: error.message }));
  }
}

async function getWeatherData(location) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=14`;

  try {
    const response = await axios.request(url);
    return response.data.forecast.forecastday.map(day => ({
      date: day.date,
      condition: day.day.condition.text,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c
    }));
  } catch (error) {
    console.error('Getting an error while fetching weather data!');
    throw new Error('Getting an error while fetching weather data!');
  }
}

async function handleWeatherMessage(client, location) {
  client.location = location;

  // If there is interval alredy clear it beacuse creating new interval there is new location to search
  if (client.intervalId) {
    clearInterval(client.intervalId);
  }
  await sendWeatherData(client);

  // set a new interval
  client.intervalId = setInterval(() => {
    sendWeatherData(client)
  }, 30000);
}

function clearWeatherInterval(client) {
  if (client.intervalId) {
    clearInterval(client.intervalId);
  }
}

module.exports = { handleWeatherMessage, clearWeatherInterval };