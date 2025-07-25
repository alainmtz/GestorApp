import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

export default function Homepage() {
  // Paso 1: Estructura básica del dashboard usando Material UI Grid y Paper
  const [userCount, setUserCount] = useState(0);
  const [clienteCount, setClienteCount] = useState(0);
  const [ventaCount, setVentaCount] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(data => setUserCount(data.length))
      .catch(err => console.error(err));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3001/clientes")
      .then(res => res.json())
      .then(data => setClienteCount(data.length))
      .catch(err => console.error(err));
  }, []);
  useEffect(() => {
    fetch("http://localhost:3001/ventas")
      .then(res => res.json())
      .then(data => setVentaCount(data.length))
      .catch(err => console.error(err));
  }, []);
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Tarjeta 1 */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Usuarios</Typography>
            <Typography variant="h3" color="primary">
              {userCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Usuarios registrados
            </Typography>
          </Paper>
        </Grid>
        {/* Tarjeta 2 */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Clientes</Typography>
            <Typography variant="h3" color="secondary">
              {clienteCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Clientes activos
            </Typography>
          </Paper>
        </Grid>
        {/* Tarjeta 3 */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Ventas</Typography>
            <Typography variant="h3" color="success.main">
              {ventaCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ventas este mes
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
