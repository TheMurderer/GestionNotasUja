/*----------- VARIABLES GLOBALES -----------*/

var asignaturaSeleccionadaOpciones = '';

/*----------- PETICIONES JSON -----------*/

/*************************************************************************
 ** @name 		 : peticionAsignaturas
 ** @description : Petición json para obtener las asignaturas que tutoriza
 **                un profesor
 *************************************************************************/
function peticionAsignaturas(){
	var cad = "[]";
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'lasig',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
			
			var i;
			var codhtml = '<ul data-role="listview" id="lista" data-filter="true" data-filter-placeholder="Filtrar asignaturas...">';
			if(arrayRespuesta.length != 0){
				for(i = 0; i < arrayRespuesta.length; i++){
					codhtml = codhtml + '<li data-icon="gear" ><a href="" onclick="mostrarListaAlumnos('+ arrayRespuesta[i]["id"] +')" >'+ arrayRespuesta[i]["nombre"] +'</a> <a href="#opcionesAsignatura" onclick="javascript:opcionesConfAsig('+arrayRespuesta[i]["id"]+')" data-rel="dialog"  data-transition="pop"></a></li>';
				}
				codhtml = codhtml + '</ul>';
				
				$('#listaAsignaturas').html(codhtml);
				$('#lista').listview();
				
			}else{
				$('#listaAsignaturas').html("<h3 class='estiloH3' >No se ha agredago ninguna asignatura</h3>");
			}
		},
		error: function(respuesta){
			alert("ERROR, YO NO ENTIENDO PUR KÉ...");
		},
		beforeSend: function(){
			$('#cargando').show();
			$('#listaAsignaturas').hide();
		},
		complete: function(){
			$('#cargando').hide();
			$('#listaAsignaturas').show();
		}
	});
}


/*----------- OTRAS FUNCIONES -----------*/

function seleccionarAsignatura(id){
	asignaturaSeleccionadaOpciones = id;
}

