/*----------- VARIABLES GLOBALES -----------*/
var idTitulacionSeleccionada = '';
var idAsignaturaSeleccionada = '';
var esResponsable = '';

var numeroGruposTeoriaAnadidos = 1;
var numeroGruposPracticasAnadidos = 1;

/*----------- PETICIONES JSON -----------*/

/*******************************************************************************
 * *
 * 
 * @name : peticionAnadirAsignatura *
 * @description : Petición json para añadir una nueva asignatura
 ******************************************************************************/
function peticionAnadirAsignatura() {
	var cad = "[" + JSON.stringify($("#formAnadeAsignatura").serializeObject())
			+ "]";

	$.ajax({
		type : "GET",
		url : p_url,
		dataType : 'jsonp',
		data : {
			'm' : 'addasig',
			'datos' : cad
		},
		contentType : 'application/json; charset=utf-8',
		success : function(respuesta) {
			arrayRespuesta = eval(respuesta);
			if (arrayRespuesta["ok"] == 0) {
				alert('Creación de asignatura incorrecta');
				navigator.notification.alert('Error al crear asignatura', null,
						'Nueva asignatura', 'Aceptar');
			} else {
				peticionAsignaturas(); // Lista de asignaturas del profesor
				location.href = "#pageSignatures";
			}
		},
		error : function(respuesta) {
			alert("Su sesi\xf3n se ha cerrado automaticamente.");
			delCookie("validar");
			location.href="#pageLogin";
		}
	});

}

/*******************************************************************************
 * *
 * 
 * @name : peticionTitulaciones *
 * @description : Petición json para recuperar las las titulaciones
 ******************************************************************************/
function peticionTitulaciones() {
	// Limpiamos todos los campos de todas las pantallas
	limpiarAsignaturaCompleta();

	var cad = "[]";

	$.ajax({
		type : "GET",
		url : p_url,
		dataType : 'jsonp',
		data : {
			'm' : 'ltit',
			'datos' : cad
		},
		contentType : 'application/json; charset=utf-8',
		success : function(respuesta) {

			// titulaciones

			arrayRespuesta = eval(respuesta);

			var i;
			var codhtml = '<div class="agrupacionElementos" >';

			codhtml = codhtml + '<p class="letraDocumento" >Titulaci\xF3n</p>';
			codhtml = codhtml
					+ '<select id="menuTitulaciones" name="titulacion" >';

			if (arrayRespuesta.length != 0) {
				// Opción por defecto
				codhtml = codhtml
						+ '<option value="" disabled="disabled" selected>'
						+ "Elija una titulaci\xF3n" + '</option>';
				for (i = 0; i < arrayRespuesta.length; i++) {
					codhtml = codhtml + '<option value="'
							+ arrayRespuesta[i]["id"] + '">'
							+ arrayRespuesta[i]["nombre"] + '</option>';
				}
				codhtml = codhtml + '</select>';
				codhtml = codhtml + '<br></div>';

				$('#titulaciones').html(codhtml);
				$('#menuTitulaciones').selectmenu();
				$('#TitulaAsign').show();
			}

			$('#menuTitulaciones').change(function() {
				idTitulacionSeleccionada = $('#menuTitulaciones').val();
				peticionAsignaturasTitulacion($('#menuTitulaciones').val());
				borraBotonNuevaAsignatura();
			});

			// $('#botonAnadirAsignatura').button();
		},
		error : function(respuesta) {
			alert("Su sesi\xf3n se ha cerrado automaticamente.");
			delCookie("validar");
			location.href="#pageLogin";
		},
		beforeSend : function() {
			$('#cargando2').show();
			$('#listarAsignaturasTitulacion').hide();
		},
		complete : function() {
			$('#cargando2').hide();
			$('#listarAsignaturasTitulacion').show();
		}
	});

}

/*******************************************************************************
 * *
 * 
 * @name : peticionAsignaturasTitulacion *
 * @description : Petición json para recuperar las Asignaturas de una titulación *
 * @param idTitulacion :
 *            id de la titulación de la cual queremos recuperar las asignaturas
 ******************************************************************************/
