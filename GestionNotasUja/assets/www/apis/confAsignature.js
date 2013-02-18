function mostrarDIV(valor){
	if(valor == 'T'){
		$('#confDIVTeoria').show();
		$('#confDIVPractica').hide();
		$('#panelConfiguracionAsignatura').refresh();
	}else if (valor == 'P'){
		$('#confDIVTeoria').hide();
		$('#confDIVPractica').show();
		$('#panelConfiguracionAsignatura').refresh();
	}
}

function ocultarTodosDIV(){
	$('#confDIVTeoria').hide();
	$('#confDIVPractica').hide();
}

function configuracionAsig(idAsignatura){
	

	//alert(idAsignatura);
	ocultarTodosDIV();
	var cad = "[{\"id\":\"" + idAsignatura + "\"}]";
	alert(cad);
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'confAsig',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){

			arrayRespuesta = eval(respuesta);

			var i;
			var codhtmlTeoria="";
			var codhtmlPracticas ="";
			
				if(arrayRespuesta[0].length != 0){
					for(i = 0; i < arrayRespuesta[0].length;i++){
						codhtmlTeoria = codhtmlTeoria + '<br>' + arrayRespuesta[0][i]["descripcion"] + '<input type="number" name="name" id="' +arrayRespuesta[0][i]["id"] + '"  value="' + arrayRespuesta[0][i]["porcentaje"]+'"<br>';
					}
				}else{
					codhtmlTeoria = 'No se ha añadido nada aún.';
				}
				
				if(arrayRespuesta[1].length != 0){
					for(i = 0; i < arrayRespuesta[1].length;i++){
						codhtmlPracticas = codhtmlPracticas + '<br>' + arrayRespuesta[1][i]["descripcion"] + '<input type="number" name="name" id="' +arrayRespuesta[1][i]["id"] + '"  value="' + arrayRespuesta[1][i]["porcentaje"]+'"<br>';
					}
				}else{
					codhtmlPracticas = 'No se ha añadido nada aún.';
				}
				
				$('#confDIVTeoria').html(codhtmlTeoria);
				$('#confDIVPractica').html(codhtmlPracticas);
				//$('#panelConfiguracionAsignatura').refresh();
			
			location.href = "#pageConfigurationSignature";
				
			
            },
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		},
		beforeSend: function(){
			$('#cargando').show();

		},
		complete: function(){
			$('#cargando').hide();

		}
	});
	
}