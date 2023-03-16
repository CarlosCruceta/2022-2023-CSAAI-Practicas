
//-- Obtener una colección con todos los elementos
//-- de la clase dígito
const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset"),
    digitos : document.getElementsByClassName("digito"),
    clave: document.getElementById("clave"),
    secretkey: document.getElementById("secret_key")
}
//-- Clase cronómetro
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

//---- Configurar las funciones de retrollamada

//-- Array que almacena números secretos
const secretkey = [];

//-- Función que genera la clave secreta aleatoria
function key(){
    //-- Generar números aleatorios con un valor máximo
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    //-- Generamos números secretos y los almacenamos en un array
    for (let i = 0; i < 4; i++) {
        let rnum = getRandomInt(9);
        secretkey.push(rnum.toString());
    }
    return secretkey.join("-");
}
//-- Arranque del cronometro
gui.start.onclick = () => {
    crono.start();
    gui.secretkey.innerHTML = key();
    }
      
    //-- Detener el cronómetro
    gui.stop.onclick = () => {
    crono.stop();
    }
    
    //-- Reset del cronómetro
    gui.reset.onclick = () => {
    crono.reset();
    gui.secretkey.innerHTML = "****";
    }