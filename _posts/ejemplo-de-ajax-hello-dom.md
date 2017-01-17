Bueno al menos habia que probar este combinado de tecnologias.<br>
Los usuarios de Gmail ya habreis notado que tras la aparente sencillez del interfaz
ese correo web subyace un entramado de llamadas que nuestro navegador hace al servidor
por debajo de la mesa.<br><br>
Efectivamente, olviden lo que habian aprendido hasta ahora. Los navegadores modernos
son capaces de hacer peticiones a servidores web sin la tradicional recarga de la pagina.
<b>Ã‚Â¿Como es posible?</b><br>
AJAX significa Asynchronous Javascript And XML, basicamente se trata de que los navegadores
pueden hacer uso de un objeto de javascript (o un activeX) que puede hacer peticiones
a los servidores web por lo bajini. Todo ello, combinado con la manipulacion de los elementos
del documento HTML (DOM), y XML da lugar a la posibilidad de un dinamismo total en en lado
del cliente.<br> Un ejemplo:<br>
Hasta ahora en cualquier aplicacion web, si se producian cambios en la BBDD no se veian
reflejados en el navegador hasta que no se recargaba la pagina. Con AJAX eso ha cambiado,
ya que el navegador puede hacer consultas al margen de que se recargue o no la pagina
y puede reflejar los cambios de forma en el navegador  por ejemplo haciendo aparecer un 
bloque div.
<br><br>
<b>Vale, dame un ejemplo simple</b>
<br>
Ok, aqui van un par de ejemplos de peticiones AJAX dentro de un fichero llamado ajax.html
1. En el primero, helloDom, se hace una peticion GET y simplemente se muestra
el resultado con un alert.
2. En el segundo, conversor, se hace una peticion POST mandando parametros y 
se muestra la respuesta en un alert.
<br>
En los dos casos la respuesta viene en formato XML, pero no se procesa ni nada,
simplemente se vuelca el resultado.<br>
Puedes descargar los ficheros <a href="http://www.pello.info/filez/ajax.tgz">aqui</a><br>
O probar la ejecucion <a href="http://www.pello.info/filez/ajax/ajax.html">aqui</a>
<hr>
Este es el contenido de <b>ajax.html</b>:
<pre>
&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es" dir="ltr" lang="es"&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
 &lt;title&gt;Ejemplo simple de Ajax, Asynchronous Javascript And XML : hello dom&lt;/title&gt;
 &lt;script type="text/javascript"&gt;
 /*&lt;![CDATA[*/


 /**
 * helloDom: Ejemplo basico de AJAX (1)
 * Esta funcion invoca un objeto capaz de hacer peticiones a una pagina
 * sin que se recargue la pagina. Funciona en explorer 6 sp2 y Firefox 1.0.6
 * En este caso simplemente se solicita una pagina y se muestra el texto
 * www.pello.info
 */
 function helloDom () {
	 // Creamos el objeto, segun el navegador
	 if (window.XMLHttpRequest) { // Para los mozilla y los basados en gecko
 	   xmlhttprequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // Para Mordorsoft Exploiter
	    xmlhttprequest = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	
	// PREPARANDOSE PARA LA RESPUESTA
	// establecemos un handler para cuando llegue la respuesta,
	// es decir, le decimos que funcion procesara el XML
	//	xmlhttprequest.onreadystatechange = procesaXML;
	// Mejor declararla asi para especificar el parametro
	xmlhttprequest.onreadystatechange = function() { procesaXML(xmlhttprequest); };
	
	// HACIENDO LA PETICION
	// Open(metodo, url, y si queremos la peticion asincrona o no)
	xmlhttprequest.open('GET', 'saludo.xml', true);
	 
	 // No tiene por que ser XML, podria ser texto normal
	 //xmlhttprequest.open('GET','texto.txt',true);
	 
	 // Send es necesario para que se procese la peticion 
	 // pero es optativo pasar parametros para la URL remota
	 xmlhttprequest.send(null);
	 
 }
 
 /**
 * procesaXML
 * parametros: el objeto xmlhttprequest
 * Es la funcion handler que procesa el archivo recibido a traves
 * de la peticion.
 */
 function procesaXML (xhr) {

	 	// primermo comprobamos el estado de la respuesta
	// 0: sin inicializar
	// 1 : cargandose
	// 2 : cargado
	// 3 : interactivo
	// 4 : completa
	 if (xhr.readyState == 4) {
			// A continuacion comprobamos el codigo de respuesta HTTP del servidor
			// en caso de ser correcta seria 200 (OK)
			// Si hacemos una prueba local no es necesario
	 		//if (xhr.status == 200) {
	 			alert(xhr.responseText);
	 	 	//} else {
	 		//}
	  } else {
	    // Todavia no hay respuesta...
	  }
 }
 

 /**
 * conversor :  Ejemplo basico de AJAX (2)
 * Invocado desde el boton de conversion, prepara el objeto de peticion 
 * e invoca una pagina php remota
 */
  function conversor () {
 
 		var cantidad = document.getElementById("conversor").value;
 		
 // 		alert("La cantidad es " + cantidad);
 
	 // Creamos el objeto, segun el navegador
	 if (window.XMLHttpRequest) { // Para los mozilla y los basados en gecko
 	   xmlhttprequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // Para Mordorsoft Exploiter
	    xmlhttprequest = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	
	// PREPARANDOSE PARA LA RESPUESTA
	// establecemos un handler para cuando llegue la respuesta,
	xmlhttprequest.onreadystatechange = function() { procesaConversor(xmlhttprequest); };
	
	
	// HACIENDO LA PETICION
	// Open(metodo, url, y si queremos la peticion asincrona o no)
	xmlhttprequest.open('POST', 'procesa.php', true);
	 
	// Preparamos el POST. Hay que establecer esta cabecera
// para poder enviar variables por post
xmlhttprequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 
	 // Send es necesario si queremos pasar variables por POST
 // asi que construimos una especie de query string con variables=valores
	 xmlhttprequest.send("conversor="+cantidad);
	 
 }
 
 /**
 * procesaConversor
 * parametros: el objeto xmlhttprequest
 * Es la funcion handler que procesa el archivo recibido a traves
 * de la peticion. Es igual que la funcion anterior pero en este caso parseamos el XML
 */
 function procesaConversor (xhr) {

 	// primermo comprobamos el estado de la respuesta
	 if (xhr.readyState == 4) {
			// A continuacion comprobamos el codigo de respuesta HTTP del servidor
	 		if (xhr.status == 200) {
	 			alert(xhr.responseText);
	 	 	} else {
		 	 	alert("No se recibio una respuesta correcta. Respuesta HTTP: " + xhr.status);
	 		}

	  } else {

	    // Todavia no hay respuesta...

	  }

 }


 
 /*]]&gt;*/
 &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt; 
&lt;p&gt;
Es es un ejemplo muy simple de Ajax. Si pinchas en el enlace se hace una peticion para cargar un contenido
sin que se recargue la pagina.
&lt;/p&gt;
&lt;a href="javascript:helloDom()"&gt;Hello Dom&lt;/a&gt;

&lt;hr /&gt;

Este otro ejemplo envia el contenido de la caja de texto a una pagina php, recoge el resultado y lo carga

en la propia caja de texto. Todo ello sin que se recargue la pagina.

&lt;input type="text" name="conversor" id="conversor" value="" /&gt;

&lt;input type="button" name="boton" id="boton" value="Convierte &euro; a ptas." onclick="conversor()" /&gt;

&lt;hr /&gt;
 &lt;p&gt;
    &lt;a href="http://validator.w3.org/check?uri=referer"&gt;&lt;img
        src="http://www.w3.org/Icons/valid-xhtml10"
        alt="Valid XHTML 1.0 Transitional" height="31" width="88" /&gt;&lt;/a&gt;
  &lt;/p&gt;
  
&lt;/body&gt;
&lt;/html&gt;
</pre>

Este seria el contenido de procesa.php:
<pre>
&lt;?php

// Recibe los euros y los convierte a PTA
$euros = $_POST['conversor'];
$pesetas = $euros * 166.386;
?&gt;

&lt;conversor&gt;
&lt;euros&gt;&lt;?php echo $euros; ?&gt;&lt;/euros&gt;
&lt;pesetas&gt;&lt;?php echo $pesetas; ?&gt;&lt;/pesetas&gt;
&lt;/conversor&gt;
</pre>