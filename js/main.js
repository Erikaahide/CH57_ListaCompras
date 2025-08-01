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
    txtNumber.style.border="thin red solid"
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

window.addEventListener("load", function(event){
    event.preventDefault();

   if (this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((dato)=>{
                let row = `<tr>
                    <td>${dato.cont}</td>
                    <td>${dato.nombre}</td>
                    <td>${dato.cantidad}</td>
                    <td>${dato.precio}</td>
                </tr>
                `;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });
    }

    if (this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse (this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
    }

    contadorProductos.innerText=cont;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText =new Intl.NumberFormat ("es-MX",
        {style: "currency", currency: "MXN"}).format(costoTotal);
});
// window load

// limpiar todo
//** 1 eliminar local storage
// 2 limpiar tabla
// 3 limpiar campos
// 4 limpiar bordes
// 5 limpiar alerts
// 6 limpiar resumen */

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    // 1
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");
    // 2
    cuerpoTabla.innerHTML="";
    // 3
    txtName.value ="";
    txtNumber.value = "";
    txtName.focus();
    // 4
    txtName.style.border="";
    txtNumber.style.border="";
    // 5
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display="none";
    // 6
    cont = 0;
    totalEnProductos = 0;
    costoTotal = 0;

    contadorProductos.innerText=cont;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText =new Intl.NumberFormat ("es-MX",
        {style: "currency", currency: "MXN"}).format(costoTotal);
    datos = new Array();
});