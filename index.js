//Array vacío carrito
let carrito = [];

//Funcion crear cards
function crearCard(producto) {
  //Estructura card
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = producto.id;

  const img = document.createElement("img");
  img.setAttribute("src", producto.imagen);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h1");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = producto.nombre;

  const cardSubtitle = document.createElement("h2");
  cardSubtitle.className = "card-subtitle";
  cardSubtitle.innerText = producto.categoria;

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.innerText = `$${producto.precio}`;

  //Boton agregar al carrito
  const buttonCarrito = document.createElement("button");
  buttonCarrito.classList.add("btn");
  buttonCarrito.classList.add("btn-primary");
  buttonCarrito.innerText = "Agregar al carrito";
  buttonCarrito.addEventListener("click", (e) => {
    // Obtengo el botón
    const button = e.target;
    // Obtengo el padre (cardBody)
    const cardBody = button.parentNode;
    // Obtengo el padre del padre (card)
    const card = cardBody.parentNode;
    // Obtengo el id del producto del dataset
    const productoId = card.dataset.id;
        // Busco el producto en el catálogo
        for (let producto of catalogo) {
          if (producto.id == productoId) {
            // Agrego el producto al carrito
            carrito.push(producto);
            alert("Se agregó un producto al carrito.");
            break;
          }
        }
      });

    //VENTANA MODAL VER MÁS
    const buttonVerMas = document.createElement("button");
    buttonVerMas.classList.add("btn");
    buttonVerMas.classList.add("btn-primary");
    buttonVerMas.innerText = "Ver más";
    buttonVerMas.addEventListener("click", () => {
      //Creo la ventana modal
      const modal = document.createElement("div");
      modal.setAttribute("id", "modal1");
      modal.dataset.id = producto.id;

      const modalBody = document.createElement("div");
      modalBody.classList.add("modal-body");
  
      const modalImg = document.createElement("img");
      modalImg.setAttribute("src", producto.imagen);
      
      const modalTitle = document.createElement("h1");
      modalTitle.classList.add("modal-title")
      modalTitle.innerHTML = producto.nombre;

      const modalDescrpicion = document.createElement("p");
      modalDescrpicion.classList.add("modal-descripcion")
      modalDescrpicion.innerHTML = producto.descripcion;

      const modalPrecio= document.createElement("p");
      modalPrecio.classList.add("modal-precio");
      modalPrecio.innerHTML = `$${producto.precio}`;

      //Cerrar con X ventana modal
      const cerrar = document.createElement("a");
      cerrar.classList.add("cerrar");
      cerrar.setAttribute("href", "javascript:void(0)");
      cerrar.innerText = "X";

      //Boton cerrar ventana modal
      const buttonCerrar = document.createElement("button");
      buttonCerrar.classList.add("btn");
      buttonCerrar.classList.add("btn-secondary");
      buttonCerrar.innerText = "Cerrar";
      buttonCerrar.addEventListener("click", () => {
        const modal = document.getElementById("modal1");
        modal.remove();
      });

      //Boton agregar al carrito en ventana modal
      const buttonModal= document.createElement("button");
      buttonModal.classList.add("btn");
      buttonModal.classList.add("btn-primary");
      buttonModal.innerText = "Agregar al carrito";
      buttonModal.addEventListener("click", (e) =>{
        // Obtengo el botón
        const button = e.target;
        // Obtengo el padre (modalBody)
        const modalBody = button.parentNode;
        //Obtengo el padre del padre (modal)
        const modal = modalBody.parentNode;
        //Obtengo el id del producto del dataset
        const productoId = modal.dataset.id;

        for(let producto of catalogo) {
          // console.log("holis");
          if(producto.id == productoId) {
              carrito.push(producto);
              alert("Se agregó un producto al carrito.");
              break;
          }
      } 
      });

      //Appendeo elementos a modal
      modalBody.appendChild(modalImg);
      modalBody.appendChild(modalTitle);
      modalBody.appendChild(modalDescrpicion);
      modalBody.appendChild(modalPrecio);
      modalBody.appendChild(cerrar);
      modalBody.appendChild(buttonCerrar);
      modalBody.appendChild(buttonModal);

      //Appendeo modal body a modal
      modal.appendChild(modalBody);
      
      //Appendeo modal al body
      document.body.appendChild(modal);
      
      //Remuevo modal del body
      cerrar.addEventListener("click", () => {
        const modal = document.getElementById("modal1");
        modal.remove();
      });
    });

    //Appendeo card al body
    cardBody.append(cardTitle, cardSubtitle, cardText, buttonVerMas, buttonCarrito);
    card.append(img, cardBody);
    //Devuelvo card
    return card;
}

