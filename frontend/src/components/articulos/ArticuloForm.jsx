import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@mui/material';

const ArticuloForm = ({ articulo, onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        marca: '',
        modelo: '',
        detalles: '',
        precio: '',
        stock: '',
        clienteId: ''
    });

    const [clientes, setClientes] = useState([]);
    const [loadingClientes, setLoadingClientes] = useState(false);

    // Cargar lista de clientes
    useEffect(() => {
        const fetchClientes = async () => {
            setLoadingClientes(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3001/api/clientes', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Error al cargar clientes');
                const data = await response.json();
                setClientes(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoadingClientes(false);
            }
        };
        fetchClientes();
    }, []);

    useEffect(() => {
        if (articulo) {
            setFormData({
                marca: articulo.marca || '',
                modelo: articulo.modelo || '',
                detalles: articulo.detalles || '',
                precio: articulo.precio || '',
                stock: articulo.stock || '',
                clienteId: articulo.clienteId || ''
            });
        }
    }, [articulo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="marca"
                        label="Marca"
                        name="marca"
                        autoFocus
                        value={formData.marca}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="modelo"
                        label="Modelo"
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="detalles"
                        label="Detalles"
                        name="detalles"
                        multiline
                        rows={4}
                        value={formData.detalles}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="precio"
                        label="Precio"
                        name="precio"
                        type="number"
                        value={formData.precio}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="stock"
                        label="Stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="cliente-label">Cliente</InputLabel>
                        <Select
                            labelId="cliente-label"
                            id="clienteId"
                            name="clienteId"
                            value={formData.clienteId}
                            onChange={handleChange}
                            label="Cliente"
                            disabled={loadingClientes}
                        >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            {clientes.map((cliente) => (
                                <MenuItem key={cliente.id} value={cliente.id}>
                                    {cliente.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
            >
                {isLoading ? 'Guardando...' : (articulo ? 'Actualizar' : 'Crear')}
            </Button>
        </Box>
    );
};

export default ArticuloForm;
