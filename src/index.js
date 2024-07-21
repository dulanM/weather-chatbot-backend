require('dotenv').config();
const express= require('express');
const bodyParser =  require('body-parser');
const authRouter = require('./auth/auth');
const weatherRouter = require('./weather/weather');
const authMiddlware = require('./middleware/authMiddleware');
const cors = require('cors');

const {setupWebSocketServer} = require('./websocket/websocket')
const app = express();
const port = process.env.port || 3000;


app.use(bodyParser.json());
app.use(cors())

app.use('/api/auth', authRouter);
const server = app.listen(port, () => {
    console.log('server running...');
});

setupWebSocketServer(server);