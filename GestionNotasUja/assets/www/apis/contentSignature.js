var idAsignaturaSeleccionada = 0;

function mostrarListaAlumnos(idAsignatura){
	alert(idAsignatura);
	
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
			
			var i;
			arrayRespuesta = eval(respuesta);
			
			if(arrayRespuesta.length != 0){
				alert("Hay datos");
				var codhtml = '<ul data-role="listview" id="listaAl" data-filter="true">';
				
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<li><a href="" onclick="mostrarAlumno('+ arrayRespuesta[i]["dni"] +')" >'+ arrayRespuesta[i]["apellidos"] +', ' + arrayRespuesta[i]["nombre"] +'</li>';
				}
				codhtml = codhtml + '</ul>';
				alert(codhtml);	
				
				$('#listaAlumnos').html(codhtml);
				location.href = "#mostrarListadoAlumnos";
				
				$('#listadoAl').refresh();
				$('#listadoAlumnos').trigger('create');
				
				
				//location.href = "#mostrarListadoAlumnos";
				
				
			}else{
				alert("No tiene alumnos");
			}
			
			location.href = "#mostrarListadoAlumnos";
			
        },
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
}