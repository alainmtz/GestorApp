const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'tu-secret-key-super-segura';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido' });
        }
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = authMiddleware;
