require('dotenv').config();
const express= require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser =  require('body-parser');
const authRouter = require('./auth/auth');
const weatherRouter = require('./weather/weather');
const authMiddlware = require('./middleware/authMiddleware');
const cors = require('cors');

const app = express();
const port = process.env.port || 3000;


app.use(bodyParser.json());
app.use(cors())

app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello'});
});

app.use('/api/auth', authRouter);
app.use('/api/weather', authMiddlware, weatherRouter);
app.listen(port, () => {
    console.log('server running...');
});