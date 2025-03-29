// Función para validar el login
function validarLogin(event) {
    event.preventDefault(); // Evita el envío por defecto del formulario

    const username = document.getElementById("inpuText").value.trim();
    const password = document.getElementById("contraseña").value.trim();
    const mensaje = document.getElementById("mensaje");

    if (!username || !password) {
        mensaje.style.color = "red";
        mensaje.textContent = "Por favor, completa todos los campos.";
        mensaje.style.display = "block";
        return;
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = data.redirectUrl;
        } else {
            mensaje.style.color = "red";
            mensaje.textContent = "Usuario o contraseña incorrectos";
            mensaje.style.display = "block";
        }
    })
    .catch(error => {
        console.error("Error en la petición:", error);
        mensaje.style.color = "red";
        mensaje.textContent = "Error al conectar con el servidor.";
        mensaje.style.display = "block";
    });
}

// Asignar evento al botón de login
document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", validarLogin);
    }
});

// Función para cambiar el color del elemento
function changeColor(element) {
    const colores = {
        azul: "rgb(0, 0, 255)",
        rojo: "rgb(255, 0, 0)",
        blanco: "rgb(255, 255, 255)"
    };

    let currentColor = window.getComputedStyle(element).backgroundColor;

    // Si ya es azul o rojo, lo vuelve blanco
    if (currentColor === colores.azul || currentColor === colores.rojo) {
        element.style.backgroundColor = colores.blanco;
    } else {
        element.style.backgroundColor = element.textContent.trim() === "D" ? colores.azul : colores.rojo;
    }
}

// Mostrar/Ocultar la tabla de empleados
document.addEventListener("DOMContentLoaded", function () {
    let contenedorEmpleados = document.getElementById("contenedorEmpleados");
    let tabla = document.querySelector(".divTable");
    let titulo = document.querySelector("h2");
    let mensajeBienvenida = document.getElementById("mensajeBienvenida");

    if (tabla) tabla.style.display = "none";
    if (titulo) titulo.style.display = "none";
    if (mensajeBienvenida) mensajeBienvenida.style.display = "block";

    if (contenedorEmpleados) {
        contenedorEmpleados.addEventListener("click", function () {
            let visible = tabla.style.display === "none";
            tabla.style.display = visible ? "block" : "none";
            titulo.style.display = visible ? "block" : "none";
            if (mensajeBienvenida) mensajeBienvenida.style.display = visible ? "none" : "block";
        });
    }
});
