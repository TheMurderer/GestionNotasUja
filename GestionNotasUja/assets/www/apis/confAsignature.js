/*----------- VARIABLES GLOBALES -----------*/
var pestanaSeleccionada = '';
var idAsignaturaSeleccionada = '';

//¿Se ha insertado información en los contenedores? Por Defecto TRUE
var numeroParcialTeoria = 1;
var numeroParcialPractica = 1;
var numeroParcialTrabajos = 1;


/*----------- PETICIONES JSON -----------*/

/*************************************************************************
 ** @name 		 		 : configuracionAsig
 ** @description 		 : Petición json para obtener la configuración de 
 ** 					   la asignatura
 ** @param idAsignatura  : Id de la asignatura a configurar
 *************************************************************************/
function configuracionAsig(idAsignatura){
	ocultarTodosDIV();
	var cad = "[{\"id\":\"" + idAsignatura + "\"}]";
	
	idAsignaturaSeleccionada = idAsignatura;
	
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
			var codhtmlTrabajos ="";

			
				if(arrayRespuesta[0].length != 0){
					for(i = 0; i < arrayRespuesta[0].length;i++){
						codhtmlTeoria = codhtmlTeoria + '<br>' + arrayRespuesta[0][i]["descripcion"] + '<input type="number" name="name" id="' +arrayRespuesta[0][i]["id"] + '"  value="' + arrayRespuesta[0][i]["porcentaje"]+'"<br>';
					}
				}else{
					codhtmlTeoria = 'No hay Teoria';
					numeroParcialTeoria = 0;
				}
				
				if(arrayRespuesta[1].length != 0){
					for(i = 0; i < arrayRespuesta[1].length;i++){
						codhtmlPracticas = codhtmlPracticas + '<br>' + arrayRespuesta[1][i]["descripcion"] + '<input type="number" name="name" id="' +arrayRespuesta[1][i]["id"] + '"  value="' + arrayRespuesta[1][i]["porcentaje"]+'"<br>';
					}
				}else{
					codhtmlPracticas = 'No hay Practicas';
					numeroParcialPractica = 0;
				}
				
				if(arrayRespuesta[2].length != 0){
					for(i = 0; i < arrayRespuesta[2].length;i++){
						codhtmlTrabajos = codhtmlTrabajos + '<br>' + arrayRespuesta[2][i]["descripcion"] + '<input type="number" name="name" id="' +arrayRespuesta[2][i]["id"] + '"  value="' + arrayRespuesta[2][i]["porcentaje"]+'"<br>';
					}
				}else{
					codhtmlTrabajos = 'No hay Trabajos';
					numeroParcialTrabajos = 0;
				}
				
				$('#confDIVTeoria').html(codhtmlTeoria);
				$('#confDIVPractica').html(codhtmlPracticas);
				$('#confDIVTrabajos').html(codhtmlTrabajos);
				
				$('#panelConfiguracionAsignatura').trigger('create');
				
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


/*************************************************************************
 ** @name 		 		 : modificarConfAsignatura
 ** @description 		 : Petición json para modificación de la configuración
 **						   de la asignatura
 *************************************************************************/
function modificarConfAsignatura(){
	var cad = "[{\"id\":\"" + idAsignaturaSeleccionada + "\"}]";
	var code="";
	alert(cad);
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'modconf',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){

			arrayRespuesta = eval(respuesta);
			
			$('#TitulaAsign').hide();
			$('#cargando2').hide();
			
			code="<a href=\"#\" data-role=\"button\" data-inline=\"true\" data-icon=\"\" onclick=\"actualizarConfiguracion("+idAsignaturaSeleccionada+")\"> Actualizar </a>";
			$('#botonConf').html(code);
			
			code="<input type=\"number\" name=\"porcentajeT\" id=\"porcentajeTId\" value=\""+arrayRespuesta[0]+"\" />";
			$('#diTeoria').html(code);
			
			code="<input type=\"number\" name=\"porcentajeP\" id=\"porcentajePId\" value=\""+arrayRespuesta[1]+"\" />";
			$('#diPractica').html(code);
			
			code="<input type=\"number\" name=\"porcentajeA\" id=\"porcentajeAId\" value=\""+arrayRespuesta[2]+"\" />";
			$('#diAsistencia').html(code);
			
			code="<input type=\"number\" name=\"porcentajeTV\" id=\"porcentajeVId\" value=\""+arrayRespuesta[3]+"\" />";
			$('#diTrabajos').html(code);
			$('#DivPorcentajes').trigger('create');
			$('#botonConf').trigger('create');
			
			location.href="#pageAddSignature";
			
		//location.href = "#pageConfigurationSignature";
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
		});	
}


