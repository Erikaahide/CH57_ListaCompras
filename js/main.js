const txtName =document.getElementById("Name");
const txtNumber =document.getElementById("Number");
const btnAgregar =document.getElementById("btnAgregar");
const btnClear =document.getElementById("btnClear");

const alertValidaciones =document.getElementById("alertValidaciones");
const alertValidacionesTexto =document.getElementById("alertValidacionesTexto");

function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    }

// valida que tenga informacion 

if(isNaN(txtNumber.value)){
    return false;
}
// valida cantidad

if (number(txtNumber.value)<=0){
    return false;
}
// mayor a 0
return true;
}

function getPrecio(){
    return Math.round(Math.random() * 10000) /100;
}
// getPrecio


btnAgregar.addEventListener("click", function (event){
    event.preventDefault();
    // esto es para limpiar las alertas
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display="none";
    txtName.style.border=""
    txtNumber.style.border=""


// validacion Name mayor de tres letras
if(txtName.value.length<3){
    // borde rojo
    txtNumber.style.border="thin red solid"
    // mensaje de error
    alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto</strong>";
    alertValidaciones.style.display="block";
}

// validacion Number que tenga info numeral mayor a 0

if(! validarCantidad()){
    txtName.style.border="thin red solid"
    alertValidacionesTexto.innerHTML += "<strong>La cantidad no es correcta</strong></br>";
    alertValidaciones.style.display="block";
}
})