function peticionAsignaturasTitulacion(idTitulacion) {
	var cad = "[{\"titulacion\":\"" + idTitulacion + "\"}]";

	$
			.ajax({
				type : "GET",
				url : p_url,
				dataType : 'jsonp',
				data : {
					'm' : 'lasigtit',
					'datos' : cad
				},
				contentType : 'application/json; charset=utf-8',
				success : function(respuesta) {

					// Asignaturas pertenecientes a una titulación
					arrayRespuesta = eval(respuesta);

					var i;
					var codhtml = '<div class="agrupacionElementos" >';

					codhtml = codhtml
							+ '<p class="letraDocumento" >Asignaturas</p>';

					if (arrayRespuesta.length != 0) {
						codhtml = codhtml
								+ '<select id="menuAsigntauras" name="asignaturaTitulacion" >';
						// Opción por defecto
						codhtml = codhtml
								+ '<option value="" disabled="disabled" selected>'
								+ "Elija una asignatura" + '</option>';
						for (i = 0; i < arrayRespuesta.length; i++) {
							codhtml = codhtml + '<option value="'
									+ arrayRespuesta[i]["id"] + '">'
									+ arrayRespuesta[i]["nombre"] + '</option>';
						}
						codhtml = codhtml + '</select>';
						codhtml = codhtml + '<br></div>';
					} else {
						codhtml = "<p class='letraDocumento'>No hay asignaturas</p>";
					}

					$('#asignaturaElegida').html(codhtml);
					$('#menuAsigntauras').selectmenu();

					$('#menuAsigntauras').change(function() {
						idAsignaturaSeleccionada = $('#menuAsigntauras').val();
						existeResponsableAsignatura();
					});
				},
				error : function(respuesta) {
					alert("Su sesi\xf3n se ha cerrado automaticamente.");
					delCookie("validar");
					location.href="#pageLogin";
				},
				beforeSend : function() {
					$('#cargando2').show();
					$('#listarAsignaturasTitulacion').hide();
				},
				complete : function() {
					$('#cargando2').hide();
					$('#listarAsignaturasTitulacion').show();
				}
			});

}

/*******************************************************************************
 * *
 * 
 * @name : existeResponsableAsignatura *
 * @description : Petición json para comprobar si existe Responsable * de una
 *              asignatura
 ******************************************************************************/
function existeResponsableAsignatura() {
	var cad = "[" + JSON.stringify($("#formAnadeAsignatura").serializeObject())
			+ "]";

	$
			.ajax({
				type : "GET",
				url : p_url,
				dataType : 'jsonp',
				data : {
					'm' : 'existeResp',
					'datos' : cad
				},
				contentType : 'application/json; charset=utf-8',
				success : function(respuesta) {
					// titulaciones
					var codhtml = "";
					arrayRespuesta = eval(respuesta);
					if (arrayRespuesta["ok"] == 0) {
						codhtml = "<a href=\"#divDialogo\" data-role=\"button\" data-inline=\"true\" data-rel=\"dialog\" data-transition=\"flip\">"
								+ "A\u00f1adir" + "</a>";
					} else {
						codhtml = "<a href=\"javascript:introducirGrupoDisponibles()\" data-role=\"button\" data-inline=\"true\">"
								+ "A\u00f1adir" + "</a>";
					}

					$('#btDialog').html(codhtml);
					$('#btDialog').trigger('create');
				},
				error : function(respuesta) {
					alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
				},
				beforeSend : function() {
					$('#cargando2').show();
					$('#listarAsignaturasTitulacion').hide();
				},
				complete : function() {
					$('#cargando2').hide();
					$('#listarAsignaturasTitulacion').show();
				}
			});
}

/*******************************************************************************
 * *
 * 
 * @name : almacenarInformacionResponsable *
 * @description : Petición json para almacenar el responsable de la asignatura
 ******************************************************************************/
