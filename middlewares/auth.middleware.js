const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send({ error: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ error: 'El token ha expirado' });
      }
      return res.status(403).send({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;