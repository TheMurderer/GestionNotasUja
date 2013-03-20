var idTitulacionSeleccionada = '';
var idAsignaturaSeleccionada = '';
var esResponsable='';

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
				alert('Creaci�n de asignatura incorrecta');
				navigator.notification.alert('Error al crear asignatura',null,'Nueva asignatura', 'Aceptar');
			}else{
				//Guardamos el Id de la sessi�n
				alert("Correcto");
				//Cargamos de nuevo la lista de asignaturas
				peticionAsignaturas(); //Lista de asignaturas del profesor
				location.href = "#pageSignatures";
			}
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR K�...");
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
			var codeButton = "";
			var codhtml = '<p>Titulacion</p>'; 
			codhtml = codhtml + '<select id="menuTitulaciones" name="titulacion" >';
			if(arrayRespuesta.length != 0){
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<option value="'+ arrayRespuesta[i]["id"] +'">'+ arrayRespuesta[i]["nombre"] +'</option>';
				}
				codhtml = codhtml + '</select>';
				
				codeButton = "<a href=\"#\" data-role=\"button\" data-inline=\"true\" data-icon=\"\" onclick=\"peticionAnadirAsignatura()\"> A�adir </a>";
				
				$('#titulaciones').html(codhtml);
				$('#menuTitulaciones').selectmenu();
				$('#TitulaAsign').show();
				$('#botonConf').html(codeButton);
				
				$('#botonConf').trigger('create');
			}
			
			$('#menuTitulaciones').change(function() {
				idTitulacionSeleccionada = $('#menuTitulaciones').val();
				peticionAsignaturasTitulacion($('#menuTitulaciones').val());
			});
			
			//$('#botonAnadirAsignatura').button();
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR K�...");
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

			
			//Asignaturas pertenecientes a una titulaci�n
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
			
			$('#menuAsigntauras').change(function() {
				idAsignaturaSeleccionada = $('#menuAsigntauras').val();
				existeResponsableAsignatura();
			});
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR K�...");
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

function hacerVisibleBloque(visible){
	if(visible == 0){
		$('#DivPorcentajes').hide();
		$('#DivNumeroDeGrupos').hide();
		$('#DivConfiguracionDeGrupos').hide();
	}else{
		$('#DivPorcentajes').show();
		$('#DivNumeroDeGrupos').show();
		$('#DivConfiguracionDeGrupos').show();
	}
	
}

function deshabilitarBoton(idComponente){
	var id = '#' + idComponente;
	$(id).button('disable'); 
}

/*-------------------------------------------------------*/
var numeroGruposTeoriaAnadidos = 1;
function addGruposTeoria(){
	var codhtml = '';
	var nombre = "GrupoT" + numeroGruposTeoriaAnadidos;
	
	codhtml = codhtml + '<div align="center" class="'+ nombre +'">';
	
	codhtml = codhtml + '<div data-role="controlgroup">';
	nombre="GrupoT";
	codhtml = codhtml + '<select name=\"'+ nombre +'\" >';
	
	codhtml = codhtml + '<option value="A">Grupo A</option>';
	codhtml = codhtml + '<option value="B">Grupo B</option>';
	codhtml = codhtml + '<option value="C">Grupo C</option>';
	codhtml = codhtml + '<option value="D">Grupo D</option>';
	codhtml = codhtml + '<option value="E">Grupo E</option>';
	codhtml = codhtml + '<option value="F">Grupo F</option>';
	codhtml = codhtml + '<option value="G">Grupo G</option>';
	codhtml = codhtml + '<option value="H">Grupo H</option>';
	codhtml = codhtml + '<option value="I">Grupo I</option>';
	codhtml = codhtml + '<option value="J">Grupo J</option>';
	
	nombre="TurnoT";
	codhtml = codhtml + '</select>';
	
	codhtml = codhtml + '<select name=\"'+ nombre +'\">';
	
	codhtml = codhtml + '<option value="M">Manana</option>';
	codhtml = codhtml + '<option value="T">Tarde</option>';
	
	codhtml = codhtml + '</select>';
	
	codhtml = codhtml + '</div>';
	
	codhtml = codhtml + '<a href="#" data-inline="true" data-role="button" onclick="javascript:borrarGrupoTeoria('+numeroGruposTeoriaAnadidos+');">Borrar</a>';
	
	codhtml = codhtml + '</div> <br>';
	
	
	numeroGruposTeoriaAnadidos ++;
	
	$('#DivGruposTeoria').append(codhtml);
	$('#listaGruposTeoria').trigger('create');
}

function borrarGrupoTeoria(numero){
	$("div.GrupoT"+numero).remove();
	$('#listaGruposTeoria').trigger('create');
}


