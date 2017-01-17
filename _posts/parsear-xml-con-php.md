Este es un ejemplo muy simple para parsear ficheros XML con PHP usando <b>libexpat</b>, es decir<br>
la libreria que probablemente ya tendremos soportada si PHP se compilo con la opcion --with-xml
<br>
El ejemplo esta sacado del php.net pero simplificado al maximo y explicando cada paso.<br>
El modelo de parseo es tipo SAX, algo asi como un recorrido del fichero orientado<br> a eventos
(empiezo elemento, cierro elemento, contenido,..).
<br>
El mecanismo consiste en crear una clase parseadora con funciones handler para esos eventos.
<br><br>
Veamos el cÃƒÂ³digo:

<pre>
&lt;?php

// Parsear ficheros XML con PHP usando la extension de PHP expat de James Clark
// El sistema es como SAX, nos hace definir funciones handler
// para leer el fichero XML. PHP debe estar compilado con la opcion --with-xml
// opcion comun por ejemplo en Debian.

// Funciones basicas que se van a utilizar:
//  1. parser= xml_parser_create() : es la que genera el parser inicial
//  2. xml_set_object(parser, objeto) : establece la clase parser
//  3. xml_set_element_handler(parser,funcion_inicio,funcion_fin) : establece los handlers
//  4. xml_set_character_data_handler(parser,funcion): establece el handler para los datos
//  5. xml_parse(parser, contenidos, [final]): inicia el parseo, se invocaran los handlers
//  6. xml_error_string(xml_get_error_code(parser)): con estas dos funciones sacamos el error
//  7. xml_get_current_line_number(parser): linea actual de trabajo
//  8. xml_parser_free(parser) : liberamos el parser

// Hay mas funciones, ver en el manual oficial "Funciones de intÃƒÂ©rprete XML"
// TambiÃƒÂ©n hay otras librerÃƒÂ­as, por ejemplo para cargar XML con DOM


// Bien, para el parser lo primero es crear nuestra clase
class MiParserXML {

	// Atributos
   var $parser;
   var $ficheroxml;
   var $datos;

	// Constructora  
   function MiParserXML($fichero)
   {
       $this-&gt;ficheroxml = $fichero;
   
   	// creamos el parser    
      $this-&gt;parser = xml_parser_create();

		// Iniciamos...
		$this-&gt;inicializar();
    }
   
   // Inicializamos valores y funciones
   function inicializar() {
     // Establecemos el objeto parseador: this, o sea esta clase
     xml_set_object($this-&gt;parser, $this);
     // Establecemos los handlers para elementos y contenido
     xml_set_element_handler($this-&gt;parser, 'handlerInicial', 'handlerFinal');
     xml_set_character_data_handler($this-&gt;parser, 'handlerDatos');
     
   }
  
   function parseame() {

		// Abrimos el fichero XML en modo lectura
       if (!($fich = fopen($this-&gt;ficheroxml, 'r'))) {
           die('No pude abrir el fichero XML: '.$this-&gt;ficheroxml);
           return false;
       }

		// Vamos leyendo el fichero y parseando
       while ($data = fread($fich, 512)) {
           $resultado = xml_parse($this-&gt;parser, $data, feof($fich));

          // En caso de error
           if (!$resultado) {
               die(sprintf("Error de XML: %s en la linea %d",
                   xml_error_string(xml_get_error_code($this-&gt;parser)),
                       xml_get_current_line_number($this-&gt;parser) ) );
                       xml_parser_free($this-&gt;parser);
           }
       }

       return true;
   }
  
	/**
	* handlerDatos
	* Esta funcion se invoca automaticamente al encontrar una etiqueta
	*/
   function handlerInicial($parser, $nombre, $atributos) {
       echo "Iniciando elemento: " . $nombre . "&lt;br&gt;";
			foreach ($atributos as $clave =&gt; $valor) {
				echo "&nbsp;&nbsp;atributos: " . $clave . ": " . $valor . "&lt;br&gt;";		
			}
       
   }

	/**
	* handlerDatos
	* Esta funcion se invoca automaticamente al encontrar datos
   * es decir, el contenido que hay entre etiquetas
   * &lt;etiqueta&gt;contenido&lt;/etiqueta&gt;
	*/
   function handlerDatos($parser, $dato)
   {
       if ($dato = trim($dato)) {
	        echo "&nbsp;Dato: " . $dato . "&lt;br&gt;";
       }
   }
   
      /**
	* handlerFinal
	* Esta funcion se invoca automaticamente al llegar al
	* cierre de una etiqueta
	*/
   function handlerFinal($parser, $nombre) {
       echo "Cerrando elemento: " . $nombre . "&lt;br&gt;";
   }

} // class


// Ahora vamos a probar nuestro parser
$miparser = new MiParserXML("datos.xml");
$miparser-&gt;parseame();

?&gt;
</pre>

<br>
Y este podrÃƒÂ­a ser un fichero XML de ejemplo:
<pre>
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;libro&gt;
	&lt;titulo&gt;Neuromante&lt;/titulo&gt;
	&lt;autor&gt;William Gibson&lt;/autor&gt;
	&lt;isbn&gt;84-450-7405-9&lt;/isbn&gt;
	&lt;fecha edicion='2'&gt;1985-12-4&lt;/fecha&gt;
	&lt;paginas&gt;450&lt;/paginas&gt;
&lt;/libro&gt;
</pre>

Como se puede ver el parser no hace mas que recorrer el fichero. <br>Para casos en los que ya sabemos las etiquetas que esperamos,<br> por ejemplo un rss es mÃƒÂ¡s que suficiente.