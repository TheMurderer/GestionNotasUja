function peticionAnadirAsignatura(){
	//console.log($('#formLogin').serialize());
	//var p_url = "http://serrano5510.servehttp.com:8443/ServicioWeb/index.php";
	
	var cad = "[" + JSON.stringify($("#formAnadeAsignatura").serializeObject()) + "]";
	//alert(cad);
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'addasig',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			alert(respuesta);
			
//			arrayRespuesta = eval(respuesta);
//            if (arrayRespuesta["ok"] == 0){
//				alert('Login incorrecto');
//				navigator.notification.alert('Acceso incorrecto',null,'Login', 'Aceptar');
//			}else{
//				//Guardamos el Id de la sessión
//				alert("Correcto");
//				idSesion = arrayRespuesta["sesion"];
//				location.href = "#pageSignatures";
//			}
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
	
}

function peticionTitulaciones(){
	var cad = "[]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'ltit',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			alert(respuesta);
			//titulaciones
			
			arrayRespuesta = eval(respuesta);

			var i;
			var codhtml = '<select id="menuTitulaciones" >';
			if(arrayRespuesta.length != 0){
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<option value="option1">'+ arrayRespuesta[i]["nombre"] +'</option>';
				}
				codhtml = codhtml + '</select>';
				
				$('#titulaciones').html(codhtml);
				$('#menuTitulaciones').select();
			}
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
	
}
