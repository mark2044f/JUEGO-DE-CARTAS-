const numeroCartas = 16; // Total de cartas
let cartas = []; // Array para almacenar las cartas
let cartasSeleccionadas = []; // Array para almacenar cartas seleccionadas
let valoresCartas = []; // Array para almacenar valores de las cartas
let movimientos = 0; // Número de cartas seleccionadas
let intentosRealizados = 0; // Número de intentos realizados
let puntosAcumulados = 0; // Número de pares encontrados
let tiempoRestante = 60; // Tiempo restante en segundos
let marcadorAciertos = document.getElementById('puntos'); // Elemento HTML para puntuación
let marcadorDesaciertos = document.getElementById('intentos'); // Elemento HTML para intentos
let temporizadorActivado = false; // Control del temporizador
let tiempoFinalizado = null; // Variable para la función `setInterval` del temporizador
let marcadorTiempo = document.getElementById('tiempo'); // Elemento HTML para tiempo restante

let estructuraCarta = '<div class="carta"><div class="reverso"></div><div class="anverso"></div></div>'; // Estructura HTML de cada carta

if (!temporizadorActivado) {
  iniciarTemporizador();
  temporizadorActivado = true;
}

function activarCarta(evento) {
  if (movimientos < 2) {
    if ((!cartasSeleccionadas[0] || cartasSeleccionadas[0] !== evento.target) && !evento.target.classList.contains('activa')) {
      evento.target.classList.add('activa');
      cartasSeleccionadas.push(evento.target);
      if (++movimientos == 2) {
        if (cartasSeleccionadas[0].querySelectorAll('.anverso')[0].innerHTML === cartasSeleccionadas[1].querySelectorAll('.anverso')[0].innerHTML) {
          cartasSeleccionadas = [];
          movimientos = 0;
          puntosAcumulados++;
          marcadorAciertos.innerHTML = 'Aciertos: ' + puntosAcumulados;
        } else {
          setTimeout(() => {
            cartasSeleccionadas[0].classList.remove('activa');
            cartasSeleccionadas[1].classList.remove('activa');
            cartasSeleccionadas = [];
            movimientos = 0;
          }, 600);
          intentosRealizados++;
            marcadorDesaciertos.innerHTML = 'Intentos: ' + intentosRealizados;
        }
        if (puntosAcumulados === numeroCartas / 2) {
          alert('¡Has ganado!');
          bloquearCartas(); // Bloquea las cartas
          reiniciarJuego();
        }
      }
    }
  }
}


function generarNumeroAleatorio() {
  let numeroAleatorio = Math.floor(Math.random() * numeroCartas * 0.5);
  let valoresExistentes = valoresCartas.filter(valor => valor === numeroAleatorio);
  if (valoresExistentes.length < 2) {
    valoresCartas.push(numeroAleatorio);
  } else {
    generarNumeroAleatorio();
  }
}

// Mostrar cartas
for (let i = 0; i < numeroCartas; i++) {
  let elementoCarta = document.createElement('div');
  elementoCarta.innerHTML = estructuraCarta;
  cartas.push(elementoCarta);
  document.querySelector('#game').appendChild(cartas[i]);
  generarNumeroAleatorio();
  cartas[i].querySelectorAll('.anverso')[0].innerHTML = valoresCartas[i];
  cartas[i].querySelectorAll('.carta')[0].addEventListener('click', activarCarta);
}

function iniciarTemporizador() {
  tiempoFinalizado = setInterval(() => {
    tiempoRestante--;
    marcadorTiempo.innerHTML = 'Tiempo: ' + tiempoRestante;
    if (tiempoRestante === 0) {
      clearInterval(tiempoFinalizado);
      alert('¡Has perdido! Se acabó el tiempo.');
      bloquearCartas();
      reiniciarJuego();
    }
  }, 1000);
}
function bloquearCartas() {
  // Deshabilitar el clic en todas las cartas
  for (let i = 0; i < cartas.length; i++) {
    cartas[i].querySelectorAll('.carta')[0].removeEventListener('click', activarCarta);
    cartas[i].classList.add('bloqueada');
  }
}
function desbloquearCartas() {
  // Deshabilitar el clic en todas las cartas
  for (let i = 0; i < cartas.length; i++) {
    cartas[i].querySelectorAll('.carta')[0].addEventListener('click', activarCarta);
    cartas[i].classList.add('desbloqueado');
  }
}



// Función para reiniciar el juego
function reiniciarJuego() {
  const Pregunta=prompt('¿Desea seguir Jugando?\n 1. Si\n 2. No')
    if (Pregunta == 1){
      // Reiniciar variables y cartas
      puntosAcumulados = 0;
      intentosRealizados = 0;
      movimientos = 0;
      cartasSeleccionadas = [];
      valoresCartas = [];
      tiempoRestante = 60;
      iniciarTemporizador();
      generarNumeroAleatorio();
      desbloquearCartas();
    }else{
      alert('Gracias por haber jugado');
      bloquearCartas();
    }
}
