//campo de nombre
const txtName = document.getElementById("Name");
//Campo de número
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

//en L 108 están ya creadas las alertas
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
//tabla
const tablaListaCompras = document.getElementById("tablaListaCompras");
//me trae el tbody de la tabla específica que le indico (tablaListaCompras)
//si lo hacemos con document y alguien agrega otra tabla va a haber 2 tbody de las 2tablas, es mejor especificarlo
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0); //item(0) es para que me traiga el primero que encuentre xq GetEle..Tag me da un html collection, aunque solo tenga 1 hay que especificarlo

//contadores de productos
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

//contador
let cont = 0;
let totalEnProductos = 0;
let costoTotal = 0;

//definir el arreglo para guardar info tabla
let datos = new Array(); //también se puede así: let datos = [];



function validarCantidad() {
    //validar que tenga info
    if (txtNumber.value.length == "") {
        return false;
    }

    //que sea un número
    if (isNaN(txtNumber.value)) {
        return false;
    }

    //mayor que 0
    if (Number(txtNumber.value) <= 0) {
        return false;
    }

    return true; //si pasa las 3 validaciones regresa true
}

// get precio
function getPrecio() {
    return Math.round(Math.random() * 10000) / 100;
}




//Validar la información
btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    // 1ra
    let isValid = true;

    //limpiamos las alertas cada que se presiona el botón
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
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
        //2da
        isValid = false;
    } //<3


    //Number
    //validar que tenga info 
    if (!validarCantidad()) {
        // ! validCantidad() quiere decir que validarCantidad es falso
        // += es para que ponga la alerta aunque ya haya otra antes
        alertValidacionesTexto.innerHTML += "<strong>La cantidad no es correcta</strong>"
        alertValidaciones.style.display = "block"; //va a permitir ver el msj en pantalla
        //borde rojo
        txtNumber.style.border = "medium red solid";
        //3ra
        isValid = false;
    }
    //que sea un número
    //mayor que 0 

    //Para hacer la tabla:
    if (isValid) {
        cont++;
        let precio = getPrecio();
        let row = `<tr>
                        <td>${cont}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>
                    `; //con `` mejor forma de crear un renglon

        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        //parte del resumen 
        contadorProductos.innerText = cont;
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;
        costoTotal += precio * Number(txtNumber.value);

        //costoTotal.toFixed(2) //forma fácil
        precioTotal.innerText = new Intl.NumberFormat("es-MX",
            { style: "currency", currency: "MXN" }).format(costoTotal); //esta es la forma complicada pero mejor (aparece , de miles)
        

        //creamos objeto de resumen para luego hacerlo string
        let resumen = {
                "cont" : cont,
                "totalEnProductos" : totalEnProductos,
                "costoTotal" : costoTotal
        };
        //guardar el objeto en el localstorage (solo guarda strings)
        localStorage.setItem("resumen", JSON.stringify(resumen));

        //Para guardar los datos de la tabla lo hacemos en un array
        let elemento = {
            "cont" : cont,
            "nombre" : txtName.value,
            "cantidad" : txtNumber.value,
            "precio" : precio
        };
        //agregamos el objeto al array
        datos.push(elemento); //add elementos al final
        //ahora si lo guardamos en el localStorage
        localStorage.setItem("datos",JSON.stringify(datos));


        //limpiar los campos
        txtName.value = "";
        txtNumber.value = "";

        txtName.focus(); //manda el foco al campo de nombre cuando ya se limpiaron los campos
    }


}); //btnAgregar