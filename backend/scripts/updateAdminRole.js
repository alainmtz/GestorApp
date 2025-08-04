const { PrismaClient, Role } = require('@prisma/client');
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

        // Actualizamos el rol del usuario
        const updatedUser = await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                role: Role.DEVELOPER
            }
        });

        console.log('Usuario actualizado exitosamente:');
        console.log('ID:', updatedUser.id);
        console.log('Email:', updatedUser.email);
        console.log('Nuevo rol:', updatedUser.role);
    } catch (error) {
        if (error.code === 'P2025') {
            console.error('Usuario no encontrado');
        } else {
            console.error('Error al actualizar el usuario:', error);
        }
    } finally {
        await prisma.$disconnect();
    }
}

updateUserRole();
