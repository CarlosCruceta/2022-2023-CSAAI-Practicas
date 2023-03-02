console.log("Ejecutando JS...");

display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

//-- Obtener una colección con todos los elementos
//-- de la clase dígito
digitos = document.getElementsByClassName("digito")
operaciones = document.getElementsByClassName("operacion")

//-- Establecer la misma función de retrollamada
//-- para todos los botones de tipo dígito
for (let boton of digitos) {

    //-- Se ejecuta cuando se pulsa un boton
    //-- que es un dígito
    boton.onclick = (ev) => {
        display.innerHTML += ev.target.value;
        console.log("DIGITO!!!");
    }
}

//-------- Resto de funciones de retrollamada


for (let boton of operaciones) {

    //-- Se ejecuta cuando se pulsa un boton
    //-- que es una operación
    boton.onclick = (ev) => {
        display.innerHTML += ev.target.value;
        console.log("OPERACION!!!");
    }
}

//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
}