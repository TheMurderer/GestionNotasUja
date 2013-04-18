/*************************************************************************
 ** @name 		 		 : addMaterial
 ** @description 		 : Petición json para añadir material a la asignatura
 ** @param idAsignataura : Id de la asignatura a la que vamos a aññadir material
 ** @param tipo			 : T-Teroría | P-Prácticas | TV-Trabajos volutarios
 *************************************************************************/
function addMaterial(idAsignatura,tipo){

	var puntuacion = $("#puntuacionParcial").val();
	var descripcion = $("#descripcionParcial").val();
	var cad = "[" +
	          "{" +
	               " \"id\":\"" + idAsignaturaSeleccionada + "\"," +
	               " \"tipo\":\""+"P"+ tipo+"\"," +
	               " \"punt\":"+$("#puntuacionParcial").val()+"," +
	               " \"desc\":\""+$("#descripcionParcial").val()+"\"" +
	           "}" +
	           "]";	
	
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'addMat',
			'datos': cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			if(tipo == 'T'){
				anadirMaterial("confDIVTeoria", descripcion, puntuacion);
				mostrarDIV('T');
			}else if(tipo == 'P'){
				anadirMaterial("confDIVPractica", descripcion, puntuacion);
				mostrarDIV('P');
			}else{
				anadirMaterial("confDIVTrabajos", descripcion, puntuacion);
				mostrarDIV('TV');
			}
        },
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");document.cookie= "";location.href="#pageLogin";
		}
	});
	
}

function limpiarAnadirMateria(){
	$('#descripcionParcial').val("");
	$('#puntuacionParcial').val("");

}