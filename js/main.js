const botones = document.getElementById("botones");
// const monTotal = document.getElementById("montotal")
const container = document.getElementById("container");
const btnCarrito = document.getElementById("btn-carrito");
const divCarrito = document.getElementById("carrito");


let mostrar = false;

const botonMostrarOcultar = document.createElement("button");
botonMostrarOcultar.innerText = "Ocultar Carrito"
botonMostrarOcultar.onclick = () => mostrarOcultar(mostrar);

botones.appendChild(botonMostrarOcultar);

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id){
    const semaAAgregar = semillas.find(el => el.id === id);
    if(carrito.some(element => element.id === semaAAgregar.id)){
        alert("Solo se puede agregar una raza de semilla por compra. Disculpe las molestias.")
    } else {
        divCarrito.innerHTML = "";
        carrito.push(semaAAgregar);
        alert("Producto agregado satisfactoriamente.")
        localStorage.setItem("carrito", JSON.stringify(carrito));
        carrito.forEach(el => crearCard(el, "carrito"));
    };
};

function quitarDelCarrito(id){
    divCarrito.innerHTML = "";
    let nuevoCarrito = carrito.filter(el => el.id !== id);
    alert("Producto removido satisfactoriamente.")
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    carrito = nuevoCarrito;
    carrito.forEach(el => crearCard(el, "carrito"));
    
};

function crearCard(semilla, contenedor){
    const card = document.createElement("div");
    card.className = "card"

    const titulo = document.createElement("p");
    titulo.innerText = semilla.nombre;
    titulo.className = "nombre";

    const imagen = document.createElement("img");
    imagen.src = semilla.imagen;
    imagen.className = "imagen";

    const precio = document.createElement("p")
    precio.innerText = `$${semilla.precio}`;
    precio.className = "precio";

    const botonAgregar = document.createElement("button");
    botonAgregar.innerText = contenedor === "container" ? "Agregar al carrito" : "Quitar del carrito";
    botonAgregar.className = "btn-add";
    if(contenedor === "container"){
        botonAgregar.onclick = () => agregarAlCarrito(semilla.id);
    } else {
        botonAgregar.onclick = () => quitarDelCarrito(semilla.id);
    }
    

    card.appendChild(titulo);
    card.appendChild(imagen);
    card.appendChild(precio);
    card.appendChild(botonAgregar);

    const nuevoContenedor = document.getElementById(contenedor)

    nuevoContenedor.appendChild(card);
};

function mostrarOcultar(estadoActual){
    if(estadoActual){
        mostrar = false;
        divCarrito.innerHTML = "";
        botonMostrarOcultar.innerText = "Mostrar Carrito";
    } else {
        divCarrito.innerHTML = "";
        mostrar = true;
        carrito.forEach(el => crearCard(el, "carrito"));
        botonMostrarOcultar.innerText = "Ocultar Carrito";

    };
};



// function mostrarTotal(precio){

//     const botonTotal = document.createElement("button");
//     botonTotal.innerText = "Su total es de"
//     carrito.forEach(el => total += el.precio);

// btnCarrito.appendChild(botonTotal);

// }

semillas.forEach( el => crearCard(el, "container"));
carrito.forEach(el => crearCard(el, "carrito"));


