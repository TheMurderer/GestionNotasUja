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

/*************************************************************************
 ** @name 		 : comprobarPorcentajes
 ** @description : Función que comprueba si los porcentajes introduccidos
 **				   son correctos
 *************************************************************************/
function comprobarPorcentajes(){
	var teoria = Number($('#porcentajeT').val());
	var practica = Number($('#porcentajeP').val());
	var trabajos = Number($('#porcentajeTV').val());
	var asistencia = Number($('#porcentajeA').val());
	
	var teoriaM = Number($('#porcentajeTMin').val());
	var practicaM = Number($('#porcentajePMin').val());
	var trabajosM = Number($('#porcentajeTVMin').val());
	var asistenciaM = Number($('#porcentajeAMin').val());
	
	if( (teoria + practica + trabajos + asistencia) != 100 ){
		alert(teoria + practica + trabajos + asistencia);
		return false;
	}else{
		if(teoriaM <= teoria/10 && practicaM <= practica/10 && trabajosM <= trabajos/10 
				&& asistenciaM <= asistencia/10){
			return true;
		}else{
			return false;
		}
	}
}

/*************************************************************************
 ** @name 		   : numeroGrupos
 ** @description   : Función que comprueba si los porcentajes introduccidos
 **				     son correctos
 ** @param idGrupo : id del elmento a comprobar
 *************************************************************************/
function numeroGrupos(){
	alert($("#DivGruposTeoria a").size());
}