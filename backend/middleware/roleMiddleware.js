const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        try {
            // El usuario ya debe estar autenticado y su información estar en req.user
            const userRole = req.user?.role;

            if (!userRole) {
                return res.status(401).json({ message: 'No autorizado - Rol no encontrado' });
            }

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                    message: 'No tienes permisos suficientes para realizar esta acción'
                });
            }

            // Para operaciones de modificación de roles, verificar permisos adicionales
            if (req.method !== 'GET' && req.baseUrl.includes('/api/roles')) {
                // Solo ADMIN puede modificar roles
                if (userRole !== 'ADMIN') {
                    return res.status(403).json({
                        message: 'Solo los administradores pueden modificar roles'
                    });
                }

                // Verificar que no se intente modificar a otro admin
                if (req.body?.targetUserId) {
                    const targetRole = req.body?.currentRole;
                    if (targetRole === 'ADMIN' && userRole !== 'ADMIN') {
                        return res.status(403).json({
                            message: 'No puedes modificar el rol de otro administrador'
                        });
                    }
                }
            }

            next();
        } catch (error) {
            res.status(500).json({ message: 'Error al verificar permisos' });
        }
    };
};

// Middleware específico para verificar permisos de administrador
const isAdmin = (req, res, next) => {
    try {
        const userRole = req.user?.role;

        if (userRole !== 'ADMIN') {
            return res.status(403).json({
                message: 'Esta acción requiere permisos de administrador'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar permisos de administrador' });
    }
};

module.exports = { checkRole, isAdmin };