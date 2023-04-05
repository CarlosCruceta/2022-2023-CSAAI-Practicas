
const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset"),
    digitos : document.getElementsByClassName("digito"),
    num1: document.getElementById("num1"),
    num2: document.getElementById("num2"),
    num3: document.getElementById("num3"),
    num4: document.getElementById("num4"),
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
let fin = false;

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
    if (fin == false){
        crono.start();
    }

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
        gui.num1.innerHTML = '*';
        gui.num2.innerHTML = '*';
        gui.num3.innerHTML = '*';
        gui.num4.innerHTML = '*';
        gui.num1.style.color = "red";
        gui.num2.style.color = "red";
        gui.num3.style.color = "red";
        gui.num4.style.color = "red";
        gui.display.style.color = "red";
        check1 = false;
        check2 = false;
        check3 = false;
        check4 = false;
        fin = false;
        estado = ESTADO.INIT;
    }


    if (estado == ESTADO.INIT) {

    
        if ((ev.target.value == clave_secreta[0])&(check1 == false)) {
            gui.num1.innerHTML = ev.target.value;
            gui.num1.style.color = "green"; 
            check1 = true;
            estado = ESTADO.DIG1

        } else if ((ev.target.value == clave_secreta[1])&(check2 == false)) {
            gui.num2.innerHTML = ev.target.value;
            gui.num2.style.color = "green"; 
            check2 = true;
            estado = ESTADO.DIG1 

        } else if ((ev.target.value == clave_secreta[2])&(check3 == false)) {
            gui.num3.innerHTML = ev.target.value;
            gui.num3.style.color = "green"; 
            check3 = true;
            estado = ESTADO.DIG1

        } else if ((ev.target.value == clave_secreta[3])&(check4 == false)) {
            gui.num4.innerHTML = ev.target.value;
            gui.num4.style.color = "green";
            check4 = true;
            estado = ESTADO.DIG1

        } else {
            crono.tic();
        }
            
    } else if (estado == ESTADO.DIG1) {
           
        if ((ev.target.value == clave_secreta[0])&(check1 == false)) {
            gui.num1.innerHTML = ev.target.value;
            gui.num1.style.color = "green"; 
            check1 = true;
            estado = ESTADO.DIG2

        } else if ((ev.target.value == clave_secreta[1])&(check2 == false)) {
            gui.num2.innerHTML = ev.target.value;
            gui.num2.style.color = "green"; 
            check2 = true;
            estado = ESTADO.DIG2 

        } else if ((ev.target.value == clave_secreta[2])&(check3 == false)) {
            gui.num3.innerHTML = ev.target.value;
            gui.num3.style.color = "green";
            check3 = true;
            estado = ESTADO.DIG2

        } else if ((ev.target.value == clave_secreta[3])&(check4 == false)) {
            gui.num4.innerHTML = ev.target.value;
            gui.num4.style.color = "green";
            check4 = true;
            estado = ESTADO.DIG2

        } else {
            crono.tic();
        }
    
    } else if (estado == ESTADO.DIG2) {
        if ((ev.target.value == clave_secreta[0])&(check1 == false)) {
            gui.num1.innerHTML = ev.target.value;
            gui.num1.style.color = "green"; 
            check1 = true;
            estado = ESTADO.DIG3

        } else if ((ev.target.value == clave_secreta[1])&(check2 == false)) {
            gui.num2.innerHTML = ev.target.value;
            gui.num2.style.color = "green"; 
            check2 = true;
            estado = ESTADO.DIG3 

        } else if ((ev.target.value == clave_secreta[2])&(check3 == false)) {
            gui.num3.innerHTML = ev.target.value;
            gui.num3.style.color = "green";
            check3 = true;
            estado = ESTADO.DIG3

        } else if ((ev.target.value == clave_secreta[3])&(check4 == false)) {
            gui.num4.innerHTML = ev.target.value;
            gui.num4.style.color = "green";
            
            check4 = true;
            estado = ESTADO.DIG3

        } else {
            crono.tic();
        }

    } else if (estado == ESTADO.DIG3) {
           
        if ((ev.target.value == clave_secreta[0])&(check1 == false)) {
            gui.num1.innerHTML = ev.target.value;
            gui.num1.style.color = "green"; 
            check1 = true;
            crono.stop();
            fin = true;
            gui.display.style.color = "green";

        } else if ((ev.target.value == clave_secreta[1])&(check2 == false)) {
            gui.num2.innerHTML = ev.target.value;
            gui.num2.style.color = "green"; 
            check2 = true;
            crono.stop();
            fin = true;
            gui.display.style.color = "green";

        } else if ((ev.target.value == clave_secreta[2])&(check3 == false)) {
            gui.num3.innerHTML = ev.target.value;
            gui.num3.style.color = "green";
            check3 = true;
            crono.stop();
            fin = true;
            gui.display.style.color = "green";

        } else if ((ev.target.value == clave_secreta[3])&(check4 == false)) {
            gui.num4.innerHTML = ev.target.value;
            gui.num4.style.color = "green";
            check4 = true;
            crono.stop();
            fin = true;
            gui.display.style.color = "green";

        } else {
            crono.tic();
        }
    }
}

for (let boton of gui.digitos) {

    boton.onclick = digito;
}
