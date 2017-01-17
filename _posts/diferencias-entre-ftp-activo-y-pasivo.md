Un temilla liante suele ser el del FTP activo y pasivo.
<br>
Como se sabe el FTP es un protocolo que establece dos conexiones
una de control (puerto 21) y otra de
datos (20), las dos son TCP.
<br>
<b>NO hay conexiones UDP. Que no!</b>
<br><br>
En el FTP Activo el cliente primero inicia una conexion al puerto 21 del
servidor y luego le indica al servidor que puerto va a utilizar para los datos.
Entonces el servidor es el que se encarga de abrir la conexion desde su puerto 20 al
puerto que le ha indicado el cliente.
<br><br>
<pre>
(la flecha indica de quien a quien se inicia)

cliente N --------> Server 21
cliente N+1 <--------- Server 20
</pre>
<br><br>

En el FTP Pasivo, es el cliente quien inicia las dos conexiones.
<br> Muchas
veces se pasa a este modo de forma automatica porque hay un firewall por medio que
no deja que alguien de fuera (el servidor en este caso)
inicie la conexion hacia
dentro.
<pre>
cliente N --------> Server 21
cliente N+1 ---------> Server 20
</pre>

La pagina con la explicacion
definitiva:
<a href="http://slacksite.com/other/ftp.html">http://slacksite.com/other/ftp.html</a>