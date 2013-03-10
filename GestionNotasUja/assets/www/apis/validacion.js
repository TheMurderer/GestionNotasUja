function soloNumeros(texto,min,max){
	var pattern = /[^0-9\.]/g; 
	texto.value = texto.value.replace(pattern, '');
	
	if(texto.value < min || texto.value > max){
		texto.value = '';
	}
}
