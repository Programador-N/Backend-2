const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares de seguridad
app.use(helmet()); // Agrega encabezados de seguridad HTTP
app.use(cors()); // Habilita CORS para permitir solicitudes desde otros dominios

// Middleware para manejo de errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Ocurrió un error interno en el servidor' });
});

// Rutas
const petsRouter = require('./routes/pets.router');
app.use('/api/pets', petsRouter);

const exampleRouter = require('./routes/example.router');

// Rutas adicionales
app.use('/api/example', exampleRouter);

const authRouter = require('./routes/auth.router');

// Rutas de autenticación
app.use('/api/auth', authRouter);

const sessionsRouter = require('./routes/sessions.router');

// Rutas de sesiones
app.use('/api/sessions', sessionsRouter);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});