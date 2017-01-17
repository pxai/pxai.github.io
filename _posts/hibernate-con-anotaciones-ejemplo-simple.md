<p>
	Los frameworks como Spring, Struts y el propio Hibernate tienen una tendencia terrible a necesitar toda una serie de ficheros de configuraci&oacute;n en formato XML para que todo funcione. La intenci&oacute;n de inicio es buena, se trata de configurar la aplicaci&oacute;n y tratar de tocar lo menos posible el c&oacute;digo. Pero ni tanto ni tan calvo; gestionar tanto fichero puede convertirse en una tarea tediosa e infernal.</p>
<p>
	<strong>Anotaciones y Convenciones</strong></p>
<p>
	Una forma de evitar esos ficheros de configuraci&oacute;n es introduciendo anotaciones en el c&oacute;digo. Las anotaciones son una especie de directivas que en el caso de java son palabras clave precedidas de una @. Lo que veremos es un como podemos sustituir el fichero en el que se mapea la clase y la tabla de la BD simplemente metiendo anotaciones en la clase.</p>
<p>
	Otra opci&oacute;n m&aacute;s simple a&uacute;n es el uso de convenciones en los frameworks. Por ejemplo, que si se nombra una clase de determinada manera o se meten los ficheros en determinado directorio estamos dando una cualidad extra al programa.</p>
<p>
	<strong>La clase Customer con Anotaciones</strong></p>
<p>
	Las anotaciones indican b&aacute;sicamente con qu&eacute; tabla se mapea la clase y luego con qu&eacute; campo de la tabla se asocia cada atributo de la clase. Obviamente el ejemplo es muy simple, m&aacute;s adelante veremos anotaciones para casos m&aacute;s complejos.</p>
<p>
	&nbsp;</p>
<div>
	<span style="font-family:courier new,courier,monospace;">package info.pello.maven.hibernate.HibernateAnnotationsSamples;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Column;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Entity;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.GeneratedValue;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Table;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* Represents data from a Customer. Using Annotations</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">@Entity</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">@Table(name=&quot;customer&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public class Customer {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @GeneratedValue</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private long id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Column(name=&quot;name&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; private String name;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Column(name=&quot;address&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String address;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Column(name=&quot;email&quot;)</span></div>
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
<p>
	<strong>Cambios en el fichero hibernate.cfg.xml</strong></p>
<p>
	En el fichero cambiariamos la l&iacute;nea donde se mapea la clase. Ya no hariamos referencia a un fichero XML sino a una clase. Ah&iacute; dentro estar&iacute;a todo.</p>
<p>
	&nbsp;</p>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; ﻿ &nbsp;﻿ &nbsp;&lt;!-- Here comes the mapping using annotations in a java class --&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;mapping class=&quot;info.pello.maven.hibernate.HibernateAnnotationsSamples.Customer&quot; /&gt;</span></div>
<div>
	&nbsp;</div>
<p>
	<strong>Ejecutando la aplicaci&oacute;n con maven en eclipse</strong></p>
<p>
	Para poder ejecutar todo usando eclipse y una de sus Run Configurations simplemente tendremos que usar un goal de maven muy concreto: exec:java</p>
<p>
	Vamos a run... Run configurations &gt; Maven Build y creamos nuevo</p>
<p>
	En el goal ponmos exec:java</p>
<p>
	Y a&ntilde;adimos un par&aacute;metro:&nbsp;<span style="color: rgb(0, 0, 0); font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif; font-size: 14px; line-height: 18px; text-align: left; "><span style="font-family:courier new,courier,monospace;">exec.mainClass</span> <span style="font-family:verdana,geneva,sans-serif;">cuyo valor debe ser el nombre de la clase principal o main del proyecto, en este caso i</span></span>nfo.pello.maven.hibernate.HibernateAnnotationsSamples.Main</p>
