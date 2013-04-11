/*************************************************************************
 ** @name 		 : soloNumeros
 ** @description : Funci�n que comprueba si el texto pasado est� 
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

/*************************************************************************
 ** @name 		 : comprobarPorcentajes
 ** @description : Funci�n que comprueba si los porcentajes introduccidos
 **				   son correctos
 *************************************************************************/
//function comprobarPorcentajes(){
//	var teoria = Number($('#porcentajeT').val());
//	var practica = Number($('#porcentajeP').val());
//	var trabajos = Number($('#porcentajeTV').val());
//	var asistencia = Number($('#porcentajeA').val());
//	
//	var teoriaM = Number($('#porcentajeTMin').val());
//	var practicaM = Number($('#porcentajePMin').val());
//	var trabajosM = Number($('#porcentajeTVMin').val());
//	var asistenciaM = Number($('#porcentajeAMin').val());
//	
//	if( (teoria + practica + trabajos + asistencia) != 100 ){
//		alert(teoria + practica + trabajos + asistencia);
//		alert("Los porcentajes deben sumar 100%!");
//		return false;
//	}else{
//		if(teoriaM <= teoria/10 && practicaM <= practica/10 && trabajosM <= trabajos/10 
//				&& asistenciaM <= asistencia/10){
//			document.location.href ="#pageAddGruposTeoria";
//			return true;
//		}else{
//			alert("Las puntuaciones minimas incorrectas!");
//			return false;
//		}
//	}
//}

/*************************************************************************
 ** @name 		   : numeroGrupos
 ** @description   : Funci�n que comprueba si los porcentajes introduccidos
 **				     son correctos
 ** @param idGrupo : id del elmento a comprobar
 *************************************************************************/
function numeroGrupos(){
	//alert($("#DivGruposTeoria a").size());
}

function validarFormulario(identificador){
	var id = '#' + identificador;
	
	//Validaci�n de contrase�as iguales
	$.validator.addMethod("passmatch", function(value) {
		return value == $("#password").val();
	}, 'Las contrase\xF1as debe ser iguales');
	
	//Validaci�n rangos de los porcentajes
	$.validator.addMethod("rangoPorcentajes", function(value) {
		if(value < 0 || value > 100){
			return false;
		}else{
			return true;
		}
	}, 'El valor debe estar contenido entre 0-100');
	
	//Validaci�n rangos de puntuaci�n
	$.validator.addMethod("rangoPuntuacion", function(value) {
		if(value < 0 || value > 10){
			return false;
		}else{
			return true;
		}
	}, 'El valor debe estar contenido entre 0-10');	
	
	//Validaci�n de suma de porcentajes igual 100
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
	
	//Validaci�n de minimos en los porcentajes TEOR�A
	$.validator.addMethod("minimaPuntuacionTeoria", function(value) {
		var teoria = Number($('#porcentajeT').val());
		
		var teoriaM = Number($('#porcentajeTMin').val());
		
		if(teoriaM <= teoria/10){
			return true;
		}else{
			return false;
		}
		
	}, 'Puntiaci\xF3n m\xCDnima incorrecta');
	
	//Validaci�n de minimos en los porcentajes PR�CTICAS
	$.validator.addMethod("minimaPuntuacionPractica", function(value) {
		var practica = Number($('#porcentajeP').val());
		
		var practicaM = Number($('#porcentajePMin').val());
		
		if(practicaM <= practica/10){
			return true;
		}else{
			return false;
		}
		
	}, 'Puntiaci\xF3n m\xCDnima incorrecta');
	
	//Validaci�n de minimos en los porcentajes TRABAJOS
	$.validator.addMethod("minimaPuntuacionTrabajo", function(value) {
		var trabajo = Number($('#porcentajeTV').val());
		
		var trabajoM = Number($('#porcentajeTVMin').val());
		
		if(trabajoM <= trabajo/10){
			return true;
		}else{
			return false;
		}
		
	}, 'Puntiaci\xF3n m\xCDnima incorrecta');
	
	//Validaci�n de minimos en los porcentajes TRABAJOS
	$.validator.addMethod("minimaPuntuacionAsistencia", function(value) {
		var asistencia = Number($('#porcentajeA').val());
		
		var asistenciaM = Number($('#porcentajeAMin').val());
		
		if(asistenciaM <= asistencia/10){
			return true;
		}else{
			return false;
		}
		
	}, 'Puntiaci\xF3n m\xCDnima incorrecta');
	
	$(id).validate();
}

