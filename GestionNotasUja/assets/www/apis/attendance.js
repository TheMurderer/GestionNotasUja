var dniMod;
var grupoSel;

function mostrarAlumnosAsist(){
	$('#listaAlumnosAsistencia').empty();
	$('#btNuevAsist').hide();
	var cad = "[{\"id\":\"" + idAsignaturaSeleccionada + "\"}]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'gruposAsignaturaImpart',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
				
			arrayRespuesta = eval(respuesta);
			
			var i;

			var codhtml = '<select name="select-native-4Asis" id="cbGruposAlAsis" >';
			codhtml= codhtml + '<option value="0" disabled selected> Seleccione grupo </option>';
			
			if(arrayRespuesta[0].length != 0){
				
				codhtml = codhtml + '<optgroup label="Teor\xeda">';
				for(i = 0; i < arrayRespuesta[0].length; i++){
					if(arrayRespuesta[0][i]["Turno"]=='M'){
						codhtml = codhtml + '<option value="'+arrayRespuesta[0][i]["idGrupo"]+'">Grupo '+arrayRespuesta[0][i]["Descripcion"]+' - Turno Ma\xf1ana</option>';
					}else{
						codhtml = codhtml + '<option value="'+arrayRespuesta[0][i]["idGrupo"]+'">Grupo '+arrayRespuesta[0][i]["Descripcion"]+' - Turno Tarde</option>';
					}
				}
				codhtml = codhtml + '</optgroup>';
				
			}

			if(arrayRespuesta[1].length != 0){
				codhtml = codhtml + '<optgroup label="Pr\xe1cticas">';
				for(i = 0; i < arrayRespuesta[1].length; i++){
						codhtml = codhtml + '<option value="'+arrayRespuesta[1][i]["idGrupo"]+'">Grupo '+arrayRespuesta[1][i]["Descripcion"]+' Horario: '+ arrayRespuesta[1][i]["hora_comienzo"] +' - ' + arrayRespuesta[1][i]["hora_fin"]+'</option>';	
				}
				codhtml = codhtml + '</optgroup>';
			}
			codhtml =codhtml + '</select>';

			$('#divGrupoAlumnoAsist').html(codhtml);
			$('#listadoAsistenciaAsignatura').trigger('create');
			
			$('#cbGruposAlAsis').change(function() {
				idTitulacionSeleccionada = $('#cbGruposAlAsis').val();
				motrarListaAlumnosAsist($('#cbGruposAlAsis').val());
			});
			
        },
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");document.cookie= "";location.href="#pageLogin";
		},
		beforeSend: function(){
			$('#cargando12').show();
			$('#listaAlumnosAsistencia').hide();
		},
		complete: function(){
			$('#cargando12').hide();
			$('#listaAlumnosAsistencia').show();
		}
	});
	
}

function motrarListaAlumnosAsist(id){
	var cad = "[{\"id\":\"" + id + "\"}]";

	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'obtenerAlumnosGrupo',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){

			arrayRespuesta = eval(respuesta);
			
			var i;
			var codhtml = '<fieldset data-role="controlgroup">';

			if(arrayRespuesta.length != 0){
				
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<input type="checkbox" name="'+ arrayRespuesta[i]["dni"] +'" id="'+ arrayRespuesta[i]["dni"] +'">';
					codhtml = codhtml + '<label for="'+ arrayRespuesta[i]["dni"] +'">' + arrayRespuesta[i]["apellidos"] + ', ' + arrayRespuesta[i]["nombre"] +' </label>';
				}
				codhtml = codhtml + '</ul>';
				
				var codeButton = "<a href=\"#\" data-role=\"button\" data-inline=\"true\" data-icon=\"\" onclick=\"almacenarNuevaAsistencia("+id+")\"> A\xf1adir </a>";

				$('#btNuevAsist').html(codeButton);
				$('#btNuevAsist').show();
				$('#listaAlumnosAsistencia').html(codhtml);
				$('#listadoAsistenciaAsignatura').trigger('create');
				
			}else{
				$('#listaAlumnos').html("<h3 class='estiloH3' >No existe ning\xFAn alumno todav\xEDa</h3>");
			}
        },
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");document.cookie= "";location.href="#pageLogin";
		}
	});
}

function almacenarNuevaAsistencia(idGrupo){
	var cad = "[[{\"id\":\"" + idGrupo + "\"}],[";	
	cad = cad + JSON.stringify($("#formListaAluAsistencia").serializeObject()) + "]]";

	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'almacenarAsistencias',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){

			arrayRespuesta = eval(respuesta);
			location.href='#mostrarListadoAlumnos';
			
        },
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");document.cookie= "";location.href="#pageLogin";
		}
	});
	
	
}

