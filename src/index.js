require('dotenv').config();
const express= require('express');
const bodyParser =  require('body-parser');
const authRouter = require('./auth/auth');
const cors = require('cors');
const http = require('http');

const {setupWebSocketServer} = require('./websocket/websocket')
const app = express();
// Create HTTP server
const server = http.createServer(app);

// Setup WebSocket server
setupWebSocketServer(server);
const port = process.env.port || 3000;


setupWebSocketServer(server);
app.use(bodyParser.json());
app.use(cors())

app.use('/api/auth', authRouter);
server.listen(port, () => {
    console.log('server running...');
});
