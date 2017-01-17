<h1>
	Javajutsu, operadores de comparaci&oacute;n</h1>
<p>
	&iquest;Operadores de comparaci&oacute;n? Los mismos que en c.</p>
<p>
	&nbsp;</p>
<p>
	/**<br />
	* OperadoresComparacion<br />
	* Clase que muestra el uso de operadores de comparaci&oacute;n<br />
	*<br />
	* Para compilar:<br />
	*&nbsp;&nbsp; javac OperadoresComparacion.java<br />
	*<br />
	* Para ejecutarlo:<br />
	*&nbsp;&nbsp; java OperadoresComparacion<br />
	*/<br />
	&nbsp;<br />
	// Librer&iacute;a necesaria para trabajar con la entrada/salida<br />
	import java.io.*;<br />
	&nbsp;<br />
	/**<br />
	* clase OperadoresComparacion<br />
	* Muestra el uso de los operadores de comparaci&oacute;n que sirven para comparar<br />
	* entre si dos valores. Es importantes saber que:<br />
	* - Los dos valores comparadods deben ser del mismo tipo<br />
	* - El resultado es booleano, es decir verdadero o falso<br />
	*<br />
	* Los operadores de comparaci&oacute;n son los siguientes:<br />
	*&nbsp;&nbsp;&nbsp; &gt;&nbsp;&nbsp; mayor que, por ejemplo a mayor que b: a &gt; b<br />
	*&nbsp;&nbsp;&nbsp; &lt;&nbsp;&nbsp; menor que<br />
	*&nbsp;&nbsp;&nbsp; ==&nbsp; igual que<br />
	*&nbsp;&nbsp;&nbsp; &gt;=&nbsp; mayor o igual que<br />
	*&nbsp;&nbsp;&nbsp; &lt;=&nbsp; menor o igual que<br />
	*&nbsp;&nbsp;&nbsp; !=&nbsp; distinto de<br />
	*<br />
	* Normalmente se utilizan como expresiones para establecer una condici&oacute;n<br />
	* en estructuras condicionales, bubles, etc... y unidos mediante operadores<br />
	* booleanos pueden construirse expresiones m&aacute;s complejas<br />
	*<br />
	* @author Pello Altadill<br />
	*/<br />
	public class OperadoresComparacion {<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* main<br />
	&nbsp;&nbsp; &nbsp;* Funci&oacute;n principal<br />
	&nbsp;&nbsp; &nbsp;* esta funci&oacute;n es la que se inicia directamente al ejecutar el programa<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public static void main (String args[])<br />
	&nbsp;&nbsp; &nbsp;{<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Solo pueden ser true o false<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;boolean resultado;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;int enano, grande;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;char letra = &#39;a&#39;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;char otraLetra = &#39;k&#39;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;char mayuscula = &#39;A&#39;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String autobot = &quot;Optimus&quot;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String decepticon = &quot;Megatron&quot;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String agente = &quot;007&quot;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;enano = grande = 0;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;resultado = (enano == grande);<br />
	&nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Son iguales enano y grande? &quot; + resultado);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;grande = 42;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Podemos comparar y mostrar directamente. &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// la comparaci&oacute;n la ponemos entre par&eacute;ntesis por claridad &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Son iguales enano y grande? &quot; + (enano == grande));<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Es enano mayor que grande? &quot; + (enano &gt; grande));<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Es enano menor que grande? &quot; + (enano &lt; grande));&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Es enano distinto de grande? &quot; + (enano != grande));&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Podemos comparar letras&nbsp;&nbsp; &nbsp;e incluso cadenas<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;resultado = (letra &gt; otraLetra);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Es &#39;a&#39; mayor que &#39;k&#39; &quot; + resultado);&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;resultado = (letra == mayuscula);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Es &#39;a&#39; igual que &#39;A&#39; &quot; + resultado);&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Con las cadenas podemos usar == y !=<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Optimos es igual que Megatron? &quot; +&nbsp; (autobot == decepticon));&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Optimos es distinto de Megatron? &quot; +&nbsp; (autobot != decepticon));&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Esto no podriamos<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;//System.out.println(&quot;Y si una palabra empieza por un n&uacute;mero? &quot; +&nbsp; (agente &gt; autobot));&nbsp;&nbsp; &nbsp;<br />
	&nbsp;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	}</p>
