/*----------- VARIABLES GLOBALES -----------*/
var pestanaSeleccionada = '';
var idAsignaturaSeleccionada = '';

//¿Se ha insertado información en los contenedores? Por Defecto TRUE
var numeroParcialTeoria = 1;
var numeroParcialPractica = 1;
var numeroParcialTrabajos = 1;

var asignaturaConfi='';


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
						codhtmlTeoria = codhtmlTeoria + '<br>' + arrayRespuesta[0][i]["descripcion"] + '<input data-theme="d" type="number" name="name" id="' +arrayRespuesta[0][i]["id"] + '"  value="' + arrayRespuesta[0][i]["porcentaje"]+'"<br>';
					}
				}else{
					codhtmlTeoria = 'No hay Teoria';
					numeroParcialTeoria = 0;
				}
				
				if(arrayRespuesta[1].length != 0){
					for(i = 0; i < arrayRespuesta[1].length;i++){
						codhtmlPracticas = codhtmlPracticas + '<br>' + arrayRespuesta[1][i]["descripcion"] + '<input data-theme="d" type="number" name="name" id="' +arrayRespuesta[1][i]["id"] + '"  value="' + arrayRespuesta[1][i]["porcentaje"]+'"<br>';
					}
				}else{
					codhtmlPracticas = 'No hay Practicas';
					numeroParcialPractica = 0;
				}
				
				if(arrayRespuesta[2].length != 0){
					for(i = 0; i < arrayRespuesta[2].length;i++){
						codhtmlTrabajos = codhtmlTrabajos + '<br>' + arrayRespuesta[2][i]["descripcion"] + '<input data-theme="d" type="number" name="name" id="' +arrayRespuesta[2][i]["id"] + '"  value="' + arrayRespuesta[2][i]["porcentaje"]+'"<br>';
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


function opcionesConfAsig(idAsignatura){
	var cad = "[{\"id\":\"" + idAsignatura + "\"}]";
	var codhtml='';

	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'esResponsable',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
			codhtml='<ul data-role="listview" id="listaOpcionesAsignatura">';

            if (arrayRespuesta["ok"] == 0){
				codhtml=codhtml + '<li data-icon="plus"><a onclick="configuracionAsig(asignaturaSeleccionadaOpciones)">Añadir Materia</a></li>';
				codhtml=codhtml + '<li data-icon="edit"><a onclick="introducirGrupoDisponible('+idAsignatura+')">Inscripción en grupos</a></li>';
				codhtml=codhtml + '<li data-icon="edit"><a onclick="introducirValoresPorcentajes('+idAsignatura+')">Modificar Porcentajes</a></li>';
				codhtml=codhtml + '<li data-icon="trash"><a onclick="eliminarAsigProfesor('+idAsignatura+')">Eliminar </a></li>';
			}else{
				codhtml=codhtml +'<li data-icon="plus"><a onclick="configuracionAsig(asignaturaSeleccionadaOpciones)">Añadir Materia</a></li>';
				codhtml=codhtml + '<li data-icon="edit"><a onclick="actualizarGestionGrupos('+idAsignatura+')">Gestión de grupos</a></li>';
				codhtml=codhtml + '<li data-icon="edit"><a onclick="introducirGrupoDisponible('+idAsignatura+')">Inscripción en grupos</a></li>';
				codhtml=codhtml + '<li data-icon="edit"><a onclick="introducirValoresPorcentajes('+idAsignatura+')">Modificar Porcentajes</a></li>';
				codhtml=codhtml + '<li data-icon="trash"><a onclick="eliminarAsigProfesor('+idAsignatura+')">Eliminar </a></li>';
			}
            codhtml = codhtml + '</ul>';
            $('#contenidoOpAsig').html(codhtml);
            $('#opcionesAsignatura').trigger('create');
            //$('#listaOpcionesAsignatura').listview();
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
}


function introducirValoresPorcentajes(idAsignatura){
	var cad = "[{\"id\":\"" + idAsignatura + "\"}]";
	location.href='#pageAddPorcentaje';
	var codhtml='';
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'introdPorcent',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
			
			codhtml= '<label for="textinput4">Porcentaje Teoria:</label> <div id="diTeoria">';
			codhtml=codhtml+ '<input type="number" name="'+ arrayRespuesta[0]["id"]+ '" id="porcentajeT" value="'+ arrayRespuesta[0]["porcentaje"]+ '" /></div>';
			codhtml=codhtml+ '<label for="textinput4">Puntuación mínima:</label> <div id="diTeoria">';
			codhtml=codhtml+ '<input type="number" name="M'+ arrayRespuesta[0]["id"]+ '" id="porcentajeTMin" value="'+ arrayRespuesta[0]["minimo"] +'" /></div>';
			
			codhtml=codhtml+ '<hr>';
			codhtml=codhtml+ '<label for="textinput4">Porcentaje Práctica:</label> <div id="diPractica">';
			codhtml=codhtml+ '<input type="number" name="'+ arrayRespuesta[1]["id"]+ '" id="porcentajeP" value="'+ arrayRespuesta[1]["porcentaje"]+ '" /></div>';
			codhtml=codhtml+ '<label for="textinput4">Puntuación mínima:</label> <div id="diPractica">';
			codhtml=codhtml+ '<input type="number" name="M'+ arrayRespuesta[1]["id"]+ '" id="porcentajePMin" value="'+ arrayRespuesta[1]["minimo"]+ '" /></div>';
			
			codhtml=codhtml+ '<hr>';
			codhtml=codhtml+ '<label for="textinput4">Porcentaje Asistencia:</label> <div id="diAsistencia">';
			codhtml=codhtml+ '<input type="number" name="'+ arrayRespuesta[2]["id"]+ '" id="porcentajeA" value="'+ arrayRespuesta[2]["porcentaje"]+ '" /></div>';
			codhtml=codhtml+ '<label for="textinput4">Puntuación mínima:</label> <div id="diAsistencia">';
			codhtml=codhtml+ '<input type="number" name="M'+ arrayRespuesta[2]["id"]+ '" id="porcentajeAMin" value="'+ arrayRespuesta[2]["minimo"]+ '" /></div>';
			
			codhtml=codhtml+ '<hr>';
			codhtml=codhtml+ '<label for="textinput5">Porcentaje Trabajos:</label> <div id="diTrabajos">';
			codhtml=codhtml+ '<input type="number" name="'+ arrayRespuesta[3]["id"]+ '" id="porcentajeTV" value="'+ arrayRespuesta[3]["porcentaje"]+ '" /></div>';
			codhtml=codhtml+ '<label for="textinput5">Puntuación mínima:</label> <div id="diTrabajos">';
			codhtml=codhtml+ '<input type="number" name="M'+ arrayRespuesta[3]["id"]+ '" id="porcentajeTVMin" value="'+ arrayRespuesta[3]["minimo"]+ '" /></div>';

            
			$('#porcentajesActualiz').html(codhtml);
			$('#porcentajesActualiz').show();
			$('#porcentajesInsercc').hide();
			$('#btPorcActual').show();
			$('#btPorcInserc').hide();			
			
            $('#pageAddPorcentaje').trigger('create');

		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
	
}

function actualizarPorcentajes(){
	var cad = "[" + JSON.stringify($("#formPorcentajesAct").serializeObject()) + "]";
	alert(cad);
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'actualizaPorcent',
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

function actualizarGestionGrupos(idAsignatura){
	
	asignaturaConfi = idAsignatura;
	var cad = "[{\"id\":\"" + idAsignatura + "\"}]";
	var codhtmlT='';
	var codhtmlP='';
	$('#DivGruposTeoriaUpd').empty();
	$('#DivGruposPracticasUpd').empty();
	location.href='#pageUpdGruposTeoria';
	var i;

	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'gestionGrupos',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
			
			
			for(i = 0; i < arrayRespuesta[0].length;i++){
				alert("entra");
				codhtmlT = codhtmlT + '<div align="center" class="'+ arrayRespuesta[0][i]["idGrupo"] +'">';
				
				codhtmlT = codhtmlT + '<div data-role="controlgroup">';

				codhtmlT = codhtmlT + '<select id=\"D'+ arrayRespuesta[0][i]["idGrupo"] + '\" name=\"D'+ arrayRespuesta[0][i]["idGrupo"] +'\" >';
				
				codhtmlT = codhtmlT + '<option value="A">Grupo A</option>';
				codhtmlT = codhtmlT + '<option value="B">Grupo B</option>';
				codhtmlT = codhtmlT + '<option value="C">Grupo C</option>';
				codhtmlT = codhtmlT + '<option value="D">Grupo D</option>';
				codhtmlT = codhtmlT + '<option value="E">Grupo E</option>';
				codhtmlT = codhtmlT + '<option value="F">Grupo F</option>';
				codhtmlT = codhtmlT + '<option value="G">Grupo G</option>';
				codhtmlT = codhtmlT + '<option value="H">Grupo H</option>';
				codhtmlT = codhtmlT + '<option value="I">Grupo I</option>';
				codhtmlT = codhtmlT + '<option value="J">Grupo J</option>';
				
				codhtmlT = codhtmlT + '</select>';
				
				codhtmlT = codhtmlT + '<select id=\"T'+ arrayRespuesta[0][i]["idGrupo"] + '\" name=\"T'+ arrayRespuesta[0][i]["idGrupo"] +'\">';
				
				codhtmlT = codhtmlT + '<option value="M">Manana</option>';
				codhtmlT = codhtmlT + '<option value="T">Tarde</option>';
				
				codhtmlT = codhtmlT + '</select>';
				
				codhtmlT = codhtmlT + '</div>';
				
				codhtmlT = codhtmlT + '<a href="#" data-inline="true" data-role="button" onclick="javascript:borrarGrupoTeoriaAlmac('+ arrayRespuesta[0][i]["idGrupo"] +');">Borrar</a>';
				
				codhtmlT = codhtmlT + '</div> <br>';
				
				
				$('#DivGruposTeoriaUpd').append(codhtmlT);
				$("#T"+ arrayRespuesta[0][i]["idGrupo"] +" option[value="+ arrayRespuesta[0][i]["Turno"] +"]").attr("selected",true);
				$("#D"+ arrayRespuesta[0][i]["idGrupo"] +" option[value="+ arrayRespuesta[0][i]["Descripcion"] +"]").attr("selected",true);
			}
			$('#pageUpdGruposTeoria').trigger('create');
			
			
			//Parte de practicas
			for(i = 0; i < arrayRespuesta[1].length;i++){
				codhtmlP = codhtmlP + '<div align="center" class="'+ arrayRespuesta[1][i]["idGrupo"] +'">';
				
				codhtmlP = codhtmlP + '<div data-role="controlgroup">';
				
				codhtmlP = codhtmlP + '<select id=\"D'+arrayRespuesta[1][i]["idGrupo"] +'\" name="D'+ arrayRespuesta[1][i]["idGrupo"] +'" >';
				
				codhtmlP = codhtmlP + '<option value="1">Grupo 1</option>';
				codhtmlP = codhtmlP + '<option value="2">Grupo 2</option>';
				codhtmlP = codhtmlP + '<option value="3">Grupo 3</option>';
				codhtmlP = codhtmlP + '<option value="4">Grupo 4</option>';
				codhtmlP = codhtmlP + '<option value="5">Grupo 5</option>';
				codhtmlP = codhtmlP + '<option value="6">Grupo 6</option>';
				codhtmlP = codhtmlP + '<option value="7">Grupo 7</option>';
				codhtmlP = codhtmlP + '<option value="8">Grupo 8</option>';
				codhtmlP = codhtmlP + '<option value="9">Grupo 9</option>';
				codhtmlP = codhtmlP + '<option value="10">Grupo 10</option>';
				
				codhtmlP = codhtmlP + '</select>';
				
				
				codhtmlP = codhtmlP + '<select id=\"hC'+arrayRespuesta[1][i]["idGrupo"] +'\" name="hC'+ arrayRespuesta[1][i]["idGrupo"] +'" >';
				
				codhtmlP = codhtmlP + '<option value="09:30:00">9:30</option>';
				codhtmlP = codhtmlP + '<option value="10:30:00">10:30</option>';
				codhtmlP = codhtmlP + '<option value="11:30:00">11:30</option>';
				codhtmlP = codhtmlP + '<option value="12:30:00">12:30</option>';
				codhtmlP = codhtmlP + '<option value="13:30:00">13:30</option>';
				codhtmlP = codhtmlP + '<option value="14:30:00">14:30</option>';
				codhtmlP = codhtmlP + '<option value="15:30:00">15:30</option>';
				codhtmlP = codhtmlP + '<option value="16:30:00">16:30</option>';
				codhtmlP = codhtmlP + '<option value="17:30:00">17:30</option>';
				codhtmlP = codhtmlP + '<option value="18:30:00">18:30</option>';
				codhtmlP = codhtmlP + '<option value="19:30:00">19:30</option>';
				codhtmlP = codhtmlP + '<option value="20:30:00">20:30</option>';
				codhtmlP = codhtmlP + '<option value="21:30:00">21:30</option>';
				
				
				codhtmlP = codhtmlP + '</select>';
				
				
				codhtmlP = codhtmlP + '<select id=\"hF'+arrayRespuesta[1][i]["idGrupo"] +'\" name="hF'+ arrayRespuesta[1][i]["idGrupo"] +'" >';
				
				codhtmlP = codhtmlP + '<option value="09:30:00">9:30</option>';
				codhtmlP = codhtmlP + '<option value="10:30:00">10:30</option>';
				codhtmlP = codhtmlP + '<option value="11:30:00">11:30</option>';
				codhtmlP = codhtmlP + '<option value="12:30:00">12:30</option>';
				codhtmlP = codhtmlP + '<option value="13:30:00">13:30</option>';
				codhtmlP = codhtmlP + '<option value="14:30:00">14:30</option>';
				codhtmlP = codhtmlP + '<option value="15:30:00">15:30</option>';
				codhtmlP = codhtmlP + '<option value="16:30:00">16:30</option>';
				codhtmlP = codhtmlP + '<option value="17:30:00">17:30</option>';
				codhtmlP = codhtmlP + '<option value="18:30:00">18:30</option>';
				codhtmlP = codhtmlP + '<option value="19:30:00">19:30</option>';
				codhtmlP = codhtmlP + '<option value="20:30:00">20:30</option>';
				codhtmlP = codhtmlP + '<option value="21:30:00">21:30</option>';
				
				codhtmlP = codhtmlP + '</select>';
				
				codhtmlP = codhtmlP + '</div>';
				
				codhtmlP = codhtmlP + '<a href="#" data-inline="true" data-role="button" onclick="javascript:borrarGrupoPracticasAlmac('+ arrayRespuesta[1][i]["idGrupo"] +');">Borrar</a>';
				
				codhtmlP = codhtmlP + '</div><br>';

				$('#DivGruposPracticasUpd').append(codhtmlP);
				$("#D"+ arrayRespuesta[1][i]["idGrupo"] +" option[value="+ arrayRespuesta[1][i]["Descripcion"] +"]").attr("selected",true);
				$("#hC"+ arrayRespuesta[1][i]["idGrupo"] +" option[value='"+ arrayRespuesta[1][i]["horaC"] +"']").attr("selected",true);
				$("#hF"+ arrayRespuesta[1][i]["idGrupo"] +" option[value='"+ arrayRespuesta[1][i]["horaF"] +"']").attr("selected",true);
				
			}
			$('#listaGruposPracticasUpd').trigger('create');


		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		}
	});
	
}

