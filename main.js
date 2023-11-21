function calcularCoordenadasElipse(majorSemiaxis, minorSemiaxis, ix, iy, t) {
  const positionX = ix + majorSemiaxis * Math.cos(t);
  const positionY = iy + minorSemiaxis * Math.sin(t);

  return { positionX, positionY };
}

const moving = document.querySelector(".moving-div");
const container = document.querySelector(".container");

const majorSemiaxis = 200; // Semieje mayor
const minorSemiaxis = 100; // Semieje menor
const initialPositionX = 0; // Coordenada x del centro
const initialPositionY = 0; // Coordenada y del centro
const duracionAnimacion = 5; // en segundos
const framesPorSegundo = 60;
const numeroDeFrames = duracionAnimacion * framesPorSegundo;

container.style.width = `${majorSemiaxis * 2}px`;
container.style.height = `${minorSemiaxis * 2}px`;
container.style.transform = "";

function animar() {
  let startTime;

  function animacionLoop(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    const progreso = (timestamp - startTime) / (duracionAnimacion * 1000);

    if (progreso <= 1) {
      const t = progreso * 2 * Math.PI + Math.PI / 6;
      const { positionX, positionY } = calcularCoordenadasElipse(
        majorSemiaxis,
        minorSemiaxis,
        initialPositionX,
        initialPositionY,
        t
      );

      moving.style.transform = `translate(${positionX}px, ${positionY}px)`;
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
