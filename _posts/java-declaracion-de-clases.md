<h1>
	JavaJutsu: clases</h1>
<p>
	Java es una especie de C++ simplificado al que le han quitado la herencia m&uacute;ltiple y los punteros. Como todo lenguaje orientado a objetos utiliza clases, con sus propiedades y m&eacute;todos. Veamos un par de ejemplos:</p>
<p>
	<strong>Clase Gen&eacute;rica:</strong></p>
<p>
	/**<br />
	* Clases<br />
	* Clase que muestra la declaraci&oacute;n de una clase<br />
	*<br />
	* Para compilar:<br />
	*&nbsp;&nbsp; javac Clases.java<br />
	*<br />
	* Para ejecutarlo:<br />
	*&nbsp;&nbsp; java Clases<br />
	*/<br />
	&nbsp;<br />
	// Librer&iacute;a necesaria para trabajar con la entrada/salida<br />
	import java.io.*;<br />
	&nbsp;<br />
	/**<br />
	* clase Clases<br />
	* Clase que muestra la declaraci&oacute;n de una clase<br />
	*<br />
	* @author Pello Altadill<br />
	*/<br />
	public class Clases {<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;// ATRIBUTOS de CLASE<br />
	&nbsp;&nbsp; &nbsp;String nombre;<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* M&eacute;todo constructor, se ejecuta al crear una instancia de la clase<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;Clases ()<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;nombre = &quot;Juan Solo&quot;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Has creado una instancia de la clase&quot;);<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* saludo<br />
	&nbsp;&nbsp; &nbsp;* Un m&eacute;todo de la clase que simplemente saca un mensaje<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;void saludo ()<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Hola Mundo, soy &quot; + nombre);<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* main<br />
	&nbsp;&nbsp; &nbsp;* Funci&oacute;n principal<br />
	&nbsp;&nbsp; &nbsp;* esta funci&oacute;n es la que se inicia directamente al ejecutar el programa<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public static void main (String args[])<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Creamos una INSTANCIA de la clase:<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// es como declarar una variable, pero el tipo es el<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// nombre de la clase<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Clases unaClase = new Clases();<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Con la instancia llamamos a uno de sus m&eacute;todos<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;unaClase.saludo();<br />
	&nbsp;&nbsp; &nbsp;}<br />
	}</p>
<p>
	<strong>Clase Cliente:</strong></p>
<p>
	/**<br />
	* Cliente<br />
	* Clase que muestra la declaraci&oacute;n de una clase<br />
	*<br />
	* Para compilar:<br />
	*&nbsp;&nbsp; javac Cliente.java<br />
	*<br />
	* Para ejecutarlo:<br />
	*&nbsp;&nbsp; java Cliente<br />
	*/<br />
	&nbsp;<br />
	// Librer&iacute;a necesaria para trabajar con la entrada/salida<br />
	import java.io.*;<br />
	// Liber&iacute;a necesaria para la clase Date<br />
	import java.util.Date;<br />
	&nbsp;<br />
	/**<br />
	* clase Cliente<br />
	* Muestra la declaraci&oacute;n de una clase que representa un cliente. &nbsp;<br />
	* Una clase se compone de atributos (propiedades) y m&eacute;todos (funciones)<br />
	* La clase representa una entidad y cuando definimos una variable de<br />
	* de esa clase<br />
	*<br />
	* @author Pello Altadill<br />
	*/<br />
	public class Cliente {<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;// ATRIBUTOS o PROPIEDADES DE LA CLASE<br />
	&nbsp;&nbsp; &nbsp;public String nombre;<br />
	&nbsp;&nbsp; &nbsp;public String apellidos;<br />
	&nbsp;&nbsp; &nbsp;public Date nacimiento;<br />
	&nbsp;&nbsp; &nbsp;public int codigo;<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;// M&Eacute;TODOS DE LA CLASE: Constructores, y otras funciones<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* Cliente<br />
	&nbsp;&nbsp; &nbsp;* este es el m&eacute;todo constructor, al que se invoca<br />
	&nbsp;&nbsp; &nbsp;* al crear una instancia de la clase<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;Cliente ()<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Has creado una instancia de Cliente&quot;);<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* Cliente<br />
	&nbsp;&nbsp; &nbsp;* Otro constructor con par&aacute;metros.<br />
	&nbsp;&nbsp; &nbsp;* Nos sirve para crear una instancia<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;Cliente (String nombre, String apellidos, Date nacimiento, int codigo)<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Has creado una instancia de Cliente&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.nombre = nombre;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.apellidos = apellidos;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.nacimiento = nacimiento;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.codigo = codigo;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* nombreCompleto<br />
	&nbsp;&nbsp; &nbsp;* M&eacute;todo que une el nombre y el apellido del Cliente<br />
	&nbsp;&nbsp; &nbsp;* @return resultado<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public String nombreCompleto ()<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String resultado = nombre + &quot; &quot; + apellidos;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return resultado;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* fichaCliente<br />
	&nbsp;&nbsp; &nbsp;* M&eacute;todo que muestra todos los datos del cliente<br />
	&nbsp;&nbsp; &nbsp;*<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public void fichaCliente ()<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;--Ficha del Cliente--&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;C&oacute;digo: &quot; + codigo);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Nombre completo: &quot; + nombreCompleto());<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Fecha nacimiento: &quot; + nacimiento);<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* saluda<br />
	&nbsp;&nbsp; &nbsp;* Un m&eacute;todo que nos muestra un saludo<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public void saluda ()<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Hola mundo desde la clase&quot;);<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* main<br />
	&nbsp;&nbsp; &nbsp;* Funci&oacute;n principal<br />
	&nbsp;&nbsp; &nbsp;* esta funci&oacute;n es la que se inicia directamente al ejecutar el programa<br />
	&nbsp;&nbsp; &nbsp;* Y desde ella vamos a crear una instancia de Cliente<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public static void main (String args[])<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Creamos un par de instancias<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Cliente unCliente = new Cliente();<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Cliente otroCliente = new Cliente(&quot;Darth&quot;,&quot;Vader&quot;, new Date(), 666);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;unCliente.codigo = 89;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;otroCliente.fichaCliente();<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;unCliente.saluda();<br />
	&nbsp;&nbsp; &nbsp;}<br />
	}</p>
