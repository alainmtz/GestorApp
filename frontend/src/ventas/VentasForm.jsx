import React from "react";

const VentasForm = () => {
  return (
    <div>
      {/* Aquí irá el formulario para agregar o editar ventas */}
      <form>
        <div>
          <label htmlFor="ventaNombre">Nombre de la venta:</label>
          <input type="text" id="ventaNombre" name="ventaNombre" required />
        </div>
        <div>
          <label htmlFor="ventaCantidad">Cantidad:</label>
          <input type="number" id="ventaCantidad" name="ventaCantidad" required />
        </div>
        <div>
          <label htmlFor="ventaPrecio">Precio:</label>
          <input type="number" id="ventaPrecio" name="ventaPrecio" required />
        </div>
        <button type="submit">Guardar Venta</button>
        <button type="reset">Cancelar</button>
      </form>
    </div>
  );
};

export default VentasForm; 