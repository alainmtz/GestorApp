import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { error, register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setFormError('Las contraseñas no coinciden');
      return false;
    }
    if (formData.password.length < 6) {
      setFormError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) {
      return;
    }

    try {
      // Usar la función register del contexto
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // El usuario ya estará autenticado después del registro
      navigate('/dashboard', {
        state: { message: '¡Registro exitoso! Bienvenido.' }
      });
    } catch (err) {
      setFormError(err.message);
      console.error('Error en registro:', err);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5'
      }}
    >
      <Card sx={{
        maxWidth: 450,
        width: '100%',
        p: 4,
        boxShadow: 3
      }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Registro de Usuario
        </Typography>

        {(error || formError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre completo"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            helperText="La contraseña debe tener al menos 6 caracteres"
          />
          <TextField
            fullWidth
            label="Confirmar Contraseña"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              ¿Ya tienes una cuenta?{' '}
              <Link
                href="/login"
                underline="hover"
                sx={{ cursor: 'pointer' }}
              >
                Inicia sesión
              </Link>
            </Typography>
          </Box>
        </form>
      </Card>
    </Box>
  );
}