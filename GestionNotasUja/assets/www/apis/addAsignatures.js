function peticionAnadirAsignatura(){
	var cad = "[" + JSON.stringify($("#formAnadeAsignatura").serializeObject()) + "]";
	alert(cad);
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'addasig',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			//alert(respuesta);
			arrayRespuesta = eval(respuesta);
            if (arrayRespuesta["ok"] == 0){
				alert('Creación de asignatura incorrecta');
				navigator.notification.alert('Error al crear asignatura',null,'Nueva asignatura', 'Aceptar');
			}else{
				//Guardamos el Id de la sessión
				alert("Correcto");
				//Cargamos de nuevo la lista de asignaturas
				peticionAsignaturas(); //Lista de asignaturas del profesor
				location.href = "#pageSignatures";
			}
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
	
}

function peticionTitulaciones(){
	var cad = "[]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'ltit',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			alert(respuesta);
			//titulaciones
			
			arrayRespuesta = eval(respuesta);

			var i;
			var codhtml = '<p>Titulacion</p>'; 
			codhtml = codhtml + '<select id="menuTitulaciones" name="titulacion" >';
			if(arrayRespuesta.length != 0){
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<option value="'+ arrayRespuesta[i]["id"] +'">'+ arrayRespuesta[i]["nombre"] +'</option>';
				}
				codhtml = codhtml + '</select>';
				
				$('#titulaciones').html(codhtml);
				$('#menuTitulaciones').selectmenu();
			}
			
			$('#menuTitulaciones').change(function() {
				peticionAsignaturasTitulacion($('#menuTitulaciones').val());
			});
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		},
		beforeSend: function(){
			$('#cargando2').show();
			$('#listarAsignaturasTitulacion').hide();
		},
		complete: function(){
			$('#cargando2').hide();
			$('#listarAsignaturasTitulacion').show();
		}
	});
	
}


function peticionAsignaturasTitulacion(idTitulacion){
	var cad = "[{\"titulacion\":\""+ idTitulacion +"\"}]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'lasigtit',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			alert(idTitulacion);
			
			//Asignaturas pertenecientes a una titulación
			arrayRespuesta = eval(respuesta);

			var i;
			var codhtml = '<p>Asignaturas</p>';
			if(arrayRespuesta.length != 0){
				codhtml = codhtml + '<select id="menuAsigntauras" name="asignaturaTitulacion" >';
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<option value="'+ arrayRespuesta[i]["id"] +'">'+ arrayRespuesta[i]["nombre"] +'</option>';
				}
				codhtml = codhtml + '</select>';
			}else{
				codhtml = "<p>No hay asignaturas</p>";
			}
			
			$('#asignaturaElegida').html(codhtml);
			$('#menuAsigntauras').selectmenu();
			
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		},
		beforeSend: function(){
			$('#cargando2').show();
			$('#listarAsignaturasTitulacion').hide();
		},
		complete: function(){
			$('#cargando2').hide();
			$('#listarAsignaturasTitulacion').show();
		}
	});
	
}

