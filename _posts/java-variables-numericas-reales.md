<h1>
	Variables Reales</h1>
<p>
	As&iacute; se manejan las variables num&eacute;ricas de n&uacute;meros reales. Atenci&oacute;n a las constantes float.</p>
<p>
	/**<br />
	* ValoresReales<br />
	* Clase que muestra la declaraci&oacute;n de variables num&eacute;ricas &lt;b&gt;de coma flotante&lt;/b&gt;<br />
	*<br />
	* Para compilar:<br />
	*&nbsp;&nbsp; javac ValoresReales.java<br />
	*<br />
	* Para ejecutarlo:<br />
	*&nbsp;&nbsp; java ValoresReales<br />
	*/<br />
	&nbsp;<br />
	&nbsp;<br />
	/**<br />
	* clase ValoresReales<br />
	* Muestra la declaraci&oacute;n de tipos num&eacute;ricos reales o de coma flotante:<br />
	*&nbsp; float&nbsp;&nbsp; : real precisi&oacute;n simple, 4 bytes<br />
	*&nbsp; double&nbsp; : real precisi&oacute;n doble, 4 bytes<br />
	*<br />
	* @author Pello Altadill<br />
	*/<br />
	public class ValoresReales {<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* main<br />
	&nbsp;&nbsp; &nbsp;* Funci&oacute;n principal<br />
	&nbsp;&nbsp; &nbsp;* esta funci&oacute;n es la que se inicia directamente al ejecutar el programa<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public static void main (String args[])<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// En los tipos reales debemo usar un . en lugar de , para las decimales<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;float temperatura;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Al asginar valor le ponemos la F para distinguir del tipo double<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;float peso = 78.9F;<br />
	&nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;double saldoCuentaCorriente = 3423343.43D;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Los valores altos se pueden abreviar:<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// esto ser&iacute;a 4.6 multiplicado por 10 elevado a 9.<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;double masaJupiter = 4.6E+9D;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Vamos a probar a mostrarlos por pantalla: concatenamos con +<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Tu peso es : &quot; + peso + &quot;, y tu saldo: &quot; + saldoCuentaCorriente);<br />
	&nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;La masa de Jupiter: &quot; + masaJupiter);<br />
	&nbsp;&nbsp; &nbsp;}<br />
	}</p>
