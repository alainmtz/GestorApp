import React from "react";

const ClientesList = ({ clientes, onSelect, onDelete, className }) => (
  <div className={className + " clientes-cards-container"}>
    {clientes.map(cliente => (
      <div className="cliente-card" key={cliente.id}>
        <div className="cliente-card-header">
          {cliente.nombre}
        </div>
        <div className="cliente-card-body">
          <div><strong>Email:</strong> {cliente.email}</div>
          <div><strong>Teléfono:</strong> {cliente.telefono}</div>
          <div><strong>Actividades:</strong> {cliente.actividades.join(", ")}</div>
        </div>
        <div className="cliente-card-footer">
          <button onClick={() => onSelect(cliente)}>Editar</button>
          <button
            style={{ marginLeft: "8px", background: "#e53935" }}
            onClick={() => onDelete(cliente.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default ClientesList;
