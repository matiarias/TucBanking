
//----------------------------------- Pagina Login ------------------------------------------------

const validarDatos = function () {
  let inputEmailLogin = document.querySelector("#input_email-login").value;
  let inputPasswordLogin = document.querySelector("#input_password-login").value;

  usuarios = JSON.parse(localStorage.usuarios);


  function validar_email(usuario) {
    return usuario.email === inputEmailLogin;
  }

  function validar_password(usuario) {
    return usuario.pass === inputPasswordLogin;
  }

  if (usuarios.find(validar_email)) {

    if (usuarios.find(validar_password)) {

      let result = usuarios.filter(obj => {
        return obj.email === inputEmailLogin //filtra en base a los usuarios que ya tengo. Encuentra obj cuyo email === input. Devuelve usuario completo
      });


      localStorage.setItem("usuarioLogeado", JSON.stringify(result[0].username)); //resultado unico


      location.replace("./pages/movimiento.html");

    } else {
      alert("Email o contrasenia incorrecto");
    }

  } else {
    alert("Email o Password incorrecto");
  }
};

if (document.getElementById("formularioDelIndex") != null) {
  document.querySelector("#formularioDelIndex").addEventListener("submit", function (e) {
    e.preventDefault();
    validarDatos();
  });
}

// -----------------------------------------------------------------------------------------------------