function mostrarListaGruposModAsistencia(idAsignaturaSel){

	var cad = "[{\"id\":\"" + idAsignaturaSel + "\",\"dni\":\""+dni+"\"}]";
	dniMod = dni;
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'obtenerGruposAlumnoAsignatura',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
				
			arrayRespuesta = eval(respuesta);
			
			var i;

			var codhtml = '<select name="select-native-4Asis" id="cbGruposAlModAsis" >';
			codhtml= codhtml + '<option value="0" disabled selected> Seleccione grupo </option>';
			
			if(arrayRespuesta[0].length != 0){
				
				codhtml = codhtml + '<optgroup label="Teor\xeda">';
				for(i = 0; i < arrayRespuesta[0].length; i++){
					if(arrayRespuesta[0][i]["Turno"]=='M'){
						codhtml = codhtml + '<option value="'+arrayRespuesta[0][i]["idGrupo"]+'">Grupo '+arrayRespuesta[0][i]["Descripcion"]+' - Turno Ma\xf1ana</option>';
					}else{
						codhtml = codhtml + '<option value="'+arrayRespuesta[0][i]["idGrupo"]+'">Grupo '+arrayRespuesta[0][i]["Descripcion"]+' - Turno Tarde</option>';
					}
				}
				codhtml = codhtml + '</optgroup>';
				
			}

			if(arrayRespuesta[1].length != 0){
				codhtml = codhtml + '<optgroup label="Pr\xe1cticas">';
				for(i = 0; i < arrayRespuesta[1].length; i++){
						codhtml = codhtml + '<option value="'+arrayRespuesta[1][i]["idGrupo"]+'">Grupo '+arrayRespuesta[1][i]["Descripcion"]+' Horario: '+ arrayRespuesta[1][i]["hora_comienzo"] +' - ' + arrayRespuesta[1][i]["hora_fin"]+'</option>';	
				}
				codhtml = codhtml + '</optgroup>';
			}
			codhtml =codhtml + '</select>';

			$('#elegirGrupoModAsis').html(codhtml);
			$('#calificacionAlumnos').trigger('create');
			
			$('#cbGruposAlModAsis').change(function() {
				idTitulacionSeleccionada = $('#cbGruposAlModAsis').val();
				motrarListaAlumnosAsistMod($('#cbGruposAlModAsis').val());
			});
			
        },
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");document.cookie= "";location.href="#pageLogin";
		},
		beforeSend: function(){
			$('#cargando4').show();
			$('#panelContenidoAsignaturaAlum').hide();
		},
		complete: function(){
			$('#cargando4').hide();
			$('#panelContenidoAsignaturaAlum').show();
		}
	});
	
}

function motrarListaAlumnosAsistMod(idGrupo){
	var cad = "[{\"id\":\"" + idGrupo + "\",\"dni\":\""+dniMod+"\"}]";

	grupoSel = idGrupo;
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'obtenerAsistenciasAlumnoGrupo',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			
			arrayRespuesta = eval(respuesta);
			
			var i;
			var codhtml = '<fieldset data-role="controlgroup">';

			if(arrayRespuesta.length != 0){
				$('#btUpdAsistencia').show();
				for(i = 0; i < arrayRespuesta.length; i++){
					if(arrayRespuesta[i]["asistencia"] == 1){
						codhtml = codhtml + '<input type="checkbox" name="'+ arrayRespuesta[i]["id_RecuentoAsist"] +'" id="'+ arrayRespuesta[i]["id_RecuentoAsist"] +'" checked>';
					}else{
						codhtml = codhtml + '<input type="checkbox" name="'+ arrayRespuesta[i]["id_RecuentoAsist"] +'" id="'+ arrayRespuesta[i]["id_RecuentoAsist"] +'">';

					}
					codhtml = codhtml + '<label for="'+ arrayRespuesta[i]["id_RecuentoAsist"] +'"> Fecha/Hora: ' + arrayRespuesta[i]["fecha_hora"] + ' </label>';
				}
				codhtml = codhtml + '</ul>';
				

				$('#ContenidoModificarAsis').html(codhtml);
				$('#calificacionAlumnos').trigger('create');
				
			}else{
				$('#btUpdAsistencia').hide();
				$('#ContenidoModificarAsis').html("<h3 class='estiloH3' >No existe ninguna asistencia todav\xEDa</h3>");
			}
        },
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");document.cookie= "";location.href="#pageLogin";
		}
	});
}

function actualizarAsistencia(){
	var cad = "[[{\"id\":\"" + grupoSel + "\",\"dni\":\""+dniMod+"\"}],[";
	cad = cad + JSON.stringify($("#formCalificAlumnoAsistencia").serializeObject()) + "]]";

	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'actualizarDatosAsistencia',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){

			arrayRespuesta = eval(respuesta);
			location.href='#mostrarListadoAlumnos';
		
        },
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");document.cookie= "";location.href="#pageLogin";
		}
	});
	
}