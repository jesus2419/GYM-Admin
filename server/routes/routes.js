const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const usersController = require('../controllers/userController');


// Ruta pública
router.post('/login', authController.login);

// Ruta protegida (requiere token válido)

// Middleware de autenticación aplicado a todas las rutas siguientes
router.use(authMiddleware);
router.post('/users', usersController.createUser); // Create
router.get('/users', usersController.getAllUsers); // Read all
router.get('/users/:id', usersController.getUserById); // Read one
router.put('/users/:id', usersController.updateUser); // Update
router.delete('/users/:id', usersController.deleteUser); // Delete
// Nueva ruta para verificar token
router.get('/authenticate', authMiddleware, (req, res) => {
    res.json({
      valid: true,
      user: req.user // Devuelve los datos del token si es válido
    });
  });

module.exports = router;
