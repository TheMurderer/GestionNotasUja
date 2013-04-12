/*----------- VARIABLES GLOBALES -----------*/
var pestanaSeleccionada = '';
var idAsignaturaSeleccionada = '';

//¿Se ha insertado información en los contenedores? Por Defecto TRUE
var numeroParcialTeoria = 1;
var numeroParcialPractica = 1;
var numeroParcialTrabajos = 1;

var asignaturaConfi='';
var idGrupoBorrarTeoria='';
var idGrupoBorrarPractica='';


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
						codhtmlTeoria = codhtmlTeoria + '<div class="agrupacionElementos" >';
						codhtmlTeoria = codhtmlTeoria + '<br>' + arrayRespuesta[0][i]["descripcion"] + '<input data-theme="d" type="number" name="name" id="' +arrayRespuesta[0][i]["id"] + '"  value="' + arrayRespuesta[0][i]["porcentaje"]+'"<br>';
						codhtmlTeoria = codhtmlTeoria + '</div>';
					}
				}else{
					codhtmlTeoria = '<p class="letraDocumento" >No hay teoria</p>';
					numeroParcialTeoria = 0;
				}
				
				if(arrayRespuesta[1].length != 0){
					for(i = 0; i < arrayRespuesta[1].length;i++){
						codhtmlPracticas = codhtmlPracticas + '<div class="agrupacionElementos" >';
						codhtmlPracticas = codhtmlPracticas + '<br>' + arrayRespuesta[1][i]["descripcion"] + '<input data-theme="d" type="number" name="name" id="' +arrayRespuesta[1][i]["id"] + '"  value="' + arrayRespuesta[1][i]["porcentaje"]+'"<br>';
						codhtmlPracticas = codhtmlPracticas + '</div>';
					}
				}else{
					codhtmlPracticas = '<p class="letraDocumento" >No hay pr\xE1cticas</p>';
					numeroParcialPractica = 0;
				}
				
				if(arrayRespuesta[2].length != 0){
					for(i = 0; i < arrayRespuesta[2].length;i++){
						codhtmlTrabajos = codhtmlTrabajos + '<div class="agrupacionElementos" >';
						codhtmlTrabajos = codhtmlTrabajos + '<br>' + arrayRespuesta[2][i]["descripcion"] + '<input data-theme="d" type="number" name="name" id="' +arrayRespuesta[2][i]["id"] + '"  value="' + arrayRespuesta[2][i]["porcentaje"]+'"<br>';
						codhtmlTrabajos = codhtmlTrabajos + '</div>';
					}
				}else{
					codhtmlTrabajos = '<p class="letraDocumento" >No hay trabajos</p>';
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
	$('#pestanaTeoriaConf').addClass("ui-btn-active");
	$('#pestanaPracticasConf').removeClass('ui-btn-active');
	$('#pestanaTrabajosConf').removeClass('ui-btn-active');
	
	$('#confDIVTeoria').show();
	$('#confDIVPractica').hide();
	$('#confDIVTrabajos').hide();
}


