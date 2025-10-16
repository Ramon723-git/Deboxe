class Personaje {
  constructor(id, nombre, imagenPath) {
    this.id = id;
    this.nombre = nombre;
    this.imagenPath = imagenPath;
  }
}

// Crear 15 personajes
const personajes = [];
for (let i = 1; i <= 15; i++) {
  const ruta = `./images/personaje${i}.jpg`; // revisá que existan esas imágenes
  personajes.push(new Personaje(i, `Personaje ${i}`, ruta));
}

const contenedor = document.getElementById("lista-personajes");

personajes.forEach(p => {
  const card = document.createElement("div");
  card.className = "personaje-card";

  const img = document.createElement("img");
  img.src = p.imagenPath;
  img.alt = p.nombre;

  const nombreEl = document.createElement("p");
  nombreEl.textContent = p.nombre;

  const btn = document.createElement("button");
  btn.textContent = "Elegir";
  btn.addEventListener("click", () => {
    localStorage.setItem("personajeSeleccionado", JSON.stringify(p));
    window.location.href = "./juegos.html"; // redirige correctamente
  });

  card.appendChild(img);
  card.appendChild(nombreEl);
  card.appendChild(btn);
  contenedor.appendChild(card);
});
