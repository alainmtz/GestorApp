import React, { useState, useEffect } from "react";
import { Box, TextField } from '@mui/material';
import { IconButton, AddIcon } from '@mui/material/IconButton';
import { useParams } from "react-router-dom";

const ProductosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articulo, setArticulo] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [nuevaActividad, setNuevaActividad] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        const response = await fetch(`/api/articulos/${id}`);
        const data = await response.json();
        setArticulo(data);
      } catch (error) {
        console.error("Error al obtener el artículo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticulo();
    } else {
      setLoading(false);
    }
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticulo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/articulos/${id || ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(articulo)
      });

      if (!response.ok) {
        throw new Error('Error al guardar el artículo');
      }

      const data = await response.json();
      setSuccessMessage('Artículo guardado correctamente');
      navigate(`/articulos/${data.id}`);

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <h1>Productos Form</h1>
        <Box>
          <TextField label="Nombre del producto" variant="outlined" fullWidth margin="normal" />
          <TextField label="Descripción" variant="outlined" fullWidth margin="normal" />
          <TextField label="Precio" variant="outlined" fullWidth margin="normal" />
          <TextField label="Categoría" variant="outlined" fullWidth margin="normal" />
          <IconButton>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

    </form>
  );
};

export default ProductosForm; 