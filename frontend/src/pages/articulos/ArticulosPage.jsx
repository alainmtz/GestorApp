
import { Box, Card, CardMedia, Chip } from '@mui/material';
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
import image from './/images/1.jpg'

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

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/articulo');

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            setarticulo(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los articulo: ' + err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <h1>Lista de articulos</h1>
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
                                    <Typography sx={{ p: 1 }}>
                                        <h3>{articulo.marca}</h3>
                                    </Typography>
                                    <Chip label={articulo.modelo} />
                                    <p>{articulo.detalles}</p>
                                </CardContent>
                                <Button size="small" color="primary" sx={{ p: 1 }}>
                                    Edit
                                </Button>
                            </Card>
                        ))}
                    </Grid>
                </Box>
            )
            }
        </div >
    );
};
export default ArticulosPage;
