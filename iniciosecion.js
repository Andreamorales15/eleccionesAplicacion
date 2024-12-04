let usuariosAutorizados = [];
let mensajeError = document.querySelector("#mensaje-error");
let formSesion = document.querySelector("#form-sesion");

formSesion.addEventListener("submit", function (e) {
    e.preventDefault();

    let usuario = document.querySelector("#usuario").value;
    let password = document.querySelector("#password").value;

    
    fetch("https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/administrador.json")
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            usuariosAutorizados = datos;
            let usuarioValido = usuariosAutorizados.find(
                function (u) {
                    return u.usuario === usuario && u.password === password;
                }
            );

            if (usuarioValido) {
                alert(`Bienvenido, ${usuarioValido.usuario}`);
                window.location.href = "votacion.html"; 
            } else {
                mensajeError.textContent = "Credenciales incorrectas. Intente nuevamente.";
            }
        });
});

