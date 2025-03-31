const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/auth.middleware');

const router = express.Router();

// Ruta /current para obtener datos del usuario logueado
router.get('/current', authenticateToken, (req, res) => {
  const userPermissions = {
    USER: ['read_profile', 'update_profile'],
    ADMIN: ['read_profile', 'update_profile', 'manage_users', 'delete_users']
  };

  const permissions = userPermissions[req.user.role] || [];
  res.send({
    user: req.user,
    permissions
  });
});

module.exports = router;