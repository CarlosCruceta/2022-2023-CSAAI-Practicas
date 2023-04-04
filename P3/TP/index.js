const gui = {
    display : document.getElementById("display"),
    display2: document.getElementById("display2"),
    reset : document.getElementById("reset"),
  
}
class Crono {

    //-- Constructor. Hay que indicar el 
    //-- display donde mostrar el cronómetro
    constructor(display) {
        this.display = display;

        //-- Tiempo
        this.cent = 0, //-- Centésimas
        this.seg = 0,  //-- Segundos
        this.min = 0,  //-- Minutos
        this.timer = 0;  //-- Temporizador asociado
    }

    //-- Método que se ejecuta cada centésima
    tic() {
        //-- Incrementar en una centesima
        this.cent += 1;

        //-- 100 centésimas hacen 1 segundo
        if (this.cent == 100) {
        this.seg += 1;
        this.cent = 0;
        }

        //-- 60 segundos hacen un minuto
        if (this.seg == 60) {
        this.min = 1;
        this.seg = 0;
        }

        //-- Mostrar el valor actual
        this.display.innerHTML = this.min + ":" + this.seg + ":" + this.cent
    }

    //-- Arrancar el cronómetro
    start() {
       if (!this.timer) {
          //-- Lanzar el temporizador para que llame 
          //-- al método tic cada 10ms (una centésima)
          this.timer = setInterval( () => {
              this.tic();
          }, 10);
        }
    }

    //-- Parar el cronómetro
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    //-- Reset del cronómetro
    reset() {
        this.cent = 0;
        this.seg = 0;
        this.min = 0;

        this.display.innerHTML = "0:0:0";
    }
}

const crono = new Crono(gui.display);

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 1000;
canvas.height = 600;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

var doby = new Image();
doby.src = "doby_90.png";

var voldemort = new Image();
voldemort.src = "voldemort_90.png";


var hechizo = new Image();
hechizo.src = "hechizo_50.png";

var fondo = new Image();
fondo.src = "fondo.jpg";

let r = 10;
let w = 70;
let h = 108;
let pcolor = "transparent";


//-- Acceder al botón de disparo
const btnLanzar = document.getElementById("btnLanzar");
//-- Acceder al botón de inicio
const btnIniciar = document.getElementById("btnIniciar");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function dibujar_doby(x,y) {
  doby.onload = function(){
    ctx.drawImage(doby, x, y);
  }
}

function dibujar_voldemort(x,y) {
  voldemort.onload = function(){
    ctx.drawImage(voldemort, x, y);
  }
}


function dibujarO(x,y) {

  //-- Pintando el objetivo
  ctx.beginPath();

  //-- Dibujar un circulo: coordenadas x,y del centro
  //-- Radio, Angulo inicial y angulo final
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'red';

  //-- Dibujar el relleno
  ctx.fill()    

  //-- Dibujar el trazo
  ctx.stroke();

  ctx.closePath();
}

function dibujarP(x,y,lx,ly,color) {

  //-- Pintando el proyectil
  ctx.beginPath();

  //-- Definir un rectángulo de dimensiones lx x ly,
  ctx.rect(x, y, lx, ly);

  //-- Color de relleno del rectángulo
  ctx.fillStyle = color;

  ctx.strokeStyle = color;

  //-- Mostrar el relleno
  ctx.fill();

  //-- Mostrar el trazo del rectángulo
  ctx.stroke();

  ctx.closePath();
}

//-- Coordenadas iniciales del proyectil
let xop = 5;
let yop = 500;
let xp = xop;
let yp = yop;
let x_h = xop +80;
let y_h = yop +20;

let t = 0; //Se inicia el tiempo a t = 0

let g = 9.8; //Aceleración de gravedad
//--Generamos un número aleatorio


//-- Coordenadas iniciales del objetivo
let xomin = 300;
let xomax = canvas.width- 90;
let yomax = canvas.height-117;
let xo = getRandomInt(xomin,xomax); 
let yo = getRandomInt(1,yomax);


//-- función para pintar el proyectil
dibujar_doby(xop,yop);
dibujar_voldemort(xo,yo);
dibujarP(xo+10, yo+5, w, h, pcolor); // Pintar rect de colision
dibujarO(x_h,y_h);


// Circle-Rectangle Collision Detection
function circleRectCollision(cx,cy,r,x,y,w,h) {
  // Calculate the distance between the center of the circle and the closest point on the rectangle
  let closestX = clamp(cx, x, x + w);
  let closestY = clamp(cy, y, y + h);
  let distanceX = cx - closestX;
  let distanceY = cy - closestY;
  let distanceSquared = distanceX * distanceX + distanceY * distanceY;
  
  // If the distance is less than or equal to the radius of the circle, then there is a collision
  return distanceSquared <= r * r;
}

// Helper function to clamp a value between a minimum and maximum value
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function colision_limites(x,y,r){
  if (x - r < 0 || x + r > canvas.width) {
    return true;

  }else if (y - r < 0 || y + r > canvas.height) {
    return true;
  }else{
    return false;
  }
  
}

function lanzar() 
{
  //-- Implementación del algoritmo de animación:

  //-- 1) Actualizar posición de los elementos
  let v0 = document.getElementById("vel").value;
  let angulo0 = document.getElementById("angulo").value;
  xp = x_h +  v0*Math.cos(angulo0*Math.PI/180)*t; 
	yp = y_h  - (v0*Math.sin(angulo0*Math.PI/180) - g*t/2)*t;

  t += 0.2;
  
  
    // Detectamos si hay colisión (aquí o después de pintar los elementos )
  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
 
  //-- 3) Pintar los elementos en el canvas

    //-- Dibujar
    
  ctx.drawImage(doby, xop, yop);
  dibujarP(xo+10, yo+5, w, h, pcolor);
  ctx.drawImage(voldemort, xo, yo);
  dibujarO(xp,yp);

    //-- 4) Repetir
  col_obj = circleRectCollision(xp,yp,r,xo+10,yo+5,w,h);
  col_limit = colision_limites(xp,yp,r)


  if (col_obj == true) {
    crono.stop(); 
    gui.display2.innerHTML = "EXITO";
    gui.display2.style.color = "green";
  
  } else if (col_limit == true) {
    crono.stop(); 
  
  }else{
    requestAnimationFrame(lanzar);
  }

}


//-- Función de retrollamada del botón de disparo
btnLanzar.onclick = () => {
  lanzar();
  crono.start();
}

//-- Función de retrollamada del botón iniciar
btnIniciar.onclick = () => {
  location.reload();
  crono.reset();
}