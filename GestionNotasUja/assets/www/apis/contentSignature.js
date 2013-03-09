var idAsignaturaSeleccionada = 0;

function mostrarListaAlumnos(idAsignatura){
	
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
			
			arrayRespuesta = eval(respuesta);
			
			var i;
			var codhtml = '<ul data-role="listview" data-filter="true" id="listadoAlumnos">';
			if(arrayRespuesta.length != 0){
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<li><a href="" onclick="" >'+ arrayRespuesta[i]["apellidos"] + ',' + arrayRespuesta[i]["nombre"] +'</a></li>';
				}
				codhtml = codhtml + '</ul>';
				
				$('#listaAlumnos').html(codhtml);
				$('#listadoAlumnos').listview();
				
			}else{
				$('#listaAlumnos').html("<h3>No se hay ningún alumno todavia</h3>");
			}
        },
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
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