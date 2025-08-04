const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Obtener todos los clientes
router.get('/', clienteController.getAllClientes);

// Obtener un cliente específico
router.get('/:id', clienteController.getClienteById);

// Crear un nuevo cliente
router.post('/', clienteController.createCliente);

// Actualizar un cliente
router.put('/:id', clienteController.updateCliente);

// Eliminar un cliente
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
