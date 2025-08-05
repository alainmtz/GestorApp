import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Stack,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ClienteForm = ({ cliente, onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        nombre: cliente?.nombre || '',
        email: cliente?.email || '',
        telefono: cliente?.telefono || '',
        actividades: cliente?.actividades || []
    });
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [nuevaActividad, setNuevaActividad] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddActividad = () => {
        if (nuevaActividad.trim()) {
            setFormData(prev => ({
                ...prev,
                actividades: [...prev.actividades, nuevaActividad.trim()]
            }));
            setNuevaActividad('');
            setOpenDialog(false);
        }
    };

    const handleRemoveActividad = (index) => {
        setFormData(prev => ({
            ...prev,
            actividades: prev.actividades.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.nombre.trim()) {
            setError('El nombre es requerido');
            return;
        }

        if (!formData.email.trim()) {
            setError('El email es requerido');
            return;
        }

        if (!formData.telefono.trim()) {
            setError('El teléfono es requerido');
            return;
        }

        try {
            await onSubmit(formData);
        } catch (err) {
            setError(err.message || 'Error al guardar el cliente');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Stack spacing={3}>
                <TextField
                    required
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />

                <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <TextField
                    required
                    fullWidth
                    label="Teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                />

                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ flexGrow: 1 }}>Actividades</Box>
                        <IconButton
                            size="small"
                            onClick={() => setOpenDialog(true)}
                            color="primary"
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {formData.actividades.map((actividad, index) => (
                            <Chip
                                key={index}
                                label={actividad}
                                onDelete={() => handleRemoveActividad(index)}
                                sx={{ m: 0.5 }}
                            />
                        ))}
                    </Stack>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Guardando...' : 'Guardar'}
                    </Button>
                </Box>
            </Stack>

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
        </Box>
    );
};

export default ClienteForm;
