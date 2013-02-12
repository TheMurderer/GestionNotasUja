function llamadaDatosLogueo(){
	console.log($('#formRegister').serialize());
	var p_url = "http://serrano5510.servehttp.com:8443/ServicioWeb/index.php";
	
	var cad = "[" + JSON.stringify($("#formRegister").serializeObject()) + "]";
	
	var datas = 'm=reg&datos=' + cad;
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
            alert('RESPUESTA: '+ arrayRespuesta["ok"]);
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
	
}