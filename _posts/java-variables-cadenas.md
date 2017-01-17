<h1>
	Variables de cadenas o Strings</h1>
<p>
	/**<br />
	* ValoresCadenas<br />
	* Clase que muestra la declaraci&oacute;n de variables de cadenas o Strings<br />
	*<br />
	* Para compilar:<br />
	*&nbsp;&nbsp; javac ValoresCadenas.java<br />
	*<br />
	* Para ejecutarlo:<br />
	*&nbsp;&nbsp; java ValoresCadenas<br />
	*/<br />
	&nbsp;<br />
	// Librer&iacute;a necesaria para trabajar con la entrada/salida<br />
	import java.io.*;<br />
	&nbsp;<br />
	/**<br />
	* clase ValoresCadenas<br />
	* Muestra la declaraci&oacute;n de Cadenas: son variables que &nbsp;<br />
	* contienen m&aacute;s de un caracter: una palabra una frase, etc...<br />
	* Para esto no existen tipos primitivos y se usa una clase<br />
	* llamada String<br />
	*<br />
	* Una clase, como ya se ver&aacute; m&aacute;s adelante es mucho m&aacute;s que un tipo<br />
	* de dato. Es una tipo complejo que tiene propiedas y m&eacute;todos.<br />
	*<br />
	* @author Pello Altadill<br />
	*/<br />
	public class ValoresCadenas {<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* main<br />
	&nbsp;&nbsp; &nbsp;* Funci&oacute;n principal<br />
	&nbsp;&nbsp; &nbsp;* esta funci&oacute;n es la que se inicia directamente al ejecutar el programa<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public static void main (String args[])<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String nombre;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String frase = &quot;A quien madruga, patada en los cojones&quot;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String presidente;<br />
	&nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Podemos iniciarla con una cadena vac&iacute;a<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String otraFrase = &quot;Solo quiero que seamos \&quot;amigos\&quot;&quot;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;int edad = 666;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;presidente = &quot;Cthulhu&quot;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;nombre = &quot;Optimus Prime&quot;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Los especiales comienzan por \<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;char nuevaLinea = &#39;\n&#39;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;char tabulacion = &#39;\t&#39;;<br />
	&nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Podemos unir dos cadenas con el operador de concatenaci&oacute;n.<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;frase = frase + nuevaLinea;<br />
	&nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Vamos a probar a mostrarlos por pantalla:<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(frase);<br />
	&nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Al concatenar n&uacute;meros se convierten en cadenas<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;frase = presidente + &quot; tiene : &quot; + edad + &quot; a&ntilde;os&quot;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;La frase queda as&iacute;: \n&quot; + frase);<br />
	&nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Y la otra frase: \n&quot; + otraFrase);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	}</p>
