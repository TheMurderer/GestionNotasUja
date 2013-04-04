/*----------- VARIABLES GLOBALES -----------*/
var pestanaSeleccionada = '';
var dni = '';
var idAsignaturaSel = '';

/*----------- PETICIONES JSON -----------*/

/*************************************************************************
 ** @name 		        : calificarAlumno
 ** @description        : Petición json para almacenar las calificaciones de un alumno
 ** @param dniAlumno    : DNI del alumno a que se desea calificar
 ** @param idAsignatura : Id de la asignatura en la cual se desea calificar
 *************************************************************************/
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
			mostrarDIVAsig('T');
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
							codhtmlTeoria = codhtmlTeoria + '<br><b>' + arrayRespuesta[0][i]["descripcion"] + '</b> Maxima puntuacion: '+ arrayRespuesta[0][i]["porcentaje"]+ ' <input type="text" class="numbersOnly" onkeyup="javascript:soloNumeros(this,0,'+arrayRespuesta[0][i]["porcentaje"]+');" name="' +arrayRespuesta[0][i]["id"] + '" id="' +arrayRespuesta[0][i]["id"] + '"  value="' + arrayRespuesta[0][i]["valor"]+'" /><br>';
						}else{
							codhtmlTeoria = codhtmlTeoria + '<br><b>' + arrayRespuesta[0][i]["descripcion"] + '</b> Maxima puntuacion: '+ arrayRespuesta[0][i]["porcentaje"]+ ' <input type="text" class="numbersOnly" onkeyup="javascript:soloNumeros(this,0,'+arrayRespuesta[0][i]["porcentaje"]+');" name="' +arrayRespuesta[0][i]["id"] + '" id="' +arrayRespuesta[0][i]["id"] + '"  value="" /><br>';
						}
						codhtmlTeoria = codhtmlTeoria + '	<label for="textarea">Observaciones: </label><textarea cols="40" rows="12" name="o'+arrayRespuesta[0][i]["id"] +'" id="o'+arrayRespuesta[0][i]["id"] +'">'+ arrayRespuesta[0][i]["observaciones"]+ '</textarea>';
					}
				}else{
					codhtmlTeoria = 'No hay Teoria';
				}
				
				if(arrayRespuesta[1].length != 0){
					for(i = 0; i < arrayRespuesta[1].length;i++){
						if(arrayRespuesta[1][i]["valor"] != -1){
							codhtmlPracticas = codhtmlPracticas + '<br> <b>' + arrayRespuesta[1][i]["descripcion"] + '</b> Maxima puntuacion: '+ arrayRespuesta[1][i]["porcentaje"] + ' <input type="text" class="numbersOnly" onkeyup="javascript:soloNumeros(this,0,'+arrayRespuesta[1][i]["porcentaje"]+');" name="' +arrayRespuesta[1][i]["id"] + '" id="' +arrayRespuesta[1][i]["id"] + '"  value="' + arrayRespuesta[1][i]["valor"]+'" /><br>';
						}else{
							codhtmlPracticas = codhtmlPracticas + '<br><b>' + arrayRespuesta[1][i]["descripcion"] + '</b> Maxima puntuacion: '+ arrayRespuesta[1][i]["porcentaje"] + ' <input type="text" class="numbersOnly" onkeyup="javascript:soloNumeros(this,0,'+arrayRespuesta[1][i]["porcentaje"]+');" name="' +arrayRespuesta[1][i]["id"] + '" id="' +arrayRespuesta[1][i]["id"] + '"  value="" /><br>';
						}
						codhtmlPracticas = codhtmlPracticas + '	<label for="textarea">Observaciones: </label><textarea cols="40" rows="12" name="o'+arrayRespuesta[1][i]["id"] +'" id="o'+arrayRespuesta[1][i]["id"] +'">'+ arrayRespuesta[1][i]["observaciones"]+ '</textarea>';
					}
				}else{
					codhtmlPracticas = 'No hay Practicas';
				}
				
				if(arrayRespuesta[2].length != 0){
					for(i = 0; i < arrayRespuesta[2].length;i++){
						if(arrayRespuesta[2][i]["valor"] != -1){
							codhtmlTrabajos = codhtmlTrabajos + '<br> <b>' + arrayRespuesta[2][i]["descripcion"] + '</b> Maxima puntuacion: '+ arrayRespuesta[2][i]["porcentaje"] + ' <input type="text" class="numbersOnly" onkeyup="javascript:soloNumeros(this,0,'+arrayRespuesta[2][i]["porcentaje"]+');" name="' +arrayRespuesta[2][i]["id"] + '" id="' +arrayRespuesta[2][i]["id"] + '"  value="' + arrayRespuesta[2][i]["valor"]+'" /><br>';
						}else{
							codhtmlTrabajos = codhtmlTrabajos + '<br><b>' + arrayRespuesta[2][i]["descripcion"] + '</b> Maxima puntuacion: '+ arrayRespuesta[2][i]["porcentaje"] + ' <input type="text" class="numbersOnly" onkeyup="javascript:soloNumeros(this,0,'+arrayRespuesta[2][i]["porcentaje"]+');" name="' +arrayRespuesta[2][i]["id"] + '" id="' +arrayRespuesta[2][i]["id"] + '"  value="" /><br>';
						}
						codhtmlTrabajos = codhtmlTrabajos + '<label for="textarea">Observaciones: </label><textarea cols="40" rows="12" name="o'+arrayRespuesta[2][i]["id"] +'" id="o'+arrayRespuesta[2][i]["id"] +'">'+ arrayRespuesta[2][i]["observaciones"]+ '</textarea>';

					}
				}else{
					codhtmlTrabajos = 'No hay Trabajos';
				}
				
				
				$('#contDIVTeoria').html(codhtmlTeoria);
				$('#contDIVPractica').html(codhtmlPracticas);
				$('#contDIVTrabajos').html(codhtmlTrabajos);
				
				
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

