/*************************************************************************
 ** @name 		 : peticionregistro
 ** @description : Petición json de registro de un profesor/a
 *************************************************************************/
function peticionRegistro(){
	var cad = "[" + JSON.stringify($("#formRegister").serializeObject()) + "]";

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
				alert('Usuario existente');
				navigator.notification.alert('Usuario existente',null,'Registro', 'Aceptar');
			}else{
			alert('Registro correcto');
				navigator.notification.alert('Registro correcto',null,'Registro', 'Aceptar');
			}
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
}