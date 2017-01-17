<p>
	Bueno para que se vea que eso de los hilos sirve para algo vamos con una aplicaci&oacute;n algo m&aacute;s pr&aacute;ctica. En este caso vamos&nbsp; a implementar un servidor web y como queremos que pueda procesar varias peticiones a la vez cada una de ellas la tratar&aacute; con un hilo propio.<br />
	<br />
	Con el paquete java.net.* podemos crear Sockets y por suerte en java no son tan engorrosos como en c. Con un par de ordenes tenemos creado un servidor TCP, sacamos de cada petici&oacute;n el stream de salida y de entrada y a trabajar.<br />
	<br />
	Para este ejemplo, y por probar cosas, he creado un par de clases auxiliares, Log y Propiedades. La primera es para sacar todos los mensajes por pantalla y la otra para cargar las propiedades del servidor web un fichero properties. Eso nos permite cambiar la config del servidor sin tener que recompilar nada. Las dos clases est&aacute;n hechas de una manera peculiar. Recuerdo cuando me iban a hacer una entrevista de trabajo y me dijeron &quot;te van a preguntar qu&eacute; es el patr&oacute;n Singleton&quot;.</p>
<p>
	Bueno, el caso es que para asegurarme de que solo tengo una instancia de esas clases meto ese patr&oacute;n. Y s&iacute;, en aquella entrevista finalmente me lo preguntaron.<br />
	<br />
	<strong>Clase para Log</strong></p>
<p>
	<span><span class="S3">/**</span><br />
	<span class="S3">&nbsp;* Log</span><br />
	<span class="S3">&nbsp;* Clasecilla para hacer log</span><br />
	<span class="S3">&nbsp;* </span><span class="S17">@author</span><span class="S3"> Pello Xabier Altadill</span><br />
	<span class="S3">&nbsp;*</span><br />
	<span class="S3">&nbsp;*/</span><br />
	<span class="S5">public</span><span class="S0"> </span><span class="S5">class</span><span class="S0"> </span>Log<span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span><span class="S5">static</span><span class="S0"> </span>Log<span class="S0"> </span>esteLog<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span></span></p>
<p>
	<span><span class="S0">//</span></span> thnx eug.</p>
<p>
	<span><span class="S0">private Log () {}</span></span></p>
