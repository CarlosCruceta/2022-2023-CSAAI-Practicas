console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 200;
canvas.height = 100;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");


ctx.beginPath();
    //-- Línea horizontal
    // Punto inicial
    ctx.moveTo(10, 20);
    // Hasta dónde pintar
    ctx.lineTo(100, 20);

    //-- Línea horizontal y vertical, unidas
    ctx.moveTo(10, 80);
    ctx.lineTo(150,80);
    ctx.lineTo(150,20);

    ctx.strokeStyle = 'blue';
    //-- Cambiar el tamaño de la linea del trazo
    ctx.lineWidth = 4;

    //-- Dibujar el trazo
    ctx.stroke()
    
ctx.closePath()

ctx.beginPath();

//-- Dibujar un circulo: coordenadas x,y del centro
    //-- Radio, Angulo inicial y angulo final
    ctx.arc(100, 50, 20, 0, 2 * Math.PI);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'yellow';

    //-- Dibujar el trazo
    ctx.stroke()

    //-- Dibujar el relleno
    ctx.fill()
    
ctx.closePath()