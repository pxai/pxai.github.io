<p>
	&nbsp;</p>
<div>
	Hibernate como ya sabr&aacute;s a estas alturas en un framework de ORM &nbsp;es decir, un framework para facilitar el mapeo entre objetos y una base de datos relacional. No es el &uacute;nico y de hecho J2EE trae de serie el JPA, pero sin duda es de los m&aacute;s extendidos.</div>
<div>
	&nbsp;</div>
<div>
	Muchas proyectos orientadas a objetos giran en torno a una base de datos relacional, y esas aplicaciones se dise&ntilde;an de tal forma que contienen clases que representan esos datos, lo que se suele llamar el dominio o domain.</div>
<div>
	&nbsp;</div>
<div>
	Las aplicaciones llevan a cabo muchas operaciones tediosas y repetitivas para extraer, insertar, eliminar y actualizar datos. Frameworks como Hibernate te facilitan enormemente esa tarea, eliminan c&oacute;digo boilerplate (las mil pasos que se hacen una y otra vez en operaciones JDBC por ejemplo) y por supuesto abstraen los detalles del gestor de base de datos en la aplicaci&oacute;n. Con eso y aplicando el patr&oacute;n DAO conseguimos un c&oacute;digo desacoplado, sencillo y en conclusi&oacute;n m&aacute;s f&aacute;cil de mantener. Del patr&oacute;n DAO ya se habl&oacute; <a href="http://www.pello.info/blog/patron-dao">en otra entrada</a>.&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	En este caso se va desarrollar una miniaplicaci&oacute;n que gestiona una tabla similar: Customer (Cliente) la cual puedes descargar/ver <a href="http://code.google.com/p/erps-2dam-4vientos/source/browse/trunk/HibernateSamples/">en google code</a>.</div>
<div>
	&nbsp;</div>
<div>
	Para montar una aplicaci&oacute;n Hibernate necesitamos configurar varios elementos:</div>
<div>
	&nbsp;</div>
<div>
	<strong>1. hibernate.cfg.xml</strong></div>
<div>
	El ficherod e configuraci&oacute;n de hibernate, esencialmente contiene los datos de conexi&oacute;n al SGBD y otros detalles como el pool, el lenguaje a utilizar y algo fundamental: especificar los ficheros donde se configuran los mapeos Clase/Tabla.</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;?xml version=&#39;1.0&#39; encoding=&#39;utf-8&#39;?&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;!--</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;Hibernate configuration file,</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;here is were we set up hibernate db collection and mapping between</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;classes and database tables.</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; --&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;!DOCTYPE hibernate-configuration PUBLIC</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &quot;-//Hibernate/Hibernate Configuration DTD 3.0//EN&quot;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &quot;http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd&quot;&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;hibernate-configuration&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;session-factory&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;!-- Database connection settings --&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;connection.driver_class&quot;&gt;com.mysql.jdbc.Driver&lt;/property&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;connection.url&quot;&gt;jdbc:mysql://localhost:3306/erp&lt;/property&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;connection.username&quot;&gt;root&lt;/property&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;connection.password&quot;&gt;root&lt;/property&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;!-- JDBC connection pool &nbsp;--&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;connection.pool_size&quot;&gt;1&lt;/property&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;!-- SQL dialect --&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;dialect&quot;&gt;org.hibernate.dialect.MySQLDialect&lt;/property&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;!-- Enable Hibernate&#39;s automatic session context management --&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;current_session_context_class&quot;&gt;thread&lt;/property&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;!-- Disable the second-level cache &nbsp;--&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;cache.provider_class&quot;&gt;org.hibernate.cache.NoCacheProvider&lt;/property&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;!-- Echo all executed SQL to stdout --&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;show_sql&quot;&gt;true&lt;/property&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;hbm2ddl.auto&quot;&gt;validate&lt;/property&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; ﻿ &nbsp;﻿ &nbsp;&lt;!-- Here comes the mapping definition - saved in resources dir with this hibernate config --&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;mapping resource=&quot;Customer.hbm.xml&quot;/&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;/session-factory&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;/hibernate-configuration&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<strong>2. NombreDeClase.hbm.xml</strong></div>
<div>
	Fichero al que se hace referencia en hibernate.cfg.xml Ah&iacute; se concreta la relaci&oacute;n entre cada propiedad de la clase y cada columna de la tabla, y si hace falta el tipo de dato que es (Hibernate lo puede determinar, pero hay casos como el date en el qe hay que especificar lo que se quiere). Tambi&eacute;n se indica c&oacute;mo tratar el campo clave, si es autonum&eacute;rico, etc...</div>
