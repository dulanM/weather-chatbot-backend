const WebSocket = require('ws');
const axios = require('axios');
const { authenticateWebSocketConnection } = require('../middleware/authMiddleware');
const { handleWeatherMessage, clearWeatherInterval } = require('../weather/weather');
let clients = [];

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({
    server,
    verifyClient: (info, done) => {
      authenticateWebSocketConnection(info, done);
    }
  });

  wss.on('connection', (ws, req) => {
    const client = { ws, user: req.user.userName,location: null, intervalId: null };
    clients.push(client);
    console.log('Client connected!', req.user.userName);

    ws.on('close', () => {
      clearWeatherInterval(client);
      clients = clients.filter(cl => cl.ws !== ws);
      console.log('Client disconnected!', req.user.userName);
    });

    ws.on('message', async (message) => {
      const data = JSON.parse(message);
      switch (data.type) {
        case 'weather':
          handleWeatherMessage(client, data.payload);
          break;
        default:
          break;
      }
    });
  });
}
module.exports = { setupWebSocketServer };