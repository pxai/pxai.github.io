<p>
	&nbsp;</p>
<h1>
	Acceso a Web desde Android</h1>
<div>
	&nbsp;</div>
<div>
	En plena era de la web no es de extra&ntilde;ar que android disponga de facilidades para</div>
<div>
	acceder a la misma. Previamente tenemos que dar permiso a la aplicaci&oacute;n para que pueda</div>
<div>
	salir a internet en el Manifest:</div>
<div>
	&nbsp; &nbsp; &lt;uses-permission android:name=&quot;android.permission.INTERNET&quot;&gt;&lt;/uses-permission&gt;</div>
<div>
	&nbsp;</div>
<div>
	Tras eso podemos consultar la web de varias formas, aqu&iacute; veremos tres:</div>
<p>
	- Utilizar un WebView, que es un View especial para cargar html de la red.</p>
<p>
	- Utilizar las clases httpclient para hacer peticiones get</p>
<p>
	- Utilizar httpclient para hacer post.</p>
<div>
	&nbsp;</div>
<div>
	<a href="http://www.pello.info/filez/android/15.Redes.tar.gz">Descargar ejemplo de acceso a Android</a></div>
<div>
	&nbsp;</div>
