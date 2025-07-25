import React, { useEffect, useState } from "react";
import ClientesList from "./ClientesList";
import ClientesForm from "./ClientesForm";
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente
} from "../api/clientes";
import "./ClientesPage.css";

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    setLoading(true);
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (err) {
      alert("Error al cargar clientes");
    }
    setLoading(false);
  };

  const handleSave = async (cliente) => {
    try {
      if (cliente.id) {
        await updateCliente(cliente.id, cliente);
      } else {
        await createCliente(cliente);
      }
      setClienteSeleccionado(null);
      cargarClientes();
    } catch (err) {
      alert("Error al guardar cliente");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;
    try {
      await deleteCliente(id);
      cargarClientes();
    } catch (err) {
      alert("Error al eliminar cliente");
    }
  };

  const handleSelect = (cliente) => setClienteSeleccionado(cliente);

  return (
    <div className="clientes-page">
      <div className="clientes-header">
        <h1>Clientes</h1>
        <button onClick={() => setClienteSeleccionado({})}>Nuevo Cliente</button>
      </div>

      {/* Modal para el formulario */}
      {clienteSeleccionado && (
        <div className="modal-overlay" onClick={() => setClienteSeleccionado(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <ClientesForm
              key={clienteSeleccionado.id || "nuevo"}
              cliente={clienteSeleccionado}
              onSave={handleSave}
            />
            <button className="modal-close" style={{color: "white", backgroundColor: "red", border: "none", borderRadius: "50%", padding: "5px 10px", fontSize: "16px", cursor: "pointer"}} onClick={() => setClienteSeleccionado(null)}>&times;</button>
          </div>
        </div>
      )}

      {loading ? (
        <p>Cargando clientes...</p>
      ) : (
        <ClientesList
          className="clientes-list"
          clientes={clientes}
          onSelect={handleSelect}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ClientesPage;