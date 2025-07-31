//campo de nombre
const txtName = document.getElementById("Name");
//Campo de número
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

//en L 108 están ya creadas las alertas
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

function validarCantidad() {
    //validar que tenga info
    if (txtNumber.value.length == "") {
        return false;
    }

    //que sea un número
    if(isNaN(txtNumber.value)){
        return false;
    }

    //mayor que 0
    if(Number(txtNumber.value) <= 0){
        return false;
    }

    return true; //si pasa las 3 validaciones regresa true
}

// get precio
function getPrecio(){
    return Math.round(Math.random() * 10000) /100;
}




//Validar la información
btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    //limpiamos las alertas cada que se presiona el botón
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border = "";
    txtNumber.style.border = "";

    //Name 
    // ¿qué validamos en ese campo? 
    //validar que tenga información mínimo 3 letras (ej:.ajo)
    if (txtName.value.length < 3) {
        //borde rojo de error en el campo
        txtName.style.border = "medium red solid";
        //mensaje de error
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto</strong></br>"
        alertValidaciones.style.display = "block"; //va a permitir ver el msj en pantalla
    } //<3

    //Number
    //validar que tenga info 
    if (! validarCantidad()) {
        // ! validCantidad() quiere decir que validarCantidad es falso
        // += es para que ponga la alerta aunque ya haya otra antes
        alertValidacionesTexto.innerHTML += "<strong>La cantidad no es correcta</strong>"
        alertValidaciones.style.display = "block"; //va a permitir ver el msj en pantalla
        //borde rojo
        txtNumber.style.border = "medium red solid";

    }
    //que sea un número
    //mayor que 0 


}); //btnAgregar