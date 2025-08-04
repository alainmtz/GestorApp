// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// ¡IMPORTANTE! Configuración para proxies
app.set('trust proxy', true);  // Confía en el header X-Forwarded-*

// Middleware para mostrar la IP
app.use((req, res, next) => {
    console.log('IP del cliente:', req.ip);
    next();
});

// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send(`Tu IP es: ${req.ip}`);
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
function getClientIp(req) {
    return req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for']?.split(',')[0] ||
        req.ip;
}

// Uso en rutas
app.get('/client-ip', (req, res) => {
    res.send(`Tu IP real es: ${getClientIp(req)}`);
});