//Funcion para mostrar cards
function mostrarProductos(productos) {
  const contenedorCards = document.querySelector(".contenedor-cards");
  contenedorCards.innerHTML = "";

  productos.forEach((producto) => {
    //Iterar en el array productos para crear una card por producto
    const card = crearCard(producto);
    //Appendear en contenedor
    contenedorCards.appendChild(card);
  });
}

//Mostrar cards en contenedor
catalogo.forEach((producto) => {
  const card = crearCard(producto);
  document.querySelector(".contenedor-cards").appendChild(card);
});


//VENTANA MODAL CARRITO
const modalCarrito = document.querySelector("button");
modalCarrito.addEventListener("click", () => {
  const modal = document.createElement("div");
  modal.setAttribute("id", "modal2");

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  const modalTitle = document.createElement("h1");
  modalTitle.classList.add("modal-title")
  modalTitle.innerText = "Resumen de compra";

  //Mostrar productos del carrito
  const modalProductos = document.createElement("div");
  modalProductos.classList.add("modal-productos");

  //Recorro array carrito
  carrito.forEach((producto) =>{
    const productoItem = document.createElement("div");
    productoItem.classList.add("producto-item");

    const nombreProducto = document.createElement("p");
    nombreProducto.innerText = producto.nombre;

    const precioProducto = document.createElement("p");
    precioProducto.innerText = `$${producto.precio}`;

    //eliminar producto del carrito
    const buttonEliminar = document.createElement("button");
    buttonEliminar.classList.add("btn");
    buttonEliminar.classList.add("btn-danger");
    buttonEliminar.innerText = "Eliminar";
    buttonEliminar.addEventListener("click", () => {
      //Llamo función que elimina el producto
      eliminarProducto(producto);
      //Llamo función que actualiza los datos de la modal
      actualizarModal();
    });

    //Appendeo todos los elementos al contenedor productoItem
    productoItem.appendChild(nombreProducto);
    productoItem.appendChild(precioProducto);
    productoItem.appendChild(buttonEliminar);
    //Appendeo productoItem a la modal
    modalProductos.appendChild(productoItem);
    })

  //Muestro cantidad de productos
  const modalCantidad = document.createElement("p");
  modalCantidad.innerText = `Cantidad de productos en el carrito: ${carrito.length}`;

  //Muestro monto total
  const modalTotal = document.createElement("p");
  modalTotal.classList.add("modal-total")
  modalTotal.innerText = `Total: $${calcularTotal()}`;

  //Cerrar ventana modal 
  const cerrar = document.createElement("a");
  cerrar.classList.add("cerrar");
  cerrar.setAttribute("href", "javascript:void(0)");
  cerrar.innerText = "X";

  //Appendeo elementos a modal
  modalBody.appendChild(modalTitle);
  modalBody.appendChild(modalProductos);
  modalBody.appendChild(modalCantidad);
  modalBody.appendChild(modalTotal);
  modalBody.appendChild(cerrar);
  modal.appendChild(modalBody);
  

  //Appendeo modal al body
  document.body.appendChild(modal);

  //Remuevo modal del body
  cerrar.addEventListener("click", () => {
    const modal = document.getElementById("modal2");
    modal.remove();
  });
});

//Función para calcular el total de los productos
function calcularTotal() {
  //Inicio en 0
  let total = 0;
  //Recorro array carrito 
  carrito.forEach((producto) => {
    //Se suma el precio de cada producto
    total += producto.precio;
  });
  //Devuelvo el total
  return total.toFixed(2);
}

