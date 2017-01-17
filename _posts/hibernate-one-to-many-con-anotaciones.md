<p>
	&nbsp;</p>
<div>
	Qu&eacute; mejor para combatir el calor que desarrollar un proyecto que use hibernate y pasar del mapeo en XML a las anotaciones.&nbsp;Es que no se ocurre nada m&aacute;s refrescante. Y si ademas es un mapeo one-to-many pues mucho mejor.&nbsp;</div>
<div>
	Vamos a ver se trata de retomar el c&oacute;digo del <a href="http://www.pello.info/blog/hibenate-one-to-many-con-xml">art&iacute;culo anterior</a> y hacerlo por anotaciones.</div>
<div>
	&nbsp;</div>
<div>
	La cosa quedar&iacute;a as&iacute;:</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<strong>Product.java</strong></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">package info.pello.maven.hibernate.HibernateAnnotationsSamples;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">//We need all of these for annotations</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Entity;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.JoinColumn;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Table;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Column;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.GeneratedValue;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.ManyToOne;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* Represents a Product</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Altadill</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @greetz any kind of cheese</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">@Entity</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">@Table(name=&quot;product&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public class Product {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @GeneratedValue</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Column(name=&quot;id&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private int id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Column(name=&quot;name&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; private String name;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Column(name=&quot;description&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; private String description;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @ManyToOne</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @JoinColumn(name=&quot;idtype&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; private ProductType productType;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * default constructor</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Product () {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param name</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param description</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param type</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Product(String name, String description, ProductType productType) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.name = name;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.description = description;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.productType = productType;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/* (non-Javadoc)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @see java.lang.Object#toString()</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Override</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public String toString() {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return &quot;Product [id=&quot; + id + &quot;, name=&quot; + name + &quot;, description=&quot;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;+ description + &quot;]&quot;;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">// GETTERS/SETTERS</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">// ... &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">}</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<strong>ProductType.java</strong></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">package info.pello.maven.hibernate.HibernateAnnotationsSamples;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">import java.util.Set;</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">//We need all of these for annotations</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Entity;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.JoinColumn;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.OneToMany;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Table;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Column;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.GeneratedValue;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.ManyToOne;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* Represents a ProductType</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Altadill</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @greetz any kind of bread</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">@Entity</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">@Table(name=&quot;producttype&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public class ProductType {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@GeneratedValue</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Column(name=&quot;id&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private int id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Column(name=&quot;name&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String name;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; @OneToMany(mappedBy=&quot;productType&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; private Set&lt;Product&gt; products;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * default constructor</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public ProductType () {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param name</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public ProductType(String name) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.name = name;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿<span class="Apple-tab-span" style="white-space: pre; "> </span>// SETTERS/GETTERS</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; // ... &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">}</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<strong>hibernate.cfg.xml</strong></div>
<div>
	Ya tenemos 5 entidades</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; ﻿ &nbsp;﻿ &nbsp;&lt;!-- Here comes the mapping using annotations in a java class --&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;mapping class=&quot;info.pello.maven.hibernate.HibernateAnnotationsSamples.Customer&quot; /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;mapping class=&quot;info.pello.maven.hibernate.HibernateAnnotationsSamples.Car&quot; /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;mapping class=&quot;info.pello.maven.hibernate.HibernateAnnotationsSamples.Insurance&quot; /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;mapping class=&quot;info.pello.maven.hibernate.HibernateAnnotationsSamples.Product&quot; /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;mapping class=&quot;info.pello.maven.hibernate.HibernateAnnotationsSamples.ProductType&quot; /&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	El resto exactamente igual. Puedes descargarte el <a href="http://code.google.com/p/erps-2dam-4vientos/source/browse/trunk/HibernateAnnotationsSamples/">c&oacute;digo en GoogleCode</a>.</div>
<div>
	&nbsp;</div>
<div>
	<strong>Salida</strong></div>
