function calcularCoordenadasElipse(a, b, h, k, t) {
  const x = h + a * Math.cos(t);
  const y = k + b * Math.sin(t);
  const z = 0; // O cualquier valor constante para la dimensión z en 2D

  return { x, y, z };
}

const div = document.querySelector(".moving-div");
const a = 200; // Semieje mayor
const b = 100; // Semieje menor
const h = 0; // Coordenada x del centro
const k = 0; // Coordenada y del centro
const duracionAnimacion = 5; // en segundos
const framesPorSegundo = 60;
const numeroDeFrames = duracionAnimacion * framesPorSegundo;

function animar() {
  let startTime;

  function animacionLoop(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    const progreso = (timestamp - startTime) / (duracionAnimacion * 1000);

    if (progreso <= 1) {
      const t = -progreso * 2 * Math.PI;
      const coordenadas = calcularCoordenadasElipse(a, b, h, k, t);

      div.style.transform = `translate(${coordenadas.x}px, ${coordenadas.y}px)`;
      requestAnimationFrame(animacionLoop);
    } else {
      // Reiniciar la animación después de completar una iteración
      startTime = null;
      animar();
    }
  }

  requestAnimationFrame(animacionLoop);
}

animar();
