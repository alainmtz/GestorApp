import React, { useState, useEffect } from "react";

const ClientesForm = ({ cliente, onSave }) => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    actividades: []
  });

  const [actividadSeleccionada, setActividadSeleccionada] = useState("");

  const ACTIVIDADES_PERMITIDAS = [
    "Comercio minorista",
    "Servicios profesionales",
    "Educación",
    "Salud",
    "Tecnología",
    "Construcción",
    "Transporte",
    "Turismo"
  ];

  useEffect(() => {
    setForm({
      nombre: cliente?.nombre || "",
      email: cliente?.email || "",
      telefono: cliente?.telefono || "",
      actividades: cliente?.actividades || []
    });
  }, [cliente]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave({
      ...cliente,
      ...form,
      actividades: form.actividades
    });
  };

  return (
    <form className="clientes-form" onSubmit={handleSubmit}>
      <h2>{cliente?.id ? "Editar Cliente" : "Nuevo Cliente"}</h2>
      <div className="form-row">
        <label>Nombre:</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>Email:</label>
        <input name="email" value={form.email} onChange={handleChange} type="email" required />
      </div>
      <div className="form-row">
        <label>Teléfono:</label>
        <input name="telefono" value={form.telefono} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>Actividades:</label>
        <div style={{ display: "flex", gap: "8px" }}>
          <select
            value={actividadSeleccionada}
            onChange={e => setActividadSeleccionada(e.target.value)}
          >
            <option value="">Selecciona una actividad</option>
            {ACTIVIDADES_PERMITIDAS
              .filter(act => !form.actividades.includes(act))
              .map(act => (
                <option key={act} value={act}>{act}</option>
              ))}
          </select>
          <button
            type="button"
            onClick={() => {
              if (
                actividadSeleccionada &&
                !form.actividades.includes(actividadSeleccionada)
              ) {
                setForm({
                  ...form,
                  actividades: [...form.actividades, actividadSeleccionada]
                });
                setActividadSeleccionada("");
              }
            }}
            disabled={!actividadSeleccionada}
          >
            Agregar
          </button>
        </div>
        <div className="actividades-seleccionadas">
          {form.actividades.map(act => (
            <span key={act} className="actividad-tag">
              {act}
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    actividades: form.actividades.filter(a => a !== act)
                  })
                }
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className="form-actions">
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
};

export default ClientesForm;
