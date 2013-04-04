var pestanaSeleccionada='';
var idAsignaturaSel='';
var numPetProfesor='';
var numPetAlumno='';

function mostrarPeticiones(idAsignatura){
	var cad = "[{\"idAsig\":\"" + idAsignatura + "\"}]";
	$('#panelConfiguracionAsignatura').hide();
	$('#petDIVProfesor').empty();
	$('#petDIVAlumno').empty();
	
	idAsignaturaSel = idAsignatura;
	mostrarDIVPet('P');
	location.href='#pagePeticiones';
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'mostrarPeticionesTot',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			var i;
			arrayRespuesta = eval(respuesta);
			var codPetAlumno='<fieldset data-role="controlgroup">';
			var codPetProfesor='<fieldset data-role="controlgroup">';
			
			numPetProfesor = arrayRespuesta[0].length;
			if(arrayRespuesta[0].length != 0){
				
				for(i = 0; i < arrayRespuesta[0].length;i++){
					codPetProfesor = codPetProfesor + '<input type="checkbox" name="'+arrayRespuesta[0][i]["idPeticion"] +'" id="'+arrayRespuesta[0][i]["idPeticion"]+'">';
					codPetProfesor = codPetProfesor + '<label for="'+arrayRespuesta[0][i]["idPeticion"] +'">' + arrayRespuesta[0][i]["nombre"] + ' ' + arrayRespuesta[0][i]["apellidos"] + ' Grupo: ' + arrayRespuesta[0][i]["Descripcion"]+' </label>';
				}
			}
			
			numPetAlumno = arrayRespuesta[1].length;
			if(arrayRespuesta[1].length != 0){
				for(i = 0; i < arrayRespuesta[1].length;i++){
					var nomUsuario = arrayRespuesta[1][i]["correo"];
					nomUsuario = nomUsuario.substring(0,nomUsuario.lastIndexOf('@'));
					codPetAlumno = codPetAlumno + '<input type="checkbox" name="'+arrayRespuesta[1][i]["idPeticion"] +'" id="'+arrayRespuesta[1][i]["idPeticion"]+'">';
					codPetAlumno = codPetAlumno + '<label for="'+arrayRespuesta[1][i]["idPeticion"] +'">' + arrayRespuesta[1][i]["nombre"] + ' ' + arrayRespuesta[1][i]["apellidos"] +' (' + nomUsuario +') Grupo: ' + arrayRespuesta[1][i]["Descripcion"]+' </label>';
				}
			}

			
			$('#petDIVAlumno').html(codPetAlumno);
            $('#petDIVProfesor').html(codPetProfesor);
            $('#pagePeticiones').trigger('create');
            //$('#listaOpcionesAsignatura').listview();
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		},
		beforeSend: function(){
			$('#cargando10').show();
			$('#panelConfiguracionAsignatura').hide();
			$('#btPetic').hide();
		},
		complete: function(){
			$('#cargando10').hide();
			$('#panelConfiguracionAsignatura').show();
			if(numPetProfesor!=0){
				$('#btPetic').show();
			}else{
				$('#btPetic').hide();
			}

		}
	});
}

function mostrarDIVPet(valor){
	if(valor =='P'){
		pestanaSeleccionada = 'P';
		$('#profePeticion').addClass("ui-btn-active");
		$('#alumnoPeticion').removeClass("ui-btn-active");
		
		$('#petDIVProfesor').show();
		$('#petDIVAlumno').hide();
		
		if(numPetProfesor!=0){
			$('#btPetic').show();
		}else{
			$('#btPetic').hide();
		}
		
	}else if(valor=='A'){
		pestanaSeleccionada = 'A';
		
		$('#petDIVAlumno').show();
		$('#petDIVProfesor').hide();

		if(numPetAlumno!=0){
			$('#btPetic').show();
		}else{
			$('#btPetic').hide();
		}
	}
}

function aceptarPeticiones(){
	
	if(pestanaSeleccionada=='P'){
		var cad ="["+ JSON.stringify($("#formProfesor").serializeObject())+"]";

		$.ajax({
			type: "GET",
			url: p_url,
			dataType: 'jsonp',
			data: {
				'm':'acepPetProfesor',
				'datos':cad
			},
			contentType:'application/json; charset=utf-8',
			success: function(respuesta){
				arrayRespuesta = eval(respuesta);
				if(arrayRespuesta["ok"] == 1){
					location.href="#pageSignatures";
				}
				
			},
			error: function(respuesta){
				alert("ERROR, YO NO ENTIENDO PUR KÉ...");
			}
		});
		
	}else if(pestanaSeleccionada=='A'){
		var cad ="["+ JSON.stringify($("#formAlumno").serializeObject())+"]";
		
		$.ajax({
			type: "GET",
			url: p_url,
			dataType: 'jsonp',
			data: {
				'm':'acepPetAlumno',
				'datos':cad
			},
			contentType:'application/json; charset=utf-8',
			success: function(respuesta){
				arrayRespuesta = eval(respuesta);
				if(arrayRespuesta["ok"] == 1){
					location.href="#pageSignatures";
				}
				
			},
			error: function(respuesta){
				alert("ERROR, YO NO ENTIENDO PUR KÉ...");
			}
		});
	}
	
	
}

function mostrarPeticionesAlumno(idAsignatura){
	var cad = "[{\"idAsig\":\"" + idAsignatura + "\"}]";
	idAsignaturaSel = idAsignatura;

	location.href='#pagePeticionesAlumno';
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'mostrarPeticionesTot',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			var i;
			arrayRespuesta = eval(respuesta);
			var codPetAlumno='<fieldset data-role="controlgroup">';

			numPetAlumno = arrayRespuesta[1].length;
			if(arrayRespuesta[1].length != 0){
				for(i = 0; i < arrayRespuesta[1].length;i++){
					var nomUsuario = arrayRespuesta[1][i]["correo"];
					nomUsuario = nomUsuario.substring(0,nomUsuario.lastIndexOf('@'));
					codPetAlumno = codPetAlumno + '<input type="checkbox" name="'+arrayRespuesta[1][i]["idPeticion"] +'" id="'+arrayRespuesta[1][i]["idPeticion"]+'">';
					codPetAlumno = codPetAlumno + '<label for="'+arrayRespuesta[1][i]["idPeticion"] +'">' + arrayRespuesta[1][i]["nombre"] + ' ' + arrayRespuesta[1][i]["apellidos"] +' (' + nomUsuario +') Grupo: ' + arrayRespuesta[1][i]["Descripcion"]+' </label>';
				}
			}
			$('#petDIVAlAlumno').html(codPetAlumno);

            $('#pagePeticionesAlumno').trigger('create');
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		},
		beforeSend: function(){
			$('#cargando11').show();
			$('#panelConfiguracionAsignatura').hide();
			$('#petDIVAlAlumno').hide();
			$('#btPeticAlumno').hide();
		},
		complete: function(){
			$('#cargando11').hide();
			$('#panelConfiguracionAsignatura').show();
			$('#petDIVAlAlumno').show();
			if(numPetAlumno != 0){
				$('#btPeticAlumno').show();
			}
		}
	});
}

function aceptarPeticionesAl(){
	var cad ="["+ JSON.stringify($("#formAlumnoPetAlumno").serializeObject())+"]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'acepPetAlumno',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
			if(arrayRespuesta["ok"] == 1){
				location.href="#pageSignatures";
			}
			
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
	
}