//Funcion para filtrar por categorias
function filtrarCategoria() {
  const contenedorCards = document.querySelector(".contenedor-cards");
  //Borrar elementos del HTML
  contenedorCards.innerHTML = "";

  //Pido categoría al usuario
  const categoria = prompt("Ingrese categoría");
  if (categoria === null){
    mostrarProductos(productos);
  }else{
  //Metodo filter
  const filtrado = catalogo.filter((producto) => {
    //Me fijo si la categoria del producto es igual a la categoria elegida
    return producto.categoria.toLowerCase() === categoria.toLowerCase();
  });
  //Si se ingresó una categoría muesto los productos
  if (filtrado.length > 0) {
    //Llamo a funcion mostrar productos 
    mostrarProductos(filtrado);
  } else {
    //Si no se ingreso una categoria muestro mensaje
    const mensaje = document.createElement("p");
    mensaje.innerText = "No se encontraron productos en esa categoría.";
    contenedorCards.appendChild(mensaje);
  }}

  //Boton volver 
  const contenedor = document.createElement("div");

  const buttonVolver = document.createElement("button");
  buttonVolver.classList.add("btn");
  buttonVolver.classList.add("btn-secondary");
  buttonVolver.innerText = "Volver";
  buttonVolver.addEventListener("click", () => {
    mostrarProductos(productos);
  });
  //Appendeo boton a contenedor
  contenedor.appendChild(buttonVolver);
  //Llamo a div header
  const volver = document.querySelector(".header");
  //Appendeo contenedor a div header
  volver.appendChild(contenedor);


}

//LLamo al boton filtro
const buttonFiltrar = document.querySelector(".filtro");
//Ante el evento click llamo a función filtrar categoría
buttonFiltrar.addEventListener("click", filtrarCategoria);

//Funcion para eliminar producto
function eliminarProducto(producto) {
  //Devuelvo indice de producto
  const indice = carrito.indexOf(producto);
  //Verifico si existe. Si es asi lo elimina.
  if (indice !== -1) {
    carrito.splice(indice, 1);
  }
  actualizarModal();
  return carrito;
}


//Funcion actualizar datos de la modal
function actualizarModal(){
  const modal = document.getElementById("modal2");

  // Obtener el contenedor principal de la ventana modal
  const modalBody = modal.querySelector(".modal-body");
  modalBody.innerHTML = "";

  // Crear los elementos actualizados para mostrar los productos en el carrito
  const modalTitle = document.createElement("h1");
  modalTitle.classList.add("modal-title");
  modalTitle.innerText = "Resumen de compra";

  const modalProductos = document.createElement("div");
  modalProductos.classList.add("modal-productos");

  carrito.forEach((producto) => {
    const productoItem = document.createElement("div");
    productoItem.classList.add("producto-item");

    const nombreProducto = document.createElement("p");
    nombreProducto.innerText = producto.nombre;

    const precioProducto = document.createElement("p");
    precioProducto.innerText = `$${producto.precio}`;

    const buttonEliminar = document.createElement("button");
    buttonEliminar.classList.add("btn");
    buttonEliminar.classList.add("btn-danger");
    buttonEliminar.innerText = "Eliminar";
    buttonEliminar.addEventListener("click", () => {
      eliminarProducto(producto);
    });

    productoItem.appendChild(nombreProducto);
    productoItem.appendChild(precioProducto);
    productoItem.appendChild(buttonEliminar);
    modalProductos.appendChild(productoItem);
  });

  //Muestor cantidad de productos
  const modalCantidad = document.createElement("p");
  modalCantidad.innerText = `Cantidad de productos en el carrito: ${carrito.length}`;

  //Muestro total
  const modalTotal = document.createElement("p");
  modalTotal.classList.add("modal-total");
  modalTotal.innerText = `Total: $${calcularTotal()}`;

  //Cerrar ventana modal 
  const cerrar = document.createElement("a");
  cerrar.classList.add("cerrar");
  cerrar.setAttribute("href", "javascript:void(0)");
  cerrar.innerText = "X";

  modalBody.appendChild(modalTitle);
  modalBody.appendChild(modalProductos);
  modalBody.appendChild(modalCantidad);
  modalBody.appendChild(modalTotal);
  modalBody.appendChild(cerrar);

  //Remuevo modal del body
  cerrar.addEventListener("click", () => {
    const modal = document.getElementById("modal2");
    modal.remove();
  });

}