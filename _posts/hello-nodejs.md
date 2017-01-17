<p>
Hay gente que con la imposición vital esa de que hay que probar de todo va y se mete ketamina.
Otros preferimos echar un vistazo a nodejs, en pleno viernes y después de haber visto Guerra Mundial Z.
No estaba mal.
</p>
<img src="http://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png" title="nodejs logo" alt="nodejs logo" />
<p>Bueno, definiciones  decentes de nodejs tendrás mejores, pero básicamente, aquel javascript que se supone que había para servidor ahora ya no es una especie de mito, ahora es algo completamente viable. Nodejs es una plataforma de desarrollo de aplicaciones de <b>javascript</b> que podemos usar en un servidor para eso, para dar servicio. Y promete un edén de rendimiento y escalabilidad. Una de sus claves
es que está orientado a eventos por lo que tienes que cambiar la forma de diseñar las aplicaciones. En node hay un único hilo de ejecución, pero lo petas de eventos. Seguramente habrás visto que te haces un servidor web con 4 líneas de código: es cierto.
</p>

<p>Si ejecutas simplemente node te sale una especie de shell donde puedes meter código javascript,
como por ejemplo</p>
<pre class="brush: js">
root@bt:~/nodejs# node
> console.log("hola");
hola
undefined
> .help
.break	Sometimes you get stuck, this gets you out
.clear	Alias for .break
.exit	Exit the repl
.help	Show repl options
.load	Load JS from a file into the REPL session
.save	Save all evaluated commands in this REPL session to a file
> var i = 600;
undefined
> var j = 66;
undefined
> i = i + j;
666
> 

</pre>

<p>Ahora mismo nodejs es de esos proyectos muy vivos con muchas aportaciones y desarrolladores creando módulos. al igual que otras tecnologías trae una base y luego se le pueden añadir infinidad de módulos, pero para
que no te falte lo esencial aquí tienes la lista de los <a href="https://nodejsmodules.org/">15 más solicitados.</a>. Para instalar los módulos prepara la conexión a internet y ejecuta:</p>
<pre class="brush: bash">
linux# npm install express jade
</pre>

<p>Con eso instalaríamos los módulos express y jade por ejemplo.</p>

<p>Para ejecutar un programa con node lo que hacemos es invocar node pasándole un nombre
de fichero javascript:</p>
<pre class="brush: bash">
linux# node helloserver.js 
Listening on port 8666

</pre>

<h5>Dicíendo hola por web</h5>
<p>
Hay varias formas de hacer esto, muchas veces verás que se usa el módulo <em>http</em> pero en mi caso
me ha gustado más el express con el evento get. Es muy simple. Le decimos un puerto, lo ponemos a la escucha y luego vamos metiendo eventos get que respondan a distintas url. El evento tiene dos parámetros
request y response, qué míticos. Con response obviamente mandamos la respuesta. Para este ejemplo
tenemos que tener el módulo express instalado.
</p>
<pre class="brush: js">
/**
* Hello server using express module
* It will respond to an event when it receives '/hello' request
* To test just run this with
* linux# node helloserver.js
* And see from a browser http://localhost:8666/hello
* @author Pello Xabier Altadill Izura
*/
var express = require('express');
var myserver = express();
var port = 8666;  // By demon be driven

// event when server receives GET /hello request
myserver.get('/hello', function(req, res){
	res.send('Say hello to my little friend');
});

myserver.listen(port);
console.log('Listening on port ' + port);
</pre>

<h5>Acceso a MongoDB</h5>
<p>
Tenemos varias formas de acceder a BBDD MongoDB, en mi caso voy a meter el módulo mongoose, pero también
tenemos mongojs y mongodb. A ver, va a ser una cosa curiosa. Se conecta a una BBDD y la consulta la hará
de forma similar al cliente Mongo, pero antes de hacer la consulta hay que decirle de alguna forma cómo es
el esquema que va a recibir. En otros lenguajes tú haces la consulta y luego vas haciendo: dame un string, un entero,... con Mongoose se hace al revés. Primero defines lo que esperas y luego ya consultas con find. En este caso es una BBDD de frases y sacamos todos los registros. Tal y como se explica en el programa, sacar un registro aleatorio de MongoDB no es algo directo y hay que hacer marranadas (para mí sí, lo siento) para conseguirlo. Bueno, al rollo:
</p>
<pre class="brush: js">
/**
* Access to mongodb database
* using mongoose module. It's weird but:
* "programmers need to define consistent access patterns in their own programs."
* @author Pello Xabier Altadill Izura
* picking a random record seems to be a tricky issue, and a feature request is pending yet:
* https://jira.mongodb.org/browse/SERVER-533
* Import quotes.json to quotesdb database:
* mongoimport -d quotesdb -c quotes  quotes.json
*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotesdb');

console.log('Let\'s connect');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Here comes the weird thing -for me-.
// to query mongodb you've to define the Schema you expect.
var quotesSchema = new mongoose.Schema({ content: 'string', author: 'string' });
var quotes = mongoose.model('quotes', quotesSchema);

// Once we are connected we can query the database
db.once('open', function callback () {
  console.log('Ok, we are connected');

  // Here we can behave like a mongo client.
  // so we execute a find on every record {}, showing all fields {}
  // and with a callback function to show results.
  quotes.find({},{},function (err, allquotes) {
  	//if (err) // TODO handle err
  	allquotes.forEach(function (q) {
				  	console.log(q.content)
  				});
	});
});
</pre>

<h5>Putting all together</h5>
<p>
Pues eso, mezclo el server inicial con esta consulta a mongo y ya tengo un servidor web en nodejs
que responde a peticiones con consultas a una BBDD. Otra pieza más en el puzzle... pero ojo, mucho
javascript pero aquí hay más backend que en un tomcat.
</p>
<pre class="brush: js">
/**
* quote server
* Mixing express and mongoose
* @author Pello Xabier Altadill Izura
*/
// Web server creation
var express = require('express');
var myserver = express();
var port = 8666;  // By demon be driven

// Run the server...
myserver.listen(port);
console.log('Listening on port ' + port);

// Database access
var mongoose = require('mongoose');
// connection
mongoose.connect('mongodb://localhost/quotesdb');

// Must define this once
var quotesSchema = new mongoose.Schema({ content: 'string', author: 'string' });
var quotes = mongoose.model('quotes', quotesSchema);

// event: when the servers receives a GET /quote
myserver.get('/quote', function(req, res){

	// We select the first record....
 	 quotes.findOne(function (err, quote) {
  			// And we serve...
			res.send(quote.content)
		});

});

</pre>

<p>
Por si quieres probar la BBDD, mete esto en un fichero quotes.json y ejecuta:
<code>mongoimport -d quotesdb -c quotes  quotes.json</code>
</p>
<pre class="brush: js">
{ "_id" : { "$oid" : "52056e0401853f407ce977b0" }, "content" : "I am your father", "author" : "Darth Vader" }
{ "_id" : { "$oid" : "52056e9001853f407ce977b2" }, "content" : "Why so serious?", "author" : "The Joker" }
{ "_id" : { "$oid" : "52056ecc01853f407ce977b3" }, "content" : "I find your lack of faith disturbing", "author" : "Darth Vader" }

</pre>
