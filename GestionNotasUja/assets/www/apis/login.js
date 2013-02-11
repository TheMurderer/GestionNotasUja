function llamadaDatosLogueo(){
	console.log($('#formRegister').serialize());
	var p_url = "http://serrano5510.servehttp.com:8443/ServicioWeb/index.php";

	//alert(JSON.stringify($("#formRegister").serializeObject()));
	var cad = "[" + JSON.stringify($("#formRegister").serializeObject()) + "]";
	//alert(cad);
	/* $.get(p_url,
	    {
	        'm' : 'reg',
	        'datos' : cad
	    },
	    function(data){
	        alert('hola');
	    }
		);*/
	
	function bien(data){
		alert('guay');
	}
	
	function mal(data){
		alert('error');
	}
	var datas = 'm=reg&datos=' + cad;
	$.ajax({
		type: "GET",
		url: p_url,
		data: {
			'm':'reg',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(datos){
			alert("funcion");
		}
		
	});
	
//	$.getJSON(p_url,
//			{
//				'm':'reg',
//				'datos' : cad
//			},function(data){alert('perfect');});
}