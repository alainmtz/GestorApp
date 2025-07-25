// frontend/src/api/clientes.js
const API_URL = "http://localhost:3001/api/clientes";

export async function getClientes() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener clientes");
  return res.json();
}

export async function createCliente(cliente) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente)
  });
  if (!res.ok) throw new Error("Error al crear cliente");
  return res.json();
}

export async function updateCliente(id, cliente) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente)
  });
  if (!res.ok) throw new Error("Error al actualizar cliente");
  return res.json();
}

export async function deleteCliente(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Error al eliminar cliente");
}