function almacenarInformacionResponsable() {

	var ident = JSON.stringify($("#formAnadeAsignatura").serializeObject());
	ident = ident.replace("{", "");

	var cad = "[[" + JSON.stringify($("#formPorcentajes").serializeObject());
	cad = cad.replace("}", "") + "," + ident + "],[";

	var codT = JSON.stringify($("#formFruposTeoria").serializeObject());
	cad = cad + codT + "],[";

	var codP = JSON.stringify($("#formGruposPracticas").serializeObject());

	cad = cad + codP + "]]";
	
	

	$.ajax({
		type : "GET",
		url : p_url,
		dataType : 'jsonp',
		data : {
			'm' : 'almacenResponsa',
			'datos' : cad
		},
		contentType : 'application/json; charset=utf-8',
		success : function(respuesta) {
			// titulaciones

			arrayRespuesta = eval(respuesta);
			if (arrayRespuesta["ok"] != 0) {

				introducirGrupoDisponibles();
			} else {
				alert("Error");
			}

		},
		error : function(respuesta) {
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		},
		beforeSend : function() {
			$('#cargando2').show();
			$('#listarAsignaturasTitulacion').hide();
		},
		complete : function() {
			$('#cargando2').hide();
			$('#listarAsignaturasTitulacion').show();
		}
	});
}

/*----------- FUNCIONES GRUPOS DE TEORIA Y PRÁCTICAS -----------*/

/*******************************************************************************
 * @name : addGruposTeoria
 * @description : Añade un nuevo grupo de teoría a los ya existentes
 ******************************************************************************/
function addGruposTeoria(idContenedor1, idContenedor2) {
	var codhtml = '';
	var nombre = "GrupoT" + numeroGruposTeoriaAnadidos;

	codhtml = codhtml + '<div align="center" class="' + nombre
			+ ' agrupacionElementos' + '">';

	codhtml = codhtml + '<div data-role="controlgroup">';

	codhtml = codhtml + '<select name=\"' + nombre + '\" >';

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

	nombre = "TurnoT" + numeroGruposTeoriaAnadidos;
	codhtml = codhtml + '</select>';

	codhtml = codhtml + '<select name=\"' + nombre + '\">';

	codhtml = codhtml + '<option value="M">Manana</option>';
	codhtml = codhtml + '<option value="T">Tarde</option>';

	codhtml = codhtml + '</select>';

	codhtml = codhtml + '</div>';

	codhtml = codhtml
			+ '<a href="#" data-inline="true" data-role="button" onclick="javascript:borrarGrupoTeoria('
			+ numeroGruposTeoriaAnadidos + ');">Borrar</a>';

	codhtml = codhtml + '</div>';

	numeroGruposTeoriaAnadidos++;
	$('#' + idContenedor1).append(codhtml);
	$('#' + idContenedor2).trigger('create');
}

/*******************************************************************************
 * @name : borrarGrupoTeoria
 * @description : Borra el grupo de teoría seleccionado
 ******************************************************************************/
function borrarGrupoTeoria(numero) {
	$("div.GrupoT" + numero).remove();
	$('#listaGruposTeoria').trigger('create');
}

/*******************************************************************************
 * @name : addGruposPracticas
 * @description : Añade un nuevo grupo de prácticas a los ya existentes
 ******************************************************************************/
function addGruposPracticas(idContenedor1, idContenedor2) {
	var horaInicial,horaFinal;
	var codhtml = '';
	var nombre = "GrupoP" + numeroGruposPracticasAnadidos;

	codhtml = codhtml + '<div align="center" class="' + nombre
			+ ' agrupacionElementos' + '">';

	codhtml = codhtml + '<div data-role="controlgroup">';

	codhtml = codhtml + '<select name="' + nombre + '" >';

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

	nombre = "TurnoPE" + numeroGruposPracticasAnadidos;
	codhtml = codhtml + '</select>';

	codhtml = codhtml + '<select id="'+nombre +'" name="' + nombre + '" >';

	codhtml = codhtml + '<option selected value="9:30" >9:30</option>';
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

	nombre = "TurnoPT" + numeroGruposPracticasAnadidos;

	codhtml = codhtml + '<select id="'+nombre +'" name="' + nombre + '" >';

	codhtml = codhtml + '<option selected value="9:30">9:30</option>';
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

	codhtml = codhtml
			+ '<a href="#" data-inline="true" data-role="button" onclick="javascript:borrarGrupoPracticas('
			+ numeroGruposPracticasAnadidos + ');">Borrar</a>';

	codhtml = codhtml + ' <div><label class="error errorHorasMal">Horarios incorrectos.</label></div></div>';
	
	

	$('#' + idContenedor1).append(codhtml);
	$('#' + idContenedor2).trigger('create');
	$('.errorHorasMal').show();
	nombre= '#' + nombre;
	var nombrePE = "#TurnoPE" + numeroGruposPracticasAnadidos;
	
	
	$(nombrePE).change(function() {;
		horaInicial = $(nombrePE).val();
		horaFinal = $(nombre).val();
	
		horaInicial = horaInicial.substring(0, horaInicial.indexOf(':'));
		horaFinal = horaFinal.substring(0, horaFinal.indexOf(':'));
	
		if(parseInt(horaInicial) >= parseInt(horaFinal)){
			$('.errorHorasMal').show();
		}else{
			$('.errorHorasMal').hide();
		}
	});
	$(nombre).change(function() {;
		horaInicial = $(nombrePE).val();
		horaFinal = $(nombre).val();

		horaInicial = horaInicial.substring(0, horaInicial.indexOf(':'));
		horaFinal = horaFinal.substring(0, horaFinal.indexOf(':'));

		if(parseInt(horaInicial) >= parseInt(horaFinal)){
			$('.errorHorasMal').show();
		}else{
			$('.errorHorasMal').hide();
		}
	});
	
	
	numeroGruposPracticasAnadidos++;

}

