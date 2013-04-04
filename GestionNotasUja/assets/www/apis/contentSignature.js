/*----------- VARIABLES GLOBALES -----------*/
var idAsignaturaSeleccionada = 0;


/*----------- PETICIONES JSON -----------*/

/*************************************************************************
 ** @name 		 		 : mostrarListaAlumnos
 ** @description 		 : Petici�n json para obtener la lista de alumnos 
 **						   de una asignatura
 ** @param idAsignatura  : Id de la asignatura de la cual se desea mostrar
 **						   la lista de alumnos
 *************************************************************************/
function mostrarListaAlumnos(idAsignatura){
	$('#listaAlumnos').empty();
	location.href = "#mostrarListadoAlumnos";
	
	idAsignaturaSeleccionada = idAsignatura;
	
	var cad = "[{\"id\":\"" + idAsignaturaSeleccionada + "\"}]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'listAlum',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			obtenerGruposAsignatura();
			arrayRespuesta = eval(respuesta);
			
			var i;
			var codhtml = '<ul data-role="listview" data-filter="true" id="listadoAlumnos">';
			if(arrayRespuesta.length != 0){
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<li><a href="javascript:calificarAlumno(\''+ arrayRespuesta[i]["dni"] + '\',' +idAsignatura +');" onclick="" >'+ arrayRespuesta[i]["apellidos"] + ', ' + arrayRespuesta[i]["nombre"] +'</a></li>';
				}
				codhtml = codhtml + '</ul>';
				
				$('#listaAlumnos').html(codhtml);
				$('#listadoAlumnos').listview();
				
			}else{
				$('#listaAlumnos').html("<h3>No existe ning\xfan alumno todavia</h3>");
			}
        },
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR K�...");
		}
	});
}

function obtenerGruposAsignatura(){
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

			var codhtml = '<select name="select-native-4" id="cbGruposAl" >';
			codhtml= codhtml + '<option value="0" disabled selected> Seleccione grupo</option>';
			if(arrayRespuesta[0].length != 0){
				
				codhtml = codhtml + '<optgroup label="Teor�a">';
				for(i = 0; i < arrayRespuesta[0].length; i++){
					if(arrayRespuesta[0][i]["Turno"]=='M'){
						codhtml = codhtml + '<option value="'+arrayRespuesta[0][i]["idGrupo"]+'">Grupo '+arrayRespuesta[0][i]["Descripcion"]+' - Turno Ma�ana</option>';
					}else{
						codhtml = codhtml + '<option value="'+arrayRespuesta[0][i]["idGrupo"]+'">Grupo '+arrayRespuesta[0][i]["Descripcion"]+' - Turno Tarde</option>';
					}
				}
				codhtml = codhtml + '</optgroup>';
				
			}

			if(arrayRespuesta[1].length != 0){
				codhtml = codhtml + '<optgroup label="Pr�cticas">';
				for(i = 0; i < arrayRespuesta[1].length; i++){
						codhtml = codhtml + '<option value="'+arrayRespuesta[1][i]["idGrupo"]+'">Grupo '+arrayRespuesta[1][i]["Descripcion"]+' Horario: '+ arrayRespuesta[1][i]["hora_comienzo"] +' - ' + arrayRespuesta[1][i]["hora_fin"]+'</option>';	
				}
				codhtml = codhtml + '</optgroup>';
			}
			codhtml =codhtml + '</select>';

			$('#divGrupoAlumno').html(codhtml);
			$('#mostrarListadoAlumnos').trigger('create');
			
			$('#cbGruposAl').change(function() {
				idTitulacionSeleccionada = $('#cbGruposAl').val();
				motrarListaAlumnos($('#cbGruposAl').val());
			});
			
        },
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR K�...");
		},
		beforeSend: function(){
			$('#cargando3').show();
			$('#listaAlumnos').hide();
		},
		complete: function(){
			$('#cargando3').hide();
			$('#listaAlumnos').show();
		}
	});
	
}

function motrarListaAlumnos(id){
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
			var codhtml = '<ul data-role="listview" data-filter="true" id="listadoAlumnos">';

			if(arrayRespuesta.length != 0){
				
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<li><a href="javascript:calificarAlumno(\''+ arrayRespuesta[i]["dni"] + '\',' +id+');" onclick="" >'+ arrayRespuesta[i]["apellidos"] + ', ' + arrayRespuesta[i]["nombre"] +'</a></li>';
				}
				codhtml = codhtml + '</ul>';

				$('#listaAlumnos').html(codhtml);
				$('#mostrarListadoAlumnos').trigger('create');
				
			}else{
				$('#listaAlumnos').html("<h3>No existe ning\xfan alumno matriculado a/xfan</h3>");
			}
        },
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR K�...");
		},
		beforeSend: function(){
			$('#cargando3').show();
			$('#listaAlumnos').hide();
		},
		complete: function(){
			$('#cargando3').hide();
			$('#listaAlumnos').show();
		}
	});
}