<p>
	JavaJutsu: el bucle while</p>
<p>
	Los bucles se hacen igual que en c. Vamos a ver un ejemplo con el bucle while:</p>
<p>
	/**<br />
	* While<br />
	* Clase que muestra los bucles while<br />
	*<br />
	* Para compilar:<br />
	*&nbsp;&nbsp; javac While.java<br />
	*<br />
	* Para ejecutarlo:<br />
	*&nbsp;&nbsp; java While<br />
	*/<br />
	&nbsp;<br />
	// Librer&iacute;a necesaria para trabajar con la entrada/salida<br />
	import java.io.*;<br />
	&nbsp;<br />
	/**<br />
	* clase While<br />
	* Muestra el uso de bucles while. Este tipo de bucles<br />
	* repiten unas sentencias mientras una condici&oacute;n sea verdadera.<br />
	* El final no ser&aacute; previsible.<br />
	* Formato:<br />
	*&nbsp; while (true)&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	*&nbsp; {<br />
	*&nbsp;&nbsp;&nbsp;&nbsp; sentencias;<br />
	*&nbsp; }<br />
	*<br />
	* @author Pello Altadill<br />
	*/<br />
	public class While {<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* main<br />
	&nbsp;&nbsp; &nbsp;* Funci&oacute;n principal<br />
	&nbsp;&nbsp; &nbsp;* esta funci&oacute;n es la que se inicia directamente al ejecutar el programa<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public static void main (String args[])<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Vamos a usar un contador<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;int contador = 10;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Ejecutamos el bucle mientras contador sea mayor que 0<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;while (contador &gt; 0)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Dentro del bucle &quot; + contador);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// y vamos decrementando<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;contador--;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Vamos a hacer otra prueba<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;contador = 10;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;El siguiente bucle:&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Atenci&oacute;n: podemos actualizar la variable en la propia condici&oacute;n<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;while (contador-- &gt; 0)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Dentro del bucle &quot; + contador);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// el bucle infinito: simplemente poniendo en la condici&oacute;n true<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;//while (true)&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;//&nbsp;&nbsp; sentencias;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// }<br />
	&nbsp;&nbsp; &nbsp;}<br />
	}</p>
