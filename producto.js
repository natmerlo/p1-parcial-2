
class Producto {
  constructor(id, nombre, descripcion, precio, imagen, categoria) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
    this.categoria = categoria;
  }
}

const catalogo = productos.map((producto) => {
  return new Producto(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.imagen, producto.categoria);
});