<div>
	en este caso Customer.cfg.xml</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;!DOCTYPE hibernate-mapping PUBLIC</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &quot;-//Hibernate/Hibernate Mapping DTD 3.0//EN&quot;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &quot;http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd&quot;&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;&lt;!-- Mapping configuration details between Customer class and customer table --&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;hibernate-mapping package=&quot;info.pello.maven.hibernate.HibernateSamples&quot;&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;class name=&quot;Customer&quot; table=&quot;customer&quot;&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;id name=&quot;id&quot; column=&quot;id&quot;&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &lt;generator class=&quot;native&quot;/&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;/id&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;name&quot; column=&quot;name&quot; /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;address&quot; column=&quot;address&quot;/&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;email&quot; column=&quot;email&quot;/&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;/class&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;/hibernate-mapping&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	Ojo, si no nos gusta esto de crear un fichero xml para concretar cada mapeo, Hibernate permite el uso de anotaciones en la propia clase que representa la tabla y con eso nos ahorramos lo del fichero.</div>
<div>
	&nbsp;</div>
<div>
	<strong>3.La entidad</strong></div>
<div>
	A continuaci&oacute;n creamos una clase que representa la tabla. Esta es una clase muy simple no es m&aacute;s que un POJO con atributos, un constructor vac&iacute;o por lo menos (requerido por hibernate), y los getter/setter.</div>
<div>
	En este caso Customer.java</div>
