/*************************************************************************
 ** @name 		 : peticionregistro
 ** @description : Petición json de registro de un profesor/a
 *************************************************************************/
function peticionRegistro(){
	var cad = "[" + JSON.stringify($("#formRegister").serializeObject()) + "]";
	cad = cad.substring(0, cad.indexOf('passAnt'));
	cad = cad + 'passAnt":"' + hex_sha1($('#passwordAntiguainput').val())+'","pass":"';
	cad = cad + hex_sha1($('#password2').val()) + '"}]';

	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'reg',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
            if (arrayRespuesta["ok"] == 0){
				alert('Registro incorrecto');
				navigator.notification.alert('Registro incorrecto',null,'Registro', 'Aceptar');
			}else{
				location.href='#pageLogin';
			}
		},
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		}
	});
}