<p>Otra de las novedades que trae HTML5 es la de los famosos websockets. El protocolo HTTP funciona de tal manera que no existe una conexión fija entre el cliente y el servidor; el navegador y el servidor se están continuamente lanzando <i>piedras</i> con mensajes, y a veces para simular que la conexión es permanente (una sesión) se acompaña de alguna marca como una cookie. Los websockets nos dan la posiblidad de establecer una conexión fija entre cliente y servidor como la que hay en un IRC o en los servicios de juegos; en el navegador podemos conectarnos a un servidor de websockets con una especie de Sockets ultrasimplificados y por supuesto orientados a eventos.
</p>
<p>Esto nos abre puertas a muchas aplicaciones, desde información en tiempo real, el obvio chat, juegos HTML5 multijugador, etc... . Una pregunta que en buena lógica atormentaría a cualquier sysadmin con canas que oye hablar de esto por primera vez es <i>pero chacho ¿qué servidor va a aguantar ahora la tralla de conexiones permanentes?</i> Un servidorcillo web con su apache y su php si encima le exiges mantener conexiones permanentes reventará. Ahí es donde entran en juego tecnologías como Node.js, que con un solo hilo y con eventos te aguantan lo que sea.
</p>

<h5>Websockets 'puros'</h5>
<p>En teoría los navegadores debieran tener soporte para un objeto javascript llamado WebSocket y un programa cliente podría tener este aspecto:</p>
<pre class="brush: js">
<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>pure WebSockets</title>
        <meta name="description" content="Webworkers sample">
        <script src="http://localhost/js/jquery.min.js"></script>
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    </head>
    <body>

        <!-- Add your site or application content here -->
        <p>Hello Web Sockets - PURE</p>

        <script>
$( document ).ready(function() {

    var SERVER = 'ws://localhost:8666/';

    var webSocket = new WebSocket(SERVER);

    /**
    * when socket is opened
    * we send a message
    */
    webSocket.onopen = function () {
        var dataToSend = $('#usertext').val();
        console.log("Writing to server: " + dataToSend);
        webSocket.send(JSON.stringify({data: dataToSend}));
    };

    /**
    * when user press enter in textfield we sent the message
    */
    $('#usertext').keypress(function (event) {
        var dataToSend = $('#usertext').val();
        if (event.which == 13) {
            $('#chattext').append(dataToSend + '\n');           
            $('#usertext').val(""); 
            console.log('Sending to server: ' + dataToSend);
            webSocket.send(JSON.stringify({data: dataToSend}));
        }
    });


    /**
    * callback when message is received from server
    */
    webSocket.onmessage = function (msg) {
        console.log('Response from server: ' + msg);
        $('#chattext').html(msg.data);
    }

          
});
        </script>
	<h5>Pure Web Sockets sample</h5>

<textarea name="chattext" id="chattext" cols="40" rows="10"></textarea><br />
<label for="usertext">Your answer</label><br />
<input type="text" name="usertext" id="usertext" value="" placeholder="Write and press enter" />

  </body>
</html>

</pre>
<p>
Pero al igual que pasaba con el IndexedDB, el soporte para WebSockets todavía no está plenamente extendido (quizás mientras escribo este texto entre paréntesis la cosa esté cambiando). ¿Tenemos alguna opción, alguna librería que nos unifique la programación de websockets de forma transparente? Existe y se llama:
</p>

<h5>Socket.io, websockets que funcionan en cualquier navegador</h5>
<img src="http://www.pello.info/images/socketio.png" alt="Logo gafapastero de socket.io" title="¡Qué logo! los niveles de gafapastismo se salen de las tablas" />
<p>Socket.io sería como el <i>one wrapper to rule them all</i>. Si te descargas el zip desde (cómo no) <a href="https://github.com/learnboost/socket.io/">su repositorio github</a> te toparás con algo peculiar. NO HAY una librería js para el lado cliente. Lo que te encuentras es un conjunto de librerías listas para montar un servidor Node.js que usa socket.io. Lo que haces es crear una especie de servidor web/websocket. Lo único que hace la parte web es servirte una página html destinada a contener el código del cliente websocket. ¿Y la librería js de socket.io? Te la genera tu servidor Node.js+socket.io al vuelo según las necesidades del navegador ¡¡¡Crema máxima!!!. El servidor aparte de servir esa página lo que tiene luego no son más que handlers según el tipo de mensaje que le llegue. Es decir, tanto el cliente como el server pueden mandar contenido precedido de una cadena, y eso nos sirve para poder dirigir el control a distintos handlers, muy bien pensado para evitar un mega switch-case. Aquí lo puedes ver:</p>
<pre class="brush: js">
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8666);

