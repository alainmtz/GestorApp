const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

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
      const {nombre, email, telefono, actividades } = req.body;
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
        data: {email, name, password },
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

app.get('/articulo', async (req, res) =>{
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