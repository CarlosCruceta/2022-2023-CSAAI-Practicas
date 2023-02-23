
//-- Tenemos acceso al documento html mediante  
//-- el objeto document

//-- Leer el párrafo identificado como test
const bt1 = document.getElementById('bt1');
const bt2 = document.getElementById('bt2');
const pbt1 = document.getElementById('pbt1');
const pbt2 = document.getElementById('pbt2');

//-- Funcion de retrollamada de la pulsación del párrafo
bt1.onclick = () => {
    pbt1.innerHTML += "1"

    //-- Cambiar el color del fondo...
    //-- Si no tenía color asignado ponemos amarillo
    if (pbt1.style.backgroundColor == "") {
        pbt1.style.backgroundColor = "yellow";
    }
    //-- Si ya tiene color se lo quitamos
    else {
        pbt1.style.backgroundColor = "";
    }

}

bt2.onclick = () => {
    pbt2.innerHTML += "2"

    //-- Cambiar el color del fondo...
    //-- Si no tenía color asignado ponemos amarillo
    if (pbt2.style.backgroundColor == "") {
        pbt2.style.backgroundColor = "yellow";
    }
    //-- Si ya tiene color se lo quitamos
    else {
        pbt2.style.backgroundColor = "";
    }

}