function opcionesConfAsig(idAsignatura){
	var cad = "[{\"id\":\"" + idAsignatura + "\"}]";
	var codhtml='';

	idAsignaturaSeleccionada = idAsignatura;
	
	
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
				codhtml=codhtml + '<li data-icon="plus"><a onclick="configuracionAsig('+idAsignatura+')">A\xf1adir Materia</a></li>';
				codhtml=codhtml + '<li data-icon="edit"><a onclick="introducirGrupoDisponible('+idAsignatura+')">Inscripci\xf3n en grupos</a></li>';
				codhtml=codhtml + '<li data-icon="edit"><a onclick="introducirValoresPorcentajes('+idAsignatura+')">Modificar Porcentajes</a></li>';
				codhtml=codhtml + '<li data-icon="edit"><a onclick="mostrarPeticionesAlumno('+idAsignatura+')">Peticiones<span class="ui-li-count">'+arrayRespuesta["total"]+'</span></a></li>';
				codhtml=codhtml + '<li data-icon="delete"><a href="#divDialogoEliminacionAsignatura" data-rel="dialog" onclick="salirAsignaturaProf('+ idAsignatura +');">Salir</a></li>';
            }else{
				codhtml=codhtml +'<li data-icon="plus"><a onclick="configuracionAsig('+idAsignatura+')">A\xf1adir Materia</a></li>';
				codhtml=codhtml + '<li data-icon="edit"><a onclick="actualizarGestionGrupos('+idAsignatura+')">Gesti\xf3n de grupos</a></li>';
				codhtml=codhtml + '<li data-icon="edit"><a onclick="introducirGrupoDisponible('+idAsignatura+')">Inscripci\xf3n en grupos</a></li>';
				codhtml=codhtml + '<li data-icon="edit"><a onclick="introducirValoresPorcentajes('+idAsignatura+')">Modificar Porcentajes</a></li>';
				codhtml=codhtml + '<li data-icon="edit"><a onclick="mostrarPeticiones('+idAsignatura+')">Peticiones<span class="ui-li-count">'+arrayRespuesta["total"]+'</span></a></li>';
				codhtml=codhtml + '<li data-icon="trash"><a href="#divDialogoEliminacionAsignatura" data-rel="dialog" onclick="eliminarAsignaturaProf('+ idAsignatura +');">Eliminar</a></li>';
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
			
			codhtml= '<div class="agrupacionElementos">';
			codhtml=codhtml+ '<label class="letraDocumento" for="textinput4">Porcentaje Teoria:</label> <div id="diTeoria">';
			codhtml=codhtml+ '<input class="required porcentajesSuma rangoPorcentajes" type="number" name="'+ arrayRespuesta[0]["id"]+ '" id="porcentajeT" value="'+ arrayRespuesta[0]["porcentaje"]+ '" /></div>';
			codhtml=codhtml+ '<br><br>';
			codhtml=codhtml+ '<label for="textinput4">Puntuaci\xf3n m\xednima:</label> <div id="diTeoria">';
			codhtml=codhtml+ '<input class="required minimaPuntuacionTeoria rangoPuntuacion" class="letraDocumento" type="number" name="M'+ arrayRespuesta[0]["id"]+ '" id="porcentajeTMin" value="'+ arrayRespuesta[0]["minimo"] +'" /></div>';
			codhtml=codhtml+ '<br>';
			codhtml=codhtml+ '</div>';
			
			codhtml=codhtml+ '<div class="agrupacionElementos">';
			codhtml=codhtml+ '<label class="letraDocumento" for="textinput4">Porcentaje Pr\xe1ctica:</label> <div id="diPractica">';
			codhtml=codhtml+ '<input class="required porcentajesSuma rangoPorcentajes" type="number" name="'+ arrayRespuesta[1]["id"]+ '" id="porcentajeP" value="'+ arrayRespuesta[1]["porcentaje"]+ '" /></div>';
			codhtml=codhtml+ '<br><br>';
			codhtml=codhtml+ '<label class="letraDocumento" for="textinput4">Puntuaci\xf3n m\xednima:</label> <div id="diPractica">';
			codhtml=codhtml+ '<input class="required minimaPuntuacionTeoria rangoPuntuacion" type="number" name="M'+ arrayRespuesta[1]["id"]+ '" id="porcentajePMin" value="'+ arrayRespuesta[1]["minimo"]+ '" /></div>';
			codhtml=codhtml+ '<br>';
			codhtml=codhtml+ '</div>';
			
			codhtml=codhtml+ '<div class="agrupacionElementos">';
			codhtml=codhtml+ '<label class="letraDocumento" for="textinput4">Porcentaje Asistencia:</label> <div id="diAsistencia">';
			codhtml=codhtml+ '<input class="required porcentajesSuma rangoPorcentajes" type="number" name="'+ arrayRespuesta[2]["id"]+ '" id="porcentajeA" value="'+ arrayRespuesta[2]["porcentaje"]+ '" /></div>';
			codhtml=codhtml+ '<br><br>';
			codhtml=codhtml+ '<label class="letraDocumento" for="textinput4">Puntuaci\xf3n m\xednima:</label> <div id="diAsistencia">';
			codhtml=codhtml+ '<input class="required minimaPuntuacionTeoria rangoPuntuacion" type="number" name="M'+ arrayRespuesta[2]["id"]+ '" id="porcentajeAMin" value="'+ arrayRespuesta[2]["minimo"]+ '" /></div>';
			codhtml=codhtml+ '<br>';
			codhtml=codhtml+ '</div>';
			
			codhtml=codhtml+ '<div class="agrupacionElementos">';
			codhtml=codhtml+ '<label class="letraDocumento" for="textinput5">Porcentaje Trabajos:</label> <div id="diTrabajos">';
			codhtml=codhtml+ '<input class="required porcentajesSuma rangoPorcentajes" type="number" name="'+ arrayRespuesta[3]["id"]+ '" id="porcentajeTV" value="'+ arrayRespuesta[3]["porcentaje"]+ '" /></div>';
			codhtml=codhtml+ '<br><br>';
			codhtml=codhtml+ '<label class="letraDocumento" for="textinput5">Puntuaci\xf3n m\xednima:</label> <div id="diTrabajos">';
			codhtml=codhtml+ '<input class="required minimaPuntuacionTeoria rangoPuntuacion" type="number" name="M'+ arrayRespuesta[3]["id"]+ '" id="porcentajeTVMin" value="'+ arrayRespuesta[3]["minimo"]+ '" /></div>';
			codhtml=codhtml+ '<br>';
			codhtml=codhtml+ '</div>';
            
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
	$('#DivGruposTeoriaUpd').empty();
	$('#DivGruposPracticasUpd').empty();
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
				codhtmlT = '';
				codhtmlT = codhtmlT + '<div align="center" class="'+ arrayRespuesta[0][i]["idGrupo"] + ' agrupacionElementos' +'">';
				
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
				
				codhtmlT = codhtmlT + '<a href="#divDialogoEliminacionGrupo" data-inline="true" data-role="button" data-rel="dialog" onclick="javascript:modificiarBtSiGrupoTeoriaAlmac('+ arrayRespuesta[0][i]["idGrupo"] +');">Borrar</a>';
				
				codhtmlT = codhtmlT + '</div>';
	
				$('#DivGruposTeoriaUpd').append(codhtmlT);
				$("#T"+ arrayRespuesta[0][i]["idGrupo"] +" option[value="+ arrayRespuesta[0][i]["Turno"] +"]").attr("selected",true);
				$("#D"+ arrayRespuesta[0][i]["idGrupo"] +" option[value="+ arrayRespuesta[0][i]["Descripcion"] +"]").attr("selected",true);
			}
			$('#pageUpdGruposTeoria').trigger('create');
			
			
			//Parte de practicas
			for(i = 0; i < arrayRespuesta[1].length;i++){
				codhtmlP = '';
				codhtmlP = codhtmlP + '<div align="center" class="'+ arrayRespuesta[1][i]["idGrupo"] + ' agrupacionElementos' +'">';
				
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
				
				codhtmlP = codhtmlP + '<a href="#divDialogoEliminacionGrupo" data-inline="true" data-role="button" data-rel="dialog" onclick="javascript:modificarBtSiGrupoPracticasAlmac('+ arrayRespuesta[1][i]["idGrupo"] +');">Borrar</a>';
				
				codhtmlP = codhtmlP + '</div>';

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

function modificiarBtSiGrupoTeoriaAlmac(idGrupo){
	var codhtml = '<a id="btSi" href="javascript:borrarGrupoTeoriaAlmac('+idGrupo+')" data-role="button" data-inline="true" >Si</a>';
	codhtml = codhtml + '<a id="btNo" href="" data-role="button" data-inline="true" data-rel="back">No</a>';
	$('#btSiEliminar').html(codhtml);
	$("#btSi").button();
	$("#btNo").button();


}

function modificarBtSiGrupoPracticasAlmac(idGrupo){
	var codhtml = '<a id="btSiPrac" href="javascript:borrarGrupoPracticasAlmac('+idGrupo+')" data-role="button" data-inline="true" >Si</a>';
	codhtml = codhtml + '<a id="btNoPrac" href="" data-role="button" data-inline="true" data-rel="back">No</a>';
	$('#btSiEliminar').html(codhtml);
	$("#btSiPrac").button();
	$("#btNoPrac").button();
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
				location.href='#pageUpdGruposTeoria';
				
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
				location.href='#pageUpdGruposPracticas';
				
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

function salirAsigProfesor(idAsignatura){
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

function salirAsignaturaProf(idAsignatura){

	var codhtml = '<a id="btSisi" href="javascript:salirAsigProfesor('+idAsignatura+')" data-role="button" data-inline="true" >Si</a>';
	codhtml = codhtml + '<a id="btNono" href="" data-role="button" data-inline="true" data-rel="back">No</a>';
	$('#btSiEliminarAsignatura').html(codhtml);
	$("#btSisi").button();
	$("#btNono").button();

}

function eliminarAsigProfesor(idAsignatura){
	var cad = "[{\"idAsig\":\"" + idAsignatura + "\"}]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'eliminarAsigDefProf',
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

function eliminarAsignaturaProf(idAsignatura){

	var codhtml = '<a id="btSisi" href="javascript:eliminarAsigProfesor('+idAsignatura+')" data-role="button" data-inline="true" >Si</a>';
	codhtml = codhtml + '<a id="btNono" href="" data-role="button" data-inline="true" data-rel="back">No</a>';
	$('#btSiEliminarAsignatura').html(codhtml);
	$("#btSisi").button();
	$("#btNono").button();

}