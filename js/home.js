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

        let div = document.createElement("div");
        div.id = "Fila" + i; //Asigna un id diferente a cada div
        div.classList.add('row');
        document.getElementById("contenedorHistorial").appendChild(div);

        let div1 = document.createElement("div");
        div1.id = "Columna" + i;
        div1.classList.add('col-12', 'col-md-6', 'offset-md-3', 'col-lg-6', 'offset-lg-3');
        document.getElementById("Fila" + i).appendChild(div1);


        let div2 = document.createElement("div");
        div2.id = "Tarjeta" + i;
        div2.classList.add('card', 'mb-3');
        document.getElementById("Columna" + i).appendChild(div2);


        let div3 = document.createElement("div");

        div3.id = "Cuerpo" + i;

        div3.classList.add('card-body');

        div3.innerHTML = `

        <div>
           <div class="text-end">
              <button class="btn btn-danger" onclick="">X</button>
           </div>

           <h5 class='card-title text-center title_historial'> $ ${elmonto} </h5> 
           <p class='card-text text-center parrafo_historial'>  ${eltipo}  </p>
           <p class='card-text text-center parrafo_historial'> Concepto: ${elconcepto} </p>
           <p class='card-text text-center parrafo_historial'> <small class='text-muted'> ${lafecha} </small></p>

           <div class="text-center">
              <button type="button" class="btn btn-success">Editar</button>
           </div>
        </div>

        `;

        document.getElementById("Tarjeta" + i).appendChild(div3);

        //--------------------- donde se colocará la fecha del último movimiento ----------------------

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

    // ---------------- Donde debe ir el monto del presupuesto le asigno la función ---------------------

    let montoPresupuesto = document.querySelector('#monto_presupuesto')
    montoPresupuesto.innerHTML = calcularPresupuesto(historial);

    // ------------------------- función para borrar card de historial --------------------------------


    // ----------------------------------------------------------------------------------------------

    let NombreDeUsuario = document.getElementById('NombreDeUsuario');

    NombreDeUsuario.innerHTML += " " + JSON.parse(localStorage.usuarioLogeado) + "!";

    // ------------------------ eventos botón movimientos y botón cerrar sesión ------------------------

    let buttonMovimiento = document.querySelector('#button_movimiento');
    buttonMovimiento.addEventListener('click', backToMovimientos);

    function backToMovimientos(e) {

        console.log(e)

        location.replace("./movimiento.html");
    };

    let buttonCerrarSesion = document.querySelector('#button_cerrar_sesion');
    buttonCerrarSesion.addEventListener('click', backToLogin);

    function backToLogin(e) {

        console.log(e)

        location.replace("../index.html");
    };


};

// ------------------------------------------------------------------------------------------------------

