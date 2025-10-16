document.addEventListener("DOMContentLoaded", () => {
  const personajeData = localStorage.getItem("personajeSeleccionado");
  if (!personajeData) {
    alert("No elegiste ningún personaje. Volviendo al menú...");
    window.location.href = "index.html";
    return;
  }

  const personaje = JSON.parse(personajeData);

  // Mensaje de depuración visible en pantalla
  const info = document.createElement("div");
  info.style.textAlign = "center";
  info.style.fontFamily = "monospace";
  info.style.marginTop = "10px";
  info.innerHTML = `
    <p>🧩 Personaje seleccionado: <b>${personaje.nombre}</b></p>
    <p>Intentando cargar: <span style="color:blue">${personaje.imagenPath}</span></p>
  `;
  document.body.appendChild(info);

  // Crear el canvas
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.7;
  canvas.style.display = "block";
  canvas.style.margin = "10px auto";
  canvas.style.background = "#e6e9ef";
  canvas.style.border = "2px solid #555";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  // Cargar la imagen del personaje
  const img = new Image();
  img.src = personaje.imagenPath;

  img.onload = () => {
    info.innerHTML += `<p style="color:green">✅ Imagen cargada correctamente</p>`;
    personajeObj.dibujar();
    loop();
  };

  img.onerror = () => {
    info.innerHTML += `<p style="color:red">❌ Error cargando la imagen</p>`;
  };

  const personajeObj = {
    x: 50,
    y: canvas.height - 120,
    ancho: 100,
    alto: 100,
    velocidadY: 0,
    enElAire: false,

    dibujar() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, this.x, this.y, this.ancho, this.alto);
    },

    saltar() {
      if (!this.enElAire) {
        this.velocidadY = -20;
        this.enElAire = true;
      }
    },

    actualizar() {
      this.y += this.velocidadY;
      this.velocidadY += 1.2; // gravedad
      if (this.y > canvas.height - 120) {
        this.y = canvas.height - 120;
        this.velocidadY = 0;
        this.enElAire = false;
      }
      this.dibujar();
    }
  };

  function loop() {
    personajeObj.actualizar();
    requestAnimationFrame(loop);
  }

  // Controles: toque o tecla espacio
  canvas.addEventListener("touchstart", () => personajeObj.saltar());
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") personajeObj.saltar();
  });

  const mensaje = document.createElement("p");
  mensaje.textContent = "Tocá la pantalla o presioná ESPACIO para saltar 🎮";
  mensaje.style.textAlign = "center";
  mensaje.style.fontFamily = "Arial, sans-serif";
  document.body.prepend(mensaje);
});
