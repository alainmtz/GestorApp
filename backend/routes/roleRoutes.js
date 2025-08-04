const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Rutas accesibles solo para ADMIN y DEVELOPER
router.get('/users',
    checkRole(['ADMIN', 'DEVELOPER']),
    roleController.getAllUsers
);

router.get('/stats',
    checkRole(['ADMIN', 'DEVELOPER']),
    roleController.getUserStats
);

// Ruta para actualizar roles - solo ADMIN puede actualizar a ADMIN
router.put('/users/:id/role',
    checkRole(['ADMIN', 'DEVELOPER']),
    roleController.updateUserRole
);

module.exports = router;
