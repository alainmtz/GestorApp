import React from "react";

const VentasList = () => {
  return (
    <div>
      <h1>Lista de Ventas</h1>
      {/* Aquí irá la lista de ventas */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de la Venta</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí se mapearán las ventas */}
          {/* Ejemplo de una fila de venta */}
          <tr>
            <td>1</td>
            <td>Venta 1</td>
            <td>10</td>
            <td>$100.00</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VentasList; 