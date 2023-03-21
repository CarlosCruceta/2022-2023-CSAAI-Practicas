
//-- Obtener una colección con todos los elementos
//-- de la clase dígito
const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset"),
    digitos : document.getElementsByClassName("digito"),
    numeros : document.getElementsByClassName("num")
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
let check1 = false;
let check2 = false;
let check3 = false;
let check4 = false;

//---- Configurar las funciones de retrollamada

//-- Array que almacena números secretos

//-- Función que genera la clave secreta aleatoria
function key(){
    secretkey = [];
    //-- Generar números aleatorios con un valor máximo
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    //-- Generamos números secretos y los almacenamos en un array
    for (let i = 0; i < 4; i++) {
        let rnum = getRandomInt(9);
        secretkey.push(rnum.toString());
    }
    return secretkey;
}


const ESTADO = {
    INIT: 0,
    DIG1: 1,
    DIG2: 2,
    DIG3: 3,

}


let estado = ESTADO.INIT; 
let clave_secreta = key();
console.log(clave_secreta);

gui.start.onclick = () => {
    crono.start();
}

gui.stop.onclick = () => {
    crono.stop();
}
//-- Función de retrollamada de los digitos
function digito(ev) {

    crono.start();

    gui.start.onclick = () => {
        crono.start();
    }
          
    //-- Detener el cronómetro
    gui.stop.onclick = () => {
        crono.stop();
    }
        
    //-- Reset del cronómetro
    gui.reset.onclick = () => {
        crono.reset();
        clave_secreta = key();
        console.log(clave_secreta);
        gui.numeros[0].innerHTML = '*';
        gui.numeros[1].innerHTML = '*';
        gui.numeros[2].innerHTML = '*';
        gui.numeros[3].innerHTML = '*';
        check1 = false;
        check2 = false;
        check3 = false;
        check4 = false;
        estado = ESTADO.INIT;
    }


    if (estado == ESTADO.INIT) {

        crono.start();

        if ((ev.target.value == clave_secreta[0])&(check1 == false)) {
            gui.numeros[0].innerHTML = ev.target.value;
            check1 = true;
            estado = ESTADO.DIG1

        } else if ((ev.target.value == clave_secreta[1])&(check2 == false)) {
            gui.numeros[1].innerHTML = ev.target.value;
            check2 = true;
            estado = ESTADO.DIG1 

        } else if ((ev.target.value == clave_secreta[2])&(check3 == false)) {
            gui.numeros[2].innerHTML = ev.target.value;
            check3 = true;
            estado = ESTADO.DIG1

        } else if ((ev.target.value == clave_secreta[3])&(check4 == false)) {
            gui.numeros[3].innerHTML = ev.target.value;
            check4 = true;
            estado = ESTADO.DIG1

        } else {
            crono.tic();
        }
            
    } else if (estado == ESTADO.DIG1) {
           
        if ((ev.target.value == clave_secreta[0])&(check1 == false)) {
            gui.numeros[0].innerHTML = ev.target.value;
            check1 = true;
            estado = ESTADO.DIG2

        } else if ((ev.target.value == clave_secreta[1])&(check2 == false)) {
            gui.numeros[1].innerHTML = ev.target.value;
            check2 = true;
            estado = ESTADO.DIG2 

        } else if ((ev.target.value == clave_secreta[2])&(check3 == false)) {
            gui.numeros[2].innerHTML = ev.target.value;
            check3 = true;
            estado = ESTADO.DIG2

        } else if ((ev.target.value == clave_secreta[3])&(check4 == false)) {
            gui.numeros[3].innerHTML = ev.target.value;
            check4 = true;
            estado = ESTADO.DIG2

        } else {
            crono.tic();
        }
    
    } else if (estado == ESTADO.DIG2) {
        if ((ev.target.value == clave_secreta[0])&(check1 == false)) {
            gui.numeros[0].innerHTML = ev.target.value;
            check1 = true;
            estado = ESTADO.DIG3

        } else if ((ev.target.value == clave_secreta[1])&(check2 == false)) {
            gui.numeros[1].innerHTML = ev.target.value;
            check2 = true;
            estado = ESTADO.DIG3 

        } else if ((ev.target.value == clave_secreta[2])&(check3 == false)) {
            gui.numeros[2].innerHTML = ev.target.value;
            check3 = true;
            estado = ESTADO.DIG3

        } else if ((ev.target.value == clave_secreta[3])&(check4 == false)) {
            gui.numeros[3].innerHTML = ev.target.value;
            check4 = true;
            estado = ESTADO.DIG3

        } else {
            crono.tic();
        }

    } else if (estado == ESTADO.DIG3) {
           
        if ((ev.target.value == clave_secreta[0])&(check1 == false)) {
            gui.numeros[0].innerHTML = ev.target.value;
            check1 = true;
            crono.stop();

        } else if ((ev.target.value == clave_secreta[1])&(check2 == false)) {
            gui.numeros[1].innerHTML = ev.target.value;
            check2 = true;
            crono.stop();

        } else if ((ev.target.value == clave_secreta[2])&(check3 == false)) {
            gui.numeros[2].innerHTML = ev.target.value;
            check3 = true;
            crono.stop();

        } else if ((ev.target.value == clave_secreta[3])&(check4 == false)) {
            gui.numeros[3].innerHTML = ev.target.value;
            check4 = true;
            crono.stop();

        } else {
            crono.tic();
        }
    }
}

for (let boton of gui.digitos) {

    boton.onclick = digito;
}