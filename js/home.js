//---------------------------------- HISTORIAL - HOME --------------------------------------------

let historial = JSON.parse(localStorage.movimientos) || [];

if (document.URL.includes("home.html")) {

    console.log("Estoy en el home");

    for (let i = 0; i < historial.length; i++) {

        const eltipo = historial[i].tipo;
        const elconcepto = historial[i].concepto;
        const elmonto = historial[i].monto;
        const lafecha = historial[i].fecha;


        console.log(eltipo, elconcepto, elmonto, lafecha);

        let div = document.createElement("div"); //crea un elemento div
        div.id = "Tarjeta" + i; //Asigna un id diferente a cada div
        div.classList.add('card', 'mb-3');
        document.getElementById("contenedorHistorial").appendChild(div); //Selecciona como se llama el elemento por ese id, y el appenchild agrega un hijo



        let div1 = document.createElement("div");
        div1.id = "Fila" + i;
        div1.classList.add('row');
        document.getElementById("Tarjeta" + i).appendChild(div1); // busco el elemento anterior



        let div2 = document.createElement("div");
        div2.id = "Columna" + i;
        div2.classList.add('col-12');
        document.getElementById("Fila" + i).appendChild(div2);



        let div3 = document.createElement("div");

        div3.id = "Cuerpo" + i;

        div3.classList.add('card-body');

        div3.innerHTML =
            "<h5 class='card-title text-center'>" + "$" + elmonto + "</h5>" +
            "<p class='card-text text-center'>" + eltipo + "</p>" +
            "<p class='card-text text-center'>" + "Concepto: " + elconcepto + "</p>" +
            "<p class='card-text text-center'><small class='text-muted'>" + lafecha + "</small></p>";

        document.getElementById("Columna" + i).appendChild(div3);

        //----------------- donde se colocará la fecha del último movimiento --------------------------

        let ultimoMov = document.querySelector('#last_movimiento')
        ultimoMov.innerHTML = historial[historial.length - 1].fecha.split("-").reverse().join("-");
    }

    // --- functión para calcular y mnostrar la suma del ingreso o egreso de todos mis movimientos ------

    const calcularPresupuesto = (array) => {
        let valor = 0;

        for (let i = 0; i < array.length; i++) {
            switch (array[i].tipo) {
                case "Ingreso":
                    valor += parseFloat(array[i].monto);
                    break;
                case "Egreso":
                    valor -= parseFloat(array[i].monto);
                    break;
            }
        }
        return valor;
    };

    //Donde debe ir el monto del presupuesto le asigno la función
    let montoPresupuesto = document.querySelector('#monto_presupuesto')
    montoPresupuesto.innerHTML = calcularPresupuesto(historial);


    let NombreDeUsuario = document.getElementById('NombreDeUsuario');

    NombreDeUsuario.innerHTML += " " + JSON.parse(localStorage.usuarioLogeado) + "!";

}

// -------------------------------------------------------------------------------------------------

