//------------------------------------- MOVIMIENTOS --------------------------------------------

class Movimiento {
    constructor(tipo, concepto, fecha, monto) {
        this.tipo = tipo;
        this.concepto = concepto;
        this.fecha = fecha;
        this.monto = monto;
    }
}

let movimientos = [];

const agregarMovimiento = function () {
    let inputTipo = document.querySelector("#input_tipo").value;
    let inputConcepto = document.querySelector("#input_concepto").value;
    let inputFecha = document.querySelector("#input_fecha").value;
    let inputMonto = document.querySelector("#input_monto").value;


    if (localStorage.movimientos != null) {
        movimientos = JSON.parse(localStorage.movimientos);
    }

    let cuenta = {
        tipo: inputTipo,
        concepto: inputConcepto,
        fecha: inputFecha,
        monto: inputMonto
    }

    if (inputConcepto == "" || inputFecha == "" || inputMonto == "") {
        alert("Debe completar todos los campos");
    } else {
        movimientos.push(cuenta);

        localStorage.setItem("movimientos", JSON.stringify(movimientos));

        location.replace("./home.html");
    }

}

if (document.getElementById("formularioMovimiento") != null) {
    document.querySelector("#formularioMovimiento").addEventListener("submit", function (e) {
        e.preventDefault();
        agregarMovimiento();
    });
}

let botonVolver = document.querySelector('#button_volver').addEventListener('click', volverHome);

function volverHome(e) {

    console.log(e);

    location.replace("./home.html");

}