/*************************************************************************
 ** @name 		 : actualizarDatos
 ** @description : Petición json para actualizar las notas de un alumno
 *************************************************************************/
function actualizarDatos(){
	if(pestanaSeleccionada =='A'){
		actualizarAsistencia();
	}else{
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
				arrayRespuesta = eval(respuesta);
				
				if (arrayRespuesta["ok"] == 1){
					alert("Datos actualizados correctamente");
				}else{
					alert("Incorrecto");
				}
	            
			},
			error: function(respuesta){
				alert("ERROR, YO NO ENTIENDO PUR KÉ...");
			}
		});
	}
	
}


/*----------- FUNCIONES -----------*/

/*************************************************************************
 ** @name 		 : mostrarDIVAsig
 ** @description : Función que permite visualizar la teoría/práctica/trabajos
 **				   en función del parámetro pasado
 ** @param valor : T-Teoría | P-Práctica | T-Trabajos voluntarios
 *************************************************************************/
function mostrarDIVAsig(valor){
	if(valor == 'T'){
		pestanaSeleccionada = 'T';
		
		$('#pestanaTeoriaCalificacion').addClass("ui-btn-active");
		$('#pestanaPracticasCalificacion').removeClass("ui-btn-active");
		$('#pestanaTrabajoCalificacion').removeClass("ui-btn-active");
		$('#pestanaAsistenciaCalificacion').removeClass("ui-btn-active");
		
		$('#contDIVTeoria').show();
		$('#contDIVPractica').hide();
		$('#contDIVTrabajos').hide();
		$('#contDIVAsistencia').hide();
	}else if (valor == 'P'){
		pestanaSeleccionada = 'P';
		
		$('#contDIVTeoria').hide();
		$('#contDIVPractica').show();
		$('#contDIVTrabajos').hide();
		$('#contDIVAsistencia').hide();
	}else if(valor == 'TV'){
		pestanaSeleccionada = 'TV';
		
		$('#contDIVTeoria').hide();
		$('#contDIVPractica').hide();
		$('#contDIVTrabajos').show();
		$('#contDIVAsistencia').hide();
	}else if(valor == 'A'){
		pestanaSeleccionada = 'A';
		
		$('#contDIVTeoria').hide();
		$('#contDIVPractica').hide();
		$('#contDIVTrabajos').hide();
		$('#contDIVAsistencia').show();

		mostrarListaGruposModAsistencia(idAsignaturaSel);
	}
}
