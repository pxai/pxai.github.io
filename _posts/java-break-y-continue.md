<h1>
	JavaJutsu: break y continue</h1>
<p>
	Estas dos sentencias funcionan como en c. Break sirve para salir de una estructura de control como un switch case o de un bucle.</p>
<p>
	El continue sirve para que el bucle salte a la siguiente vuelta, sin salir del bucle.</p>
<p>
	Atenci&oacute;n al ejemplo y a c&oacute;mo hacer breaks cuando hay m&aacute;s de un bucle.</p>
<p>
	&nbsp;</p>
<p>
	/**<br />
	* BreakContinue<br />
	* Clase que muestra el uso de sentencias Break Continue para<br />
	* alterar la ejecuci&oacute;n de bucles While, Do-While, o For<br />
	*<br />
	* Para compilar:<br />
	*&nbsp;&nbsp; javac BreakContinue.java<br />
	*<br />
	* Para ejecutarlo:<br />
	*&nbsp;&nbsp; java BreakContinue<br />
	*/<br />
	&nbsp;<br />
	// Librer&iacute;a necesaria para trabajar con la entrada/salida<br />
	import java.io.*;<br />
	&nbsp;<br />
	/**<br />
	*&nbsp; clase BreakContinue<br />
	* Clase que muestra el uso de Break y Continue que nos sirven para<br />
	* modificar el normal comportamiento de los bucles.<br />
	* - Con break se rompe el bucle y se sale de &eacute;l.<br />
	* - Con continue interrumpimos la ejecuci&oacute;n actual del bucle y se salta a la siguiente vuelta<br />
	*&nbsp;&nbsp; sin salir del bucle. &nbsp;<br />
	*<br />
	*<br />
	* @author Pello Altadill<br />
	*/<br />
	public class BreakContinue {<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* main<br />
	&nbsp;&nbsp; &nbsp;* Funci&oacute;n principal<br />
	&nbsp;&nbsp; &nbsp;* esta funci&oacute;n es la que se inicia directamente al ejecutar el programa<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public static void main (String args[])<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Declaramos una serie de variables<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;int numero, anterior;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;int x,y;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;x = 10;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;while (x &gt; 0)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (x == 5)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;break; // salimos del bucle<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;x--;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Vamos a buscar los n&uacute;meros primos<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// que hay del 2 al 20<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;for (numero = 2; numero &lt; 20; numero++)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;anterior = numero;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;do<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;anterior--;<br />
	&nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// En cuanto es divisible, salimos<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (numero % anterior == 0)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;break;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;} while(anterior &gt; 2);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Si se ha llegado hasta el final, es primo<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (anterior == 2)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(numero + &quot; es un PRIMO&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Si tenemos dos bucles anidados, &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// &iquest;c&oacute;mo podemos salir de un bucle concreto con break?<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// hay que usar una etiqueta, que es un identificador seguido de<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// dos puntos:<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;salida:<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;for(x=1;x&lt;20;x++)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Bucle principal: &quot; + x);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (20 % x == 7)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{&nbsp;&nbsp; &nbsp;// salimos del bucle principal<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;break;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// para salir desde el bucle interno hasta fuera<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// tendremos que usar la etiqueta salida<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;for(y=10;y&gt;0;y--)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Bucle interno: &quot; + y);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (20 % y == 4)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{&nbsp;&nbsp; &nbsp;// Salimos de este y del bucle principal tambi&eacute;n<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// pero hay que especificar la etiqueta de salida<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;break salida;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}// for2<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}// for1<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	}</p>
