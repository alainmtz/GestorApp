
import { Box, Card, CardHeader } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { grey } from '@mui/material/colors';

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
const ClientesPage = () => {
    const user = useAuth();
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/clientes', {
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
    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">
                    Lista de Clientes
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={NavLink}
                    to="/clientes/new"
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
                                </CardContent>
                                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        size="small"
                                        color="primary"
                                        component={NavLink}
                                        to={`/clientes/${cliente.id}`}
                                    >
                                        Editar
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};
export default ClientesPage;
