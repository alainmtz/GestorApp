
import {
    Box,
    Card,
    CardMedia,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors';
import image from './/images/1.jpg';
import ArticuloForm from '../../components/articulos/ArticuloForm';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));
const ArticulosPage = () => {
    const user = useAuth();
    const [articulo, setarticulo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedArticulo, setSelectedArticulo] = useState(null);
    const [saving, setSaving] = useState(false);

    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState('');

    const fetchClientes = async () => {
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
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const fetchData = async () => {
        if (!user) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const url = selectedCliente
                ? `http://localhost:3001/articulo?clienteId=${selectedCliente}`
                : 'http://localhost:3001/articulo';

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            setarticulo(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los articulos: ' + err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchClientes();
        fetchData();
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [selectedCliente]);
    const handleOpenModal = (articulo = null) => {
        setSelectedArticulo(articulo);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedArticulo(null);
        setOpenModal(false);
        setSaving(false);
    };

    const handleSubmit = async (formData) => {
        try {
            setSaving(true);
            const token = localStorage.getItem('token');
            const method = selectedArticulo ? 'PUT' : 'POST';
            const url = selectedArticulo
                ? `http://localhost:3001/articulo/${selectedArticulo.id}`
                : 'http://localhost:3001/articulo';

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

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">
                    Lista de artículos
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal()}
                    startIcon={<AddIcon />}
                >
                    Nuevo Artículo
                </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="cliente-filter-label">Filtrar por Cliente</InputLabel>
                    <Select
                        labelId="cliente-filter-label"
                        id="cliente-filter"
                        value={selectedCliente}
                        onChange={(e) => setSelectedCliente(e.target.value)}
                        label="Filtrar por Cliente"
                    >
                        <MenuItem value="">
                            <em>Todos los artículos</em>
                        </MenuItem>
                        {clientes.map((cliente) => (
                            <MenuItem key={cliente.id} value={cliente.id}>
                                {cliente.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {loading && <p>Cargando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <Box className="p-4" sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {articulo.map(articulo => (
                            <Card variant='outlined' key={articulo.id} className="mb-2">
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="140"
                                    image={image} />
                                <CardContent>
                                    <Typography sx={{ p: 1 }} component="h3" variant="h6">
                                        {articulo.marca}
                                    </Typography>
                                    <Chip label={articulo.modelo} />
                                    <Typography sx={{ mt: 1 }} variant="body2">
                                        {articulo.detalles}
                                    </Typography>
                                </CardContent>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => handleOpenModal(articulo)}
                                    sx={{ p: 1 }}
                                >
                                    Edit
                                </Button>
                            </Card>
                        ))}
                    </Grid>
                </Box>
            )}

            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {selectedArticulo ? 'Editar Artículo' : 'Nuevo Artículo'}
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{ color: 'grey.500' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <ArticuloForm
                        articulo={selectedArticulo}
                        onSubmit={handleSubmit}
                        isLoading={saving}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default ArticulosPage;
