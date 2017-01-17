<h1>
	JavaJutsu: HashTable</h1>
<p>
	Un hashtable es un array donde los &iacute;ndices pueden ser objetos no necesariamente num&eacute;ricos. Cada &iacute;ndice debe ser &uacute;nico.</p>
<p>
	Lo habitual es que el &iacute;ndice sea un String.</p>
<p>
	&nbsp;</p>
<div>
	/**</div>
<div>
	* Hashtables</div>
<div>
	* Clase que muestra el uso de la estructura de datos Hashtable</div>
<div>
	*</div>
<div>
	* Para compilar:</div>
<div>
	* &nbsp; javac Hashtables.java</div>
<div>
	*</div>
<div>
	* Para ejecutarlo:</div>
<div>
	* &nbsp; java Hashtables</div>
<div>
	*/</div>
<div>
	&nbsp;</div>
<div>
	// Librer&iacute;a necesaria para trabajar con la entrada/salida</div>
<div>
	import java.io.*;</div>
<div>
	&nbsp;</div>
<div>
	// Librer&iacute;a necesaria para trabajar con Hashtables</div>
<div>
	import java.util.*;</div>
<div>
	&nbsp;</div>
<div>
	/**</div>
<div>
	* clase Hashtables</div>
<div>
	* Muestra el uso de la estructura de datos Hashtable</div>
<div>
	* Los hashtable son estructuras cuyos elementos por un lado tienen una clave</div>
<div>
	* que sirve como identificador &uacute;nico y por otro el resto de los datos de ese elemento.</div>
<div>
	* Para agregar un elemento usamos el m&eacute;todo put, indicando la clave de ese elemento</div>
<div>
	* y el objeto que contiene. Para sacar un elemento usamos get, donde debemos indicar</div>
<div>
	* el campo clave.</div>
<div>
	* Por tanto las claves de los elementos de una Hashtable no pueden repetirse.</div>
<div>
	*</div>
<div>
	* @author Pello Altadill</div>
<div>
	*/</div>
<div>
	public class Hashtables {</div>
<div>
	&nbsp;</div>
<div>
	/**</div>
<div>
	* main</div>
<div>
	* Funci&oacute;n principal</div>
<div>
	* Desde la funci&oacute;n principal probamos un Hashtable</div>
<div>
	*/</div>
<div>
	public static void main (String args[])</div>
<div>
	{</div>
<div>
	Hashtable misClientes = new Hashtable();</div>
<div>
	&nbsp;</div>
<div>
	Cliente clienteVip = new Cliente(&quot;66666666X&quot;,&quot;Bill Gates&quot;,false);</div>
<div>
	Cliente otroCliente = new Cliente(&quot;00000042X&quot;,&quot;Asimov&quot;,false);</div>
<div>
	&nbsp;</div>
<div>
	// Agregamos los dos clientes a la hashtable:</div>
<div>
	// primero indicamos un valor clave y luego el objeto en si</div>
<div>
	misClientes.put(&quot;66666666X&quot;,clienteVip);</div>
<div>
	misClientes.put(otroCliente.dni,otroCliente);</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	misClientes.put(&quot;10100100A&quot;,new Cliente(&quot;10100100A&quot;,&quot;Arale&quot;,true));</div>
<div>
	&nbsp;</div>
<div>
	// Podemos comprobar si existe determinado elemento</div>
<div>
	// a trav&eacute;s de su clave</div>
<div>
	if (misClientes.containsKey(&quot;00000042X&quot;)) {</div>
<div>
	((Cliente)misClientes.get(&quot;00000042X&quot;)).sacarDatos();</div>
<div>
	}</div>
<div>
	&nbsp;</div>
<div>
	// Vamos a recorrer todo a trav&eacute;s de las claves</div>
<div>
	Enumeration lista = misClientes.keys();</div>
<div>
	&nbsp;</div>
<div>
	while(lista.hasMoreElements()) {</div>
<div>
	String clave = (String)lista.nextElement();</div>
<div>
	((Cliente)misClientes.get(clave)).sacarDatos();</div>
<div>
	}</div>
<div>
	&nbsp;</div>
<div>
	// Para quitar elementos usamos tambi&eacute;n la clave:</div>
<div>
	misClientes.remove(&quot;66666666X&quot;);</div>
<div>
	&nbsp;</div>
<div>
	// Volcamos todo a ver qu&eacute; sale</div>
<div>
	System.out.println(&quot;La Hashtable est&aacute; as&iacute;: &quot; + misClientes.toString());</div>
<div>
	&nbsp;</div>
<div>
	}</div>
<div>
	}</div>
<div>
	&nbsp;</div>
<div>
	/**</div>
<div>
	* Clase Cliente</div>
<div>
	* la usamos como objeto para manejar con un Hashtable</div>
<div>
	*/</div>
<div>
	class Cliente {</div>
<div>
	public String dni;</div>
<div>
	public String nombre;</div>
<div>
	public boolean esMujer;</div>
<div>
	&nbsp;</div>
<div>
	/**</div>
<div>
	* Constructor</div>
<div>
	* @param String dni</div>
<div>
	* @param String nombre</div>
<div>
	* @param boolean esMujer</div>
<div>
	*/</div>
<div>
	Cliente (String dni, String nombre, boolean esMujer) {</div>
<div>
	this.dni = dni;</div>
<div>
	this.nombre = nombre;</div>
<div>
	this.esMujer = esMujer;</div>
<div>
	}</div>
<div>
	&nbsp;</div>
<div>
	/**</div>
<div>
	* sacarDatos</div>
<div>
	* Muestra los datos de una jugador</div>
<div>
	*/</div>
<div>
	public void sacarDatos () {</div>
<div>
	String sexo = (esMujer)?&quot;Mujer&quot;:&quot;Hombre&quot;;</div>
<div>
	System.out.println(&quot;DNI: &quot; + dni + &quot;nombre: &quot; + nombre+ &quot; Sexo:&quot; + sexo);</div>
<div>
	}</div>
<div>
	&nbsp;</div>
<div>
	}</div>