function handler (req, res) {
  // We send back the client interface
  // with socket.io dynamic library
  fs.readFile(__dirname + '/websockets.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading websockets.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

/**
* onConnection controller.
* we set a kind of event depending on emit parameters.
* when client send emit('event666') the handler will be socket.on('event666')
*/
io.sockets.on('connection', function (socket) {
  
  socket.on('myname', function (data) {
    console.log('Received from client:' + data.name);
    socket.emit('fromserver', { msg: 'ok, hello ' + data.name });
  });

  socket.on('fromclient', function (data) {
    console.log('Received from client:' + data);
      socket.emit('fromserver', { msg: 'ok, message received: ' + data.msg });
  });

});
</pre>

<p>Debo decir que para iniciar el server he tenido que instalarme algún paquete que faltaba, pero luego ya sin problemas.</p>


<h5>El cliente</h5>
<p>¿Y qué aspecto tiene el cliente? Bien, en lugar de utilizar la librería estándar WebSocket, lo que haces es usar socket.io y el método emit. Y el resto sigue siendo igual de simple. En mi caso tenía un navegador iceweasel más desfasado que los pantalones de campana (quizás mientras escribo este texto entre paréntesis las estanterías de los bershka se están llenando otra vez de esos pantalones). Pero gracias a socket.io y su fallback de tecnologías (intento una, luego otra, luego otra) he podido conectarme y comunicarme con el servidor.
</p>
<pre class="brush: js">
<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>WebSockets</title>
        <meta name="description" content="Webworkers sample">
        <script src="/socket.io/socket.io.js"></script>
        <script src="http://localhost/js/jquery.min.js"></script>
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    </head>
    <body>

        <!-- Add your site or application content here -->
        <p>Hello Web Sockets</p>

        <script>
$( document ).ready(function() {

    var SERVER = 'http://localhost:8666/';

  var webSocket = io.connect(SERVER);

  // I introduce myself to the server
  webSocket.emit('myname', { name: 'Satan' });

  /**
  * If servers emit a message with 'fromserver' header
  * we handle here.
  */
  webSocket.on('fromserver', function (data) {
        console.log('Received from server: ' + data.msg);
        $('#chattext').append('Server: ' + data.msg +'\n');
  });


    /**
    * when user press enter in textfield we sent the message
    */
    $('#usertext').keypress(function (event) {
        var dataToSend = $('#usertext').val();
        if (event.which == 13) {
            $('#chattext').append('(' + dataToSend +' sent)\n');          

            console.log('Sending to server: ' + dataToSend);
            webSocket.emit('fromclient', { msg: dataToSend });
            $('#usertext').val(""); 
        }
    });
          
});
        </script>
	<h5>Web Sockets sample</h5>

<textarea name="chattext" id="chattext" cols="40" rows="10"></textarea><br />
<label for="usertext">Your answer</label><br />
<input type="text" name="usertext" id="usertext" value="" placeholder="Write and press enter" />


	
  </body>
</html>

</pre>
<p>Et voila!</p>
<img src="http://www.pello.info/images/socketiosample.png" alt="prueba de concepto" title="Ejemplo en acción, logs everywhere" />

<p>Obviamente esto no era más que una prueba de concepto, pero ha merecido la pena para conocer socket.io. Funciona, la web trae muchos ejemplos listos para usar (con express también), y vamos está muy bien montado. Hasta que HTML5 se estabilice, será indispensable usar librerías como esta.
</p>

<p>Y sí, el título de <i>...and Websockets for all</i> es por Metallica, porque algunos somos tan raros que no estamos obsesionados con el Master of Pupppets.</p>