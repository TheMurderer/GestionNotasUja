function peticionLogin(){
	console.log($('#formLogin').serialize());
	var p_url = "http://serrano5510.servehttp.com:8443/ServicioWeb/index.php";
	
	var cad = "[" + JSON.stringify($("#formLogin").serializeObject()) + "]";
	//alert(cad);
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
				alert("Correcto");
				idSesion = arrayRespuesta["sesion"];
				location.href = "#pageSignatures";
			}
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
	
}