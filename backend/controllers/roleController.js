const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                created_at: true
            }
        });
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener la lista de usuarios' });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // Verificar que el rol sea válido
        const validRoles = ['ADMIN', 'DEVELOPER', 'USER', 'GUEST'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Rol no válido' });
        }

        // No permitir cambiar el rol de un ADMIN si no eres ADMIN
        const targetUser = await prisma.users.findUnique({
            where: { id: parseInt(id) }
        });

        if (targetUser.role === 'ADMIN' && req.user.role !== 'ADMIN') {
            return res.status(403).json({
                message: 'No tienes permisos para modificar el rol de un administrador'
            });
        }

        const updatedUser = await prisma.users.update({
            where: { id: parseInt(id) },
            data: { role },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                created_at: true
            }
        });

        res.json(updatedUser);
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        res.status(500).json({ message: 'Error al actualizar el rol del usuario' });
    }
};

const getUserStats = async (req, res) => {
    try {
        const stats = await prisma.users.groupBy({
            by: ['role'],
            _count: {
                role: true
            }
        });

        res.json(stats);
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ message: 'Error al obtener estadísticas de usuarios' });
    }
};

module.exports = {
    getAllUsers,
    updateUserRole,
    getUserStats
};
