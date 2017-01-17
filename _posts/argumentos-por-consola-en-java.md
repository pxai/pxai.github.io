<h1>
	Javajutsu: Argumentos por consola en java</h1>
<p>
	Vamos a ver c&oacute;mo se recogen argumentos por la l&iacute;nea de comandos. Se hace igual que en c</p>
<p>
	/**<br />
	* Argumentos<br />
	* Clase que muestra c&oacute;mo recoger argumentos de la l&iacute;nea de comandos<br />
	*<br />
	* Para compilar:<br />
	*&nbsp;&nbsp; javac Argumentos.java<br />
	*<br />
	* Para ejecutarlo:<br />
	*&nbsp;&nbsp; java Argumentos argumento<br />
	*/<br />
	&nbsp;<br />
	// Librer&iacute;a necesaria para trabajar con la entrada/salida<br />
	import java.io.*;<br />
	&nbsp;<br />
	/**<br />
	* clase Argumentos<br />
	* Muestra c&oacute;mo recoger par&aacute;metros de la linea de comandos<br />
	* es decir, cuando ejecutamos el programa:<br />
	*&nbsp;&nbsp; java Argumentos ejemplo_de_argumento<br />
	* tras el nombre del programa podemos poner lo que queramos como<br />
	* par&aacute;metro. Para recoger los valores usaremos la variable args[]<br />
	*<br />
	* @author Pello Altadill<br />
	*/<br />
	public class Argumentos {<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* main<br />
	&nbsp;&nbsp; &nbsp;* Funci&oacute;n principal<br />
	&nbsp;&nbsp; &nbsp;* esta funci&oacute;n es la que se inicia directamente al ejecutar el programa<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public static void main (String args[])<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Vamos a suponer que nos han pasado alg&uacute;n argumento,<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Los argumentos los recoge autom&aacute;ticamente la variable<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// args[]. El primer argumento ser&iacute;a args[0], el segundo args[1], etc...<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;&iexcl;Hola Mundo! me has pasado: &quot; + args[0]);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Lo pasariamos as&iacute;:<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;//&nbsp;&nbsp; C:\jdk&gt;java Argumentos blablabla<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// ATENCI&Oacute;N, si NO le pasamos nada el programa casca con una excepci&oacute;n<br />
	&nbsp;&nbsp; &nbsp;}<br />
	}</p>
