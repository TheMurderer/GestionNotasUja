function addMaterial(idAsignatura,tipo){
	alert("ID: " + idAsignatura + " Tipo: " + tipo);
	var puntuacion = $("#puntuacionParcial").val();
	var descripcion = $("#descripcionParcial").val();
	var cad = "[" +
	          "{" +
	               " \"id\":\"" + idAsignatura + "\"," +
	               " \"tipo\":\""+"P"+ tipo+"\"," +
	               " \"punt\":"+$("#puntuacionParcial").val()+"," +
	               " \"desc\":\""+$("#descripcionParcial").val()+"\"" +
	           "}" +
	           "]";	
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'addMat',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			if(tipo == 'T'){
				anadirMaterial("confDIVTeoria", descripcion, puntuacion);
				mostrarDIV('T');
			}else if(tipo == 'P'){
				anadirMaterial("confDIVPractica", descripcion, puntuacion);
				mostrarDIV('P');
			}else{
				anadirMaterial("confDIVTrabajos", descripcion, puntuacion);
				mostrarDIV('TV');
			}
			
			//location.href = "#pageConfigurationSignature";
        },
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
	
}