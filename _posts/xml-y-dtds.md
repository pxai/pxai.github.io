<p>
	<strong>&iquest;Qu&eacute; es XML?</strong><br />
	XML: eXtensible Markup Language<br />
	es un subconjunto del SGML (un lenguaje de marcas de prop&oacute;sito general) y es el lenguaje que la w3c recomienda para crear lenguajes de marcas orientados a determinadas funciones. Es una especie de lenguaje como HTML pero en el que las etiquetas las inventamos nosotros.<br />
	<strong>&nbsp;<br />
	Dicho de otra forma:</strong><br />
	XML es un lenguaje de marcas con el que tenemos libertad total para decidir que etiquetas y atributos metemos. Su principal aplicaci&oacute;n es la de intercambio de datos entre sistemas y aplicaciones.<br />
	Este es el aspecto de un fichero XML<br />
	&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;<br />
	&lt;libro&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;titulo&gt;Neuromante&lt;/titulo&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;autor&gt;William Gibson&lt;/autor&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;isbn&gt;84-450-7405-9&lt;/isbn&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;fecha edicion=&rdquo;2&rdquo;&gt;1985-12-4&lt;/fecha&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;paginas&gt;450&lt;/paginas&gt;<br />
	&lt;/libro&gt;<br />
	<br />
	&iquest;Y para que necesito esto?</p>
<ul>
	<li>
		Es el lenguaje ideal para el intercambio de informaci&oacute;n ya que tiene estas ventajas</li>
	<li>
		Es texto plano</li>
	<li>
		Es legible por humanos y m&aacute;quinas</li>
	<li>
		Es muy simple</li>
	<li>
		Es muy &uacute;til para representar tipos de datos (registros, arboles, listas)</li>
	<li>
		Es un est&aacute;ndar abierto</li>
	<li>
		La mayor&iacute;a de lenguajes tienen librer&iacute;as para tratar XML</li>
</ul>
<p>
	<br />
	<strong>C&oacute;mo hacer que XML siga un esquema determinado: DTD</strong><br />
	<br />
	(Igual esquema no es la palabra apropiada, pero en fin)<br />
	Si nos interesa podemos hacer que un documento XML cumpla un determinado esquema de etiquetas y atributos. Ese esquema esta definido por un DTD. Esa definici&oacute;n puede ir dentro del XML o estar referenciado as&iacute;:<br />
	&lt;!DOCTYPE libro SYSTEM &quot;libros.dtd&quot;&gt;<br />
	<br />
	El DTD es un Document Type Definition, en definitiva un fichero que indica el formato que debe tener un contenido XML, indicando las etiquetas, atributos, jerarqu&iacute;a etc..<br />
	<br />
	Este ser&iacute;a un ejemplo de DTD para el XML anterior:<br />
	<br />
	&lt;!ELEMENT libro (titulo,autor,isbn,fecha,paginas)&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;!ELEMENT titulo (#PCDATA) &gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;!ELEMENT autor (#PCDATA) &gt;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;!ELEMENT isbn (#PCDATA) &gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;!ELEMENT fecha (#PCDATA) &gt;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&lt;!ATTLIST fecha edicion CDATA &quot;1&quot;&gt;<br />
	&nbsp;&nbsp; &nbsp;&lt;!ELEMENT paginas (#PCDATA) &gt;<br />
	<br />
	<strong>Requisitos que debe cumplir un fichero XML</strong><br />
	Estas son las propiedades que debe tener un fichero XML considerarse como tal:<br />
	<br />
	1.-Debe estar <strong>BIEN FORMADO</strong> (well formed)<br />
	&nbsp;-Siempre debe tener un elemento ra&iacute;z<br />
	&nbsp;-Todas las etiquetas deben cerrarse<br />
	&nbsp;-Todos los atributos llevan comillas &#39; o &ldquo;.<br />
	&nbsp;-Las etiquetas se anidan pero nunca se solapan<br />
	&nbsp;-Las etiquetas son case-sensitive, no hay que mezclar may&uacute;sculas con min&uacute;sculas<br />
	<br />
	2.-En caso de depender de un DTD, debe ser <strong>V&Aacute;LIDO</strong></p>
<p>
	Una ventaja muy&nbsp; obvia de XML es que podemos crear un fichero de propiedades, de configuraci&oacute;n, de lo que sea y no necesitamos crear desde 0 c&oacute;digo para verificar y validar que ese fichero es correcto. Todo ese trabajo nos lo dan las librer&iacute;as de las que disponemos para gestionar XML. Por ejemplo en java si abrimos un fichero xml y est&eacute; no est&aacute; bien formado o no es v&aacute;lido nos los dir&aacute; de forma inmediata.</p>
<p>
	Los DTD se quedan un poco cortos si necesitamos un mayor control de los tipos de datos que metemos en el fichero XML. Con un DTD podemos decir que vale, en tal etiqueta hay un texto, pero ese texto puede ser cualquier cosa. &iquest;Podemos controlar que sea n&uacute;mero, texto o que siga un patr&oacute;n predeterminado?</p>
<p>
	La respuesta es XSD, pero eso amigos, es otra historia para otro d&iacute;a.</p>
<p>
	xml sigue vigente, y de qu&eacute; manera. Basta con ver android y sus inifinitos ficheros XML para configurar hasta el &uacute;ltimo texto de la etiqueta m&aacute;s remota. Tambi&eacute;n en muchos frameworks son frecuentes los ficheros de configuraci&oacute;n aunque hay cierta lucha con la opci&oacute;n XML o las anotaciones. En un principio cualquier cosa configurable se hac&iacute;a en un fichero XML aparte, y de tanto exceso hay quien tratade volver atr&aacute;s.</p>
