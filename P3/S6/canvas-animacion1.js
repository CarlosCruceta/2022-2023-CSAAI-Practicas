console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 300;
canvas.height = 100;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Valor del lado del rectángulo
let lr = 20;
//-- Coordenadas del objeto
let x = 0;
let y = 10;

//-- Velocidades del objeto
let velx = 3;
let vely = 1;

//-- Función principal de animacion
function update() 
{
  console.log("test");
  
  //-- Condicion de rebote en extremos horizontales del canvas
  if (x < 0 || x >= (canvas.width - lr) ) { 
    velx = -velx;
  }

  //-- Condición de rebote en extremos verticales del canvas
  if (y <= 0 || y > canvas.height- lr) {
    vely = -vely;
  }
  //-- Algoritmo de animacion:
  //-- 1) Actualizar posicion del  elemento
  //-- (física del movimiento rectilineo uniforme)
  
  x = x + velx;
  y = y + vely;

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
      
  //-- 3) Dibujar los elementos visibles
  ctx.beginPath();
    ctx.rect(x, y, lr, lr);

    //-- Dibujar
    ctx.fillStyle = 'red';

    //-- Rellenar
    ctx.fill();

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();

  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();