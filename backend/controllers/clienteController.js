const prisma = require('../lib/prisma');

// Obtener todos los clientes
const getAllClientes = async (req, res) => {
    try {
        const clientes = await prisma.cliente.findMany();
        res.json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ message: 'Error al obtener la lista de clientes' });
    }
};

// Obtener un cliente específico
const getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await prisma.cliente.findUnique({
            where: { id: parseInt(id) }
        });

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.json(cliente);
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        res.status(500).json({ message: 'Error al obtener el cliente' });
    }
};

// Crear un nuevo cliente
const createCliente = async (req, res) => {
    try {
        const { nombre, email, telefono, actividades } = req.body;

        const cliente = await prisma.cliente.create({
            data: {
                nombre,
                email,
                telefono,
                actividades: actividades || []
            }
        });

        res.status(201).json(cliente);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ message: 'Error al crear el cliente' });
    }
};

// Actualizar un cliente
const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, telefono, actividades } = req.body;

        const cliente = await prisma.cliente.update({
            where: { id: parseInt(id) },
            data: {
                nombre,
                email,
                telefono,
                actividades: actividades || []
            }
        });

        res.json(cliente);
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ message: 'Error al actualizar el cliente' });
    }
};

// Eliminar un cliente
const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.cliente.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).json({ message: 'Error al eliminar el cliente' });
    }
};

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};