/*************************************************************************
 ** @name 		 		 : actualizarConfiguracion
 ** @description 		 : Petición json para actualizar la configuración 
 **						   de la asignatura
 ** @param idAsignatura  : Id de la asignatura
 *************************************************************************/
function actualizarConfiguracion(idAsignatura){
	var cad ="[" + JSON.stringify($("#formAnadeAsignatura").serializeObject());
	cad = cad.replace("}","");
	cad = cad +",\"id\":\""+idAsignatura+"\"}]";
	alert(cad);
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'updconf',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
            if (arrayRespuesta["ok"] == 0){
				alert('Creación de asignatura incorrecta');
				navigator.notification.alert('Error al crear asignatura',null,'Nueva asignatura', 'Aceptar');
			}else{
				//Guardamos el Id de la sessión
				alert("Correcto");
				location.href = "#pageSignatures";
			}
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
}



/*----------- FUNCIONES -----------*/

/*************************************************************************
 ** @name 		 		 : anadirMaterial
 ** @description 		 : Añade material a la asignatura
 ** @param divContenedor : Div contenerdor de la información
 ** @param descripcion	 : Descripción del material
 ** @param puntuacion	 : Puntuación del material
 *************************************************************************/
function anadirMaterial(divContenedor, descripcion, puntuacion){
	var codhtml = '';
	var contenedor = '#' + divContenedor;
	codhtml = '<br>' + descripcion + '<input type="number" name="name" value="' + puntuacion +'"<br>';
	
	if(pestanaSeleccionada == 'T'){
		if(numeroParcialTeoria == 1){
			$(contenedor).append($(contenedor).val() + codhtml);
		}else{
			$(contenedor).html(codhtml);
			numeroParcialTeoria = 1;
		}
	}else if(pestanaSeleccionada == 'P'){
		if(numeroParcialPractica == 1){
			$(contenedor).append($(contenedor).val() + codhtml);
		}else{
			$(contenedor).html(codhtml);
			numeroParcialPractica = 1;
		}
	}else{
		if(numeroParcialTrabajos == 1){
			$(contenedor).append($(contenedor).val() + codhtml);
		}else{
			$(contenedor).html(codhtml);
			numeroParcialTrabajos = 1;
		}
	}
	
	
	$('#panelConfiguracionAsignatura').trigger('create');

}


/*************************************************************************
 ** @name 		 : mostrarDIV
 ** @description : Muestra el div de Teoría/Prácticas/Trabajos voluntarios
 ** 			   según la pestaña seleccionada
 ** @param valor : Div contenerdor de la información
 *************************************************************************/
function mostrarDIV(valor){
	if(valor == 'T'){
		pestanaSeleccionada = 'T';
		
		$('#confDIVTeoria').show();
		$('#confDIVPractica').hide();
		$('#confDIVTrabajos').hide();
		$('#panelConfiguracionAsignatura').refresh();
	}else if (valor == 'P'){
		pestanaSeleccionada = 'P';
		
		$('#confDIVTeoria').hide();
		$('#confDIVPractica').show();
		$('#confDIVTrabajos').hide();
		$('#panelConfiguracionAsignatura').refresh();
	}else{
		pestanaSeleccionada = 'TV';
		
		$('#confDIVTeoria').hide();
		$('#confDIVPractica').hide();
		$('#confDIVTrabajos').show();
		$('#panelConfiguracionAsignatura').refresh();
	}
}


/*************************************************************************
 ** @name 		 : ocultarTodosDIV
 ** @description : Oculta todos los div y deja mostrando la pestaña por defecto
 **				   (Teoría)
 *************************************************************************/
function ocultarTodosDIV(){
	pestanaSeleccionada = 'T';
	
	$('#confDIVTeoria').show();
	$('#confDIVPractica').hide();
	$('#confDIVTrabajos').hide();
}
