<p>
	&nbsp;</p>
<div>
	El framework Sprint dispone de herramientas para crear aplicaciones web con el patr&oacute;n MVC. Con esto la cosa ya se pone un poco seria porque ya podemos crear aplicaciones web en java con todo el potencial de Spring, con Hibernate, todo montado sobre Maven, etc.. en fin, como dir&iacute;a alguno <em>la fiesta del fichero</em> , o m&aacute;s bien<em><strong> La Fiesta del Framework</strong></em>.</div>
<div>
	&nbsp;</div>
<div>
	Existe m&aacute;s de un tutorial por ah&iacute; que explica el t&iacute;pico HelloWorld con el MVC de Spring. B&aacute;sicamente se trata de una aplicaci&oacute;n web con un servlet especial de Spring por el que pasa todo y manda las peticiones a clases java con anotaciones que ejercen de controladores. Esas clases java, que Spring las ha escaneado autom&aacute;ticamente hacen lo que tienen que hacer (llaman a otros beans que se ocupan del modelo) con par&aacute;metros o no y mandan el resultado a un view. El view se puede resolver de varias maneras pero la m&aacute;s simple es por nombre.</div>
<div>
	&nbsp;</div>
<div>
	En los tutoriales que te encuentras (que al final ves siempre los mismos pasos y configuraciones) hay un problema: o bien no dejan claro d&oacute;nde se guardan los ficheros o bien generan el proyecto de una manera.. engorrosa o a manubrio. Antes de meterme en harina, simplemente comentar&eacute; la forma m&aacute;s simple que con la he conseguido crear un proyecto Spring MVC y que funcione a la primera sin tocar una consola de maven o de Spring Roo (es crema, pero es consola). Porque claro,... c&oacute;mo te lo montas? Inicio un proyecto Maven con un arquetipo webapp y luego le doy caracteristicas de Spring desde eclipse? (s<em>obre el proyecto, bot&oacute;n derecho &gt; Spring Tools &gt; Add Spring Nature</em>)</div>
<div>
	&nbsp;</div>
<div>
	Muy simple, con un Eclipse Kepler (Build id: 20130614-0229) y el plugin oficial de Spring tools instalado hago lo siguiente:</div>
<div>
	<em>New &gt; Other &gt; Spring &gt; Spring project &gt; Simple Spring Web Maven</em></div>
<div>
	&nbsp;</div>
<div>
	Y listo, a trabajar. En otros tutoriales y en sitios tipo Stackoverflow hablan de crear un dynamic Web project, a&ntilde;adir los jar de spring a mano, bla bla,.. Pero sinceramente el IDE est&aacute; precisamente para que trabaje para ti y no al contrario.</div>
<div>
	&nbsp;</div>
<div>
	Una cosa m&aacute;s. Si tratamos de ejecutar el proyecto en un Tomcat al hacer Run no nos saldr&aacute; la opci&oacute;n de ejecutar en el servidor. Para habilitar eso basta con hacer:&nbsp;</div>
<div>
	<em>sobre el proyecto &gt; Bot&oacute;n derecho rat&oacute;n &gt; Maven &gt; Update project &gt; Ok &nbsp;</em></div>
<div>
	&nbsp;</div>
<div>
	Bueno vamos a ver los componentes de una aplicaci&oacute;n web con Spring MVC. Puedes <a href="http://code.google.com/p/erps-2dam-4vientos/source/browse/trunk/HelloSpringMvc/">descarg&aacute;rtela aqu&iacute;, en google code</a>.</div>
<div>
	&nbsp;</div>
<div>
	<strong>web.xml</strong></div>
<div>
	&nbsp;</div>
<div>
	Este es el fichero de configuraci&oacute;n cl&aacute;sico de toda la vida de una aplicaci&oacute;n web y aqu&iacute;</div>
<div>
	es donde metemos nuestro servlet especial que provee Spring. Spring tiene m&aacute;s de un tipo</div>
<div>
	de Servlet para hacer esto en el que var&iacute;a la forma de mapear url con los beans. Otro d&iacute;a.</div>
<div>
	&nbsp;</div>
<div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;ISO-8859-1&quot;?&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;web-app xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;xmlns=&quot;http://java.sun.com/xml/ns/javaee&quot;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;xsi:schemaLocation=&quot;http://java.sun.com/xml/ns/javaee</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd&quot;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;id=&quot;WebApp_ID&quot; version=&quot;2.5&quot;&gt;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;display-name&gt;HelloSpringMvc&lt;/display-name&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&lt;!--</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;- Location of the XML file that defines the root application context.</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;- Applied by ContextLoaderListener.</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;--&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;context-param&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;param-name&gt;contextConfigLocation&lt;/param-name&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;param-value&gt;classpath:spring/application-config.xml&lt;/param-value&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;/context-param&gt;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;listener&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;listener-class&gt;org.springframework.web.context.ContextLoaderListener&lt;/listener-class&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;/listener&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;!--</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;- Servlet that dispatches request to registered handlers (Controller implementations).</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;--&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;servlet&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;servlet-name&gt;dispatcherServlet&lt;/servlet-name&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;servlet-class&gt;org.springframework.web.servlet.DispatcherServlet&lt;/servlet-class&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;init-param&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;param-name&gt;contextConfigLocation&lt;/param-name&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;param-value&gt;/WEB-INF/mvc-config.xml&lt;/param-value&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;/init-param&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;load-on-startup&gt;1&lt;/load-on-startup&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;/servlet&gt;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;servlet-mapping&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;servlet-name&gt;dispatcherServlet&lt;/servlet-name&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;url-pattern&gt;/&lt;/url-pattern&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;/servlet-mapping&gt;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;/web-app&gt;</span></div>
	<div>
		&nbsp;</div>