/*******************************************************************************
 * @name : borrarGrupoPracticas
 * @description : Borra el grupo de prácticas seleccionado
 ******************************************************************************/
function borrarGrupoPracticas(numero) {
	$("div.GrupoP" + numero).remove();
	$('#listaGruposPracticas').trigger('create');
}

/*******************************************************************************
 * @name : EsResponsable()
 * @description : 
 ******************************************************************************/
function EsResponsable() {
	esResponsable = 1;
	location.href = "#pageAddPorcentaje";

	$("#porcentajesActualiz").hide();
	$("#porcentajesInsercc").show();
	$("#btPorcActual").hide();
	$("#btPorcInserc").show();

}

/*******************************************************************************
 * @name : noEsResponsable()
 * @description : 
 ******************************************************************************/
function noEsResponsable() {
	esResponsable = 0;
	alert("No ha sido creada la asignatura");
	location.href = "#pageAddSignature";
}

/*--------------------- LIMPIAR PANTALLAS ---------------------*/

/*******************************************************************************
 * *
 * 
 * @name : limpiarTitulacionAsignatura *
 * @description : Función para limpiar los combos de la titulaciones y * las
 *              asignaturas
 ******************************************************************************/
function limpiarTitulacionAsignatura() {
	$("#titulaciones").empty();
	$("#asignaturaElegida").empty();
}

/*******************************************************************************
 * @name : limpiarCalificaciones
 * @description : Función para restaurar los valores por defecto en las 
 * 				  calificaciones
 ******************************************************************************/
function limpiarCalificaciones() {
	$("#formPorcentajes input").val('0');
}

/*******************************************************************************
 * @name : limpiarGruposTeoria
 * @description : Función para borrar los grupos de teoría
 ******************************************************************************/
function limpiarGruposTeoria() {
	$("#DivGruposTeoria").empty();
}

/*******************************************************************************
 * @name : existeResponsableAsignatura
 * @description : Función para borrar los grupos de prácticas
 ******************************************************************************/
function limpiarGruposPracticas() {
	$("#DivGruposPracticas").empty();
}

/*******************************************************************************
 * @name : limpiarAsignaturaCompleta
 * @description : Realiza la limpieza de todas las pantallas de añadir
 *                asignatura
 ******************************************************************************/
function limpiarAsignaturaCompleta() {
	limpiarTitulacionAsignatura();
	limpiarCalificaciones();
	limpiarGruposTeoria();
	limpiarGruposPracticas();
}

