/*************************************************************************
 ** @name 		 : soloNumeros
 ** @description : Función que comprueba si el texto pasado está 
 **				   comprendido entre un rango
 ** @param texto : Numero a comprobar
 ** @param min   : Rango inferior
 ** @param max   : Ranfo superior
 *************************************************************************/
function soloNumeros(texto,min,max){
	var pattern = /[^0-9\.]/g; 
	texto.value = texto.value.replace(pattern, '');
	
	if(texto.value < min || texto.value > max){
		texto.value = '';
	}
}

/*******************************************************************************
 * @name 		: eliminaDuplicados
 * @description : Elimina los elementos duplicados de un array
 * @returns     : El array sin elementos duplicados
 ******************************************************************************/
function eliminaDuplicados(arr) {
	var i, len = arr.length, out = [], obj = {};

	for (i = 0; i < len; i++) {
		obj[arr[i]] = 0;
	}
	for (i in obj) {
		out.push(i);
	}
	return out;
}

/*******************************************************************************
 * @name 		: compruebaGruposTeoria
 * @description : Comprueba si los nombres de los grupos de teoría están repetidos
 * @param idFormulario : Id del formulario acomprobar 
 * @returns     : True si no hay grupos repetidos y False en caso contrario
 ******************************************************************************/
function compruebaGruposTeoria(idFormulario,idDestino) {
	var c = document.getElementById(idFormulario)
			.getElementsByTagName('select');
	var destino = '#' + idDestino;
	var cadena = new Array();
	var long2;
	
	for ( var i = 0; i < c.length; i++) {
		if (i % 2 == 0) {
			cadena.push(c[i].value);
		}
	}
	
	long2 = eliminaDuplicados(cadena);
	
	if(cadena.length == long2.length){
		//return true;
		$('.errorGrupoRepetido').hide();
		document.location.href= destino;
	}else{
		//return false;
		//alert("Existen grupos repetidos");
		$('.errorGrupoRepetido').show();
	}
}

/*******************************************************************************
 * @name 			   : compruebaGruposPractica
 * @description 	   : Comprueba si los nombres de los grupos de prácticas están repetidos
 * @param idFormulario : Id del formulario acomprobar 
 * @returns     	   : True si no hay grupos repetidos y False en caso contrario
 ******************************************************************************/
function compruebaGruposPractica(idFormulario, actualiza) {
	var c = document.getElementById(idFormulario)
			.getElementsByTagName('select');
	var cadena = new Array();
	var long2;
	
	for ( var i = 0; i < c.length; i++) {
		if (i % 3 == 0) {
			cadena.push(c[i].value);
		}
	}
	
	long2 = eliminaDuplicados(cadena);
		
	if(cadena.length == long2.length){
		//return true;
		$('.errorGrupoRepetido').hide();
		if(actualiza == 'true'){
			almacenarInformacionResponsableUpd();
		}else{
			almacenarInformacionResponsable();
		}	
	}else{
		//return false;
		//alert("Existen grupos repetidos");
		$('.errorGrupoRepetido').show();
	}
}

/*************************************************************************
 ** @name 		   		 : validarFormulario
 ** @description   		 : Función que realiza la validación de los formularios
 ** @param identificador : Id del formulario a comprobar
 *************************************************************************/
function validarFormulario(identificador){
	var id = '#' + identificador;
	
	//Validación de contraseñas iguales
	$.validator.addMethod("passmatch", function(value) {
		return value == $("#password").val();
	}, 'Las contrase\xF1as debe ser iguales');
	
	//Validación rangos de los porcentajes
	$.validator.addMethod("rangoPorcentajes", function(value) {
		if(value < 0 || value > 100){
			return false;
		}else{
			return true;
		}
	}, 'El valor debe estar contenido entre 0-100');
	
	//Validación rangos de puntuación
	$.validator.addMethod("rangoPuntuacion", function(value) {
		if(value < 0 || value > 10){
			return false;
		}else{
			return true;
		}
	}, 'El valor debe estar contenido entre 0-10');	
	
	//Validación de suma de porcentajes igual 100
	$.validator.addMethod("porcentajesSuma", function(value) {
		var teoria = Number($('#porcentajeT').val());
		var practica = Number($('#porcentajeP').val());
		var trabajos = Number($('#porcentajeTV').val());
		var asistencia = Number($('#porcentajeA').val());
		
		if( (teoria + practica + trabajos + asistencia) != 100 ){
			return false;
		}else{
			return true;
		}
	}, 'Los porcentajes debes sumar 100');
	
	//Validación de minimos en los porcentajes TEORÍA
	$.validator.addMethod("minimaPuntuacionTeoria", function(value) {
//		var teoria = Number($('#porcentajeT').val());
		
		var teoriaM = Number($('#porcentajeTMin').val());
		
		if(teoriaM <= 10){
			return true;
		}else{
			return false;
		}
		
	}, 'Puntiaci\xF3n m\xEDnima incorrecta (0-10)');
	
	//Validación de minimos en los porcentajes PRÁCTICAS
	$.validator.addMethod("minimaPuntuacionPractica", function(value) {
//		var practica = Number($('#porcentajeP').val());
		
		var practicaM = Number($('#porcentajePMin').val());
		
		if(practicaM <= 10){
			return true;
		}else{
			return false;
		}
		
	}, 'Puntiaci\xF3n m\xEDnima incorrecta (0-10)');
	
	//Validación de minimos en los porcentajes TRABAJOS
	$.validator.addMethod("minimaPuntuacionTrabajo", function(value) {
//		var trabajo = Number($('#porcentajeTV').val());
		
		var trabajoM = Number($('#porcentajeTVMin').val());
		
		if(trabajoM <= 10){
			return true;
		}else{
			return false;
		}
		
	}, 'Puntiaci\xF3n m\xEDnima incorrecta (0-10)');
	
	//Validación de minimos en los porcentajes TRABAJOS
	$.validator.addMethod("minimaPuntuacionAsistencia", function(value) {
//		var asistencia = Number($('#porcentajeA').val());
		
		var asistenciaM = Number($('#porcentajeAMin').val());
		
		if(asistenciaM <= 10){
			return true;
		}else{
			return false;
		}
		
	}, 'Puntiaci\xF3n m\xEDnima incorrecta (0-10)');
	
	$(id).validate();
}

//function comprobarTiempo(){
//	getTime - 
//}