</div>
<div>
	&nbsp;</div>
<div>
	Aqu&iacute; es importante aparte del servlet, el par&aacute;metro de Contexto, ya que ah&iacute; es donde se le indica</div>
<div>
	al servlet el fichero de configuraci&oacute;n de Spring, vamos, donde se indican los beans, propiedades varias, etc...</div>
<div>
	&nbsp;</div>
<div>
	<strong>mvc-config.xml</strong></div>
<div>
	El fichero de Spring. Tiene unas configuraciones interesantes:</div>
<div>
	- Indica que los controladores son clases con anotaciones.</div>
<div>
	- Escanea y carga autom&aacute;ticamente todos los beans que ejercen de controladores</div>
<div>
	- Indica que clase de Spring se encarga de los views y en este caso el prefijo y sufijo que a&ntilde;ade.</div>
<div>
	- Indica que todo aquello que est&eacute; en la carpeta resources se trate como contenido est&aacute;tico, es decir</div>
<div>
	que no pase por el servlet. Ah&iacute; es donde meter&iacute;amos js, css, im&aacute;genes, etc...</div>
<div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;xmlns:mvc=&quot;http://www.springframework.org/schema/mvc&quot; xmlns:context=&quot;http://www.springframework.org/schema/context&quot;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;xsi:schemaLocation=&quot;http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd&quot;&gt;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;!-- We&#39;ll autodiscover beans and instantiate them --&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;context:component-scan base-package=&quot;info.pello.mvc&quot;/&gt; &nbsp;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;!-- With this all the content from resources dir will</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;be treated as static content: js, css, images, &nbsp;--&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;mvc:resources mapping=&quot;/resources/**&quot; location=&quot;/resources/&quot; /&gt;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;!-- We&#39;ll be using annotated controller classes --&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;mvc:annotation-driven /&gt;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;!-- We define the class to manage the views</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;This ones just appends the name with the prefix and the suffix.</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;For exaple, if the Controller returns &quot;hello&quot;, the It resolves to</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;prefix/hello/suffix, in this case: /WEB-INF/views/hello.jsp</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;--&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;bean class=&quot;org.springframework.web.servlet.view.InternalResourceViewResolver&quot;&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;property name=&quot;prefix&quot; value=&quot;/WEB-INF/views/&quot;/&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;property name=&quot;suffix&quot; value=&quot;.jsp&quot;/&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;/bean&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;/beans&gt;</span></div>
	<div>
		&nbsp;</div>
</div>
<div>
	&nbsp;</div>
<div>
	<strong>HelloController.java</strong></div>
<div>
	La clase controladora. Una clase muy simple, no hereda nada, simplemente tiene anotaciones para indicar los mapeos de</div>
<div>
	url con cada m&eacute;todo.</div>
<div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">package info.pello.mvc;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family: 'courier new', courier, monospace; ">import java.util.Map;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import org.springframework.stereotype.Controller;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import org.springframework.web.bind.annotation.RequestMapping;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import org.springframework.beans.factory.annotation.Autowired;</span></div>
	<div>
		&nbsp;</div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;* Controller class form default action</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;* @greetz Blue Mug</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">@Controller</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">public class HelloController {</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * default constructor</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public HelloController () {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.err.println(&quot;BEAN instantiated&quot;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * handles default / or /hello request</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param model</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return the name of the view to show</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * RequestMapping({&quot;/&quot;,&quot;/hello&quot;,&quot;/jomework/hello&quot;})</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@RequestMapping(&quot;/hello&quot;)</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public String sayHelloPage(Map&lt;String, Object&gt; model) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.err.println(&quot;say hello&quot;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;model.put(&quot;greet&quot;, &quot;Hello World, welcome to my app&quot;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// We return view name</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return &quot;hello&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">}</span></div>
	<div>
		&nbsp;</div>
</div>
<div>
	&nbsp;</div>
<div>
	<strong>hello.jsp</strong></div>
<div>
	El view. No es m&aacute;s que un jsp.</div>
<div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;!DOCTYPE html&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;%@ page language=&quot;java&quot; contentType=&quot;text/html; charset=UTF-8&quot; pageEncoding=&quot;UTF-8&quot;%&gt; &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;html&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;head&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;meta charset=&quot;utf-8&quot;&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;title&gt;Welcome&lt;/title&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;/head&gt;&nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;body&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;header&gt;Hello, Spring MVC works perfectly&lt;/header&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;article&gt;&lt;h2&gt;${greet}&lt;/h2&gt;&lt;/article&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;/body&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;/html&gt;</span></div>
</div>
<p>
	&nbsp;</p>