<div>
	El output del programa principal en este caso:</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">SLF4J: Failed to load class &quot;org.slf4j.impl.StaticLoggerBinder&quot;.</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">SLF4J: Defaulting to no-operation (NOP) logger implementation</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] Scanning for projects...</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] ------------------------------------------------------------------------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] Building HibernateSamples 0.0.1-SNAPSHOT</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] ------------------------------------------------------------------------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO]&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] &gt;&gt;&gt; exec-maven-plugin:1.2.1:java (default-cli) @ HibernateSamples &gt;&gt;&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO]&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] &lt;&lt;&lt; exec-maven-plugin:1.2.1:java (default-cli) @ HibernateSamples &lt;&lt;&lt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO]&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] --- exec-maven-plugin:1.2.1:java (default-cli) @ HibernateSamples ---</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:00 AM org.hibernate.annotations.common.Version &lt;clinit&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HCANN000001: Hibernate Commons Annotations {4.0.1.Final}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:00 AM org.hibernate.Version logVersion</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000412: Hibernate Core {4.2.1.Final}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:00 AM org.hibernate.cfg.Environment &lt;clinit&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000206: hibernate.properties not found</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:00 AM org.hibernate.cfg.Environment buildBytecodeProvider</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000021: Bytecode provider name : javassist</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:00 AM org.hibernate.cfg.Configuration configure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000043: Configuring from resource: /hibernate.cfg.xml</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:00 AM org.hibernate.cfg.Configuration getConfigurationInputStream</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000040: Configuration resource: /hibernate.cfg.xml</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:00 AM org.hibernate.cfg.Configuration doConfigure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000041: Configured SessionFactory: null</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:00 AM org.hibernate.service.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000402: Using Hibernate built-in connection pool (not for production use!)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:00 AM org.hibernate.service.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000115: Hibernate connection pool size: 1</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:00 AM org.hibernate.service.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000006: Autocommit mode: false</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:00 AM org.hibernate.service.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000401: using driver [com.mysql.jdbc.Driver] at URL [jdbc:mysql://localhost:3306/erp]</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:00 AM org.hibernate.service.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000046: Connection properties: {user=root, password=****}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.dialect.Dialect &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000400: Using dialect: org.hibernate.dialect.MySQLDialect</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.engine.jdbc.internal.LobCreatorBuilder useContextualLobCreation</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000423: Disabling contextual LOB creation as JDBC driver reported JDBC version [3] less than 4</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.engine.transaction.internal.TransactionFactoryInitiator initiateService</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000399: Using default transaction strategy (direct JDBC transactions)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.hql.internal.ast.ASTQueryTranslatorFactory &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000397: Using ASTQueryTranslatorFactory</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.tool.hbm2ddl.SchemaValidator validate</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000229: Running schema validator</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.tool.hbm2ddl.SchemaValidator validate</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000102: Fetching database metadata</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000261: Table found: erp.car</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000037: Columns: [id, model, registration]</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000261: Table found: erp.customer</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000037: Columns: [id, email, address, name]</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000261: Table found: erp.insurance</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000037: Columns: [company, type, cost, idcar]</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000261: Table found: erp.product</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000037: Columns: [id, idtype, description, name]</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000261: Table found: erp.producttype</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 19, 2013 10:39:01 AM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000037: Columns: [id, name]</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select product0_.id as id1_3_, product0_.description as descript2_3_, product0_.name as name3_3_, product0_.idtype as idtype4_3_ from product product0_</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select producttyp0_.id as id1_4_0_, producttyp0_.name as name2_4_0_ from producttype producttyp0_ where producttyp0_.id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select producttyp0_.id as id1_4_0_, producttyp0_.name as name2_4_0_ from producttype producttyp0_ where producttyp0_.id=?</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">--- Products ----- table contents -----------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 1 - Name: Saizar - Type: Drinks</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 2 - Name: Leek - Type: Vegetables</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Total products: 2</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select product0_.id as id1_3_1_, product0_.description as descript2_3_1_, product0_.name as name3_3_1_, product0_.idtype as idtype4_3_1_, producttyp1_.id as id1_4_0_, producttyp1_.name as name2_4_0_ from product product0_ left outer join producttype producttyp1_ on product0_.idtype=producttyp1_.id where product0_.id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Selected Name: Saizar</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: insert into producttype (name) values (?)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: insert into product (description, name, idtype) values (?, ?, ?)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Inserted id: 12</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Show data after new insert</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select product0_.id as id1_3_, product0_.description as descript2_3_, product0_.name as name3_3_, product0_.idtype as idtype4_3_ from product product0_</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select producttyp0_.id as id1_4_0_, producttyp0_.name as name2_4_0_ from producttype producttyp0_ where producttyp0_.id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select producttyp0_.id as id1_4_0_, producttyp0_.name as name2_4_0_ from producttype producttyp0_ where producttyp0_.id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select producttyp0_.id as id1_4_0_, producttyp0_.name as name2_4_0_ from producttype producttyp0_ where producttyp0_.id=?</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">--- Products ----- table contents -----------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 1 - Name: Saizar - Type: Drinks</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 2 - Name: Leek - Type: Vegetables</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 12 - Name: Angulas - Type: Luxurious</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Total products: 3</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select product0_.id as id1_3_0_, product0_.description as descript2_3_0_, product0_.name as name3_3_0_, product0_.idtype as idtype4_3_0_ from product product0_ where product0_.id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select producttyp0_.id as id1_4_0_, producttyp0_.name as name2_4_0_ from producttype producttyp0_ where producttyp0_.id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: update product set description=?, name=?, idtype=? where id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Show data after update</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select product0_.id as id1_3_, product0_.description as descript2_3_, product0_.name as name3_3_, product0_.idtype as idtype4_3_ from product product0_</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select producttyp0_.id as id1_4_0_, producttyp0_.name as name2_4_0_ from producttype producttyp0_ where producttyp0_.id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select producttyp0_.id as id1_4_0_, producttyp0_.name as name2_4_0_ from producttype producttyp0_ where producttyp0_.id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select producttyp0_.id as id1_4_0_, producttyp0_.name as name2_4_0_ from producttype producttyp0_ where producttyp0_.id=?</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">--- Products ----- table contents -----------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 1 - Name: Saizar - Type: Drinks</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 2 - Name: Leek - Type: Vegetables</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 12 - Name: Piperrark - Type: Luxurious</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Total products: 3</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: delete from product where id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select product0_.id as id1_3_, product0_.description as descript2_3_, product0_.name as name3_3_, product0_.idtype as idtype4_3_ from product product0_</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select producttyp0_.id as id1_4_0_, producttyp0_.name as name2_4_0_ from producttype producttyp0_ where producttyp0_.id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select producttyp0_.id as id1_4_0_, producttyp0_.name as name2_4_0_ from producttype producttyp0_ where producttyp0_.id=?</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">--- Products ----- table contents -----------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 1 - Name: Saizar - Type: Drinks</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 2 - Name: Leek - Type: Vegetables</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Total products: 2</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select producttyp0_.id as id1_4_, producttyp0_.name as name2_4_ from producttype producttyp0_</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">--- ProductsTypes ----- table contents -----------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select products0_.idtype as idtype4_4_1_, products0_.id as id1_3_1_, products0_.id as id1_3_0_, products0_.description as descript2_3_0_, products0_.name as name3_3_0_, products0_.idtype as idtype4_3_0_ from product products0_ where products0_.idtype=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 1 - Name: Vegetables - Products:&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[Product [id=2, name=Leek, description=Fresh leeks from Usurbil]]</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select products0_.idtype as idtype4_4_1_, products0_.id as id1_3_1_, products0_.id as id1_3_0_, products0_.description as descript2_3_0_, products0_.name as name3_3_0_, products0_.idtype as idtype4_3_0_ from product products0_ where products0_.idtype=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 2 - Name: Drinks - Products:&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[Product [id=1, name=Saizar, description=Saizar sagardoa, Usurbilgoa]]</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select products0_.idtype as idtype4_4_1_, products0_.id as id1_3_1_, products0_.id as id1_3_0_, products0_.description as descript2_3_0_, products0_.name as name3_3_0_, products0_.idtype as idtype4_3_0_ from product products0_ where products0_.idtype=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 12 - Name: Luxurious - Products:&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[]</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select products0_.idtype as idtype4_4_1_, products0_.id as id1_3_1_, products0_.id as id1_3_0_, products0_.description as descript2_3_0_, products0_.name as name3_3_0_, products0_.idtype as idtype4_3_0_ from product products0_ where products0_.idtype=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 11 - Name: Luxurious - Products:&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[]</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select products0_.idtype as idtype4_4_1_, products0_.id as id1_3_1_, products0_.id as id1_3_0_, products0_.description as descript2_3_0_, products0_.name as name3_3_0_, products0_.idtype as idtype4_3_0_ from product products0_ where products0_.idtype=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 10 - Name: Luxurious - Products:&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[]</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">Total products: 5</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] ------------------------------------------------------------------------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] BUILD SUCCESS</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] ------------------------------------------------------------------------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] Total time: 5.107s</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] Finished at: Fri Jul 19 10:39:02 CEST 2013</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] Final Memory: 9M/23M</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] ------------------------------------------------------------------------</span></div>
<div>
	&nbsp;</div>
