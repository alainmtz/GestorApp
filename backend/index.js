const express = require('express');
const cors = require('cors');
const prisma = require('./lib/prisma');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const articuloRoutes = require('./routes/articuloRoutes');

const app = express();
const PORT = 3001;

// ¡IMPORTANTE! Configuración para proxies
app.set('trust proxy', true);  // Confía en el header X-Forwarded-*

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

// Rutas de autenticación y roles
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/articulos', articuloRoutes);

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

const { networkInterfaces } = require('os');

const getServerIP = () => {
  const nets = networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        results.push(net.address);
      }
    }
  }

  return results[0] || '127.0.0.1';
};

console.log('IP principal del servidor:', getServerIP());


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    console.error(error); // Esto mostrará el error en la consola
    res.status(500).json({ error: error.message });
  }
});

app.post('/clientes', async (req, res) => {
  try {
    const { nombre, email, telefono, actividades } = req.body;
    const cliente = await prisma.cliente.create({
      data: { nombre, email, telefono, actividades: actividades || [] },
    });
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/clientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, actividades } = req.body;
    const cliente = await prisma.cliente.update({
      where: { id: parseInt(id) },
      data: { nombre, email, telefono, actividades: actividades || [] },
    });
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/clientes/:id', async (req, res) => {

  try {
    const { id } = req.params;
    await prisma.cliente.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//users
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/users', async (req, res) => {

  try {
    const { email, name, password } = req.body;
    const user = await prisma.user.create({
      data: { email, name, password },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/users/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const { email, name, password, role } = req.body;
    const cliente = await prisma.cliente.update({
      where: { id: parseInt(id) },
      data: { email, name, password, role },
    });
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//ventas
app.get('/ventas', async (req, res) => {

  try {
    const ventas = await prisma.venta.findMany();
    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/ventas', async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;
    const venta = await prisma.venta.create({
      data: { nombre, email, telefono },
    });
    res.json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/ventas/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    const venta = await prisma.venta.update({
      where: { id: parseInt(id) },
      data: { nombre, email, telefono },
    });
    res.json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/ventas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.venta.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/proveedores', async (req, res) => {
  try {
    const proveedores = await prisma.proveedor.findMany();
    res.json(proveedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/proveedores', async (req, res) => {

  try {
    const { nombre, email, telefono } = req.body;
    const proveedor = await prisma.proveedor.create({
      data: { nombre, email, telefono },
    });
    res.json(proveedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/proveedores/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    const proveedor = await prisma.proveedor.update({
      where: { id: parseInt(id) },
      data: { nombre, email, telefono },
    });
    res.json(proveedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/proveedores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.proveedor.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/articulo', async (req, res) => {
  try {
    const articulos = await prisma.articulo.findMany();
    res.json(articulos)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/articulo', async (req, res) => {

  try {
    const { marca, modelo, detalles, foto, proveedor_id, costo_unitario } = req.body;
    const articulo = await prisma.articulo.create({
      data: { marca, modelo, detalles, foto, proveedor_id, costo_unitario: parseFloat(costo_unitario) },
    });
    res.json(articulo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/articulo/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const { marca, modelo, detalles, foto, proveedor_id, costo_unitario, caja_articulo } = req.body;
    const proveedor = await prisma.proveedor.update({
      where: { id: parseInt(id) },
      data: { marca, modelo, detalles, foto, proveedor_id, costo_unitario, caja_articulo },
    });
    res.json(proveedor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/articulo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.articulo.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Articulo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Ejemplo crear artículo con relación a caja
app.post('/articulo-con-caja', async (req, res) => {
  const { articuloData, cajaId } = req.body;

  const articulo = await prisma.articulo.create({
    data: {
      ...articuloData,
      caja_articulo: {
        create: {
          caja_id: parseInt(cajaId)
        }
      }
    },
    include: {
      caja_articulo: true
    }
  });
});

app.listen(3001, () => {
  console.log('API corriendo en http://localhost:3001');
});