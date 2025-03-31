const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Mock database de usuarios
const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('admin123', 10), role: 'ADMIN' },
  { id: 2, username: 'user', password: bcrypt.hashSync('user123', 10), role: 'USER' }
];

// Limitador de tasa para el login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Máximo de 10 intentos por IP
  message: { error: 'Demasiados intentos de login. Por favor, inténtelo más tarde.' }
});

// Ruta para iniciar sesión
router.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).send({ error: 'Usuario no encontrado' });

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return res.status(401).send({ error: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
  res.send({ token });
});

module.exports = router;