const txtName =document.getElementById("Name");
const txtNumber =document.getElementById("Number");
const btnAgregar =document.getElementById("btnAgregar");
const btnClear =document.getElementById("btnClear");

const alertValidaciones =document.getElementById("alertValidaciones");
const alertValidacionesTexto =document.getElementById("alertValidacionesTexto");
const tablaListaCompras =document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

let cont = 0;
let totalEnProductos = 0;
let costoTotal = 0;

let datos = new Array();

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
    txtName.style.border = "thin red solid";
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

    // esto es un objeto para agregarlo al array
    let elemento = {
        "cont" : cont,
        "nombre" : txtName.value, 
        "cantidad" : txtNumber.value,
        "precio" : precio
    };
    // lo agrega al array
    datos.push(elemento);
    // lo agrega a local storage
    localStorage.setItem("datos", JSON.stringify(datos));

    cuerpoTabla.insertAdjacentHTML ("beforeend", row);
    contadorProductos.innerText=cont;
    totalEnProductos += Number(txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    costoTotal += precio * Number(txtNumber.value);
    // precioTotal.innerText = "$" + costoTotal.toFixed(2);
    precioTotal.innerText =new Intl.NumberFormat("es-MX", 
        {style: "currency", currency: "MXM"}).format(costoTotal);

        // creacion de objeto
        let resumen = {
            "cont" : cont,
            "totalEnProductos" : totalEnProductos,
            "costoTotal" : costoTotal
        };
        // localstorage solo guarda string o sea cadenas de texto
        localStorage.setItem("resumen", JSON.stringify(resumen));


    txtName.value ="";
    txtNumber.value = "";
    txtName.focus();
}
});