<div>
	package info.pello.maven.hibernate.HibernateSamples;</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* Represents data from a Customer</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @greetz 4 the usual</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public class Customer {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private long id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String name;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String address;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String email;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * default constructor</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Customer () {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * Constructor with all attributes</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param name</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param address</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param email</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Customer(long id, String name, String address, String email) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.id = id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.name = name;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.address = address;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.email = email;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return the id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public long getId() {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param id the id to set</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void setId(long id) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.id = id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return the name</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public String getName() {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return name;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param name the name to set</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void setName(String name) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.name = name;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return the address</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public String getAddress() {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return address;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param address the address to set</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void setAddress(String address) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.address = address;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return the email</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public String getEmail() {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return email;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param email the email to set</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void setEmail(String email) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.email = email;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">}</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<strong>4. EL DAO</strong></div>
<div>
	&nbsp;</div>
<div>
	Ahora nos quedar&iacute;a programar el DAO. En mi caso he creado un interfaz que luego nos facilite hacer inyecciones o hacer test unitarios.</div>
<div>
	&nbsp;</div>
<div>
	Este ser&iacute;a el interfaz:</div>
<div>
	<span style="font-family:courier new,courier,monospace;">package info.pello.maven.hibernate.HibernateSamples;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">import java.util.List;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* interface for CustomerDAO class</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public interface CustomerDAOInterface {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Customer selectById(long id);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public List&lt;Customer&gt; selectAll ();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void insert (Customer customer);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void update (Customer customer);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void delete (Customer customer);</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">}</span></div>
<div>
	&nbsp;</div>
<div>
	Y esta la implementaci&oacute;n, donde ya vemos c&oacute;mo se trabaja con hibernate.</div>
<div>
	<span style="font-family:courier new,courier,monospace;">package info.pello.maven.hibernate.HibernateSamples;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">import java.util.List;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">import org.hibernate.Session;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import org.hibernate.SessionFactory;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* implementation of customerDAOInterface</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @greetz Blue mug</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public class CustomerDAO implements CustomerDAOInterface {</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/*&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * selects one customer by Id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return Customer</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Customer selectById(long id) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;SessionFactory sessionFactory = HibernateSession.getSessionFactory();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;Session session = sessionFactory.openSession();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;Customer customer = (Customer) session.get(Customer.class, id);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;session.close();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;return customer;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/*</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * retrieves all customers from db</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return List of customers</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public List&lt;Customer&gt; selectAll() {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;SessionFactory sessionFactory = HibernateSession.getSessionFactory();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;Session session = sessionFactory.openSession();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;List&lt;Customer&gt; customers = session.createQuery(&quot;from Customer&quot;).list();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;session.close();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;return customers;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/*</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * inserts a new customer in database</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * retrieves generated id and sets to customer instance</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param new customer</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void insert(Customer customer) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;SessionFactory sessionFactory = HibernateSession.getSessionFactory();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;Session session = sessionFactory.openSession();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;session.beginTransaction();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;Long id = (Long) session.save(customer);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;customer.setId(id);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;session.getTransaction().commit();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;session.close();</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/*</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * updates customer</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param customer to update</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void update(Customer customer) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;SessionFactory sessionFactory = HibernateSession.getSessionFactory();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp; &nbsp; &nbsp;Session session = sessionFactory.openSession();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp; &nbsp; &nbsp;session.beginTransaction();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp; &nbsp; &nbsp;session.merge(customer);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp; &nbsp; &nbsp;session.getTransaction().commit();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp; &nbsp; &nbsp;session.close();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/*</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * delete given customer</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param customer to delete</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void delete(Customer customer) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;SessionFactory sessionFactory = HibernateSession.getSessionFactory();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;Session session = sessionFactory.openSession();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;session.beginTransaction();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;session.delete(customer);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;session.getTransaction().commit();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; &nbsp; &nbsp;session.close();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">}</span></div>
<div>
	&nbsp;</div>
<div>
	Lo primero que se hace es conseguir una instancia de sesi&oacute;n de hibernate. Este es un objeto que lo conseguimos con una clase que hemos creado para tal efecto, que b&aacute;sicamente crea una instancia bas&aacute;ndose en el fichero de configuraci&oacute;n de hibernate. La sesi&oacute;n contiene la conexi&oacute;n y a trav&eacute;s de ella se realizan todas las operaciones contra el SGBD, pero de una forma muy simple como se ver&aacute; a continuaci&oacute;n en la implementaci&oacute;n del interfaz.</div>
<div>
	&nbsp;</div>
<div>
	<strong>Principal</strong></div>
<div>
	Y por &uacute;ltimo, aqu&iacute; tenemos un programa principal que instancia el DAO y le da uso.</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">package info.pello.maven.hibernate.HibernateSamples;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">import java.util.List;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* Main class</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @greetz 4 u</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @listening &quot;Mouth for war - Pantera&quot;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* &nbsp;Revenge&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* &nbsp;I&#39;m screaming revenge again&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* &nbsp;Wrong&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* &nbsp;I&#39;ve been wrong for far too long&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* &nbsp;Been constantly so frustrated&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* &nbsp;I&#39;ve moved mountains with less&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* &nbsp;When I channel my hate to productive&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* &nbsp;I don&#39;t find it hard to impress</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public class Main &nbsp;{</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * simple function for reusing</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param customerDAO</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public static void showAll (CustomerDAO customerDAO) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// SELECT ALL DATA</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;List&lt;Customer&gt; customers = customerDAO.selectAll();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;System.out.println(&quot;\n--- CUSTOMER ----- table contents -----------&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; for(Customer customer : customers) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; ﻿ &nbsp;System.out.print(&quot;Id: &quot; + customer.getId());</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; ﻿ &nbsp;System.out.println(&quot; - Name: &quot; + customer.getName());</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; }</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; System.out.println(&quot;Total Customers: &quot; + customers.size());﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; public static void main( String[] args )</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;CustomerDAO customerDAO = new CustomerDAO();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;showAll(customerDAO);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; // SELECT JUST ONE</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; Customer oneCustomer = customerDAO.selectById(1);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;System.out.println(&quot;Selected Name: &quot; + oneCustomer.getName());</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; // INSERT NEW DATA</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;Customer newCustomer = new Customer(0,&quot;Phil Anselmo&quot;,&quot;Suicide note&quot;,&quot;phil@pantera.com&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;customerDAO.insert(newCustomer);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;System.out.println(&quot;Inserted id: &quot; + newCustomer.getId());</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; System.out.println(&quot;Show data after new insert&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;showAll(customerDAO);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; // UPDATE DATA</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; newCustomer.setName(&quot;Dimebag Darrell&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; customerDAO.update(newCustomer);</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; System.out.println(&quot;Show data after update&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;showAll(customerDAO);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; // DELETE DATA</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; customerDAO.delete(newCustomer);</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; System.out.println(&quot;Show data after deletion&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;showAll(customerDAO);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; }</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">}</span></div>
<div>
	&nbsp;</div>
<div>
	<strong>pom.xml de Maven</strong></div>
<div>
	Todo el proyecto se ha construido con Maven. Maven ha facilitado enormemente la resoluci&oacute;n de dependencias y con decirle que necesitabamos soporte para hibernate y el driver de jdbc de mysql se ha encargado de todo. Crema.</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd&quot;&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &lt;groupId&gt;info.pello.maven.hibernate&lt;/groupId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &lt;artifactId&gt;HibernateSamples&lt;/artifactId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &lt;version&gt;0.0.1-SNAPSHOT&lt;/version&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &lt;packaging&gt;jar&lt;/packaging&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &lt;name&gt;HibernateSamples&lt;/name&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &lt;url&gt;http://maven.apache.org&lt;/url&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &lt;properties&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &lt;/properties&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &lt;dependencies&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &lt;dependency&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &lt;groupId&gt;mysql&lt;/groupId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &lt;version&gt;5.1.10&lt;/version&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;/dependency&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;dependency&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &lt;groupId&gt;junit&lt;/groupId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &lt;artifactId&gt;junit&lt;/artifactId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &lt;version&gt;3.8.1&lt;/version&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &lt;scope&gt;test&lt;/scope&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;/dependency&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;dependency&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;&lt;groupId&gt;org.hibernate&lt;/groupId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;&lt;artifactId&gt;hibernate-core&lt;/artifactId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;&lt;version&gt;4.2.1.Final&lt;/version&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;/dependency&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;dependency&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;&lt;groupId&gt;org.hibernate.common&lt;/groupId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;&lt;artifactId&gt;hibernate-commons-annotations&lt;/artifactId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;&lt;version&gt;4.0.1.Final&lt;/version&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;/dependency&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &lt;/dependencies&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;/project&gt;</span></div>