function almacenarInformacionResponsableUpd(){
	var codT='';
	var cad = "[{\"idAsig\":\"" + asignaturaConfi + "\"}]";
	codT ="["+ cad +",["+ JSON.stringify($("#formGruposTeoriaUpd").serializeObject())+"],[";

	codT = codT + JSON.stringify($("#formGruposPracticasUpd").serializeObject())+"]]";
	alert(codT);

	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'actualizarGrupos',
			'datos':codT
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			//titulaciones

			arrayRespuesta = eval(respuesta);
			if (arrayRespuesta["ok"] == 1){
				location.href="#pageSignatures";
			}

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

function borrarGrupoTeoriaAlmac(idGrupo){
	var cad = "[{\"idGrupo\":\"" + idGrupo + "\"}]";
	$("div."+idGrupo).remove();
	$('#pageUpdGruposTeoria').trigger('create');
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'borrarGrupo',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			//titulaciones

			arrayRespuesta = eval(respuesta);
			if (arrayRespuesta["ok"] != 0){
				alert("Correcot");
				
			}

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

function borrarGrupoPracticasAlmac(idGrupo){
	var cad = "[{\"idGrupo\":\"" + idGrupo + "\"}]";
	$("div."+idGrupo).remove();
	$('#pageUpdGruposPracticas').trigger('create');
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'borrarGrupo',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			//titulaciones

			arrayRespuesta = eval(respuesta);
			if (arrayRespuesta["ok"] != 0){
				alert("Correcot");
				
			}

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

function eliminarAsigProfesor(idAsignatura){
	var cad = "[{\"idAsig\":\"" + idAsignatura + "\"}]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'eliminarAsigProf',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			//titulaciones

			arrayRespuesta = eval(respuesta);
			if (arrayRespuesta["ok"] == 1){
				peticionAsignaturas();
				location.href="#pageSignatures";
			}

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