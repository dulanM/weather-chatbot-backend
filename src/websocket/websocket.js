const WebSocket = require('ws');
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
    const client = { ws, user: req.user.userName, location: null, intervalId: null };
    clients.push(client);
    console.log('Client connected!', req.user.userName);

    ws.on('close', () => {
      clearWeatherInterval(client);
      clients = clients.filter(cl => cl.ws !== ws);
      console.log('Client disconnected!', req.user.userName);
    });

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);
        switch (data.type) {
          case 'weather':
            handleWeatherMessage(client, data.payload);
            break;
          default:
            break;
        }
      } catch (error) {
        client.ws.send(JSON.stringify({ error: 'Getting error when getting data from API'}));
      }
    });
  });
}
module.exports = { setupWebSocketServer };