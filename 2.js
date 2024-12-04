let votos = [];
let candidatos = [];

function cargarCandidatos() {
  fetch("https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/candidatos.json")
    .then(respuesta => respuesta.json())
    .then(datos => {
      candidatos = datos;
      candidatos.forEach((candidato, index) => {
        votos[index] = 0;

        const cajaCandidato = document.createElement("div");
        cajaCandidato.classList.add("candidato");

        const cajaCurso = document.createElement("div");
        cajaCurso.textContent = candidato.curso;

        const cajaFoto = document.createElement("div");
        const foto = document.createElement("img");
        foto.src = candidato.foto;
        foto.alt = Foto de ${candidato.nombre} ${candidato.apellido};
        foto.width = 200;
        foto.height = 200;

        foto.addEventListener("click", () => {
          alert(Votaste por ${candidato.nombre} ${candidato.apellido});
          votos[index]++;
          console.log(votos);
        });

        cajaFoto.appendChild(foto);

        const cajaDatos = document.createElement("div");
        const aprendiz = document.createElement("h5");
        aprendiz.textContent = ${candidato.nombre} ${candidato.apellido};
        cajaDatos.appendChild(aprendiz);

        const ficha = document.createElement("h5");
        ficha.textContent = candidato.ficha || "Sin ficha";
        cajaDatos.appendChild(ficha);

        cajaCandidato.appendChild(cajaCurso);
        cajaCandidato.appendChild(cajaFoto);
        cajaCandidato.appendChild(cajaDatos);

        document.querySelector("#candidatos").appendChild(cajaCandidato);
      });
    })
    .catch(error => console.error("Error al cargar los candidatos:", error));
}

function cerrarElecciones() {
  const resultado = candidatos.map((candidato, index) => 
    ${candidato.nombre} ${candidato.apellido}: ${votos[index]} votos
  ).join("\n");

  alert("Resultados de las elecciones:\n" + resulta