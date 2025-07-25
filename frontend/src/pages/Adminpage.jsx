import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });

  // 1. Cargar usuarios al montar el componente
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  // 2. Abrir el diálogo de edición
  const handleEditClick = (user) => {
    setEditUser(user);
    setEditForm({ name: user.name || '', email: user.email, role: user.role || '' });
  };

  // 3. Manejar cambios en el formulario de edición
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // 4. Guardar cambios
  const handleEditSave = () => {
    fetch(`http://localhost:3001/users/${editUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
      .then(res => res.json())
      .then(updatedUser => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setEditUser(null);
      })
      .catch(err => console.error(err));
  };

  // 5. Cerrar el diálogo
  const handleEditClose = () => {
    setEditUser(null);
  };

  // 6. Renderizar la tabla y el diálogo de edición
  return (
    <div style={{ padding: 24 }}>
      <h2>Usuarios del sistema</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEditClick(user)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de edición */}
      <Dialog open={!!editUser} onClose={handleEditClose}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            name="name"
            value={editForm.name}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={editForm.email}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Rol"
            name="role"
            value={editForm.role}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancelar</Button>
          <Button onClick={handleEditSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
