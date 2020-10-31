
function datosEditados(){
    let datos = document.getElementById("submitP").elements;
    let contador = 0;
    for (let i = 0; i < datos.length-2; i++) {
        if(datos[i].value.length != 0){
            contador++;
        }
    }
    console.log(contador)
    if(contador === 6){
        let htmlProfile = {
                "nombre": document.getElementById("nombreEdit").value ,
                "apellido": document.getElementById("apellidoEdit").value,
                "usuario": document.getElementById("userEdit").value ,
                "direccion":document.getElementById("dirEdit").value,
                "edad": document.getElementById("edadEdit").value,
                "telefono":document.getElementById("telEdit").value
            };
        
        localStorage.setItem("datosNuevos",JSON.stringify(htmlProfile));
        let datos = JSON.parse(localStorage.getItem("datosNuevos"));
        document.getElementById('userPerfil').innerText = datos.usuario;
        document.getElementById('namePerfil').innerText = datos.nombre +' '+ datos.apellido;
        //document.getElementById('emailPerfil').innerText = datos.userEmail;
        document.getElementById('telPerfil').innerText = datos.telefono;
        document.getElementById('dirPerfil').innerText = datos.direccion;
        document.getElementById('edadPerfil').innerText = datos.edad;

        $('#editarPerfil').modal('hide');
        Swal.fire({
            icon:'success',
            title:'Datos cargados!',
            text:'gracias!',
            className: "modal-dialog-centered"
        })
    }else{
        $('#editarPerfil').modal('hide');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos erróneos o faltantes!',
            className: "modal-dialog-centered",
          }).then(function(){
            $('#editarPerfil').modal('show');
          })
    }
}

document.addEventListener("DOMContentLoaded", function (e) {   
    const userEmail = localStorage.getItem('email');
    document.getElementById('emailPerfil').innerText = userEmail;
    //document.getElementById('imagenPerfil').src = 'https://es.wikipedia.img/wiki/Usuario_(inform%C3%A1tica)#/media/Archivo:User_icon_2.svg';

    let datos = JSON.parse(localStorage.getItem("datosNuevos"));
        document.getElementById('userPerfil').innerText = datos.usuario;
        document.getElementById('namePerfil').innerText = datos.nombre +' '+ datos.apellido;
        //document.getElementById('emailPerfil').innerText = datos.userEmail;
        document.getElementById('telPerfil').innerText = datos.telefono;
        document.getElementById('dirPerfil').innerText = datos.direccion;
        document.getElementById('edadPerfil').innerText = datos.edad;
    document.getElementById("datosAplicados").addEventListener("click",function(){
        datosEditados();
    });
});