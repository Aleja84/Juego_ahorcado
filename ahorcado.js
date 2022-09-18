let palabrita;
let cant_errores = 0;
let cant_aciertos = 0;

const palabras = ["Vacaciones", "computadora", "Cuaderno", "celular"];
const btn = document.getElementById("jugar");
const imagen = document.getElementById("imagen");
const btn_letras = document.querySelectorAll("#letras button");

/* click para iniciar juego */
btn.addEventListener("click", iniciar);

function obtener_random(num_min, num_max) {
  const amplitud_valores = num_max - num_min;
  const valor_al_azar = Math.floor(Math.random() * amplitud_valores) + num_min;
  return valor_al_azar;
}

function iniciar(event) {
  imagen.src = "img/img0.png";
  btn.disabled = true;
  cant_errores = 0;
  cant_aciertos = 0;

  const parrafo = document.getElementById("palabra_a_adivinar");
  parrafo.innerHTML = "";

  document.getElementById("resultado").innerHTML = " ";

  const cant_palabras = palabras.length;
  const valor_al_azar = obtener_random(0, cant_palabras);

  palabrita = palabras[valor_al_azar];
  console.log(palabrita);
  const cant_letras = palabrita.length;

  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = false;
  }

  for (let i = 0; i < cant_letras; i++) {
    const span = document.createElement("span");
    parrafo.appendChild(span);
  }
}

/* adivinar letra */
for (let i = 0; i < btn_letras.length; i++) {
  btn_letras[i].addEventListener("click", click_letras);
}

function click_letras(event) {
  const spans = document.querySelectorAll("#palabra_a_adivinar span");
  const button = event.target;
  button.disabled = true;

  const letra = button.innerHTML.toLowerCase();
  const palabra = palabrita.toLowerCase();

  let acerto = false;
  for (let i = 0; i < palabra.length; i++) {
    if (letra == palabra[i]) {
      spans[i].innerHTML = letra;
      cant_aciertos++;
      acerto = true;
    }
  }

  if (acerto == false) {
    cant_errores++;
    const source = `img/img${cant_errores}.png`;
    imagen.src = source;
  }

  if (cant_errores == 7) {
    document.getElementById("resultado").innerHTML =
      "Perdiste, la palabra era " + palabrita;
    game_over();
  } else if (cant_aciertos == palabrita.length) {
    document.getElementById("resultado").innerHTML = "GANASTE!! FELICIDADES";
    game_over();
  }
  console.log(
    "la letra " + letra + " en la palabra " + palabra + " ¿existe?: " + acerto
  );
}

/* fin del juego */
function game_over() {
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = true;
  }

  btn.disabled = false;
}

game_over();
