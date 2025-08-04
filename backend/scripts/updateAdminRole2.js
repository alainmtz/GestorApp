const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateUserRole() {
    try {
        // Primero verificamos si el usuario existe
        const user = await prisma.users.findUnique({
            where: {
                email: 'admin@fulltime.com'
            }
        });

        if (!user) {
            console.log('Usuario no encontrado con el email admin@fulltime.com');
            return;
        }

        // Ejecutamos una consulta SQL directa
        const updatedUser = await prisma.$executeRaw`
            UPDATE users 
            SET role = 'DEVELOPER'
            WHERE email = 'admin@fulltime.com'
            RETURNING *;
        `;

        console.log('Actualización completada:', updatedUser);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateUserRole();
