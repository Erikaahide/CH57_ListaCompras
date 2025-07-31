const txtName =document.getElementById("Name");
const txtNumber =document.getElementById("Number");
const btnAgregar =document.getElementById("btnAgregar");
const btnClear =document.getElementById("btnClear");

const alertValidaciones =document.getElementById("alertValidaciones");
const alertValidacionesTexto =document.getElementById("alertValidacionesTexto");
const tablaListaCompras =document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let cont = 0;

function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    }

// valida que tenga informacion 

if(isNaN(txtNumber.value)){
    return false;
}
// valida cantidad

if (Number(txtNumber.value)<=0){
    return false;
}
// mayor a 0
return true;
}

function getPrecio(){
    return ( Math.round(Math.random() * 50000) /100) + 50;
}
// getPrecio


btnAgregar.addEventListener("click", function (event){
    event.preventDefault();
    let isValid = true;
    // esto es para limpiar las alertas
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";


// validacion Name mayor de tres letras
if(txtName.value.length<3){
    // borde rojo
    txtNumber.style.border="thin red solid"
    // mensaje de error
    alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto</strong>";
    alertValidaciones.style.display="block";
    isValid =false;
}

// validacion Number que tenga info numeral mayor a 0

if (! validarCantidad()){
    txtName.style.border="thin red solid"
    alertValidacionesTexto.innerHTML += "<strong>La cantidad no es correcta</strong></br>";
    alertValidaciones.style.display = "block";
    isValid =false;
}
if (isValid){
    cont++;
    let precio = getPrecio();
    let row = `<tr>
        <td>${cont}</td>
        <td>${txtName.value}</td>
        <td>${txtNumber.value}</td>
        <td>${precio}</td>
    </tr>
    `;

    cuerpoTabla.insertAdjacentHTML ("beforeend", row);
    txtName.value ="";
    txtNumber ="";
    txtName.focus();
}
});