function introducirGrupoDisponibles() {
	var cad = "[{\"idAsig\":\"" + idAsignaturaSeleccionada + "\"}]";
	location.href = "#gruposImparteAsig";

	$.ajax({
		type : "GET",
		url : p_url,
		dataType : 'jsonp',
		data : {
			'm' : 'gruposAsignatura',
			'datos' : cad
		},
		contentType : 'application/json; charset=utf-8',
		success : function(respuesta) {
			// titulaciones
			var i;
			arrayRespuesta = eval(respuesta);

			var codHtml = '<fieldset data-role="controlgroup">';
			var codHtmlPrac = '<fieldset data-role="controlgroup">';

			for (i = 0; i < arrayRespuesta[0].length; i++) {
				if (arrayRespuesta[0][i]["inscrito"] == 1) {
					codHtml = codHtml + '<input type="checkbox" name="'
							+ arrayRespuesta[0][i]["id"] + '" id="'
							+ arrayRespuesta[0][i]["id"] + '" checked>';
				} else {
					codHtml = codHtml + '<input type="checkbox" name="'
							+ arrayRespuesta[0][i]["id"] + '" id="'
							+ arrayRespuesta[0][i]["id"] + '">';
				}
				codHtml = codHtml + '<label for="' + arrayRespuesta[0][i]["id"]
						+ '">Grupo ' + arrayRespuesta[0][i]["descripcion"]
						+ ' Turno: ' + arrayRespuesta[0][i]["turno"]
						+ '</label>';
			}

			for (i = 0; i < arrayRespuesta[1].length; i++) {
				if (arrayRespuesta[1][i]["inscrito"] == 1) {
					codHtmlPrac = codHtmlPrac + '<input type="checkbox" name="'
							+ arrayRespuesta[1][i]["id"] + '" id="'
							+ arrayRespuesta[1][i]["id"] + '" checked>';
				} else {
					codHtmlPrac = codHtmlPrac + '<input type="checkbox" name="'
							+ arrayRespuesta[1][i]["id"] + '" id="'
							+ arrayRespuesta[1][i]["id"] + '" >';
				}
				codHtmlPrac = codHtmlPrac + '<label for="'
						+ arrayRespuesta[1][i]["id"] + '">Grupo '
						+ arrayRespuesta[1][i]["descripcion"] + ' Horario: '
						+ arrayRespuesta[1][i]["horaC"] + ' - '
						+ arrayRespuesta[1][i]["horaF"] + '</label>';
			}

			codHtml = codHtml + '</fieldset>';
			codHtmlPrac = codHtmlPrac + '</fieldset>';
			
			$('#btTerminarGr').addClass("ui-disabled");
			$('#btTerminarGr').removeClass("ui-enabled");
			
			$('#colConTeoria').html(codHtml);
			$('#colConPracticas').html(codHtmlPrac);
			$('#contenidoGruposAsig').trigger('create');
			$('#colConTeoria').change(function(){
				$('#btTerminarGr').removeClass("ui-disabled");
				$('#btTerminarGr').addClass("ui-enabled");

			});
			
			$('#colConPracticas').change(function(){
				$('#btTerminarGr').removeClass("ui-disabled");
				$('#btTerminarGr').addClass("ui-enabled");
			});

		},
		error : function(respuesta) {
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		},
		beforeSend : function() {
			$('#cargando9').show();
			$('#contenidoGruposAsig').hide();
			$('#btgruposImpartido').hide();
		},
		complete : function() {
			$('#cargando9').hide();
			$('#contenidoGruposAsig').show();
			$('#btgruposImpartido').show();
		}
	});
}

