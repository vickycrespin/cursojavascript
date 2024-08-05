
let horasTrabajadas = parseInt (prompt ("Cuantas horas de programacion queres contratar? El precio por hora son U$S 250"));
let servicioAdicional = prompt ("Te gustaria contratas ademas nuestro servicio de mantenimiento y soporte anual, por U$S 50 al mes?");

function calcularpresupuesto () {

    let precioHora = 250;
    let precioAdicional = 50;
    
    //tarifaBasica = horasTrabajadas * precioHora;
    //tarifaCompleta = horasTrabajadas * precioHora + servicioAdicional;
    //let precioTrabajo = horasTrabajadas * precioHora;
    
    if (servicioAdicional == "Si" || servicioAdicional == "Sí" || servicioAdicional == "si") {
        //console.log ("El presupuesto por el trabajo solicitado son: U$S " + tarifaBasica);
        return (precioHora * horasTrabajadas) + precioAdicional; 
    } else {
        //console.log ("El presupuesto por el trabajo solicitado son: U$S " + tarifaCompleta);
        return precioHora * horasTrabajadas; 
    }
    
    //console.log ("El presupuesto por el trabajo solicitado son: U$S " + precioTrabajo); 
    
    //return precioTrabajo; // Devuelve el precio del trabajo
}

console.log (calcularpresupuesto ());

let presupuestoFinal = calcularpresupuesto(); // Almacenamos el resultado en una variable

if (presupuestoFinal <= 3000) {
    console.log ("Avanzamos con el trabajo!");
}
else if (presupuestoFinal > 3000 && presupuestoFinal <= 4000) {
    console.log ("Me gustaria juntarme a negociar");
}
else {
    console.warn ("El trabajo esta muy por fuera de tu presupuesto");
}

//const programadores = ["Pedro", "Joaquin", "Lucas", "Vicente", "Martin"]

//let contacto = prompt ("Te gustaria que te contactemos?")






