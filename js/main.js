// creo una clase para definir la estructura de los tipos de trabajos que ofrecemos en Developerlandia. Programacion defensiva
class TrabajosDisponibles {
    constructor (nombre = "", precioHora = 0) {
        this.nombre = nombre;
        this.precioHora = precioHora;
    }
}


//creo un array vacio, defino los diferentes trabajos y despues hago push para sumarlos a la lista
const trabajosDisponibles = []

const desarrolloFront = new TrabajosDisponibles ("Desarrollo front-end", 250);
const desarrolloBack = new TrabajosDisponibles ("Desarrollo back-end", 350);
const desarrolloApps = new TrabajosDisponibles ("Desarrollo aplicaciones moviles", 300);

trabajosDisponibles.push (desarrolloFront);
trabajosDisponibles.push (desarrolloBack);
trabajosDisponibles.push (desarrolloApps);


//creo la funcion
function calcularPresupuesto (e) {

    e.preventDefault ();

    let trabajoSeleccionado = document.getElementById("tipoTrabajo").value.trim();
    let cantidadDesarrolladores = parseInt(document.getElementById ("desarrolladores").value);
    let horasContratar = parseInt(document.getElementById ("horas").value);
    let servicioAdicional = document.getElementById ("servicioAdicional").value.trim();
    let precioAdicional = 0;

    if (servicioAdicional === "Si") {
        precioAdicional = 100; // Se agregan $100 si selecciona el servicio adicional
    }

    let trabajo = trabajosDisponibles.find(trabajo => trabajo.nombre === trabajoSeleccionado);
    
    if (trabajo) {
        let costoTotal = (trabajo.precioHora * cantidadDesarrolladores * horasContratar) + precioAdicional;
        document.getElementById("result").innerText = `El costo total es U$S ${costoTotal}`;
        
    } else {
        alert("Por favor, selecciona un tipo de trabajo válido.");
    }
}

// Creo un evento, se activa cuando el formulario es enviado.
document.getElementById("botonEnviar").addEventListener("click", calcularPresupuesto);


