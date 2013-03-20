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