<p>
	<br />
	<span><span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">public</span><span class="S0"> </span><span class="S5">static</span><span class="S0"> </span>Log<span class="S0"> </span>getLog<span class="S0"> </span><span class="S10">()</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">if</span><span class="S0"> </span><span class="S10">(</span>esteLog<span class="S0"> </span><span class="S10">==</span><span class="S0"> </span>null<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>esteLog<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S5">new</span><span class="S0"> </span>Log<span class="S10">();</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">return</span><span class="S0"> </span>esteLog<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S3">/**</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * log</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * </span><span class="S17">@param</span><span class="S3"> msg t</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; */</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">public</span><span class="S0"> </span><span class="S5">void</span><span class="S0"> </span>log<span class="S0"> </span><span class="S10">(</span>String<span class="S0"> </span>msg<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>System<span class="S10">.</span>out<span class="S10">.</span>println<span class="S10">(</span>msg<span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S10">}</span></span><br />
	<br />
	<strong>Clase para cargar Properties</strong></p>
<p>
	<span><span class="S5">import</span><span class="S0"> </span>java<span class="S10">.</span>io<span class="S10">.</span>FileInputStream<span class="S10">;</span><br />
	<span class="S5">import</span><span class="S0"> </span>java<span class="S10">.</span>util<span class="S10">.</span>Properties<span class="S10">;</span><br />
	<br />
	<br />
	<br />
	<span class="S3">/**</span><br />
	<span class="S3">&nbsp;* Propiedades</span><br />
	<span class="S3">&nbsp;* Para recuperar properties de un fichero</span><br />
	<span class="S3">&nbsp;* </span><span class="S17">@author</span><span class="S3"> Pello Xabier Altadill</span><br />
	<span class="S3">&nbsp;*</span><br />
	<span class="S3">&nbsp;*/</span><br />
	<span class="S5">public</span><span class="S0"> </span><span class="S5">class</span><span class="S0"> </span>Propiedades<span class="S0"> </span><span class="S10">{</span><br />
	<br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span><span class="S5">static</span><span class="S0"> </span>Propiedades<span class="S0"> </span>propiedades<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>null<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span>String<span class="S0"> </span>nombreFicheroProperties<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S6">&quot;servidorweb.properties&quot;</span><span class="S10">;</span><br />
	</span></p>
<p>
	<span><span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; private Propiedades () {}&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S3">/**</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * retorna el objeto &uacute;nico para las propiedades</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * </span><span class="S17">@return</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; */</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">public</span><span class="S0"> </span><span class="S5">static</span><span class="S0"> </span>Propiedades<span class="S0"> </span>getPropiedades<span class="S0"> </span><span class="S10">()</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">if</span><span class="S0"> </span><span class="S10">(</span>propiedades<span class="S0"> </span><span class="S10">==</span><span class="S0"> </span>null<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>propiedades<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S5">new</span><span class="S0"> </span>Propiedades<span class="S10">();</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">return</span><span class="S0"> </span>propiedades<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S3">/**</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * leerPropiedad</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * </span><span class="S17">@param</span><span class="S3"> propiedad la propiedad que queremos leer</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * </span><span class="S17">@return</span><span class="S3"> el valor correspondiente</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; */</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">public</span><span class="S0"> </span>String<span class="S0"> </span>leerPropiedad<span class="S0"> </span><span class="S10">(</span>String<span class="S0"> </span>propiedad<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>String<span class="S0"> </span>resultado<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S6">&quot;&quot;</span><span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">try</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>FileInputStream<span class="S0"> </span>ficheroProperties<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S5">new</span><span class="S0"> </span>FileInputStream<span class="S10">(</span>nombreFicheroProperties<span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// Creamso un objeto properties</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>Properties<span class="S0"> </span>p<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S5">new</span><span class="S0"> </span>Properties<span class="S10">();</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// Cargamos las properties</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>p<span class="S10">.</span>load<span class="S10">(</span>ficheroProperties<span class="S10">);</span><br />
	<br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>resultado<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>p<span class="S10">.</span>getProperty<span class="S10">(</span>propiedad<span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><span class="S0"> </span><span class="S5">catch</span><span class="S0"> </span><span class="S10">(</span>Exception<span class="S0"> </span>e<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>System<span class="S10">.</span>err<span class="S10">.</span>println<span class="S10">(</span><span class="S6">&quot;La defequ&eacute; al leer property: &quot;</span><span class="S0"> </span><span class="S10">+</span><span class="S0"> </span>e<span class="S10">.</span>getMessage<span class="S10">());</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">return</span><span class="S0"> </span>resultado<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<br />
	<span class="S10">}</span><br />
	</span><br />
	<br />
	<strong>Clase para el servidor web</strong></p>
<p>
	<span><span class="S5">import</span><span class="S0"> </span>java<span class="S10">.</span>io<span class="S10">.</span>BufferedReader<span class="S10">;</span><br />
	<span class="S5">import</span><span class="S0"> </span>java<span class="S10">.</span>io<span class="S10">.</span>InputStreamReader<span class="S10">;</span><br />
	<span class="S5">import</span><span class="S0"> </span>java<span class="S10">.</span>io<span class="S10">.</span>PrintWriter<span class="S10">;</span><br />
	<span class="S5">import</span><span class="S0"> </span>java<span class="S10">.</span>net<span class="S10">.</span>ServerSocket<span class="S10">;</span><br />
	<span class="S5">import</span><span class="S0"> </span>java<span class="S10">.</span>net<span class="S10">.</span>Socket<span class="S10">;</span><br />
	<br />
	<br />
	<span class="S3">/**</span><br />
	<span class="S3">&nbsp;* </span><span class="S17">@author</span><span class="S3"> Pello Xabier Altadill</span><br />
	<span class="S3">&nbsp;* greetz: si pongo mal. si no pongo mal. xDDDD</span><br />
	<span class="S3">&nbsp;*/</span><br />
	<span class="S5">public</span><span class="S0"> </span><span class="S5">class</span><span class="S0"> </span>ServidorWeb<span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span><span class="S5">final</span><span class="S0"> </span><span class="S5">static</span><span class="S0"> </span><span class="S5">int</span><span class="S0"> </span>PUERTO_POR_DEFECTO<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S4">10666</span><span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span><span class="S5">final</span><span class="S0"> </span><span class="S5">static</span><span class="S0"> </span><span class="S5">boolean</span><span class="S0"> </span>JAVA_ES_LENTO<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>true<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S3">/**</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * constructor por defecto</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; */</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span>ServidorWeb<span class="S0"> </span><span class="S10">()</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>dale<span class="S10">();</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span><span class="S5">void</span><span class="S0"> </span>dale<span class="S0"> </span><span class="S10">()</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">int</span><span class="S0"> </span>puerto<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>PUERTO_POR_DEFECTO<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>ServerSocket<span class="S0"> </span>socketServidor<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>Socket<span class="S0"> </span>socketCliente<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>null<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>Log<span class="S10">.</span>getLog<span class="S10">().</span>log<span class="S10">(</span><span class="S6">&quot;Vamos dale&quot;</span><span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>Log<span class="S10">.</span>getLog<span class="S10">().</span>log<span class="S10">(</span><span class="S6">&quot;Servidor &quot;</span><span class="S0"> </span><span class="S10">+</span><span class="S0"> </span>Propiedades<span class="S10">.</span>getPropiedades<span class="S10">().</span>leerPropiedad<span class="S10">(</span><span class="S6">&quot;nombre&quot;</span><span class="S10">));</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">if</span><span class="S0"> </span><span class="S10">(!</span>Propiedades<span class="S10">.</span>getPropiedades<span class="S10">().</span>leerPropiedad<span class="S10">(</span><span class="S6">&quot;puerto&quot;</span><span class="S10">).</span>isEmpty<span class="S10">())</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>puerto<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>Integer<span class="S10">.</span>parseInt<span class="S10">(</span>Propiedades<span class="S10">.</span>getPropiedades<span class="S10">().</span>leerPropiedad<span class="S10">(</span><span class="S6">&quot;puerto&quot;</span><span class="S10">));</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">try</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// Creamos el server socket</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>socketServidor<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S5">new</span><span class="S0"> </span>ServerSocket<span class="S10">(</span>puerto<span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>Log<span class="S10">.</span>getLog<span class="S10">().</span>log<span class="S10">(</span><span class="S6">&quot;OK, servidor a la escucha en &quot;</span><span class="S0"> </span><span class="S10">+</span><span class="S0"> </span>puerto<span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// Bucle infinito con mensajejeje</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">while</span><span class="S0"> </span><span class="S10">(</span>JAVA_ES_LENTO<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>socketCliente<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>socketServidor<span class="S10">.</span>accept<span class="S10">();</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>Log<span class="S10">.</span>getLog<span class="S10">().</span>log<span class="S10">(</span><span class="S6">&quot;Nueva petici&oacute;n desde: &quot;</span><span class="S0"> </span><span class="S10">+</span><span class="S0"> </span>socketCliente<span class="S10">.</span>getInetAddress<span class="S10">().</span>getHostAddress<span class="S10">());</span><br />
	<br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// Creamos una nueva petici&oacute;n, que es un hilo, y este se encarga de todo</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">new</span><span class="S0"> </span>Peticion<span class="S10">(</span><span class="S5">new</span><span class="S0"> </span>BufferedReader<span class="S10">(</span><span class="S5">new</span><span class="S0"> </span>InputStreamReader<span class="S10">(</span>socketCliente<span class="S10">.</span>getInputStream<span class="S10">())),</span><br />
	<span class="S0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">new</span><span class="S0"> </span>PrintWriter<span class="S10">(</span>socketCliente<span class="S10">.</span>getOutputStream<span class="S10">(),</span><span class="S0"> </span>true<span class="S10">));</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><span class="S0"> </span><span class="S5">catch</span><span class="S0"> </span><span class="S10">(</span>Exception<span class="S0"> </span>e<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>Log<span class="S10">.</span>getLog<span class="S10">().</span>log<span class="S10">(</span><span class="S6">&quot;La eyect&eacute; en el server socket. &quot;</span><span class="S0"> </span><span class="S10">+</span><span class="S0"> </span>e<span class="S10">.</span>getMessage<span class="S10">());</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S3">/**</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * </span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * </span><span class="S17">@param</span><span class="S3"> args</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; */</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">public</span><span class="S0"> </span><span class="S5">static</span><span class="S0"> </span><span class="S5">void</span><span class="S0"> </span>main<span class="S10">(</span>String<span class="S10">[]</span><span class="S0"> </span>args<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// TODO Auto-generated method stub</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>ServidorWeb<span class="S0"> </span>miServidorWeb<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S5">new</span><span class="S0"> </span>ServidorWeb<span class="S10">();</span><br />
	<br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<br />
	<span class="S10">}</span><br />
	</span><br />
	<br />
	<strong>Clase para procesar cada petici&oacute;n</strong></p>
<p>
	<span><span class="S5">import</span><span class="S0"> </span>java<span class="S10">.</span>io<span class="S10">.</span>BufferedReader<span class="S10">;</span><br />
	<span class="S5">import</span><span class="S0"> </span>java<span class="S10">.</span>io<span class="S10">.</span>FileReader<span class="S10">;</span><br />
	<span class="S5">import</span><span class="S0"> </span>java<span class="S10">.</span>io<span class="S10">.</span>PrintWriter<span class="S10">;</span><br />
	<br />
	<br />
	<span class="S3">/**</span><br />
	<span class="S3">&nbsp;* Hilo que procesa una petici&oacute;n enviada a nuestro servidor</span><br />
	<span class="S3">&nbsp;* web. Lo &uacute;nico que hace es tratar de averiguar el fichero</span><br />
	<span class="S3">&nbsp;* que se solicita, se abre, se lee y se escupe.</span><br />
	<span class="S3">&nbsp;* </span><span class="S17">@author</span><span class="S3"> Pello Xabier Altadill Izura</span><br />
	<span class="S3">&nbsp;*</span><br />
	<span class="S3">&nbsp;*/</span><br />
	<span class="S5">public</span><span class="S0"> </span><span class="S5">class</span><span class="S0"> </span>Peticion<span class="S0"> </span><span class="S5">implements</span><span class="S0"> </span>Runnable<span class="S0"> </span><span class="S10">{</span><br />
	<br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span>Thread<span class="S0"> </span>peticion<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span>BufferedReader<span class="S0"> </span>entrada<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span>PrintWriter<span class="S0"> </span>salida<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span>String<span class="S0"> </span>directorioPublico<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S3">/**</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * </span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; */</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">public</span><span class="S0"> </span>Peticion<span class="S10">(</span>BufferedReader<span class="S0"> </span>entrada<span class="S10">,</span><span class="S0"> </span>PrintWriter<span class="S0"> </span>salida<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">this</span><span class="S10">.</span>entrada<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>entrada<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">this</span><span class="S10">.</span>salida<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>salida<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>directorioPublico<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>Propiedades<span class="S10">.</span>getPropiedades<span class="S10">().</span>leerPropiedad<span class="S10">(</span><span class="S6">&quot;public&quot;</span><span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>peticion<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S5">new</span><span class="S0"> </span>Thread<span class="S10">(</span><span class="S5">this</span><span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>peticion<span class="S10">.</span>start<span class="S10">();</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S3">/**</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * aqu&iacute; se mete al hacer start en el constructor</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; */</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">public</span><span class="S0"> </span><span class="S5">void</span><span class="S0"> </span>run<span class="S0"> </span><span class="S10">()</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// Pin pan pun, bocadillo de at&uacute;n</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>enviarRespuesta<span class="S10">(</span>procesarPeticion<span class="S10">());</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>cerrarChiringuito<span class="S10">();</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S3">/**</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * procesarPeticion</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * procesa la petici&oacute;n al servidor web</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * y saca el fichero que se est&aacute; solicitando</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * </span><span class="S17">@return</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; */</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span>String<span class="S0"> </span>procesarPeticion<span class="S0"> </span><span class="S10">()</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>String<span class="S0"> </span>fichero<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S6">&quot;/&quot;</span><span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>String<span class="S0"> </span>linea<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S6">&quot;&quot;</span><span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>String<span class="S0"> </span>lineaPeticion<span class="S10">[];</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">try</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// Qu&eacute; pinta tiene una petici&oacute;n? Desde chrome algo as&iacute;:</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S1">/* GET / HTTP/1.1</span><br />
	<span class="S1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Host: localhost:10666</span><br />
	<span class="S1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Connection: keep-alive</span><br />
	<span class="S1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Cache-Control: max-age=0</span><br />
	<span class="S1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Accept: application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,;q=0.5</span><br />
	<span class="S1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; User-Agent: Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.63 Safari/534.3</span><br />
	<span class="S1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Accept-Encoding: gzip,deflate,sdch</span><br />
	<span class="S1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Accept-Language: en-US,en;q=0.8</span><br />
	<span class="S1">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3 */</span><br />
	<br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// Nos quedaremos con la 1&ordm; l&iacute;nea, si no tiene GET o POST</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// pasamos millas</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">while</span><span class="S0"> </span><span class="S10">((</span>linea<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>entrada<span class="S10">.</span>readLine<span class="S10">())</span><span class="S0"> </span><span class="S10">!=</span><span class="S0"> </span>null<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// Nos quedamos con la primera l&iacute;nea de la petici&oacute;n</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">if</span><span class="S0"> </span><span class="S10">(</span>linea<span class="S10">.</span>startsWith<span class="S10">(</span><span class="S6">&quot;GET&quot;</span><span class="S10">)</span><span class="S0"> </span><span class="S10">||</span><span class="S0"> </span>linea<span class="S10">.</span>startsWith<span class="S10">(</span><span class="S6">&quot;POST&quot;</span><span class="S10">))</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>lineaPeticion<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>linea<span class="S10">.</span>split<span class="S10">(</span><span class="S6">&quot; &quot;</span><span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">return</span><span class="S0"> </span>lineaPeticion<span class="S10">[</span><span class="S4">1</span><span class="S10">];</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><span class="S0"> </span><span class="S5">else</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">return</span><span class="S0"> </span>fichero<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><span class="S0"> </span><span class="S5">catch</span><span class="S0"> </span><span class="S10">(</span>Exception<span class="S0"> </span>e<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>Log<span class="S10">.</span>getLog<span class="S10">().</span>log<span class="S10">(</span><span class="S6">&quot;La deposit&eacute; al leer petici&oacute;n&quot;</span><span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">return</span><span class="S0"> </span>fichero<span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S3">/**</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * enviarRespuesta</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * </span><span class="S17">@param</span><span class="S3"> fichero</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; */</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span><span class="S5">void</span><span class="S0"> </span>enviarRespuesta<span class="S0"> </span><span class="S10">(</span>String<span class="S0"> </span>fichero<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">if</span><span class="S0"> </span><span class="S10">(</span>fichero<span class="S10">.</span>equals<span class="S10">(</span><span class="S6">&quot;/&quot;</span><span class="S10">))</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>fichero<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S6">&quot;/&quot;</span><span class="S0"> </span><span class="S10">+</span><span class="S0"> </span>Propiedades<span class="S10">.</span>getPropiedades<span class="S10">().</span>leerPropiedad<span class="S10">(</span><span class="S6">&quot;default&quot;</span><span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// The mother of the lamb. Abrimos el fichero que nos piden</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// lo leemos y lo servimos</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">try</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>String<span class="S0"> </span>linea<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><span class="S6">&quot;&quot;</span><span class="S10">;</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>BufferedReader<span class="S0"> </span>inputStream<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">new</span><span class="S0"> </span>BufferedReader<span class="S10">(</span><span class="S5">new</span><span class="S0"> </span>FileReader<span class="S10">(</span>directorioPublico<span class="S0"> </span><span class="S10">+</span><span class="S0"> </span>fichero<span class="S10">));</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>Log<span class="S10">.</span>getLog<span class="S10">().</span>log<span class="S10">(</span><span class="S6">&quot;Abriendo fichero: &quot;</span><span class="S0"> </span><span class="S10">+</span><span class="S0"> </span>fichero<span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// Leer linea y mandar de vuelta...</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">while</span><span class="S0"> </span><span class="S10">(</span><span class="S0"> </span><span class="S10">(</span>linea<span class="S0"> </span><span class="S10">=</span><span class="S0"> </span>inputStream<span class="S10">.</span>readLine<span class="S10">()</span><span class="S0"> </span><span class="S10">)</span><span class="S0"> </span><span class="S10">!=</span><span class="S0"> </span>null<span class="S10">)</span><span class="S0"> </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>salida<span class="S10">.</span>write<span class="S10">(</span>linea<span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><span class="S0"> </span><span class="S5">catch</span><span class="S0"> </span><span class="S10">(</span>Exception<span class="S0"> </span>e<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>salida<span class="S10">.</span>write<span class="S10">(</span><span class="S6">&quot;No encontr&eacute; el fichero: &quot;</span><span class="S0"> </span><span class="S10">+</span><span class="S0"> </span>fichero<span class="S0"> </span><span class="S10">+</span><span class="S0"> </span><span class="S6">&quot;:&quot;</span><span class="S10">);</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>Log<span class="S10">.</span>getLog<span class="S10">().</span>log<span class="S10">(</span><span class="S6">&quot;La cagu&eacute; al leer contenidos &quot;</span><span class="S0"> </span><span class="S10">+</span><span class="S0"> </span>e<span class="S10">.</span>getMessage<span class="S10">());</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S2">// Tiramos de la cadena, ay que me lol... </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>salida<span class="S10">.</span>flush<span class="S10">();</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S3">/**</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * cerrarChiringuito</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; * Cerramos los streams y se termina la fiesta</span><br />
	<span class="S3">&nbsp; &nbsp; &nbsp; &nbsp; */</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">private</span><span class="S0"> </span><span class="S5">void</span><span class="S0"> </span>cerrarChiringuito<span class="S0"> </span><span class="S10">()</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S5">try</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>salida<span class="S10">.</span>close<span class="S10">();</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>entrada<span class="S10">.</span>close<span class="S10">();</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><span class="S0"> </span><span class="S5">catch</span><span class="S0"> </span><span class="S10">(</span>Exception<span class="S0"> </span>e<span class="S10">)</span><span class="S0"> </span><span class="S10">{</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>Log<span class="S10">.</span>getLog<span class="S10">().</span>log<span class="S10">(</span><span class="S6">&quot;La deyect&eacute; al cerrar ficheros &quot;</span><span class="S0"> </span><span class="S10">+</span><span class="S0"> </span>e<span class="S10">.</span>getMessage<span class="S10">());</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><br />
	<span class="S0">&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="S10">}</span><br />
	<br />
	<span class="S10">}</span><br />
	</span><br />
	<br />
	La cosa parece funcionar porque al probarlo desde Chrome en el log veo lo siguiente:<br />
	Vamos dale<br />
	Servidor ServidorWeb de palo<br />
	OK, servidor a la escucha en 10666<br />
	Nueva petici&oacute;n desde: 127.0.0.1<br />
	Abriendo fichero: /index.html<br />
	Nueva petici&oacute;n desde: 127.0.0.1<br />
	La cagu&eacute; al leer contenidos /tmp/favicon.ico (No existe el fichero o el directorio)<br />
	<br />
	Es decir, Chrome me lanza mi petici&oacute;n, el servidor la sirve bien y Chrome a su bola<br />
	lanza una petici&oacute;n a favicon.ico. El servidor tb procesa esa petici&oacute;n, pero claro<br />
	el fichero no existe.<br />
	<br />
	Este servidor es una mierda que solo va a servir bien texto. Habr&iacute;a que meterse<br />
	en el protocolo HTTP y dar respuesta a los mimetypes, juego de caracteres, etc..<br />
	<br />
	<strong>Further reading</strong><br />
	Tal y como est&eacute; hecho este servidor por cada petici&oacute;n va a crear un hilo, sin l&iacute;mite alguno.<br />
	Java incorpora un mecanismo de pool de hilos con el que podriamos controlar el n&uacute;mero<br />
	de peticiones que se procesan, que es lo que hacen los servidores serios: limitar el n&uacute;mero de hijos.<br />
	Echar un ojo al newFixedThreadPool de la clase java.util.concurrent.Executors</p>
