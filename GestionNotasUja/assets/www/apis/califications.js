var pestanaSeleccionada = '';
var dni = '';
var idAsignaturaSel = '';

function calificarAlumno(dniAlumno, idAsignatura){
	var cad = "[{\"dni\":\""+ dniAlumno +"\", \"idAsig\":\"" +idAsignatura +"\"}]";
	
	dni = dniAlumno;
	idAsignaturaSel = idAsignatura;
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'calAlum',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			
			location.href = "#calificacionAlumnos";
			
			//Asignaturas pertenecientes a una titulación
			arrayRespuesta = eval(respuesta);
			
			var i;
			var codhtmlTeoria="";
			var codhtmlPracticas ="";
			var codhtmlTrabajos ="";

			
				if(arrayRespuesta[0].length != 0){
					for(i = 0; i < arrayRespuesta[0].length;i++){
						if(arrayRespuesta[0][i]["valor"] != -1){
							codhtmlTeoria = codhtmlTeoria + '<br><b>' + arrayRespuesta[0][i]["descripcion"] + '</b> Maxima puntuacion: '+ arrayRespuesta[0][i]["porcentaje"]+ ' <input type="text" name="' +arrayRespuesta[0][i]["id"] + '" id="' +arrayRespuesta[0][i]["id"] + '"  value="' + arrayRespuesta[0][i]["valor"]+'" /><br>';
						}else{
							codhtmlTeoria = codhtmlTeoria + '<br><b>' + arrayRespuesta[0][i]["descripcion"] + '</b> Maxima puntuacion: '+ arrayRespuesta[0][i]["porcentaje"]+ ' <input type="text" name="' +arrayRespuesta[0][i]["id"] + '" id="' +arrayRespuesta[0][i]["id"] + '"  value="" /><br>';

						}
					}
				}else{
					codhtmlTeoria = 'No hay Teoria';
				}
				
				if(arrayRespuesta[1].length != 0){
					for(i = 0; i < arrayRespuesta[1].length;i++){
						if(arrayRespuesta[1][i]["valor"] != -1){
							codhtmlPracticas = codhtmlPracticas + '<br> <b>' + arrayRespuesta[1][i]["descripcion"] + '</b> Maxima puntuacion: '+ arrayRespuesta[1][i]["porcentaje"] + ' <input type="text" name="' +arrayRespuesta[1][i]["id"] + '" id="' +arrayRespuesta[1][i]["id"] + '"  value="' + arrayRespuesta[1][i]["valor"]+'" /><br>';
						}else{
							codhtmlPracticas = codhtmlPracticas + '<br><b>' + arrayRespuesta[1][i]["descripcion"] + '</b> Maxima puntuacion: '+ arrayRespuesta[1][i]["porcentaje"] + ' <input type="text" name="' +arrayRespuesta[1][i]["id"] + '" id="' +arrayRespuesta[1][i]["id"] + '"  value="" /><br>';
						}
					}
				}else{
					codhtmlPracticas = 'No hay Practicas';
				}
				
				if(arrayRespuesta[2].length != 0){
					for(i = 0; i < arrayRespuesta[2].length;i++){
						if(arrayRespuesta[2][i]["valor"] != -1){
							codhtmlTrabajos = codhtmlTrabajos + '<br> <b>' + arrayRespuesta[2][i]["descripcion"] + '</b> Maxima puntuacion: '+ arrayRespuesta[2][i]["porcentaje"] + ' <input type="text" name="' +arrayRespuesta[2][i]["id"] + '" id="' +arrayRespuesta[2][i]["id"] + '"  value="' + arrayRespuesta[2][i]["valor"]+'" /><br>';
						}else{
							codhtmlTrabajos = codhtmlTrabajos + '<br><b>' + arrayRespuesta[2][i]["descripcion"] + '</b> Maxima puntuacion: '+ arrayRespuesta[2][i]["porcentaje"] + ' <input type="text" name="' +arrayRespuesta[2][i]["id"] + '" id="' +arrayRespuesta[2][i]["id"] + '"  value="" /><br>';

						}
					}
				}else{
					codhtmlTrabajos = 'No hay Trabajos';
				}
				
				$('#contDIVTeoria').html(codhtmlTeoria);
				$('#contDIVPractica').html(codhtmlPracticas);
				$('#contDIVTrabajos').html(codhtmlTrabajos);
				
				mostrarDIVAsig('T');
				$('#panelContenidoAsignaturaAlum').trigger('create');
				
			
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		},
		beforeSend: function(){
			$('#cargando4').show();
			
		},
		complete: function(){
			$('#cargando4').hide();
			
		}
	});
}


function mostrarDIVAsig(valor){
	if(valor == 'T'){
		pestanaSeleccionada = 'T';
		
		$('#contDIVTeoria').show();
		$('#contDIVPractica').hide();
		$('#contDIVTrabajos').hide();
		//$('#panelContenidoAsignaturaAlum').refresh();
	}else if (valor == 'P'){
		pestanaSeleccionada = 'P';
		
		$('#contDIVTeoria').hide();
		$('#contDIVPractica').show();
		$('#contDIVTrabajos').hide();
		//$('#panelContenidoAsignaturaAlum').refresh();
	}else{
		pestanaSeleccionada = 'TV';
		
		$('#contDIVTeoria').hide();
		$('#contDIVPractica').hide();
		$('#contDIVTrabajos').show();
		//$('#panelContenidoAsignaturaAlum').refresh();
	}
}

function actualizarDatos(){
	var cad;
	if(pestanaSeleccionada =='T'){
		cad ="[" +"[{\"id\":\"" +idAsignaturaSel + "\", \"dni\":\"" +dni +"\", \"tipo\":\""+"T" +"\"}],[" +JSON.stringify($("#formCalificAlumnoTeoria").serializeObject()) + "]]";
	}else if(pestanaSeleccionada == 'P'){
		cad ="[" +"[{\"id\":\"" +idAsignaturaSel + "\", \"dni\":\"" +dni +"\", \"tipo\":\""+"P" +"\"}],[" +JSON.stringify($("#formCalificAlumnoPracticas").serializeObject()) + "]]";
	}else{
		cad ="[" +"[{\"id\":\"" +idAsignaturaSel + "\", \"dni\":\"" +dni +"\", \"tipo\":\""+"TV" +"\"}],[" +JSON.stringify($("#formCalificAlumnoTrabajos").serializeObject()) + "]]";
	}

	alert(cad);
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'updCalAlu',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			//alert(respuesta);
			arrayRespuesta = eval(respuesta);
            
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
	
}