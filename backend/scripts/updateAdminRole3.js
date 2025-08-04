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

        // Ejecutamos una consulta SQL directa para actualizar el rol
        await prisma.$executeRawUnsafe(`
            UPDATE users 
            SET role = 'DEVELOPER'::"Role" 
            WHERE email = 'admin@fulltime.com'
        `);

        console.log('Usuario actualizado exitosamente');

        // Verificamos el cambio
        const updatedUser = await prisma.users.findUnique({
            where: {
                email: 'admin@fulltime.com'
            }
        });

        console.log('Nuevo rol del usuario:', updatedUser.role);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateUserRole();
