console.log("Montando la red...")

const gui = {
  bsend : document.getElementById("bsend"),
  numnodos : document.getElementById("numnodos"),
  numnodosvalue : document.getElementById("numnodos_value"),
  netdelay : document.getElementById("netdelay"),
  netdelayvalue : document.getElementById("netdelay_value"),
}

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const imgCloud = document.getElementById('cloud');
const imgFront = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//-- Gestionar el estado el envío
const state = {
  sendingImage: false,
  totalTime: 0,
  totalPackages:0,
  sendingPackage:0,
  netDelay: 1,
  numNodos: 3,
  netDelayDefault: 1,
  loop: null
}

//-- Iniciar el valor del deslizador con el valor de la 
// variable de estado para el delay
gui.netdelayvalue.innerHTML = state.netDelay;
gui.numnodosvalue.innerHTML = state.numNodos;

//-- Cuando está disponible cargo la imagen con la nube para representar el destino
imgCloud.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = imgCloud.width;
  canvas.height = imgCloud.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavía
  ctx.drawImage(imgCloud, 0, 0);

}

//-- función de callback para el envío de la imagen
gui.bsend.onclick = () => {
  sendImage()
}

//-- función de callback para actualizar los valores del 
// deslizador y la variable de estado para el numero de nodos
gui.numnodos.oninput = () => {
  gui.numnodosvalue.innerHTML = gui.numnodos.value;
  state.numNodos = gui.numnodos.value;
}


//-- función de callback para actualizar los valores del 
// deslizador y la variable de estado para el delay
gui.netdelay.oninput = () => {
  gui.netdelayvalue.innerHTML = gui.netdelay.value;
  state.netDelay = gui.netdelay.value;
}

//-- simulación del envío de la imagen
//-- la he planteado como que cada línea horizontal de la imagen
//-- es un paquete de datos, que sufrirá el retardo correspondiente.
//-- https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
const sendImage = () => {
  console.log("Comienzo a enviar...");

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = imgCloud.width;
  canvas.height = imgCloud.height;  

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavía
  ctx.drawImage(imgCloud, 0, 0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  state.totalPackages = canvas.height;
  state.sendingImage = true;

  state.loop = setInterval(() => {
    state.totalTime++;
    state.sendingPackage++;

    //-- dimensiones del rectángulo
    const sx = 0;
    const sy = state.sendingPackage - 1;
    const sw = canvas.width;
    const sh = 1;

    //-- Obtener los datos de color de la sección del rectángulo
    imgData = ctx.getImageData(sx, sy, sw, sh);
    const data = imgData.data;

    //-- Cambiar el color de la sección a rojo
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255;   // canal rojo
      data[i+1] = 0;   // canal verde
      data[i+2] = 0;   // canal azul
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, sx, sy);

    // Paramos el loop si hemos terminado de enviar
    if (state.sendingPackage == state.totalPackages) {
      ctx.drawImage(imgFront, 0, 0); 
      console.log("Envio terminado...");
      state.sendingImage = false;             
      clearInterval(state.loop);
    }

    console.log("Enviando...");
  }, state.netDelay * state.numNodos)
}


console.log("Red preparada...");