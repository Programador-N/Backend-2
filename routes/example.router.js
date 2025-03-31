const authenticateToken = require('../middlewares/auth.middleware');
const CustomRouter = require('./custom.router');

class ExampleRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.get('/public', ['PUBLIC'], (req, res) => {
      res.send({ message: 'Ruta pública accesible para todos.' });
    });

    this.get('/private', ['USER'], authenticateToken, (req, res) => {
      res.send({ message: 'Ruta privada accesible solo para usuarios autenticados.', user: req.user });
    });

    this.get('/admin', ['ADMIN'], authenticateToken, (req, res) => {
      res.send({ message: 'Ruta accesible solo para administradores.', user: req.user });
    });
  }
}

/**
 * Rutas del ExampleRouter:
 *
 * GET /api/example/public
 *   - Política: PUBLIC
 *   - Descripción: Ruta pública accesible para todos.
 *
 * GET /api/example/private
 *   - Política: USER
 *   - Descripción: Ruta privada accesible solo para usuarios autenticados.
 *
 * GET /api/example/admin
 *   - Política: ADMIN
 *   - Descripción: Ruta accesible solo para administradores.
 */

module.exports = new ExampleRouter().getRouter();