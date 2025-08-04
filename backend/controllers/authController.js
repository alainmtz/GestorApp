const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'tu-secret-key-super-segura';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar entrada
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        // Buscar usuario
        const user = await prisma.users.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Enviar respuesta
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const verify = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await prisma.users.findUnique({
            where: { id: decoded.userId }
        });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido' });
        }
        console.error('Error en verify:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Validar entrada
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await prisma.users.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const user = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'USER'
            }
        });

        // Generar token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Enviar respuesta
        res.status(201).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Error en register:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    login,
    verify,
    register
};
