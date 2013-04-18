function setCookie(name, value, expires, path, domain, secure) {
	document.cookie = name + "=" + escape(value) +
	((expires == null) ? "" : "; expires=" + expires.toGMTString()) +
	((path == null) ? "" : "; path=" + path) +
	((domain == null) ? "" : "; domain=" + domain) +
	((secure == null) ? "" : "; secure");
}

function getCookie(name){
	var cname = name + "=";
	var dc = document.cookie;
	if (dc.length > 0) {
	begin = dc.indexOf(cname);
	if (begin != -1) {
	begin += cname.length;
	end = dc.indexOf(";", begin);
	if (end == -1) end = dc.length;
	return unescape(dc.substring(begin, end));
	}
	}
	return null;
}

function refresco(){
	if(getCookie("validar") == "true"){

		location.href='#pageSignatures';
		peticionAsignaturas();
		
	}else{
		location.href="#pageLogin";
	}
}

function guardarCookie(nombre,valor) {
    document.cookie = nombre+"="+valor+";";
  }

function delCookie (name,path,domain) {
	if (getCookie(name)) {
	document.cookie = name + "=" +
	((path == null) ? "" : "; path=" + path) +
	((domain == null) ? "" : "; domain=" + domain) +
	"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
	}

var t;
window.onload=resetTimer;

	document.onkeypress=resetTimer;
	document.onclick=resetTimer;
	


function logout()
{
	alert("Tu sesi\xf3n ha caducado.");
	delCookie("validar");
	var cad='';
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'eliminarSesion',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			
		},
		error: function(respuesta){
		}
	});
	
	location.href='#pageLogin';
	
}

function logout_()
{
	delCookie("validar");
	var cad='';
	$.ajax({
		type: "GET",
		url: p_url,
		dataType: 'jsonp',
		data: {
			'm':'eliminarSesion',
			'datos':cad
		},
		contentType:'application/json; charset=utf-8',
		success: function(respuesta){
			
		},
		error: function(respuesta){
		}
	});
}

window.onbeforeunload=function(){
	logout_();
};
function resetTimer()
{
	if(getCookie("validar") == "true"){
		clearTimeout(t);
		t=setTimeout(logout,3600000); //logs out in 60 minutes
	}
}