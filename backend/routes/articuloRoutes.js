const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { authenticateToken } = require('../middleware/auth');

// Obtener todos los artículos (con opción de filtrar por cliente)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const { clienteId } = req.query;
        const whereClause = clienteId ? { cliente_id: parseInt(clienteId) } : {};

        const articulos = await prisma.articulo.findMany({
            where: whereClause,
            include: {
                cliente: true,
                proveedor: true
            }
        });
        res.json(articulos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo artículo
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { marca, modelo, detalles, foto, proveedor_id, cliente_id, costo_unitario } = req.body;
        const articulo = await prisma.articulo.create({
            data: {
                marca,
                modelo,
                detalles,
                foto,
                proveedor_id: proveedor_id ? parseInt(proveedor_id) : null,
                cliente_id: cliente_id ? parseInt(cliente_id) : null,
                costo_unitario: parseFloat(costo_unitario)
            },
            include: {
                cliente: true,
                proveedor: true
            }
        });
        res.json(articulo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un artículo
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, modelo, detalles, foto, proveedor_id, cliente_id, costo_unitario } = req.body;
        const articulo = await prisma.articulo.update({
            where: { id: parseInt(id) },
            data: {
                marca,
                modelo,
                detalles,
                foto,
                proveedor_id: proveedor_id ? parseInt(proveedor_id) : null,
                cliente_id: cliente_id ? parseInt(cliente_id) : null,
                costo_unitario: parseFloat(costo_unitario)
            },
            include: {
                cliente: true,
                proveedor: true
            }
        });
        res.json(articulo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un artículo
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.articulo.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Artículo eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
