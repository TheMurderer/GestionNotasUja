function calificarAlumno(dniAlumno, idAsignatura){
	var cad = "[{\"dni\":\""+ dniAlumno +"\", \"idAsig\":\"" +idAsignatura +"\"}]";
	alert("hola");
	alert(dniAlumno);
	location.href = "#calificacionAlumnos";
	
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
			alert("Entra aki");

			
			//Asignaturas pertenecientes a una titulación
			arrayRespuesta = eval(respuesta);
			
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
}