function introducirGrupoDisponible(idAsignatura) {
	var cad = "[{\"idAsig\":\"" + idAsignatura + "\"}]";
	location.href = "#gruposImparteAsig";

	$.ajax({
		type : "GET",
		url : p_url,
		dataType : 'jsonp',
		data : {
			'm' : 'gruposAsignatura',
			'datos' : cad
		},
		contentType : 'application/json; charset=utf-8',
		success : function(respuesta) {
			// titulaciones
			var i;
			arrayRespuesta = eval(respuesta);

			var codHtml = '<fieldset data-role="controlgroup">';
			var codHtmlPrac = '<fieldset data-role="controlgroup">';

			for (i = 0; i < arrayRespuesta[0].length; i++) {
				if (arrayRespuesta[0][i]["inscrito"] == 1) {
					codHtml = codHtml + '<input type="checkbox" name="'
							+ arrayRespuesta[0][i]["id"] + '" id="'
							+ arrayRespuesta[0][i]["id"] + '" checked>';
				} else {
					codHtml = codHtml + '<input type="checkbox" name="'
							+ arrayRespuesta[0][i]["id"] + '" id="'
							+ arrayRespuesta[0][i]["id"] + '">';
				}
				codHtml = codHtml + '<label for="' + arrayRespuesta[0][i]["id"]
						+ '">Grupo ' + arrayRespuesta[0][i]["descripcion"]
						+ ' Turno: ' + arrayRespuesta[0][i]["turno"]
						+ '</label>';
			}

			for (i = 0; i < arrayRespuesta[1].length; i++) {
				if (arrayRespuesta[1][i]["inscrito"] == 1) {
					codHtmlPrac = codHtmlPrac + '<input type="checkbox" name="'
							+ arrayRespuesta[1][i]["id"] + '" id="'
							+ arrayRespuesta[1][i]["id"] + '" checked>';
				} else {
					codHtmlPrac = codHtmlPrac + '<input type="checkbox" name="'
							+ arrayRespuesta[1][i]["id"] + '" id="'
							+ arrayRespuesta[1][i]["id"] + '" >';
				}
				codHtmlPrac = codHtmlPrac + '<label for="'
						+ arrayRespuesta[1][i]["id"] + '">Grupo '
						+ arrayRespuesta[1][i]["descripcion"] + ' Horario: '
						+ arrayRespuesta[1][i]["horaC"] + ' - '
						+ arrayRespuesta[1][i]["horaF"] + '</label>';
			}

			codHtml = codHtml + '</fieldset>';
			codHtmlPrac = codHtmlPrac + '</fieldset>';
			
			$('#btTerminarGr').addClass("ui-disabled");
			$('#btTerminarGr').removeClass("ui-enabled");
			
			$('#colConTeoria').html(codHtml);
			$('#colConPracticas').html(codHtmlPrac);
			$('#contenidoGruposAsig').trigger('create');
			$('#colConTeoria').change(function(){
				$('#btTerminarGr').removeClass("ui-disabled");
				$('#btTerminarGr').addClass("ui-enabled");

			});
			
			$('#colConPracticas').change(function(){
				$('#btTerminarGr').removeClass("ui-disabled");
				$('#btTerminarGr').addClass("ui-enabled");
			});

		},
		error : function(respuesta) {
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		},
		beforeSend : function() {
			$('#cargando9').show();
			$('#contenidoGruposAsig').hide();
			$('#btgruposImpartido').hide();
		},
		complete : function() {
			$('#cargando9').hide();
			$('#contenidoGruposAsig').show();
			$('#btgruposImpartido').show();
		}
	});
}

function almacenarGruposImpartidos() {

	var c = document.getElementById("formGrupoPertenTeoria")
			.getElementsByTagName('input');
	var cadT = '[{';
	for ( var i = 0; i < c.length; i++) {
		if (c[i].type == 'checkbox') {
			cadT = cadT + '"' + c[i].name + '":"' + c[i].checked + '",';
		}
	}
	cadT = cadT.substring(0, cadT.length - 1);
	cadT = cadT + '}]';

	var c = document.getElementById("formGrupoPertenPracticas")
			.getElementsByTagName('input');
	var cadP = '[{';
	for ( var i = 0; i < c.length; i++) {
		if (c[i].type == 'checkbox') {
			cadP = cadP + '"' + c[i].name + '":"' + c[i].checked + '",';
		}
	}
	cadP = cadP.substring(0, cadP.length - 1);
	cadP = cadP + '}]';

	var cad = "[[{\"idAsig\":\"" + idAsignaturaSeleccionada + "\"}]," + cadT;
	cad = cad + "," + cadP + "]";

	$.ajax({
		type : "GET",
		url : p_url,
		dataType : 'jsonp',
		data : {
			'm' : 'almacenarGrupos',
			'datos' : cad
		},
		contentType : 'application/json; charset=utf-8',
		success : function(respuesta) {

			arrayRespuesta = eval(respuesta);
			if (arrayRespuesta["ok"] == 1) {
				alert("Su petici\xF3n est\xE1 en curso.");
				peticionAsignaturas();
				location.href = "#pageSignatures";
				
			}

		},
		error : function(respuesta) {
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		},
		beforeSend : function() {
			$('#cargando9').show();
			$('#contenidoGruposAsig').hide();
			$('#btgruposImpartido').hide();
		},
		complete : function() {
			$('#cargando9').hide();
		}
	});
}

function borraBotonNuevaAsignatura() {
	$('#btDialog').empty();
}
