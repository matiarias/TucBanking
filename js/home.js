//---------------------------------- HISTORIAL - HOME --------------------------------------------

let historial = JSON.parse(localStorage.getItem("movimientos")) || [];

let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

//Manejo de modal y campos------------------------------------------------
let itemIdEditado; //Creo una variable global para guardar el id del movimiento

let myModal = new bootstrap.Modal(document.getElementById("editar_card"), {
  keyboard: false,
});
let inputTipoModal = document.querySelector("#input_tipo_modal");
let inputConceptoModal = document.querySelector("#input_concepto_modal");

let inputFechaModal = document.querySelector("#input_fecha_modal");
let inputMontoModal = document.querySelector("#input_monto_modal");

let botonUpdate = document.querySelector("#button_editar_modal"); //capturo boton para guardar edición

//---------------------------------------------------------------------

if (document.URL.includes("home.html")) {
  console.log("Estoy en el home");

  agregarMovimiento(); //función que está definida para cargar las cards cada vez que sea necesario

  // --- functión para calcular y mostrar la suma del ingreso o egreso de todos mis movimientos ------

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

  let montoPresupuesto = document.querySelector("#monto_presupuesto");
  montoPresupuesto.innerHTML = calcularPresupuesto(historial);

  // ---------------------- función para abrir el modal para editar card ------------------------

  //   let myModal = new bootstrap.Modal(document.getElementById("editar_card"), {
  //     keyboard: false,
  //   });

  //   buttonEditar = document
  //     .querySelectorAll("#button_editar")
  //     .forEach((element) => {
  //       element.addEventListener("click", (event) => {
  //         console.log(event);
  //         myModal.show();
  //       });
  //     });

  // --------- función para editar cada card del home-historial ------------

  function editarCard(indice) {
    itemIdEditado = indice; //guardo indice en variable global
    myModal.show(); //abro modal

    //asigno valor del movimiento a los campos del modal
    inputTipoModal.value = historial[itemIdEditado].tipo;
    inputConceptoModal.value = historial[itemIdEditado].concepto;
    console.log(inputConceptoModal);
    inputMontoModal.value = historial[itemIdEditado].monto;
    inputFechaModal.value = historial[itemIdEditado].fecha;
  }

  function updateModal() {
    //creo un nuevo objeto con los datos del movimiento editado
    let itemModificado = {
      concepto: inputConceptoModal.value,
      fecha: inputFechaModal.value,
      monto: inputMontoModal.value,
      tipo: inputTipoModal.value,
    };

    //modifico el movimiento en el arreglo original de los movimientos
    historial[itemIdEditado] = itemModificado;
    localStorage.setItem("movimientos", JSON.stringify(historial)); //Guardo el nuevo arreglo en localStorage
    agregarMovimiento(); //cargo las tarjetas con los cambios
    montoPresupuesto.innerHTML = calcularPresupuesto(historial); //Actualizo el resumen de movimientos
    myModal.hide(); //Cierro modal
  }

  // ---------------- Mostrar el nombre del usuario en la card del presupuesto -------------------

  let NombreDeUsuario = document.getElementById("NombreDeUsuario");

  NombreDeUsuario.innerHTML +=
    " " + JSON.parse(localStorage.usuarioLogueado) + "!";

  // ------------------------ eventos botón movimientos y botón cerrar sesión ------------------------

  function backToMovimientos(e) {
    console.log(e);

    location.replace("./movimiento.html");
  }

  let buttonMovimiento = document.querySelector("#button_movimiento");
  buttonMovimiento.addEventListener("click", backToMovimientos);

  // ---------------------------------------------------------------------------------------------

  function backToLogin(e) {
    console.log(e);

    localStorage.removeItem("usuarioLogueado");

    location.replace("../index.html");
  }

  let buttonCerrarSesion = document.querySelector("#button_cerrar_sesion");
  buttonCerrarSesion.addEventListener("click", backToLogin);

  // -------------- función para borrar card del historialmodificado -------------------

  function borrarCard(indice) {
    console.log(indice);
    let validar = confirm(
      "Está seguro de eliminar este movimiento del historial?"
    );
    if (validar) {
      movimientos.splice(indice, 1);
      localStorage.setItem("movimientos", JSON.stringify(movimientos));
      historial = JSON.parse(localStorage.getItem("movimientos"));
      agregarMovimiento();
      alert("Movimiento Eliminado");
    }
  }
}

// -----------------------------------------------------------------------------------------------------

//Funcion para cargar las tarjetas de movimientos
function agregarMovimiento() {
  document.querySelector("#contenedorHistorial").innerHTML = "";

  for (let i = 0; i < historial.length; i++) {
    const eltipo = historial[i].tipo;
    const elconcepto = historial[i].concepto;
    const elmonto = historial[i].monto;
    const lafecha = historial[i].fecha;
    const identificador = historial[i].id;

    console.log(eltipo, elconcepto, elmonto, lafecha, identificador);

    let div = document.createElement("div");
    div.id = "Fila" + i; //Asigna un id diferente a cada div
    div.classList.add("row");
    document.getElementById("contenedorHistorial").appendChild(div);

    let div1 = document.createElement("div");
    div1.id = "Columna" + i;
    div1.classList.add(
      "col-12",
      "col-md-12",
      "col-lg-12",
      "d-flex",
      "flex-column",
      "flex-md-row",
      "flex-lg-row"
    );
    document.getElementById("Fila" + i).appendChild(div1);

    let div2 = document.createElement("div");
    div2.id = "Tarjeta" + i;
    div2.classList.add("card", "ms-3", "mb-3", "card-home");
    document.getElementById("Columna" + i).appendChild(div2);

    let div3 = document.createElement("div");

    div3.id = "Cuerpo" + i;

    div3.classList.add("card-body");

    div3.innerHTML = `
    
            <div>
               <div class="text-end">
                  <button id="button_eliminar" class="btn button_eliminar_card" onclick="borrarCard(${i})">X</button>
               </div>
    
               <h5 class='card-title text-center title_historial'> $ ${elmonto} </h5> 
               <p class='card-text text-center parrafo_historial'>  ${eltipo}  </p>
               <p class='card-text text-center parrafo_historial'> Concepto: ${elconcepto} </p>
               <p class='card-text text-center parrafo_historial'> <small class='text-muted'> ${ordenarFecha(
      lafecha
    )} </small></p>
    
               <div class="text-center">
                  <button id="button_editar" type="button" class="btn button_editar_card" onClick="editarCard(${i})">Editar</button>
               </div>
            </div>
    
            `;

    document.getElementById("Tarjeta" + i).appendChild(div3);

    //--------------------- donde se colocará la fecha del último movimiento ----------------------

    let ultimoMov = document.querySelector("#last_movimiento");
    ultimoMov.innerHTML = historial[historial.length - 1].fecha
      .split("-")
      .reverse()
      .join("-");
  }
}

//Escucho el evento click del boton del modal para guardar cambios
botonUpdate.addEventListener("click", () => {
  updateModal();
});

//funcion para acomodar fecha
function ordenarFecha(fecha) {
  return fecha.split("-").reverse().join("-");
}
