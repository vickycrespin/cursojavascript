class TrabajosDisponibles {
    constructor (nombre = "", precioHora = 0) {
        this.nombre = nombre;
        this.precioHora = precioHora;
    }
}

//Traer datos del archivo JSON

async function fetchData () {
    const apiUrl = '../JSON/trabajos.json';
    
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) { // Verificar si la respuesta es válida
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Datos obtenidos:", data);
        return data;
    }
    catch (error) {
        console.log ("Error al obtener los datos", error.message);
        return [];
    }

}

function errorMensaje () {
    console.error ("Error al obtener los datos")
}

fetchData ()

// Creo un evento, se activa cuando el formulario es enviado.
document.getElementById("botonEnviar").addEventListener("click", calcularPresupuesto);


async function calcularPresupuesto (e) {

    e.preventDefault ();

    const trabajos = await fetchData();

    let trabajoSeleccionado = document.getElementById("tipoTrabajo").value.trim();
    let cantidadDesarrolladores = parseInt(document.getElementById ("desarrolladores").value);
    let horasContratar = parseInt(document.getElementById ("horas").value);
    let servicioAdicional = document.getElementById ("servicioAdicional").value.trim();
    let precioAdicional = 0;

    if (servicioAdicional === "Si") {
        precioAdicional = 100; 
    }

    let trabajo = trabajos.find(trabajo => trabajo.tipoTrabajo === trabajoSeleccionado);
    let mensaje = "Presupuesto total: "; 

    let costoTotal;
    
    try {
        if (!trabajoSeleccionado || isNaN(cantidadDesarrolladores) || isNaN(horasContratar)) {
            throw new Error("Por favor, completa todos los campos antes de enviar.");
        }

        else if (cantidadDesarrolladores <= 0 && horasContratar <= 0) {
            throw new Error("La cantidad de desarrolladores y horas debe ser mayor a 0.");
        }

        else if (horasContratar <= 0) {
            throw new Error("La cantidad de horas debe ser mayor a 0.");
        }

        else if (cantidadDesarrolladores <= 0) {
            throw new Error("La cantidad de desarrolladores debe ser mayor a 0.");
        }

        else if (trabajo) {
            // Calcular el costo total
            costoTotal = (trabajo.precioHora * cantidadDesarrolladores * horasContratar) + precioAdicional;

            // Limpiar la sección antes de agregar nuevos datos
            const elementoPadre = document.querySelector('.mostrar-presupuesto');
            elementoPadre.innerHTML = ''; // Limpiar contenido anterior

            // Actualizar el div con el resultado del presupuesto

            const divpresupuesto = document.createElement ('div');
            divpresupuesto.innerHTML = `<h2> Presupuesto total: el costo total es U$S ${costoTotal} </h2>
                                           
                                        <p> Si queres avanzar, dejanos tus datos aca: </p>

                                        <form id="fvalida" action="form.php" method="POST">
                                        <p> Nombre Completo: </p>
                                        <input type="text" name="nombre" id="nombre">

                                        <p> Correo electronico: </p>
                                        <input type="mail" name="mail" id="mail">

                                        <input type="button" id="botonDatos" value="Contactame">
                                        </form>`
            ;                            
            
            elementoPadre.appendChild (divpresupuesto)

            const botonDatos = document.getElementById("botonDatos");
            botonDatos.addEventListener("click", validaForm);

            // Guardar los datos en localStorage
            localStorage.setItem ("Trabajo_Seleccionado", JSON.stringify (trabajoSeleccionado));
            localStorage.setItem ("Horas_Contratadas", JSON.stringify (horasContratar));
            localStorage.setItem ("Cantidad_Desarrolladores", JSON.stringify (cantidadDesarrolladores));
            localStorage.setItem ("Servicio_Adicional", JSON.stringify (servicioAdicional));
            localStorage.setItem("Presupuesto_Final", JSON.stringify(costoTotal));

        } else {
            throw new Error("Trabajo seleccionado no disponible.");
        }
    }
    
    catch (error) {
        // Mostrar mensaje de error en el HTML o en un alert
        document.getElementById("result").innerText = error.message;
    }
}

// Creo un evento, se activa cuando el formulario es enviado.
document.getElementById("botonDatos").addEventListener("click", validaForm);

function validaForm(e) {
    e.preventDefault(); 

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("mail").value.trim();

    // Verificar si el campo "nombre" está vacío
    if (nombre.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, escribe tu nombre'
        });
        document.getElementById("nombre").focus();
        return; // Detener la función si falta el nombre
    }

    // Verificar si el campo "email" está vacío
    if (email.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, escribe tu correo electrónico'
        });
        document.getElementById("mail").focus();
        return; // Detener la función si falta el correo
    }

    // Si todos los campos están completos, mostrar un mensaje de éxito
    Swal.fire({
        icon: 'success',
        title: '¡Formulario enviado!',
        text: 'La solicitud se ha procesado correctamente, te contactaremos en breve!',
        confirmButtonText: 'OK'
    }).then(() => {
        // Enviar el formulario después de mostrar el mensaje de éxito
        document.getElementById("fvalida").submit();
    });
}







