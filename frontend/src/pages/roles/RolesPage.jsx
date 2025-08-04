import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Select,
    MenuItem,
    Alert,
    Card,
    CardContent,
    Grid
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const RolesPage = () => {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { user } = useAuth();

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/roles/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('No tienes permisos para ver esta información');
            }

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/roles/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener estadísticas');
            }

            const data = await response.json();
            setStats(data);
        } catch (err) {
            console.error('Error al obtener estadísticas:', err);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchStats();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/api/roles/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al actualizar el rol');
            }

            setSuccessMessage('Rol actualizado correctamente');
            fetchUsers(); // Actualizar la lista de usuarios
            fetchStats(); // Actualizar las estadísticas

            // Limpiar el mensaje de éxito después de 3 segundos
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (err) {
            setError(err.message);
        }
    };

    if (!user || !['ADMIN', 'DEVELOPER'].includes(user.role)) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">
                    No tienes permisos para acceder a esta página
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Gestión de Roles
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

            <Grid container spacing={3} sx={{ mb: 3 }}>
                {stats.map((stat) => (
                    <Grid key={stat.role} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {stat.role}
                                </Typography>
                                <Typography variant="h4">
                                    {stat._count.role}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    usuarios
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rol Actual</TableCell>
                            <TableCell>Cambiar Rol</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        size="small"
                                        disabled={user.role === 'ADMIN' && user.role !== 'ADMIN'}
                                    >
                                        <MenuItem value="ADMIN">Admin</MenuItem>
                                        <MenuItem value="DEVELOPER">Developer</MenuItem>
                                        <MenuItem value="USER">User</MenuItem>
                                        <MenuItem value="GUEST">Guest</MenuItem>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RolesPage;
