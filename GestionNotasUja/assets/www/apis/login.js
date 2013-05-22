/*----------- PETICIONES JSON -----------*/

/**
 * Funcion para almacenar los valores de recuerdame
 */
function leerDatosUsuario(){

   var check = window.localStorage.getItem("check");
   alert("lee datos");
   alert(check);
   if(check=='true'){
	   alert("Econtramos datos");
	   var email = window.localStorage.getItem("correo");
	   var pass = window.localStorage.getItem("pass");  
	   $("#passwordinput").val(pass);
	   $("#textinput").val(email);
	   $("#checkRec").attr('checked', true);
   }
}

function comprobarDatosUsuario(){
	 var check = $("#checkRec").attr('checked');
	 alert("comprobamos datos");
	 if(check =='checked'){
		 alert("check a on");
		var pass = $("#passwordinput").val();
		var email =  $("#textinput").val(); 
		alert(pass);
		alert(corre);
		window.localStorage.setItem("pass",pass);
		window.localStorage.setItem("correo",email);
		window.localStorage.setItem("check","true");
	 }else{
		 alert("check a off");
		 var check = window.localStorage.getItem("check");
		 if(check == 'true'){
			 window.localStorage.removeItem("correo");
			 window.localStorage.removeItem("pass");
			 window.localStorage.setItem("check","false"); 
		 }
		 
	 }
	
}


/*************************************************************************
 ** @name 		 : peticionLogin
 ** @description : Petición json de login
 *************************************************************************/
function peticionLogin(){
    console.log($('#formLogin').serialize());
	
	var cad = "[" + JSON.stringify($("#formLogin").serializeObject()) + "]";
	cad= cad.substring(0, cad.lastIndexOf("\"pass\":"));
	cad = cad + '"pass":"' + hex_sha1($('#passwordinput').val()) + '"}]';

	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'log',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			arrayRespuesta = eval(respuesta);
            if (arrayRespuesta["ok"] == 0){
				alert('Login incorrecto');
				//navigator.notification.alert('Acceso incorrecto',null,'Login', 'Aceptar');
			}else{
				//Guardamos el Id de la sessión
				document.cookie= "validar=true";
				resetTimer();
				idSesion = arrayRespuesta["sesion"];
				peticionAsignaturas(); //Lista de asignaturas del profesor
				location.href = "#pageSignatures";
				comprobarDatosUsuario();
			}
		},
		error: function(respuesta){
			alert("Su sesi\xf3n se ha cerrado automaticamente.");delCookie("validar");location.href="#pageLogin";
		}
	});
}



