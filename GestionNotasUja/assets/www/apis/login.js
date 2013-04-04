/*----------- PETICIONES JSON -----------*/


/*************************************************************************
 ** @name 		 : peticionLogin
 ** @description : Petición json de login
 *************************************************************************/
function peticionLogin(){
    console.log($('#formLogin').serialize());
	
	var cad = "[" + JSON.stringify($("#formLogin").serializeObject()) + "]";
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'log',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
            if (arrayRespuesta["ok"] == 0){
				alert('Login incorrecto');
				navigator.notification.alert('Acceso incorrecto',null,'Login', 'Aceptar');
			}else{
				//Guardamos el Id de la sessión
				idSesion = arrayRespuesta["sesion"];
				peticionAsignaturas(); //Lista de asignaturas del profesor
				location.href = "#pageSignatures";
			}
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
}

