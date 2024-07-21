const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const users = [
  {
    id: 1,
    userName: 'tom@gmail.com',
    password: bcrypt.hashSync('password', 8)
  },
  {
    id: 2,
    userName: 'jim@gmail.com',
    password: bcrypt.hashSync('password', 8)
  }
];

router.post('/login', (req, res) => {
  const { userName, password } = req.body;
  const user = users.find(u => u.userName === userName);

  if (!user) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userName }, SECRET_KEY, { expiresIn: '1h' });
  res.send({ token });
});

module.exports = router;