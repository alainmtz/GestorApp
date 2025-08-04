import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
    Chip,
    Stack,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const ClienteDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({
        nombre: '',
        email: '',
        telefono: '',
        actividades: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [nuevaActividad, setNuevaActividad] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    // Cargar datos del cliente
    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3001/api/clientes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al cargar los datos del cliente');
                }

                const data = await response.json();
                setCliente(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCliente();
        } else {
            setLoading(false);
        }
    }, [id]);

    // Manejar cambios en los campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Agregar nueva actividad
    const handleAddActividad = () => {
        if (nuevaActividad.trim()) {
            setCliente(prev => ({
                ...prev,
                actividades: [...prev.actividades, nuevaActividad.trim()]
            }));
            setNuevaActividad('');
            setOpenDialog(false);
        }
    };

    // Eliminar actividad
    const handleDeleteActividad = (index) => {
        setCliente(prev => ({
            ...prev,
            actividades: prev.actividades.filter((_, i) => i !== index)
        }));
    };

    // Guardar cambios
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const method = id ? 'PUT' : 'POST';
            const url = id
                ? `http://localhost:3001/api/clientes/${id}`
                : 'http://localhost:3001/api/clientes';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(cliente)
            });

            if (!response.ok) {
                throw new Error('Error al guardar los cambios');
            }

            setSuccessMessage('Cliente guardado correctamente');
            setTimeout(() => {
                navigate('/clientes');
            }, 2000);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Cargando...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    {id ? 'Editar Cliente' : 'Nuevo Cliente'}
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {successMessage && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {successMessage}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid sx={{ gridColumn: 'span 12' }}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                name="nombre"
                                value={cliente.nombre}
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                        </Grid>

                        <Grid sx={{ gridColumn: 'span 12' }}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={cliente.email}
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                        </Grid>

                        <Grid sx={{ gridColumn: 'span 12' }}>
                            <TextField
                                fullWidth
                                label="Teléfono"
                                name="telefono"
                                value={cliente.telefono}
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                        </Grid>

                        <Grid sx={{ gridColumn: 'span 12' }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Actividades
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                                {cliente.actividades.map((actividad, index) => (
                                    <Chip
                                        key={index}
                                        label={actividad}
                                        onDelete={() => handleDeleteActividad(index)}
                                        sx={{ m: 0.5 }}
                                    />
                                ))}
                                <IconButton
                                    color="primary"
                                    onClick={() => setOpenDialog(true)}
                                    sx={{ minWidth: 32, height: 32 }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                        </Grid>

                        <Grid sx={{ gridColumn: 'span 12' }}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/clientes')}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>

                {/* Dialog para agregar nueva actividad */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Agregar Nueva Actividad</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Actividad"
                            fullWidth
                            value={nuevaActividad}
                            onChange={(e) => setNuevaActividad(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                        <Button onClick={handleAddActividad} color="primary">
                            Agregar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Box>
    );
};

export default ClienteDetail;