/* ===================
    UI ELEMENTS
=================== */ 
// item inputs
let inputTines = document.getElementById('input-tines');
let inputSueterHombre = document.getElementById('input-sueter-hombre');
let inputSueterMujer = document.getElementById('input-sueter-mujer');

// item stock
let labelStockTines = document.getElementById('stock-tines');
let labelStockSueterHombre = document.getElementById('stock-sueter-hombre');
let labelStockSueterMujer = document.getElementById('stock-sueter-mujer');

// form
let form = document.querySelector('form');
let btnPedir = document.getElementById('btn-pedir');

// modal
let modalTitle = document.getElementById('modal-title');
let modalBody = document.getElementById('modal-body');
let btnConfirmar = document.getElementById('btn-confirmar');

// alerts
let alertSuccess = document.getElementById('alert-success');

const limpiarForm = () => { 
    form["input-nombre"].value = "";
    form["input-correo"].value = "";
    form["input-codigo"].value = "";

    inputTines.value = 0;
    inputSueterHombre.value = 0;
    inputSueterMujer.value = 0;
}


/* ===================
    DATOS
=================== */ 
let numTines = 0, numSueterHombre = 0, numSueterMujer = 0;
let correo = "", nombre = "", codigo = "";

const guardarDatos = () => { 
    numTines = parseInt(inputTines.value);
    numSueterHombre = parseInt(inputSueterHombre.value);
    numSueterMujer = parseInt(inputSueterMujer.value);
    
    correo = form["input-correo"].value;
    nombre = form["input-nombre"].value;
    codigo = form["input-codigo"].value.toLowerCase();
}


/* ===================
    CALCULAR COSTOS
=================== */ 
let subtotal = 0, iva = 16, total = 0, descuento = 0, ivaTotal = 0;
let fechaPedido = new Date();

const porcentajeConDescuento = codigo => { 
    switch (codigo) {
        case "dasher":
            return 0.05;

        case "dancer":
            return 0.10;
        
        case "prancer":
            return 0.15;
        
        case "rudolph":
            return 0.20;
    
        default:
            return 0;
    }
}

const calcSubtotal = () => subtotal = (numTines * 250) + (numSueterHombre * 520) + (numSueterMujer * 450);

const calcDescuento = () => descuento = subtotal * porcentajeConDescuento(codigo);

const calcIvaTotal = () => ivaTotal = (iva/100) * (subtotal - descuento);

const calcTotal = () => total = (subtotal - descuento) + ivaTotal;

const calcularPrecios = () => {
    calcSubtotal();
    calcDescuento();
    calcIvaTotal();
    calcTotal();
}

let stockTines = 200, stockSueterHombre = 50, stockSueterMujer = 150;

const actualizarStock = () => { 
    stockTines -= parseInt(inputTines.value);
    stockSueterHombre -= parseInt(inputSueterHombre.value);
    stockSueterMujer -= parseInt(inputSueterMujer.value);

    console.log(stockTines, stockSueterHombre, stockSueterMujer);

    labelStockTines.innerHTML = `<strong>Disponibilidad:</strong> ${stockTines}`
    labelStockSueterHombre.innerHTML = `<strong>Disponibilidad:</strong> ${stockSueterHombre}`
    labelStockSueterMujer.innerHTML = `<strong>Disponibilidad:</strong> ${stockSueterMujer}`
}


/* ===================
    EDITAR MODAL
=================== */ 
const mostrarPrecios = () => { 
    modalBody.innerHTML += 
    `
    <p><strong>Sub-total:</strong> ${subtotal}</p>
    <p><strong>Descuento:</strong> ${descuento}</p>
    <p><strong>IVA: </strong> ${ivaTotal}</p>
    <p><strong>Total: </strong> ${total}</p>
    <p><strong>Fecha de entrega:</strong> hoy</p>
    `
}

const mostrarNombre = () => modalTitle.innerText += nombre;

const mostrarNombreCliente = nombre => tituloPedido.innerText += nombre;

btnConfirmar.addEventListener('click', () => { 
    actualizarStock();
    limpiarForm();
    alertSuccess.classList.toggle('hidden');
});


/* ===================
    BOTÓN PEDIDO
=================== */ 
btnPedir.addEventListener('click', () => { 
    guardarDatos();
    calcularPrecios();
    mostrarNombre();
    mostrarPrecios();
});
