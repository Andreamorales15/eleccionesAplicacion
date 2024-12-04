
let candidatos = [];
let votos = [];
let eleccionesIniciadas = false;

document.querySelector("#btn-iniciar").addEventListener("click", function () {
    if (eleccionesIniciadas) {
        alert("Las elecciones ya están iniciadas.");
        return;
    }

    cargarCandidatos();
    eleccionesIniciadas = true;

    document.querySelector("#btn-cerrar").disabled = false;
    document.querySelector("#btn-iniciar").disabled = true;
    alert("Elecciones iniciadas. ¡Puedes votar!");
});

document.querySelector("#btn-cerrar").addEventListener("click", function () {
    if (!eleccionesIniciadas) {
        alert("Las elecciones no están iniciadas.");
        return;
    }

    mostrarResultados();
});

function cargarCandidatos() {
    fetch("https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/candidatos.json")
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            candidatos = datos;
            votos = new Array(candidatos.length).fill(0);

            let contenedor = document.querySelector("#candidatos");
            contenedor.innerHTML = "";

            candidatos.forEach(function (candidato, index) {
                let candidatoDiv = document.createElement("div");
                candidatoDiv.classList.add("candidato");

                let nombre = document.createElement("h3");
                nombre.textContent = candidato.nombre + " " + candidato.apellido;

                let curso = document.createElement("p");
                curso.textContent = "Programa: " + candidato.curso;

                let foto = document.createElement("img");
                foto.src = candidato.foto;
                foto.alt = candidato.nombre;
                foto.width = 150;
                foto.height = 150;
                foto.style.cursor = "pointer";

                foto.addEventListener("click", function () {
                    if (confirm(`¿Está seguro de votar por ${candidato.nombre} ${candidato.apellido}?`)) {
                        votos[index]++;
                        alert("¡Voto registrado!");
                    }
                });

                candidatoDiv.appendChild(nombre);
                candidatoDiv.appendChild(curso);
                candidatoDiv.appendChild(foto);
                contenedor.appendChild(candidatoDiv);
            });
        });
}

function mostrarResultados() {
    let resultados = "Resultados:\n";
    candidatos.forEach(function (candidato, index) {
        resultados += `${candidato.nombre} ${candidato.apellido}: ${votos[index]} votos\n`;
    });

    alert(resultados);
    eleccionesIniciadas = false;
    document.querySelector("#btn-cerrar").disabled = true;
    document.querySelector("#btn-iniciar").disabled = false;
}
