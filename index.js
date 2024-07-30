let saludoUsuario = prompt("¿Cómo prefieres que te llamemos?");

if (saludoUsuario) {
  console.log(
    "Bienvenido " + saludoUsuario + " a la mejor plataforma de beats!"
  );
} else {
  saludoUsuario = "NN";
  console.log("Bienvenido NN a la mejor plataforma de beats!");
}

let generosDisponibles = [
  "rap",
  "R&B",
  "rock",
  "pop",
  "reggae",
  "indie",
  "EDM",
];
console.log("Géneros disponibles: " + generosDisponibles.join(", "));

let preguntaGenero = prompt(
  "Dime " + saludoUsuario + ", ¿qué género musical deseas explorar?"
);

let instrumentales = {
  rap: [
    { nombre: "'Dream' - Boom bap classic type beat", precio: 30 },
    { nombre: "'Powder' - Chill 90s rap beat", precio: 35 },
    { nombre: "'Genesis' - Hard rap beat 2024", precio: 40 },
  ],
  "R&B": [
    { nombre: "'Too good for you' - R&B beat", precio: 45 },
    { nombre: "'Money' - Instrumental R&B", precio: 50 },
    { nombre: "'L.O.V.E.' - R&B new type beat", precio: 55 },
  ],
  rock: [
    { nombre: "'Tiempos de cambiar' - Instrumental rock", precio: 60 },
    { nombre: "'Esmeralda' - 'Guasones' rock type beat", precio: 65 },
    { nombre: "'Soul' - Modern rock type beat", precio: 70 },
  ],
};

function calcularCostos(beatsSeleccionados, cantidadCuotas) {
  const impuesto = 0.21;

  let subtotal = 0;
  for (let i = 0; i < beatsSeleccionados.length; i++) {
    subtotal += beatsSeleccionados[i].precio;
  }

  const cantidadPagar =
    Math.floor(beatsSeleccionados.length / 3) * 2 +
    (beatsSeleccionados.length % 3);

  let total = 0;
  let beatsPagados = [];

  for (let i = 0; i < cantidadPagar; i++) {
    total += beatsSeleccionados[i].precio;
    beatsPagados.push(beatsSeleccionados[i].nombre);
  }

  total += total * impuesto;

  let cuota = total / cantidadCuotas;

  let beatsGratuitos = [];
  if (beatsSeleccionados.length > 2) {
    for (let i = cantidadPagar; i < beatsSeleccionados.length; i++) {
      beatsGratuitos.push(beatsSeleccionados[i].nombre);
    }
  }

  return {
    total: total.toFixed(2),
    cuota: cuota.toFixed(2),
    beatsPagados,
    beatsGratuitos,
  };
}

if (instrumentales[preguntaGenero]) {
  console.log(
    "Aquí están tus opciones de instrumentales para el género " +
      preguntaGenero +
      ":"
  );

  let opciones = instrumentales[preguntaGenero];
  for (let i = 0; i < opciones.length; i++) {
    console.log(
      i + 1 + ". " + opciones[i].nombre + " - $" + opciones[i].precio
    );
  }

  let cantidadBeats = parseInt(
    prompt(
      "¿Cuántos beats deseas comprar? (Elige entre 1 y " + opciones.length + ")"
    ),
    10
  );

  if (
    isNaN(cantidadBeats) ||
    cantidadBeats <= 0 ||
    cantidadBeats > opciones.length
  ) {
    console.log("Cantidad de beats no válida.");
  } else {
    let beatsSeleccionados = [];

    for (let i = 0; i < cantidadBeats; i++) {
      let seleccionBeat = parseInt(
        prompt(
          "Selecciona el beat que deseas comprar (elige un número del 1 al " +
            opciones.length +
            "):"
        ),
        10
      );

      if (
        isNaN(seleccionBeat) ||
        seleccionBeat < 1 ||
        seleccionBeat > opciones.length
      ) {
        console.log(
          "Selección de beat no válida. El beat " +
            seleccionBeat +
            " no existe."
        );
        i--;
      } else {
        beatsSeleccionados.push(opciones[seleccionBeat - 1]);
      }
    }

    let cantidadCuotas = parseInt(
      prompt("¿En cuántas cuotas deseas pagar? (máximo 6)"),
      10
    );

    if (isNaN(cantidadCuotas) || cantidadCuotas <= 0 || cantidadCuotas > 6) {
      cantidadCuotas = 1;
      console.log("Número de cuotas no válido.");
    }

    let { total, cuota, beatsPagados, beatsGratuitos } = calcularCostos(
      beatsSeleccionados,
      cantidadCuotas
    );

    console.log(
      "Monto total a pagar (con impuestos y descuento '3x2'): $" + total
    );
    console.log(
      "Monto por cuota (si se paga en " + cantidadCuotas + " cuotas): $" + cuota
    );

    if (beatsGratuitos.length > 0) {
      console.log(
        "Beats gratuitos (de acuerdo a la oferta '3x2'): " +
          beatsGratuitos.join(", ")
      );
    }
  }
} else {
  console.log(
    "Lo siento, no tenemos opciones para el género " + preguntaGenero + "."
  );
}
