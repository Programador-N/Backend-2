const express = require('express');

class CustomRouter {
  constructor() {
    this.router = express.Router();
  }

  get(path, policies, ...callbacks) {
    this.router.get(path, this.handlePolicies(policies), this.applyCallbacks(callbacks));
  }

  post(path, policies, ...callbacks) {
    this.router.post(path, this.handlePolicies(policies), this.applyCallbacks(callbacks));
  }

  put(path, policies, ...callbacks) {
    this.router.put(path, this.handlePolicies(policies), this.applyCallbacks(callbacks));
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(path, this.handlePolicies(policies), this.applyCallbacks(callbacks));
  }

  applyCallbacks(callbacks) {
    return callbacks.map(callback => async (req, res, next) => {
      try {
        await callback(req, res, next);
      } catch (error) {
        console.error('Error en el callback:', error);
        res.status(500).send({ error: 'Ocurrió un error interno en el servidor' });
      }
    });
  }

  handlePolicies(policies) {
    return (req, res, next) => {
      if (policies.includes('PUBLIC')) return next();
      const user = req.user;
      if (!user) return res.status(401).send({ error: 'No autorizado' });
      if (!policies.includes(user.role)) {
        return res.status(403).send({ error: 'Acceso denegado' });
      }
      next();
    };
  }

  getRouter() {
    return this.router;
  }
}

module.exports = CustomRouter;