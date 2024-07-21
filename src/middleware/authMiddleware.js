const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(decoded);
      }
    });
  });
};

const authenticateWebSocketConnection = async (info, done) => {
  const token = new URLSearchParams(info.req.url.split('?')[1]).get('token');
  if (!token) {
    return done(false, 401, 'Unauthorized!');
  }

  try {
    const decoded = await verifyToken(token);
    info.req.user = decoded;
    return done(true);
  } catch (error) {
    return done(false, 401, 'Unauthorized!');
  }
};

module.exports = { authenticateWebSocketConnection };