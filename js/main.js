const txtName =document.getElementById("Name");
// recibe nombre del producto
const txtNumber =document.getElementById("Number");
// recibe cantidad
const btnAgregar =document.getElementById("btnAgregar");
// boton para agregar productos a la tabla
const btnClear =document.getElementById("btnClear");
//  boton para limpiar todo

// guarda elementos del formulario en variables


const alertValidaciones =document.getElementById("alertValidaciones");
// para mostrar/ocultar/ aplicar estilos al div
const alertValidacionesTexto =document.getElementById("alertValidacionesTexto");
// para el contenido del mensaje
const tablaListaCompras =document.getElementById("tablaListaCompras");
// accede a la tabla principal donde se agregara la lista de compras
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
// accede al cuerpo de la tabla donde iran los productos

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
// actualiza valores (productos, unidades, total)

let cont = 0;
// contador (productos distintos agregados)
let totalEnProductos = 0;
// suma cantidad de productos
let costoTotal = 0;
// suma el costo total

let datos = new Array();
// datos en memoria, array con todos los productos (nombre, cantidad, precio).

function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    }
// valida que no este vacia

if(isNaN(txtNumber.value)){
    return false;
}
// valida que sea un número

if (Number(txtNumber.value)<=0){
    return false;
}
// valida que sea mayor a 0

return true;
}


function getPrecio(){
    return ( Math.round(Math.random() * 50000) /100) + 50;
    // math.random da numeros entre 0 al 1, se multiplica por 50,000, math round redondea la numero mas cercano, /100 para mover dos decimales y simular centavos, anexamos +50 para evitar valores menores a 50.
}
// función para generar precio aleatorio


btnAgregar.addEventListener("click", function (event){
    event.preventDefault();
    // previene que el boton recargue la pagina
    let isValid = true;
    // validacion de que cumple
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";
    // esto limpia las alertas
    
// función principal para agregar productos


if(txtName.value.length<3){
    txtName.style.border = "thin red solid";
    // borde rojo
    alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto</strong>";
    // mensaje de error
    alertValidaciones.style.display="block";
    // estilo de bloque para tarjeta de error
    isValid =false;
}
// validacion Name mayor de tres letras


if (! validarCantidad()){
    txtNumber.style.border="thin red solid"
    alertValidacionesTexto.innerHTML += "<strong>La cantidad no es correcta</strong></br>";
    alertValidaciones.style.display = "block";
    isValid =false;
}
// validacion Number que tenga info numeral mayor a 0

if (isValid){
    cont++;
    // aumenta el contador
    let precio = getPrecio();
    // genera precio aleatorio
    let row = `<tr>
        <td>${cont}</td>
        <td>${txtName.value}</td>
        <td>${txtNumber.value}</td>
        <td>${precio}</td>
    </tr>
    `;
    // uso de .value en inputs, cont y precio son constantes
    // crea fila HTML con el producto

    let elemento = {
        "cont" : cont,
        "nombre" : txtName.value, 
        "cantidad" : txtNumber.value,
        "precio" : precio
    };
    // objeto para agregar informacion al array
    datos.push(elemento);
    // push lo agrega al array
    localStorage.setItem("datos", JSON.stringify(datos));
    // lo agrega a local storage para no perder datos


    cuerpoTabla.insertAdjacentHTML ("beforeend", row);
    // inserta la fila en la tabla
    contadorProductos.innerText=cont;
    // contador productos con innertext le da la informacion a contador
    totalEnProductos += Number(txtNumber.value);
    // total productos se suma con number que es lo que el usuario ingreso
    productosTotal.innerText = totalEnProductos;
    // muestra productos totales
    costoTotal += precio * Number(txtNumber.value);
    // precioTotal.innerText = "$" + costoTotal.toFixed(2); to fixed forzaria 2 decimales
    // suma el total acumulado del calculo precio x cantidad
    precioTotal.innerText =new Intl.NumberFormat("es-MX", 
        {style: "currency", currency: "MXM"}).format(costoTotal);
        // actualiza datos en pantalla

        let resumen = {
            "cont" : cont,
            "totalEnProductos" : totalEnProductos,
            "costoTotal" : costoTotal
        };
        // creacion de objeto
        localStorage.setItem("resumen", JSON.stringify(resumen));
        // localstorage solo guarda string o sea cadenas de texto

    txtName.value ="";
    txtNumber.value = "";
    txtName.focus();
    // limpia inputs
}
});

window.addEventListener("load", function(event){
    // carga datos cuando abre la pagina
    event.preventDefault();

   if (this.localStorage.getItem("datos")!=null){
    // busca datos guardados en local storage
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((dato)=>{
    // si hay datos recorre forEach
                let row = `<tr>
                    <td>${dato.cont}</td>
                    <td>${dato.nombre}</td>
                    <td>${dato.cantidad}</td>
                    <td>${dato.precio}</td>
                </tr>
                `;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        // inserta cada producto en la tabla
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
        // intl.numberformat, formatea numero a moneda
        // intl - Internationalization, NumberFormat - constructor que crea un objeto con reglas para mostrar números (moneda, porcentaje, etc).
        // es-MX idioma y región
        // .format aplica el formato al elemento

        // let formateador = new Intl.NumberFormat("es-MX", {
        //     style: "currency",
        //     currency: "MXN"
        //   });
        //   precioTotal.innerText = formateador.format(costoTotal);
});
// window load

btnClear.addEventListener("click", function(event){
    event.preventDefault();

    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");
    // borra datos de local storage
    cuerpoTabla.innerHTML="";
    // limpia tabla innerHTML
    txtName.value ="";
    txtNumber.value = "";
    txtName.focus();
    // vacía inputs
    txtName.style.border="";
    txtNumber.style.border="";
    // limpia bordes
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display="none";
    // limpia alertas
    cont = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    // Reinicia valores contadores en memoria (variables globales)

    contadorProductos.innerText=cont;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText =new Intl.NumberFormat ("es-MX",
        {style: "currency", currency: "MXN"}).format(costoTotal);
    datos = new Array();
    // reinicia el amacenamiento
    // limpia resumen (valores reseteados)
});