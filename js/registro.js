
//----------------------------------- Pagina Registro --------------------------------------------------

class Usuario {
    constructor(nombre, username, email, password) {
        this.nombre = nombre;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}


let usuarios = [];


const agregarUsuario = function () {


    let inputEmail = document.querySelector("#input_email").value;
    let inputUsername = document.querySelector("#input_username").value;
    let inputPassword = document.querySelector("#input_password").value;

    if (inputEmail.search('@') != -1) // devuelve -1 solo si no lo encuentra
    {
        let datos = {
            email: inputEmail,
            username: inputUsername,
            pass: inputPassword
        };


        if (localStorage.usuarios != null) {
            usuarios = JSON.parse(localStorage.usuarios);
        }

        usuarios.push(datos);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        location.replace("../index.html");
    }
    else {
        alert("Debe ingresar un email válido");
    }
};


if (document.getElementById("formulario") != null) {
    document.querySelector("#formulario").addEventListener("submit", function (e) {
        e.preventDefault();
        agregarUsuario();
    });
}

// -----------------------------------------------------------------------------------------------------