const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta pública
router.post('/login', authController.login);

// Ruta protegida (requiere token válido)
// Nueva ruta para verificar token
router.get('/authenticate', authMiddleware, (req, res) => {
    res.json({
      valid: true,
      user: req.user // Devuelve los datos del token si es válido
    });
  });

module.exports = router;