var numeroGruposPracticasAnadidos = 1;
function addGruposPracticas(){
	var codhtml = '';
	var nombre = "GrupoP" + numeroGruposPracticasAnadidos;
	
	codhtml = codhtml + '<div align="center" class="'+ nombre +'">';
	
	codhtml = codhtml + '<div data-role="controlgroup">';
	nombre="GrupoP";
	codhtml = codhtml + '<select name="'+ nombre +'" >';
	
	codhtml = codhtml + '<option value="1">Grupo 1</option>';
	codhtml = codhtml + '<option value="2">Grupo 2</option>';
	codhtml = codhtml + '<option value="3">Grupo 3</option>';
	codhtml = codhtml + '<option value="4">Grupo 4</option>';
	codhtml = codhtml + '<option value="5">Grupo 5</option>';
	codhtml = codhtml + '<option value="6">Grupo 6</option>';
	codhtml = codhtml + '<option value="7">Grupo 7</option>';
	codhtml = codhtml + '<option value="8">Grupo 8</option>';
	codhtml = codhtml + '<option value="9">Grupo 9</option>';
	codhtml = codhtml + '<option value="10">Grupo 10</option>';
	
	nombre="TurnoPE";
	codhtml = codhtml + '</select>';
	
	
	codhtml = codhtml + '<select name="'+ nombre +'" >';
	
	codhtml = codhtml + '<option value="9:30">9:30</option>';
	codhtml = codhtml + '<option value="10:30">10:30</option>';
	codhtml = codhtml + '<option value="11:30">11:30</option>';
	codhtml = codhtml + '<option value="12:30">12:30</option>';
	codhtml = codhtml + '<option value="13:30">13:30</option>';
	codhtml = codhtml + '<option value="14:30">14:30</option>';
	codhtml = codhtml + '<option value="15:30">15:30</option>';
	codhtml = codhtml + '<option value="16:30">16:30</option>';
	codhtml = codhtml + '<option value="17:30">17:30</option>';
	codhtml = codhtml + '<option value="18:30">18:30</option>';
	codhtml = codhtml + '<option value="19:30">19:30</option>';
	codhtml = codhtml + '<option value="20:30">20:30</option>';
	codhtml = codhtml + '<option value="21:30">21:30</option>';
	
	
	codhtml = codhtml + '</select>';
	
	nombre="TurnoPT";
	
	codhtml = codhtml + '<select name="'+ nombre +'" >';
	
	codhtml = codhtml + '<option value="9:30">9:30</option>';
	codhtml = codhtml + '<option value="10:30">10:30</option>';
	codhtml = codhtml + '<option value="11:30">11:30</option>';
	codhtml = codhtml + '<option value="12:30">12:30</option>';
	codhtml = codhtml + '<option value="13:30">13:30</option>';
	codhtml = codhtml + '<option value="14:30">14:30</option>';
	codhtml = codhtml + '<option value="15:30">15:30</option>';
	codhtml = codhtml + '<option value="16:30">16:30</option>';
	codhtml = codhtml + '<option value="17:30">17:30</option>';
	codhtml = codhtml + '<option value="18:30">18:30</option>';
	codhtml = codhtml + '<option value="19:30">19:30</option>';
	codhtml = codhtml + '<option value="20:30">20:30</option>';
	codhtml = codhtml + '<option value="21:30">21:30</option>';
	
	codhtml = codhtml + '</select>';
	
	codhtml = codhtml + '</div>';
	
	codhtml = codhtml + '<a href="#" data-inline="true" data-role="button" onclick="javascript:borrarGrupoPracticas('+numeroGruposPracticasAnadidos+');">Borrar</a>';
	
	codhtml = codhtml + '</div><br>';
	
	numeroGruposPracticasAnadidos ++;
	
	$('#DivGruposPracticas').append(codhtml);
	$('#listaGruposPracticas').trigger('create');
}

function existeResponsableAsignatura(){
	var cad = "[" + JSON.stringify($("#formAnadeAsignatura").serializeObject()) + "]";

	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'existeResp',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			//titulaciones
			var codhtml="";
			arrayRespuesta = eval(respuesta);
			if (arrayRespuesta["ok"] == 0){
				codhtml="<a href=\"#divDialogo\" data-role=\"button\" data-inline=\"true\" data-rel=\"dialog\" data-theme=\"b\" data-transition=\"flip\">A�adir</a>";
			}else{
				codhtml="<a href=\"divDialogo\" data-role=\"button\" data-inline=\"true\" data-rel=\"dialog\" data-theme=\"b\" data-transition=\"flip\">A�adir</a>";
			}
			
			$('#btDialog').html(codhtml);
			$('#btDialog').trigger('create');
			
			
			//$('#botonAnadirAsignatura').button();
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR K�...");
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

function EsResponsable(){
	esResponsable = 1;
	location.href="#pageAddPorcentaje";
}

function noEsResponsable(){
	esResponsable = 0;
	location.href="#gruposImparteAsig";
}

function almacenarInformacionResponsable(){
	
	var ident = JSON.stringify($("#formAnadeAsignatura").serializeObject());
	ident = ident.replace("{","");
	
	var cad = "[[" + JSON.stringify($("#formPorcentajes").serializeObject());
	cad = cad.replace("}","") + "," + ident + "],[["; 
	
	var codT = JSON.stringify($("#formFruposTeoria").serializeObject());
	codT= codT.replace(/,/g,"}],[{");
	cad=cad + codT +"]],[[";

	var codP = JSON.stringify($("#formGruposPracticas").serializeObject());
	codP= codP.replace(/,/g,"}],[{");
	cad = cad + codP +"]]]";
	//alert(cad);
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'almacenResponsa',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			//titulaciones

			arrayRespuesta = eval(respuesta);
			if (arrayRespuesta["ok"] != 0){
				alert("Correcot");
				location.href="#gruposImparteAsig";
			}else{
				alert("Error");
			}

		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR K�...");
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

function borrarGrupoPracticas(numero){
	$("div.GrupoP"+numero).remove();
	$('#listaGruposPracticas').trigger('create');
}

