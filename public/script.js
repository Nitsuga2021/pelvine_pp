  function ingresar(){
    var form = {
      usuario: document.getElementById("usuario").value,
      contraseña: document.getElementById("password").value,
    }
    document.getElementById("caja-ingreso").hidden = true;
    

    document.getElementById("caja-carga-fondo").hidden = false;
    document.getElementById("caja-carga-spinner").hidden = false;

    google.script.run
    .withSuccessHandler( ingresarExito )
    .withFailureHandler( ingresarFallo )
    .ingresarBdD( form )
  }

  function ingresarFallo(error){
      console.log(error)
  }

  function ingresarExito( infoUsuario){
    console.log(infoUsuario)

    document.getElementById("caja-carga-fondo").hidden = true;
    document.getElementById("caja-carga-spinner").hidden = true;
    document.getElementById("caja-principal").hidden = false;
    var turnosCards = ''
    for( var i in infoUsuario){
      let fecha = infoUsuario[i][0]
      var fechaUTC = new Date(fecha + ' 00:00:00');
      const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formateador = new Intl.DateTimeFormat('es-ES', opciones);
      var fechaFormateada = formateador.format(fechaUTC);
      var capitalizar = (cadena) => {
        return cadena.split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ');
      };
      fechaFormateada = capitalizar(fechaFormateada); 
      var informacionOculta = ''
      for( var j in infoUsuario[i]){
        console.log('estoy aca')
        informacionOculta += infoUsuario[i][j] + ',';    
      }             
      console.log('estoy aca')                 

      turnosCards += `<div class="col-12 col-sm-6 col-md-6 col-lg-3">
                            <div class="card">
                              <img src="https://ik.imagekit.io/8uikpwhvj/Calendario%203.png?updatedAt=1738338271065" class="card-img-top">
                              <div class="card-body">
                                <h5 class="card-title">Turno</h5>
                                <p class="card-text">`+ fechaFormateada +`</p>
                                <button type="button" data-bs-toggle="modal" data-bs-target="#detalle-turnos" class="btn btn-info w-100" style="background-color:#57C0BF;" onclick="mostrarInfoTurno(this)">Ver turno</button>
                                <div  hidden>
                                  <p class="info-turno">
                                  `+ informacionOculta +`
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>`
      
    }
    document.getElementById("turnos-tarjetas").innerHTML = turnosCards;


    
  }

  function mostrarInfoTurno(btn){
    console.log('estoy aca')
    var infoOculta = btn.parentNode.getElementsByClassName('info-turno')[0].innerHTML;
    var tabla = ''
    var datos = String(infoOculta).split(',')
    var tabla = '<table class="table">'
    for( var i in datos){
      tabla += '<tr>'
       tabla += String(datos[i]).trim()
      tabla += '</tr>'
    }

    
  }

  function ingresarBdD(usuario) {
    fetch("/api/ingresarBdD", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario })
    })
    .then(response => response.json())
    .then(data => {
        console.log("User Data:", data);
    })
    .catch(error => console.error("Error:", error));
}

// Example: Call function when clicking a button
document.getElementById("submitButton").addEventListener("click", () => {
    const usuario = document.getElementById("username").value;
    ingresarBdD(usuario);
});



