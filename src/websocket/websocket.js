const WebSocket = require('ws');
const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

let clients = [];

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    clients.push({ws, location: null});
    console.log('Client connected!');

    ws.on('close', () => {
      clients = clients.filter(cl => cl.ws !== ws);
      console.log('Client disconnected!');
    });

    ws.on('message', async (message) => {
      const location = message.toString();
      const client = clients.find(client => client.ws === ws);
      if (client) {
        client.location = location;
        await sendWeatherData(client);
      }
    });
  });

  setInterval( async () => {
    for (const client of clients) {
      if(client.location) {
        await sendWeatherData(client);
      }
    }
  }, 30000);
}

async function sendWeatherData(client) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${client.location}&days=14`;

  try {
    const response = await axios.request(url);
    const forecast = response.data.forecast.forecastday.map(day => ({
      date: day.date,
      condition: day.day.condition.text,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c
    }));
    client.ws.send(JSON.stringify(forecast));
  } catch (error) {
    console.error('Getting an error while fetching weather data!');
    client.ws.send(JSON.stringify({ error: 'Getting an error while fetching weather data!' }));
  }
}
module.exports = { setupWebSocketServer };