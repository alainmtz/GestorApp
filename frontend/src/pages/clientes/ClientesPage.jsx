
import {
    Box,
    Card,
    CardHeader,
    Typography,
    CardContent,
    Button,
    Paper,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    IconButton,
    DialogActions,
    styled,
    Tooltip
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ClienteForm from '../../components/clientes/ClienteForm';
import { Add } from '@mui/icons-material';

const ClientesPage = () => {
    const { user } = useAuth();
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [saving, setSaving] = useState(false);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/clientes', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            setClientes(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los clientes: ' + err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenModal = (cliente = null) => {
        setSelectedCliente(cliente);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedCliente(null);
        setOpenModal(false);
    };

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [clienteToDelete, setClienteToDelete] = useState(null);

    const handleSubmit = async (formData) => {
        try {
            setSaving(true);
            const token = localStorage.getItem('token');
            const method = selectedCliente ? 'PUT' : 'POST';
            const url = selectedCliente
                ? `http://localhost:3001/api/clientes/${selectedCliente.id}`
                : 'http://localhost:3001/api/clientes';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al guardar los cambios');
            }

            await fetchData();
            handleCloseModal();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteClick = (cliente) => {
        setClienteToDelete(cliente);
        setDeleteDialogOpen(true);
    };

    const handleDeleteClose = () => {
        setClienteToDelete(null);
        setDeleteDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
        if (!clienteToDelete) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/api/clientes/${clienteToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el cliente');
            }

            await fetchData();
            handleDeleteClose();
        } catch (err) {
            setError('Error al eliminar el cliente: ' + err.message);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">
                    Lista de Clientes
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => handleOpenModal()}
                >
                    Nuevo Cliente
                </Button>
            </Box>

            {error && (
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'error.light', color: 'error.contrastText' }}>
                    <Typography>{error}</Typography>
                </Paper>
            )}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <Typography>Cargando...</Typography>
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {clientes.map((cliente) => (
                        <Grid key={cliente.id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
                            <Card>
                                <CardHeader
                                    title={cliente.nombre}
                                    subheader={cliente.email}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        Teléfono: {cliente.telefono}
                                    </Typography>
                                    {cliente.actividades && cliente.actividades.length > 0 && (
                                        <Box sx={{ mt: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Actividades: {cliente.actividades.join(', ')}
                                            </Typography>
                                        </Box>
                                    )}
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Dirección: {cliente.direccion || 'No especificada'}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant='contained'
                                        size="small"
                                        color="primary"
                                        onClick={() => handleOpenModal(cliente)}
                                    >
                                        Editar
                                    </Button>
                                    {user?.role === 'ADMIN' ? (
                                        <Tooltip title="Eliminar cliente">
                                            <Button
                                                variant='outlined'
                                                size="small"
                                                color="error"
                                                onClick={() => handleDeleteClick(cliente)}
                                                sx={{ ml: 1 }}
                                                startIcon={<DeleteIcon />}
                                            >
                                                Eliminar
                                            </Button>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Solo los administradores pueden eliminar clientes">
                                            <span>
                                                <Button
                                                    variant='contained'
                                                    size="small"
                                                    color="error"
                                                    disabled
                                                    sx={{ ml: 1 }}
                                                    startIcon={<DeleteIcon />}
                                                >
                                                    Eliminar
                                                </Button>
                                            </span>
                                        </Tooltip>
                                    )}
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Modal de edición/creación */}
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {selectedCliente ? 'Editar Cliente' : 'Nuevo Cliente'}
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{ color: 'grey.500' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <ClienteForm
                        cliente={selectedCliente}
                        onSubmit={handleSubmit}
                        isLoading={saving}
                    />
                </DialogContent>
            </Dialog>

            {/* Modal de confirmación de eliminación */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirmar eliminación
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancelar</Button>
                    <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
export default ClientesPage;
