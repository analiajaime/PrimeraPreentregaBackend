// Importar Socket.IO para el lado del cliente
import io from "socket.io-client";
const socket = io(); // Conecta al socket del servidor

// Escuchar eventos de 'productos' y renderizarlos
socket.on("productos", (data) => {
    renderProductos(data);
}); 

// Función para renderizar la tabla de productos
const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    productos.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <p>Id ${item.id} </p>
            <p>Titulo ${item.title} </p>
            <p>Precio ${item.price} </p>
            <button> Eliminar Producto </button>
        `;
        contenedorProductos.appendChild(card);

        // Agregamos el evento eliminar producto
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id);
        });
    });
}

// Función para eliminar producto
const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id);
}

// Evento de clic para agregar producto
document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto();
});

// Función para agregar producto
const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    };
    
    socket.emit("agregarProducto", producto);
};
